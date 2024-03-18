import { myAxios, privateAxios } from "./helper";

export const signup= (user)=>{
    return myAxios.post('/auth/register',user)
      .then(response => response.data);
}

export const login= (user)=>{
    return myAxios.post('/auth/login',user)
      .then(response => response.data);
}

export const getUser = (user)=>{
  return privateAxios.get(`/users/read/${user}`)
    .then(response => response.data);
}

export const deleteUser = (username) => {
  return privateAxios.delete(`/users/delete/${username}`)
    .then(response => response.data);
}

export const userUpdate = (user)=>{
  return privateAxios.put(`/users/update/${user.id}`, user)
    .then(response => response.data);
}
