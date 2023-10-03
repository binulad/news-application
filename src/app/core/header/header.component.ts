import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  user!: any;

  constructor(
    public auth: AuthService,
    @Inject(DOCUMENT) public document: Document
  ) {}

  ngOnInit(): void {
    this.auth.user$.subscribe((user) => {
      console.log(user);
      this.user = user;
    });
  }

  /**
   * This method called to logged in the user
   */
  onClickLogin() {
    this.auth.loginWithRedirect();
  }

  /**
   * This method called to log out the user
   */
  onClickLogout() {
    this.auth.logout({
      logoutParams: {
        returnTo: this.document.location.origin,
      },
    });
  }
}
