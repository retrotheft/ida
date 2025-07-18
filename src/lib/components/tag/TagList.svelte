<script lang="ts">
   import { type TagSchema } from "$lib/data.js";

   let { tags }: { tags: TagSchema[] } = $props();
</script>

<ul style="display: flex; gap: 1em;">
   {#each tags as tag}
      <li style={`color: black; background-color: ${tag.color}; padding: 0.25em .5em; border-radius: 0.25em;`}>{tag.name}</li>
   {/each}
</ul>
