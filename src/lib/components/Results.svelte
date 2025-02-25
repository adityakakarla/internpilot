<script>
    let { matches } = $props();
  </script>
  
  <div class="grid gap-6 p-4">
    {#each matches as match}
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-200 dark:border-gray-700">
        <div class="p-6">
          <div class="flex justify-between items-start mb-4">
            <h1 class="text-2xl font-bold text-gray-800 dark:text-white">{match.company}</h1>
            <a href={match.website} target="_blank" class="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 text-sm flex items-center gap-1 transition-colors">
              <span>Visit</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
          
          <div class="flex flex-wrap gap-4 mb-4">
            <div class="px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <p class="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">Batch</p>
              <p class="font-medium text-gray-800 dark:text-white">{match.batch}</p>
            </div>
            <div class="px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <p class="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">Sector</p>
              <p class="font-medium text-gray-800 dark:text-white">{match.sector}</p>
            </div>
            <div class="px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <p class="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">Size</p>
              <p class="font-medium text-gray-800 dark:text-white">{match.size}</p>
            </div>
          </div>
          
          <p class="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">{match.summary}</p>
          
          <div class="flex flex-wrap gap-2">
            {#each match.tags.split(',') as tag}
              <span class="px-2 py-1 bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 text-xs font-medium rounded-full">{tag.trim()}</span>
            {/each}
          </div>
        </div>
      </div>
    {/each}
  </div>