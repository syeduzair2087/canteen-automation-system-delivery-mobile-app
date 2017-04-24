import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from 'ionic-angular';
import { AngularFire, FirebaseAuthState } from 'angularfire2';

@Injectable()
export class AccountService {
    constructor(private angularFire: AngularFire, private loadingCtrl: LoadingController, private toastCtrl: ToastController) { }

    loginUser(email: string, password: string) {
        let loading = this.loadingCtrl.create({
            content: 'Authenticating...'
        });
        loading.present();
        return new Promise((res, rej) => {

            let clientSubscription = this.angularFire.database.list('/roles/delivery_boys/', {
                query: {
                    orderByChild: 'email',
                    equalTo: email
                }
            }).subscribe((client) => {
                if (client.length == 1) {
                    this.angularFire.auth.login({ email: email, password: password }).then((user: FirebaseAuthState) => {
                        localStorage.setItem('uid', user.uid);
                        this.toastCtrl.create({
                            message: 'Login successful!',
                            duration: 4500
                        }).present();
                        loading.dismiss();
                        res(user);
                        clientSubscription.unsubscribe();
                    }).catch((error) => {
                        this.toastCtrl.create({
                            message: 'Failed to login. Please try again.',
                            duration: 4500
                        }).present();
                        loading.dismiss();
                        rej(error);
                        clientSubscription.unsubscribe();
                    })
                }
                else {
                    this.toastCtrl.create({
                        message: 'Failed to login. Check your credentials and try again.',
                        duration: 4500
                    }).present();
                    loading.dismiss();
                    rej('User not found. Please check your credentials and try again');
                    clientSubscription.unsubscribe();
                }
            });
        })
    }

    logoutUser() {
        // let loading = this.loadingCtrl.create({
        //     content: 'Logging out...'
        // });
        // loading.present();
        return new Promise((res, rej) => {
            this.angularFire.auth.logout().then(() => {
                 localStorage.removeItem('uid');
                // this.toastCtrl.create({
                //     message: 'Logged out successfully!',
                //     duration: 4500
                // }).present();
                // loading.dismiss();
                res();
            }).catch((error) => {
                this.toastCtrl.create({
                    message: 'Failed to log out. Please try again later.',
                    duration: 4500
                }).present();
                // loading.dismiss();
                rej(error);
            })
        })
    }

    checkUserIsLoggedIn() {
        if (localStorage.getItem('uid')) {
            return true;
        }

        else return false;
    }
}