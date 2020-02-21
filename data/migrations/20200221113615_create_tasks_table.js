
exports.up = function(knex) {
  return knex.schema.createTable('tasks', tbl => {
      tbl.increments();
      tbl.string('task_name', 255).notNullable();
      tbl.string('task_description', 255);
      tbl.text('note');
      tbl.boolean('completed').defaultTo('false');
      
      //project fk
      tbl.integer('project_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('projects')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('tasks');
};
