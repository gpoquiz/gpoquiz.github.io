

function navigationKeyFilter(collection, key) {
    if (!key) return [];
    const filtered = collection.find(
      (item) =>
        item.data &&
        item.data.key == key
    );
    if (!filtered)
      return {
    title: "ERROR",
    page: {url: "/"},
    thumbnail: ""
    }
    console.log(filtered);
    return filtered.data;
  }

function articleFilter(collection, key = null) {
  
  if (!collection)
  return "Article Filter Error";

  data =  key ? navigationKeyFilter(collection, key) : collection;
  
  return dataToArticle(data);
}

function dataToArticle(data) {
  return `
  <article class="col-6 col-12-xsmall work-item">
    <h3>${ data.title }</h3>
    <a href="${ data.page.url }">
      <img src="${ data.thumbnail }" alt="${ data.title }" class="image fit thumbnail"/>
    </a>
    <p>${ data.excerpt }</p>
  </article>`;
}
  module.exports = {
    navigationKeyFilter,
    articleFilter
  }

  