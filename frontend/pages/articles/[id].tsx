import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { Article } from '@/types/article';
import styles from '../index.module.scss';

type ArticlePageProps = {
  article: Article;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };

  // Fetch the specific article by ID
  const res = await fetch(`http://localhost:5075/api/data/articles`);
  const articles: Article[] = await res.json();

  const article = articles.find((a) => a.id === parseInt(id, 10));

  if (!article) {
    return { notFound: true }; // If no article is found, show 404
  }

  return { props: { article } };
};

export default function ArticlePage({ article }: ArticlePageProps) {
  return (
    <div className={styles.homePage}>
      {/* Display the selected article */}
      <div className={styles.mainArticle}>
        <h1 className={styles.title}>{article.title}</h1>
        <img
          src={article.imageURL}
          alt={article.title}
          className={styles.image}
        />
        <p className={styles.description}>{article.description}</p>
        <div className={styles.tags}>
          <strong>Tags:</strong>
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
