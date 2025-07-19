import { type DatabaseService } from '$lib/data.js'

let db: DatabaseService | undefined = undefined

export function setDB(_db: DatabaseService) {
   db = _db
}

export function getDB() {
   if (!db) throw new Error("Database not initialised. Call setDB before getDB")
   return db
}
