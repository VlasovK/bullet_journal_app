import logsApi from '../../api/logsApi';

export const SET_CURRENT_TASK = 'SET_CURRENT_TASK';
export const SET_LOG_DATE = 'SET_LOG_DATE';
export const INCREASE_PENDING_REQUESTS = 'INCREASE_PENDING_REQUESTS';
export const DECREASE_PENDING_REQUESTS = 'DECREASE_PENDING_REQUESTS';
export const SET_TASKS = 'SET_TASKS';
export const SET_MIGRATE_DATA = 'SET_MIGRATE_DATA';
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
export let setMigrateData = (taskToMigrate, newLogType) => (
  {type: SET_MIGRATE_DATA, payload: {taskToMigrate, newLogType}}
);
