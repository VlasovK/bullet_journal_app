import moment from 'moment';
import {
  SET_CURRENT_TASK,
  SET_LOG_DATE,
  INCREASE_PENDING_REQUESTS,
  DECREASE_PENDING_REQUESTS,
  SET_TASKS,
  SET_MIGRATE_DATA,
  THROW_SERVER_ERROR
} from './actions';

let defaultState = {
  currentTask: {},
  tasks: [],
  dates: {
    feature: null,
    monthly: moment().startOf('month'),
    weekly: moment().startOf('isoWeek'),
    daily: moment()
  },
  migrateData: {
    taskToMigrate: {},
    newLogType: null
  },
  pendingRequests: 0,
  serverError: false
};

export let logsReducer = (state = defaultState, action) => {
  let {type, payload} = action;
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
