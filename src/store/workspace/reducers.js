import {TOGGLE_MIGRATE_DATEPICKER} from './actions';

let defaultState = {
  isMigrateDatepickerShown: false
};
export let workspaceReducer = (state=defaultState, action)=>{
  switch (action.type) {
    case TOGGLE_MIGRATE_DATEPICKER:
      return {...state, isMigrateDatepickerShown: action.payload}
  }
  return state;
};
