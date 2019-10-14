import {queryDelete, queryGet, queryPost} from './apiConfig';

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
