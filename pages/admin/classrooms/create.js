import React, { useState } from "react";
import Head from "next/head";
// GRAPHQL SERVICES AND HOOKS
import { useMutation } from "@apollo/react-hooks";
// GRAPHQL QUERY SERVICES
import GraphqlServices from "../../../graphql/classroom";

function classroomCreate(props) {
  const classroomName = useFormInput("");

  let GQL_QUERY_DATA = {
    name: classroomName.value
  };

  let GQL_QUERY = GraphqlServices.createClassroom(GQL_QUERY_DATA);

  const [createClassroomHook, { loading, data, error }] = useMutation(
    GQL_QUERY
  );

  if (loading) {
    console.log("loading");
  }
  if (error) {
    console.log(error);
  }
  if (data) {
    console.log(data);
  }

  function submitClassroom() {
    createClassroomHook();
  }

  return (
    <div>
      <Head>
        <title>Classroom</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="hero primary-border">Getting All Classrooms</div>
      <input type="text" {...classroomName}></input>
      <button className="btn btn-primary" onClick={submitClassroom}>
        button
      </button>
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
    onChange: handleChange
  };
}

export default classroomCreate;
