import { mockData } from '../mock-db';

const defaultRent = 5;

export function todayDate() {
    // return date part from ISO date-time string
    return new Date().toISOString().split('T')[0];
}

export function initData() {
    // initiate data from local storage or database
    const localData = localStorage.getItem('data');
    return localData ? JSON.parse(localData) : mockData;
  }

export function calcRent(fromDate, toDate, priceByDateMap) {
    // calculate total rent for selected period
    let totalPrice = 0;
    let currentDate = fromDate;
    while (currentDate <= toDate) {
        totalPrice += priceByDateMap.has(currentDate) ? priceByDateMap.get(currentDate).price : defaultRent;
        currentDate = setNextDate(currentDate);
    }
    return totalPrice;
}

export function createPriceByDateMap() {
    // create Map object with daily prices for faster reference
    const priceByDateMap = new Map();
    const localData = initData();

    localData.forEach(record => {
        let currentDate = record.from;
        while (currentDate <= record.to) {
            if (!priceByDateMap.has(currentDate) || record.added > priceByDateMap.get(currentDate).lastUpdate) {
                priceByDateMap.set(currentDate, { price: record.price_per_day, lastUpdate: record.added });
            }
            currentDate = setNextDate(currentDate);
        }
    })
    return priceByDateMap;
}

function setNextDate(currentDate) {
    let nextDate = new Date(currentDate);
    // add 24 hours to current date 86400000 ms = 24h * 60m * 60s * 1000ms
    nextDate.setTime(nextDate.getTime() + 86400000);
    // return date part from ISO date-time string
    return new Date(nextDate).toISOString().split('T')[0];
}

