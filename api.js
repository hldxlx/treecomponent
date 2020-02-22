import axios from 'axios';
axios.defaults.baseURI = 'http://localhost:3333';
export const getTreeList = () =>{
     return axios.get('/getTreeList')
}
