import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;

console.log(apiUrl);

export const loginUser = async (email, password) => {
  return axios.post(`${apiUrl}/auth/login`, { email, password });
};

export const registerUser = async(email,password) => {
   return axios.post(`${apiUrl}/auth/register`,{email,password})
}

export const fetchShopifyData = async (token) => {
  return axios.get(`${apiUrl}/shopify/orders`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
