<template>
    <div>
        <!-- Template/HTML here -->
        <!-- show a message when student arrives or leaves  -->
      <div v-if="student.name">
        <div v-if="student.present" class="alert alert-success">
          Welcome {{ student.name }}
        </div>
        <div v-else class="alert alert-info">
          Goodbye, {{ student.name }}. See you later!
        </div>
      </div>
    </div>
</template>

<script>
export default {
    // Create components
    name: 'StudentMessage',
    props: {
        student: Object
    }
}
</script>

<style scoped>

</style>