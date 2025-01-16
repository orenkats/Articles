import { Article } from '@/types/article';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL; 

export const fetchArticles = async (): Promise<Article[]> => {
  const response = await fetch(`${BASE_URL}/articles`); 
  if (!response.ok) throw new Error('Failed to fetch articles');
  return response.json();
};

export const fetchArticleById = async (id: number): Promise<Article | null> => {
  const response = await fetch(`${BASE_URL}/articles/${id}`); //

  if (!response.ok) {
    if (response.status === 404) {
      return null; // Article not found
    }
    throw new Error('Failed to fetch article');
  }

  return response.json();
};

export const fetchArticlesByTag = async (tagId: number): Promise<Article[]> => {
  const response = await fetch(`${BASE_URL}/articles/by-tag/${tagId}`); // 
  if (!response.ok) throw new Error('Failed to fetch articles by tag');
  return response.json();
};
