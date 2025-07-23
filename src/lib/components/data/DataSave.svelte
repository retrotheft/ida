<script lang="ts">
   // @ts-nocheck
   import { type Snippet } from 'svelte'

   let { saver, children, ...restProps }: { saver: Function, children: Snippet<[any]>} = $props()

   $effect(() => {
      try {
         saver()
      } catch(err) {
         console.error("Save failed", err)
      }
   })
</script>

<svelte:boundary>
   {@render children(restProps)}

   <!--  this is still giving ts error 2353, at least in Zed :( -->
   {#snippet pending()}
      Loading...
   {/snippet}

   {#snippet failed(error, reset)}
      Something went wrong! {error}
   {/snippet}
</svelte:boundary>
