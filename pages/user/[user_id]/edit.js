import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useLazyQuery, useApolloClient } from "@apollo/react-hooks";
import GraphqlServices from "../../../graphql/user";
import { useRouter } from "next/router";
import "bootstrap/dist/css/bootstrap.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Jumbotron from "react-bootstrap/Jumbotron";
import "assets/styles/sass/userDash.scss";
// import AddGuardian from "../../../components/AddGuardian";

export default function edit() {
	const router = useRouter();
	const userId = router.query.user_id;
	const [state, setState] = useState("");
	const [getUser, { data, loading, error }] = useLazyQuery(GraphqlServices.getUserWithId(userId));

	const [fields, setFields] = useState([{ value: null }]);

	function handleChangeGuardian(i, event) {
		const values = [...fields];
		values[i].value = event.target.value;
		setFields(values);
	}

	function handleAdd() {
		const values = [...fields];
		values.push({ value: null });
		setFields(values);
	}

	function handleRemove(i) {
		const values = [...fields];
		values.splice(i, 1);
		setFields(values);
	}
	console.log(fields);
	var jsonObj = {};
	var newarray = [];
	for (var i = 0; i < fields.length; i++) {
		jsonObj["name" + (i + 1)] = fields[i].value;
	}
	// console.log("jsonObj", jsonObj);
	let GQL_QUERY_DATA = {
		id: userId,
		guardian: jsonObj,
	};
	const [editUserHook, { data: editData, editLoading, error: editError }] = useMutation(GraphqlServices.updateUserGuardian());
	let editUser = e => {
		editUserHook({ variables: { id: userId, guardian: jsonObj } });
		if (editData) {
			console.log("success data");
		}
		if (editError) {
			console.log("successError");
		}
	};
	useEffect(() => {
		getUser();
		if (data) {
			console.log("success", data);
		}
		console.log("newarray", newarray);
	}, [data]);
	return <div className="Jumbotron"></div>;
}
