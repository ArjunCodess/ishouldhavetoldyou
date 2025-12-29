export interface Rack {
  _id: string;
  title: string;
}

export interface Person {
  slug: string;
  description: string;
  letter: string;
  _updatedAt: string;
  accessCodeHash: string;
  opened?: boolean;
  rack?: Rack;
  position: number;
}

export interface MyStory {
  content: string;
}
