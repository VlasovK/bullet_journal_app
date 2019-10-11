import logsApi from '../../api/logsApi';

export const SET_CURRENT_TASK = 'SET_CURRENT_TASK';
export const SET_LOG_DATE = 'SET_LOG_DATE';
export const INCREASE_PENDING_REQUESTS = 'INCREASE_PENDING_REQUESTS';
export const DECREASE_PENDING_REQUESTS = 'DECREASE_PENDING_REQUESTS';
export const SET_TASKS = 'SET_TASKS';
// export const SET_TASK_TO_MIGRATE = 'SET_TASK_TO_MIGRATE';
// export const RESET_MIGRATE_DATA = 'RESET_MIGRATE_DATA';
// export const MIGRATE_TASK = 'MIGRATE_TASK';
export const THROW_SERVER_ERROR = 'THROW_SERVER_ERROR';

export let setCurrentTask = (task) => ({type: SET_CURRENT_TASK, payload: task});
export let setLogDate = (data) => ({type: SET_LOG_DATE, payload: data});
export let getTasks = () => {
  return (dispatch) => {
    dispatch({type: INCREASE_PENDING_REQUESTS});
    logsApi.getTasks()
      .then((response) => {
        dispatch({type: SET_TASKS, payload: response.data.tasks});
      })
      .catch(() => dispatch({type: THROW_SERVER_ERROR}))
      .finally(() => dispatch({type: DECREASE_PENDING_REQUESTS}));
  };
};
export let addTask = (task) => {
  return (dispatch, getState) => {
    dispatch({type: INCREASE_PENDING_REQUESTS});
    logsApi.addTask(task)
      .then((response) => {
        console.log('TASK', task);
        console.log('DATA', response.data.task);
        let tasks = getState().logsState.tasks;
        tasks.push(response.data.task);
        dispatch({type: SET_TASKS, payload: tasks});
      })
      .catch(() => dispatch({type: THROW_SERVER_ERROR}))
      .finally(() => dispatch({type: DECREASE_PENDING_REQUESTS}));
  };
};
export let editTask = (task) => {
  return (dispatch, getState) => {
    dispatch({type: INCREASE_PENDING_REQUESTS});
    logsApi.editTask(task)
      .then(() => {
        let tasks = getState().logsState.tasks;
        let i = tasks.findIndex((item) => item.id === task.id);
        tasks[i] = task;
        dispatch({type: SET_TASKS, payload: tasks});
      })
      .catch(() => dispatch({type: THROW_SERVER_ERROR}))
      .finally(() => dispatch({type: DECREASE_PENDING_REQUESTS}));
  };
};
export let removeTask = (id) => {
  return (dispatch, getState) => {
    dispatch({type: INCREASE_PENDING_REQUESTS});
    logsApi.removeTask(id)
      .then(() => {
        let tasks = getState().logsState.tasks;
        tasks = tasks.filter((item) => item.id !== id);
        dispatch({type: SET_TASKS, payload: tasks});
      })
      .catch(() => dispatch({type: THROW_SERVER_ERROR}))
      .finally(() => dispatch({type: DECREASE_PENDING_REQUESTS}));
  };
};


// =============================================================================
// =============================================================================
// =============================================================================

