<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

{@render children()}

<style>
	html, body {
  @apply bg-gray-50 dark:bg-gray-900; /* Ensure full-page background */
  min-height: 100vh; /* Extend to at least full viewport height */
}

</style>