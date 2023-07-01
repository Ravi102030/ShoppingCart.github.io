import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
  productList: any;
  totalPrice: number = 0;
  isEmptyCart: boolean = false;
  actualimgPath = "../../../assets/images/";

  @ViewChild('successTemplate') successTemplate: any;

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadProductList();
    this.convertSelectedPricesToINR();
    this.getTotalPrice();
  }

  private loadProductList(): void {
    if (localStorage.getItem('productList') || '') {
      this.productList = JSON.parse(localStorage.getItem('productList') || "");
      this.productList.forEach((data: any) => {
        data['totalPrice'] = data.price * data.selectedQunatity;
        if (data.isProductPurchased) {
          this.totalPrice += data['totalPrice'];
          data.isTemporary = true;
        }
      });

      this.productList = this.productList.map((product: any) => {
        const fileName = this.extractFileName(product.image);
        return { ...product, fileName };
      });
      localStorage.setItem('productList', JSON.stringify(this.productList));
    }

    if (this.productList) {
      let isEnable = this.productList.filter((data: any) => data.isProductPurchased);
      if (!isEnable.length) {
        this.isEmptyCart = true;
      }
    }
  }

  private extractFileName(path: string): string {
    const startIndex = path?.lastIndexOf('\\') + 1;
    return path.substring(startIndex);
  }

  convertToINR(price: number, currency: string): number {
    const conversionRates: { [key: string]: number } = {
      USD: 82,
      EURO: 89,
      POUND: 104
    };

    if (conversionRates.hasOwnProperty(currency)) {
      const conversionRate = conversionRates[currency];
      return price * conversionRate;
    }
    return price;
  }

  convertSelectedPricesToINR(): void {
    this.productList.forEach((data: any) => {
      if (data.isProductPurchased) {
        data.totalPrice = this.convertToINR(data.price * data.selectedQunatity, data.currency);
      }
    });
  }

  onMinus(index: number): void {
    let quantity = this.productList[index].selectedQunatity;
    if (quantity > 1) {
      quantity--;
      this.productList[index].totalPrice = this.convertToINR(
        this.productList[index].price * quantity,
        this.productList[index].currency
      );
      this.productList[index].selectedQunatity = quantity;
      this.productList[index].isProductPurchased = true;
      this.productList[index].isTemporary = true;
    } else {
      this.productList[index].isProductPurchased = false;
      this.productList[index].isTemporary = false;
      this.getTotalPrice();
      this.toastr.warning('Your product is removed', 'ATTENTION..!',{progressBar:true});
      let isPurchasedEnable = this.productList.some((product: any) => product.isProductPurchased);
      if (!isPurchasedEnable){
        this.isEmptyCart = true;
      }
      localStorage.setItem('productList', JSON.stringify(this.productList));
    }
    this.getTotalPrice();
    localStorage.setItem('productList', JSON.stringify(this.productList));
  }

  onAdd(index: number): void {
    let quantity = this.productList[index].selectedQunatity;
    let limit = this.productList[index].quantity;

    if (quantity < limit) {
      quantity++;
      if (quantity > limit) {
        this.productList[index].selectedQunatity = limit;
        this.productList[index].isProductPurchased = true;
      } else {
        this.productList[index].totalPrice = this.convertToINR(
          this.productList[index].price * quantity,
          this.productList[index].currency
        );
        this.productList[index].selectedQunatity = quantity;
      }
      this.productList[index].isProductPurchased = true;
      this.productList[index].isTemporary = true;
    } else {
      // alert('You have reached the product limit');
      this.toastr.error('You are exceeding the limit', 'ATTENTION..!',{progressBar:true});

    }
    this.getTotalPrice();
    localStorage.setItem('productList', JSON.stringify(this.productList));
  }

  getTotalPrice(): void {
    this.totalPrice = 0;
    this.productList.forEach((data: any) => {
      if (data.isProductPurchased) {
        this.totalPrice += data['totalPrice'];
      }
    });
  }

  onRemoveProduct(index: number): void {
    this.productList[index].isProductPurchased = false;
    this.productList[index].isTemporary = false;
    this.getTotalPrice();
    let isPurchasedEnable = this.productList.some((product: any) => product.isProductPurchased);
    if (!isPurchasedEnable) {
      this.isEmptyCart = true;
    }
    localStorage.setItem('productList', JSON.stringify(this.productList));
  }

  onProceed(): void {
    this.productList.forEach((data: any) => {
      if (data.isProductPurchased) {
        let newQuantity = data.quantity - data.selectedQunatity;
        data.quantity = newQuantity;
        data.isTemporary = false;
      }
    });
    localStorage.setItem('productList', JSON.stringify(this.productList));

    const ref = this.modalService.open(this.successTemplate, {
      centered: true,
      backdrop: 'static',
      keyboard: false,
      windowClass: 'alert-modal-page',
      size: 'md'
    });
    ref.result.then(() => {

    });
  }

  onClose(): void {
    this.modalService.dismissAll();
    const url = 'home/user';
    this.router.navigate([url]);
  }
}
