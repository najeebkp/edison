import React from "react";
// NEXT IMPORTS
import Head from "next/head";
// REDUX
import { connect } from "react-redux";
// LOCAL COMPONENTS
import Nav from "../components/nav";
// DISPATCH FUNCTIONS
import { getClassRoomDetail } from "lib/_actions/classroom";
// APOLLO
import { useQuery } from "@apollo/react-hooks";
import GraphqlServices from "../graphql/classroom";
function Home(props) {
  const { data, loading, error } = useQuery(GraphqlServices.getAllClassrooms());
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error: {JSON.stringify(error)}</p>;
  }
  if (data) {
    console.log(data);
  }
  return (
    <div>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <div className="hero primary-border">Tenant panel</div>
      <ul>
        {data.classrooms.map(job => {
          return <li key={`job__${job.id}`}>{job.name}</li>;
        })}
      </ul>
    </div>
  );
}
function mapStatesToProps(state) {
  return {
    classRoomDetail: state.classroom.classRoomDetail
  };
}
const mapDispatchToProps = {
  getClassRoomDetail
};
export default connect(mapStatesToProps, mapDispatchToProps)(Home);