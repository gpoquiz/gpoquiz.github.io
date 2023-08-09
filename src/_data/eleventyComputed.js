function getFile(filePathStem) {
  return filePathStem.match(/\/(.+)$/)[1];
}

function buildThumbnail(data) {
  const file = getFile(data.page.filePathStem);
  return data.page.thumbnail ?? `/images/thumbnail/${file}.png`;
}

function getParent(filePathStem) {
  const results = filePathStem.match(/\/(.+)\/.+$/);
  return results ? results[1] : "index";
}

function buildNavigation(data) {
  const eleventyNavigation = {
    key: data.page.fileslug,
    parent: data.page.parent ?? getParent(data.page.filePathStem) ?? "index"
  };

  if (data.page.fileSlug === "") {
    console.log(data);
  }

  return eleventyNavigation;
}

function buildBackground(data) {
  const file = getFile(data.page.filePathStem);
  return data.page.background ?? `/images/backgrounds/${file}.png`;
}

module.exports = {
  eleventyNavigation: buildNavigation,
  background: buildBackground,
  thumbnail: buildThumbnail
};
