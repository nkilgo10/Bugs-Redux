import axios from "axios";
import { callBegan, callFailed, callSuccess } from "../api";

const baseURL = "http://localhost:9001/api";

const api = ({ dispatch }) => (next) => async (action) => {
  if (action.type !== callBegan.type) return next(action);

  const { url, method, data, onSuccess, onStart, onError } = action.payload;

  if (onStart) dispatch({ type: onStart });

  next(action);

  try {
    const response = await axios.request({
      baseURL: baseURL,
      url,
      method,
      data,
    });
    //General
    dispatch(callSuccess(response.data));
    //Specific
    if (onSuccess) dispatch({ type: onSuccess, payload: response.data });
  } catch (error) {
    //General
    dispatch(callFailed(error.message));
    //Specific
    if (onError) dispatch({ type: onError, payload: error.message });
  }
};

export default api;
