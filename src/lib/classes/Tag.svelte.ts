import type { DatabaseService, TagSchema } from "$lib/data.js";
import TagBadge from "$lib/components/tag/TagBadge.svelte";
import TagDetail from "$lib/components/tag/TagDetail.svelte"
import ArticleList from '$lib/components/article/ArticleList.svelte'
import { withData } from '$lib/functions/withData.js'
import { withProps } from '$lib/functions/withProps.js'
import { withSave } from '$lib/functions/withSave.js'
import DataSave from "$lib/components/data/DataSave.svelte";

export class Tag {
   public data = $state<TagSchema>({
      id: crypto.randomUUID(),
      name: 'untitled tag',
      color: 'white'
   })

   constructor(public db: DatabaseService, data?: TagSchema) {
      if (data) this.data = data
   }

   get snapshot() {
      return $state.snapshot(this.data)
   }

   get listItem() {
      return withProps(TagBadge, { tag: this })
   }

   get detail() {
      return withSave(DataSave, TagDetail, { tag: this }, () => this.db.put('tag')(this.snapshot))
   }

   get articles() {
      return withData(ArticleList, 'articles', () => this.db.join('tag')('article')({ tagId: this.data.id })) as any
   }

   static create(db: DatabaseService) {
      const tag = new Tag(db)
      return db.put('tag')(tag.snapshot)
   }
}
