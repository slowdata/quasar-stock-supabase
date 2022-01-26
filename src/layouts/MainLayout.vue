<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="mdi-menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>Stock</q-toolbar-title>

        <q-btn-dropdown flat color="white" icon="mdi-account">
          <q-list>
            <q-item clickable v-close-popup @click="handleLogout">
              <q-item-section>
                <q-item-label>Logout</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header>Menu</q-item-label>

        <EssentialLink v-for="link in linksList" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import EssentialLink from 'components/EssentialLink.vue'
import { defineComponent, ref } from 'vue'

import useAuthUser from 'src/composables/UseAuthUser';
import { useRouter } from 'vue-router';

import { useQuasar } from 'quasar'

const linksList = [
  {
    title: 'Home',
    caption: '',
    icon: 'mdi-home',
    link: '/'
  }
];


defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },
})


const leftDrawerOpen = ref(false)
function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}


const router = useRouter();
const { logout } = useAuthUser();

const $q = useQuasar();

const handleLogout = async () => {
  $q.dialog({
    title: 'Logout',
    message: 'Do you really want to leave?',
    cancel: true,
    persistent: true
  }).onOk(async () => {
    await logout()
    router.replace({ name: 'login' })
  })
}



</script>

