'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/test', controller.home.test);
  router.post('/test', controller.home.test);
  router.get('/', controller.home.index);
  router.get('/excel', controller.excel.export);


  require('./router/upload')(app);
};
