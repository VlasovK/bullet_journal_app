import * as moment from 'moment';
import {SET_CURRENT_LOG_TASK, SET_MONTHLY_LOG_DATE, SET_WEEKLY_LOG_DATE,
  SET_DAILY_LOG_DATE, GET_LOG_DATA_REJECTED, GET_FUTURE_LOG,
  GET_FUTURE_LOG_FULFILLED, GET_MONTHLY_LOG, GET_MONTHLY_LOG_FULFILLED,
  GET_WEEKLY_LOG, GET_WEEKLY_LOG_FULFILLED, GET_DAILY_LOG,
  GET_DAILY_LOG_FULFILLED, SET_TASK_TO_MIGRATE, RESET_MIGRATE_DATA} from './actions';

let currentDate = moment();
let defaultState = {
  currentLogTask: {},
  futureLog: {
    isPending: false,
    data: []
  },
  monthlyLog: {
    year: currentDate.year(),
    month: currentDate.month(),
    isPending: false,
    data: []
  },
  weeklyLog: {
    year: currentDate.year(),
    week: currentDate.isoWeek(),
    isPending: false,
    data: []
  },
  dailyLog: {
    date: currentDate,
    isPending: false,
    data: []
  },
  migrateTaskDates: {
    taskToMigrate: {},
    newMigrateLogType: null
  },
  error: null
};
export let logsReducer = (state=defaultState, action)=>{
  switch (action.type) {
    case SET_CURRENT_LOG_TASK:
      return {...state, currentLogTask: action.payload};
    case SET_MONTHLY_LOG_DATE:
      return {...state, monthlyLog: {
        ...state.monthlyLog, year: action.payload.year, month: action.payload.month}};
    case SET_WEEKLY_LOG_DATE:
      return {...state, weeklyLog: {
        ...state.weeklyLog, year: action.payload.year, week: action.payload.week}};
    case SET_DAILY_LOG_DATE:
      return {...state, dailyLog: {...state.dailyLog, date: action.payload}};
    case GET_FUTURE_LOG:
      return {...state, futureLog: {...state.futureLog, isPending: true}};
    case GET_FUTURE_LOG_FULFILLED:
      return {...state, error: null,
        futureLog: {...state.futureLog, data: action.payload, isPending: false}};
    case GET_MONTHLY_LOG:
      return {...state, monthlyLog: {...state.monthlyLog, isPending: true}};
    case GET_MONTHLY_LOG_FULFILLED:
      return {...state, error: null,
        monthlyLog: {...state.monthlyLog, data: action.payload, isPending: false}};
    case GET_WEEKLY_LOG:
      return {...state, weeklyLog: {...state.weeklyLog, isPending: true}};
    case GET_WEEKLY_LOG_FULFILLED:
      return {...state, error: null,
        weeklyLog: {...state.weeklyLog, data: action.payload, isPending: false}};
    case GET_DAILY_LOG:
      return {...state, dailyLog: {...state.dailyLog, isPending: true}};
    case GET_DAILY_LOG_FULFILLED:
      return {...state, error: null,
        dailyLog: {...state.dailyLog, data: action.payload, isPending: false}};
    case GET_LOG_DATA_REJECTED:
      return {...state, error: 'something went wrong!',
        weeklyLog: {...state.weeklyLog, isPending: false}};
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
  }
  return state;
};
