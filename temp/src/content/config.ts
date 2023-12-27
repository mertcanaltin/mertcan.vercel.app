import { defineCollection, z, reference } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      date: z.coerce.date(),
      tag: reference("tags"),
      image: z
        .object({
          src: z.preprocess((v) => `@/assets/content/${v}`, image()),
          alt: z.string().optional().default(""),
        })
        .optional(),
      status: z.enum(["published", "draft"]),
      canonical_url: z.string().optional(),
    }),
});

const tags = defineCollection({
  // TODO: switch to json
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
  }),
});

const pages = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    feature_image: z.string().optional(),
    feature_image_caption: z.string().optional(),
    feature_image_alt: z.string().optional(),
  }),
});

export const collections = {
  blog,
  tags,
  pages,
};
