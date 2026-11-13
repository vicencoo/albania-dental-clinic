import { groq } from "next-sanity";

/** Fields needed for a journal card (list page). `bodyText` is plain text for reading time. */
const CARD_FIELDS = `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  mainImage,
  category,
  publishedAt,
  "bodyText": pt::text(body)
`;

export const POSTS_QUERY = groq`*[_type=="post" && defined(slug.current)]
  | order(publishedAt desc){${CARD_FIELDS}}`;

export const POST_QUERY = groq`*[_type=="post" && slug.current==$slug][0]{
  ${CARD_FIELDS},
  body,
  seoTitle,
  seoDescription
}`;

export const SLUGS_QUERY = groq`*[_type=="post" && defined(slug.current)].slug.current`;
