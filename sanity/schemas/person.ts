import { defineField, defineType } from "sanity";

export default defineType({
  name: "person",
  title: "Person",
  type: "document",
  fields: [
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      validation: (Rule) => Rule.required(),
      options: {
        maxLength: 96,
      },
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "string",
    }),
    defineField({
      name: "letter",
      title: "Letter",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "accessCodeHash",
      title: "Access Code Hash",
      type: "string",
      validation: (Rule) => Rule.required(),
      hidden: true,
    }),
    defineField({
      name: "opened",
      title: "Opened",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "rack",
      title: "Rack",
      type: "reference",
      to: [{ type: "rack" }],
    }),
    defineField({
      name: "position",
      title: "Position",
      type: "number",
      validation: (Rule) => Rule.min(1).max(5),
      initialValue: 1,
    }),
  ],
  preview: {
    select: {
      title: "slug.current",
      subtitle: "description",
    },
  },
});
