<template>
    <div>
        <!-- Template/HTML here -->
        <div class="card student-list m-2 p-2">
        <h4 class="card-title">Student List</h4>

        <div class="edit-table-toggle form-check mb-2">
            <input id="edit-table" type="checkbox" class="form-check-input" v-model="editTable">
            <label for="edit-table" class="form-check-label">Edit table?</label>
        </div>
        <div id="student-table">
          <table class="table">
            <tr>
              <th>Name</th>
              <th>StarID</th>
              <th>Present?</th>
              <th v-show="editTable">Delete</th>
            </tr>

            <!-- for each student create a Table row and handle(pass to parent component) functions to edit table, update student present and delete student -->
            <student-row
              v-for="student in students"
              v-bind:student="student"
              v-bind:edit="editTable"
              v-bind:key="student.starID"
              v-on:student-arrived-or-left="arrivedOrLeft"
              v-on:delete-student="deleteStudent"
            >
            </student-row>
          </table>
        </div>
      </div>
    </div>
</template>

<script>

import StudentRow from './StudentRow'

export default {
    // Create component
    name: 'StudentTable',
    components: {
        StudentRow
    },
    emits: ['student-arrived-or-left', 'delete-student'],
    props: {
        students: Array
    },
    data() {
        return {
            editTable: false
        }
    },
    methods: {
        // let parent component know student status -present true or false- has changed 
        arrivedOrLeft(student, present) {
            // emit message to parent
            this.$emit('student-arrived-or-left', student, present)
        },
        // let parent component know which student will be deleted
        deleteStudent(student) {
            this.$emit('delete-student', student)
        }
    }
}
</script>

<style scoped>

</style>