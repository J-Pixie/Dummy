<template>
  <div>
    <!-- Navbar -->
    <nav class="bg-gray-800 text-white px-6 py-4 flex justify-between items-center">
      <h2 class="text-xl font-semibold">CRUD Dashboard</h2>
      <div class="flex items-center gap-4">
        <span class="text-sm">Logged in as: {{ user.name }}</span>
        <button @click="logout" class="bg-red-500 px-3 py-1 rounded hover:bg-red-600 text-white text-sm">
          Logout
        </button>
      </div>
    </nav>



    <!-- Main content -->
    <div class="p-6">
      <!-- We will add the CRUD UI here in the next steps -->
      <h3 class="text-2xl font-bold mb-4">Welcome to the CRUD App!</h3>
      <h3 class="text-2xl font-bold mb-4">User List</h3>

      <button
  @click="showAddForm = !showAddForm"
  class="mb-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
>
  {{ showAddForm ? 'Close Add User Form' : 'Add User' }}
</button>


<table class="min-w-full bg-white rounded shadow">
  <thead class="bg-gray-200">
    <tr>
      <th class="py-2 px-4">ID</th>
      <th class="py-2 px-4">Name</th>
      <th class="py-2 px-4">Email</th>
      <th class="py-2 px-4">Phone</th>
      <th class="py-2 px-4">Actions</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="u in users" :key="u.id" class="border-t">
      <td class="py-2 px-4">{{ u.id }}</td>
      <td class="py-2 px-4">{{ u.name }}</td>
      <td class="py-2 px-4">{{ u.email }}</td>
      <td class="py-2 px-4">{{ u.phone }}</td>
      <td class="py-2 px-4">
        <!-- <button @click="editUser(u)" class="text-blue-500 hover:underline">Edit</button> -->
        <button @click="deleteUser(u.id)" class="ml-2 text-red-500 hover:underline">Delete</button>
      </td>
    </tr>
  </tbody>
</table>
    </div>

    <!-- Edit User Form -->
<!-- <div v-if="editingUser" class="mt-6 p-4 border rounded bg-gray-50 w-full max-w-md">
  <h3 class="text-xl font-semibold mb-4">Edit User</h3>
  <form @submit.prevent="updateUser">
    <div class="mb-4">
      <label class="block text-sm font-medium mb-1">Name</label>
      <input v-model="editingUser.name" type="text" class="w-full p-2 border rounded" />
    </div>
    <div class="mb-4">
      <label class="block text-sm font-medium mb-1">Email</label>
      <input v-model="editingUser.email" type="email" class="w-full p-2 border rounded" />
    </div>
    <div class="mb-4">
      <label class="block text-sm font-medium mb-1">Phone</label>
      <input v-model="editingUser.phone" type="text" class="w-full p-2 border rounded" />
    </div>
    <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Update</button>
    <button @click="cancelEdit" type="button" class="ml-2 text-sm text-gray-500 underline">Cancel</button>
  </form>
</div> -->
<center>
  <div v-if="showAddForm" class="bg-white p-4 rounded shadow mb-6 w-full max-w-md">
  <h3 class="text-lg font-bold mb-2">Add New User</h3>
  <form @submit.prevent="addUser" class="space-y-3">
    <div>
      <input v-model="newUser.name" type="text" placeholder="Name" class="w-full border p-2 rounded" />
      <p v-if="errors.name" class="text-red-500 text-sm">{{ errors.name }}</p>
    </div>

    <div>
      <input v-model="newUser.email" type="email" placeholder="Email" class="w-full border p-2 rounded" />
      <p v-if="errors.email" class="text-red-500 text-sm">{{ errors.email }}</p>
    </div>

    <div>
      <input v-model="newUser.phone" type="text" placeholder="Phone" class="w-full border p-2 rounded" />
      <p v-if="errors.phone" class="text-red-500 text-sm">{{ errors.phone }}</p>
    </div>

    <div>
      <input v-model="newUser.password" type="password" placeholder="Password" class="w-full border p-2 rounded" />
      <p v-if="errors.password" class="text-red-500 text-sm">{{ errors.password }}</p>
    </div>

    <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Save</button>
  </form>
</div>

</center>
</div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()

const user = reactive({
  name: '',
  email: ''
})

onMounted(() => {
  const stored = localStorage.getItem('user')
  if (!stored) {
    router.push('/login')
    return
  }
  const parsed = JSON.parse(stored)
  user.name = parsed.name || ''
  user.email = parsed.email || ''
})

const logout = () => {
  localStorage.removeItem('user')
  router.push('/login')
}

const users = ref([])
const editingUser = ref(null)


const fetchUsers = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/users/getAllUsers')
    users.value = response.data
  } catch (err) {
    console.error('Error fetching users:', err)
  }
}

const deleteUser = async (id) => {
  if (!confirm('Are you sure you want to delete this user?')) return
  try {
    await axios.delete(`http://localhost:8080/api/users/deleteUser/${id}`)
    fetchUsers()
  } catch (err) {
    console.error('Delete error:', err)
  }
}

// const editUser = (user) => {
//   editingUser.value = { ...user } // shallow copy to avoid instant updates
// }

// const updateUser = async () => {
//   try {
//     await axios.put(`http://localhost:8080/api/users/${editingUser.value.id}`, editingUser.value)
//     editingUser.value = null
//     fetchUsers()
//   } catch (err) {
//     console.error('Update error:', err)
//     alert('Failed to update user')
//   }
// }

// const cancelEdit = () => {
//   editingUser.value = null
// }

const showAddForm = ref(false)

const newUser = ref({
  name: '',
  email: '',
  phone: '',
  password: ''
})

const errors = ref({
  name: '',
  email: '',
  phone: '',
  password: ''
})

const validateForm = () => {
  let valid = true
  errors.value = { name: '', email: '', phone: '', password: '' }

  if (!newUser.value.name) {
    errors.value.name = 'Name is required'
    valid = false
  }

  if (!newUser.value.email || !/\S+@\S+\.\S+/.test(newUser.value.email)) {
    errors.value.email = 'Valid email is required'
    valid = false
  }

  if (!newUser.value.phone || !/^\d{10}$/.test(newUser.value.phone)) {
    errors.value.phone = 'Phone must be 10 digits'
    valid = false
  }

  if (!newUser.value.password || newUser.value.password.length < 6) {
    errors.value.password = 'Password must be at least 6 characters'
    valid = false
  }

  return valid
}

const addUser = async () => {
  if (!validateForm()) return

  try {
    const response = await axios.post('http://localhost:8080/api/users/register', newUser.value)
    console.log('User added:', response.data)
    alert('User added successfully')
    newUser.value = { name: '', email: '', phone: '', password: '' }
    showAddForm.value = false
  } catch (err) {
    console.error('Add user failed:', err)
    alert('Failed to add user')
  }
}


onMounted(() => {
  fetchUsers()
})

</script>
