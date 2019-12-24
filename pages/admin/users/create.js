import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import GraphqlServices from "graphql/user";
import Link from "next/link";
import "bootstrap/dist/css/bootstrap.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import "assets/styles/sass/userProfile.scss";

function createUser() {
	const userName = useFormInput("");
	const userEmail = useFormInput("");
	const userHandle = useFormInput("");
	const userMobnumber = useFormInput("");
	const userDob = useFormInput("");
	const userGender = useFormInput("");
	const GQL_QUERY_DATA = {
		name: userName.value,
		email: userEmail.value,
		username: userHandle.value,
		mobnumber: userMobnumber.value,
		dob: userDob.value,
		gender: userGender.value,
	};
	const { data, loading, error, refetch } = useQuery(GraphqlServices.getAllUsers());
	console.log("data", Object.keys(data));

	const [createUserHook, { createData, createError, createLoading }] = useMutation(GraphqlServices.createUser(GQL_QUERY_DATA));

	if (createData) {
		console.log("success", createData);
	}
	if (createLoading) {
		return <p>loading...</p>;
	}
	if (createError) {
		console.log("error", createError);
	}
	function userCreate() {
		createUserHook();
	}

	return (
		<div>
			<div className="box2">
				<Form className="form2">
					<Form.Group controlId="formBasicEmail">
						<Form.Label>Name</Form.Label>
						<Form.Control type="text" placeholder="Name" {...userName} />
						<Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
					</Form.Group>
					<Form.Group controlId="formBasicEmail">
						<Form.Label>Email address</Form.Label>
						<Form.Control type="text" placeholder="Email" {...userEmail} />
						<Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
					</Form.Group>
					<Form.Group controlId="formBasicEmail">
						<Form.Label>Username</Form.Label>
						<InputGroup className="mb-3">
							<InputGroup.Prepend>
								<InputGroup.Text id="basic-addon1">@</InputGroup.Text>
							</InputGroup.Prepend>
							<Form.Control type="text" placeholder="Username" value={userHandle.value} onChange={userHandle.onChange} />
						</InputGroup>
						<Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
					</Form.Group>
					{/* </Form>
				&emsp;
				<Form>
					<div className="form3"> */}
					<Form.Group controlId="formBasicEmail">
						<Form.Label>Mobile Number</Form.Label>
						<Form.Control type="number" placeholder="Mobile" {...userMobnumber} />
						<Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
					</Form.Group>
					<Form.Group controlId="formBasicEmail">
						<Form.Label>Birthday</Form.Label>
						<Form.Control type="date" placeholder="" {...userDob} />
						<Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
					</Form.Group>

					<Form.Group>
						<Form.Row>
							<Form.Check custom inline type="radio" label="Male" value="MALE" onChange={userGender.onChange} name="GENDER" id="inline-1" />
							<Form.Check custom inline type="radio" label="Female" value="FEMALE" onChange={userGender.onChange} name="GENDER" id="inline-2" />
						</Form.Row>
					</Form.Group>
					<Button onClick={userCreate}>Create</Button>
					<Link href="/admin/users">
						<Button>userlist</Button>
					</Link>
					{/* </div> */}
				</Form>
			</div>
		</div>
	);
}
function useFormInput(initialdata) {
	const [value, setValue] = useState(initialdata);
	function handleChange(e) {
		setValue(e.target.value);
	}
	return {
		value,
		onChange: handleChange,
		setValue: setValue,
	};
}
export default createUser;
