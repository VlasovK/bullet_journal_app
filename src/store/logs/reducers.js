import moment from 'moment';
import {
  SET_CURRENT_TASK,
  SET_LOG_DATE,
  INCREASE_PENDING_REQUESTS,
  DECREASE_PENDING_REQUESTS,
  SET_TASKS,
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
  pendingRequests: 0,
  serverError: false,

  // ======================
  migrateTaskDates: {
    taskToMigrate: {},
    newMigrateLogType: null
  },
  busyDates: {
    monthly: {expired: [], actual: []},
    weekly: {expired: [], actual: []},
    daily: {expired: [], actual: []}
  },
};

export let logsReducer = (state = defaultState, action) => {
  let {type, payload} = action;
  switch (type) {
    case SET_CURRENT_TASK:
      return {...state, currentTask: payload};
    case SET_LOG_DATE:
      return {
        ...state,
        dates: {...state.dates, [payload.logType]: payload.date}
      };
    case INCREASE_PENDING_REQUESTS:
      return {...state, pendingRequests: state.pendingRequests + 1};
    case DECREASE_PENDING_REQUESTS:
        return {...state, pendingRequests: state.pendingRequests - 1};
    case SET_TASKS:
      return {...state, tasks: payload};
    case THROW_SERVER_ERROR:
      return {...state, serverError: true};
  }
  return state;
};


// =============================================================================
// =============================================================================
// =============================================================================

/**

import * as moment from 'moment';
import {SET_CURRENT_LOG_TASK, SET_MONTHLY_LOG_DATE, SET_WEEKLY_LOG_DATE,
  SET_DAILY_LOG_DATE, GET_LOG_DATA_REJECTED, GET_FUTURE_LOG,
  GET_FUTURE_LOG_FULFILLED, GET_MONTHLY_LOG, GET_MONTHLY_LOG_FULFILLED,
  GET_WEEKLY_LOG, GET_WEEKLY_LOG_FULFILLED, GET_DAILY_LOG,
  GET_DAILY_LOG_FULFILLED, SET_TASK_TO_MIGRATE, RESET_MIGRATE_DATA,
  MIGRATE_TASK, MIGRATE_TASK_FULFILLED, SET_BUSY_DATES} from './actions';

let currentDate = moment();
let defaultState = {
  currentTask: {},
  future: {
    isPending: false,
    data: []
  },
  monthly: {
    year: currentDate.year(),
    month: currentDate.month(),
    isPending: false,
    data: []
  },
  weekly: {
    year: currentDate.year(),
    week: currentDate.isoWeek(),
    isPending: false,
    data: []
  },
  daily: {
    date: currentDate,
    isPending: false,
    data: []
  },
  migrateTaskDates: {
    taskToMigrate: {},
    newMigrateLogType: null
  },
  migrateTaskInPending: false,
  busyDates: {
    monthly: {expired: [], actual: []},
    weekly: {expired: [], actual: []},
    daily: {expired: [], actual: []}
  },
  error: null
};
export let logsReducer = (state=defaultState, action)=>{
  switch (action.type) {
    case SET_CURRENT_LOG_TASK:
      return {...state, currentTask: action.payload};
    case SET_MONTHLY_LOG_DATE:
      return {...state, monthly: {
        ...state.monthly, year: action.payload.year, month: action.payload.month}};
    case SET_WEEKLY_LOG_DATE:
      return {...state, weekly: {
        ...state.weekly, year: action.payload.year, week: action.payload.week}};
    case SET_DAILY_LOG_DATE:
      return {...state, daily: {...state.daily, date: action.payload}};
    case GET_FUTURE_LOG:
      return {...state, future: {...state.future, isPending: true}};
    case GET_FUTURE_LOG_FULFILLED:
      return {...state, error: null,
        future: {...state.future, data: action.payload, isPending: false}};
    case GET_MONTHLY_LOG:
      return {...state, monthly: {...state.monthly, isPending: true}};
    case GET_MONTHLY_LOG_FULFILLED:
      return {...state, error: null,
        monthly: {...state.monthly, data: action.payload, isPending: false}};
    case GET_WEEKLY_LOG:
      return {...state, weekly: {...state.weekly, isPending: true}};
    case GET_WEEKLY_LOG_FULFILLED:
      return {...state, error: null,
        weekly: {...state.weekly, data: action.payload, isPending: false}};
    case GET_DAILY_LOG:
      return {...state, daily: {...state.daily, isPending: true}};
    case GET_DAILY_LOG_FULFILLED:
      return {...state, error: null,
        daily: {...state.daily, data: action.payload, isPending: false}};
    case GET_LOG_DATA_REJECTED:
      return {...state, error: 'something went wrong!',
        weekly: {...state.weekly, isPending: false}};
    case SET_TASK_TO_MIGRATE:
      return {...state, migrateTaskDates: {
        ...state.migrateTaskDates,
        taskToMigrate: action.payload.task,
        newMigrateLogType: action.payload.newMigrateLogType
      }};
    case RESET_MIGRATE_DATA:
      return {...state, migrateTaskDates: {
        taskToMigrate: {},
        newMigrateLogType: null
      }};
    case MIGRATE_TASK:
      return {...state, migrateTaskInPending: true};
    case MIGRATE_TASK_FULFILLED:
      return {...state, migrateTaskInPending: false};
    case SET_BUSY_DATES:
      return {...state, busyDates: action.payload};
  }
  return state;
};

*/
