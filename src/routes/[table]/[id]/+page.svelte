<script lang="ts">
   import { type Instance } from "$lib/data.js";

   let { data }: { data: Record<string, Instance>} = $props()
</script>

{#each Object.values(data) as obj}
   <obj.detail />
   <obj.view />
{/each}
