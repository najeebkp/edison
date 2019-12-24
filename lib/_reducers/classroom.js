import * as ActionTypes from "constants/ActionTypes";

var initialState = {
  // CLASSROOM STATE
  classRoomDetail: {},
  classRoomDetailLoader: false
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    // CLASSROOM REDUCERS
    case ActionTypes.CLASS_ROOM_DETAIL:
      return {
        ...state,
        classRoomDetail: action.payload
      };
    case ActionTypes.CLASS_ROOM_DETAIL_LOADER:
      return {
        ...state,
        classRoomDetailLoader: action.payload
      };
    default:
      return state;
  }
}
