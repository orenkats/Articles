import { GetServerSideProps } from 'next';
import ArticleList from '@/components/ArticleList';
import { Article } from '@/types/article';

type TagPageProps = {
  tagId: number;
  articles: Article[];
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { tagId } = context.params as { tagId: string };

  if (parseInt(tagId, 10) === 33) {
    return {
      redirect: {
        destination: 'https://www.maariv.co.il/tags/בנימין-נתינהו',
        permanent: false,
      },
    };
  }

  const res = await fetch('http://localhost:5075/api/data/articles');
  const articles: Article[] = await res.json();

  const filteredArticles = articles.filter((article) =>
    article.tags.some((tag) => tag.tagId === parseInt(tagId, 10))
  );

  return { props: { tagId: parseInt(tagId, 10), articles: filteredArticles } };
};

export default function TagPage({ tagId, articles }: TagPageProps) {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Articles for Tag {tagId}</h1>
      {/* Pass articles to ArticleList */}
      <ArticleList articles={articles}/>
    </div>
  );
}
