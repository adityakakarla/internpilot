import type { Actions } from '@sveltejs/kit';
import OpenAI from "openai";
import {Pinecone} from '@pinecone-database/pinecone'
import { OPENAI_API_KEY, PINECONE_API_KEY } from '$env/static/private';

const openai = new OpenAI({apiKey: OPENAI_API_KEY});
const pc = new Pinecone({apiKey: PINECONE_API_KEY})
const index = pc.index('internpilot');

// Simple in-memory rate limiting
// this will limit the number of requests per minute to 10
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 10;
const requestLog = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
    const now = Date.now();
    const requests = requestLog.get(ip) || [];
    
    // Remove requests outside the window
    const recentRequests = requests.filter(time => time > now - RATE_LIMIT_WINDOW);
    
    // Update the request log
    requestLog.set(ip, recentRequests);
    
    return recentRequests.length >= MAX_REQUESTS_PER_WINDOW;
}

function logRequest(ip: string) {
    const requests = requestLog.get(ip) || [];
    requests.push(Date.now());
    requestLog.set(ip, requests);
}

export const actions: Actions = {
    default: async ({ request, getClientAddress }) => {
        const ip = getClientAddress();
        
        // Check rate limit
        if (isRateLimited(ip)) {
            return {
                error: true,
                errorMessage: 'Too many requests. Please try again in a minute.',
            }
        }

        const formData = await request.formData();
        const searchQuery = formData.get('searchQuery') as string;

        // Validate query
        if (!searchQuery || typeof searchQuery !== 'string') {
            return {
                error: true,
                errorMessage: 'Please enter a valid search term',
            }
        }

        const trimmedQuery = searchQuery.trim();
        
        if (trimmedQuery.length < 2) {
            return {
                error: true,
                errorMessage: 'Search term must be at least 2 characters',
            }
        }

        if (trimmedQuery.length > 250) {
            return {
                error: true,
                errorMessage: 'Search term must be less than 250 characters',
            }
        }

        try {
            const moderation = await openai.moderations.create({
                model: "omni-moderation-latest",
                input: trimmedQuery,
            });
    
            if(moderation.results[0].flagged){
                return {
                    error: true,
                    errorMessage: 'Your search contains inappropriate content. Please try a different search term.',
                }
            }
        } catch (e) {
            console.error('Moderation API error:', e);
            return {
                error: true,
                errorMessage: 'Unable to process your search at this time. Please try again later.',
            }
        }

        try {
            // Log the request after moderation check passes
            logRequest(ip);

            const response = await openai.embeddings.create({
                model: "text-embedding-3-small",
                input: trimmedQuery,
                encoding_format: "float",
            });
            const embedding = response.data[0].embedding
            const pineconeResponse = await index.namespace('02-24-2025').query({
                topK: 10,
                vector: embedding,
                includeValues: false,
                includeMetadata: true,
              });
              
            const matches = pineconeResponse.matches.map(match => match.metadata);
            return {
                success: true,
                query: trimmedQuery,
                matches: matches
            };
        } catch (e) {
            console.error('Search error:', e);
            return {
                error: true,
                errorMessage: 'An error occurred while searching. Please try again later.',
            }
        }
    }
};