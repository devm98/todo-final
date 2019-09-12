import axios from "axios";
const callApi = (endpoint, method = "GET", body) => {
  return axios({
    method: method,
    url: `http://5d7859d8a8c2710014985fe8.mockapi.io/${endpoint}`,
    data: body
  }).catch(err => {
    console.log(err);
  });
};
export default callApi;
