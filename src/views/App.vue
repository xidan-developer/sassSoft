<script setup lang="ts">
import Card from 'primevue/card';
import Button from 'primevue/button';
import Message from 'primevue/message';
import InputText from 'primevue/inputtext';
import Select from 'primevue/select';
import Password from 'primevue/password';

import { ref } from 'vue';

const value = ref();
const login = ref();
const password = ref();
const selectedType = ref();

const recordTypes = ref([
  {
    id:1,
    name: 'Локальная'
  },
  {
    id:2,
    name: 'LDPA'
  }
])
</script>

<template>
  <div class="container">
    <Card class="card">
      <template #title>
        <div class="card__title">
          <div>
            Simple Card
          </div>
          <Button icon="pi pi-plus" severity="secondary" aria-label="Bookmark" />
        </div>
      </template>
      <template #content>
        <div class="card__content">
          <Message icon="pi pi-times-circle" class="mb-2">Для указания нескольких меток для одной пары логин/пароль
            используйте разделитель ;
          </Message>
          <div class="card__list">
            <div class="card__list--row">
              <div class="card__list--item">
                <label for="username">Метки</label>
                <InputText id="username" v-model="value" aria-describedby="username-help" />
              </div>
              <div class="card__list--item">
                <label for="username">Тип записи</label>
                <Select v-model="selectedType" :options="recordTypes" optionLabel="name" optionValue="id" />
              </div>
              <div class="card__list--item">
                <label for="username">Логин</label>
                <InputText id="username" :invalid="!login" v-model="login" aria-describedby="username-help" />
              </div>
              <div v-if="selectedType === 1" class="card__list--item">
                <label for="username">Пароль</label>
                <Password  id="username" :invalid="!password" v-model="password" toggleMask :feedback="false" />
              </div>
              <Button class="card__list--row_delete" icon="pi pi-trash" severity="danger"  aria-label="Cancel" />
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
    &--row
      display: flex
      gap: 20px
      align-items: end
      &_delete
        width: 30px
        min-width: 35px
        height: 35px

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
