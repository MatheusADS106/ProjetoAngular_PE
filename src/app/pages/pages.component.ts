import { CategoryService } from './../service/category.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CustomerService } from '../service/customer.service';
import { Customer } from '../model/customer';
import { DatePipe } from '@angular/common';
import { NgToastService } from 'ng-angular-popup';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { NgForm } from '@angular/forms';
import { Category } from '../model/category';
import { Product, ProductDTO } from '../model/product';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})

export class Pages implements AfterViewInit, OnInit {
  customer: Customer = {
    idCustomer: '',
    firstNameCustomer: '',
    lastNameCustomer: '',
    cpfCustomer: '',
    birthdateCustomer: '',
    dateCreatedCustomer: '',
    monthlyIncomeCustomer: '',
    statusCustomer: true,
    emailCustomer: '',
    passwordCustomer: ''
  }

  category: Category = {
    idCategory: '',
    nameCategory: '',
    descriptionCategory: ''
  }

  product: Product = {
    idProduct: '',
    nameProduct: '',
    descriptionProduct: '',
    costPriceProduct: '',
    amountProduct: '',
    dateCreatedProduct: '',
    category: {
      idCategory: 0
    }
  }

  productDTO: ProductDTO = {
    idProduct: '',
    nameProduct: '',
    descriptionProduct: '',
    costPriceProduct: '',
    amountProduct: '',
    dateCreatedProduct: new DatePipe('pt-BR').transform(new Date(), 'yyyy-MM-dd')?.toString(),
    idCategory: ''
  }

  indice: number = 0;

  customers = new MatTableDataSource<Customer>();
  categories = new MatTableDataSource<Category>();
  products = new MatTableDataSource<Product>();

  @ViewChild('customerPaginator') customerPaginator!: MatPaginator;
  @ViewChild('categoryPaginator') categoryPaginator!: MatPaginator;
  @ViewChild('productPaginator') productPaginator!: MatPaginator;

  @ViewChild('customerForm') customerForm!: NgForm;
  @ViewChild('categoryForm') categoryForm!: NgForm;
  @ViewChild('productForm') productForm!: NgForm;

  displayedColumnsCustomer: String[] = ['idCustomer', 'firstNameCustomer', 'lastNameCustomer', 'cpfCustomer', 'birthdateCustomer', 'dateCreatedCustomer', 'monthlyIncomeCustomer', 'statusCustomer', 'emailCustomer', 'actions'];
  displayedColumnsCategory: String[] = ['idCategory', 'nameCategory', 'descriptionCategory', 'actions'];
  displayedColumnsProduct: String[] = ['idProduct', 'nameProduct', 'descriptionProduct', 'costPriceProduct', 'amountProduct', 'dateCreatedProduct', 'category', 'actions'];

  constructor(private customerService: CustomerService, private categoryService: CategoryService, private productService: ProductService, private toast: NgToastService) { }

  ngOnInit(): void {
    this.findAllCustomers();
    this.findAllCategories();
    this.findAllProducts();
  }

  ngAfterViewInit(): void {
    this.customers.paginator = this.customerPaginator;
    this.categories.paginator = this.categoryPaginator;
    this.products.paginator = this.productPaginator;
  }

  onSubmitCustomer() {
    const datepipe = new DatePipe("pt-BR");
    this.customer.birthdateCustomer = datepipe.transform(this.customer.birthdateCustomer, "dd/MM/yyyy");
    if (this.customer.idCustomer) {
      this.customerService.update(this.customer).subscribe(response => {
        this.indice = 0;
        this.toast.success({ detail: "Sucesso", summary: "Cliente alterado com sucesso!" });
        this.emptyCustomerForm();
        this.findAllCustomers();
      }, errorResponse => {
        this.toast.error({ detail: "Erro", summary: `Erro ao alterar cliente!` });
      });
    } else {
      this.customerService.save(this.customer).subscribe(response => {
        this.indice = 0;
        this.toast.success({ detail: "Sucesso", summary: "Cliente cadastrado com sucesso!" });
        this.emptyCustomerForm();
        this.findAllCustomers();
      }, errorResponse => {
        this.toast.error({ detail: "Erro", summary: `Erro ao cadastrar cliente!` });
      });
    }
    this.customer.birthdateCustomer = datepipe.transform(this.customer.birthdateCustomer, "yyyy-dd-MM");
  }

  onSubmitCategory() {
    if (this.category.idCategory) {
      this.categoryService.update(this.category).subscribe(response => {
        this.indice = 1;
        this.toast.success({ detail: "Sucesso", summary: "Categoria alterada com sucesso!" });
        this.emptyCategoryForm();
        this.findAllCategories();
        this.findAllProducts();
      }, errorResponse => {
        this.toast.error({ detail: "Erro", summary: `Erro ao alterar categoria!` });
      });
    } else {
      this.categoryService.save(this.category).subscribe(response => {
        this.indice = 1;
        this.toast.success({ detail: "Sucesso", summary: "Categoria cadastrada com sucesso!" });
        this.emptyCategoryForm();
        this.findAllCategories();
      }, errorResponse => {
        this.toast.error({ detail: "Erro", summary: `Erro ao cadastrar categoria!` });
      });
    }
  }

