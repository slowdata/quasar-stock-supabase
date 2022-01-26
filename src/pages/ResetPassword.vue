<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handleResetPassword">
      <p class="col-12 text-h5 text-center">Reset Password</p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-input
          label="New Password"
          v-model="password"
          type="password"
          lazy-rules
          :rules="[
            val => (val && val.length > 0 || 'Password is required and more than 6 characteres!')
          ]"
        />
        <div class="full-width q-pt-md q-gutter-y-xs">
          <q-btn
            label="Reset Password"
            color="primary"
            class="full-width"
            outline
            rounded
            type="submit"
          />
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
import { useRouter, useRoute } from 'vue-router'

import useAuthUser from 'src/composables/UseAuthUser'
import useNotify from 'src/composables/useNotify'

const { notifySuccess, notifyError } = useNotify()


defineComponent({
  name: 'PageResetPassword'
})

const password = ref('')

const router = useRouter()
const route = useRoute()
const { token } = route.query

const { resetPassword } = useAuthUser()

const handleResetPassword = async () => {
  try {
    await resetPassword(token, password.value)
    notifySuccess('Password reseted with success!')
    router.push({ name: 'login' })

  } catch (error) {
    notifyError(error.message)
  }
}

</script>
