const data = [
    { price_per_day: 2, from: "2020-01-01", to: "2020-01-04", added: "2019-06-01" },
    { price_per_day: 60, from: "2020-01-03", to: "2020-01-08", added: "2019-06-02" },
    { price_per_day: 15, from: "2020-01-05", to: "2020-01-06", added: "2019-06-01" },
    { price_per_day: 150, from: "2020-01-08", to: "2020-01-15", added: "2019-06-15" },
]

function sortData() {
    const priceByDate = new Map()
    data.forEach(record => {
        let currentDate = record.from
        while (currentDate <= record.to) {
            if (!priceByDate.has(currentDate) || record.added > priceByDate.get(currentDate).lastUpdate) {
                priceByDate.set(currentDate, {price: record.price_per_day, lastUpdate: record.added})
            }
            let nextDate = new Date(currentDate)
            nextDate.setDate(nextDate.getDate() + 1)
            currentDate = new Date(nextDate).toISOString().split('T')[0]
        }
    })
    return priceByDate;
}

function getDates(from, to) {
    console.log((Date.parse(to) - Date.parse(from))/86400000);
}

export function calcRent(fromDate, toDate) {
    let priceByDate = sortData()
    // console.log(priceByDate);

    let defaultRent = 5
    let totalPrice = 0
    let currentDate = fromDate
    while (currentDate < toDate) {
        console.log(currentDate, typeof currentDate);
        if (priceByDate.has(currentDate)) totalPrice += priceByDate.get(currentDate).price
        else totalPrice += defaultRent
        // priceByDate.has(currentDate) ? totalPrice += priceByDate.get(currentDate).price : totalPrice += defaultRent
        let nextDate = new Date(currentDate)
        nextDate.setDate(nextDate.getDate() + 1)
        currentDate = new Date(nextDate).toISOString().split('T')[0]
    }
    console.log(totalPrice)
}

export function todayDate() {
    return new Date().toISOString().split('T')[0]
}