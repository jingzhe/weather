import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BaseRequestOptions } from '@angular/http';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { AuthGuard } from './_guards/index';
import { AuthenticationService, ForecastService } from './_services/index';
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
        HttpModule,
        routing
    ],
    providers: [
        AuthGuard,
        AuthenticationService,
        ForecastService,
        BaseRequestOptions
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
