import {SET_CURRENT_TIME} from './actions';
import moment from 'moment';

let defaultState = {
  currentTime: moment()
};
export let commonReducer = (state = defaultState, action)=>{
  let {payload, type} = action;
  switch (type) {
    case SET_CURRENT_TIME:
      return {...state, currentTime: payload};
  }
  return state;
};
