import type { ArticleSchema, TagSchema } from '$lib/data.js'
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
import { withInstance } from '$lib/functions/withInstance.js'
import { add, put, del, join, get, filter, all } from "$lib/remote/dexie.js"

export class Article {
   public data = $state<ArticleSchema>({
      id: crypto.randomUUID(),
      title: 'untitled',
      body: '',
      date: new Date().toISOString(),
      userId: ''
   })
   _tags = $state<TagSchema[]>([])
   user = $derived(get('user')(this.data.userId))

   constructor(data?: ArticleSchema) {
      if (data) this.data = data
      this.refreshTags()
   }

   refreshTags = () => {
      return join('article')('tag')({ articleId: this.data.id })
         .then((res) => this._tags = (res as TagSchema[]) || [])
   }

   updateUser = (id: string) => {
      this.data.userId = id
   }

   addTag = (id: string) => {
      const articleId = this.data.id
      const tagId = id
      const articleTag = { articleId, tagId }
      put('article_tag')(articleTag)
      this.refreshTags()
   }

   removeTag = (tagId: string) => {
      const articleId = this.data.id
      del('article_tag')([articleId, tagId])
      this.refreshTags()
   }

   // using as any suppresses error in article.detail - need to type components properly
   get snapshot() { return $state.snapshot(this.data) }
   get detail() { return withSave(ArticleDetail, { article: this }, () => put('article')(this.snapshot)) }
   get view() { return withProps(ArticleView, { article: this }) }
   get listItem() { return withProps(ArticleListItem, { article: this }) }
   get tagsList() { return withProps(TagList, { tags: this._tags, remove: this.removeTag }) as any }
   get selectUser() { return withData(UserSelect, 'users', () => all('user')) as any }
   get selectTags() { return withData(TagSelect, 'tags', () => all('tag')) as any }
   get author() { return withInstance(UserBadge, 'user', () => get('user')(this.data.userId), ) }

   static create() {
      const article = new Article()
      return put('article')(article.snapshot)
   }
}
