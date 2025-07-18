import type { ArticleSchema } from '$lib/data.js'
import { type DatabaseService } from '$lib/data.js'
import ArticleDetail from '$lib/components/article/ArticleDetail.svelte'
import ArticleListItem from '$lib/components/article/ArticleListItem.svelte'
import ArticleView from '$lib/components/article/ArticleView.svelte'
import TagList from '$lib/components/tag/TagList.svelte'
import TagSelect from '$lib/components/tag/TagSelect.svelte'
import UserBadge from '$lib/components/user/UserBadge.svelte'
import UserSelect from '$lib/components/user/UserSelect.svelte'
import { withProps } from '$lib/functions/withProps.js'
import { withSave } from '$lib/functions/withSave.js'
import { withData } from '$lib/functions/withData.js'
import { withInstanceFactory } from '$lib/functions/withInstance.js'
import DataSave from '$lib/components/data/DataSave.svelte'

export class Article {
   public data = $state<ArticleSchema>({
      id: crypto.randomUUID(),
      title: 'untitled',
      body: '',
      date: new Date().toISOString(),
      userId: ''
   })
   lastUpdate: number = $state(Date.now())
   _tags = $state([])

   constructor(public db: DatabaseService, data?: ArticleSchema) {
      if (data) this.data = data
      this.refreshTags()
   }

   refreshTags = () => {
      return this.db.join('article')('tag')({ articleId: this.data.id }).then(res =>
         this._tags = res
      )
   }

   updateUser(id: string) {
      this.data.userId = id
   }

   addTag(id: string) {
      const articleId = this.data.id
      const tagId = id
      const articleTag = { articleId, tagId }
      this.db.put('article_tag')(articleTag)
      console.log("Adding tag with id", id)
      this.lastUpdate = Date.now()
      this.refreshTags()
   }

   get snapshot() {
      return $state.snapshot(this.data)
   }

   get detail() {
      return withSave(DataSave, ArticleDetail, { article: this }, () => this.db.put('article')(this.snapshot))
   }

   get view() {
      return withProps(ArticleView, { article: this })
   }

   get listItem() {
      return withProps(ArticleListItem, { article: this })
   }

   get author() {
      const withInstance = withInstanceFactory(this.db)
      return withInstance(UserBadge, 'user', () => this.db.get('user')(this.data.userId))
   }

   get selectUser() {
      return withData(UserSelect, 'users', () => this.db.all('user')) as any // suppresses error in article.detail
   }

   get tags() {
      return withProps(TagList, { tags: this._tags }) as any
   }

   get selectTags() {
      return withData(TagSelect, 'tags', () => this.db.all('tag')) as any
   }

   static create(db: DatabaseService) {
      const article = new Article(db)
      return db.put('article')(article.snapshot)
   }
}
