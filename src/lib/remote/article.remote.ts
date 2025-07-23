import { query, form, command } from '$app/server'
import type { ArticleSchema, TagSchema, UserSchema } from '../data.js'
import { db } from '../../routes/db.js' // wherever you export your db instance

// Query functions for reading data
export const getAllArticles = query(async (): Promise<ArticleSchema[]> => {
  return await db.all('article')
})

export const getArticle = query(async (id: string): Promise<ArticleSchema | undefined> => {
  return await db.get('article')(id)
})

export const getArticlesByUser = query(async (userId: string): Promise<ArticleSchema[]> => {
  return await db.filter('article')({ userId })
})

export const getArticleTags = query(async (articleId: string): Promise<TagSchema[]> => {
  return await db.join('article')('tag')({ articleId })
})

export const getArticleUser = query(async (userId: string): Promise<UserSchema | undefined> => {
  return await db.get('user')(userId)
})

// Form functions for creating/updating (work without JS)
export const createArticle = form(async (data: FormData): Promise<{ success: boolean, id?: string }> => {
  const articleData = {
    id: crypto.randomUUID(),
    title: data.get('title') as string,
    content: data.get('content') as string,
    userId: data.get('userId') as string
  }

  await db.add('article')(articleData)
  await getAllArticles.refresh()

  return { success: true, id: articleData.id }
})

export const updateArticle = form(async (data: FormData): Promise<{ success: boolean }> => {
  const articleData = {
    id: data.get('id') as string,
    title: data.get('title') as string,
    content: data.get('content') as string,
    userId: data.get('userId') as string
  }

  await db.put('article')(articleData)
  await getArticle(articleData.id).refresh()

  return { success: true }
})

// Command functions for programmatic updates
export const deleteArticle = command(async (id: string): Promise<void> => {
  await db.del('article')(id)
  await getAllArticles.refresh()
})

export const addArticleTag = command(async (articleId: string, tagId: string): Promise<void> => {
  const joinRecord = { articleId, tagId }
  await db.put('article_tag')(joinRecord)
  await getArticleTags(articleId).refresh() // This will update all instances!
})

export const rem
