import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInPageComponent } from './Component/sign-in-page/sign-in-page.component';
import { AdminPageComponent } from './Component/admin-page/admin-page.component';
import { UserPageComponent } from './Component/user-page/user-page.component';
import { ProductListingPageComponent } from './Component/product-listing-page/product-listing-page.component';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { CartPageComponent } from './Component/cart-page/cart-page.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { CurrencyPipePipe } from './pipe/currency-pipe.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';



@NgModule({
  declarations: [
    AppComponent,
    SignInPageComponent,
    AdminPageComponent,
    UserPageComponent,
    ProductListingPageComponent,
    CartPageComponent,
    CurrencyPipePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    ReactiveFormsModule,
    NgSelectModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
