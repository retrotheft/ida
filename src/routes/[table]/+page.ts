import type { PageLoad } from "./$types.js";
import { constructors } from "$lib/data.js";
import { tableExists, all } from '$lib/remote/dexie.js'

// Type for valid table names that have constructors
type ValidTableName = keyof typeof constructors;

// Type guard to check if a string is a valid table name
function isValidTableName(tableName: string): tableName is ValidTableName {
   return tableName in constructors;
}

export const load: PageLoad = async ({ params }) => {
   const tableName = params.table;

   // Type-safe validation
   if (tableExists(tableName) && isValidTableName(tableName)) {
      const result = await all(tableName) as any[];
      console.log(result)
      // Type-safe constructor access
      const Constructor = constructors[tableName];

      return {
         entries: result.map(data => new Constructor(data)),
         constructor: Constructor,
         table: params.table
      };
   } else {
      return {};
   }
}
