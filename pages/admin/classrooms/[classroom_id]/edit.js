import React, { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
// GRAPHQL SERVICES AND HOOKS
import { useQuery } from "@apollo/react-hooks";
// GRAPHQL QUERY SERVICES
import GraphqlServices from "../../../../graphql/classroom";

function ClassroomEdit(props) {
  const router = useRouter();
  const classroomId = router.query.classroom_id;

  const { data, loading } = useQuery(
    GraphqlServices.getClassroomWithId(classroomId)
  );

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <Head>
        <title>Classroom</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="hero primary-border">Edit a Classroom</div>
      {data.classrooms[0].name}
    </div>
  );
}

export default ClassroomEdit;
