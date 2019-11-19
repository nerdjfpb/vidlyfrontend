import http from './httpService'
import jwtDecode from 'jwt-decode';
 
const apiEndPoint = 'http://localhost:3900/api/auth/'

http.setJwt(getJwt());

export async function login (email, password) {
  const { data: jwt } = await http.post(apiEndPoint, { email, password });
  localStorage.setItem('token', jwt);
}

export function logout() {
  localStorage.removeItem('token');
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem('token');
    return jwtDecode(jwt); 
  }
  catch(ex) {
    return null
  }
}

export function getJwt() {
  return localStorage.getItem('token');
}
