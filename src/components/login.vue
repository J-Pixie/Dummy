<template>
  <div class="flex flex-col items-center justify-center px-3 py-3 mx-auto md:h-screen lg:py-0">
    <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900">
      CRUD APP
    </a>
    <div
      class="w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 class="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Sign in to your account
        </h1>
        <form class="space-y-4 md:space-y-6" @submit.prevent="onSubmit">
          <div>
            <label for="identifier" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Email or Phone Number
            </label>
            <input type="text" v-model="identifier" id="identifier"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter email or phone number" required>
          </div>
          <div>
            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
            <input type="password" v-model="pass" id="password" placeholder="••••••••"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required>
          </div>
          <button type="submit"
            class="w-full text-black active:scale-95 cursor-pointer hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-white dark:hover:bg-primary-700 dark:focus:ring-primary-800">
            Login
          </button>
          <p class="text-sm font-light text-gray-500 dark:text-gray-400">
            Don’t have an account?
            <RouterLink to="/register" class="font-medium text-primary-600 hover:underline dark:text-primary-500">
              Register here
            </RouterLink>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const identifier = ref('')
const pass = ref('')
const router = useRouter()

const onSubmit = async () => {
  try {
    const payload = {
      identifier: identifier.value,
      pass: pass.value,
    }
    const response = await axios.post('http://localhost:8080/api/users/login', payload)
    
    localStorage.setItem('user', JSON.stringify(response.data))

    console.log('Login successful:', response.data)
    // alert('Login successful!')
    router.push('/home') // now this should work
  } catch (error) {
    console.error('Login failed:', error)
    alert('Login failed. Please check your credentials.')
  }
}
</script>

