<script lang="ts">
    let { matches } = $props();
    
    let openDialogId = $state<number | null>(null);
    let showCopyConfirmation = $state(false);
    
    function openDialog(id: number): void {
      openDialogId = id;
      showCopyConfirmation = false;
    }
    
    function closeDialog(): void {
      openDialogId = null;
      showCopyConfirmation = false;
    }
    
    function copyToClipboard(text: string): void {
      navigator.clipboard.writeText(text);
      showCopyConfirmation = true;
      setTimeout(() => {
        showCopyConfirmation = false;
      }, 2000);
    }

    function fillSearchInputAndSubmit(query: string) {
      const input = document.querySelector('input[name=searchQuery]') as HTMLInputElement;
      if (input) {
        input.value = query;
        const form = input.closest('form') as HTMLFormElement;
        if (form) {
          form.submit();
        }
      }
    }
</script>
  
<div class="grid gap-6 p-4">
  {#each matches as match, index}
    <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-200/50 dark:border-gray-700/50">
      <div class="p-6">
        <div class="flex justify-between items-start mb-4">
          <h1 class="text-2xl font-bold text-gray-900 dark:text-gray-100">{match.company}</h1>
          <div class="flex gap-3">
            <button 
              onclick={() => openDialog(index)}
              class="text-white hover:text-white/90 text-sm flex items-center gap-1 transition-colors bg-gradient-to-r from-[#FF6600] to-orange-500 px-3 py-1 rounded-lg shadow-sm"
            >
              <span>Apply</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </button>
            <a href={match.website} target="_blank" class="text-gray-700 dark:text-gray-300 hover:text-[#FF6600] dark:hover:text-orange-500 text-sm flex items-center gap-1 transition-colors">
              <span>Visit</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
        
        <div class="flex flex-wrap gap-4 mb-4">
          <div class="px-3 py-2 bg-gradient-to-r from-[#FF6600] to-orange-500 rounded-lg shadow-sm">
            <p class="text-xs text-white/90 uppercase tracking-wider">Batch</p>
            <p class="font-medium text-white">{match.batch}</p>
          </div>
          <div class="px-3 py-2 bg-gradient-to-r from-[#FF6600] to-orange-500 rounded-lg shadow-sm">
            <p class="text-xs text-white/90 uppercase tracking-wider">Sector</p>
            <p class="font-medium text-white">{match.sector}</p>
          </div>
          <div class="px-3 py-2 bg-gradient-to-r from-[#FF6600] to-orange-500 rounded-lg shadow-sm">
            <p class="text-xs text-white/90 uppercase tracking-wider">Size</p>
            <p class="font-medium text-white">{match.size}</p>
          </div>
        </div>
        
        <p class="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">{match.short_summary}</p>
        
        {#if match.tags && match.tags.trim() !== ''}
          <div class="flex flex-wrap gap-2">
            {#each match.tags.split(',') as tag}
              <span class="px-2 py-1 bg-gradient-to-r from-[#FF6600] to-orange-500 text-white text-xs font-medium rounded-full shadow-sm">{tag.trim()}</span>
            {/each}
          </div>
        {/if}
      </div>
    </div>
    
    {#if openDialogId === index}
      <div class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div class="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-200/50 dark:border-gray-700/50">
          <div class="p-6">
            <div class="flex justify-between items-center mb-4">
              <h2 class="text-xl font-bold text-gray-900 dark:text-gray-100">Apply To {match.company}</h2>
              <!-- svelte-ignore a11y_consider_explicit_label -->
              <button 
                onclick={closeDialog}
                class="text-gray-500 hover:text-[#FF6600] dark:hover:text-orange-500 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div class="mb-4">
              <ol class="list-decimal pl-5 mb-4">
                <li class="text-gray-700 dark:text-gray-300 mb-2">Find someone's email address at the company. CEO or CTO ideally.</li>
                <li class="text-gray-700 dark:text-gray-300 mb-2">Copy this prompt into an LLM (ChatGPT and Grok work best for me) to generate a cold email:</li>
              </ol>
              <div class="bg-gray-200 dark:bg-gray-700 p-4 rounded-lg relative shadow-sm">
                <pre class="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">Write a professional email applying for an internship at {match.company}, a {match.sector} company. 

Consider the following details:
- Company information: {match.summary.trim() === '' ? match.short_summary : match.summary}
- Relevant technologies/areas: {match.tags}

The email should be concise, professional, and highlight why I would be a good fit for this company specifically based on their focus areas.</pre>
              </div>
            </div>
            
            <div class="flex justify-end gap-3">
              <button 
                onclick={() => copyToClipboard(`Write a professional email applying for an internship at ${match.company}, a ${match.sector} company. 

Include the following details:
- Company information: ${match.short_summary}
- Company size: ${match.size}
- Relevant technologies/areas: ${match.tags}

The email should be concise, professional, and highlight why I would be a good fit for this company specifically based on their focus areas.`)}
                class="px-4 py-2 bg-gradient-to-r from-[#FF6600] to-orange-500 text-white rounded-lg text-sm font-medium shadow-sm relative"
                title="Copy to clipboard"
              >
                {#if showCopyConfirmation}
                  Copied!
                {:else}
                  Copy
                {/if}
              </button>
              <button 
                onclick={closeDialog}
                class="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    {/if}
  {/each}
</div>