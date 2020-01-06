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
import * as firebase from "firebase";
import FileUploader from "react-firebase-file-uploader";
import CustomUploadButton from "react-firebase-file-uploader/lib/CustomUploadButton";

//International mobile number
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";

import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import Spinner from "react-bootstrap/Spinner";
const initialState = {
	mobError: "",
	dobError: "",
	usernameError: "",
	namError: "",
	emailError: "",
	passwordError: "",
	password2Error: "",
};

function userEdit(props) {
	const config = {
		apiKey: "AIzaSyCpKzjfujyua5nCUcsSVbcyIZeX-l2-q6o",
		authDomain: "image-uploader-8e082.firebaseapp.com",
		databaseURL: "https://image-uploader-8e082.firebaseio.com",
		storageBucket: "image-uploader-8e082.appspot.com",
	};
	!firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
	const [state2, setState2] = useState({
		avatar: "",
		isUploading: false,
		progress: 0,
		avatarURL: "",
		animation: "",
	});

	const router = useRouter();
	const [retrievedUserId, setRetrievedUserId] = useState("");
	const [retrievedUserAvatar, setRetrievedUserAvatar] = useState("");
	const [state, setState] = useState(initialState);

	//mob
	const [mobState, setMobState] = useState("");
	function handleChangeMob(e) {
		setMobState(e);
		console.log(state);
	}

	const userId = router.query.user_id;
	const [getUser, { data, loading, error }] = useLazyQuery(GraphqlServices.getUserWithId(userId));
	const userName = useFormInput("");
	const userEmail = useFormInput("");
	const userHandle = useFormInput("");
	// const userMobile = useFormInput("");
	const userBirthday = useFormInput("");
	const userGender = useFormInput("");

	let GQL_QUERY_DATA = {
		id: retrievedUserId,
		name: userName.value,
		email: userEmail.value,
		username: userHandle.value,
		mobnumber: mobState,
		dob: userBirthday.value,
		gender: userGender.value,
		image: state2.avatarURL,
	};
	const handleUploadStart = () => setState2({ isUploading: true, progress: 0 });
	const handleProgress = progress => setState2({ ...state2, progress, animation: "border" });
	const handleUploadError = error => {
		setState2({ isUploading: false });
		console.error(error);
	};
	const handleUploadSuccess = filename => {
		setState2({ ...state2, avatar: filename, progress: 100, isUploading: false, animation: "" });
		firebase
			.storage()
			.ref("images")
			.child(filename)
			.getDownloadURL()
			.then(url => setState2({ avatarURL: url }));
	};
	useEffect(() => {
		getUser();
		// console.log(data);

		if (data) {
			userName.setValue(data.users[0].name);
			userEmail.setValue(data.users[0].email);
			userHandle.setValue(data.users[0].username);
			setMobState(data.users[0].mobnumber);
			userBirthday.setValue(data.users[0].dob);
			setRetrievedUserAvatar(data.users[0].image);
			setRetrievedUserId(data.users[0].id);
			document.title = ` ${data.users[0].name}'s Profile`;
			userGender.setValue(data.users[0].gender);
			setState2({ avatarURL: data.users[0].image });
		}
	}, [data]);
	const [editUserHook, { data: editData, editLoading, error: editError }] = useMutation(GraphqlServices.editUserWithId(GQL_QUERY_DATA));
	let editUser = e => {
		GQL_QUERY_DATA.id = retrievedUserId;
		e.preventDefault();
		if (!userName.value) {
			setState({ namError: "Name required." });
			return;
		} else if (!userEmail.value || !userEmail.value.includes("@")) {
			setState({ emailError: "Invalid email." });
			return;
		} else if (!userHandle.value) {
			setState({ usernameError: "Username required." });
			return;
		}
		// else if (userHandle.value) {
		// 	userError();
		// 	return;
		// }
		else if (mobState == "+") {
			setState({ mobError: "Please provide mobile number." });
			return;
		} else if (mobState.replace(/[^0-9]+/g, "").length < 12) {
			setState({ mobError: "Invalid mobile number." });
			return;
		}
		// else if (!userPassword.value) {
		// 	setState({ passwordError: "Password cannot be blank" });
		// 	return;
		// } else if (userPassword.value.length < 8) {
		// 	setState({ passwordError: "Password length must be 8 or more" });
		// 	return;
		// } else if (userPassword.value != userPassword2.value) {
		// 	setState({ password2Error: "Passwords not matching " });
		// 	return;
		// }
		else if (userBirthday.value > "2001-01-01") {
			setState({ dobError: "Eligibility : Above 18 years only." });
			return;
		} else if (userBirthday.value < "1960-01-01") {
			setState({ dobError: "You must be born after jan-1960." });
			return;
		}

		editUserHook();

		setT(false);

		// if (!state.usernameError || f) {
		// 	alert("Updated successfully");
		// 	setF(false);
		// }
		setState(initialState);
	};
	const [f, setF] = useState(false);

	if (editData) {
		console.log("data is here");
	}
	if (editLoading) {
		return <p>loading..</p>;
	}
	const [t, setT] = useState(false);
	if (editError && !t) {
		console.log("error", editError.message);
		setState({ usernameError: "Username already exist!" });
		setT(true);
		// setF(false);
	}

	return (
		<div>
			<div className="box">
				<img className="img" type="file" src={state2.avatarURL} alt="Avatar" />
				<div className="editpic">
					<CustomUploadButton
						accept="image/*"
						name="avatar"
						randomizeFilename
						storageRef={firebase.storage().ref("images")}
						onUploadStart={handleUploadStart}
						onUploadError={handleUploadError}
						onUploadSuccess={handleUploadSuccess}
						onProgress={handleProgress}
						style={{ backgroundColor: "steelblue", color: "white", padding: 10, marginLeft: "50px", borderRadius: 20 }}
					>
						Change Profile Pic
					</CustomUploadButton>
					<br></br>
					<div className="loading">
						<Spinner animation={state2.animation} variant="primary" />
					</div>
				</div>
				<Form bsPrefix="form">
					<h1>{userName.value} </h1>
					<p1>{userEmail.value}</p1>
					<Form.Group controlId="formBasicEmail">
						<Form.Label>Name</Form.Label>
						<Form.Control required="required" type="text" placeholder="Name" value={userName.value} onChange={userName.onChange} />
						<Form.Text className="text-muted2">{state.namError}</Form.Text>
					</Form.Group>
					<Form.Group controlId="formBasicEmail">
						<Form.Label>Email address</Form.Label>
						<Form.Control type="email" placeholder="Email" value={userEmail.value} onChange={userEmail.onChange} />
						<Form.Text className="text-muted2">{state.emailError}</Form.Text>
					</Form.Group>
					<Form.Group controlId="formBasicEmail">
						<Form.Label>Username</Form.Label>
						<InputGroup className="mb-3">
							<InputGroup.Prepend>
								<InputGroup.Text id="basic-addon1">@</InputGroup.Text>
							</InputGroup.Prepend>
							<Form.Control type="text" placeholder="Username" value={userHandle.value} onChange={userHandle.onChange} />
						</InputGroup>
						<Form.Text className="text-muted2">{state.usernameError}</Form.Text>
					</Form.Group>
					<Form.Group controlId="formBasicEmail">
						<Form.Label>Mobile</Form.Label>
						<PhoneInput country={"us"} value={mobState} onChange={handleChangeMob} />
						<Form.Text className="text-muted2">{state.mobError}</Form.Text>
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
						<Form.Text className="text-muted2">{state.dobError}</Form.Text>
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
					<Button
						variant="success"
						onClick={e => {
							editUser(e);
						}}
					>
						Update
					</Button>
					&ensp;
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
