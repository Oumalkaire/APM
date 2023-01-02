import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { IProduct } from "./product";
import { ProductService } from "./product.service";

@Component({
    selector: 'pm-products',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy{

    pageTitle: String = "Product List";
    imageWith = 50;
    imageMargin = 2;
    showImage = true;
    filteredProducts: IProduct[] = [];
    products: IProduct[] = [];
    sub!: Subscription;

    private _listFilter: string = '';
    get listFilter(): string{
        return this._listFilter;
    }
    set listFilter(value: string){
        this._listFilter = value;
        this.filteredProducts = this.performFilter(value);
    }

    constructor(private productService: ProductService){}
    
    toggleImage():void{
        this.showImage = !this.showImage;
      }

    ngOnInit(): void {
        this.sub = this.productService.getProducts().subscribe({
            next: products => {
                this.products = products;
                this.filteredProducts = this.products;
            },
            error: err => console.log(err.message)
        });
    }

    ngOnDestroy(): void{
        this.sub.unsubscribe;
    }

    performFilter(filterBy: string): IProduct[]{
        return this.products.filter((product: IProduct) =>
        product.productName.toLocaleLowerCase().includes(filterBy.toLocaleLowerCase()));
    }

    onRatingClicked(message: any): void{
        this.pageTitle = 'Product List: '+message;
    }

}