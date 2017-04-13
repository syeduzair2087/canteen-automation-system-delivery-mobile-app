import { FoodPreference } from './preference.model'

export interface FoodItem{
    $key?: string,
    food_title: string,
    food_price: number,
    food_prefs?: Array<FoodPreference>
}