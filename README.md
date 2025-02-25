# Internpilot

Internpilot is a web application that helps users find YC-backed startups to work for.

It provides a simple search interface and displays detailed information about each startup, including batch information, company size, sector, and more.

## Overview

Startups are the best place to learn, and Internpilot makes it easy to discover opportunities at YC-backed companies. This application features:

- Search functionality to find startups based on keywords
- Filtering options by batch, sector, and status
- Detailed startup cards with company information
- Links to company websites

## Technology Stack

- Frontend: Svelte + TailwindCSS
- Backend: SvelteKit Form Actions
- AI: OpenAI + Pinecone

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/adityakakarla/internpilot.git
   cd internpilot
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Cool Stuff

### Search

Fetching results is a multi-step process:
1. We make sure users didn't put anything bad in their queries using OpenAI's moderation API
2. We convert the user's query to a vector embedding (a bunch of numbers telling us what the user wants to know)
3. We match the query's embedding to our database of YC startups (updated February 24, 2025) to find the 10 closest matching companies
4. We process and display the search results to the user

### Startup Cards

Each startup is displayed as a card containing:
- Company name
- YC batch
- Sector
- Team size
- Summary
- Tags
- Website link

The UI was built almost entirely with Claude 3.7 Sonnet with minor edits.

### Data

We sourced the data from [a public spreadsheet of YC companies](https://docs.google.com/spreadsheets/d/181GQmXflgMCCI9awLbzK4Zf0uneQBKoh51wBjNTc8Us/edit?gid=0#gid=0).

After initial data cleaning steps using Pandas and Numpy, we had a list of companies as Python dictionaries.

We ran into some challenges: we wanted to bulk-calculate embeddings, but we kept hitting limits. We ended up chunking content into separate requests to bypass this.

Eventually, we had all our data in place. We uploaded everything to our Pinecone vector database.

## Acknowledgments

- Y Combinator for fostering an amazing startup ecosystem
- All the startups who make their information available

## Contact

If you have any questions or feedback, please reach out.