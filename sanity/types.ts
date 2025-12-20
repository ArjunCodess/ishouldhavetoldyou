export interface Person {
  slug: string;
  description: string;
  letter: string;
  _updatedAt: string;
  accessCodeHash: string;
  opened?: boolean;
}

export interface MyStory {
  content: string;
}
