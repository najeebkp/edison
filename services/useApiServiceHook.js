import { useState, useEffect } from "react";
// APOLLO QUERY EXECUTION
import { useQuery } from "@apollo/react-hooks";
import GET_CLASSROOM_DETAIL from "graphql/classroom";

export default function useApiServiceHook() {
  console.log("API Hook Action");
  const [responseData, setData] = useState([]);

  useEffect(() => {
    const { data, loading, error } = useQuery(GET_CLASSROOM_DETAIL);
    if (data) {
      setData(data);
    }
  }, []);

  return responseData;
}
