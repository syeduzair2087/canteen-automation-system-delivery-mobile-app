import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FoodService } from '../../services/food-service';
import { OrderService } from '../../services/order-service';
import { Order } from '../../models/order.model';
import { BucketItem } from '../../models/bucketItem.model';
import { OrderPrefsPage } from '../../pages/order-prefs/order-prefs';
// import { OrderPrefsPage } from '../order-prefs/order-prefs'

/*
  Generated class for the OrderDetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-order-details',
  templateUrl: 'order-details.html'
})
export class OrderDetailsPage {
  selectedOrder: Order = {
    userId: '',
    orderTime: '',
    status: {
      state: ''
    },
    amount: 0,
    items: []
  };
  constructor(public navCtrl: NavController, public navParams: NavParams, private foodService: FoodService, private orderService: OrderService) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderDetailsPage');
    let orderKey = this.navParams.get('orderKey');
    console.log(orderKey);
    this.orderService.fetchOrderDetails(orderKey).then((data: Order) => {
      console.log(data);
      this.selectedOrder = data;
      // console.log(this.OrderDetail);
      // console.log(this.selectedOrder.amount);
    }).catch(() => { });
  }

  clickItem(selectedItem: BucketItem) {
    // this.foodService.getFoodItemById(selectedItem.foodId).then((data) => {
    //   // console.log(selectedItem);
    //   this.navCtrl.push(OrderPrefsPage, {
    //     item: selectedItem,
    //     itemKey: selectedItem.foodId
    //   })
    // })

    this.foodService.getFoodItemById(selectedItem.foodId).then((data) => {
      // console.log(data);
      this.navCtrl.push(OrderPrefsPage, {
        foodItem: data,
        item: selectedItem,
        itemKey: selectedItem.$key
      })
    });
  }

  clickAccept(order: Order) {
    if (order.status.state == 'Assigned to Delivery Boy') {
      this.orderService.updateOrderStatus(order.$key, 'Received by Delivery Boy').then(() => {
        this.navCtrl.pop();
      }).catch(() => { });
    }

    if (order.status.state == 'Received by Delivery Boy') {
      this.orderService.updateOrderStatus(order.$key, 'Order Delivered').then(() => {
        this.navCtrl.pop();
      }).catch(() => { });
    }
  }
}
