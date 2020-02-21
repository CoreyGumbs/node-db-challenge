
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('tasks').del()
    .then(function () {
      // Inserts seed entries
      return knex('tasks').insert([
        {
          task_name:'write seeds for data',
          task_description: 'need to add data to db' ,
          note: 'working on it, taking longer than usual',
          project_id: 1
        },
        {
          task_name:'test taks 2',
          task_description: 'lorem ipsum' ,
          note: 'working on it, taking longer than usual',
          project_id: 1
        },
        {
          task_name:'test taks 3',
          task_description: 'lorem ipsum' ,
          note: 'working on it, taking longer than usual',
          project_id: 5
        },
        {
          task_name:'test taks 25',
          task_description: 'lorem ipsum' ,
          note: 'working on it, taking longer than usual',
          project_id: 4
        },
        {
          task_name:'test task 12',
          task_description: 'lorem ipsum' ,
          note: 'working on it, taking longer than usual',
          project_id: 2
        }
      ]);
    });
};
