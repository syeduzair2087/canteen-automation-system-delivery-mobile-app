export interface BucketItem {
    foodId: string,
    title: string,
    quantity: number,
    amount: number,
    binaryPrefs?: Array<{title: string, value: boolean}>,
    singlePrefs?: Array<{title: string, value: string}>,
    multiPrefs?: Array<{title: string, values: Array<{title: string, value: boolean}>}>,
    $key?: string
}