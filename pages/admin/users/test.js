import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "assets/styles/sass/userDash.scss";
export default function test() {
	const [fields, setFields] = useState([{ guardian: null }]);

	function handleChange(i, e) {
		const values = [...fields];
		values[i].guardian = e.target.value;

		setFields(values);
	}

	function handleAdd() {
		const values = [...fields];
		values.push({ guardian: null });
		setFields(values);
	}

	function handleRemove(i) {
		const values = [...fields];
		values.splice(i, 1);
		setFields(values);
	}
	console.log(fields);

	return (
		<div className="parent">
			<Button className="buttonAdd" type="button" onClick={() => handleAdd()}>
				+Add Guardian
			</Button>
			{fields.map((field, idx) => {
				return (
					<div className="parent2">
						<Form className="parentForm">
							<Form.Control type="text" placeholder="Enter text" value={field.guardian} name="guardian" onChange={e => handleChange(idx, e)} />
						</Form>
						<Button type="button" onClick={() => handleRemove(idx)}>
							-
						</Button>
					</div>
				);
			})}
		</div>
	);
}
