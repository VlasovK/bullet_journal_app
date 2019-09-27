import * as moment from 'moment';
import {SET_CURRENT_TIME} from './actions';

let defaultState = {currentTime: moment()};
export let commonReducer = (state=defaultState, action)=>{
  switch (action.type) {
    case SET_CURRENT_TIME:
      return {...state, currentTime: action.payload};
  }
  return state;
};
