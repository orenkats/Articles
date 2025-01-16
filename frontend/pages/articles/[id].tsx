import { GetServerSideProps } from 'next';
import { fetchArticleById } from '@/services/apiService';
import MainArticle from '@/components/MainArticle';
import { Article } from '@/types/article';

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
  return <MainArticle article={article} />;
}
