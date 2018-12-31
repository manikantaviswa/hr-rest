let router = require('express').Router();
let employeeRepo = require('../employee/employee.repo');

router.get('/', employeeRepo.search);

router.get('/:id', employeeRepo.get);

router.post(['/', '/:id'], employeeRepo.save);

router.delete('/:id', employeeRepo.delete);

router.post('/upload/:id', employeeRepo.uploadPhoto);

router.get('/photo/:id', employeeRepo.getPhoto);

module.exports = router;
