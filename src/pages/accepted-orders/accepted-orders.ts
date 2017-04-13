import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { OrderService } from '../../services/order-service';
import { ReversePipe } from '../../pipes/reverse.pipe';
import { OrderFilterByStatusPipe } from '../../pipes/order.pipe';
import { OrderDetailsPage } from '../order-details/order-details';

@Component({
  selector: 'page-accepted-orders',
  templateUrl: 'accepted-orders.html'
})
export class AcceptedOrdersPage {
  orderList: any;

  constructor(public navCtrl: NavController, private orderService: OrderService) { }

  ngOnInit() {
    this.orderList = this.orderService.getOrders();
  }

  clickOrder(orderId: string) {
    this.navCtrl.push(OrderDetailsPage, {
      orderKey: orderId
    });
  }
}
