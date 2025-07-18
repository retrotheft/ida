<script lang="ts">
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

{@render children(restProps)}
