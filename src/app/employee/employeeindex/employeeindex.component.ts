import { Component, OnInit } from '@angular/core';
import {Observable, Observer} from 'rxjs';

export interface ExampleTab {
  label: string;
  content: string;
}

@Component({
  selector: 'app-employeeindex',
  templateUrl: './employeeindex.component.html',
  styleUrls: ['./employeeindex.component.css']
})
export class EmployeeindexComponent implements OnInit {
  selectedTabIndex = 1;
  asyncTabs: Observable<ExampleTab[]>;
  ngOnInit() {

  }


  constructor() { 
   /* this.asyncTabs = new Observable((observer: Observer<ExampleTab[]>) => {
      setTimeout(() => {
        observer.next([ 
          {label: 'First', content: 'Content 1'},
          {label: 'Second', content: 'Content 2'},
          {label: 'Third', content: 'Content 3'},
        ]); 
      }, 1000);
    } );
*/

    

  }

  

 
  getTabIndex(tabName: string): number {

    switch (tabName) {
      case 'Add employee': return 0;
      case 'List employee': return 1;
      case 'Contract Employee': return 2;
      case 'Employee report': return 3;

      default: return -1; // return -1 if clicked text is not a tab label text
     }
    
    }


    tabClick(clickEvent: any) {

      // Get the index of clicked tab using the above function
      const clickedTabIndex = this.getTabIndex(clickEvent.toElement.innerText);
      
      // if click was not on a tab label, do nothing
      if (clickedTabIndex === -1) {
        return;
      }
      
      // if current tab is same as clicked tab, no need to change. 
      //Otherwise check whether editing is going on and decide
      
      if (!(this.selectedTabIndex === clickedTabIndex)) {

        if ( !((clickEvent.toElement.className).toString().includes('mat-tab-label')) ) {
      
          return;
          // if form is dirty, show a warning modal and don't change tab.
        }
        else {
      
          // if form is not dirty, change the tab
          this.selectedTabIndex = clickedTabIndex;
        }
      }
    }      


 

}
