import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from 'src/app/service/data.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  form: FormGroup;
  progress: number = 0;
  resMsg: string = '';
  warning:boolean=true;
  constructor(private fb: FormBuilder, private data: DataService) {
    this.form = this.fb.group({
      caption: [''],
      video: [null]
    })
  }
  ngOnInit(): void {
    
  }
  uploadFile(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({
      video: file
    });
    this.form.get('video').updateValueAndValidity()
  }
  
  uploadVideo() {
    if (this.form.value.caption != '')
      this.data.uploadVideos(this.form.value.caption, this.form.value.video)
        .subscribe((event: HttpEvent<any>) => {
          switch (event.type) {
            case HttpEventType.Sent:
              console.log("Request  has been made!");
              break;
            case HttpEventType.ResponseHeader:
              console.log('Response header has been received!');
              break;
            case HttpEventType.UploadProgress:
              this.progress = Math.round(event.loaded / event.total * 100);
              console.log(`Uploaded! ${this.progress}%`);
              break;
            case HttpEventType.Response:
              console.log('User successfully created!', event.body);
              this.resMsg = "successfully created!";
              this.warning=false;
              setTimeout(() => {
                this.progress = 0;
              }, 1500);
          }
        })
        else
        this.resMsg="Insert any video"
  }
}
