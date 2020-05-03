import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class DataService {
  APIList: any = {};
  baseurl = window.location.protocol + "//" + window.location.hostname;
  constructor(private http: HttpClient, private auth: AuthService) {
    let user = this.baseurl + ":3002/user/";
    let video = this.baseurl + ":3002/video/";
    this.APIList = {
      login: user + "login",
      sign: user + "sign",
      logout: user + "logout",
      get: user + "getUser",
      postprofile: user + "profileimage",
      getVideo: video + "get",
      uploadVideo: video + "upload",
    };
  }
  login(params) {
    return this.http.post(this.APIList.login, params)
      .pipe(catchError(this.errorMgmt))

  }
  logout() {
    sessionStorage.removeItem("userId");
    this.http.get(this.APIList.logout);
    this.auth.removeToken();
  }
  signIn(param) {
    return this.http.post(this.APIList.sign, param)
      .pipe(catchError(this.errorMgmt))

  }
  getVideos() {
    return this.http.get(this.APIList.getVideo)
      .pipe(catchError(this.errorMgmt))
      
  }
  uploadVideos(caption: string, videoFile: File): Observable<any> {
    var formData: any = new FormData();
    formData.append("caption", caption);
    formData.append("file", videoFile);
    return this.http.post(this.APIList.uploadVideo, formData, {
      reportProgress: true,
      observe: 'events'
    })
      .pipe(catchError(this.errorMgmt))

  };
  getProfile() {
    return this.http.get(this.APIList.get)
      .pipe(catchError(this.errorMgmt))
  }

  postProfile(img) {
    var formData: any = new FormData();
    formData.append("file", img);
    return this.http.post(this.APIList.postprofile, formData, {
      reportProgress: true,
      observe: 'events'
    })
      .pipe(catchError(this.errorMgmt))
  }
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
