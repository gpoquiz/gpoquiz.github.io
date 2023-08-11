---
tite: HTML
layout: defaultlayout.njk
---
{{ collections.all | navigationParentFilter:page.fileSlug | articleFilter }}