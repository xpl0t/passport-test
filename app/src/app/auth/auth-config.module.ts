import { NgModule } from '@angular/core';
import { AuthModule } from 'angular-auth-oidc-client';

@NgModule({
    imports: [AuthModule.forRoot({
        config: {
              authority: 'https://accounts.google.com/o/oauth2/auth',
              authWellknownEndpointUrl: 'https://accounts.google.com/.well-known/openid-configuration',
              redirectUrl: window.location.origin,
              postLogoutRedirectUri: window.location.origin,
              clientId: '823450303414-o3mn8p9pth2o2ng5g7l5o40vhrjl14qv.apps.googleusercontent.com',
              responseType: 'id_token token',
              scope: 'openid email profile',
              // responseType: 'code',
              silentRenew: true,
              useRefreshToken: true,
              renewTimeBeforeTokenExpiresInSeconds: 30
          }
      })],
    exports: [AuthModule],
})
export class AuthConfigModule {}
