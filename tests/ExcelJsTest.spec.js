const excelJs = require('exceljs');
const { test, expect } = require('@playwright/test');
const path = require('path');
async function wrightExcelTest(searchText, replaceText, columnC, filePath) {


    const workbook = new excelJs.Workbook();
    await workbook.xlsx.readFile(filePath)
    const workSheet = workbook.getWorksheet('Sheet1')

    const output = await readExcelFile(workSheet, searchText)


    const exCell = workSheet.getCell(output.row, output.column + columnC.columnCange);
    exCell.value = replaceText
    await workbook.xlsx.writeFile(filePath)




}

async function readExcelFile(workSheet, searchText) {
    let output = { row: 1, column: 1 }
    workSheet.eachRow((row, rowNumber) => {

        row.eachCell((cell, cellNumber) => {
            if (cell.value === searchText) {
                output.row = rowNumber;
                output.column = cellNumber;

            }

        })
    })
    return output;
}

// wrightExcelTest("Apple",3001,{rowChange: 0, columnCange: 2},"downloads/ExcelText.xlsx")

test('Upload download and excelvalidation test', async ({ page }) => {

    await page.goto('https://rahulshettyacademy.com/upload-download-test/')
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Download' }).click();
    const download = await downloadPromise;
    const filePath = path.join('tests/downloads', await download.suggestedFilename());
    await download.saveAs(filePath);
    await wrightExcelTest("Apple", 3001, { rowChange: 0, columnCange: 2 }, filePath)
    await page.locator('#fileinput').click()
    await page.locator('#fileinput').setInputFiles(filePath)
    const phone = await page.getByText('Apple');
    const deservedPhone = await page.getByRole('row').filter({ has: phone });
    await expect(deservedPhone.locator('#cell-4-undefined')).toContainText('3001')
})