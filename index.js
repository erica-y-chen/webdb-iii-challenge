const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const knexConfig = require('./knexfile');
  const db = knex(knexConfig.development);

  const server = express();

  server.use(express.json());
  server.use(helmet());

    console.log("hi")
    
//   server.get('/api/cohorts', async(req, res) => {
//     console.log("hello")
//     try {
//         const cohorts = await db('cohort');
//         res.status(200).json(cohorts);
//     } catch (error) {
//         res.status(500).json(error);
//     }
// });

server.get('/api/students', async(req, res) => {

    try {
        const students = await db('students');
        res.status(200).json(students);
    } catch (error) {
        res.status(400).json(error);
    }
});

server.get('/api/cohort', (req, res)=> {
    db('cohort')
    .then(results=>{
        res.status(200).json(results);
    })
    .catch(err=>{
        res.status(500)
    })
})

server.post('/api/students', (req, res) => {
    db('students')
    .insert(req.body, 'id')
    .then(results => {
        res.status(200).json(results);
    })
    .catch(err=>{
        res.status(500).json(err);
    })
  });


server.get('/api/cohort/:id', async(req, res)=> {
    
    try{
        const cohort = await db('cohort')
            .where({ id: req.params.id })
            .first();
        res.status(200).json(cohort);
    } catch (error) {
        res.status(500).json(error);
    }
})

server.delete('/api/cohort/:id', async(req, res) => {
    try{
        const count = await db('cohort')
            .where({ id: req.params.id })
            .del();
        
        if (count > 0) {
            res.status(204).end();
        } else { 
            res.status(404).json({ message: 'Records not found'});
        }
    } catch(error) {}
})

server.put('/api/cohort/:id', async(req, res) => {
    try {
        const count = await db('cohort')
            .where({ id: req.params.id })
            .update(req.body);

        if (count > 0) {
            const cohort = await db('cohort')
            .where({ id: req.params.id })
            .first(); 

            res.status(200).json(role);
        } else {
            res.status(404).json({ message: 'Records not found '});
        }
    } catch (error) {}
});
  


const port = 5000;
server.listen(port, () =>
  console.log(`\n** API running on http://localhost:${port} **\n`)
);
