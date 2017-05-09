import { Component } from '@angular/core';
import { Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AccountService } from '../services/account-service';
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
import { Push, PushOptions, PushObject } from '@ionic-native/push';
import { LocalNotifications } from '@ionic-native/local-notifications';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;

  constructor(public platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private accountService: AccountService, private alertCtrl: AlertController, private push: Push, private localNotifications: LocalNotifications) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      statusBar.backgroundColorByHexString('#2B68CF');
      splashScreen.hide();
      this.initPushNotification();
      if (this.accountService.checkUserIsLoggedIn()) {
        this.rootPage = TabsPage;
      }

      else {
        this.rootPage = LoginPage;
      }
    });
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
