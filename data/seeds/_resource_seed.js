
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('resources').del()
    .then(function () {
      // Inserts seed entries
      return knex('resources').insert([
          {
            resource_name: "Macbook Pro",
            resource_description: "laptop made by apple."
          },
          {
            resource_name: "College Ruled Notbooks",
            resource_description: "used for writing notes"
          },
          {
            resource_name: "Sticky Notes",
            resource_description: "test desciption"
          },
          {
            resource_name: "White Board",
            resource_description: "for coding practice"
          },
          {
            resource_name: "Pens",
            resource_description: "we always need to write"
          }
      ]);
    });
};
