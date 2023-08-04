
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
  module.exports = {
    navigationKeyFilter,
  }