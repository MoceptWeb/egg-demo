'use strict';

const Controller = require('egg').Controller;
const exceljs = require('exceljs')

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'hi, egg';
  }
  async export() {

    const excelConfigs = [{
      sheet: 'sheet1',
      dataFormat: true,
      columns: [
        {
          header: 'Id',
          key: 'id',
          width: 10,
          style: {
            font: {
              name: 'Arial Black',
              color: 'red',
              family: 2,
              size: 14,
              bold: true
          }
          }
        },
        {
          header: 'Name',
          key: 'name',
          width: 32,
          style: {
            border: {
              top: {style:'double', color: {argb:'FF00FF00'}},
              left: {style:'double', color: {argb:'FF00FF00'}},
              bottom: {style:'double', color: {argb:'FF00FF00'}},
              right: {style:'double', color: {argb:'FF00FF00'}}
          }
          }
        },
       
        {
          header: 'D.O.B.',
          key: 'dob',
          width: 10,
          outlineLevel: 1
        }, {
          header: 'price2',
          key: 'price',
          width: 30,
          dataFormat: function(cell, row) {
            return cell / 100
          },
          style: {
            numFmt: '0.00'
          }
        }],
      data: [{ id: 13333333333, name: 'John Doe', dob: new Date(1970, 1, 1), price: 2222233344, pric2e: 2222233344 },
      { id: 1333333333333, name: 'John24 Doe', dob: new Date(1970, 1, 1),price: 2222274 }]
    }]
    await this._exportExcel(excelConfigs, 'sss3我')

  }
  /**
   * config = [{
   *   sheet: '',
   *   showColumns: true,
   *   dataFormat: true
   *   columns,
   *   data,
   * }]
   */
  // https://github.com/guyonroche/exceljs/blob/master/README.md

  async _exportExcel(configs, excelName) {
    var workbook = new exceljs.Workbook();
    configs.forEach(config => {
      var worksheet = workbook.addWorksheet(config.sheet);
      //   worksheet.columns = [
      //     { header: 'Id', key: 'id', width: 10 },
      //     { header: 'Name', key: 'name', width: 32 },
      //     { header: 'D.O.B.', key: 'dob', width: 10, outlineLevel: 1 }
      // ];

      worksheet.columns = config.columns

      config.data.forEach(item => {
        // if(item.dataFormat) {
        //   item.
        // }
        if(config.dataFormat) {
          config.columns.forEach(columnConfig => {
            if(columnConfig.dataFormat) {
              item[columnConfig.key] = columnConfig.dataFormat(item[columnConfig.key], item)
            }
          })
        }
        worksheet.addRow(item);
      })
      // worksheet.addRow({id: 13333333333, name: 'John Doe', dob: new Date(1970,1,1)});
      // worksheet.addRow({id: 2444444444, name: 'Jane Doe', dob: new Date(1965,1,7)});
      if (config.showColumns === false)
        worksheet.spliceRows(1, 1);
    });

    // worksheet.getRow(1).hidden = true
    let buffer = await workbook.xlsx.writeBuffer()
    // let buffer = nodeExcel.build([{name: "订单列表", data: excelConfig}]);
    this.ctx.set('Content-Type', 'application/octet-stream');
    // this.ctx.set("Content-Disposition", "attachment; filename=" + (+new Date()) + '.xlsx');
    this.ctx.attachment(excelName + '.xlsx')
    this.ctx.body = buffer;
  }
  /**
   *         var ws = wb.addWorksheet('Export');
        ws.getCell('A1').value = 7;
        ws.getCell('B1').value = 'Hello, World!';
        wb.xlsx.writeBuffer( {
                base64: true
            })
            .then( function (xls64) {
                // build anchor tag and attach file (works in chrome)
                var a = document.createElement("a");
                var data = new Blob([xls64], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });

                var url = URL.createObjectURL(data);
                a.href = url;
                a.download = "export.xlsx";
                document.body.appendChild(a);
                a.click();
                setTimeout(function() {
                        document.body.removeChild(a);
                        window.URL.revokeObjectURL(url);
                    },
                    0);
            })
            .catch(function(error) {
                console.log(error.message);
            });
   */
}

module.exports = HomeController;
