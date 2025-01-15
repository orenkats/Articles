// hooks/useArticleSwitcher.ts
import { useState } from 'react';
import { Article } from '@/types/article';

export const useArticleSwitcher = (initialArticles: Article[]) => {
  const [mainArticle, setMainArticle] = useState<Article>(initialArticles[0]);
  const [otherArticles, setOtherArticles] = useState<Article[]>(initialArticles.slice(1));

  const handleArticleClick = (clickedArticle: Article) => {
    setOtherArticles([mainArticle, ...otherArticles.filter(a => a.id !== clickedArticle.id)]);
    setMainArticle(clickedArticle);
  };

  return { mainArticle, otherArticles, handleArticleClick };
};
