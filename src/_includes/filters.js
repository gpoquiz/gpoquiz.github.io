function navigationKeyFilter(collection, key) {
  if (!key) return [];
  const filtered = collection.find((item) => {
    return item.data && item.data.title && item.data.page.fileSlug === key;
  });
  if (!filtered)
    return {
      title: "ERROR",
      page: { url: "/" },
      thumbnail: "",
    };
  return filtered.data;
}

function navigationParentFilter(collection, key) {
  if (!key) return [];
  const filtered = collection.filter((item) => {
    return (
      item.data &&
      item.data.eleventyNavigation &&
      item.data.eleventyNavigation.parent == key
    );
  });
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
    result = `<div class="row">`;
    collection.forEach((item) => {
      result += templateToArticle(item.data);
    });
    result += `</div>`
  }
  return result;
}

function templateToArticle(data) {
  return `
  <article class="col-6 col-12-xsmall work-item">
    <h3>${data.title}</h3>
    <a href="${data.page.url}">
      <img src="${data.thumbnail}" alt="${data.title}" class="image fit thumbnail"/>
    </a>
    <p>${data.excerpt??""}</p>
  </article>
`;
}
module.exports = {
  navigationKeyFilter,
  articleFilter,
  navigationParentFilter,
};
