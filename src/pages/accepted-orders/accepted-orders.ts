import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import { OrderService } from '../../services/order-service';
import { AccountService } from '../../services/account-service';
import { ReversePipe } from '../../pipes/reverse.pipe';
import { OrderFilterByStatusPipe } from '../../pipes/order.pipe';
import { OrderDetailsPage } from '../order-details/order-details';
import { LoginPage } from '../login/login';
import { ProfilePage } from '../profile/profile'
import { Subscription } from 'rxjs';

@Component({
  selector: 'page-accepted-orders',
  templateUrl: 'accepted-orders.html'
})
export class AcceptedOrdersPage {
  orderList: any;
  orderSubscription: Subscription
  constructor(public navCtrl: NavController, private orderService: OrderService, private app: App, private accountService: AccountService) { }

  ngOnInit() {
    this.loadOrderData();
  }

  clickOrder(orderId: string) {
    this.navCtrl.push(OrderDetailsPage, {
      orderKey: orderId
    });
  }

  clickLogout() {
    this.orderSubscription.unsubscribe();
    this.accountService.logoutUser().then(() => {
      this.app.getRootNav().setRoot(LoginPage);
    }).catch((error) => {
      this.loadOrderData();
      console.log(error);
    })
  }

  ionViewDidLeave() {    
    this.orderSubscription.unsubscribe();
  }

  clickProfile() {
    this.navCtrl.push(ProfilePage);
  }

  loadOrderData() {
    this.orderSubscription = this.orderService.getOrders().subscribe((orderData) => {
      this.orderList = orderData
    })
  }

}
