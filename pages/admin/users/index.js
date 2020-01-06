import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useQuery, useMutation } from "@apollo/react-hooks";
import GraphqlServices from "graphql/user";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import "assets/styles/sass/userProfile.scss";
function user() {
	const { data, loading, error, refetch } = useQuery(GraphqlServices.getAllUsers());

	const [deleteUserHook, { deleteData, deleteLoading, deleteError }] = useMutation(GraphqlServices.deleteUser());
	let deleteUser = userId => {
		deleteUserHook({ variables: { id: userId } });
		refetch();
		alert("Deleted");
	};
	if (data) {
		console.log("data success");
	}
	if (error) {
		console.log("error");
	}
	if (loading) {
		return <p>loading...</p>;
	}
	return (
		<div>
			<h1>
				<Link href="/admin/users/create">
					<Button variant="primary">Create New User</Button>
				</Link>
			</h1>

			<Table bsPrefix="table" striped bordered hover responsive variant="dark">
				<thead>
					<tr>
						<th>Name</th>
						<th>Email</th>
						<th>Created Date</th>
						<th>Edit</th>
						<th>Delete</th>
					</tr>
				</thead>
				<tbody>
					{data.users.map(job => {
						let registeredAt = new Date(job.created_at);
						// console.log(registeredAt.getYear() + 1900);
						let formattedDate = `${registeredAt.getDate()}/${registeredAt.getMonth() + 1}/${registeredAt.getYear() + 1900}`;
						return (
							<tr>
								<td>{job.name}</td>
								<td>{job.email}</td>
								<td>{formattedDate}</td>
								<td>
									<Link href={`/admin/users/${job.id}/edit`}>
										<Button variant="warning">Edit</Button>
									</Link>
								</td>
								<td>
									<Button variant="danger" onClick={() => deleteUser(job.id)}>
										Delete
									</Button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</Table>
		</div>
	);
}
export default user;
