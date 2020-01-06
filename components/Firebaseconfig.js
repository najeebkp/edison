import React, { Component, useState } from "react";
import * as firebase from "firebase";
import FileUploader from "react-firebase-file-uploader";
import CustomUploadButton from "react-firebase-file-uploader/lib/CustomUploadButton";
import "bootstrap/dist/css/bootstrap.css";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import Spinner from "react-bootstrap/Spinner";

export default function Firebaseconfig(props) {
	const config = {
		apiKey: "AIzaSyCpKzjfujyua5nCUcsSVbcyIZeX-l2-q6o",
		authDomain: "image-uploader-8e082.firebaseapp.com",
		databaseURL: "https://image-uploader-8e082.firebaseio.com",
		storageBucket: "image-uploader-8e082.appspot.com",
	};
	!firebase.apps.length ? firebase.initializeApp(config) : firebase.app();

	return <div></div>;
}
