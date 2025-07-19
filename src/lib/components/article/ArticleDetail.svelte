<script lang="ts">
   import { type Article } from "$lib/classes/Article.svelte.js";

   let { article }: { article: Article } = $props();
</script>

<div>
   <label for="title">Title</label><br />
   <input name="title" type="text" bind:value={article.data.title} />
   <article.selectUser callback={article.updateUser} />
</div>
<div>
   <article.tags /><br />
   Add Tag: <article.selectTags callback={article.addTag} />
</div>
<div>
   <label for="body">Body</label><br />
   <textarea name="body" bind:value={article.data.body} rows="10" cols="40"></textarea>
</div>
