import React, { useState } from "react";
// NEXT IMPORTS
import Head from "next/head";

import { getClassRoomDetail } from "lib/_actions/classroom";
// APOLLO
import { useQuery, useMutation, useLazyQuery } from "@apollo/react-hooks";

import GraphqlServices from "../../../../graphql/user";
import "bootstrap/dist/css/bootstrap.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import "assets/styles/sass/userProfile.scss";

import Router from "next/router";
import { useRouter } from "next/router";

const initialState = {
	mobError: "",
	dobError: "",
	usernameError: "",
};

function Home(props) {
	const [state, setState] = useState(initialState);
	const [retrievedUserId, setRetrievedUserId] = useState("");

	const router = useRouter();
	const user = router.query.user_id;
	console.log("userID", user);

	const { data, loading, error } = useQuery(
		GraphqlServices.getUserWithId(user),
	);
	const { data: useriddata } = useQuery(GraphqlServices.getAllUsers());

	console.log("check", data);

	const [radiobuttons, setRadio] = useState({
		gen: "",
	});

	// const { data2} = useMutation(GraphqlServices.editUserWithName(newName,newEmail));
	let name;
	let email;
	let mobnumber;
	let gender;
	let gender2;
	let dob;
	let username;

	let date = new Date();

	const [MyMutation] = useMutation(GraphqlServices.editUserWithId(user));

	if (loading) {
		return <p>Loading...</p>;
	}
	if (error) {
		return <p>Error: {JSON.stringify(error)}</p>;
	}
	if (data) {
		console.log(data);
	}
	const fileSelectedHandler = event => {
		console.log(event.target.files[0]);
	};
	const onRadioChange = e => {
		setRadio({
			gen: e.target.value,
		});
		console.log("gender state", radiobuttons.gen);
	};

	return (
		<div>
			<Head>
				<title>Profile</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			{/* <Nav /> */}
			<div className="hero primary-border">Tenant panel</div>
			<div className="box">
				{data.users.map(job => {
					if (radiobuttons.gen == "") {
						radiobuttons.gen = job.gender;
					}

					return (
						<div>
							<img className="img" type="file" src={job.image} alt="Avatar" />
							{/* <input className="upload" type="file" onChange={fileSelectedHandler} /> */}
						</div>
					);
				})}

				<Form
					bsPrefix="form"
					onSubmit={e => {
						e.preventDefault();
						if (mobnumber.value.length > 10 || mobnumber.value.length < 10) {
							setState({ mobError: "Invalid mobile number." });
							return;
						}

						if (dob.value > "2001-01-01") {
							setState({ dobError: "Eligibility : Above 18 years only." });
							return;
						}
						if (dob.value < "1960-01-01") {
							setState({ dobError: "You must be born after jan-1960." });
							return;
						}
						if (data.users[0].username) {
							useriddata.users.map(jobs => {
								while (jobs.username == username.value) {
									setState({ usernameError: "Username already exists" });
								}
								return;
							});
						}
						MyMutation({
							variables: {
								name: name.value,
								email: email.value,
								mobnumber: mobnumber.value,
								gender: radiobuttons.gen,
								dob: dob.value,
								username: username.value,
							},
						});

						console.log("updating the values", MyMutation);
						Router.push(`/admin/users/${name.value}/edit`);
						alert("Updated Successfully");
					}}
				>
					{data.users.map(job => {
						return (
							<div>
								<h1 key={`job__${job.id}`}>{job.name} </h1>
								<p1>{job.email}</p1>
							</div>
						);
					})}
					{data.users.map(job => {
						console.log("inside mapping", job.gender);
						// radiobuttons.gen === job.gender;
						if (job.gender == "MALE") {
							gender = "checked";
						} else if (job.gender == "FEMALE") {
							gender2 = "checked";
						} else {
							gender = null;
							gender2 = null;
						}
						return (
							<div>
								&nbsp;
								<Form.Group controlId="formBasicEmail">
									<Form.Label>Name</Form.Label>

									<Form.Control
										type="text"
										required="required"
										defaultValue={job.name}
										ref={node => {
											name = node;
										}}
									/>
									<Form.Text className="text-muted">
										You can edit your username here.
									</Form.Text>
								</Form.Group>
								<Form.Group>
									Username
									<div className="input-group">
										<div className="input-group-prepend">
											<span className="input-group-text" id="basic-addon">
												<i className="fa fa-user prefix">@</i>
											</span>
										</div>
										<input
											type="text"
											className="form-control"
											placeholder="Username"
											aria-label="Username"
											aria-describedby="basic-addon"
											required="required"
											defaultValue={job.username}
											ref={node => {
												username = node;
											}}
										/>
									</div>
									<p>{state.usernameError}</p>
								</Form.Group>
								<Form.Group controlId="formBasicEmail">
									<Form.Label>Email</Form.Label>
									<Form.Control
										type="email"
										required="required"
										defaultValue={job.email}
										ref={node => {
											email = node;
										}}
									/>
									<Form.Text className="text-muted">
										You can edit your email here.
									</Form.Text>
								</Form.Group>
								<Form.Group controlId="formBasicPassword">
									<Form.Label>Mobile</Form.Label>
									<Form.Control
										type="number"
										defaultValue={job.mobnumber}
										ref={node => {
											mobnumber = node;
										}}
									/>

									<p>{state.mobError}</p>
								</Form.Group>
								Gender<br></br>
								<Form.Check
									custom
									inline
									type="radio"
									label="Male"
									name="formHorizontalRadios"
									id="formHorizontalRadios1"
									value="MALE"
									required="required"
									checked={(radiobuttons.gen == "MALE", gender)}
									onChange={onRadioChange}
								/>
								<Form.Check
									custom
									inline
									type="radio"
									label="Female"
									name="formHorizontalRadios"
									id="formHorizontalRadios2"
									value="FEMALE"
									required="required"
									checked={(radiobuttons.gen == "FEMALE", gender2)}
									onChange={onRadioChange}
								/>
								<Form.Group>
									<br></br>
									Birthday<br></br>
									<Form.Control
										type="date"
										name="bday"
										required="required"
										defaultValue={job.dob}
										ref={node => {
											dob = node;
										}}
									/>
									<p>{state.dobError}</p>
								</Form.Group>
							</div>
						);
					})}

					<Button variant="primary" type="submit">
						Save Changes
					</Button>
				</Form>
			</div>
		</div>
	);
}

export default Home;
