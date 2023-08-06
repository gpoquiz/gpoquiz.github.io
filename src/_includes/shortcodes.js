function article(data) {
  if (!data || data.count > 1) return "Article Filter Error";

  return `
    <article class="col-6 col-12-xsmall work-item">
        <h3>{{ data.title }}</h3>
        <a href="{{ data.page.url }}">
            <img src="{{ data.eleventyNavigation.thumbnail }}" alt="{{ data.title }}" class="image fit thumbnail"/>
        </a>
        <p>{{ data.eleventyNavigation.excerpt }}</p>
    </article>
`;
}

module.exports = {
    article,
};
