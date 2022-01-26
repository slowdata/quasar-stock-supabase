import { useQuasar } from 'quasar'

export default function useNotify() {
    const $q = useQuasar();

    const notifySuccess = (msg) => {
        $q.notify({
            type: 'positive',
            message: msg || 'All right!'
        })
    }
    const notifyError = (msg) => {
        $q.notify({
            type: 'negative',
            message: msg || 'Failed!'
        })
    }

    return {
        notifySuccess,
        notifyError
    }
}