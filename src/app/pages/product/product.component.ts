import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// @Component({
//   selector: 'progress-spinner-overview-example',
//   templateUrl: 'progress-spinner-overview-example.html',
//   standalone: true,
//   imports: [MatProgressSpinnerModule],
// })
// export class ProgressSpinnerOverviewExample {}

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
}

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent {
  constructor(private route: ActivatedRoute) {}
  product: productType = {
    id: -1,
    category: '',
    image: '',
    description: '',
    rating: {
      rate: -1,
      count: -1,
    },
    title: '',
    price: -1,
  };

  loading = false;
  async ngOnInit() {
    await this.getThisProduct();
  }

  async getThisProduct() {
    this.loading = true;
    const newid = this.route.snapshot.paramMap.get('id');
    const data = await fetch(`https://fakestoreapi.com/products/${newid}`).then(
      (res) => {
        return res.json();
      }
    );
    this.product = data;
    this.loading = false;
  }
}
