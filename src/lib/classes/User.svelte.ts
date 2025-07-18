import type { DatabaseService, UserSchema } from "$lib/data.js";
import UserBadge from "$lib/components/user/UserBadge.svelte";
import UserDetail from "$lib/components/user/UserDetail.svelte"
import { withProps } from '$lib/functions/withProps.js'
import { withSave } from '$lib/functions/withSave.js'
import DataSave from "$lib/components/data/DataSave.svelte";

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

   static create(db: DatabaseService) {
      const user = new User(db)
      return db.put('user')(user.snapshot)
   }
}
