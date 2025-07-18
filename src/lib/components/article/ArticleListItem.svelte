<script lang="ts">
   import { type Article } from '$lib/classes/Article.svelte.js'

   let { article }: { article: Article & { author: any } } = $props()
</script>

<strong>{article.data.title}</strong> by <em><article.author /></em>
