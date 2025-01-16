// pages/articles/[id].tsx
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { fetchArticleById } from '@/services/apiService';
import { Article } from '@/types/article';
import styles from '../../styles/index.module.scss';

type ArticlePageProps = {
  article: Article;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };
  const article = await fetchArticleById(Number(id));

  if (!article) {
    return { notFound: true };
  }

  return { props: { article } };
};

export default function ArticlePage({ article }: ArticlePageProps) {
  return (
    <div className={styles.homePage}>
      <div className={styles.mainArticle}>
        <h1 className={styles.title}>{article.title}</h1>
        <img
          src={article.imageURL}
          alt={article.title}
          className={styles.image}
        />
        <p className={styles.description}>{article.description}</p>
        <div className={styles.tags}>
          <ul>
            {article.tags.map((tag) => (
              <li key={tag.tagId}>
                <Link href={`/tags/${tag.tagId}`} className={styles.link}>
                  {tag.tagName}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
