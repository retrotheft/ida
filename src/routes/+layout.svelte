<script lang="ts">
   import { database as db } from '$lib/remote/dexie.js'
</script>

{#if db}
<nav>
   <ul>
      <li><a href="/">Home</a></li>
      {#each db.tables.filter(t => !t.name.includes('$') && !t.name.includes('_')) as { name }}
         <li><a href={`/${name}`}>{name}</a></li>
      {/each}
   </ul>
</nav>
<slot />
{:else}
   No Database Configured
{/if}
