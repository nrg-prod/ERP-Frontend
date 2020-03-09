import { Component, OnInit } from "@angular/core";
import { User } from "../_models/index";
import { Router, ActivatedRoute } from "@angular/router";
import { AlertService } from "../_services/index";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  model: any = {};
  user: User;
  loading = false;
  passwordtype = "password";

  constructor(private router: Router, private alertService: AlertService) {}

  ngOnInit() {
    //document.getElementById('id01').style.display='block'";
    //document.getElementById('id01').style.display='block';

    this.model.currentusername = "";
    this.model.currentpassword = "";
  }

  login() {
    this.alertService.clear();
    let message = "Invalid User Name !";
    console.log("user name : password" +this.model.currentusername +
        this.model.currentpassword
    );
    localStorage.setItem("currentusername", this.model.currentusername);
    localStorage.setItem("currentpassword", this.model.currentpassword);

    if (this.model.currentusername !== "admin") {
      // this.alertService.info(message);
      // this.alertService.warn(message);
      // this.alertService.success(message);
      this.alertService.error(message);
      // this.alertService.success(message);
    } else {
      this.router.navigate(["/"]);
    }
  }

  forgetPassword() {}

  showPassword() {
    if (this.passwordtype == "text") {
      this.passwordtype = "password";
    }
    if (this.passwordtype == "password") {
      this.passwordtype = "text";
    }
    // var x = document.getElementById("myInput");
    //if (x.type === "password") {
    //  x.type = "text";
    //} else {
    //  x.type = "password";
    //}
  }
}
