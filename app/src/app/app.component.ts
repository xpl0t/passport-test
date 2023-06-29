import { Component } from '@angular/core';
import { LoginResponse, OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-root',
  template: `
    <h1>OAuth2 Test</h1>

    <button (click)="login()">Login</button>
    <button (click)="logout()">Logout</button>

    <p>Authenticated: {{ response?.isAuthenticated }}</p>
    <pre>{{ response | json }}</pre>

    <h5>Access Token</h5>
    <pre>{{ accessToken | json }}</pre>

    <h5>ID Token</h5>
    <pre>{{ idToken | json }}</pre>

  `,
  styles: []
})
export class AppComponent {
  public response: LoginResponse;
  public accessToken;
  public idToken;

  constructor(public oidcSecurityService: OidcSecurityService) {}

  ngOnInit() {
    this.oidcSecurityService.checkAuth().subscribe((loginResponse: LoginResponse) => {
      const { isAuthenticated, userData, accessToken, idToken, configId } = loginResponse;

      console.log('checkAuth()', loginResponse);
      this.response = loginResponse;
      
      if (isAuthenticated) {
        this.accessToken = accessToken;
        this.idToken = this.decodeJwt(idToken);
      }
    });
  }

  login() {
    this.oidcSecurityService.authorize();
  }

  logout() {
    this.oidcSecurityService.logoff().subscribe((result) => console.log('logoff()', result));
  }

  decodeJwt(jwt: string): { header: any, payload: any, signature: any } {
    const [ header, payload, signature ] = jwt.split('.');
    return {
      header: JSON.parse(atob(header)),
      payload: JSON.parse(atob(payload)),
      signature
    };
  }
}
