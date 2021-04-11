import axios from "axios";

let base_url = "/api/students";

export default {
  // get all students info from base url in json format
  getAllStudents() {
    return axios.get(base_url).then((response) => {
      return response.data;
    });
  },

  // run a post method to create a new students using the base url and passing the student data
  addStudent(student) {
    return axios.post(base_url, student).then((response) => {
      return response.data;
    });
  },

  // handle update student request
  updateStudent(student) {
    //   create personalized url based on student ID
    return axios
      .patch(`${base_url}/${student.id}`, student)
      .then((response) => {
        return response.data;
      });
  },
};
