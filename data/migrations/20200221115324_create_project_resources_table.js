
exports.up = function(knex) {
  knex.schema.createTable('project_resources', tbl => {
      tbl.primary(['project_id', 'resources_id']);

      //project fk
      tbl.integer('project_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('projects')
      .onUpdate('CASCADE')
      .onDelete('RESTRICT');
        
      //resource fk
      tbl.integer('resource_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('resources')
      .onUpdate('CASCADE')
      .onDelete('RESTRICT');
  })
};

exports.down = function(knex) {
  knex.schema.dropTableIfExists('project_resources');
};
