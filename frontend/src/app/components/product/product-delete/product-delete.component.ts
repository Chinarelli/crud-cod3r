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
    id: 0,
    name: "",
    price: 0
  }

  constructor(
    private productService: ProductsService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = Number.parseInt(this.route.snapshot.paramMap.get('id') || "0");
    this.productService.readById(id).subscribe(product => {
      this.product = product;
    })
  }

  deleteProduct(): void {
    this.productService.delete(this.product.id || 0).subscribe(() => {
      this.productService.showMessage("Produto excluido com sucesso!");
      this.router.navigate(["/products"]);
    })
  }

  cancel(): void {
    this.router.navigate(["/products"]);
  }
}
