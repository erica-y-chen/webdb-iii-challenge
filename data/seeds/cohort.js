
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cohort').del()
    .then(function () {
      // Inserts seed entries
      return knex('cohort').insert([
        {id: 1, name: "cohort 1"},
        {id: 2, name: "cohort 2"},
        {id: 3, name: "cohort 3"}
      ]);
    });
};

