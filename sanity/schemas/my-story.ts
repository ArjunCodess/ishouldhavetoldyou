import { defineField, defineType } from "sanity";

export default defineType({
  name: "myStory",
  title: "My Story",
  type: "document",
  __experimental_formPreviewTitle: false,
  fields: [
    defineField({
      name: "content",
      title: "Content",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "My Story",
      };
    },
  },
});
