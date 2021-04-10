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
  methods: {
    // function to add each new student to Array and order the list alphabetically
    newStudentAdded(student) {
      this.students.push(student) // add student to array
      this.students.sort(function (s1, s2){
        // compare lowercase version of each student name, return a 1 or -1 as a result to sort them
        return s1.name.toLowerCase() > s2.name.toLowerCase() ? 1 : -1
      })
    },

    // function to 
    studentArrivedOrLeft(student, present) {
      // find the student
      let updateStudent = this.students.find(s => {
        if (s.name === student.name && s.starID === student.starID) {
          return true;
        }
      })

      // update present attribute and add student to mostRecentStudent to be mentioned on screen
      if (updateStudent) {
        updateStudent.present = present
        this.mostRecentStudent = updateStudent
      }
    },

    // create a new array copy using filter with all the students except the one we're passing as parameter
    studentDeleted(student) {
      this.students = this.students.filter(s => {
        if (s != student) {
          return true
        }
      })
      this.mostRecentStudent = {} // clean mostRecentStudent object
    }
  }
}

</script>

<style>
@import "https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css";
</style>
