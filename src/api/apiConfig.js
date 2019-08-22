import axios from 'axios';

let queryInstance = axios.create({
  baseURL: 'http://localhost:3000'
});

export let queryGet = url=> queryInstance.get(url);
export let queryPost = (url, data=null)=> queryInstance.post(url, data);
export let queryDelete = (url, data=null)=> queryInstance.delete(url, data);
export let queryPut = (url, data=null)=> queryInstance.put(url, data);
