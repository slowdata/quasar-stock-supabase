<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handleLogin">
      <p class="col-12 text-h5 text-center">Login</p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-xs">
        <q-input
          label="Email"
          v-model="form.email"
          lazy-rules
          :rules="[
            val => (val && val.length > 0 || 'Email address is required')
          ]"
        />
        <q-input
          label="Password"
          type="password"
          v-model="form.password"
          lazy-rules
          :rules="[
            val => (val && val.length > 0 || 'Password is required')
          ]"
        />
        <div class="full-width q-pt-md">
          <q-btn
            label="Login"
            color="primary"
            class="full-width"
            outline
            rounded
            size="lg"
            type="submit"
          />
        </div>
        <div class="full-width q-pt-xs q-gutter-y-xs">
          <q-btn label="Register" color="primary" class="full-width" flat to="/register" size="sm" />
          <q-btn
            label="Forgot password?"
            color="primary"
            class="full-width"
            flat
            :to="{ name: 'forgot-password' }"
            size="sm"
          />
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script setup>
import { defineComponent, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router'

import useAuthUser from 'src/composables/UseAuthUser'
import useNotify from 'src/composables/useNotify'

defineComponent({
  name: 'PageLogin'
})

let router = useRouter()

let { login, isLoggedIn } = useAuthUser()
const { notifyError, notifySuccess } = useNotify()

let form = ref({ email: '', password: '' })

onMounted(() => {
  if (isLoggedIn) router.push({ name: 'me' })
})

let handleLogin = async () => {
  try {
    await login(form.value)
    notifySuccess('Login successfully!')
    router.push({ name: 'me' })
  } catch (error) {
    notifyError(error.message)
  }
}

</script>
