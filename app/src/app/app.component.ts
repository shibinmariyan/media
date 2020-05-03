import { Component, Inject } from '@angular/core';
import {MatDialogModule, MatDialog} from '@angular/material/dialog';
import { DataService } from './service/data.service';
import { AuthService } from './service/auth.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { DialogComponent } from './component/dialog/dialog.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  validtoken: boolean = false;
  userName: string = "userName";
  userImg: string = "./assets/img/avatar.png";
  constructor(private data: DataService, private auth: AuthService, private route: Router,
     private location: Location,public dialog: MatDialog) {
    this.validtoken = sessionStorage.accessToken ? true : false;
  }

  ngOnInit(): void {
    this.validtoken = sessionStorage.accessToken ? true : false;
    if (!this.validtoken) {
      this.location.replaceState("/");
    }
    this.userName=sessionStorage.userName;
  }
  
  upload() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '65%'
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      console.log(confirmed)
    });
  }
  LogOut() {
    this.data.logout();
    location.reload();
    console.log("logout from header");
  }
}
