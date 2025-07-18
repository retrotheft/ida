<script lang="ts">
   // @ts-nocheck
   import { onMount } from 'svelte'

   let { loader, children } = $props()

   onMount(async () => {
      const response = await loader()
   })
</script>

<svelte:boundary>
   {@render children(await loader())}

   {#snippet pending()}
      Loading...
   {/snippet}

   {#snippet failed(error, reset)}
      Something went wrong! {error}
   {/snippet}
</svelte:boundary>
