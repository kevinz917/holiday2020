import { combineReducers } from "redux";

// general purpose action
const SET_VAL = (field, payload) => {
  return {
    type: "SET_VAL",
    field,
    payload,
  };
};

const SET_USERID = (payload) => {
  return {
    type: "SET_USERID",
    payload,
  };
};

// set user info when fetching cards + groups
const SET_USER_INFO = (payload) => {
  return {
    type: "SET_USER_INFO",
    payload,
  };
};

const state = (
  state = {
    isLoading: false,
    letterCount: null,
    studentList: [],
    studentId: "none",
    selectedStudent: null,
    frame: null,
    email: "",
    message: "",
    author: "",
    audioFile: null,
    auth: 0,
    userInfo: {
      userId: "",
      sentCards: [],
      receivedCards: [],
      groups: [],
      email: "",
    },
  },
  action
) => {
  switch (action.type) {
    case "SET_VAL":
      return { ...state, [action.field]: action.payload };
    case "SET_USERID":
      return {
        ...state,
        userInfo: { ...state.userInfo, userId: action.payload },
      };
    case "SET_USER_INFO":
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          sentCards: action.payload.sentCards,
          receivedCards: action.payload.receivedCards,
          groups: action.payload.groups,
          email: action.payload.email,
        },
      };
    default:
      return state;
  }
};

const MasterReducer = combineReducers({ state });

export { SET_VAL, SET_USER_INFO, SET_USERID, MasterReducer };
