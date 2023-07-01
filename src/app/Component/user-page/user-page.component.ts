import { Component, ElementRef, NgModule, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css'],
})
export class UserPageComponent implements OnInit {
  productList: any;
  searchElement: any;
  searchResult: boolean = true;
  actualimgPath = "../../../assets/images/";
  @ViewChild('searchKey') searchKey: any;

  constructor(
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() : void{
    if (localStorage.getItem('productList') || '') {
      this.productList = JSON.parse(localStorage.getItem('productList') || "");
      this.productList.forEach((data: any) => {
        data['isQunatityEnable'] = false; 
        data['selectedQunatity'] = data?.isTemporary ? data.selectedQunatity : 1;
        data['isProductPurchased'] = false;
        if(data.isTemporary){
          data.isQunatityEnable = true;
          data.isProductPurchased = true;
        }
      });
      this.productList = this.productList.map((product: any) => {
        const fileName = this.extractFileName(product.image);
        return { ...product, fileName };
      });
    }
  }

  private extractFileName(path: string): string {
    const startIndex = path?.lastIndexOf('\\') + 1;
    return path?.substring(startIndex);
  }

  openTypePage(value: string): void {
    if (value === 'cart') {
      localStorage.setItem('productList', JSON.stringify(this.productList));
      const url = '/home/cart';
      this.router.navigate([url]);
    } else {
      // Handle other values
    }
  }

  onAddCart(index: number): void {
    this.productList[index].isQunatityEnable = true;
    this.productList[index].selectedQunatity = this.productList[index]?.isTemporary ? this.productList[index].selectedQunatity : 1;
    this.productList[index].isProductPurchased = true;
    this.productList[index].isTemporary = true;
    localStorage.setItem('productList', JSON.stringify(this.productList));
  }

  onMinus(index: number, event: Event): void {
    if (event && this.productList[index].selectedQunatity === 1) {
      this.productList[index].isQunatityEnable = false;
      this.productList[index].isTemporary = false;
      this.productList[index].isProductPurchased = false;
    } else {
      let quantity = this.productList[index].selectedQunatity;
      if (quantity > 1) {
        quantity--;
        this.productList[index].selectedQunatity = quantity;
        this.productList[index].isProductPurchased = true;
      } else {
        this.productList[index].selectedQunatity = this.productList[index]?.isTemporary ? this.productList[index].selectedQunatity : 1;
      }
    }
    localStorage.setItem('productList', JSON.stringify(this.productList));
  }

  onAdd(index: number): void {
    let qunatity = this.productList[index].selectedQunatity;
    let limit = this.productList[index].quantity;
    if (qunatity < limit) {
      qunatity++;
      this.productList[index].selectedQunatity = qunatity;
      this.productList[index].isProductPurchased = true;
      localStorage.setItem('productList', JSON.stringify(this.productList));
    }else{
      this.toastr.success('You are exceeding the limit', 'ATTENTION..!',{progressBar:true});
    }
  }
   
  onSearch(event: Event): void {
    this.searchElement = this.searchKey.nativeElement.value.trim();
    if (this.searchElement) {
      const searchTerm = this.searchElement.toLowerCase();
      this.productList.forEach((data: any) => {
        const productName = data.name.toLowerCase();
        const productColor = data.color.toLowerCase();
        if (productName.includes(searchTerm) || productColor.includes(searchTerm)) {
          data.isHidden = false;
        } else {
          data.isHidden = true;
        }
      });
      this.searchResult = true;
    } else {
      this.productList.forEach((data: any) => {
        data.isHidden = false;
      });
      this.searchResult = true;
    }
  }
  onKeyUp(eve: Event): void {
    const searchTerm = this.searchKey.nativeElement.value.trim().toLowerCase();
    if (searchTerm === '') {
      this.productList.forEach((data: any) => {
        data.isHidden = false;
      });
      this.searchResult = true;
    } else {
      this.productList.forEach((data: any) => {
        const productName = data.name.toLowerCase();
        const productColor = data.color.toLowerCase();
        if (productName.includes(searchTerm) || productColor.includes(searchTerm)) {
          data.isHidden = false;
          this.searchResult = true;
        } else {
          data.isHidden = true;
        }
      });
    }
  }
  
}
