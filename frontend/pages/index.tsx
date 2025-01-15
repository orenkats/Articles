import { GetServerSideProps } from 'next';
import { useState } from 'react';
import Link from 'next/link';
import { Article } from '@/types/article';
import styles from './index.module.scss';

type HomePageProps = {
  articles: Article[];
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch('http://localhost:5075/api/data/articles');
  const articles: Article[] = await res.json();

  return { props: { articles } };
};

export default function HomePage({ articles }: HomePageProps) {
  const [mainArticle, setMainArticle] = useState<Article>(articles[0]);
  const [otherArticles, setOtherArticles] = useState<Article[]>(articles.slice(1));

  const handleArticleClick = (clickedArticle: Article) => {
    // Swap main article with the clicked one
    setOtherArticles([mainArticle, ...otherArticles.filter(a => a.id !== clickedArticle.id)]);
    setMainArticle(clickedArticle);
  };

  return (
    <div className={styles.homePage}>
      {/* Main Article */}
      <div className={styles.mainArticle}>
        <h1 className={styles.title}>{mainArticle.title}</h1>
        <img
          src={mainArticle.imageURL}
          alt={mainArticle.title}
          className={styles.image}
        />
        <p className={styles.description}>{mainArticle.description}</p>
        <div className={styles.tags}>
          <strong>Tags:</strong>
          <ul>
            {mainArticle.tags.map((tag) => (
              <li key={tag.tagId}>
                <Link href={`/tags/${tag.tagId}`} className={styles.link}>
                  {tag.tagName}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Additional Articles */}
      <h2 className={styles.additionalHeader}>כתבות נוספות</h2>
      <ul className={styles.additionalList}>
        {otherArticles.map((article) => (
          <li key={article.id}>
            <button
              onClick={() => handleArticleClick(article)}
              className={styles.linkButton}
            >
              {article.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
