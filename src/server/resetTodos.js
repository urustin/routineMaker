// cronJobs.js // resetTodos.js

const cron = require('node-cron');
const Todo = require('./models/Todo.js');



function resetTodos() {
  cron.schedule('0 4 * * *', async function() {
    let currentDate = new Date();

    try {
          const todos = await Todo.find();
          // console.log(todos);
          for (let todo of todos) {
            todo.doneToday ? todo.doneTotal.push(1)  : todo.doneTotal.push(0); // If doneToday is true, set doneTotal to 1, otherwise 0
            todo.doneToday = false;
            await todo.save();
            // console.log(todo.doneTotal);
          }
        } catch (err) {
          console.error(err);
        }


    console.log(`Running a task at 4am on ${currentDate}`);

  });
}

module.exports = { resetTodos };