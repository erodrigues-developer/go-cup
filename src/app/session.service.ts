import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  public userId: any;
  public logged: Boolean = false;
  public mail: any;

  constructor() { }

  setSession(id, email) {
    this.userId       = id;
    this.mail         = email;
    this.logged       = true;
  }
}
