'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'hi, egg';
  }
  async test() {
    this.app.logger.info('AA');
    this.ctx.body = {
      success: 1,
    };
  }
}

module.exports = HomeController;
