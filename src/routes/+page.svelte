<script lang="ts">
    import Results from "$lib/components/Results.svelte";
    let { form } = $props();
  </script>
  
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 md:p-12">
    <div class="max-w-5xl mx-auto">
      <div class="mb-12 text-center">
        <h1 class="text-5xl font-bold text-indigo-600 dark:text-indigo-400 mb-4">Internpilot</h1>
        <p class="text-xl text-gray-700 dark:text-gray-300">
          Startups are the best place to learn. <br/>
          We've built a system to help you find YC-backed startups to work for.
        </p>
      </div>
  
      <form method="POST" class="w-full max-w-xl mx-auto mb-12">
        <div class="relative">
          <input
            class="w-full p-4 pl-6 pr-20 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md text-gray-800 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
            type="text"
            placeholder="Search startups..."
            aria-label="Search startups"
            name="searchQuery">
          <button
            class="absolute right-2 top-1/2 transform -translate-y-1/2 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-5 rounded-lg transition-colors duration-200 font-medium"
            type="submit">
            Search
          </button>
        </div>
      </form>
      
      {#if form?.success}
        <div class="mb-6">
          <div class="flex items-center mb-8">
            <h2 class="text-2xl font-bold text-gray-800 dark:text-white">Search Results for</h2>
            <span class="ml-2 px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 rounded-lg font-medium">"{form.query}"</span>
          </div>
          <Results matches={form.matches}/>
        </div>
      {/if}
      {#if form?.error}
      <div class="mb-6">
        <div class="flex items-center mb-8">
          <h2 class="text-2xl font-bold text-center w-full text-red-800 dark:text-white">
            {form.errorMessage}
        </h2>
    </div>
      </div>
      {/if}
    </div>
  </div>