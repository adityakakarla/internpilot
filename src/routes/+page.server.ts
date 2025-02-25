import type { Actions } from '@sveltejs/kit';
import OpenAI from "openai";
import {Pinecone} from '@pinecone-database/pinecone'
import { OPENAI_API_KEY, PINECONE_API_KEY } from '$env/static/private';
const openai = new OpenAI({apiKey: OPENAI_API_KEY});
const pc = new Pinecone({apiKey: PINECONE_API_KEY})
const index = pc.index('internpilot');

export const actions: Actions = {
    default: async ({ request }) => {
        const formData = await request.formData();
        const searchQuery = formData.get('searchQuery') as string;

        try {
            const moderation = await openai.moderations.create({
                model: "omni-moderation-latest",
                input: searchQuery,
            });
    
            if(moderation.results[0].flagged){
                return {
                    error: true,
                    errorMessage: 'Bruh why are you searching for weird stuff',
                }
            }
        } catch {
            return {
                error: true,
                errorMessage: 'Error with content moderation',
            }
        }
        

        if(searchQuery.length > 250){
            return {
                error: true,
                errorMessage: 'Error: Your search is too long',
            }
        }
        
        try {
            const response = await openai.embeddings.create({
                model: "text-embedding-3-small",
                input: searchQuery,
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
                query: searchQuery,
                matches: matches
            };
        } catch (e){
            return {
                error: true,
                errorMessage: 'Error fetching results',
            }
        }
    }
};