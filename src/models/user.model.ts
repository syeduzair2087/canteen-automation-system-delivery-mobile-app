export interface User {
    name: string,
    email: string,
    contact: string,
    cabin: number,
    password?: string,
    imageURL?: string,
    $key?: string
}