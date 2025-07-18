import { Article } from '$lib/classes/Article.svelte.js'
import { Tag } from './classes/Tag.svelte.js'
import { User } from './classes/User.svelte.js'
import { z } from 'zod'

export const constructors = {
   article: Article,
   tag: Tag,
   user: User
}

export interface Instance {
   detail: any
   view: any
}

export interface DatabaseService {
   all: Function
   join: Function
   add: Function
   get: Function
   put: Function
   del: Function
}

const articleSchema = z.object({
   id: z.uuid(),
   title: z.string().min(1).max(64),
   body: z.string(),
   date: z.string(),
   userId: z.string()
})

const tagSchema = z.object({
   id: z.uuid(),
   name: z.string().min(1).max(16),
   color: z.string()
})

const userSchema = z.object({
   id: z.uuid(),
   name: z.string().min(1).max(32)
})

const articleTagSchema = z.object({
   articleId: z.uuid(),
   tagId: z.uuid()
})

export type ArticleSchema = z.infer<typeof articleSchema>
export type TagSchema = z.infer<typeof tagSchema>
export type UserSchema = z.infer<typeof userSchema>
export type ArticleTagSchema = z.infer<typeof articleTagSchema>
