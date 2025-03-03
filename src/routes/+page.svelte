<script lang="ts">
    import Results from "$lib/components/Results.svelte";
    import { goto } from '$app/navigation';
    import "../app.css";
    import { onMount } from 'svelte';

    let { form } = $props();
    
    function fillSearchInputAndSubmit(query: string) {
      const input = document.querySelector('input[name=searchQuery]') as HTMLInputElement;
      if (input) {
        input.value = query;
        const form = input.closest('form') as HTMLFormElement;
        if (form) form.submit();
      }
    }

    function goToHome() {
      goto('/');
    }

    const TOP_ROW_SEARCHES = [
      'LLM coding startups',
      'AI infrastructure companies',
      'Developer tools startups',
      'Cloud infrastructure companies',
      'Cybersecurity startups',
      'Web3 infrastructure startups',
      'Open source startups',
      'MLOps companies',
      'Data infrastructure startups',
      'API-first companies',
      'DevOps automation tools',
      'Code quality startups'
    ];

    const BOTTOM_ROW_SEARCHES = [
      'Fintech startups building credit card stuff',
      'Healthcare startups in the dentistry space',
      'Government SaaS companies',
      'B2B marketplace startups',
      'Enterprise software companies',
      'Consumer social startups',
      'EdTech companies',
      'Climate tech startups',
      'Robotics companies',
      'Space tech startups',
      'BioTech companies',
      'AgTech startups'
    ];

    const DOUBLED_TOP_SEARCHES = [...TOP_ROW_SEARCHES, ...TOP_ROW_SEARCHES];
    const DOUBLED_BOTTOM_SEARCHES = [...BOTTOM_ROW_SEARCHES, ...BOTTOM_ROW_SEARCHES];

    const FEATURES = [
      {
        icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
        text: '500+ Active Startups'
      },
      {
        icon: 'M13 10V3L4 14h7v7l9-11h-7z',
        text: 'Real-time Updates'
      },
      {
        icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
        text: 'Smart Search'
      }
    ];
</script>