/**
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
export let setCurrentTask = id=>({type: SET_CURRENT_LOG_TASK, payload: id});
export let setLogDate = data=>({type: SET_MONTHLY_LOG_DATE, payload: data});
export let setLogDate = data=>({type: SET_WEEKLY_LOG_DATE, payload: data});
export let setLogDate = date=>({type: SET_DAILY_LOG_DATE, payload: date});
export let getTasks = ()=>{
  return (dispatch, getState)=>{
    dispatch({type: GET_FUTURE_LOG});
    logsApi.getTasks()
      .then(response=> {
        let sortedfuture = sortTasks(response.data.future);
        dispatch({type: GET_FUTURE_LOG_FULFILLED, payload: sortedfuture});
        dispatch({type: SET_BUSY_DATES, payload: response.data.busyDates});
      })
      .catch(error=> dispatch({type: GET_LOG_DATA_REJECTED}));
  };
};
export let addTask = task=>{
  return (dispatch, getState)=>{
    dispatch({type: GET_FUTURE_LOG});
    logsApi.addTask({task})
      .then(response=> {
        let sortedfuture = sortTasks(response.data.future);
        dispatch({type: GET_FUTURE_LOG_FULFILLED, payload: sortedfuture});
      })
      .catch(error=> dispatch({type: GET_LOG_DATA_REJECTED}));
  };
};
export let editTask = task=>{
  return (dispatch, getState)=>{
    dispatch({type: GET_FUTURE_LOG});
    logsApi.editTask({task})
      .then(response=> {
        let sortedfuture = sortTasks(response.data.future);
        dispatch({type: GET_FUTURE_LOG_FULFILLED, payload: sortedfuture});
      })
      .catch(error=> dispatch({type: GET_LOG_DATA_REJECTED}));
  };
};
export let removeTask = id=>{
  return (dispatch, getState)=>{
    dispatch({type: GET_FUTURE_LOG});
    logsApi.removeTask(id)
      .then(response=> {
        let sortedfuture = sortTasks(response.data.future);
        dispatch({type: GET_FUTURE_LOG_FULFILLED, payload: sortedfuture});
      })
      .catch(error=> dispatch({type: GET_LOG_DATA_REJECTED}));
  };
};
export let getTasks = ()=>{
  return (dispatch, getState)=>{
    let {year, month} = getState().logsState.monthly;
    let data = {year, month};
    dispatch({type: GET_MONTHLY_LOG});
    logsApi.getTasks(data)
      .then(response=> {
        let sortedMonthlyLog = sortTasks(response.data.monthly);
        dispatch({type: GET_MONTHLY_LOG_FULFILLED, payload: sortedMonthlyLog});
        dispatch({type: SET_BUSY_DATES, payload: response.data.busyDates});
      })
      .catch(error=> dispatch({type: GET_LOG_DATA_REJECTED}));
  };
};
export let addTask = task=>{
  return (dispatch, getState)=>{
    let year = getState().logsState.monthly.year;
    let month = getState().logsState.monthly.month;
    let data = {year, month, task};
    dispatch({type: GET_MONTHLY_LOG});
    logsApi.addTask(data)
      .then(response=> {
        let sortedMonthlyLog = sortTasks(response.data.monthly);
        dispatch({type: GET_MONTHLY_LOG_FULFILLED, payload: sortedMonthlyLog});
        dispatch({type: SET_BUSY_DATES, payload: response.data.busyDates});
      })
      .catch(error=> dispatch({type: GET_LOG_DATA_REJECTED}));
  };
};
let migrateToMonthlyLogTask = (task, date)=>{
  return (dispatch, getState)=>{
    let data = {year: date.year, month: date.month, task};
    logsApi.addTask(data)
      .then(response=>{
        if (date.year === getState().logsState.monthly.year
          && date.month === getState().logsState.monthly.month) {
            let sortedMonthlyLog = sortTasks(response.data.monthly);
            dispatch({type: GET_MONTHLY_LOG_FULFILLED, payload: sortedMonthlyLog});
        }
        dispatch({type: SET_BUSY_DATES, payload: response.data.busyDates});
      })
      .catch(error=> dispatch({type: GET_LOG_DATA_REJECTED}));
    dispatch({type: MIGRATE_TASK_FULFILLED});
  };
};
export let editTask = task=>{
  return (dispatch, getState)=>{
    let {year, month} = getState().logsState.monthly;
    let data = {year, month, task};
    dispatch({type: GET_MONTHLY_LOG});
    logsApi.editTask(data)
      .then(response=> {
        let sortedMonthlyLog = sortTasks(response.data.monthly);
        dispatch({type: GET_MONTHLY_LOG_FULFILLED, payload: sortedMonthlyLog});
        dispatch({type: SET_BUSY_DATES, payload: response.data.busyDates});
      })
      .catch(error=> dispatch({type: GET_LOG_DATA_REJECTED}));
  };
};
export let removeTask = id=>{
  return (dispatch, getState)=>{
    let year = getState().logsState.monthly.year;
    let month = getState().logsState.monthly.month;
    let data = {year, month, id};
    dispatch({type: GET_MONTHLY_LOG});
    logsApi.removeTask(data)
      .then(response=> {
        let sortedMonthlyLog = sortTasks(response.data.monthly);
        dispatch({type: GET_MONTHLY_LOG_FULFILLED, payload: sortedMonthlyLog});
        dispatch({type: SET_BUSY_DATES, payload: response.data.busyDates});
      })
      .catch(error=> dispatch({type: GET_LOG_DATA_REJECTED}));
  };
};
export let getTasks = ()=>{
  return (dispatch, getState)=>{
    let {year, week} = getState().logsState.weekly;
    let data = {year, week};
    dispatch({type: GET_WEEKLY_LOG});
    logsApi.getTasks(data)
      .then(response=> {
        let sortedWeeklyLog = sortTasks(response.data.weekly);
        dispatch({type: GET_WEEKLY_LOG_FULFILLED, payload: sortedWeeklyLog});
        dispatch({type: SET_BUSY_DATES, payload: response.data.busyDates});
      })
      .catch(error=> dispatch({type: GET_LOG_DATA_REJECTED}));
  };
};
export let addTask = task=>{
  return (dispatch, getState)=>{
    let year = getState().logsState.weekly.year;
    let week = getState().logsState.weekly.week;
    let data = {year, week, task};
    dispatch({type: GET_WEEKLY_LOG});
    logsApi.addTask(data)
      .then(response=> {
        let sortedWeeklyLog = sortTasks(response.data.weekly);
        dispatch({type: GET_WEEKLY_LOG_FULFILLED, payload: sortedWeeklyLog});
        dispatch({type: SET_BUSY_DATES, payload: response.data.busyDates});
      })
      .catch(error=> dispatch({type: GET_LOG_DATA_REJECTED}));
  };
};
let migrateToWeeklyLogTask = (task, date)=>{
  return (dispatch, getState)=>{
    let data = {year: date.year, week: date.week, task};
    logsApi.addTask(data)
      .then(response=>{
        if (date.year === getState().logsState.weekly.year
          && date.week === getState().logsState.weekly.week) {
            let sortedWeeklyLog = sortTasks(response.data.weekly);
            dispatch({type: GET_WEEKLY_LOG_FULFILLED, payload: sortedWeeklyLog});
        }
        dispatch({type: SET_BUSY_DATES, payload: response.data.busyDates});
      })
      .catch(error=> dispatch({type: GET_LOG_DATA_REJECTED}));
    dispatch({type: MIGRATE_TASK_FULFILLED});
  };
};
export let editTask = task=>{
  return (dispatch, getState)=>{
    let {year, week} = getState().logsState.weekly;
    let data = {year, week, task};
    dispatch({type: GET_WEEKLY_LOG});
    logsApi.editTask(data)
      .then(response=> {
        let sortedWeeklyLog = sortTasks(response.data.weekly);
        dispatch({type: GET_WEEKLY_LOG_FULFILLED, payload: sortedWeeklyLog});
        dispatch({type: SET_BUSY_DATES, payload: response.data.busyDates});
      })
      .catch(error=> dispatch({type: GET_LOG_DATA_REJECTED}));
  };
};
export let removeTask = id=>{
  return (dispatch, getState)=>{
    let year = getState().logsState.weekly.year;
    let week = getState().logsState.weekly.week;
    let data = {year, week, id};
    dispatch({type: GET_WEEKLY_LOG});
    logsApi.removeTask(data)
      .then(response=> {
        let sortedWeeklyLog = sortTasks(response.data.weekly);
        dispatch({type: GET_WEEKLY_LOG_FULFILLED, payload: sortedWeeklyLog});
        dispatch({type: SET_BUSY_DATES, payload: response.data.busyDates});
      })
      .catch(error=> dispatch({type: GET_LOG_DATA_REJECTED}));
  };
};
export let getTasks = ()=>{
  return (dispatch, getState)=>{
    let {date} = getState().logsState.daily;
    date = date.format('MM-DD-YYYY');
    dispatch({type: GET_DAILY_LOG});
    logsApi.getTasks(date)
      .then(response=> {
        let sortedDailyLog = sortTasks(response.data.daily);
        dispatch({type: GET_DAILY_LOG_FULFILLED, payload: sortedDailyLog});
        dispatch({type: SET_BUSY_DATES, payload: response.data.busyDates});
      })
      .catch(error=> dispatch({type: GET_LOG_DATA_REJECTED}));
  };
};
export let addTask = task=>{
  return (dispatch, getState)=>{
    let date = getState().logsState.daily.date.format('MM-DD-YYYY');
    let data = {date, task};
    dispatch({type: GET_DAILY_LOG});
    logsApi.addTask(data)
      .then(response=>{
        let sortedDailyLog = sortTasks(response.data.daily);
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
    logsApi.addTask(data)
      .then(response=>{
        if (date === getState().logsState.daily.date.format('MM-DD-YYYY')) {
          let sortedDailyLog = sortTasks(response.data.daily);
          dispatch({type: GET_DAILY_LOG_FULFILLED, payload: sortedDailyLog});
        }
        dispatch({type: SET_BUSY_DATES, payload: response.data.busyDates});
      })
      .catch(error=> dispatch({type: GET_LOG_DATA_REJECTED}));
    dispatch({type: MIGRATE_TASK_FULFILLED});
  };
};
export let editTask = task=>{
  return (dispatch, getState)=>{
    let {date} = getState().logsState.daily;
    date = date.format('MM-DD-YYYY');
    let data = {date, task};
    dispatch({type: GET_DAILY_LOG});
    logsApi.editTask(data)
      .then(response=> {
        let sortedDailyLog = sortTasks(response.data.daily);
        dispatch({type: GET_DAILY_LOG_FULFILLED, payload: sortedDailyLog});
        dispatch({type: SET_BUSY_DATES, payload: response.data.busyDates});
      })
      .catch(error=> dispatch({type: GET_LOG_DATA_REJECTED}));
  };
};
export let removeTask = id=>{
  return (dispatch, getState)=>{
    let date = getState().logsState.daily.date.format('MM-DD-YYYY');
    let data = {date, id};
    dispatch({type: GET_DAILY_LOG});
    logsApi.removeTask(data)
      .then(response=> {
        let sortedDailyLog = sortTasks(response.data.daily);
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
      case 'future':
        dispatch(removeTask(task.id));
        break;
      case 'monthly':
        dispatch(removeTask(task.id));
        break;
      case 'weekly':
        dispatch(removeTask(task.id));
        break;
      case 'daily':
        dispatch(removeTask(task.id));
    }
    // add task to another log
    switch (newMigrateLogType) {
      case 'future':
        dispatch(addTask(task));
        dispatch({type: MIGRATE_TASK_FULFILLED})
        break;
      case 'monthly':
        dispatch(migrateToMonthlyLogTask(task,
          {year: newDate.year(), month: newDate.month()}));
        break;
      case 'weekly':
        dispatch(migrateToWeeklyLogTask(task,
          {year: newDate.year(), week: newDate.isoWeek()}));
        break;
      case 'daily':
        dispatch(migrateToDailyLogTask(task, newDate));
    }
    dispatch({type: RESET_MIGRATE_DATA});
  };
};

*/
