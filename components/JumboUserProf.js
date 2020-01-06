import React, { useState, useEffect } from "react";

import "assets/styles/sass/userDash.scss";
import Card from "react-bootstrap/Card";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import AddGuardian from "../components/AddGuardian";
import UserCard from "../components/UserCard";

export default function JumboUserProf(props) {
	const [state, setState] = useState("1");
	const handleClick = eventKey => setState(`${eventKey}`);
	console.log(state);

	function basic() {
		return (
			<Jumbotron bsPrefix="jumbotron">
				<h5>Your Basic Information</h5>
				<br></br>
				<p>Username : {props.state.username}</p>
				<p>Email : {props.state.email}</p>
				<p>Gender : {props.state.gender}</p>
				<p>Birthday : {props.state.dob}</p>
				<p>Mobile Number :{props.state.mob}</p>
				<p>
					<Button bsPrefix="btn" variant="primary">
						Edit
					</Button>
				</p>
			</Jumbotron>
		);
	}
	function basic2() {
		return <UserCard />;
	}

	return (
		<div>
			<Nav variant="pills" defaultActiveKey="1">
				<Nav.Item>
					<Nav.Link eventKey="1" onSelect={handleClick}>
						Basic Info
					</Nav.Link>
				</Nav.Item>
				<Nav.Item>
					<Nav.Link eventKey="2" onSelect={handleClick}>
						Guardian Details
					</Nav.Link>
				</Nav.Item>
			</Nav>
			<div>{state == "1" ? basic() : basic2()}</div>
		</div>
	);
}
