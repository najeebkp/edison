import React, { useState, useEffect } from "react";

import "assets/styles/sass/userDash.scss";
import Card from "react-bootstrap/Card";
import Jumbotron from "react-bootstrap/Jumbotron";
import AddGuardian from "../components/AddGuardian";
import Button from "react-bootstrap/Button";
// import AddGuardian from "./AddGuardian";

export default function UserCard(props) {
	return (
		<div>
			<Jumbotron bsPrefix="jumbotron2">
				<h5>Guardian Details</h5>
				<br></br>
				<AddGuardian></AddGuardian>
				{/* <h1>{props.state.guardian}</h1> */}
			</Jumbotron>
		</div>
	);
}
