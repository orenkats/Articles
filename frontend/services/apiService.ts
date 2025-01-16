import { Article } from '@/types/article';

export const fetchArticles = async (): Promise<Article[]> => {
  const response = await fetch('http://localhost:5075/api/data/articles');
  if (!response.ok) throw new Error('Failed to fetch articles');
  return response.json();
};

export const fetchArticleById = async (id: number): Promise<Article | null> => {
  const response = await fetch(`http://localhost:5075/api/data/articles/${id}`);
  
  if (!response.ok) {
    if (response.status === 404) {
      return null; // Article not found
    }
    throw new Error('Failed to fetch article');
  }

  return response.json();
};

export const fetchArticlesByTag = async (tagId: number): Promise<Article[]> => {
  const articles = await fetchArticles();
  return articles.filter((article) => article.tags.some((tag) => tag.tagId === tagId));
};
