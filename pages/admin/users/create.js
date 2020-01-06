import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import GraphqlServices from "graphql/user";
import Link from "next/link";
import "bootstrap/dist/css/bootstrap.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import "assets/styles/sass/userProfile.scss";
import Firebaseconfig from "../../../components/Firebaseconfig";
import * as firebase from "firebase";
import FileUploader from "react-firebase-file-uploader";
import CustomUploadButton from "react-firebase-file-uploader/lib/CustomUploadButton";

import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import Spinner from "react-bootstrap/Spinner";
//International mobile number
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";

const initialState = {
	mobError: "",
	dobError: "",
	usernameError: "",
	namError: "",
	emailError: "",
	passwordError: "",
	password2Error: "",
};

function createuser(props) {
	const config = {
		apiKey: "AIzaSyCpKzjfujyua5nCUcsSVbcyIZeX-l2-q6o",
		authDomain: "image-uploader-8e082.firebaseapp.com",
		databaseURL: "https://image-uploader-8e082.firebaseio.com",
		storageBucket: "image-uploader-8e082.appspot.com",
	};
	!firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
	const [validated, setValidated] = useState(false);
	const { data, loading, error, refetch } = useQuery(GraphqlServices.getAllUsers());
	const [state, setState] = useState(initialState);
	const [state2, setState2] = useState({
		avatar: "",
		isUploading: false,
		progress: 0,
		avatarURL: "https://pngimage.net/wp-content/uploads/2018/05/default-profile-pic-png-8.png",
		animation: "",
	});
	//mob
	const [mobState, setMobState] = useState("");
	function handleChangeMob(e) {
		setMobState(e);
		console.log(state);
	}

	const userName = useFormInput("");
	const userEmail = useFormInput("");
	const userHandle = useFormInput("");
	// const userMobnumber = useFormInput("");
	const userDob = useFormInput("");
	const userGender = useFormInput("");
	const userPassword = useFormInput("");
	const userPassword2 = useFormInput("");

	const GQL_QUERY_DATA = {
		name: userName.value,
		email: userEmail.value,
		username: userHandle.value,
		mobnumber: mobState,
		dob: userDob.value,
		gender: userGender.value,
		password: userPassword.value,
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
	const [createUserHook, { createData, createError, createLoading }] = useMutation(GraphqlServices.createUser(GQL_QUERY_DATA));

	if (createData) {
		console.log("success", createData);
	}
	if (createLoading) {
		return <p>loading...</p>;
	}
	if (createError) {
		console.log("error", createError);
		alert("Error", createError.message);
	}
	function userError() {
		if (data) {
			data.users.map(users => {
				if (users.username == userHandle.value) {
					setState({ usernameError: "Exist" });
					return;
				}
			});
		}
		return;
	}

	function userCreate(e) {
		e.preventDefault();
		if (!userName.value) {
			setState({ namError: "Name required." });
			return;
		} else if (!userEmail.value || !userEmail.value.includes("@")) {
			setState({ emailError: "Invalid email." });
			return;
		} else if (!userHandle.value) {
			setState({ usernameError: "Username required" });
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
		} else if (!userPassword.value) {
			setState({ passwordError: "Password cannot be blank." });
			return;
		} else if (userPassword.value.length < 8) {
			setState({ passwordError: "Password length must be 8 or more." });
			return;
		} else if (userPassword.value != userPassword2.value) {
			setState({ password2Error: "Passwords not matching. " });
			return;
		} else if (userDob.value > "2001-01-01") {
			setState({ dobError: "Eligibility : Above 18 years only." });
			return;
		} else if (userDob.value < "1960-01-01") {
			setState({ dobError: "You must be born after jan-1960." });
			return;
		}
		createUserHook();
		alert("Updated Successfully");
		setState(initialState);
	}

	return (
		<div className="all">
			<title>SignUp</title>
			<h2>Sign Up!</h2>
			<p className="p1">Make an account</p>
			<div className="box2">
				<div className="triangle-topleft" />
				<div>
					<img className="img" src={state2.avatarURL} />
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
						Select Profile Pic
					</CustomUploadButton>
					<br></br>
					<div className="loading">
						<Spinner animation={state2.animation} variant="primary" />
					</div>
				</div>
				{/* <h1>{props.avatarURL}</h1> */}
				<Form bsPrefix="form" className="form2">
					<Form.Group controlId="formBasicEmail">
						<Form.Label>Name</Form.Label>
						<Form.Control required="required" type="text" placeholder="Name" {...userName} />

						<Form.Text className="text-muted2">{state.namError}</Form.Text>
					</Form.Group>
					<Form.Group controlId="formBasicEmail">
						<Form.Label>Email address</Form.Label>
						<Form.Control required="required" type="email" placeholder="Email" {...userEmail} />
						<Form.Text className="text-muted2">{state.emailError}</Form.Text>
					</Form.Group>
					<Form.Group controlId="formBasicUsername">
						<Form.Label>Username</Form.Label>
						<InputGroup className="mb-3">
							<InputGroup.Prepend>
								<InputGroup.Text id="basic-addon1">@</InputGroup.Text>
							</InputGroup.Prepend>
							<Form.Control required="required" type="text" placeholder="Username" value={userHandle.value} onChange={userHandle.onChange} />
						</InputGroup>
						<Form.Text className="text-muted2">{state.usernameError}</Form.Text>
					</Form.Group>

					<Form.Group controlId="formBasicMobile">
						<Form.Label>Mobile Number</Form.Label>
						<PhoneInput country={"us"} value={mobState} onChange={handleChangeMob} />
						<Form.Text className="text-muted2">
							{state.mobError}
							{/* {userMobnumber.value.length > 10 || (userMobnumber.value.length < 10 && userMobnumber.value.length > 0) ? "Invalid mobile number" : ""} */}
						</Form.Text>
					</Form.Group>
				</Form>
				&emsp;
				<Form>
					<div className="form3">
						<Form.Group controlId="formBasicPassword">
							<Form.Label>Password</Form.Label>
							<Form.Control required="required" type="password" placeholder="Password" {...userPassword} />
							<Form.Text className="text-muted2">{state.passwordError}</Form.Text>
						</Form.Group>
						<Form.Group controlId="formBasicPassword2">
							<Form.Label>Confim Password</Form.Label>
							<Form.Control required="required" type="password" placeholder="Confirm Password" {...userPassword2} />
							<Form.Text className="text-muted2">{state.password2Error}</Form.Text>
						</Form.Group>
						<Form.Group controlId="formBasicDob">
							<Form.Label>Birthday</Form.Label>
							<Form.Control required="required" type="date" placeholder="" {...userDob} />
							<Form.Text className="text-muted2">{state.dobError}</Form.Text>
						</Form.Group>
						<Form.Group>
							Gender
							<div className="radiobuttons">
								<Form.Row>
									<Form.Check custom inline type="radio" label="Male" value="MALE" onChange={userGender.onChange} name="GENDER" id="inline-1" />
									<Form.Check custom inline type="radio" label="Female" value="FEMALE" onChange={userGender.onChange} name="GENDER" id="inline-2" />
								</Form.Row>
							</div>
						</Form.Group>
						<div className="buttons">
							<Button
								size="lg"
								type="submit"
								variant="success"
								onClick={e => {
									userCreate(e);
								}}
							>
								Create
							</Button>
							&emsp;
							<Link href="/admin/users">
								<Button size="lg">Userlist</Button>
							</Link>
						</div>
					</div>
				</Form>
				<div className="triangle-bottomright" />
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

export default createuser;
