<script lang="ts">
   import { type ArticleSchema } from "$lib/data.js";

   let { articles }: { articles: ArticleSchema[] } = $props();
</script>

<ul>
   {#each articles as article}
      <li>{article.title}</li>
   {/each}
</ul>
