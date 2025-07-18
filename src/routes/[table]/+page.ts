import type { PageLoad } from "./$types.js";
import { db, type TableNames } from '../db.js'
import { constructors } from "$lib/data.js";

// Type for valid table names that have constructors
type ValidTableName = keyof typeof constructors;

// Type guard to check if a string is a valid table name
function isValidTableName(tableName: string): tableName is ValidTableName {
   return tableName in constructors;
}

// Type guard to check if table exists in database
function tableExistsInDb(tableName: string): tableName is keyof TableNames {
   return db.tables.some(table => table.name === tableName);
}

export const load: PageLoad = async ({ params }) => {
   const tableName = params.table;

   // Type-safe validation
   if (tableExistsInDb(tableName) && isValidTableName(tableName)) {
      const result = await db.all(tableName) as any[]; // You might want to type this more specifically

      // Type-safe constructor access
      const Constructor = constructors[tableName];

      return {
         entries: result.map(el => new Constructor(db, el)),
         constructor: Constructor,
         table: params.table
      };
   } else {
      return {};
   }
}
