// components/AdditionalArticles.tsx
import { Article } from '@/types/article';
import styles from '../styles/AdditionalArticles.module.scss';

type AdditionalArticlesProps = {
  articles: Article[];
  onArticleClick: (article: Article) => void;
};

export default function AdditionalArticles({articles, onArticleClick,}: AdditionalArticlesProps) {
  return (
    <div>
      <h2 className={styles.additionalHeader}>כתבות נוספות</h2>
      <ul className={styles.additionalList}>
        {articles.map((article) => (
          <li key={article.id}>
            <button
              onClick={() => onArticleClick(article)}
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
