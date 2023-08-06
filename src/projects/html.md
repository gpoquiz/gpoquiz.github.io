---
layout: defaultlayout.njk
eleventyNavigation:
  key: html
  parent: projects
---
{{ collections.all | eleventyNavigation: "html" | eleventyNavigationToHtml }}