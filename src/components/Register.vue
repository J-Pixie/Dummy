<!-- <template>
  <div class="flex flex-col items-center justify-center px-3 py-3 mx-auto md:h-screen lg:py-0">
    <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900">
      CRUD APP
    </a>
    <div
      class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1
          class="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Create an account
        </h1>
        <form class="space-y-4 md:space-y-6" @submit.prevent="onSubmit">
          <div>
            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Full Name</label>
            <input type="text" v-model="name" name="name" id="name"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter your full name" required="">
              <ErrorMessage name="name" class="text-yellow-300 text-sm" />

          </div>
          <div>
            <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone
              Number</label>
            <input type="number" v-model="phone" name="phone" id="phone"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="exp : 80879898988" required="">
              <ErrorMessage name="phone" class="text-yellow-300 text-sm" />
          </div>
          <div>
            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
            <input type="email" v-model="email" name="email" id="email"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@company.com">
              <ErrorMessage name="email" class="text-yellow-300 text-sm" />
          </div>
          <div>
            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
            <input type="password" v-model="pass" name="password" id="password" placeholder="••••••••"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required="">
              <ErrorMessage name="pass" class="text-yellow-300 text-sm" />
          </div>
          <div>
            <label for="confirmPass" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm
              password</label>
            <input type="password" v-model="confirmPass" name="confirmPass" id="confirmPass " placeholder="ReType Password"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required="">
              <ErrorMessage name="confirmPass" class="text-yellow-300 text-sm" />
          </div>
          <button type="submit"
            class="w-full text-black active:scale-95 cursor-pointer hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-white dark:hover:bg-primary-700 dark:focus:ring-primary-800">Createan
            account</button>
          <p class="text-sm font-light text-gray-500 dark:text-gray-400">
            Already have an account? 
              <RouterLink to="/login" class="font-medium text-primary-600 hover:underline dark:text-primary-500">
    Login here
  </RouterLink>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useForm, useField, ErrorMessage, useSubmitForm } from 'vee-validate'
import * as yup from 'yup'
import axios from 'axios'
import { useRouter } from 'vue-router'


const schema = yup.object({
  name: yup.string().required('Name is required'),
  phone: yup.string().required('Phone number is required').matches(/^[0-9]{10}$/, 'Phone must be 10 digits'),
  email: yup.string().email('Invalid email').required('Email is required'),
  pass: yup.string().required('Password is required').min(6, 'Minimum 6 characters'),
  confirmPass: yup.string().required('Please confirm your password')
    .oneOf([yup.ref('pass')], 'Passwords must match'),
})

// ✅ useForm with schema
const { handleSubmit, resetForm } = useForm({
  validationSchema: schema,
})

// const submitForm = handleSubmit(onSubmit)
const { value: name } = useField('name')
const { value: phone } = useField('phone')
const { value: email } = useField('email')
const { value: pass } = useField('pass')
const { value: confirmPass } = useField('confirmPass')
const router = useRouter()

const onSubmit = async () => {
  try {
    const payload = {
      name: name.value,
      phone: phone.value,
      email: email.value,
      pass: pass.value,
    }

    const response = await axios.post('http://localhost:8080/api/users/register', payload)
    console.log('User registered:', response.data)
   
    console.log(response.data.status);
    
    if(response.data.status){
      alert('Registration successful!')
      router.push('/login')
    }else{
      alert('User Already Exist!!')
    }
    
  resetForm()
  }
   catch (error) {
    if (error.response) {
      const message = error.response.data.message || 'Registration failed'
      alert(message)
    } else {
      alert('Something went wrong. Please try again.')
    }
    console.error('Registration failed:', error)
  }
}
</script> -->


<template>
  <div class="flex flex-col items-center justify-center px-3 py-3 mx-auto md:h-screen lg:py-0">
    <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900">
      CRUD APP
    </a>
    <div
      class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 class="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Create an account
        </h1>
        <form class="space-y-4 md:space-y-6" @submit.prevent="onSubmit">
          <div>
            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Full Name</label>
            <input type="text" v-model="form.name" name="name" id="name"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter your full name" required>
            <p class="text-yellow-300 text-sm">{{ errors.name }}</p>
          </div>

          <div>
            <label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone Number</label>
            <input type="number" v-model="form.phone" name="phone" id="phone"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="exp : 8087989898" required>
            <p class="text-yellow-300 text-sm">{{ errors.phone }}</p>
          </div>

          <div>
            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
            <input type="email" v-model="form.email" name="email" id="email"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@company.com">
            <p class="text-yellow-300 text-sm">{{ errors.email }}</p>
          </div>

          <div>
            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
            <input type="password" v-model="form.pass" name="password" id="password" placeholder="••••••••"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required>
            <p class="text-yellow-300 text-sm">{{ errors.pass }}</p>
          </div>

          <div>
            <label for="confirmPass" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm
              password</label>
            <input type="password" v-model="form.confirmPass" name="confirmPass" id="confirmPass" placeholder="ReType Password"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required>
            <p class="text-yellow-300 text-sm">{{ errors.confirmPass }}</p>
          </div>

          <button type="submit"
            class="w-full text-black active:scale-95 cursor-pointer hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-white dark:hover:bg-primary-700 dark:focus:ring-primary-800">
            Create an account
          </button>

          <p class="text-sm font-light text-gray-500 dark:text-gray-400">
            Already have an account?
            <RouterLink to="/login" class="font-medium text-primary-600 hover:underline dark:text-primary-500">
              Login here
            </RouterLink>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = reactive({
  name: '',
  phone: '',
  email: '',
  pass: '',
  confirmPass: ''
})

const errors = reactive({
  name: '',
  phone: '',
  email: '',
  pass: '',
  confirmPass: ''
})

const validate = () => {
  let valid = true

  if (!form.name) {
    errors.name = 'Name is required'
    valid = false
  } else {
    errors.name = ''
  }

  const phoneRegex = /^[0-9]{10}$/
  if (!form.phone) {
    errors.phone = 'Phone number is required'
    valid = false
  } else if (!phoneRegex.test(form.phone)) {
    errors.phone = 'Phone must be 10 digits'
    valid = false
  } else {
    errors.phone = ''
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!form.email) {
    errors.email = 'Email is required'
    valid = false
  } else if (!emailRegex.test(form.email)) {
    errors.email = 'Invalid email format'
    valid = false
  } else {
    errors.email = ''
  }

  if (!form.pass) {
    errors.pass = 'Password is required'
    valid = false
  } else if (form.pass.length < 6) {
    errors.pass = 'Password must be at least 6 characters'
    valid = false
  } else {
    errors.pass = ''
  }

  if (!form.confirmPass) {
    errors.confirmPass = 'Please confirm your password'
    valid = false
  } else if (form.confirmPass !== form.pass) {
    errors.confirmPass = 'Passwords do not match'
    valid = false
  } else {
    errors.confirmPass = ''
  }

  return valid
}

const onSubmit = async () => {
  if (!validate()) return

  try {
    const payload = {
      name: form.name,
      phone: form.phone,
      email: form.email,
      pass: form.pass
    }

    const response = await axios.post('http://localhost:8080/api/users/register', payload)
    console.log('User registered:', response.data)

    if (response.data.status) {
      alert('Registration successful!')
      router.push('/login')
    } else {
      alert('User Already Exist!!')
    }

    Object.keys(form).forEach(key => (form[key] = ''))
  } catch (error) {
    const message = error.response?.data?.message || 'Something went wrong. Please try again.'
    alert(message)
    console.error('Registration failed:', error)
  }
}
</script>
