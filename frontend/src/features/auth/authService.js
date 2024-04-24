import axios from 'axios'

const API_URL = '/api/users/'

const register = async(userData)=>{
    const response = await axios.post(API_URL,userData)
    if(response.data){
        localStorage.setItem('user',JSON.stringify(response.data))
    }

    return response.data
}

const login = async(userData)=>{
    const response = await axios.post(API_URL + 'login',userData)
    if(response.data){
        localStorage.setItem('user',JSON.stringify(response.data))
    }

    return response.data
}
const editUserDeatils = async (token,userId, name, email,mobile) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.put(API_URL + userId, {
      userId,
      name,
      email,
      mobile
    },config);
    if (response.data) {
      console.log(response.data, "jjj");
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  };
  
  const usereditDeatils = async (token,userId, name, email, image,mobile) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.put(API_URL +'userEdit' + userId, {
      userId,
      name,
      email,
      image,
      mobile
    },config);
    if (response.data) {
      console.log(response.data, "jjj");
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  };
const logout = ()=>{
    localStorage.removeItem('user')
}

const authService ={
    register,
    login,
    editUserDeatils,
    usereditDeatils,
    logout
}

export default authService