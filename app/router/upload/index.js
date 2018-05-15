'use strict';

module.exports = app => {
  app.router.get('/upload', app.controller.upload.home.render);

  app.router.get('/upload/ajax', app.controller.upload.ajax.show);
  app.router.post('/upload/ajax', app.controller.upload.ajax.upload);

  app.router.get('/upload/form', app.controller.upload.form.show);
  app.router.post('/upload/form', app.controller.upload.form.upload);

  app.router.get('/upload/multiple-file', app.controller.upload.multiple.show);
  app.router.post('/upload/multiple-file', app.controller.upload.multiple.upload);

  app.router.get('/upload/buffer', app.controller.upload.buffer.show);
  app.router.post('/upload/buffer', app.controller.upload.buffer.upload);
};
