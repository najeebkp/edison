import React, { Component } from "react";
import { Navbar, Nav, NavItem } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { useRouter } from "next/router";
import "assets/styles/sass/userDash.scss";
export default function UserNav(props) {
	const router = useRouter();
	return (
		<div>
			<Navbar bsPrefix="navbar" variant="dark">
				<Navbar.Brand href={`/user/${props.id}/profile`}>Dashboard</Navbar.Brand>
				<Nav className="mr-auto">
					<Nav.Link href={`/user/${props.id}/profile`}>Home</Nav.Link>
					<Nav.Link href="#features">Edit Profile</Nav.Link>
				</Nav>
				<Nav className="logout">
					<Nav.Link href="../login">Logout</Nav.Link>
				</Nav>
			</Navbar>
		</div>
	);
}
