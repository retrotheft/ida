<script lang="ts">
   import { type Article } from "$lib/classes/Article.svelte.js";

   let { article }: { article: Article } = $props();
</script>

<h2>{article.data.title}</h2>
<p>{article.data.body}</p>
