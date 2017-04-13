import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FoodItem } from '../../models/food.model';
import { FoodPreference } from '../../models/preference.model';
import { BucketItem } from '../../models/bucketItem.model';
// import { BucketService } from '../../services/bucket-service';

/*
  Generated class for the OrderPrefs page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-order-prefs',
  templateUrl: 'order-prefs.html'
})
export class OrderPrefsPage {
  selectedFoodItem = {
    singlePrefs: [],
    binaryPrefs: [],
    multiPrefs: []
  };
  selectedKey: string = '';
  itemQuantity: number = 1;

  binaryPrefs: Array<FoodPreference> = [];
  singlePrefs: Array<FoodPreference> = [];
  multiPrefs: Array<FoodPreference> = [];

  binaryPrefSelect: Array<any> = [];
  singlePrefSelect: Array<any> = [];
  multiPrefSelect: Array<any> = [];

  orderPrefs: Array<any> = []
  constructor(public navCtrl: NavController, public navParams: NavParams) { }



  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderPrefsPage');

    this.selectedFoodItem = this.navParams.get('item');
    console.log(this.selectedFoodItem);
    // this.selectedFoodItem = this.navParams.get('foodItem');
    // this.selectedFoodItem.food_prefs.forEach((pref: FoodPreference, index) => {
    //   if (pref.pref_type === 'Single Value') {
    //     this.singlePrefs.push(pref);
    //     this.singlePrefSelect.push({ title: pref.pref_title, value: '' });
    //   }
    //   else if (pref.pref_type === 'Multi Value') {
    //     this.multiPrefs.push(pref);
    //     this.multiPrefSelect.push({ title: pref.pref_title, values: [] });
    //     pref.pref_values.forEach((value => {
    //       this.multiPrefSelect[this.multiPrefSelect.length - 1].values.push({ title: value, value: false });
    //     }))

    //   }
    //   else if (pref.pref_type === 'Binary') {
    //     this.binaryPrefs.push(pref);
    //     this.binaryPrefSelect.push({ title: pref.pref_title, value: false });
    //   }

    //   if (index == (this.selectedFoodItem.food_prefs.length - 1)) {
    //     let selectedBucketItem: BucketItem = this.navParams.get('bucketItem');
    //     if (selectedBucketItem) {
    //       if (selectedBucketItem.binaryPrefs) {
    //         this.binaryPrefSelect = selectedBucketItem.binaryPrefs;
    //       }

    //       if (selectedBucketItem.singlePrefs) {
    //         this.singlePrefSelect = selectedBucketItem.singlePrefs;
    //       }

    //       if (selectedBucketItem.multiPrefs) {
    //         this.multiPrefSelect = selectedBucketItem.multiPrefs;
    //       }

    //       this.itemQuantity = selectedBucketItem.quantity;
    //       this.selectedKey = this.navParams.get('itemKey');
    //     }
    //   }
    // })
  }
}
