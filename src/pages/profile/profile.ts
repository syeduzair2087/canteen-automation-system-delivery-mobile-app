import { Component } from '@angular/core';
import { NavController, AlertController, ActionSheetController } from 'ionic-angular';
import { StaffMember } from '../../models/staff-member.model'
import { AccountService } from '../../services/account-service';
@Component({
    selector: 'page-profile',
    templateUrl: 'profile.html'
})
export class ProfilePage {
    staffMember: StaffMember = {
        name: '',
        email: '',
        contact: '',
        address: '',
        imageURL: '',
        cnic: '',
        $key: '',
        status: ''
    }
    constructor(private navCtrl: NavController, private accountService: AccountService, private alertCtrl: AlertController, private actionCtrl: ActionSheetController) { }

    ngOnInit() {
        this.loadUserData();
    }



  clickName() {
    this.alertCtrl.create({
      subTitle: 'Enter new name',
      inputs: [
        {
          name: 'txtNewName',
          value: this.staffMember.name
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Ok',
          handler: (data) => {
            this.accountService.updateInfo(data.txtNewName, this.staffMember.imageURL).then(() => {
              this.loadUserData();
            })
          }
        }
      ]
    }).present();
  }

  clickEmail() {
    this.alertCtrl.create({
      subTitle: 'Enter new email',
      inputs: [
        {
          name: 'txtEmail',
          value: this.staffMember.email
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Ok',
          handler: (data) => {
            this.accountService.updateEmail(data.txtEmail).then(() => {
              this.loadUserData();
            })
          }
        }
      ]
    }).present();
  }

  clickCinc() {
    this.alertCtrl.create({
      subTitle: 'Enter new name',
      inputs: [
        {
          name: 'txtNewCnic',
          value: this.staffMember.cnic
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Ok',
          handler: (data) => {
            this.accountService.updateCnic(data.txtNewCnic).then(() => {
              this.loadUserData();
            })
          }
        }
      ]
    }).present();
  }

  clickAddress() {
    this.alertCtrl.create({
      subTitle: 'Enter new name',
      inputs: [
        {
          name: 'txtNewAddress',
          value: this.staffMember.address
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Ok',
          handler: (data) => {
            this.accountService.updateAddress(data.txtNewAddress).then(() => {
              this.loadUserData();
            })
          }
        }
      ]
    }).present();
  }

  clickContact() {
    this.alertCtrl.create({
      subTitle: 'Enter new name',
      inputs: [
        {
          name: 'txtNewContact',
          value: this.staffMember.contact
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Ok',
          handler: (data) => {
            this.accountService.updateContact(data.txtNewContact).then(() => {
              this.loadUserData();
            })
          }
        }
      ]
    }).present();
  }

  loadUserData() {
    this.accountService.getUserData().then((data: StaffMember) => {
      this.staffMember = data;
    }).catch((error) => {
      console.log(error);
    });
  }
}