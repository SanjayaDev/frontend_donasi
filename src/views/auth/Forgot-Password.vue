<template>
  <div class="pb-20 pt-20">
        <div class="container mx-auto grid grid-cols-1 p-5 sm:w-full md:w-5/12">

            <form @submit.prevent="resetPassword" id="formResetPassword">
                <div class="bg-white rounded-md shadow-md p-5">
                    <div class="text-xl">
                        MASUK AKUN
                    </div>
                    <div class="border-2 border-gray-200 mt-3 mb-2"></div>

                    <div class="mb-5">
                        <label class="mt-2">Alamat Email</label>
                        <input type="email" name="email"
                            class="mt-2 appearance-none w-full bg-gray-200 border border-gray-200 rounded h-7 shadow-sm placeholder-gray-600 focus:outline-none focus:placeholder-gray-600 focus:bg-white focus-within:text-gray-600 p-5"
                            placeholder="Alamat Email" v-model="auth.email">
                    </div>

                    <div class="mb-5">
                        <label class="mt-2">Password</label>
                        <input type="password" name="password"
                            class="mt-2 appearance-none w-full bg-gray-200 border border-gray-200 rounded h-7 shadow-sm placeholder-gray-600 focus:outline-none focus:placeholder-gray-600 focus:bg-white focus-within:text-gray-600 p-5"
                            placeholder="Password" v-model="auth.password">
                    </div>

                    <div>
                        <button
                            class="bg-gray-700 py-1 px-3 text-white rounded-md shadow-md text-xl inline-block w-full focus:outline-none focus:bg-gray-900">RESET PASSWORD</button>
                    </div>

                </div>
            </form>

        </div>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';

const store = useStore();
const router = useRouter();
const toast = useToast();
const validation = ref([]);
const auth = reactive({
  email: "",
  password: ""
});

function resetPassword() {
  let formResetPassword = document.querySelector("#formResetPassword");
  let formData = new FormData(formResetPassword);
  // formData.append("email", auth.email);
  // formData.append("password", auth.password);

  store.dispatch("auth/resetPasswordWithoutLogin", formData)
  .then(() => {
    router.push({
      name: "login"
    });

    toast.success("Berhasil reset password! Silahkan login kembali!");
  })
  .catch(error => {
    validation.value = error;

    if (validation.value.email) {
      toast.error(validation.value.email[0]);
    }
    if (validation.value.password) {
      toast.error(validation.value.password[0]);
    }
  })
}
</script>