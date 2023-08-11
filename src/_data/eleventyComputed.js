function getFile(filePathStem) {
  return filePathStem.match(/\/([A-z]+)$/)[1];
}

function buildThumbnail(data) {
  const file = getFile(data.page.filePathStem);
  return data.page.thumbnail ?? `/images/thumbnails/${file}.png`;
}

function getParent(filePathStem) {
  const results = filePathStem.match(/\/([A-z]+)\/[A-z]+$/);
  return results ? results[1] : "index";
}

function buildNavigation(data) {
  if (!data.title)
  {
    return;
  }
  const eleventyNavigation = {
    key: data.page.fileSlug,
    parent: data.parent ?? getParent(data.page.filePathStem) ?? "index"
  };

  return eleventyNavigation;
}

function buildBackground(data) {
  if (data.page.background)
    return data.page.background;
  if (!data.excerpt)
    return  "/images/backgrounds/index.png";
    
  const file = getFile(data.page.filePathStem);
  return data.page.background ?? `/images/backgrounds/${file}.png`;
}

module.exports = {
  eleventyNavigation: buildNavigation,
  background: buildBackground,
  thumbnail: buildThumbnail
};
