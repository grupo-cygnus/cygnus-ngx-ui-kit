import { ChangeDetectionStrategy, Component, input, OnInit, signal } from '@angular/core';
import { Tab } from 'ngx-cygnus-ui/interfaces';
import { RouterLink } from "@angular/router";
import { NgxCygnusIconsComponent } from '@cygnus/ngx-cygnus-icons';

@Component({
  selector: 'cygnus-tabs',
  imports: [
    RouterLink,
    NgxCygnusIconsComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './cygnus-tabs.component.html',

})
export class CygnusTabsComponent implements OnInit {
  tabsArr = input<Tab[]>([]);
  showIcon = input<boolean>(false);
  showTabInnerHTML = input<boolean>(false);
  tabInnerHTML = signal<string>('');

  currentTab = signal<number>(0);

  ngOnInit(): void {
    if (this.showTabInnerHTML()) {
      this.tabInnerHTML.set(this.tabsArr()[0]?.tabInnerHTML ? (this.tabsArr()[0]?.tabInnerHTML || '') : '');
    }
  }

  changeCurrentTab(index: number, innerHTML?: string) {
    this.currentTab.set(index);
    if (this.showTabInnerHTML()) {
      this.tabInnerHTML.set(innerHTML || '');
    }
  }

}
