module.exports.chartConfig = (data) => {
    // console.log(data)
    let result = {
        chart: {
            type: "bar",
            height: 150,
        },
        legend: {
            show: false
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: "55%",
                endingShape: "rounded",
            },
        },
        xaxis: {
            categories: [data.category],
        },
        fill: {
            colors: ["#FFA500", "#0000FF", "#006400"],
            opacity: 1,
        }
    }


    return result
}

module.exports.quarterConfig = (data, id) => {

    let cfg = []

    if (id == 0) {
        cfg = [
            {
                name: "Лідів згенеровано",
                data: [data[3].leads.quarters.first],
            },
            {
                name: "Договорів укладено",
                data: [data[3].deals.quarters.first],
            },
            {
                name: "Угод виграно",
                data: [data[3].deals.quarters.won.first],
            }
        ]
    }

    if (id == 1) {
        cfg = [
            {
                name: "Лідів згенеровано",
                data: [data[3].leads.quarters.second],
            },
            {
                name: "Договорів укладено",
                data: [data[3].deals.quarters.second],
            },
            {
                name: "Угод виграно",
                data: [data[3].deals.quarters.won.second],
            }
        ]
    }

    if (id == 2) {
        cfg = [
            {
                name: "Лідів згенеровано",
                data: [data[3].leads.quarters.third],
            },
            {
                name: "Договорів укладено",
                data: [data[3].deals.quarters.third],
            },
            {
                name: "Угод виграно",
                data: [data[3].deals.quarters.won.third],
            }
        ]
    }

    if (id == 3) {
        cfg = [
            {
                name: "Лідів згенеровано",
                data: [data[3].leads.quarters.fourth],
            },
            {
                name: "Договорів укладено",
                data: [data[3].deals.quarters.fourth],
            },
            {
                name: "Угод виграно",
                data: [data[3].deals.quarters.won.fourth],
            }
        ]
    }

    return cfg;
}

// Work with state

module.exports.filterDataByDate = (params) => {

    let out = {
        array: [],
        length: 0
    }
    params.data.filter(item => {
        let from = new Date(params.date.from)
        let to = new Date(params.date.to)
        let date = new Date(item.DATE_CLOSED)

        let cond = from >= date && date <= to

        if (!cond) {
            out.array.push(item)
            out.length = out.array.length
        }
    })
    return out
}

module.exports.filterDataByDateAndUserId = (params, id) => {
    let out = {
        array: [],
        length: 0
    }

    let sum = 0

    params.data.filter(item=>{
        let from = new Date(params.date.from)
        let to = new Date(params.date.to)
        let date = new Date(item.DATE_CLOSED)

        let income = params.mode.income
        let won = params.mode.won == true && item.STAGE_ID == "WON"
        let cond = from >= date && date <= to
        let user = parseInt(item.ASSIGNED_BY_ID) === id
        
        if(!income && user && !cond && won){
            sum = ++sum
        }

        if(income && user && !cond && !won){
            sum += parseFloat(item.OPPORTUNITY)
        }

        if (!cond && user && !income && !won) {
            out.array.push(item)
            out.length = out.array.length
        }
    })

    if(sum > 0){
        return sum
    }
    else{
        return out
    }

}