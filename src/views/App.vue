<script setup lang="ts">
import {computed, type ComputedRef, type Ref, ref} from 'vue';
import {storeToRefs} from 'pinia';
import {useUsersListStore} from '@/stores/usersList.ts';
import {TypeRecord} from '@/enums/enumTypeRecord.ts';
import type {RecordType} from "@/types/recordTypes.ts";

import Card from 'primevue/card';
import Button from 'primevue/button';
import Message from 'primevue/message';
import InputText from 'primevue/inputtext';
import Select from 'primevue/select';
import Password from 'primevue/password';

const usersListStore = useUsersListStore();
const {dataUsersList,tagsInput} = storeToRefs(usersListStore);


const recordTypes:Ref<RecordType[]> = ref([
  {
    name: 'Локальная'
  },
  {
    name: 'LDPA'
  }
]);

const removeUser = (id: number): void => {
  usersListStore.removeUser(id);
};

const lastId: ComputedRef<number> = computed(() =>
  dataUsersList.value.length ? dataUsersList.value[dataUsersList.value.length - 1].id : 0
);

const addNewUser = (): void => {
  usersListStore.addUser(lastId.value);
};


</script>

<template>
  <div class="container">
    <Card class="card">
      <template #title>
        <div class="card__title">
          <div>
            Simple Card
          </div>
          <Button @click="addNewUser" icon="pi pi-plus" severity="secondary" aria-label="Bookmark"/>
        </div>
      </template>
      <template #content>
        <div class="card__content">
          <Message icon="pi pi-times-circle" class="mb-2">Для указания нескольких меток для одной
            пары логин/пароль
            используйте разделитель ;
          </Message>
          <div class="card__list">
            <div v-for="user in dataUsersList" :key="user.id" class="card__list--row">
              <div class="card__list--item">
                <label :for="`tags-${user.id}`">Метки</label>
                <InputText :id="`tags-${user.id}`" maxlength="50" v-model="tagsInput[user.id]"/>
              </div>
              <div class="card__list--item">
                <label :for="`typeRecordId-${user.id}`">Тип записи</label>
                <Select @update:modelValue="user.password = null" :id="`typeRecordId-${user.id}`" v-model="user.typeRecordId"
                        :options="recordTypes" optionLabel="name" optionValue="name"/>
              </div>
              <div class="card__list--item">
                <label :for="`login-${user.id}`">Логин</label>
                <InputText required maxlength="100" :id="`login-${user.id}`" :invalid="!user.login" v-model="user.login"/>
              </div>
              <div v-if="user.typeRecordId === TypeRecord.local" class="card__list--item">
                <label :for="`password-${user.id}`">Пароль</label>
                <Password required maxlength="100" :id="`password-${user.id}`" :invalid="!user.password?.length"
                          v-model="user.password" toggleMask :feedback="false"/>
              </div>
              <Button @click="removeUser(user.id)" class="card__list--row_delete" icon="pi pi-trash"
                      severity="danger"/>
            </div>
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>

<style scoped lang="sass">
.card
  margin-top: 100px

  &__list
    margin-top: 30px
    gap: 20px
    display: flex
    flex-direction: column

    &--row
      display: grid
      grid-template-columns: repeat(4, 1fr)
      gap: 20px
      align-items: center

      &:not(:has(.card__list--item:nth-child(4))) .card__list--item:nth-child(3)
        grid-column: span 2

      &_delete
        grid-column: -1
        align-self: end

    &--item
      display: flex
      flex-direction: column
      gap: 10px
      width: 100%

  &__content
    margin-top: 20px

  &__title
    display: flex
    gap: 14px
    align-items: center

</style>
