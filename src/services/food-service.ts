import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { FoodItem } from '../models/food.model';

@Injectable()
export class FoodService {
    constructor(private angularFire: AngularFire) { }

    getFoodItemById(foodItemKey: string) {
        return new Promise((res, rej) => {
            this.angularFire.database.object('/food/' + foodItemKey).subscribe((data: FoodItem) => {
                res(data);
            })
        })
    }
}