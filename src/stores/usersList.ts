import { ref, computed, watch } from 'vue';
import { defineStore } from 'pinia'
import type { User } from '@/types/user.ts';

// Константы
const LOCAL_STORAGE_KEY = 'usersList';
const INITIAL_USERS: User[] = [
  { id: 1, tags: 'Daniil', typeRecordId: 1, login: 'Daniil', password: 'Daniil' },
  { id: 2, tags: 'Dima', typeRecordId: null, login: 'Dima', password: 'Dima' },
];

// Утилита для работы с localStorage
const loadFromLocalStorage = (key: string): User[] | null => {
  try {
    const data: string = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Ошибка загрузки из localStorage:', error);
    return null;
  }
};

const saveToLocalStorage = (key: string, data: User[]) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Ошибка сохранения в localStorage:', error);
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
    tags: '',
    typeRecordId: null,
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


  return {
    dataUsersList,
    addUser,
    removeUser,
    updateUser,
  }
})
