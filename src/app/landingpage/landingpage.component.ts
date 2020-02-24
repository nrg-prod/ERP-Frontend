import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.css']
})
export class LandingpageComponent implements OnInit {
  public menu1 = false;
  public notSelected=true;
  //private count=0;
  static showParent: any;
  constructor( private router: Router , public route: ActivatedRoute) { 
    //this.count=route.firstChild.children.length;
    
    route.url.subscribe(() => {
      console.log("test 1 -->"+route.firstChild.children.length);
      console.log("test 2 -->"+route.children.length);

     });
  }

  ngOnInit() {

    //localStorage.setItem("notSelected","true");
    //this.notSelected = true;

    //this.router.navigate(['/dashboard']);

    // this session needs to come from local storage...
    let session=2;
   
    // do this one
    /*
    if(localStorage.getItem("currentusername") !=null){
      this.router.navigate(['/landingpage']);
      this.menu1 = true;
    }
    else {
      this.menu1 = false;

      this.router.navigate(['/login']);
    }
   
    

    // Remove this one 
    if(session==1){
      this.menu1 = false;

      this.router.navigate(['/login']);

    }
    else {
      this.router.navigate(['/landingpage']);
      this.menu1 = true;

    } */
    //else  call the landing page
//     

  }

}
