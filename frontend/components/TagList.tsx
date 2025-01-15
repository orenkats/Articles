import Link from 'next/link';
import { Tag } from '@/types/tag';

type TagListProps = {
  tags: Tag[];
};

export default function TagList({ tags }: TagListProps) {
  if (!tags || tags.length === 0) {
    return <div>No tags available</div>;
  }

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
