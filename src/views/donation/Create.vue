<template>
  <div class="pb-20 pt-20">
        <div class="container mx-auto grid grid-cols-1 p-3 sm:w-full md:w-5/12">

            <div class="bg-white rounded-md shadow-md p-5">
                <div class="text-xl">
                    MASUKKAN NOMINAL DONASI
                </div>
                <div class="border-2 border-gray-200 mt-3 mb-2"></div>

                <div class="mb-2">
                    <label class="mt-2 font-bold text-lg">Rp.</label>
                    <input type="number"
                        class="mt-2 appearance-none w-full bg-gray-200 border border-gray-200 rounded h-15 shadow-sm placeholder-gray-600 focus:outline-none focus:placeholder-gray-600 focus:bg-white focus-within:text-gray-600 p-2 text-right text-xl"
                        placeholder="0" v-model="donation.amount">
                </div>

                <div class="mb-2">
                    <label class="mt-2 font-bold text-lg">Do'a</label>
                    <textarea rows="3" v-model="donation.pray"
                        class="mt-2 appearance-none w-full bg-gray-200 border border-gray-200 rounded shadow-sm placeholder-gray-600 focus:outline-none focus:placeholder-gray-600 focus:bg-white focus-within:text-gray-600 p-5" placeholder="Tulis Do'a/Ucapan">
                    </textarea>
                </div>

                <button @click="storeDonation" class="mt-4 bg-yellow-500 py-2 rounded-md shadow-md text-base w-full uppercase font-bold focus:outline-none focus:bg-yellow-600">LANJUT PEMBAYARAN</button>

            </div>

        </div>
    </div>
</template>

<script setup>
import { reactive } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'vue-toastification'; 

const store = useStore();
const route = useRoute();
const router = useRouter();
const toast = useToast();
const donation = reactive({
  amount: 0,
  pray: '',
  campaign: route.params.slug
});

function storeDonation() {
  if (donation.amount < 10000) {
    toast.error("Donasi minimal Rp. 10.000!");
    return false;
  } else {
    store.dispatch('donation/storeDonation', donation)
    .then(() => {
      toast.success("Transaksi berhasil dibuat!");
      router.push({ name: 'donation.index' });
    })
    .catch(error => {
      console.log(error);
    })
  }
}
</script>