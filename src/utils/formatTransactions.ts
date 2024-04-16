import moment from "moment"

export const formatTransaction = (transaction: Array<any>): Array<any> => {
    let array: any = []
    const sorted = transaction.map(element => {
        const parsed = moment(`${element.transactionDay} ${element.transactionMonth}, ${element.transactionYear}`, "DD MMM, YYYY")
        return {
            date: parsed.format('YYYY-MM-DD'),
            item: {
                id: element.transactionId,
                title: element.historyTitle,
                type: 'bill',
                text: element.historyMessage,
                status: element.successful === true ? "success" : "failed"
            }
        }
    })
    for (let element of sorted) {
        const date = element.date;
        const items = sorted.map(element => {
            if (element.date === date) {
                return element.item
            }
        }).filter(element => element !== undefined)

        const hasBeenAdded = array.some((element: any) => element?.date === date)
        if (!hasBeenAdded) {
            array.push({
                date,
                items
            })
        }
    }
    return array
}