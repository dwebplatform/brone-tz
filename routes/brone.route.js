module.exports = (app) => {
  const router = require('express').Router();
  const broneContoller = require('../controller/brone.controller');
  router.get('/', broneContoller.getAllBrones);
  router.post('/create', broneContoller.createBrone);
  router.post('/cancel', broneContoller.cancelBrone);
  router.post('/dump', broneContoller.dumpUsersAndRooms);
  app.use('/brones', router);
}