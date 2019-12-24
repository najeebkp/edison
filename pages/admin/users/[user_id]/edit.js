import React, { useState, useEffect } from "react";
// NEXT IMPORTS
import Head from "next/head";

// APOLLO
import { useQuery, useMutation, useLazyQuery, useApolloClient } from "@apollo/react-hooks";

import GraphqlServices from "../../../../graphql/user";
import Link from "next/link";
import "assets/styles/sass/userProfile.scss";

import Router from "next/router";
import { useRouter } from "next/router";
import "bootstrap/dist/css/bootstrap.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";

function userEdit(props) {
	const router = useRouter();
	const [retrievedUserId, setRetrievedUserId] = useState("");
	const [retrievedUserAvatar, setRetrievedUserAvatar] = useState("");

	const userId = router.query.user_id;
	const [getUser, { data, loading, error }] = useLazyQuery(GraphqlServices.getUserWithId(userId));
	const userName = useFormInput("");
	const userEmail = useFormInput("");
	const userHandle = useFormInput("");
	const userMobile = useFormInput("");
	const userBirthday = useFormInput("");
	const userGender = useFormInput("");

	let GQL_QUERY_DATA = {
		id: retrievedUserId,
		name: userName.value,
		email: userEmail.value,
		username: userHandle.value,
		mobnumber: userMobile.value,
		dob: userBirthday.value,
		gender: userGender.value,
	};
	useEffect(() => {
		getUser();
		console.log(data);

		if (data) {
			userName.setValue(data.users[0].name);
			userEmail.setValue(data.users[0].email);
			userHandle.setValue(data.users[0].username);
			userMobile.setValue(data.users[0].mobnumber);
			userBirthday.setValue(data.users[0].dob);
			setRetrievedUserAvatar(data.users[0].image);
			setRetrievedUserId(data.users[0].id);
			document.title = ` ${data.users[0].name}'s Profile`;
			userGender.setValue(data.users[0].gender);
		}
	}, [data]);
	const [editUserHook, { editData, editLoading, editError }] = useMutation(GraphqlServices.editUserWithId(GQL_QUERY_DATA));
	let editUser = () => {
		GQL_QUERY_DATA.id = retrievedUserId;

		editUserHook();
		alert("updated successfully");
	};
	if (editData) {
		console.log("data is here");
	}
	if (editLoading) {
		return <p>loading..</p>;
	}
	if (editError) {
		console.log("error");
	}
	return (
		<div>
			<div className="box">
				<img className="img" type="file" src={retrievedUserAvatar} alt="Avatar" />

				<Form bsPrefix="form">
					<h1>{userName.value} </h1>
					<p1>{userEmail.value}</p1>

					<Form.Group controlId="formBasicEmail">
						<Form.Label>Name</Form.Label>
						<Form.Control required="required" type="text" placeholder="Name" value={userName.value} onChange={userName.onChange} />
						<Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
					</Form.Group>

					<Form.Group controlId="formBasicEmail">
						<Form.Label>Email address</Form.Label>
						<Form.Control type="email" placeholder="Email" value={userEmail.value} onChange={userEmail.onChange} />
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
					<Form.Group controlId="formBasicEmail">
						<Form.Label>Mobile</Form.Label>
						<Form.Control type="number" placeholder="Mobile" value={userMobile.value} onChange={userMobile.onChange} />
						<Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
					</Form.Group>
					<Form.Group>
						Birthday<br></br>
						<Form.Control
							type="date"
							name="bday"
							// required="required"
							value={userBirthday.value}
							onChange={userBirthday.onChange}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Row>
							<Form.Check
								custom
								inline
								type="radio"
								label="MALE"
								value="MALE"
								checked={userGender.value === "MALE" ? true : false}
								onChange={userGender.onChange}
								name="GENDER"
								id="inline-1"
							/>

							<Form.Check
								custom
								inline
								type="radio"
								label="FEMALE"
								value="FEMALE"
								checked={userGender.value === "FEMALE" ? true : false}
								onChange={userGender.onChange}
								name="GENDER"
								id="inline-2"
							/>
						</Form.Row>
					</Form.Group>

					<Button variant="success" onClick={editUser}>
						Update
					</Button>
					<Link href="/admin/users">
						<Button>User list</Button>
					</Link>
				</Form>
			</div>
		</div>
	);
}
function useFormInput(initialValue) {
	const [value, setValue] = useState(initialValue);
	function handleChange(e) {
		setValue(e.target.value);
	}
	return {
		value,
		onChange: handleChange,
		setValue: setValue,
	};
}
export default userEdit;
