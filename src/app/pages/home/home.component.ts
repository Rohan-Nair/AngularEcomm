import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  productList: any[] = [];

  async ngOnInit(): Promise<void> {
    await this.loadAllProducts();
  }

  async loadAllProducts() {
    const data = await fetch('https://fakestoreapi.com/products').then(
      (res) => {
        return res.json();
      }
    );
    this.productList = data;
    console.log(data);
  }
}
