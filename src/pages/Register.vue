<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handleRegister">
      <p class="col-12 text-h5 text-center">Register</p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-input
          label="Name"
          v-model="form.name"
          lazy-rules
          :rules="[
            val => (val && val.length > 0 || 'Name is required')
          ]"
        />
        <q-input
          label="Email"
          v-model="form.email"
          type="email"
          lazy-rules
          :rules="[
            val => (val && val.length > 0 || 'Email is required')
          ]"
        />
        <q-input
          label="Password"
          type="password"
          v-model="form.password"
          lazy-rules
          :rules="[
            val => (val && val.length > 6 || 'Password is required and more than 6 characteres!')
          ]"
        />
        <div class="full-width q-pt-md q-gutter-y-sm">
          <q-btn label="Register" color="primary" class="full-width" outline rounded type="submit" />
          <q-btn
            label="Back"
            color="dark"
            class="full-width"
            outline
            rounded
            flat
            :to="{ name: 'login' }"
          />
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script setup>
import { defineComponent, ref } from 'vue';

import useAuthUser from 'src/composables/UseAuthUser'
import { useRouter } from 'vue-router'


import useNotify from 'src/composables/useNotify'

defineComponent({
  name: 'PageRegister'
})

let router = useRouter()
let { register } = useAuthUser()

const { notifyError, notifySuccess } = useNotify()

let form = ref({
  name: '',
  email: '',
  password: ''
})

let handleRegister = async () => {
  try {
    await register(form.value)
    notifySuccess('Successfully registered!')
    router.push({ name: 'email-confirmation', query: { email: form.value.email } })
  } catch (error) {
    notifyError(error.message)
  }
}


</script>