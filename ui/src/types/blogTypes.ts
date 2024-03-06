export interface Blog {
  id: string;
  title: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
  content: string;
  author: { username: string; id: string };
  categories: string;
  imageUrl: string;
}
