---
layout: layouts/base
pagination:
  data: posts
  size: 1
  alias: post
permalink: "{{ post.fields.permalink }}"
eleventyComputed:
  title: "{{ post.fields.title }}"
  is404: "{{ post.fields.metadata.is404 }}"
---
{{ post.fields.content }}
