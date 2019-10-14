import axios from 'axios';

let queryInstance = axios.create({baseURL: 'http://localhost:3000'});

export let queryGet = url=>queryInstance.get(url);
export let queryPost = (url, data)=>queryInstance.post(url, data);
export let queryDelete = (url, data)=>queryInstance.delete(url, data);
export let queryPut = (url, data)=>queryInstance.put(url, data);
