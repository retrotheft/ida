import { Article } from './ArticlePure.svelte.js'
import type { DatabaseService } from '$lib/data.js'
import ArticleDetail from '$lib/components/article/ArticleDetail.svelte'
import ArticleListItem from '$lib/components/article/ArticleListItem.svelte'
import ArticleView from '$lib/components/article/ArticleView.svelte'
import { withProps } from '$lib/functions/withProps.js'
import { withSave } from '$lib/functions/withSave.js'
import DataSave from '$lib/components/data/DataSave.svelte'

export interface ArticleComponentGetters {
   readonly detail: any
   readonly view: any
   readonly listItem: any
}

export type EnhancedArticle = Article & ArticleComponentGetters

const createArticleProxy = (db: DatabaseService) => (article: Article) =>
   new Proxy(article, {
      get(target, prop) {
         switch (prop) {
            case 'detail':
               return withSave(DataSave, ArticleDetail, { article: target }, () => db.put('article')(target.snapshot))
            case 'view':
               return withProps(ArticleView, { article: target })
            case 'listItem':
               return withProps(ArticleListItem, { article: target })
            case 'create':
               return () => {
                  const a = new Article()
                  return db.put('article')(a.snapshot)
               }
            default:
               return Reflect.get(target, prop)
         }
      }
   }) as EnhancedArticle

export { createArticleProxy }
