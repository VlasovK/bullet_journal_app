import {
  queryGet,
  queryPost,
  queryDelete
} from './apiConfig';

export default {
  getTasks() {
    return queryGet('/get_tasks');
  },
  addTask(task) {
    return queryPost('/add_task', {task});
  },
  editTask(task) {
    return queryPost('/edit_task', {task});
  },
  removeTask(id) {
    return queryDelete(`/remove_task/${id}`);
  }
};

// =========================================================================

/**

export default {
  getTasks() {
    return queryGet('/get_future_log');
  },
  addTask(data) {
    return queryPost('/add_future_log_task', data);
  },
  editTask(data) {
    return queryPost('/edit_future_log_task', data);
  },
  removeTask(id) {
    return queryDelete(`/delete_future_log_task/${id}`);
  },
  getTasks(data) {
    return queryGet(`/get_monthly_log/${data.year}/${data.month}`);
  },
  addTask(data) {
    return queryPost('/add_monthly_log_task', data);
  },
  editTask(data) {
    return queryPost('/edit_monthly_log_task', data);
  },
  removeTask(data) {
    let {year, month, id} = data;
    return queryDelete(`/delete_monthly_log_task/${year}/${month}/${id}`);
  },
  getTasks(data) {
    return queryGet(`/get_weekly_log/${data.year}/${data.week}`);
  },
  addTask(data) {
    return queryPost('/add_weekly_log_task', data);
  },
  editTask(data) {
    return queryPost('/edit_weekly_log_task', data);
  },
  removeTask(data) {
    let {year, week, id} = data;
    return queryDelete(`/delete_weekly_log_task/${year}/${week}/${id}`);
  },
  getTasks(date) {
    return queryGet(`/get_daily_log/${date}`);
  },
  addTask(data) {
    return queryPost('/add_daily_log_task', data);
  },
  editTask(data) {
    return queryPost('/edit_daily_log_task', data);
  },
  removeTask(data) {
    return queryDelete(`/delete_daily_log_task/${data.date}/${data.id}`);
  }
};
 */
