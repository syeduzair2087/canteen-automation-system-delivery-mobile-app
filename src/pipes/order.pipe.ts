import { Pipe, PipeTransform } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2';
import { Order } from '../models/order.model';
import 'rxjs/add/operator/filter';

@Pipe({
    name: 'filterOrderByStatus'
})
export class OrderFilterByStatusPipe implements PipeTransform {
    transform(inputArray: FirebaseListObservable<Array<Order>>, filterString: string) {
        if (inputArray == null) {
            return null;
        }
        if (filterString == '' || filterString == null) {
            return inputArray;
        }

        return inputArray.filter((order: Order) => order.status.state == filterString);
    }
}