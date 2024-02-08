export interface Blog {
  id: string;
  title: string;
  description: string;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
  content: string;
  author: string;
  categories: string[];
  imageUrl: string;
}
