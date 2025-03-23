
import { z } from "zod";

// Define a schema for Repository type
export const RepositorySchema = z.object({
  id: z.number(),
  name: z.string(),
  full_name: z.string(),
  description: z.string().nullable(),
  html_url: z.string().url(),
  language: z.string().nullable(),
  stargazers_count: z.number(),
  forks_count: z.number(),
  open_issues_count: z.number(),
  watchers_count: z.number(),
  topics: z.array(z.string()).default([]),
  created_at: z.string(),
  updated_at: z.string(),
  pushed_at: z.string(),
  homepage: z.string().nullable(),
  size: z.number(),
  default_branch: z.string(),
  owner: z.object({
    login: z.string(),
    id: z.number(),
    avatar_url: z.string(),
    html_url: z.string().url(),
  }),
  archived: z.boolean(),
  visibility: z.string(),
  fork: z.boolean().optional().default(false),
  mirror: z.boolean().optional().default(false),
  is_template: z.boolean().optional().default(false),
  license: z.object({
    key: z.string(),
    name: z.string(),
    spdx_id: z.string(),
    url: z.string().url().nullable(),
  }).nullable(),
});

// Type enum for repository types
export const RepositoryTypeEnum = z.enum([
  "all",
  "source",
  "fork",
  "archived",
  "mirror",
  "template",
]);

export type RepositoryType = z.infer<typeof RepositoryTypeEnum>;

// Export the inferred type from the schema
export type ValidRepository = z.infer<typeof RepositorySchema>;