  onSubmitProduct() {
    const datepipe = new DatePipe("pt-BR");
    if (this.productDTO.idProduct) {
      this.product.idProduct = this.productDTO.idProduct;
      this.product.nameProduct = this.productDTO.nameProduct;
      this.product.descriptionProduct = this.productDTO.descriptionProduct;
      this.product.costPriceProduct = this.productDTO.costPriceProduct;
      this.product.amountProduct = this.productDTO.amountProduct;
      this.product.dateCreatedProduct = datepipe.transform(this.productDTO.dateCreatedProduct, "dd/MM/yyyy");
      this.product.category.idCategory = this.productDTO.idCategory;
      this.productService.update(this.product).subscribe(response => {
        this.indice = 2;
        this.toast.success({ detail: "Sucesso", summary: "Produto alterado com sucesso!" });
        this.emptyProductForm();
        this.findAllProducts();
      }, errorResponse => {
        this.productDTO.dateCreatedProduct = datepipe.transform(this.productDTO.dateCreatedProduct, "yyyy-MM-dd");
        this.toast.error({ detail: "Erro", summary: `Erro ao alterar produto!` });
      });
    } else {
      this.productDTO.dateCreatedProduct = datepipe.transform(this.productDTO.dateCreatedProduct, "dd/MM/yyyy");
      this.productService.save(this.productDTO).subscribe(response => {
        this.indice = 2;
        this.toast.success({ detail: "Sucesso", summary: "Produto cadastrado com sucesso!" });
        this.emptyProductForm();
        this.findAllProducts();
      }, errorResponse => {
        this.productDTO.dateCreatedProduct = datepipe.transform(this.productDTO.dateCreatedProduct, "yyyy-dd-MM");
        this.toast.error({ detail: "Erro", summary: `Erro ao cadastrar produto!` });
      });
    }
  }

  deleteCustomer(idCustomer: any): void {
    if (window.confirm("Deseja realmente excluir este cliente?")) {
      this.customerService.delete(idCustomer).subscribe(response => {
        this.findAllCustomers();
        this.toast.success({ detail: "Sucesso", summary: `Cliente excluído com sucesso!` });
      }, errorResponse => {
        this.toast.error({ detail: "Erro", summary: `Erro ao excluir cliente!` });
      })
    }
  }

  deleteProduct(idProduct: any): void {
    if (window.confirm("Deseja realmente excluir este produto?")) {
      this.productService.delete(idProduct).subscribe(response => {
        this.findAllProducts();
        this.toast.success({ detail: "Sucesso", summary: `Produto excluído com sucesso!` });
      }, errorResponse => {
        this.toast.error({ detail: "Erro", summary: `Erro ao excluir produto!` });
      })
    }
  }

  deleteCategory(idCategory: any): void {
    if (window.confirm("Deseja realmente excluir esta categoria?")) {
      this.categoryService.delete(idCategory).subscribe(response => {
        this.findAllCategories();
        this.toast.success({ detail: "Sucesso", summary: `Categoria excluída com sucesso!` });
      }, errorResponse => {
        this.toast.error({ detail: "Erro", summary: `Erro ao excluir categoria!` });
      })
    }
  }

  findAllCustomers() {
    this.customerService.findAll().subscribe(response => {
      this.customers.data = response.result;
    }, errorResponse => {
      this.toast.error({ detail: "Erro", summary: `Erro ao listar clientes!` });
    })
  }

  findAllProducts() {
    this.productService.findAll().subscribe(response => {
      this.products.data = response.result;
    }, errorResponse => {
      this.toast.error({ detail: "Erro", summary: `Erro ao listar produtos!` });
    })
  }

  findAllCategories() {
    this.categoryService.findAll().subscribe(response => {
      this.categories.data = response.result;
    }, errorResponse => {
      this.toast.error({ detail: "Erro", summary: `Erro ao listar categorias!` });
    })
  }

  findCustomer(idCustomer: any): void {
    this.customerService.findCustomer(idCustomer).subscribe(response => {
      this.customer = response.result;
      var date = this.customer.birthdateCustomer;
      var newDate = date.split("/").reverse().join("-");
      this.customer.birthdateCustomer = newDate;
      this.indice = 3;
    }, errorResponse => {
      this.toast.error({ detail: "Erro", summary: `Erro ao consultar cliente!` });
    })
  }

  findProduct(idProduct: any): void {
    this.productService.findProduct(idProduct).subscribe(response => {
      this.product = response.result;
      this.productDTO.idProduct = this.product.idProduct;
      this.productDTO.nameProduct = this.product.nameProduct;
      this.productDTO.descriptionProduct = this.product.descriptionProduct;
      this.productDTO.costPriceProduct = this.product.costPriceProduct;
      this.productDTO.amountProduct = this.product.amountProduct;
      var date = this.product.dateCreatedProduct;
      var newDate = date.split("/").reverse().join("-");
      this.productDTO.dateCreatedProduct = newDate;
      this.productDTO.idCategory = this.product.category?.idCategory;
      this.indice = 5;
    }, errorResponse => {
      this.toast.error({ detail: "Erro", summary: `Erro ao consultar produto!` });
    })
  }

  findCategory(idCategory: any): void {
    this.categoryService.findCategory(idCategory).subscribe(response => {
      this.category = response.result;
      this.indice = 4;
    }, errorResponse => {
      this.toast.error({ detail: "Erro", summary: `Erro ao consultar categoria!` });
    })
  }

  emptyCustomerForm(): void {
    this.customerForm.resetForm();
    this.customerForm.controls['statusCustomer'].setValue(true);
  }

  emptyCategoryForm(): void {
    this.categoryForm.resetForm();
  }

  emptyProductForm(): void {
    this.productForm.resetForm();
    this.productForm.controls['dateCreatedProduct'].setValue(new DatePipe('pt-BR').transform(new Date(), 'yyyy-MM-dd')?.toString());
  }
}
