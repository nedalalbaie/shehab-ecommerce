import { reactive } from "vue";

export const couponErrorsStore = reactive<{
    code: string | null
}>({
    code: null
})