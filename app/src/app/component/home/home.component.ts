import { Component, Inject, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  videos: any;
  validvideos: boolean;
  errorMessage: any;
  loading: boolean;
  baseurl = window.location.protocol + "//" + window.location.hostname + ":3002/";
  playeractive:boolean=false;
  videoPath:string;
  constructor(private data: DataService, private auth: AuthService,private route:Router) { }
  ngOnInit(): void {
    this.getVideos();
  }
  getVideos() {
    this.data.getVideos()
      .subscribe((data: any) => {
        this.validvideos = (data.output.length > 0) ? true : false;
        data.output.forEach(async vdo => {
          vdo.path = this.baseurl + vdo.path;
        });
        this.videos = data.output
      },
        (error) => {                              //Error callback
          console.error('error caught in component')
          console.log("error", error)
          this.validvideos = false;
          //throw error;   //You can also throw the error to a global error handler
        }
      )
  }
  nvgte(path){
    this.playeractive=true;
    this.videoPath=path;
  }
}