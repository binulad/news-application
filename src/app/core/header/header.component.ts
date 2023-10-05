import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
// import { AuthService } from '@auth0/auth0-angular';
import { LoaderService } from '../loader/loader.service';
import { AuthGuardService } from '../guards/auth-guard.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  constructor(
    // public auth: AuthService,
    @Inject(DOCUMENT) public document: Document,
    private loaderService: LoaderService,
    private authGuardService: AuthGuardService
  ) {}

  ngOnInit(): void {
    // this.auth.idTokenClaims$.subscribe((value) => {
    //   console.log('idTokenClaims:: ', value);
    //   // Set the IdToken value to local storage
    //   this.authGuardService.setIdToken(value?.__raw);
    // });
    // this.auth.isLoading$.subscribe((value) => {
    //   this.loaderService.displayLoader(value);
    // });
  }

  /**
   * This method called to logged in the user
   */
  onClickLogin() {
    // this.auth.loginWithRedirect();
  }

  /**
   * This method called to log out the user
   */
  onClickLogout() {
    // this.auth.logout({
    //   logoutParams: {
    //     returnTo: this.document.location.origin,
    //   },
    // });
    // this.authGuardService.clearSession();
  }
}