<svelte:head>
  <title>Internpilot</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-white to-orange-50 dark:from-gray-900 dark:to-black relative">
  <!-- Background pattern -->
  <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDBNIDAgMjAgTCA0MCAyMCBNIDIwIDAgTCAyMCA0MCBNIDAgMzAgTCA0MCAzMCBNIDMwIDAgTCAzMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMC4yIiBzdHJva2Utb3BhY2l0eT0iMC4yIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50 dark:opacity-20 pointer-events-none"></div>

  <div class="relative">
    <!-- Navigation -->
    <nav class="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16 items-center">
          <button
            class="text-gray-700 dark:text-gray-200 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 cursor-pointer"
            onclick={goToHome}>
            <div class="flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span class="font-medium">Home</span>
            </div>
          </button>
          <a 
            href="https://ycombinator.com" 
            target="_blank" 
            class="flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-[#FF6600] transition-colors cursor-pointer">
            <span>Y Combinator</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </nav>

    <main class="pt-24 pb-12 px-6 md:px-12">
      <div class="max-w-7xl mx-auto">
        <!-- Hero Section -->
        <div class="mb-16 text-center max-w-4xl mx-auto">
          <div class="relative inline-block mb-4">
            <h1 class="text-6xl md:text-7xl font-bold bg-gradient-to-r from-[#FF6600] to-orange-500 text-transparent bg-clip-text">
              Internpilot
            </h1>
            <div class="absolute inset-0 overflow-hidden">
              <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 rotate-[30deg] translate-x-[-200%] animate-highlight"></div>
            </div>
          </div>
          
          <p class="text-xl md:text-2xl text-gray-700 dark:text-gray-300 font-light mb-8">
            Startups are the best place to learn. <br/>
            <span class="text-[#FF6600] font-normal">Find active YC startups to work for this summer.</span>
          </p>
          
          <!-- Features -->
          <div class="flex flex-col md:flex-row items-center justify-center gap-6 text-sm text-gray-600 dark:text-gray-400">
            {#each FEATURES as feature}
              <div class="flex items-center gap-2">
                <svg class="w-5 h-5 text-[#FF6600]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={feature.icon} />
                </svg>
                <span>{feature.text}</span>
              </div>
            {/each}
          </div>
        </div>

        <!-- Search Form -->
        <form method="POST" class="w-full max-w-3xl mx-auto mb-16">
          <div class="relative group">
            <div class="absolute inset-0 bg-gradient-to-r from-[#FF6600] to-orange-500 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-200 scale-[0.98] group-hover:scale-100"></div>
            <div class="relative flex items-center">
              <input
                class="w-full p-6 pl-14 pr-36 rounded-2xl bg-white dark:bg-gray-900 border-2 border-transparent shadow-xl text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:border-[#FF6600] dark:focus:border-orange-500 transition-all duration-200 text-lg cursor-text"
                type="text"
                placeholder="Search startups..."
                aria-label="Search startups"
                name="searchQuery">
              <svg class="absolute left-5 w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <button
                class="absolute right-2 bg-gradient-to-r from-[#FF6600] to-orange-500 hover:from-orange-500 hover:to-[#FF6600] text-white py-4 px-8 rounded-xl transition-all duration-200 font-medium shadow-lg text-lg cursor-pointer"
                type="submit">
                Search
              </button>
            </div>
          </div>
        </form>
      
        <!-- Example Searches -->
        {#if !form?.success && !form?.error}
          <div class="w-full max-w-3xl mx-auto overflow-hidden">
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-6 text-center">Try searching for:</p>
            <div class="flex flex-col gap-8">
              <!-- Top row - moving left -->
              <div class="relative overflow-hidden">
                <div class="flex animate-scroll-left">
                  {#each DOUBLED_TOP_SEARCHES as prompt}
                    <button 
                      class="group relative text-sm whitespace-nowrap bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm text-gray-800 dark:text-gray-200 px-6 py-3 transition-all duration-300 mx-4 cursor-pointer shadow-[0_2px_8px_-3px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_12px_-3px_rgba(0,0,0,0.2)] rounded-lg border border-white/10 dark:border-gray-700/30"
                      onclick={() => fillSearchInputAndSubmit(prompt)}>
                      <div class="absolute inset-0 bg-gradient-to-r from-white/50 to-orange-50/50 dark:from-gray-800/50 dark:to-gray-900/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                      <div class="flex items-center gap-2 relative">
                        <span class="group-hover:text-[#FF6600] dark:group-hover:text-orange-500 transition-colors duration-300">{prompt}</span>
                      </div>
                    </button>
                  {/each}
                </div>
              </div>
              
              <!-- Bottom row - moving right -->
              <div class="relative overflow-hidden">
                <div class="flex animate-scroll-right">
                  {#each DOUBLED_BOTTOM_SEARCHES as prompt}
                    <button 
                      class="group relative text-sm whitespace-nowrap bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm text-gray-800 dark:text-gray-200 px-6 py-3 transition-all duration-300 mx-4 cursor-pointer shadow-[0_2px_8px_-3px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_12px_-3px_rgba(0,0,0,0.2)] rounded-lg border border-white/10 dark:border-gray-700/30"
                      onclick={() => fillSearchInputAndSubmit(prompt)}>
                      <div class="absolute inset-0 bg-gradient-to-r from-white/50 to-orange-50/50 dark:from-gray-800/50 dark:to-gray-900/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                      <div class="flex items-center gap-2 relative">
                        <span class="group-hover:text-[#FF6600] dark:group-hover:text-orange-500 transition-colors duration-300">{prompt}</span>
                      </div>
                    </button>
                  {/each}
                </div>
              </div>
            </div>
          </div>
        {/if}
      
        <!-- Search Results -->
        {#if form?.success}
          <div class="mt-16">
            <div class="flex items-center justify-center mb-12">
              <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-200">Results for</h2>
              <span class="ml-3 px-4 py-1.5 bg-gradient-to-r from-[#FF6600] to-orange-500 text-white rounded-full font-medium shadow-lg">"{form.query}"</span>
            </div>
            <Results matches={form.matches}/>
          </div>
        {/if}

        <!-- Error State -->
        {#if form?.error}
          <div class="mt-16">
            <div class="flex items-center justify-center">
              <h2 class="text-2xl font-bold text-center text-gray-800 dark:text-gray-200">
                {form.errorMessage}
              </h2>
            </div>
          </div>
        {/if}
      </div>
    </main>

    <!-- Footer -->
    <footer class="border-t border-gray-200 dark:border-gray-800 mt-12">
      <div class="max-w-7xl mx-auto py-8 px-6 md:px-12 text-center text-sm text-gray-600 dark:text-gray-400">
        Built with ❤️ for YC startup interns • Not affiliated with Y Combinator
      </div>
    </footer>
  </div>
</div>

<style>
  /* Hide scrollbar but keep functionality */
  .scrollbar-hide {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }
  .scrollbar-hide::-webkit-scrollbar {
    display: none; /* Chrome, Safari and Opera */
  }

  @keyframes scroll-left {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }

  @keyframes scroll-right {
    0% {
      transform: translateX(-50%);
    }
    100% {
      transform: translateX(0);
    }
  }

  .animate-scroll-left {
    animation: scroll-left 40s linear infinite;
  }

  .animate-scroll-right {
    animation: scroll-right 40s linear infinite;
  }

  /* Remove hover pause for continuous movement */
  .animate-scroll-left:hover,
  .animate-scroll-right:hover {
    animation-play-state: running;
  }
</style>
