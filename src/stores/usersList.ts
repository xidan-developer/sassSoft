import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUsersListStore = defineStore('UsersList', () => {
  const dataUsersList = ref([])


  return {
    dataUsersList
  }
})
