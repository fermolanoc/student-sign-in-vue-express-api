<template>
    <div>
        <!-- Template/HTML here -->
        <div class="alert alert-danger" v-if="errors.length > 0">
            <ul>
            <!-- show user what error data given has-->
            <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
            </ul>
        </div>

        <div class="card add-student m-2 p-2">
            <h4 class="card-title">Add new student</h4>

            <div class="form-group">
                <label for="name">Name</label>
                <input id="name" class="form-control" v-model.trim="newStudentName" />
            </div>

            <div class="form-group">
                <label for="starID">Star ID</label>
                <input id="starID" class="form-control" v-model.trim="newStarID" />
            </div>

            <button class="btn btn-primary mt-2" v-on:click="addStudent">Add</button>
        </div>
    </div>
</template>

<script>
export default {
    // Create components
    name: 'NewStudentForm',
    emits: ['student-added'],
    data() {
        return {
            newStudentName: '',
            newStarID: '',
            errors: [],
        }
    },
    methods: {
        addStudent() {
            this.errors = []; // clear errors array
            if (this.newStudentName && this.newStarID) {
                // if both name and starID are valid, create student object
                let student = {
                name: this.newStudentName,
                starID: this.newStarID,
                present: false,
              };
              
              // TODO emit message to parent with new student
              this.$emit('student-added', student)

                // clean inputs 
              this.newStudentName = ''
              this.newStarID = ''
            } else {
                // if there's any error, save them on errors array to be shown on screen
                this.errors.push("Name and starID are required");
            }
          },
    }
}
</script>

<style scoped>

</style>