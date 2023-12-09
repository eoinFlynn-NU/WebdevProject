import axios from "axios";
export const BASE_API = process.env.REACT_APP_BASE_API_URL;
const USERS_API = `${BASE_API}/api/users`


const request = axios.create({
    withCredentials: true,
});


export const signout =  async () => {
    return request.post(`${USERS_API}/signout`)
        .then(response => response.status)
        .catch(error => {
        // Handle errors, e.g., log the error or return a default status
        console.error('Error during signout:', error);
        return 500; // Default status code for an error
    });
}


export const searchForUsers = async (searchTerm) => {
    const response = await request.get(`${USERS_API}/search/${searchTerm}`)
    return response.data
}

export const findAllUsers = async () => {
    const response = await request.get(`${USERS_API}`);
    return response.data;
  };
  
  export const deleteUser = async (user) => {
    const response = await request.delete(`${USERS_API}/${user._id}`);
    return response.data;
  };
  