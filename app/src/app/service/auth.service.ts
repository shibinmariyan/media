import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: any;
  constructor() {
    this.token = sessionStorage.getItem("accessToken") ? sessionStorage.getItem("accessToken") : "";
  }
  isAuthorized() {
    return this.token ? true : false;
  }
  getToken() {
    return this.token;
  }
  setToken(data) {
    this.token = data.token;
    data.userName ? sessionStorage.userName = data.userName : null;
    data.userId ? sessionStorage.userId = data.userId : null;
    data.token ? sessionStorage.accessToken = data.token : null;
  }
  removeToken() {
    this.token = null;
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("userName");
    sessionStorage.removeItem("userId");
    sessionStorage.path? sessionStorage.removeItem("path"):null;
  }
}
