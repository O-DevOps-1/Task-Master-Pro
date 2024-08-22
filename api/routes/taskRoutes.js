const express = require('express');
const {
  createTask,
  getTasks,
  updateTask,
  addAttachment,
} = require('../controllers/taskController');
const authMiddleware = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validate');
const taskValidation = require('../validations/taskValidation');
const router = express.Router();

router.use(authMiddleware); // authentication middleware
router.post('/', validate(taskValidation), createTask); // route to create a task
router.get('/', getTasks); // route to get all tasks
router.put('/:id', validate(taskValidation), updateTask);
router.post('/:id/attachments', addAttachment); // new route to add attachments

module.exports = router;
