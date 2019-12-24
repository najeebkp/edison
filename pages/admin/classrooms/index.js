import React from "react";
import Head from "next/head";
// GRAPHQL SERVICES AND HOOKS
import { useQuery } from "@apollo/react-hooks";
// GRAPHQL QUERY SERVICES
import GraphqlServices from "../../../graphql/classroom";

function classroom(props) {
  // Getting classroom details
  const { data, loading, error } = useQuery(GraphqlServices.getAllClassrooms());

  if (data) console.log(data);

  if (loading) {
    return <p>Loading...</p>;
  } else {
    return (
      <div>
        <Head>
          <title>Classroom</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="hero primary-border">Getting All Classrooms</div>
        <ul>
          {data.classrooms.map(classroom => {
            return <li key={`classroom__${classroom.id}`}>{classroom.name}</li>;
          })}
        </ul>
      </div>
    );
  }
}

export default classroom;
