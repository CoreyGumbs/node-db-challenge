const express =  require('express');
const db = require('../data/db-config');
const router = express.Router();

// get all projects
router.get('/projects', (req, res) => {
    db('projects')
    .then(projects => {
        res.status(200).json(projects);
    })
    .catch(error => {
        res.status(500).json({error: `There was a problem getting all projects.`});
    })
});

//get all projects with details
router.get('/projects/full', (req, res) => {
    db('project_resources as pr')
    .join('projects as p', 'p.id', 'pr.project_id')
    .join('resources as r', 'r.id', 'pr.resource_id')
    .join('tasks as t', 't.project_id','p.id')
    .select(
        'pr.project_id as id',
        'p.project_name', 
        'p.project_description', 
        'p.completed as project_completed',
        't.task_name as tasks', 
        't.task_description', 
        't.note as notes', 
        't.completed as task_completed',
        'r.resource_name as resource',
    )
    .then(projects => {
        console.log(projects);
        res.status(200).json(projects);
    })
    .catch(error => {
        res.status(500).json({error: "There was a problem getting projects."});
    })
});

// get all projects by id
router.get('/projects/:id', (req, res) => {
    db('projects')
    .where({id: req.params.id})
    .then(projects => {
        res.status(200).json(projects);
    })
    .catch(error => {
        res.status(500).json({error: `There was a problem getting all projects.`});
    })
});

//get project by id
router.get('/projects/full/:id', (req, res) => {
    db('project_resources as pr')
    .join('projects as p', 'p.id', 'pr.project_id')
    .join('resources as r', 'r.id', 'pr.resource_id')
    .join('tasks as t', 't.project_id','p.id')
    .select(
        'p.project_name', 
        'p.project_description', 
        'p.completed as project_completed',
        't.task_name as tasks', 
        't.task_description', 
        't.note as notes', 
        't.completed as task_completed',
        'r.resource_name as resource', 
    )
    .where({'pr.project_id' : req.params.id})
    .then(project => {
        res.status(200).json(project);
    })
    .catch(error => {
        res.status(500).json({error: `There was a problem getting project id: ${req.params.id}.`});
    });
});

// get resources list
router.get('/resources', (req, res) => {
    db('resources as r')
    .select('r.resource_name', 'r.resource_description')
    .then(resources => {
        res.status(200).json(resources)
    })
    .catch(error => {
        res.status(500).json({error: `There was a problem getting the resources list`});
    });
});
//get specific resource
router.get('/resources/:id', (req, res) => {
    db('resources as r')
    .select('r.resource_name', 'r.resource_description')
    .where({id: req.params.id})
    .then(resources => {
        res.status(200).json(resources)
    })
    .catch(error => {
        res.status(500).json({error: `There was a problem getting the resources list`});
    });
});

//get all tasks 
router.get('/tasks', (req, res) => {
    db('tasks as t')
    .join('projects as p', 'p.id', 't.project_id')
    .select(
        'p.project_name', 
        'p.project_description',
        't.task_name',
        't.task_description',
        't.note',
        't.completed as task_completed'
    )
    .then(tasks => {
        res.status(200).json(tasks);
    })
    .catch(error => {
        res.status(500).json({error: `There was a problem getting the tasks list`});
    });
} );

//get task by id
router.get('/tasks/:id', (req, res) => {
    db('tasks')
    .where({id: req.params.id})
    .then(tasks => {
        res.status(200).json(tasks);
    })
    .catch(error => {
        res.status(500).json({error: `There was a problem getting the tasks list`});
    });
});

//get task by project
router.get('/projects/:project_id/tasks', (req, res) => {
    db('tasks as t')
    .join('projects as p', 'p.id', 't.project_id')
    .where({'t.project_id': req.params.project_id})
    .then(tasks => {
        res.status(200).json(tasks);
    })
    .catch(error => {
        res.status(500).json({error: `There was a problem getting the tasks list`});
    });
});

//Create Project
router.post('/projects', (req, res) => {
    db('projects')
    .insert(req.body)
    .then(project => {
        res.send(200).json(project);
    })
    .catch(error => {
        res.status(500).json({error: `There was a problem creating project.`});
    });
});

//create project task
router.post('/projects/:id/tasks', (req, res) => {
    const body = {
        'project_id': req.params.id,
        'task_name': req.body.task_name,
    }

    db('tasks')
    .insert(body)
    .then(task => {
        res.status(200).json(task);
    })
    .catch(error => {
        res.status(500).json({error: `There was a problem creating task.`});
    });
});

//add resource to resources list
router.post('/resources', (req, res) => {
   
    db('resources')
    .insert(req.body)
    .then(resource => {
        res.status(200).json(resource);
    })
    .catch(error => {
        res.status(500).json({error: `There was a problem creating resource.`});
    });
}); 

//add resource to project
router.post('/projects/:project_id/resources/:resource_id', (req, res) => {

    const body = {
        project_id: req.params.project_id,
        resource_id: req.params.resource_id
    }
  
    db('project_resources')
    .insert(body)
    .then(resource => {
        res.status(200).json(resource);
    })
    .catch(error => {
        res.status(500).json({error: `There was a problem creating project resource.`});
    });
})


module.exports = router;