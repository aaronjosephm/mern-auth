import axios from "axios";
import {
  GET_ERRORS,
  GET_TABLE,
  ADD_NEW_TABLE,
  UPDATE_TABLE,
  DELETE_TABLE
} from "./types";

export const addNewTable = (data, history) => dispatch => {
  axios
    .post("/api/tables/new", data)
    .then(res => history.push("/dashboard")) // re-direct to login on successful register
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const getAllTables = (data, history) => async dispatch => {
  try {
    const tables = await axios.post("/api/tables/index", data);
    return tables;
  } catch(err) {
     dispatch({
        type: GET_ERRORS,
        payload: err.response
      })
  }
};