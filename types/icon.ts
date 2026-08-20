export interface Category {
  id: number;
  name: string;
  slug: string;
  emoji: string | null;
}

export interface IconItem {
  id: number;
  name: string;
  slug: string;
  svgPath: string;
  category: Category;
}
