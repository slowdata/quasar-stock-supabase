<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handleForgotPassword">
      <p class="col-12 text-h5 text-center">Forgot Password</p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-input
          label="Email"
          v-model="email"
          type="email"
          lazy-rules
          :rules="[
            val => (val && val.length > 0 || 'Email is required')
          ]"
        />
        <div class="full-width q-pt-xs q-gutter-y-sm">
          <q-btn
            label="Send Reset Email"
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
import { useRouter } from 'vue-router'

import useAuthUser from 'src/composables/UseAuthUser'
import useNotify from 'src/composables/useNotify'

defineComponent({
  name: 'PageForgotPassword'
})

const { sendPasswordResetEmail } = useAuthUser();
const email = ref('')

const router = useRouter()

const { notifySuccess, notifyError } = useNotify();

const handleForgotPassword = async () => {
  try {
    await sendPasswordResetEmail(email.value)
    notifySuccess(`Password reseted for: ${email.value}`)
  } catch (error) {
    notifyError(error.message)
  }
}


</script>
