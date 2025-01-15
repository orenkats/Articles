import { GetServerSideProps } from 'next';
import styles from './TagPage.module.scss';
import ArticleList from '@/components/ArticleList';
import { Article } from '@/types/article';

type TagPageProps = {
  tagId: number;
  articles: Article[];
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { tagId } = context.params as { tagId: string };
  const res = await fetch('http://localhost:5075/api/data/articles');
  const articles: Article[] = await res.json();
  const filteredArticles = articles.filter((article) =>
    article.tags.some((tag) => tag.tagId === parseInt(tagId, 10))
  );
  return { props: { tagId: parseInt(tagId, 10), articles: filteredArticles } };
};

export default function TagPage({ tagId, articles }: TagPageProps) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Articles for Tag {tagId}</h1>
      <ArticleList articles={articles} />
    </div>
  );
}
