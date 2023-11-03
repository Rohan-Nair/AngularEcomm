import { Component } from '@angular/core';

interface productType {
  id: number;
  category: string;
  image: string;
  description: string;
  rating: {
    rate: number;
    count: number;
  };
  title: string;
  price: number;
  quantity: number;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  loading: boolean = false;
  myCart: productType[] = [];
  myCartTotalCost: number = 0;

  ngOnInit(): void {
    this.myCartTotalCost = 0;
    this.getCartProds();
  }

  // function to get the products for the cart
  getCartProds() {
    this.loading = true;
    this.myCartTotalCost = 0;
    this.myCart = [];
    // getting all the products in the cart from the localStorage
    for (let i: number = 1; i < localStorage.length + 1; i++) {
      const eachProduct = JSON.parse(localStorage[i]);
      this.myCart.push(eachProduct);
      //calculating the price when itera.. throu the items
      this.myCartTotalCost += eachProduct.price * eachProduct.quantity;
    }
    this.loading = false;
  }

  removeOneProd(prod: productType) {
    const isPresent = localStorage.getItem(prod.id.toString());
    if (isPresent) {
      const thisProd = JSON.parse(isPresent);
      if (thisProd.quantity === 1) {
        localStorage.removeItem(thisProd.id);
        this.getCartProds();
      } else {
        var updated = {
          ...prod,
          quantity: thisProd.quantity - 1,
        };
        localStorage.setItem(JSON.stringify(prod.id), JSON.stringify(updated));
        this.getCartProds();
      }
    }
  }
}