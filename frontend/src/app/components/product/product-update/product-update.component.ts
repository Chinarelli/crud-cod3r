import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { ProductsService } from '../products.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {

  product: Product = {
    name: '',
    price: 0
  };

  constructor(
    private productService: ProductsService,
    private router: Router,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    const id = Number.parseInt(this.route.snapshot.paramMap.get('id') || "0");
    this.productService.readById(id).subscribe(product => {
      this.product = product;
    });
  }

  updateProduct(): void {
    this.productService.update(this.product).subscribe(() => {
      this.productService.showMessage("Produto alterado com sucesso!");
      this.router.navigate(["/products"]);
    })
  }

  cancel(): void {
    this.router.navigate(["/products"])
  }

}
