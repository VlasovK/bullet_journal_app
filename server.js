let express = require('express');
let fs = require('fs');
let bodyParser = require('body-parser');
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
// get Future Log data
app.get('/get_future_log', (request, response)=>{
  response.send(journalData.futureLog);
});
// add task to futureLog
app.post('/add_future_log_task', (request, response)=>{
  let newTask = {...request.body.task, id: journalData.nextId++};
  journalData.futureLog.push(newTask);
  response.send(journalData.futureLog);
});
app.post('/edit_future_log_task', (request, response)=>{
  let tasks = journalData.futureLog;
  tasks.forEach((task, index)=>{
    if (task.id === request.body.task.id)
      tasks[index] = request.body.task;
 });
  response.send(tasks);
});
app.delete('/delete_future_log_task/:id', (request, response)=>{
  tasks = journalData.futureLog.filter(task=> {
    return task.id !== +request.params.id;
 });
  journalData.futureLog = tasks;
  response.send(tasks);
});
// get Monthly Log data by YEAR and MONTH number
app.get('/get_monthly_log/:year/:week', (request, response)=>{
  let {year, month} = request.params;
  if (journalData.monthlyLog[year] && journalData.monthlyLog[year][month])
    response.send(journalData.monthlyLog[year][month]);
  response.send([]);
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
  response.send(journalData.monthlyLog[year][month]);
});
app.post('/edit_monthly_log_task', (request, response)=>{
  let {year, month, task: newTask} = request.body;
  let tasks = journalData.monthlyLog[year][month];
  tasks.forEach((task, index)=>{
    if (task.id === newTask.id)
      tasks[index] = newTask;
 });
  response.send(tasks);
});
app.delete('/delete_monthly_log_task/:year/:month/:id', (request, response)=>{
  let {year, month, id} = request.params;
  tasks = journalData.monthlyLog[year][month].filter(task=> {
    return task.id !== +id;
 });
  journalData.monthlyLog[year][month] = tasks;
  response.send(tasks);
});
// get Weekly Log data by YEAR and WEEK number
app.get('/get_weekly_log/:year/:week', (request, response)=>{
  let {year, week} = request.params;
  if (journalData.weeklyLog[year] && journalData.weeklyLog[year][week])
    response.send(journalData.weeklyLog[year][week]);
  response.send([]);
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
  response.send(journalData.weeklyLog[year][week]);
});
app.post('/edit_weekly_log_task', (request, response)=>{
  let {year, week, task: newTask} = request.body;
  let tasks = journalData.weeklyLog[year][week];
  tasks.forEach((task, index)=>{
    if (task.id === newTask.id)
      tasks[index] = newTask;
 });
  response.send(tasks);
});
app.delete('/delete_weekly_log_task/:year/:week/:id', (request, response)=>{
  let {year, week, id} = request.params;
  tasks = journalData.weeklyLog[year][week].filter(task=> {
    return task.id !== +id;
 });
  journalData.weeklyLog[year][week] = tasks;
  response.send(tasks);
});
// get Daily Log data by DATE format('MM-DD-YYYY')
app.get('/get_daily_log/:date', (request, response)=>{
  let {date} = request.params;
  if (journalData.dailyLog[date])
    response.send(journalData.dailyLog[date]);
  response.send([]);
});
app.post('/add_daily_log_task', (request, response)=>{
  let {date, task} = request.body;
  let newTask = {...task, id: journalData.nextId++};
  // create date.arr if not created
  if (!journalData.dailyLog[date])
    journalData.dailyLog[date] = [];
  // add task to dailyLog
  journalData.dailyLog[date].push(newTask);
  response.send(journalData.dailyLog[date]);
});
app.post('/edit_daily_log_task', (request, response)=>{
  let {date, task: newTask} = request.body;
  let tasks = journalData.dailyLog[date];
  tasks.forEach((task, index)=>{
    if (task.id === newTask.id)
      tasks[index] = newTask;
 });
  response.send(tasks);
});
app.delete('/delete_daily_log_task/:date/:id', (request, response)=>{
  let {date, id} = request.params;
  tasks = journalData.dailyLog[date].filter(task=> {
    return task.id !== +id;
 });
  journalData.dailyLog[date] = tasks;
  response.send(tasks);
});

app.listen(3000, ()=> console.log( 'Listening on port 3000' ));
