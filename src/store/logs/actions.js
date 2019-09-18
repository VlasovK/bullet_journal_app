import axios from 'axios';
import logsApi from '../../api/logsApi';
import * as moment from 'moment';

export const SET_CURRENT_LOG_TASK = 'SET_CURRENT_LOG_TASK';
export const SET_MONTHLY_LOG_DATE = 'SET_MONTHLY_LOG_DATE';
export const SET_WEEKLY_LOG_DATE = 'SET_WEEKLY_LOG_DATE';
export const SET_DAILY_LOG_DATE = 'SET_DAILY_LOG_DATE';
export const GET_FUTURE_LOG = 'GET_FUTURE_LOG';
export const GET_FUTURE_LOG_FULFILLED = 'GET_FUTURE_LOG_FULFILLED';
export const GET_MONTHLY_LOG = 'GET_MONTHLY_LOG';
export const GET_MONTHLY_LOG_FULFILLED = 'GET_MONTHLY_LOG_FULFILLED';
export const GET_WEEKLY_LOG = 'GET_WEEKLY_LOG';
export const GET_WEEKLY_LOG_FULFILLED = 'GET_WEEKLY_LOG_FULFILLED';
export const GET_DAILY_LOG = 'GET_DAILY_LOG';
export const GET_DAILY_LOG_FULFILLED = 'GET_DAILY_LOG_FULFILLED';
export const GET_LOG_DATA_REJECTED = 'GET_LOG_DATA_REJECTED';
export const SET_TASK_TO_MIGRATE = 'SET_TASK_TO_MIGRATE';
export const RESET_MIGRATE_DATA = 'RESET_MIGRATE_DATA';
export const MIGRATE_TASK = 'MIGRATE_TASK';
export const MIGRATE_TASK_FULFILLED = 'MIGRATE_TASK_FULFILLED';
export const SET_BUSY_DATES = 'SET_BUSY_DATES';
// sorting by task status and marking
let sortTasks = tasks=>{
  return tasks.sort((a, b)=>{
    if (a.status === b.status)
      return (a.mark - b.mark);
    return (a.status - b.status);
  });
};
export let setCurrentLogTask = id=>({type: SET_CURRENT_LOG_TASK, payload: id});
export let setMonthlyLogDate = data=>({type: SET_MONTHLY_LOG_DATE, payload: data});
export let setWeeklyLogDate = data=>({type: SET_WEEKLY_LOG_DATE, payload: data});
export let setDailyLogDate = date=>({type: SET_DAILY_LOG_DATE, payload: date});
export let getFutureLog = ()=>{
  return (dispatch, getState)=>{
    dispatch({type: GET_FUTURE_LOG});
    logsApi.getFutureLog()
      .then(response=> {
        let sortedFutureLog = sortTasks(response.data.futureLog);
        dispatch({type: GET_FUTURE_LOG_FULFILLED, payload: sortedFutureLog});
        dispatch({type: SET_BUSY_DATES, payload: response.data.busyDates});
      })
      .catch(error=> dispatch({type: GET_LOG_DATA_REJECTED}));
  };
};
export let addFutureLogTask = task=>{
  return (dispatch, getState)=>{
    dispatch({type: GET_FUTURE_LOG});
    logsApi.addFutureLogTask({task})
      .then(response=> {
        let sortedFutureLog = sortTasks(response.data.futureLog);
        dispatch({type: GET_FUTURE_LOG_FULFILLED, payload: sortedFutureLog});
      })
      .catch(error=> dispatch({type: GET_LOG_DATA_REJECTED}));
  };
};
export let editFutureLogTask = task=>{
  return (dispatch, getState)=>{
    dispatch({type: GET_FUTURE_LOG});
    logsApi.editFutureLogTask({task})
      .then(response=> {
        let sortedFutureLog = sortTasks(response.data.futureLog);
        dispatch({type: GET_FUTURE_LOG_FULFILLED, payload: sortedFutureLog});
      })
      .catch(error=> dispatch({type: GET_LOG_DATA_REJECTED}));
  };
};
export let deleteFutureLogTask = id=>{
  return (dispatch, getState)=>{
    dispatch({type: GET_FUTURE_LOG});
    logsApi.deleteFutureLogTask(id)
      .then(response=> {
        let sortedFutureLog = sortTasks(response.data.futureLog);
        dispatch({type: GET_FUTURE_LOG_FULFILLED, payload: sortedFutureLog});
        dispatch({type: SET_BUSY_DATES, payload: response.data.busyDates});
      })
      .catch(error=> dispatch({type: GET_LOG_DATA_REJECTED}));
  };
};
export let getMonthlyLog = ()=>{
  return (dispatch, getState)=>{
    let {year, month} = getState().logsState.monthlyLog;
    let data = {year, month};
    dispatch({type: GET_MONTHLY_LOG});
    logsApi.getMonthlyLog(data)
      .then(response=> {
        let sortedMonthlyLog = sortTasks(response.data.monthlyLog);
        dispatch({type: GET_MONTHLY_LOG_FULFILLED, payload: sortedMonthlyLog});
        dispatch({type: SET_BUSY_DATES, payload: response.data.busyDates});
      })
      .catch(error=> dispatch({type: GET_LOG_DATA_REJECTED}));
  };
};
export let addMonthlyLogTask = task=>{
  return (dispatch, getState)=>{
    let year = getState().logsState.monthlyLog.year;
    let month = getState().logsState.monthlyLog.month;
    let data = {year, month, task};
    dispatch({type: GET_MONTHLY_LOG});
    logsApi.addMonthlyLogTask(data)
      .then(response=> {
        let sortedMonthlyLog = sortTasks(response.data.monthlyLog);
        dispatch({type: GET_MONTHLY_LOG_FULFILLED, payload: sortedMonthlyLog});
        dispatch({type: SET_BUSY_DATES, payload: response.data.busyDates});
      })
      .catch(error=> dispatch({type: GET_LOG_DATA_REJECTED}));
  };
};
let migrateToMonthlyLogTask = (task, date)=>{
  return (dispatch, getState)=>{
    let data = {year: date.year, month: date.month, task};
    logsApi.addMonthlyLogTask(data)
      .then(response=>{
        if (date.year === getState().logsState.monthlyLog.year
          && date.month === getState().logsState.monthlyLog.month) {
            let sortedMonthlyLog = sortTasks(response.data.monthlyLog);
            dispatch({type: GET_MONTHLY_LOG_FULFILLED, payload: sortedMonthlyLog});
            dispatch({type: SET_BUSY_DATES, payload: response.data.busyDates});
        }
      })
      .catch(error=> dispatch({type: GET_LOG_DATA_REJECTED}));
    dispatch({type: MIGRATE_TASK_FULFILLED});
  };
};
export let editMonthlyLogTask = task=>{
  return (dispatch, getState)=>{
    let {year, month} = getState().logsState.monthlyLog;
    let data = {year, month, task};
    dispatch({type: GET_MONTHLY_LOG});
    logsApi.editMonthlyLogTask(data)
      .then(response=> {
        let sortedMonthlyLog = sortTasks(response.data.monthlyLog);
        dispatch({type: GET_MONTHLY_LOG_FULFILLED, payload: sortedMonthlyLog});
        dispatch({type: SET_BUSY_DATES, payload: response.data.busyDates});
      })
      .catch(error=> dispatch({type: GET_LOG_DATA_REJECTED}));
  };
};
export let deleteMonthlyLogTask = id=>{
  return (dispatch, getState)=>{
    let year = getState().logsState.monthlyLog.year;
    let month = getState().logsState.monthlyLog.month;
    let data = {year, month, id};
    dispatch({type: GET_MONTHLY_LOG});
    logsApi.deleteMonthlyLogTask(data)
      .then(response=> {
        let sortedMonthlyLog = sortTasks(response.data.monthlyLog);
        dispatch({type: GET_MONTHLY_LOG_FULFILLED, payload: sortedMonthlyLog});
        dispatch({type: SET_BUSY_DATES, payload: response.data.busyDates});
      })
      .catch(error=> dispatch({type: GET_LOG_DATA_REJECTED}));
  };
};
export let getWeeklyLog = ()=>{
  return (dispatch, getState)=>{
    let {year, week} = getState().logsState.weeklyLog;
    let data = {year, week};
    dispatch({type: GET_WEEKLY_LOG});
    logsApi.getWeeklyLog(data)
      .then(response=> {
        let sortedWeeklyLog = sortTasks(response.data.weeklyLog);
        dispatch({type: GET_WEEKLY_LOG_FULFILLED, payload: sortedWeeklyLog});
        dispatch({type: SET_BUSY_DATES, payload: response.data.busyDates});
      })
      .catch(error=> dispatch({type: GET_LOG_DATA_REJECTED}));
  };
};
export let addWeeklyLogTask = task=>{
  return (dispatch, getState)=>{
    let year = getState().logsState.weeklyLog.year;
    let week = getState().logsState.weeklyLog.week;
    let data = {year, week, task};
    dispatch({type: GET_WEEKLY_LOG});
    logsApi.addWeeklyLogTask(data)
      .then(response=> {
        let sortedWeeklyLog = sortTasks(response.data.weeklyLog);
        dispatch({type: GET_WEEKLY_LOG_FULFILLED, payload: sortedWeeklyLog});
        dispatch({type: SET_BUSY_DATES, payload: response.data.busyDates});
      })
      .catch(error=> dispatch({type: GET_LOG_DATA_REJECTED}));
  };
};
let migrateToWeeklyLogTask = (task, date)=>{
  return (dispatch, getState)=>{
    let data = {year: date.year, week: date.week, task};
    logsApi.addWeeklyLogTask(data)
      .then(response=>{
        if (date.year === getState().logsState.weeklyLog.year
          && date.week === getState().logsState.weeklyLog.week) {
            let sortedWeeklyLog = sortTasks(response.data.weeklyLog);
            dispatch({type: GET_WEEKLY_LOG_FULFILLED, payload: sortedWeeklyLog});
            dispatch({type: SET_BUSY_DATES, payload: response.data.busyDates});
        }
      })
      .catch(error=> dispatch({type: GET_LOG_DATA_REJECTED}));
    dispatch({type: MIGRATE_TASK_FULFILLED});
  };
};
export let editWeeklyLogTask = task=>{
  return (dispatch, getState)=>{
    let {year, week} = getState().logsState.weeklyLog;
    let data = {year, week, task};
    dispatch({type: GET_WEEKLY_LOG});
    logsApi.editWeeklyLogTask(data)
      .then(response=> {
        let sortedWeeklyLog = sortTasks(response.data.weeklyLog);
        dispatch({type: GET_WEEKLY_LOG_FULFILLED, payload: sortedWeeklyLog});
        dispatch({type: SET_BUSY_DATES, payload: response.data.busyDates});
      })
      .catch(error=> dispatch({type: GET_LOG_DATA_REJECTED}));
  };
};
export let deleteWeeklyLogTask = id=>{
  return (dispatch, getState)=>{
    let year = getState().logsState.weeklyLog.year;
    let week = getState().logsState.weeklyLog.week;
    let data = {year, week, id};
    dispatch({type: GET_WEEKLY_LOG});
    logsApi.deleteWeeklyLogTask(data)
      .then(response=> {
        let sortedWeeklyLog = sortTasks(response.data.weeklyLog);
        dispatch({type: GET_WEEKLY_LOG_FULFILLED, payload: sortedWeeklyLog});
        dispatch({type: SET_BUSY_DATES, payload: response.data.busyDates});
      })
      .catch(error=> dispatch({type: GET_LOG_DATA_REJECTED}));
  };
};
export let getDailyLog = ()=>{
  return (dispatch, getState)=>{
    let {date} = getState().logsState.dailyLog;
    date = date.format('MM-DD-YYYY');
    dispatch({type: GET_DAILY_LOG});
    logsApi.getDailyLog(date)
      .then(response=> {
        let sortedDailyLog = sortTasks(response.data.dailyLog);
        dispatch({type: GET_DAILY_LOG_FULFILLED, payload: sortedDailyLog});
        dispatch({type: SET_BUSY_DATES, payload: response.data.busyDates});
      })
      .catch(error=> dispatch({type: GET_LOG_DATA_REJECTED}));
  };
};
export let addDailyLogTask = task=>{
  return (dispatch, getState)=>{
    let date = getState().logsState.dailyLog.date.format('MM-DD-YYYY');
    let data = {date, task};
    dispatch({type: GET_DAILY_LOG});
    logsApi.addDailyLogTask(data)
      .then(response=>{
        let sortedDailyLog = sortTasks(response.data.dailyLog);
        dispatch({type: GET_DAILY_LOG_FULFILLED, payload: sortedDailyLog});
        dispatch({type: SET_BUSY_DATES, payload: response.data.busyDates});
      })
      .catch(error=> dispatch({type: GET_LOG_DATA_REJECTED}));
  };
};
let migrateToDailyLogTask = (task, date)=>{
  return (dispatch, getState)=>{
    date = date.format('MM-DD-YYYY');
    let data = {date, task};
    logsApi.addDailyLogTask(data)
      .then(response=>{
        if (date === getState().logsState.dailyLog.date.format('MM-DD-YYYY')) {
          let sortedDailyLog = sortTasks(response.data.dailyLog);
          dispatch({type: GET_DAILY_LOG_FULFILLED, payload: sortedDailyLog});
          dispatch({type: SET_BUSY_DATES, payload: response.data.busyDates});
        }
      })
      .catch(error=> dispatch({type: GET_LOG_DATA_REJECTED}));
    dispatch({type: MIGRATE_TASK_FULFILLED});
  };
};
export let editDailyLogTask = task=>{
  return (dispatch, getState)=>{
    let {date} = getState().logsState.dailyLog;
    date = date.format('MM-DD-YYYY');
    let data = {date, task};
    dispatch({type: GET_DAILY_LOG});
    logsApi.editDailyLogTask(data)
      .then(response=> {
        let sortedDailyLog = sortTasks(response.data.dailyLog);
        dispatch({type: GET_DAILY_LOG_FULFILLED, payload: sortedDailyLog});
        dispatch({type: SET_BUSY_DATES, payload: response.data.busyDates});
      })
      .catch(error=> dispatch({type: GET_LOG_DATA_REJECTED}));
  };
};
export let deleteDailyLogTask = id=>{
  return (dispatch, getState)=>{
    let date = getState().logsState.dailyLog.date.format('MM-DD-YYYY');
    let data = {date, id};
    dispatch({type: GET_DAILY_LOG});
    logsApi.deleteDailyLogTask(data)
      .then(response=> {
        let sortedDailyLog = sortTasks(response.data.dailyLog);
        dispatch({type: GET_DAILY_LOG_FULFILLED, payload: sortedDailyLog});
        dispatch({type: SET_BUSY_DATES, payload: response.data.busyDates});
      })
      .catch(error=> dispatch({type: GET_LOG_DATA_REJECTED}));
  };
};
export let setTaskToMigrate = (task, newMigrateLogType)=>{
  return ({type: SET_TASK_TO_MIGRATE, payload: {task, newMigrateLogType}});
};
export let migrateTask = newDate=>{
  return (dispatch, getState)=>{
    dispatch({type: MIGRATE_TASK});
    let {taskToMigrate: {task, logType}, newMigrateLogType}
      = getState().logsState.migrateTaskDates;
    // delete task from log
    switch (logType) {
      case 'futureLog':
        dispatch(deleteFutureLogTask(task.id));
        break;
      case 'monthlyLog':
        dispatch(deleteMonthlyLogTask(task.id));
        break;
      case 'weeklyLog':
        dispatch(deleteWeeklyLogTask(task.id));
        break;
      case 'dailyLog':
        dispatch(deleteDailyLogTask(task.id));
    }
    // add task to another log
    switch (newMigrateLogType) {
      case 'futureLog':
        dispatch(addFutureLogTask(task));
        dispatch({type: MIGRATE_TASK_FULFILLED})
        break;
      case 'monthlyLog':
        dispatch(migrateToMonthlyLogTask(task,
          {year: newDate.year(), month: newDate.month()}));
        break;
      case 'weeklyLog':
        dispatch(migrateToWeeklyLogTask(task,
          {year: newDate.year(), week: newDate.isoWeek()}));
        break;
      case 'dailyLog':
        dispatch(migrateToDailyLogTask(task, newDate));
    }
    dispatch({type: RESET_MIGRATE_DATA});
  };
};
