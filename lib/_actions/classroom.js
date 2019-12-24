// next
import Router from "next/router";
// CLASSROOM RECUCER ACTION TYPES
import * as ActionTypes from "constants/ActionTypes";
// API SERVICES
import useApiServiceHook from "services/useApiServiceHook";

// CLASSROOM ACTIONS
export function getClassRoomDetail() {
  console.log("API Action");
  return function(dispatch) {
    return useApiServiceHook()
      .then(response => {
        dispatch(getClassRoomDetailDispatch(response));
        return response;
      })
      .catch(error => {
        throw error;
      });
  };
}

function getClassRoomDetailDispatch(data) {
  return {
    type: ActionTypes.CLASS_ROOM_DETAIL,
    payload: data
  };
}
