'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'hi, egg';
  }
  async export() {
    this.ctx.body = 'hi, export';
  }
}

module.exports = HomeController;
