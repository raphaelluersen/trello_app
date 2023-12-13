import { Models } from 'appwrite';

export interface Board {
  columns: Map<TypedColumn, Column>;
}

export type TypedColumn = 'todo' | 'inprogress' | 'done';

export interface Column {
  id: TypedColumn;
  todos: Todo[];
}

export interface Todo extends Models.Document {
  $id: string;
  $createdAt: string;
  title: string;
  status: TypedColumn;
  image?: string;
}

export interface Image {
  bucketId: string;
  fileId: string;
}
