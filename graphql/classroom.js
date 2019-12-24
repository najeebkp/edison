import gql from "graphql-tag";

class GraphqlServices {
	static getAllClassrooms() {
		return gql`
			query GetAllClassrooms {
				classrooms {
					id
					name
				}
			}
		`;
	}

	static getClassroomWithId(id) {
		return gql`
      query GetClassroomWithId {
        classrooms(where: { id: { _in: ${id} } }) {
          id
          name
        }
      }
    `;
	}

	static createClassroom(data) {
		return gql`
      mutation CreateClassroom {
        insert_classrooms(objects: { name: "${data.name}" }) {
          affected_rows
          returning {
            id
            name
          }
        }
      }
    `;
	}

	static editClassroom(data) {
		console.log(data);
		return gql`
      mutation EditClassroom {
        update_classrooms(where: { id: { _in: ${parseInt(
					data.id,
				)} } }, _set: { name: ${data.name.toString()} }) {
          affected_rows
          returning {
            id
            name
          }
        }
      }
    `;
	}

	static deleteClassroom() {
		return gql`
			mutation DeleteClassroom {
				delete_classrooms(where: { id: { _in: 10 } }) {
					affected_rows
				}
			}
		`;
	}
}

export default GraphqlServices;
