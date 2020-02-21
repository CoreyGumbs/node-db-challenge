
exports.up = function(knex) {
  return knex.schema.createTable('tasks', tbl => {
      tbl.increments();
  })
};

exports.down = function(knex) {
  
};
