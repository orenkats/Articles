import Link from 'next/link';

type Tag = {
  tagId: number;
  tagName: string;
  tagUrl: string;
};

type TagListProps = {
  tags: Tag[];
};

export default function TagList({ tags }: TagListProps) {
  return (
    <ul>
      {tags.map((tag) => (
        <li key={tag.tagId}>
          <Link href={`/tags/${tag.tagId}`}>
            <a>{tag.tagName}</a>
          </Link>
        </li>
      ))}
    </ul>
  );
}
