import { Component } from '@angular/core';

import { AcceptedOrdersPage } from '../accepted-orders/accepted-orders';
import { PendingOrdersPage } from '../pending-orders/pending-orders';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = PendingOrdersPage;
  tab2Root = AcceptedOrdersPage;

  constructor() {

  }
}
