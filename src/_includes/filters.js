

function navigationKeyFilter(collection, key) {
    if (!key) return [];
    const filtered = collection.find(
      (item) =>
        item.data &&
        item.data.eleventyNavigation &&
        item.data.eleventyNavigation.key == key
    );
    return filtered.data;
  }


// 
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
      <img src="${ data.eleventyNavigation.thumbnail }" alt="${ data.title }" class="image fit thumbnail"/>
    </a>
    <p>${ data.eleventyNavigation.excerpt }</p>
  </article>`;
}
  module.exports = {
    navigationKeyFilter,
    articleFilter
  }

  