// components/MainArticle.tsx
import Link from 'next/link';
import { Article } from '@/types/article';
import styles from '../styles/index.module.scss';

type MainArticleProps = {
  article: Article;
};

export default function MainArticle({ article }: MainArticleProps) {
  return (
    <div className={styles.mainArticle}>
      <h1 className={styles.title}>{article.title}</h1>
      <img src={article.imageURL} alt={article.title} className={styles.image} />
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
  );
}
