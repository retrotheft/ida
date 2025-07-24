import type { PageLoad } from "./$types.js";
import { constructors } from "$lib/data.js";
import { tableExists, get, type TableNames } from '$lib/remote/dexie.js'

type ValidTableName = keyof typeof constructors;

function isValidTableName(tableName: string): tableName is ValidTableName {
   return tableName in constructors;
}

export const load: PageLoad = async ({ params }) => {
   const tableName = params.table;

   if (tableExists(tableName) && isValidTableName(tableName)) {
      const getFromTable = get(params.table as keyof TableNames)
      const data = await getFromTable(params.id)

      const Constructor = constructors[tableName];

      return {
      // @ts-ignore
         [tableName]: new Constructor(data)
      };
   } else {
      return {};
   }
}
