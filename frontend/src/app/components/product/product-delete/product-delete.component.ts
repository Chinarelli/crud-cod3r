import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {

  product: Product = {
    name: "",
    price: 0
  }

  constructor(
    private productsService: ProductsService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id") || "";
    this.productsService.readById(id).subscribe(product => {
      this.product = product;
    })
  }

  deleteProduct() {
    this.productsService.delete(this.product).subscribe(() => {
      this.productsService.showMessage("Produto excluido com sucesso!");
      this.router.navigate(["/products"]);
    })
  }

  cancel() {
    this.router.navigate(["/products"]);
  }
}
