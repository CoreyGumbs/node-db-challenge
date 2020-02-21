
exports.up = function(knex) {
  return knex.schema.createTable('resources', tbl =>{
      tbl.increments();
      tbl.string('resource_name').notNullable();
      tbl.string('resource_description', 255);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('resources');
};
