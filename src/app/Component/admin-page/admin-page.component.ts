import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
  adminForm: FormGroup = new FormGroup({});
  submitted = false;
  editedProductIndex: any;
  isUpdate = false;
  filePath = "";
  isTemporary: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private toastr: ToastrService

  ) {
    this.activateRoute.queryParamMap.subscribe((params) => {
      this.editedProductIndex = params.get('editedProductIndex') ? params.get('editedProductIndex') : -1;
    })
  }

  ngOnInit(): void {
    this.adminForm = this.formBuilder.group({
      // name: ['', Validators.required],
      name: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)])),
      gender: ['', Validators.required],
      price: ['', Validators.required],
      currency: ['', Validators.required],
      color: ['', Validators.required],
      quantity: ['', Validators.required],
      image: ['', Validators.required]
    });
    if (this.editedProductIndex >= 0) {
      let productList = JSON.parse(localStorage.getItem('productList') || '');
      if (productList.length) {
        this.isUpdate = true;
        let product = productList.filter((data: any, index: number) => index == this.editedProductIndex)[0];
        this.adminForm.controls['image'].removeValidators(Validators.required);
        this.adminForm.patchValue({
          name: product.name,
          gender: product.gender,
          price: product.price,
          currency: product.currency,
          color: product.color,
          quantity: product.quantity,
          image: ''
        })
      }
    }
  }

  get adminFormControls(): any {
    return this.adminForm.controls;
  }

  // onImageSelected(event: any): void {
  //   const file = event.target.value[0];
  //   if (file) {
  //     this.adminForm.controls['image'].setValue(file);
  //   }
  // }

  openTypePage(value: string): void {
    if (value === 'product') {
      const url = '/home/product';
      this.router.navigate([url]);
    } else {
      // Handle other values
    }
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.adminForm.valid) {
      if (this.editedProductIndex >= 0) {
        let newValue = this.adminForm.value;
        let prevData = JSON.parse(localStorage.getItem('productList') || '');
        if (prevData) {
          if( 0 === newValue.quantity){
            prevData[this.editedProductIndex].selectedQunatity = 0;
            prevData[this.editedProductIndex]['isTemporary'] = false;
            prevData[this.editedProductIndex]['isQunatityEnable'] = false;
          }
          else if (prevData[this.editedProductIndex].selectedQunatity > newValue.quantity) {
            prevData[this.editedProductIndex].selectedQunatity = newValue.quantity
          }
          if (newValue.image === '') {
            newValue.image = prevData[this.editedProductIndex].image;
          } else {
            this.filePath = newValue.image;
          }
          if (prevData[this.editedProductIndex].price !== newValue.price) {
            prevData[this.editedProductIndex].price = newValue.price;
          }
          if (prevData[this.editedProductIndex].quantity !== newValue.quantity) {
            prevData[this.editedProductIndex].quantity = newValue.quantity;
          }
          if (prevData[this.editedProductIndex].name !== newValue.name) {
            prevData[this.editedProductIndex].name = newValue.name;
          }
          if (prevData[this.editedProductIndex].currency !== newValue.currency) {
            prevData[this.editedProductIndex].currency = newValue.currency;
          }
          if (prevData[this.editedProductIndex].color !== newValue.color) {
            prevData[this.editedProductIndex].color = newValue.color;
          }
          if (prevData[this.editedProductIndex].gender !== newValue.gender) {
            prevData[this.editedProductIndex].gender = newValue.gender;
          }
          if (prevData[this.editedProductIndex].image !== newValue.image) {
            prevData[this.editedProductIndex].image = newValue.image;
          }
          // if(0 !== newValue.quantity){
          //   prevData[this.editedProductIndex].isTemporary = true;
          // }
          prevData[this.editedProductIndex]['selectedQunatity'] = prevData[this.editedProductIndex].selectedQunatity;
          localStorage.setItem('productList', JSON.stringify(prevData));
        }
      } else {
        if (localStorage.getItem('productList')) {
          let prevData = JSON.parse(localStorage.getItem('productList') || '');
          localStorage.setItem('productList', JSON.stringify([...prevData, this.adminForm.value]));
        }
        else {
          const data = [];
          data.push(this.adminForm.value)
          localStorage.setItem('productList', JSON.stringify(data));
        }
      }
      this.adminForm.reset();
      this.toastr.success('Your Product is Added', 'Great..!', { progressBar: true });
    } else {
      for (const controlName in this.adminForm.controls) {
        if (this.adminForm.controls.hasOwnProperty(controlName)) {
          const control = this.adminForm.controls[controlName];
          control.markAsTouched();
        }
      }
    }

    const url = '/home/admin'
    this.router.navigate([url]
    )
  }

  onReset(ev: Event): void {
    ev.preventDefault();
    let isBool = false; 
    if(this.adminForm.valid){
      this.adminForm.reset();
    }
    else{
      this.adminForm.markAllAsTouched();
    }
  }
}
