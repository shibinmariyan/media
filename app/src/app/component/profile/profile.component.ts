import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import { MatDialog } from '@angular/material/dialog';
import { ImgdialogComponent } from '../imgdialog/imgdialog.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userFullName: any;
  email: any; joiningDate: any;
  roleType: any;
  noOfVideos: any;
  vdos: Array<any>;
  firstName: any;
  lastName: any;
  noData: boolean = true;
  constructor(private route: Router, private data: DataService,
    public dialog: MatDialog) {
    this.userFullName = sessionStorage.userName
    if (!sessionStorage.accessToken)
      this.route.navigate(['/home'])
  }
  ngAfterViewInit() {
    if (sessionStorage.accessToken || sessionStorage.accessToken != '')
      this.getDetails()
  }
  ngOnInit(): void {
  }
  getDetails() {
    this.data.getProfile()
      .subscribe((data: any) => {
        this.userFullName = data.output.firstName + " " + data.output.lastName;
        this.firstName = data.output.firstName;
        this.lastName = data.output.lastName;
        this.email = data.output.email;
        this.joiningDate = data.output.joiningDate;
        this.noOfVideos = data.output.noOfVideos;
        this.roleType = "user";
      })
    this.data.getVideos()
      .subscribe((data: any) => {
        console.log(data);
        this.noData = (data.status!=200 || data.output.length === 0) ? true : false
        this.vdos= data.output;
      })
  }
  selectImg(){
    const dialogRef = this.dialog.open(ImgdialogComponent, {
      width: '65%'
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      console.log(confirmed)
    });
    
  }
  profileimage(){
    // this.data.uploadVideos(this.form.value.img)

  }

}
