
import { type DatabaseService } from "$lib/data.js"
import { getDB } from "$lib/dbConfig.js"

export class BaseDB {
   protected static db?: DatabaseService

   constructor() {
      if (!BaseDB.db) {
         BaseDB.db = getDB()
         if (BaseDB.db) console.log("Successfully loaded database", BaseDB.db)
      }
   }

   protected getDB() {
      if (!BaseDB.db) {
         const db = getDB()
         if (!db) throw new Error("Unable to load Database.")
         BaseDB.db = db
      }
      return BaseDB.db
   }
}
