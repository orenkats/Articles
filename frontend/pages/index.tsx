import { GetServerSideProps } from 'next';
import { Article } from '../types/articale';
import ArticleList from '../components/ArticleList';

type HomePageProps = {
  articles: Article[];
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const res = await fetch('http://localhost:5075/api/data/articles');

    if (!res.ok) {
      console.error(`Error fetching articles: ${res.statusText}`);
      return { props: { articles: null } };
    }

    const articles: Article[] = await res.json();
    console.log('Fetched articles:', articles);

    return { props: { articles } };
  } catch (error) {
    console.error('Error in getServerSideProps:', error);
    return { props: { articles: null } };
  }
};

export default function HomePage({ articles }: HomePageProps) {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Articles</h1>
      <ArticleList articles={articles} />
    </div>
  );
}
