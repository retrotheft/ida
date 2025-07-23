<script lang="ts">
   import { type Article } from "$lib/classes/Article.svelte.js";

   let { article }: { article: Article } = $props();

   // @ts-expect-error: ts 1308
   const user = $derived(await article.user);

   // let user = $state.raw(null)

   // $effect(async () => {
   //    user = await article.user
   // })

   console.log(article)
</script>

<div>
   <label for="title">Title</label><br />
   <input name="title" type="text" bind:value={article.data.title} />
   <article.selectUser callback={article.updateUser} />by {user?.name}
</div>
<div>
   <article.tagsList /><br />
   Add Tag: <article.selectTags callback={article.addTag} />
</div>
<div>
   <label for="body">Body</label><br />
   <textarea name="body" bind:value={article.data.body} rows="10" cols="40"></textarea>
</div>
