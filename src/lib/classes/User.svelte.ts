import type { UserSchema } from "$lib/data.js";
import UserBadge from "$lib/components/user/UserBadge.svelte";
import UserDetail from "$lib/components/user/UserDetail.svelte"
import { withProps } from '$lib/functions/withProps.js'
import { withSave } from '$lib/functions/withSave.js'
import { withData } from '$lib/functions/withData.js'
import ArticleList from '$lib/components/article/ArticleList.svelte'
import { put, filter } from '$lib/remote/dexie.js'

export class User {
   public data = $state<UserSchema>({
      id: crypto.randomUUID(),
      name: 'untitled User'
   })

   constructor(data?: UserSchema) {
      if (data) this.data = data
   }

   get snapshot() {
      return $state.snapshot(this.data)
   }

   get listItem() {
      return withProps(UserBadge, { user: this })
   }

   get detail() {
      return withSave(UserDetail, { user: this }, () => put('user')(this.snapshot))
   }

   get articles() {
      return withData(ArticleList, 'articles', () => filter('article')({ userId: this.data.id }) ) as any
   }

   static create() {
      const user = new User()
      return put('user')(user.snapshot)
   }
}
