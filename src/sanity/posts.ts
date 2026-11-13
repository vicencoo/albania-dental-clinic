import type { PortableTextProps } from "@portabletext/react";
import { cacheLife, cacheTag } from "next/cache";
import { client } from "./client";
import { POST_QUERY, POSTS_QUERY, SLUGS_QUERY } from "./queries";

export interface SanityImage {
  asset?: { _ref: string };
  alt?: string;
}

export interface PostCard {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  mainImage?: SanityImage;
  category?: string;
  publishedAt: string;
  bodyText?: string;
}

export interface Post extends PostCard {
  body: PortableTextProps["value"];
  seoTitle?: string;
  seoDescription?: string;
}

// Cached for about a minute, so new posts appear without a redeploy.

export async function getPosts(): Promise<PostCard[]> {
  "use cache";
  cacheLife("minutes");
  cacheTag("posts");
  return client.fetch<PostCard[]>(POSTS_QUERY);
}

export async function getPost(slug: string): Promise<Post | null> {
  "use cache";
  cacheLife("minutes");
  cacheTag("posts", `post:${slug}`);
  return client.fetch<Post | null>(POST_QUERY, { slug });
}

export async function getPostSlugs(): Promise<string[]> {
  "use cache";
  cacheLife("minutes");
  cacheTag("posts");
  return client.fetch<string[]>(SLUGS_QUERY);
}
