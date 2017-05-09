import { Component } from '@angular/core';
import { NavController, Platform, AlertController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { AccountService } from '../../services/account-service';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { LocalNotifications } from '@ionic-native/local-notifications';
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(public navCtrl: NavController, private accountService: AccountService, private alertCtrl: AlertController, private platform: Platform, private push: Push, private localNotifications: LocalNotifications) {

  }

  clickLogin(email: string, password: string) {
    this.accountService.loginUser(email, password).then((user: any) => {
      console.log(user.uid);
      this.initPushNotification();

      this.navCtrl.setRoot({ component: TabsPage }.component);
    }).catch(() => {});
  }

   
  initPushNotification() {
    if (!this.platform.is('cordova')) {
      console.log('Push notifications not initialized. Cordova is not available - Run in physical device');
      return;
    }

    const option: PushOptions = {
      android: {
        senderID: '490551661425',
      },
      ios: {
        alert: 'true',
        badge: 'false',
        sound: 'true'
      },
      windows: {}
    }

    const pushObject: PushObject = this.push.init(option);


    pushObject.on('registration').subscribe((data: any) => {
      console.log(data.registrationId);
      this.accountService.addNotificationToken(data.registrationId).then(() => {
      });
    })

    pushObject.on('notification').subscribe((data: any) => {
      console.log(data.message);

      if (data.additionalData.foreground) {
        this.alertCtrl.create({
          title: 'Canteen Automation',
          message: data.message,
          buttons: [{
            text: 'Ignore',
            role: 'cancel'
          },
          {
            text: 'OK',
            handler: () => {

            }
          }]
        }).present();
      } else {
        this.localNotifications.schedule({
          id: 1,
          text: 'Single ILocalNotification',
          led: 'fff000'
        });
      }
    });

    pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));

  }
}
