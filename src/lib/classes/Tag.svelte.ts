import type { TagSchema } from "$lib/data.js";
import TagBadge from "$lib/components/tag/TagBadge.svelte";
import TagDetail from "$lib/components/tag/TagDetail.svelte"
import ArticleList from '$lib/components/article/ArticleList.svelte'
import { withData } from '$lib/functions/withData.js'
import { withProps } from '$lib/functions/withProps.js'
import { withSave } from '$lib/functions/withSave.js'
import { add, all, get, put, del, join, filter } from '$lib/remote/dexie.js'

export class Tag {
   public data = $state<TagSchema>({
      id: crypto.randomUUID(),
      name: 'untitled tag',
      color: 'white'
   })

   constructor(data?: TagSchema) {
      if (data) this.data = data
   }

   get snapshot() {
      return $state.snapshot(this.data)
   }

   get listItem() {
      return withProps(TagBadge, { tag: this })
   }

   get detail() {
      return withSave(TagDetail, { tag: this }, () => put('tag')(this.snapshot))
   }

   get articles() {
      return withData(ArticleList, 'articles', () => join('tag')('article')({ tagId: this.data.id })) as any
   }

   static create() {
      const tag = new Tag()
      return put('tag')(tag.snapshot)
   }
}
