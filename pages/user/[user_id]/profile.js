import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useQuery, useMutation, useLazyQuery, useApolloClient } from "@apollo/react-hooks";
import GraphqlServices from "../../../graphql/user";
import UserNav from "../../../components/UserNav";
import JumboUserProf from "../../../components/JumboUserProf";
import "assets/styles/sass/userDash.scss";
import "assets/styles/sass/userProfile.scss";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import UserCard from "../../../components/UserCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import * as firebase from "firebase";

import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import CustomUploadButton from "react-firebase-file-uploader/lib/CustomUploadButton";
import Spinner from "react-bootstrap/Spinner";
import AddGuardian from "../../../components/AddGuardian";

const initialState = {
	mob: "",
	dob: "",
	username: "",
	name: "",
	email: "",
	avatar: "",
	gender: "",
	id: "",
};

export default function profile() {
	const config = {
		apiKey: "AIzaSyCpKzjfujyua5nCUcsSVbcyIZeX-l2-q6o",
		authDomain: "image-uploader-8e082.firebaseapp.com",
		databaseURL: "https://image-uploader-8e082.firebaseio.com",
		storageBucket: "image-uploader-8e082.appspot.com",
	};
	!firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
	const router = useRouter();
	const userId = router.query.user_id;
	console.log("userID", userId);
	const [state, setState] = useState(initialState);
	const [state3, setState3] = useState({
		avatar: "",
		isUploading: false,
		progress: 0,
		avatarURL: "",
		animation: "",
		avatarURLNew: "",
	});
	let GQL_QUERY_DATA = {
		id: userId,
		image: state3.avatarURL,
	};
	const [editUserHook, { editData, editLoading, editError }] = useMutation(GraphqlServices.editCoverUserWithId(GQL_QUERY_DATA));

	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const [getUser, { data, loading, error }] = useLazyQuery(GraphqlServices.getUserWithId(userId));
	const handleUploadStart = () => setState3({ isUploading: true, progress: 0 });
	const handleProgress = progress => setState3({ ...state3, progress, animation: "border" });
	// console.log("uploading", state3);
	const handleUploadError = error => {
		setState3({ isUploading: false });
		console.error("error", error);
	};
	const handleUploadSuccess = filename => {
		setState3({ ...state3, avatar: filename, progress: 100, isUploading: false, animation: "" });
		// console.log("success", state3);
		firebase
			.storage()
			.ref("images")
			.child(filename)
			.getDownloadURL()
			.then(url => setState3({ avatar: filename, avatarURL: url, avatarURLNew: url }));
	};
	//to mutate the DB for updating the cover photo
	const [t, setT] = useState(false);
	if (state3.avatarURLNew) {
		editUserHook();
		setState3({ ...state3, avatarURLNew: "" });
		// setT(true);
	}

	console.log("success", state3);
	const handleClick = () => {
		editUserHook();
	};
	useEffect(() => {
		getUser();

		// console.log(data);
		if (loading) {
			return (
				<div>
					<h1>loading...</h1>
					<Spinner animation="border" variant="primary" />
				</div>
			);
		}

		if (data) {
			setState({
				name: data.users[0].name,
				email: data.users[0].email,
				username: data.users[0].username,
				mob: data.users[0].mobnumber,
				dob: data.users[0].dob,
				avatar: data.users[0].image,
				gender: data.users[0].gender,
				id: data.users[0].id,
				about: data.users[0].about,
				coverimage: data.users[0].cover,
			});
			setState3({ avatarURL: data.users[0].cover });
			// setState({ ...name, email: data.users[0].email });
			// setState({ ...state, username: data.users[0].username });
			// setState({ mob: data.users[0].mobnumber });
			// setState({ dob: data.users[0].dob });
			// setState({ avatar: data.users[0].image });
		}
	}, [data]);
	// console.log("state", state);

	return (
		<div>
			<body className="body">
				<UserNav id={state.id}></UserNav>

				<h3>{state.name}</h3>
				<h4>{state.email}</h4>
				<img className="timeline" src={state3.avatarURL} />

				<CustomUploadButton
					accept="image/*"
					name="avatar"
					randomizeFilename
					storageRef={firebase.storage().ref("images")}
					onUploadStart={handleUploadStart}
					onUploadError={handleUploadError}
					onUploadSuccess={handleUploadSuccess}
					onProgress={handleProgress}
				>
					<FontAwesomeIcon className="icon" icon={faPencilAlt}></FontAwesomeIcon>
				</CustomUploadButton>
				<br></br>
				<div className="loading2">
					<Spinner animation={state3.animation} variant="primary" />
				</div>

				<div className="main">
					<div>
						<Modal bsPrefix="modal" size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={show} onHide={handleShow}>
							<Modal.Body closeButton onClick={handleClose}>
								<img src={state.avatar} />
							</Modal.Body>
						</Modal>
						<Card bsPrefix="card" className="card">
							<Card.Img variant="top" src={state.avatar} onClick={handleShow} />
							<Card.Body>
								<Card.Title>ABOUT</Card.Title>
								<Card.Text>{state.about}</Card.Text>
							</Card.Body>
						</Card>
					</div>
					<div className="Jumbo">
						<JumboUserProf state={state} />
					</div>
				</div>
			</body>
		</div>
	);
}
