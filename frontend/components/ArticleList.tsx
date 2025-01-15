import React from 'react';
import { Article } from '@/types/article';
import Link from 'next/link';

type ArticleListProps = {
  articles: Article[] | null | undefined;
  title?: string; // Optional title for the section
};

export default function ArticleList({ articles, title }: ArticleListProps) {
  if (!articles || !Array.isArray(articles)) {
    return <div>No articles found or data is invalid.</div>;
  }

  return (
    <div>
      {title && <h2 style={{ marginTop: '20px' }}>{title}</h2>}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {articles.map((article) => (
          <li key={article.id} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc' }}>
            <img src={article.imageURL} alt={article.title} style={{ width: '100%', borderRadius: '5px' }} />
            <h2>{article.title}</h2>
            <p>{article.description?.slice(0, 100)}...</p>
            <div>
              <strong>Tags:</strong>
              <ul style={{ display: 'flex', gap: '10px', padding: 0 }}>
                {article.tags.map((tag) => (
                  <li key={tag.tagId} style={{ listStyle: 'none' }}>
                    <Link href={`/tags/${tag.tagId}`}>
                      <a style={{ color: 'blue', textDecoration: 'underline' }}>{tag.tagName}</a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
