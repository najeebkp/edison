import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useLazyQuery, useApolloClient } from "@apollo/react-hooks";
import GraphqlServices from "../graphql/user";
import { useRouter } from "next/router";
import "bootstrap/dist/css/bootstrap.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Jumbotron from "react-bootstrap/Jumbotron";
import "assets/styles/sass/userProfile.scss";
// import AddGuardian from "../../../components/AddGuardian";

export default function edit() {
	const router = useRouter();
	const userId = router.query.user_id;
	const [state, setState] = useState("");
	const [state2, setState2] = useState("");
	const [getUser, { data, loading, error }] = useLazyQuery(GraphqlServices.getUserWithId(userId));
	const { data: getData, loading: getLoading, error: getError } = useQuery(GraphqlServices.getUserWithId(userId));

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
	var jsonObj1 = {};
	var newarray = [];
	for (var i = 0; i < fields.length; i++) {
		jsonObj["name" + (i + 1)] = fields[i].value;
	}
	if (getData) {
		if (getData.users[0].guardian) {
			newarray = Object.values(getData.users[0].guardian);
			for (var i = newarray.length, j = 0; i < newarray.length + fields.length; i++, j++) {
				jsonObj1["name" + (i + 1)] = fields[j].value;
			}
		}
	}

	console.log("new_array_length", newarray.length);

	// console.log("jsonObj", jsonObj);
	let GQL_QUERY_DATA = {
		id: userId,
		guardian: jsonObj,
	};
	const [editUserHook, { data: editData, editLoading, error: editError }] = useMutation(GraphqlServices.insertUserGuardian());
	const [updateEditUserHook, { data: updateData, updateLoading, error: updateError }] = useMutation(GraphqlServices.updateUserGuardian());
	let editUser = e => {
		editUserHook({ variables: { id: userId, guardian: jsonObj } });

		if (editData) {
			console.log("success data");
		}
		if (editError) {
			console.log("successError");
		}
	};
	let updateEditUser = e => {
		updateEditUserHook({ variables: { id: userId, guardian: jsonObj1 } });

		if (updateData) {
			console.log("success data");
		}
		if (updateError) {
			console.log("successError");
		}
	};
	useEffect(() => {
		getUser();
		if (data) {
			console.log("success", data);
			setState(data.users[0].guardian);
			if (data.users[0].guardian) {
				newarray = Object.values(data.users[0].guardian);
			}
			console.log("state", state);
		}
		console.log("newarray", newarray);
		setState2(newarray);
	}, [data]);
	if (!state) {
		return (
			<div className="Jumbotron">
				<div className="parent">
					<h1>NO DATA</h1>
					<Button className="buttonAdd" type="button" onClick={() => handleAdd()}>
						+Add Guardian
					</Button>
					{fields.map((field, idx) => {
						return (
							<div className="parent2" key={`${field}-${idx}`}>
								<Form className="parentForm">
									<Form.Control type="text" placeholder="Name Of Guardian" value={field.value} onChange={e => handleChangeGuardian(idx, e)} />
								</Form>
								<Button type="button" onClick={() => handleRemove(idx)}>
									-
								</Button>
							</div>
						);
					})}
				</div>
				<Button className="buttons2" type="button" onClick={e => editUser(e)}>
					Submit
				</Button>
			</div>
		);
	} else {
		if (data.users[0].guardian) {
			newarray = Object.values(data.users[0].guardian);
		}
		console.log("newarray2", newarray);
		return (
			<div className="down">
				<div className="guardianlist">
					{/* <h6>Guardian</h6> */}
					<Table className="table2" striped bordered hover responsive variant="light">
						<thead>
							<tr>
								<th>Guardian</th>
								<th>Address</th>
								<th>Phone</th>
							</tr>
						</thead>
						<tbody>
							{state2.map(item => {
								return (
									<tr>
										<td>{item}</td>
										<td>{item}</td>
										<td>{item}</td>
									</tr>
								);
							})}
						</tbody>
					</Table>
				</div>
				<div className="Jumbotron">
					<div className="parent">
						<Button className="buttonAdd" type="button" onClick={() => handleAdd()}>
							+Add Guardian
						</Button>
						{fields.map((field, idx) => {
							return (
								<div className="parent2" key={`${field}-${idx}`}>
									<Form className="parentForm">
										<Form.Control type="text" placeholder="Namre Of Guardian" value={field.value} onChange={e => handleChangeGuardian(idx, e)} />
									</Form>
									<Form className="parentForm2">
										<Form.Control type="text" placeholder="Address" value={field.value} onChange={e => handleChangeGuardian(idx, e)} />
									</Form>
									<Form className="parentForm3">
										<Form.Control type="text" placeholder="Phone" value={field.value} onChange={e => handleChangeGuardian(idx, e)} />
									</Form>
									<Button type="button" onClick={() => handleRemove(idx)}>
										-
									</Button>
								</div>
							);
						})}
					</div>

					<Button className="buttons2" type="button" onClick={e => updateEditUser(e)}>
						Submit
					</Button>
				</div>
			</div>
		);
	}
}
