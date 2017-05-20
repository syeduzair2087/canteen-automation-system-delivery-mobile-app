import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { ReversePipe } from '../pipes/reverse.pipe';
import { OrderFilterByStatusPipe } from '../pipes/order.pipe';

import { LoginPage } from '../pages/login/login';
import { AcceptedOrdersPage } from '../pages/accepted-orders/accepted-orders';
import { PendingOrdersPage } from '../pages/pending-orders/pending-orders';
import { TabsPage } from '../pages/tabs/tabs';
import { OrderDetailsPage } from '../pages/order-details/order-details';
import { OrderPrefsPage } from '../pages/order-prefs/order-prefs';
import { ProfilePage } from '../pages/profile/profile';

import { AccountService } from '../services/account-service';
import { OrderService } from '../services/order-service';
import { FoodService } from '../services/food-service';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Push } from '@ionic-native/push';
import { LocalNotifications } from '@ionic-native/local-notifications';

import { AngularFireModule, AuthMethods, AuthProviders } from 'angularfire2';

export const firebaseConfig = {
  apiKey: "AIzaSyCL9zQkpCE5Hfv15Lb_O6Ih98KFchCG0Ok",
  authDomain: "canteenautomationsystem.firebaseapp.com",
  databaseURL: "https://canteenautomationsystem.firebaseio.com",
  storageBucket: "canteenautomationsystem.appspot.com",
  messagingSenderId: "490551661425"
};

export const firebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password,
};


@NgModule({
  declarations: [
    MyApp,
    AcceptedOrdersPage,
    LoginPage,
    PendingOrdersPage,
    OrderDetailsPage,
    OrderPrefsPage,
    TabsPage,
    OrderFilterByStatusPipe,
    ReversePipe,
    ProfilePage
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule.forRoot(MyApp, {
      scrollAssist: false,
      autoFocusAssist: false
    }),
    AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AcceptedOrdersPage,
    LoginPage,
    PendingOrdersPage,
    TabsPage,
    OrderDetailsPage,
    OrderPrefsPage,
    ProfilePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Push,
    LocalNotifications,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AccountService,
    OrderService,
    FoodService
  ]
})
export class AppModule { }
