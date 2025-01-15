import React, { useEffect, useState } from 'react';
import { Article } from '@/types/articale';
import Link from 'next/link';

type ArticleListProps = {
  articles: Article[] | null | undefined;
  lazyLoad?: boolean;
};

export default function ArticleList({ articles, lazyLoad = false }: ArticleListProps) {
  const [visibleArticles, setVisibleArticles] = useState<Article[]>([]);

  useEffect(() => {
    if (!lazyLoad || !articles) return;
    setVisibleArticles(articles.slice(0, 5)); // Show 5 articles initially
  }, [articles, lazyLoad]);

  const loadMore = () => {
    if (!articles) return;
    setVisibleArticles(articles);
  };

  if (!articles || !Array.isArray(articles)) {
    return <div>No articles found or data is invalid.</div>;
  }

  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {visibleArticles.map((article) => (
        <li key={article.id} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc' }}>
          <img src={article.imageURL} alt={article.title} style={{ width: '100%', borderRadius: '5px' }} />
          <h2>{article.title}</h2>
          <p>{article.description?.slice(0, 100)}...</p>
          <div>
            <strong>Tags:</strong>
            <ul>
              {article.tags.map((tag) => (
                <li key={tag.tagId}>
                  <Link href={`/tags/${tag.tagId}`}>
                    <a>{tag.tagName}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <Link href={`/articles/${article.id}`}>
            <a style={{ color: 'blue', textDecoration: 'underline' }}>Read More</a>
          </Link>
        </li>
      ))}
      {lazyLoad && visibleArticles.length < articles.length && (
        <button onClick={loadMore} style={{ margin: '20px auto', display: 'block' }}>
          Load More
        </button>
      )}
    </ul>
  );
}
