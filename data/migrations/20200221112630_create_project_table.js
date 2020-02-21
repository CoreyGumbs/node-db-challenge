
exports.up = function(knex) {
  return knex.schema.createTable('projects', tbl => {
      tbl.increments();
      tbl.string('project_name', 255).notNullable();
      tbl.string('project_description', 255);
      tbl.boolean('completed').defaultTo('false');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('projects');
};
