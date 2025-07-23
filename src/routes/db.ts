import Dexie, { type EntityTable } from 'dexie'
import type { DatabaseService, ArticleSchema, TagSchema, UserSchema, ArticleTagSchema } from '$lib/data.js'

export interface TableNames {
   article: EntityTable<ArticleSchema, 'id'>
   tag: EntityTable<TagSchema, 'id'>
   user: EntityTable<UserSchema, 'id'>
   article_tag: EntityTable<ArticleTagSchema>
}

class DexieDatabase extends Dexie.default implements DatabaseService, TableNames {
   article!: EntityTable<ArticleSchema, 'id'>
   tag!: EntityTable<TagSchema, 'id'>
   user!: EntityTable<UserSchema, 'id'>
   article_tag!: EntityTable<ArticleTagSchema>

   constructor() {
      super('dda-db')
      this.version(1).stores({
         article: "&id, title, date, userId",
         tag: "&id, name",
         user: "&id, name",
         article_tag: "&[articleId+tagId], articleId, tagId"
      })
   }

   all = (tableName: keyof TableNames) => {
      const table = this[tableName]
      if (!table) return
      return table.toArray()
   }

   filter = (tableName: keyof TableNames) => (param: Object) => {
      const table = this[tableName]
      if (!table) return
      return table.where(param).toArray()
   }

   // partially apply source and target tables and join them with underscore
   join = (sourceTableName: keyof TableNames) => (targetTableName: keyof TableNames) => async (param: { [key: string]: any}) => {
      const joinTableName1 = sourceTableName + '_' + targetTableName as keyof TableNames
      const joinTableName2 = targetTableName + '_' + sourceTableName as keyof TableNames

      const joinTable = this[joinTableName1] ?? this[joinTableName2]
      const targetTable = this[targetTableName]

      if (!joinTable || !targetTable) return console.warn("Table doesn't exist")

      const [ key, value ] = Object.entries(param)[0]

      const joinRecords = await joinTable.where(key).equals(value).toArray()

      const targetIdField = targetTableName + 'Id'

      const targetIds = joinRecords.map((record: any) => record[targetIdField])
      const targetRecords = await targetTable.where('id').anyOf(targetIds).toArray()

      return targetRecords
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
      const table = this[tableName] as any
      if (!table) return
      return table.delete(key)
   }
}

export const db = new DexieDatabase()
