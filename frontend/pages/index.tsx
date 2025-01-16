// pages/index.tsx
import { GetServerSideProps } from 'next';
import { fetchArticles } from '@/services/apiService';
import { Article } from '@/types/article';
import MainArticle from '@/components/MainArticle';
import AdditionalArticles from '@/components/AdditionalArticles';
import styles from '../styles/index.module.scss';

type HomePageProps = {
  articles: Article[];
};

export const getServerSideProps: GetServerSideProps = async () => {
  const articles = await fetchArticles();
  return { props: { articles } };
};

export default function HomePage({ articles }: HomePageProps) {
  const mainArticle = articles[0]; // First article as the main article
  const otherArticles = articles.slice(1); // Remaining articles as additional articles

  return (
    <div className={styles.homePage}>
      {/* Render the main article */}
      <MainArticle article={mainArticle} />

      {/* Render additional articles with links */}
      <AdditionalArticles articles={otherArticles} />
    </div>
  );
}
