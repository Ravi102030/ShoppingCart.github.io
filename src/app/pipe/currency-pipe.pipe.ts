import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyPipe'
})
export class CurrencyPipePipe implements PipeTransform {

  transform(value: string,): String {
    let currency = value.toUpperCase();
    let currencySymbol : string ;
    switch(currency){
      case 'USD':{
        currencySymbol = '$';
        break;
      }
      case 'INR':{
        currencySymbol = '₹';
        break;
      }

      case 'POUND':{
        currencySymbol = '£';
        break;
      }

      case 'EURO':{
        currencySymbol = '€';
        break;
      }

      default : {
        currencySymbol = currency;
      }
    }
    return currencySymbol;
  }

}
