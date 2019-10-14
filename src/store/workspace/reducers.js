import {TOGGLE_MIGRATE_DATEPICKER} from './actions';

let defaultState = {
  isMigrateDatepickerShown: false
};
export let workspaceReducer = (state = defaultState, action)=>{
  let {payload, type} = action;
  switch (type) {
    case TOGGLE_MIGRATE_DATEPICKER:
      return {...state, isMigrateDatepickerShown: payload}
  }
  return state;
};
