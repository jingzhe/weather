import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { AuthGuard } from './_guards/index';
import { AuthenticationService, ForecastService, FavoriteService } from './_services/index';
import { LoginComponent } from './login/index';
import { HomeComponent } from './home/index';


@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        HomeComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        routing
    ],
    providers: [
        AuthGuard,
        AuthenticationService,
        ForecastService,
        FavoriteService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
