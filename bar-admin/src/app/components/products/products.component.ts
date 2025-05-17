import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService, Product } from '../../services/product.service';
import { CategoryService, Category } from '../../services/category.service';
import { ModalComponent } from '../shared/modal/modal.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalComponent],
  template: `
    <div class="container">
      <div class="header">
        <h1>Productos</h1>
        <button class="button is-primary" (click)="openModal()">Nuevo Producto</button>
      </div>

      <div *ngIf="isLoading" class="loading">
        Cargando productos...
      </div>

      <div *ngIf="error" class="error-message">
        {{ error }}
      </div>

      <div *ngIf="!isLoading && !error" class="table-container">
        <table class="table is-fullwidth">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Categoría</th>
              <th>Disponible</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let product of products">
              <td>{{product.id}}</td>
              <td>{{product.name}}</td>
              <td>{{product.price | currency}}</td>
              <td>{{getCategoryName(product.categoryId)}}</td>
              <td>{{product.isAvailable ? 'Sí' : 'No'}}</td>
              <td>
                <button class="button is-small is-info mr-2" (click)="editProduct(product)">Editar</button>
                <button class="button is-small is-danger" (click)="deleteProduct(product.id)">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <app-modal
        [isOpen]="isModalOpen"
        [title]="modalTitle"
        (onClose)="closeModal()"
        (onSave)="saveProduct()"
      >
        <div class="field">
          <label class="label">Nombre</label>
          <div class="control">
            <input class="input" type="text" [(ngModel)]="currentProduct.name" name="name" required>
          </div>
        </div>

        <div class="field">
          <label class="label">Descripción</label>
          <div class="control">
            <textarea class="textarea" [(ngModel)]="currentProduct.description" name="description" required></textarea>
          </div>
        </div>

        <div class="field">
          <label class="label">Precio</label>
          <div class="control">
            <input class="input" type="number" [(ngModel)]="currentProduct.price" name="price" required>
          </div>
        </div>

        <div class="field">
          <label class="label">Categoría</label>
          <div class="control">
            <div class="select is-fullwidth">
              <select [(ngModel)]="currentProduct.categoryId" name="categoryId" required>
                <option value="">Seleccione una categoría</option>
                <option *ngFor="let category of categories" [value]="category.id">
                  {{category.name}}
                </option>
              </select>
            </div>
          </div>
        </div>

        <div class="field">
          <label class="label">URL de la imagen</label>
          <div class="control">
            <input class="input" type="text" [(ngModel)]="currentProduct.imageUrl" name="imageUrl">
          </div>
        </div>

        <div class="field">
          <div class="control">
            <label class="checkbox">
              <input type="checkbox" [(ngModel)]="currentProduct.isAvailable" name="isAvailable">
              Disponible
            </label>
          </div>
        </div>
      </app-modal>
    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }
    .table-container {
      margin-top: 20px;
    }
    .mr-2 {
      margin-right: 0.5rem;
    }
    .loading {
      text-align: center;
      padding: 20px;
      font-size: 1.2rem;
      color: #666;
    }
    .error-message {
      background-color: #ffebee;
      color: #c62828;
      padding: 10px;
      border-radius: 4px;
      margin: 10px 0;
    }
  `]
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  isModalOpen = false;
  modalTitle = '';
  currentProduct: Partial<Product> = {
    name: '',
    description: '',
    price: 0,
    categoryId: 0,
    imageUrl: '',
    isAvailable: true
  };
  isEditing = false;
  isLoading = true;
  error: string | null = null;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts() {
    this.isLoading = true;
    this.error = null;
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al cargar productos:', error);
        this.error = 'Error al cargar los productos. Por favor, intente nuevamente.';
        this.isLoading = false;
      }
    });
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (error) => {
        console.error('Error al cargar categorías:', error);
        this.error = 'Error al cargar las categorías. Por favor, intente nuevamente.';
      }
    });
  }

  getCategoryName(categoryId: number): string {
    const category = this.categories.find(c => c.id === categoryId);
    return category ? category.name : 'Sin categoría';
  }

  openModal() {
    this.isEditing = false;
    this.modalTitle = 'Nuevo Producto';
    this.currentProduct = {
      name: '',
      description: '',
      price: 0,
      categoryId: 0,
      imageUrl: '',
      isAvailable: true
    };
    this.isModalOpen = true;
  }

  editProduct(product: Product) {
    this.isEditing = true;
    this.modalTitle = 'Editar Producto';
    this.currentProduct = { ...product };
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.currentProduct = {
      name: '',
      description: '',
      price: 0,
      categoryId: 0,
      imageUrl: '',
      isAvailable: true
    };
  }

  saveProduct() {
    if (this.isEditing) {
      this.productService.updateProduct(this.currentProduct.id!, this.currentProduct).subscribe({
        next: () => {
          this.loadProducts();
          this.closeModal();
        },
        error: (error) => {
          console.error('Error al actualizar producto:', error);
          this.error = 'Error al actualizar el producto. Por favor, intente nuevamente.';
        }
      });
    } else {
      this.productService.createProduct(this.currentProduct as Omit<Product, 'id' | 'createdAt' | 'updatedAt'>).subscribe({
        next: () => {
          this.loadProducts();
          this.closeModal();
        },
        error: (error) => {
          console.error('Error al crear producto:', error);
          this.error = 'Error al crear el producto. Por favor, intente nuevamente.';
        }
      });
    }
  }

  deleteProduct(id: number) {
    if (confirm('¿Está seguro de que desea eliminar este producto?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          this.loadProducts();
        },
        error: (error) => {
          console.error('Error al eliminar producto:', error);
          this.error = 'Error al eliminar el producto. Por favor, intente nuevamente.';
        }
      });
    }
  }
} 