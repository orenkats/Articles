import { GetServerSideProps } from 'next';
import Link from 'next/link'; // Ensure Link is imported
import { Article } from '../types/article';
import ArticleList from '../components/ArticleList';

type HomePageProps = {
  articles: Article[];
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const res = await fetch('http://localhost:5075/api/data/articles');

    if (!res.ok) {
      console.error(`Error fetching articles: ${res.statusText}`);
      return { props: { articles: [] } };
    }

    const articles: Article[] = await res.json();
    return { props: { articles } };
  } catch (error) {
    console.error('Error in getServerSideProps:', error);
    return { props: { articles: [] } };
  }
};

export default function HomePage({ articles }: HomePageProps) {
  if (!articles || articles.length === 0) {
    return <div>No articles available</div>;
  }

  const [mainArticle, ...additionalArticles] = articles;

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>{mainArticle.title}</h1>
      <img
        src={mainArticle.imageURL}
        alt={mainArticle.title}
        style={{ width: '100%', height: 'auto', borderRadius: '5px' }}
      />
      <p>{mainArticle.description}</p>
      <div>
        <strong>Tags:</strong>
        <ul style={{ display: 'flex', gap: '10px', padding: 0 }}>
          {mainArticle.tags.map((tag) => (
            <li key={tag.tagId} style={{ listStyle: 'none' }}>
              <Link href={`/tags/${tag.tagId}`} passHref>
                <span style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}>
                  {tag.tagName}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <h2>כתבות נוספות</h2>
      <ArticleList articles={additionalArticles} />
    </div>
  );
}
