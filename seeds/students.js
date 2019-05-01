
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {id: 1, cohorts_id: 1, name: 'student 1'},
        {id: 2, cohorts_id: 2, name: 'student 2'},
        {id: 3, cohorts_id: 3, name: 'student 3'}
      ]);
    });
};
