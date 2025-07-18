import type { ArticleSchema } from '$lib/data.js'

export class Article {
   public data = $state<ArticleSchema>({
      id: crypto.randomUUID(),
      title: 'untitled',
      body: '',
      date: new Date().toISOString(),
      userId: ''
   })

   constructor(data?: ArticleSchema) {
      if (data) this.data = data
   }

   get snapshot() {
      return $state.snapshot(this.data)
   }
}
