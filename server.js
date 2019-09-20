let express = require('express');
let fs = require('fs');
let bodyParser = require('body-parser');
let moment = require('moment');
// create database file if not created
if (!fs.existsSync('journal_data.json'))
  fs.writeFileSync('journal_data.json', fs.readFileSync('journal_data_init.json'));
let journalData = JSON.parse(fs.readFileSync('journal_data.json'));
setInterval(()=> {
  fs.writeFileSync('journal_data.json', JSON.stringify(journalData));
}, 1000);
let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
// ============================================================================
// ================================ LOGS API ==================================
function getBusyDates() {
  let today = moment();
  let currentDate = {
    year: today.year(),
    month: today.month(),
    week: today.isoWeek(),
    day: today.format('L')
  };
  let busyDates = {
    monthly: {expired: [], actual: []},
    weekly: {expired: [], actual: []},
    daily: {expired: [], actual: []}
  };
  // define dates for monthlyLog
  for (let year in journalData.monthlyLog)
    for (let month in journalData.monthlyLog[year])
      if (year >= currentDate.year && month >= currentDate.month)
        journalData.monthlyLog[year][month].some(task=>{
          if (task.status === 1)
            return busyDates.monthly.actual.push({year, month});
        });
      else
      journalData.monthlyLog[year][month].some(task=>{
        if (task.status === 1)
          return busyDates.monthly.expired.push({year, month});
      });
  // define dates for weeklyLog
  for (let year in journalData.weeklyLog)
    for (let week in journalData.weeklyLog[year])
      if (year >= currentDate.year && week >= currentDate.week)
        journalData.weeklyLog[year][week].some(task=>{
          if (task.status === 1)
            return busyDates.weekly.actual.push({year, week});
        });
      else
      journalData.weeklyLog[year][week].some(task=>{
        if (task.status === 1)
          return busyDates.weekly.expired.push({year, week});
      });
  // define dates for dailyLog
  for (let day in journalData.dailyLog) {
    if (moment(new Date(day)).format('L') >= currentDate.day)
      journalData.dailyLog[day].some(task=>{
        if (task.status === 1)
          return busyDates.daily.actual.push(day);
      });
    else
      journalData.dailyLog[day].some(task=>{
        if (task.status === 1)
          return busyDates.daily.expired.push(day);
      });
  }
  return busyDates;
};
// get Future Log data
app.get('/get_future_log', (request, response)=>{
  let busyDates = getBusyDates();
  response.send({futureLog: journalData.futureLog, busyDates});
});
// add task to futureLog
app.post('/add_future_log_task', (request, response)=>{
  let newTask = {...request.body.task, id: journalData.nextId++};
  journalData.futureLog.push(newTask);
  response.send({futureLog: journalData.futureLog});
});
app.post('/edit_future_log_task', (request, response)=>{
  let tasks = journalData.futureLog;
  tasks.forEach((task, index)=>{
    if (task.id === request.body.task.id)
      tasks[index] = request.body.task;
  });
  response.send({futureLog: tasks});
});
app.delete('/delete_future_log_task/:id', (request, response)=>{
  tasks = journalData.futureLog.filter(task=> {
    return task.id !== +request.params.id;
  });
  journalData.futureLog = tasks;
  let busyDates = getBusyDates();
  response.send({futureLog: tasks, busyDates});
});
// get Monthly Log data by YEAR and MONTH number
app.get('/get_monthly_log/:year/:month', (request, response)=>{
  let {year, month} = request.params;
  let busyDates = getBusyDates();
  if (journalData.monthlyLog[year] && journalData.monthlyLog[year][month])
    response.send({monthlyLog: journalData.monthlyLog[year][month], busyDates});
  else
    response.send({monthlyLog: [], busyDates});
});
app.post('/add_monthly_log_task', (request, response)=>{
  let {year, month, task} = request.body;
  let newTask = {...task, id: journalData.nextId++};
  // create year.obj and month.arr if not created
  if (!journalData.monthlyLog[year])
    journalData.monthlyLog[year] = {};
  if (!journalData.monthlyLog[year][month]) {
    journalData.monthlyLog[year] = {
      ...journalData.monthlyLog[year],
      [month]: []
   };
 }
  // add task to monthlyLog
  journalData.monthlyLog[year][month].push(newTask);
  let busyDates = getBusyDates();
  response.send({monthlyLog: journalData.monthlyLog[year][month], busyDates});
});
app.post('/edit_monthly_log_task', (request, response)=>{
  let {year, month, task: newTask} = request.body;
  let tasks = journalData.monthlyLog[year][month];
  tasks.forEach((task, index)=>{
    if (task.id === newTask.id)
      tasks[index] = newTask;
  });
  let busyDates = getBusyDates();
  response.send({monthlyLog: tasks, busyDates});
});
app.delete('/delete_monthly_log_task/:year/:month/:id', (request, response)=>{
  let {year, month, id} = request.params;
  tasks = journalData.monthlyLog[year][month].filter(task=> {
    return task.id !== +id;
  });
  if (!tasks.length)
    delete journalData.monthlyLog[year][month];
  else
    journalData.monthlyLog[year][month] = tasks;
  let busyDates = getBusyDates();
  response.send({monthlyLog: tasks, busyDates});
});
// get Weekly Log data by YEAR and WEEK number
app.get('/get_weekly_log/:year/:week', (request, response)=>{
  let {year, week} = request.params;
  let busyDates = getBusyDates();
  if (journalData.weeklyLog[year] && journalData.weeklyLog[year][week])
    response.send({weeklyLog: journalData.weeklyLog[year][week], busyDates});
  else
    response.send({weeklyLog: [], busyDates});
});
app.post('/add_weekly_log_task', (request, response)=>{
  let {year, week, task} = request.body;
  let newTask = {...task, id: journalData.nextId++};
  // create year.obj and week.arr if not created
  if (!journalData.weeklyLog[year])
    journalData.weeklyLog[year] = {};
  if (!journalData.weeklyLog[year][week]) {
    journalData.weeklyLog[year] = {
      ...journalData.weeklyLog[year],
      [week]: []
   };
 }
  // add task to weeklyLog
  journalData.weeklyLog[year][week].push(newTask);
  let busyDates = getBusyDates();
  response.send({weeklyLog: journalData.weeklyLog[year][week], busyDates});
});
app.post('/edit_weekly_log_task', (request, response)=>{
  let {year, week, task: newTask} = request.body;
  let tasks = journalData.weeklyLog[year][week];
  tasks.forEach((task, index)=>{
    if (task.id === newTask.id)
      tasks[index] = newTask;
  });
  let busyDates = getBusyDates();
  response.send({weeklyLog: tasks, busyDates});
});
app.delete('/delete_weekly_log_task/:year/:week/:id', (request, response)=>{
  let {year, week, id} = request.params;
  tasks = journalData.weeklyLog[year][week].filter(task=> {
    return task.id !== +id;
 });
   if (!tasks.length)
     delete journalData.weeklyLog[year][week];
   else
    journalData.weeklyLog[year][week] = tasks;
  let busyDates = getBusyDates();
  response.send({weeklyLog: tasks, busyDates});
});
// get Daily Log data by DATE format('MM-DD-YYYY')
app.get('/get_daily_log/:date', (request, response)=>{
  let {date} = request.params;
  let busyDates = getBusyDates();
  if (journalData.dailyLog[date])
    response.send({dailyLog: journalData.dailyLog[date], busyDates});
  else
    response.send({dailyLog: [], busyDates});
});
app.post('/add_daily_log_task', (request, response)=>{
  let {date, task} = request.body;
  let newTask = {...task, id: journalData.nextId++};
  // create date.arr if not created
  if (!journalData.dailyLog[date])
    journalData.dailyLog[date] = [];
  // add task to dailyLog
  journalData.dailyLog[date].push(newTask);
  let busyDates = getBusyDates();
  response.send({dailyLog: journalData.dailyLog[date], busyDates});
});
app.post('/edit_daily_log_task', (request, response)=>{
  let {date, task: newTask} = request.body;
  let tasks = journalData.dailyLog[date];
  tasks.forEach((task, index)=>{
    if (task.id === newTask.id)
      tasks[index] = newTask;
  });
  let busyDates = getBusyDates();
  response.send({dailyLog: tasks, busyDates});
});
app.delete('/delete_daily_log_task/:date/:id', (request, response)=>{
  let {date, id} = request.params;
  tasks = journalData.dailyLog[date].filter(task=> task.id !== +id);
  if (!tasks.length)
    delete journalData.dailyLog[date];
  else
    journalData.dailyLog[date] = tasks;
  let busyDates = getBusyDates();
  response.send({dailyLog: tasks, busyDates});
});
// ============================================================================
// ================================ NOTES API =================================

app.listen(3000, ()=> console.log('Listening on port 3000'));
