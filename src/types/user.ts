
interface Tag {
  text: string;
}

// Интерфейс пользователя
export interface User {
  id: number;
  tags: Tag[];
  typeRecordId: string;
  login: string;
  password: string| null;
}
