import Dexie, { type EntityTable } from 'dexie'
import type { DatabaseService, ArticleSchema, TagSchema, UserSchema } from '$lib/data.js'

export interface TableNames {
   article: EntityTable<ArticleSchema, 'id'>
   tag: EntityTable<TagSchema, 'id'>
   user: EntityTable<UserSchema, 'id'>
}

class DexieDatabase extends Dexie.default implements DatabaseService, TableNames {
   article!: EntityTable<ArticleSchema, 'id'>
   tag!: EntityTable<TagSchema, 'id'>
   user!: EntityTable<UserSchema, 'id'>

   constructor() {
      super('blog-db')
      this.version(1).stores({
         article: "&id, title, date, userId",
         tag: "&id, name",
         user: "&id, name"
      })
   }

   all = (tableName: keyof TableNames) => {
      const table = this[tableName]
      if (!table) return
      return table.toArray()
   }

   add = (tableName: keyof TableNames) => (item: any, key?: any) => {
      const table = this[tableName]
      if (!table) return
      return table.add(item, key)
   }


   get = (tableName: keyof TableNames) => (param: any) => {
      if (!param) return undefined
      const table = this[tableName]
      if (!table || !param) return new Error('An error occurred')
      return table.get(param)
   }

   put = (tableName: keyof TableNames) => (item: any, key?: any) => {
      const table = this[tableName]
      if (!table) return
      return table.put(item, key)
   }

   del = (tableName: keyof TableNames) => (key: any) => {
      const table = this[tableName]
      if (!table) return
      return table.delete(key)
   }
}

export const db = new DexieDatabase()
