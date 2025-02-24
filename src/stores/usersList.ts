import { ref, watch } from 'vue';
import { defineStore } from 'pinia'
import type { User } from '@/types/user.ts';

// Константы
const LOCAL_STORAGE_KEY = 'usersList';
const INITIAL_USERS: User[] = [
  { id: 1, tags: [{ text: 'Daniil' }], typeRecordId: 'Локальная', login: 'Daniil', password: 'Daniil' },
  { id: 2, tags: [{ text: 'Dima' }], typeRecordId: 'LDPA', login: 'Dima', password: 'Dima' },
];

// Утилита для работы с localStorage
const loadFromLocalStorage = (key: string): User[] | null => {
  try {
    const data: string | null = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    return null;
  }
};

const saveToLocalStorage = (key: string, data: User[]) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Ошибка сохранения в localStorage:', error); // оставил просто для понимая
  }
};

export const useUsersListStore = defineStore('UsersList', () => {
  // Инициализация данных
  const dataUsersList = ref<User[]>(loadFromLocalStorage(LOCAL_STORAGE_KEY) || INITIAL_USERS);

  // Автоматическое сохранение при изменении dataUsersList
  watch(
    dataUsersList,
    (newValue) => saveToLocalStorage(LOCAL_STORAGE_KEY, newValue),
    { deep: true }
  );

  // Создание нового пользователя
  const newUser = (id: number): User => ({
    id: id + 1,
    tags: [{text:''}],
    typeRecordId: '',
    login: '',
    password: '',
  });

  // Методы для управления пользователями
  const addUser = (id: number) => {
    dataUsersList.value.push(newUser(id));
  };

  const removeUser = (id: number) => {
    dataUsersList.value = dataUsersList.value.filter((user) => user.id !== id);
  };

  const updateUser = (updatedUser: User) => {
    const index = dataUsersList.value.findIndex((user) => user.id === updatedUser.id);
    if (index !== -1) {
      dataUsersList.value[index] = { ...updatedUser };
    }
  };


// Вспомогательная функция для преобразования тегов в строку
  const tagsToString = (tags: { text: string }[]): string => tags.map(tag => tag.text).join(';');

  // Вспомогательная функция для преобразования строки в массив тегов
  const stringToTags = (tagString: string): { text: string }[] =>
    tagString
      .split(';')
      .filter(tag => tag.trim() !== '')
      .map(text => ({ text: text.trim() }));

  // Реактивный объект для хранения строковых значений тегов
  const tagsInput = ref<{ [key: number]: string }>(
    dataUsersList.value.reduce<{ [key: number]: string }>((acc, user) => {
      acc[user.id] = tagsToString(user.tags);
      return acc;
    }, {})
  );

  // Синхронизация tagsInput с dataUsersList
  watch(
    tagsInput,
    (newTags: { [key: number]: string }) => {
      dataUsersList.value = dataUsersList.value.map((user: User) => ({
        ...user,
        tags: stringToTags(newTags[user.id]),
      }));
      console.log('Tags updated:', newTags);
    },
    { deep: true }
  );



  return {
    dataUsersList,
    tagsInput,
    addUser,
    removeUser,
    updateUser,

  }
})
