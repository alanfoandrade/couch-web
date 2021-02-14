import axios from 'axios';

const couchApi = axios.create({
  baseURL: 'https://webhook-hml.icecloud.com.br/api/SofaApi',
});

export default couchApi;
