import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from 'ionic-angular';
import { AngularFire } from 'angularfire2';
import { Order } from '../models/order.model';

@Injectable()
export class OrderService {
    constructor(private angularFire: AngularFire, private loadingCtrl: LoadingController, private toastCtrl: ToastController) { }

    getOrders() {
        // this.angularFire.database.list('/orders/'
        //     , {
        //         query: {
        //             orderByChild: 'status/staffMemberId',
        //             equalTo: localStorage.getItem('uid')
        //         }
        //     }
        // ).subscribe((data) => console.log(data));

        return this.angularFire.database.list('/orders/', {
            query: {
                orderByChild: 'status/staffMemberId',
                equalTo: localStorage.getItem('uid')
            }
        })
    }

    fetchOrderDetails(key) {
        let loading = this.loadingCtrl.create({
            content: 'Loading order items...',
            dismissOnPageChange: true
        });
        loading.present();
        return new Promise((res, rej) => {
            this.angularFire.database.object('/orders/' + key).subscribe((data: Order) => {
                loading.dismiss().catch(() => { });
                res(data);
            });
        });
    }

    getJobCount() {
        return new Promise((res, rej) => {
            let countSubscription = this.angularFire.database.object('/roles/delivery_boys/' + localStorage.getItem('uid')).subscribe((data) => {
                res(data);
                countSubscription.unsubscribe();
            })
        })
    }

    updateOrderStatus(orderId: string, status: string) {
        let loading = this.loadingCtrl.create({
            content: 'Updating order...'
        });
        loading.present();
        return new Promise((res, rej) => {
            this.angularFire.database.object('/orders/' + orderId + '/status').update({
                state: status
            }).then(() => {
                if (status == "Order Delivered") {
                    this.getJobCount().then((count: number) => {
                        this.angularFire.database.object('roles/delivery_boys/' + localStorage.getItem('uid')).update({
                            job_count: <number>count - 1
                        }).then(() => {
                            res();
                        }).catch(() => {
                            rej();
                        });
                    })
                }
                this.toastCtrl.create({
                    message: 'Order updated.',
                    duration: 4500
                }).present().then(() => loading.dismiss());
                res();
            }).catch(() => {
                loading.dismiss().then(() => rej());
            });
        })
    }
}