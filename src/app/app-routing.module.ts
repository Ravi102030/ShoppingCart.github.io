import { APP_BASE_HREF } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInPageComponent } from './Component/sign-in-page/sign-in-page.component';
import { AdminPageComponent } from './Component/admin-page/admin-page.component';
import { UserPageComponent } from './Component/user-page/user-page.component';
import { ProductListingPageComponent } from './Component/product-listing-page/product-listing-page.component';
import { CartPageComponent } from './Component/cart-page/cart-page.component';

const routes: Routes = [
  {
    path: 'home',
    children: [
    {
      path:'',
      component: SignInPageComponent
      
    },
    {
      path:'admin',
      component: AdminPageComponent
    },
    {
      path:'user',
      component: UserPageComponent
    },
    {
      path:'product',
      component: ProductListingPageComponent
    },
    {
      path: 'cart',
      component: CartPageComponent
    },
  ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[{provide: APP_BASE_HREF, useValue : '/'}]
})
export class AppRoutingModule { }
