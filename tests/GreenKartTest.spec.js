const {test,expect} = require('@playwright/test')


test('Green Kart Test Date pickers', async ({page})=>{
    const monthNumber = '12';
    const date = '24';
    const year = '2027';

    const expectedDate = [monthNumber, date, year];

    await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/offers');

    await page.locator('div.react-date-picker__inputGroup').waitFor();
    await page.locator('div.react-date-picker__inputGroup').click();
    await page.locator('button.react-calendar__navigation__label').click();
    await page.locator('button.react-calendar__navigation__label').click()
    await page.locator('button.react-calendar__tile.react-calendar__decade-view__years__year').getByText(year).click()
    await page.locator('button.react-calendar__tile.react-calendar__year-view__months__month').nth(Number(monthNumber)-1).click();
    await page.locator('button.react-calendar__tile.react-calendar__month-view__days__day:not(.react-calendar__month-view__days__day--neighboringMonth)').getByText(date).click();

    // console.log(await page.locator('div.react-date-picker__inputGroup').textContent());
    const actualMonth = await page.locator('input[name="month"]').getAttribute('value');
    const actualDay = await page.locator('input[name="day"]').getAttribute('value');
    const actualYear = await page.locator('input[name="year"]').getAttribute('value');

    const actualDelivaryDate = await page.locator('input[name="month"]').getAttribute('value')+' / '+await page.locator('input[name="day"]').getAttribute('value')+' / '+await page.locator('input[name="year"]').getAttribute('value');
     console.log('Actual Delivary Date: '+actualDelivaryDate)


expect(await page.locator('input[name="month"]').getAttribute('value')+' / '+await page.locator('input[name="day"]').getAttribute('value')+' / '+await page.locator('input[name="year"]').getAttribute('value')).toEqual(monthNumber+' / '+date+' / '+year)

    const inputs = await page.locator('input.react-date-picker__inputGroup__input');

    for(let i =0; i < expectedDate.length; i++){
        const value = await inputs.nth(i).getAttribute('value');
        expect(value).toEqual(expectedDate[i]);
    }
})