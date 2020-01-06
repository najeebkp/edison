import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useState, useEffect } from "react";
import { useLazyQuery, useQuery, useMutation } from "@apollo/react-hooks";
import GraphqlServices from "graphql/user";
import Router from "next/router";
import "assets/styles/sass/userProfile.scss";
import "assets/styles/sass/userDash.scss";
const initialState = {
	emailError: "",
	passwordError: "",
};

export default function login() {
	const [state, setState] = useState(initialState);
	const [state2, setState2] = useState("");
	const userPassword = useFormInput("");
	const userEmail = useFormInput("");
	const { data, loading, error, refetch } = useQuery(GraphqlServices.getUserWithEmail(userEmail.value));
	const { data: Rdata, loading: Rloading, error: Rerror } = useQuery(GraphqlServices.getAllUsers());
	const array = [];
	// console.log(userEmail.value);
	if (Rdata) {
		Rdata.users.map(users => {
			array.push(users.email);
		});
	}

	// var name = userEmail.value;
	console.log("array", array);
	var yes = false;

	function handleClick() {
		if (data.users[0] == undefined) {
			console.log("undefined");
			setState({ emailError: "Invalid email" });

			// Router.push(`/admin/users`);
			return;
		}
		if (data) {
			console.log("data", data);

			if (!userEmail.value) {
				alert("nodata");
			} else if (data.users[0].password == userPassword.value) {
				alert("Success");
				Router.push(`/user/${data.users[0].id}/profile`);
			} else {
				alert("Please provide password");
			}
		} else {
			Router.push(`/admin/users`);
		}
	}
	// console.log(data);

	// console.log("state", state);

	return (
		<div className="box3">
			<Form className="form4">
				<h5>Signin</h5>
				<Form.Group controlId="formBasicEmail">
					<Form.Label>Email address</Form.Label>
					<Form.Control type="email" placeholder="Enter email" {...userEmail} />
					<Form.Text className="text-muted2">{state.emailError}</Form.Text>
				</Form.Group>

				<Form.Group controlId="formBasicPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control type="password" placeholder="Password" {...userPassword} />
				</Form.Group>

				<Button variant="primary" onClick={() => handleClick()}>
					Submit
				</Button>
			</Form>
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
	};
}
