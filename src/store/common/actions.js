import axios from 'axios';

export const SET_CURRENT_TIME = 'SET_CURRENT_TIME';

export let setCurrentTime = currentTime=>({
  type: SET_CURRENT_TIME, payload: currentTime
});
