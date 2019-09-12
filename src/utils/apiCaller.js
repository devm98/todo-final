import axios from "axios";
const callApi = (endpoint, method = "GET", body) => {
  return axios({
    method: method,
    url: `http://localhost:3000/${endpoint}`,
    data: body
  }).catch(err => {
    console.log(err);
  });
};
export default callApi;
