import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-product-listing-page',
  templateUrl: './product-listing-page.component.html',
  styleUrls: ['./product-listing-page.component.css']
})
export class ProductListingPageComponent {
  productList : any ;
  actualimgPath = "../../../assets/images/";
  constructor(
    private router : Router,
  ){
    if(localStorage.getItem('productList') || ''){
      this.productList = JSON.parse(localStorage.getItem('productList') || "");
    }
    this.productList = this.productList.map((product: any) => {
      const fileName = this.extractFileName(product.image);
      return { ...product, fileName };
    });
  }

  
  private extractFileName(path: string): string {
    const startIndex = path?.lastIndexOf('\\') + 1;
    return path?.substring(startIndex);
  }

  onEdit(ind : any) : void{
    const url = '/home/admin'
    this.router.navigate([url] , {
      queryParams : {
        editedProductIndex : ind,
      }
    });
  }

  onDelete(ind : any) : void{
    let newList = this.productList.filter((data : any , index : number)=> index !== ind);
    if(newList?.length){
      this.productList = newList;
    }else{
      this.productList=[]
    }
    localStorage.setItem('productList', JSON.stringify(this.productList));
  }

  sortByName() {
    this.productList.sort((a: any, b: any) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
  }
  
  sortByQuantity() {
    this.productList.sort((a: any, b: any) => a.quantity - b.quantity);
  }

  sortByColor() {
    this.productList.sort((a: any, b: any) => {
      const colorA = a.color.toLowerCase();
      const colorB = b.color.toLowerCase();
      if (colorA < colorB) {
        return -1;
      }
      if (colorA > colorB) {
        return 1;
      }
      return 0;
    });
  }
  
  sortByPrice() {
    this.productList.sort((a: any, b: any) => a.price - b.price);
  }

  redirectToUser() : void{
    const url = '/home/admin'
    this.router.navigate([url]);
  }
}
