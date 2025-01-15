import { Tag } from "./tag";

export type Article = {
    id: number;
    title: string;
    description?: string; // Optional if not all articles have it
    imageURL?: string; // Optional if not all articles have it
    tags: Tag[];
    body?: string; // Optional for articles that don't include the full body
  };
  