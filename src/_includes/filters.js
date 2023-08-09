function navigationKeyFilter(collection, key) {
  if (!key) return [];
  const filtered = collection.find(
    (item) => 
    {
      return item.data && item.data.page.fileSlug === key}

  );
  if (!filtered)
    return {
      title: "ERROR",
      page: { url: "/" },
      thumbnail: "",
    };
  
  return filtered;
}

function articleFilter(collection, ...key) {
  if (!collection) return "Article Filter Error";

  let result = "";
  if (key.length) {
    key.forEach((item) => {
      template = navigationKeyFilter(collection, item);
      result += templateToArticle(template);
    });
  } else {
    for (data in collection) {
      result += templateToArticle(data);
    }
  }
  return result;
}

function templateToArticle(template) {
  console.log(template);
  return `
<article class="col-6 col-12-xsmall work-item">
  <h3>${template.title}</h3>
  <a href="${template.data.page.url}">
    <img src="${template.data.thumbnail}" alt="${template.title}" class="image fit thumbnail"/>
  </a>
  <p>${data.excerpt}</p>
</article>
`;
}
module.exports = {
  navigationKeyFilter,
  articleFilter,
};
