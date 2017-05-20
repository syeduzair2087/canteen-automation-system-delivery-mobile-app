import { Injectable, Inject } from '@angular/core';
import { LoadingController, ToastController } from 'ionic-angular';
import { AngularFire, FirebaseAuthState, FirebaseApp } from 'angularfire2';
import { StaffMember } from '../models/staff-member.model';

@Injectable()
export class AccountService {
    firebaseApp: any;
    constructor(private angularFire: AngularFire, private loadingCtrl: LoadingController, private toastCtrl: ToastController, @Inject(FirebaseApp) firebaseApp: any) {
        this.firebaseApp = firebaseApp;
     }

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

    getUserData() {
        return new Promise((res, rej) => {
            let loading = this.loadingCtrl.create({
                content: 'Loading information...'
            });
            loading.present();

            let currentUser = this.angularFire.auth;
            let clientAuthSubscription = currentUser.subscribe((data: FirebaseAuthState) => {
                if (data) {
                    let clientDataSubscription = this.angularFire.database.object('roles/delivery_boys/' + localStorage.getItem('uid')).subscribe((chefData: any) => {
                        let staffMember: StaffMember = {
                            name: data.auth.displayName,
                            email: data.auth.email,
                            cnic: chefData.cnic,
                            address: chefData.address,
                            contact: chefData.contact,
                            imageURL: data.auth.photoURL,
                            status: chefData.status
                        }
                        loading.dismiss();
                        res(staffMember);
                        clientDataSubscription.unsubscribe();
                        clientAuthSubscription.unsubscribe();
                    })
                } else {
                    loading.dismiss();
                    rej("Error while fetching user data!");
                    clientAuthSubscription.unsubscribe();
                }
            })
        }).catch((error) => {
            this.toastCtrl.create({
                message: error.message,
                duration: 4500
            }).present();
        })
    }

   updateInfo(displayName: string, imageUrl: string) {
        return new Promise((res, rej) => {
            let loading = this.loadingCtrl.create({
                content: 'Updating Information...'
            });
            loading.present();
            this.angularFire.auth.subscribe((user: FirebaseAuthState) => {
                user.auth.updateProfile({
                    displayName: displayName,
                    photoURL: imageUrl
                }).then(() => {
                    this.angularFire.database.object('roles/delivery_boys/' + localStorage.getItem('uid')).update({
                        name: displayName
                    }).then(() => {
                        this.toastCtrl.create({
                            message: 'Information updated successfully!',
                            duration: 4500
                        }).present();
                        loading.dismiss();
                        res()
                    }).catch((error => {
                        this.toastCtrl.create({
                            message: error.message,
                            duration: 4500
                        }).present();
                        loading.dismiss();
                        rej(error.message);
                    }))
                }).catch((error) => {
                    this.toastCtrl.create({
                        message: error.message,
                        duration: 4500
                    }).present();
                    loading.dismiss();
                    rej(error.message);
                })
            })
        })
    }

    updateContact(contact: string) {
        return new Promise((res, rej) => {
            let loading = this.loadingCtrl.create({
                content: 'UPdating contact number...'
            });
            loading.present();
            this.angularFire.database.object('roles/delivery_boys/' + localStorage.getItem('uid')).update({
                contact: contact
            }).then(() => {
                this.toastCtrl.create({
                    message: 'Contact updated successfully!',
                    duration: 4500
                }).present();
                loading.dismiss();
                res()
            }).catch((error) => {
                this.toastCtrl.create({
                    message: error.message,
                    duration: 4500
                }).present();
                loading.dismiss();
                rej(error.message);
            });
        });
    }

    updateCnic(cnic: string) {
        return new Promise((res, rej) => {
            let loading = this.loadingCtrl.create({
                content: 'UPdating contact number...'
            });
            loading.present();
            this.angularFire.database.object('roles/delivery_boys/' + localStorage.getItem('uid')).update({
                cnic: cnic
            }).then(() => {
                this.toastCtrl.create({
                    message: 'Cnic updated successfully!',
                    duration: 4500
                }).present();
                loading.dismiss();
                res()
            }).catch((error) => {
                this.toastCtrl.create({
                    message: error.message,
                    duration: 4500
                }).present();
                loading.dismiss();
                rej(error.message);
            });
        });
    }

    updateEmail(email: string) {
        return new Promise((res, rej) => {
            let loading = this.loadingCtrl.create({
                content: 'Updating Information...'
            });
            loading.present();
            this.angularFire.auth.subscribe((user: FirebaseAuthState) => {
                user.auth.updateEmail(email).then(() => {
                    this.angularFire.database.object('roles/delivery_boys/' + localStorage.getItem('uid')).update({
                        email: email
                    }).then(() => {
                        this.toastCtrl.create({
                            message: 'Email updated successfully!',
                            duration: 4500
                        }).present();
                        loading.dismiss();
                        res()
                    }).catch((error => {
                        this.toastCtrl.create({
                            message: error.message,
                            duration: 4500
                        }).present();
                        loading.dismiss();
                        rej(error.message);
                    }))
                }).catch((error) => {
                    this.toastCtrl.create({
                        message: error.message,
                        duration: 4500
                    }).present();
                    loading.dismiss();
                    rej(error.message);
                })
            })
        })
    }


    updateAddress(address: string) {
        return new Promise((res, rej) => {
            let loading = this.loadingCtrl.create({
                content: 'UPdating contact number...'
            });
            loading.present();
            this.angularFire.database.object('roles/delivery_boys/' + localStorage.getItem('uid')).update({
                address: address
            }).then(() => {
                this.toastCtrl.create({
                    message: 'Address updated successfully!',
                    duration: 4500
                }).present();
                loading.dismiss();
                res();
            }).catch((error) => {
                this.toastCtrl.create({
                    message: error.message,
                    duration: 4500
                }).present();
                loading.dismiss();
                rej(error.message);
            });
        });
    }

    uploadImage(data) {
        return new Promise((res, rej) => {
            let loading = this.loadingCtrl.create({
                content: 'Uploading Image...'
            });
            loading.present();
            let uploadTask = this.firebaseApp.storage().ref('/profile_images/' + localStorage.getItem('uid')).putString(data, 'base64', { contentType: 'image/jpg' });
            uploadTask.on('state_changed', snapshot => {
            }, function (error) {
                loading.dismiss();
                rej(error.message);
            }, function () {
                var downloadURL = uploadTask.snapshot.downloadURL;
                loading.dismiss();
                res(downloadURL);
            });
        });
    }
    
    
    addNotificationToken(token: string) {
        return new Promise((res, rej) => {
                this.angularFire.database.object('notificationTokens/' + localStorage.getItem('uid') + '/id').set(token).then(() => {
                    console.log('Token added sucessfully!');
                    res('')
                }).catch((error) => {
                    console.log(error.message);
                    rej(error.message)
                })
            })
    }
    
}