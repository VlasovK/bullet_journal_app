let bodyParser = require('body-parser');
let express = require('express');
let fs = require('fs');

if (!fs.existsSync('app_db.json')) {
  fs.writeFileSync('app_db.json', fs.readFileSync('app_db_init.json'));
}
let appDb = JSON.parse(fs.readFileSync('app_db.json'));
setInterval(() => {
  fs.writeFileSync('app_db.json', JSON.stringify(appDb));
}, 1000);

let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, PATCH, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Credentials', true);
  next();
});

// logs API
app.get('/get_tasks/', (request, response) => {
  response.send({tasks: appDb.tasks});
});
app.post('/add_task', (request, response) => {
  let {task} = request.body;
  task.id = appDb.nextId++;
  appDb.tasks.push(task);
  response.send({task});
});
app.post('/edit_task', (request, response) => {
  let editedTask = request.body.task;
  let i = appDb.tasks.findIndex((task) => {
    return task.id === editedTask.id;
  });
  appDb.tasks[i] = editedTask;
  response.end();
});
app.delete('/remove_task/:id', (request, response) => {
  appDb.tasks = appDb.tasks.filter((task) => {
    task.id !== Number(request.params.id);
  });
  response.end();
});

app.listen(3000, () => console.log(`Listening on port 3000`));
