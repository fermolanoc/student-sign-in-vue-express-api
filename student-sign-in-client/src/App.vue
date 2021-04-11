<template>
  <div id="app">
    <new-student-form v-on:student-added="newStudentAdded"></new-student-form>
    <student-table 
      v-bind:students="students" 
      v-on:student-arrived-or-left="studentArrivedOrLeft"
      v-on:delete-student="studentDeleted"  
    >
    </student-table>
    <student-message v-bind:student="mostRecentStudent"></student-message>
  </div>
</template>

<script>
import NewStudentForm from './components/NewStudentForm'
import StudentTable from './components/StudentTable'
import StudentMessage from './components/StudentMessage'


export default {
  name: 'App',
  components: {
    NewStudentForm,
    StudentMessage,
    StudentTable,
  },
  data() {
    return {
      students: [],
      mostRecentStudent: {}
    }
  },
  mounted() {
    // request api - load all the students
    this.updateStudents()
  },
  methods: {
    // get all the students info updated
    updateStudents() {
      this.$student_api.getAllStudents().then(students => {
        this.students = students
      })
    },
    // function to add each new student to Array and order the list alphabetically
    newStudentAdded(student) {
      this.$student_api.addStudent(student).then( () => {
        this.updateStudents()
      })
    },

    // function to 
    studentArrivedOrLeft(student, present) {
      student.present = present // update present value
      this.$student_api.updateStudent(student).then( () => {
        this.mostRecentStudent = student
        this.updateStudents() // get all students updated data
      })
    },

    // create a new array copy using filter with all the students except the one we're passing as parameter
    studentDeleted(student) {
      
    }
  }
}

</script>

<style>
@import "https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css";
</style>
