// pages/tags/[tagId].tsx
import { GetServerSideProps } from 'next';
import styles from '../../styles/ArticlePage.module.scss'
import ArticleList from '@/components/ArticleList';
import { fetchArticlesByTag } from '@/services/apiService';
import { Article } from '@/types/article';

type TagPageProps = {
  tagId: number;
  articles: Article[];
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { tagId } = context.params as { tagId: string };
  const articles = await fetchArticlesByTag(Number(tagId));
  return { props: { tagId: Number(tagId), articles } };
};

export default function TagPage({ tagId, articles }: TagPageProps) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Articles for Tag {tagId}</h1>
      <ArticleList articles={articles} />
    </div>
  );
}
