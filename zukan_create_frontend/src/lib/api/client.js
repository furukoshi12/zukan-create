import applyCaseMiddleware from "axios-case-converter";
import axios from "axios";

const options = {
  ignoreHeaders: true
}

const defaultBaseURL = 'http://localhost:3000';

const baseURL = process.env.NODE_ENV === 'production'
  ? process.env.REACT_APP_API_BASE_URL
  : defaultBaseURL;

const client = applyCaseMiddleware(axios.create({
  baseURL: baseURL,
  withCredentials: true
}), options);

export default client;
