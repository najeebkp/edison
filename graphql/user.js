import gql from "graphql-tag";

class GraphqlServices {
	static getUserWithId(data) {
		return gql`
        query MyQuery {
          users(where: {id: {_eq: "${data}"}}) {
            id
            name
            email
            mobnumber
            image
            gender
            dob
            username
          }
        }
        `;
	}
	static getAllUsers() {
		return gql`
			query MyQuery {
				users {
					id
					name
					email
					username
					created_at
				}
			}
		`;
	}
	static createUser(data) {
		return gql`
        mutation MyMutation {
			insert_users(objects: {name: "${data.name}", email: "${data.email}",username:"${data.username}",mobnumber:"${data.mobnumber}",dob:"${data.dob}",gender:"${data.gender}"}){
				affected_rows
          }
        }
        
        `;
	}
	static editUserWithId(data) {
		return gql`
        mutation MyMutation {
          update_users(where: {id: {_eq: "${data.id}"}}, _set: {name: "${data.name}",email: "${data.email}",username:"${data.username}",dob:"${data.dob}",mobnumber:"${data.mobnumber}",gender:"${data.gender}"}) {
            affected_rows
          }
        }
        
        `;
	}
	static deleteUser() {
		return gql`
			mutation MyMutation($id: uuid!) {
				delete_users(where: { id: { _eq: $id } }) {
					affected_rows
				}
			}
		`;
	}
}
export default GraphqlServices;
