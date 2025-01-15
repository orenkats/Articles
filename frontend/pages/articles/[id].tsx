import { GetServerSideProps } from 'next';
import Link from 'next/link';
import ArticleList from '@/components/ArticleList';
import { Article } from '@/types/articale';

type ArticlePageProps = {
  article: Article | null;
  otherArticles: Article[];
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };

  const res = await fetch('http://localhost:5075/api/data/articles');
  const articles: Article[] = await res.json();

  const article = articles.find((a) => a.id === parseInt(id, 10)) || null;
  const otherArticles = articles.filter((a) => a.id !== parseInt(id, 10));

  return { props: { article, otherArticles } };
};

export default function ArticlePage({ article, otherArticles }: ArticlePageProps) {
  if (!article) {
    return <div>404 - Article Not Found</div>;
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.description,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Sharing failed:', error);
      }
    } else {
      alert('Sharing is not supported on this browser.');
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>{article.title}</h1>
      <img
        src={article.imageURL}
        alt={article.title}
        style={{ width: '100%', height: 'auto', borderRadius: '5px' }}
      />
      <p>{article.body}</p>

      <button onClick={handleShare} style={{ margin: '20px 0', cursor: 'pointer' }}>
        <img
          src="https://images.maariv.co.il/image/upload/e_make_transparent:10/873147.svg"
          alt="Share Icon"
          style={{ width: '20px', height: '20px' }}
        />
        Share
      </button>

      <h2>כתבות נוספות</h2>
      <ArticleList articles={otherArticles} lazyLoad={true} />
    </div>
  );
}
