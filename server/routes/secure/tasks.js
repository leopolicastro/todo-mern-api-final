const router = require('express').Router(),
  {
    createTask,
    getAllTasks,
    getSpecificTask,
    updateTask,
    deleteTask
  } = require('../../controllers/tasks');

router.post('/', createTask);

router.get('/:id', getSpecificTask);

router.get('/', getAllTasks);

router.patch('/:id', updateTask);

router.delete('/:id', deleteTask);

module.exports = router;
