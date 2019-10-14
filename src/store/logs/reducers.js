import {
  DECREASE_PENDING_REQUESTS,
  INCREASE_PENDING_REQUESTS,
  SET_CURRENT_TASK,
  SET_LOG_DATE,
  SET_MIGRATE_DATA,
  SET_TASKS,
  THROW_SERVER_ERROR
} from './actions';
import moment from 'moment';

let defaultState = {
  currentTask: {},
  dates: {
    daily: moment(),
    feature: null,
    monthly: moment().startOf('month'),
    weekly: moment().startOf('isoWeek')
  },
  migrateData: {
    newLogType: null,
    taskToMigrate: {}
  },
  pendingRequests: 0,
  serverError: false,
  tasks: []
};

export let logsReducer = (state = defaultState, action)=>{
  let {payload, type} = action;
  switch (type) {
    case SET_CURRENT_TASK:
      return {...state, currentTask: payload};
    case SET_LOG_DATE:
      return {
        ...state, dates: {...state.dates, [payload.logType]: payload.date}
      };
    case INCREASE_PENDING_REQUESTS:
      return {...state, pendingRequests: state.pendingRequests + 1};
    case DECREASE_PENDING_REQUESTS:
        return {...state, pendingRequests: state.pendingRequests - 1};
    case SET_TASKS:
      return {...state, tasks: payload};
    case SET_MIGRATE_DATA:
      return {...state, migrateData: payload};
    case THROW_SERVER_ERROR:
      return {...state, serverError: true};
  }
  return state;
};
