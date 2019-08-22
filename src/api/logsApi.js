import {queryGet, queryPost, queryDelete} from './apiConfig';

export default {
  getFutureLog() {
    return queryGet('/get_future_log');
  },
  addFutureLogTask(data) {
    return queryPost('/add_future_log_task', data);
  },
  editFutureLogTask(data) {
    return queryPost('/edit_future_log_task', data);
  },
  deleteFutureLogTask(id) {
    return queryDelete(`/delete_future_log_task/${id}`);
  },
  getMonthlyLog(data) {
    return queryGet(`/get_monthly_log/${data.year}/${data.month}`);
  },
  addMonthlyLogTask(data) {
    return queryPost('/add_monthly_log_task', data);
  },
  editMonthlyLogTask(data) {
    return queryPost('/edit_monthly_log_task', data);
  },
  deleteMonthlyLogTask(data) {
    let {year, month, id} = data;
    return queryDelete(`/delete_monthly_log_task/${year}/${month}/${id}`);
  },
  getWeeklyLog(data) {
    return queryGet(`/get_weekly_log/${data.year}/${data.week}`);
  },
  addWeeklyLogTask(data) {
    return queryPost('/add_weekly_log_task', data);
  },
  editWeeklyLogTask(data) {
    return queryPost('/edit_weekly_log_task', data);
  },
  deleteWeeklyLogTask(data) {
    let {year, week, id} = data;
    return queryDelete(`/delete_weekly_log_task/${year}/${week}/${id}`);
  },
  getDailyLog(date) {
    return queryGet(`/get_daily_log/${date}`);
  },
  addDailyLogTask(data) {
    return queryPost('/add_daily_log_task', data);
  },
  editDailyLogTask(data) {
    return queryPost('/edit_daily_log_task', data);
  },
  deleteDailyLogTask(data) {
    return queryDelete(`/delete_daily_log_task/${data.date}/${data.id}`);
  }
};
