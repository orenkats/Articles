// pages/index.tsx
import { GetServerSideProps } from 'next';
import { useArticleSwitcher } from '@/hooks/useArticleSwitcher';
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
  const { mainArticle, otherArticles, handleArticleClick } =
    useArticleSwitcher(articles);

  return (
    <div className={styles.homePage}>
      <MainArticle article={mainArticle} />
      <AdditionalArticles
        articles={otherArticles}
        onArticleClick={handleArticleClick}
      />
    </div>
  );
}
