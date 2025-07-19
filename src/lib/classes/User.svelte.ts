import type { DatabaseService, UserSchema } from "$lib/data.js";
import UserBadge from "$lib/components/user/UserBadge.svelte";
import UserDetail from "$lib/components/user/UserDetail.svelte"
import { withProps } from '$lib/functions/withProps.js'
import { withSave } from '$lib/functions/withSave.js'
import { withData } from '$lib/functions/withData.js'
import DataSave from "$lib/components/data/DataSave.svelte";
import ArticleList from '$lib/components/article/ArticleList.svelte'

export class User {
   public data = $state<UserSchema>({
      id: crypto.randomUUID(),
      name: 'untitled User'
   })

   constructor(public db: DatabaseService, data?: UserSchema) {
      if (data) this.data = data
   }

   get snapshot() {
      return $state.snapshot(this.data)
   }

   get listItem() {
      return withProps(UserBadge, { user: this })
   }

   get detail() {
      return withSave(DataSave, UserDetail, { user: this }, () => this.db.put('user')(this.snapshot))
   }

   get articles() {
      return withData(ArticleList, 'articles', () => this.db.filter('article')({ userId: this.data.id }) ) as any
   }

   static create(db: DatabaseService) {
      const user = new User(db)
      return db.put('user')(user.snapshot)
   }
}
