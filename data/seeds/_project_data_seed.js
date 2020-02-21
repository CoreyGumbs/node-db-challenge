
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('projects').del()
    .then(function () {
      // Inserts seed entries
      return knex('projects').insert([
        {
          project_name: 'Test Project 1',
          project_description: 'lorem ipsum blah blah blah'
        },
        {
          project_name: 'Lambda Sprint db',
          project_description: 'lorem ipsum blah blah blah'
        },
        {
          project_name: 'Create Portfolio',
          project_description: 'lorem ipsum blah blah blah'
        },
        {
          project_name: 'Test Project 2',
          project_description: 'lorem ipsum blah blah blah'
        },
        {
          project_name: 'Build Studio',
          project_description: 'lorem ipsum blah blah blah'
        }
      ]);
    });
};
