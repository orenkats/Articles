import Link from 'next/link';
import { Article } from '@/types/article';
import styles from '../styles/AdditionalArticles.module.scss';

type AdditionalArticlesProps = {
  articles: Article[];
};

export default function AdditionalArticles({ articles }: AdditionalArticlesProps) {
  return (
    <div>
      <h2 className={styles.additionalHeader}>כתבות נוספות</h2>
      <ul className={styles.additionalList}>
        {articles.map((article) => (
          <li key={article.id}>
            <Link href={`/articles/${article.id}`} className={styles.linkButton}>
              {article.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
