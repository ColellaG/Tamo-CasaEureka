import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoryService, Category } from '../../services/category.service';
import { ModalComponent } from '../shared/modal/modal.component';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalComponent],
  template: `
    <div class="container">
      <div class="header">
        <h1>Categorías</h1>
        <button class="button is-primary" (click)="openModal()">Nueva Categoría</button>
      </div>

      <div *ngIf="isLoading" class="loading">
        Cargando categorías...
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
              <th>Descripción</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let category of categories">
              <td>{{category.id}}</td>
              <td>{{category.name}}</td>
              <td>{{category.description}}</td>
              <td>
                <button class="button is-small is-info mr-2" (click)="editCategory(category)">Editar</button>
                <button class="button is-small is-danger" (click)="deleteCategory(category.id)">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <app-modal
        [isOpen]="isModalOpen"
        [title]="modalTitle"
        (onClose)="closeModal()"
        (onSave)="saveCategory()"
      >
        <div class="field">
          <label class="label">Nombre</label>
          <div class="control">
            <input class="input" type="text" [(ngModel)]="currentCategory.name" name="name" required>
          </div>
        </div>

        <div class="field">
          <label class="label">Descripción</label>
          <div class="control">
            <textarea class="textarea" [(ngModel)]="currentCategory.description" name="description" required></textarea>
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
export class CategoriesComponent implements OnInit {
  categories: Category[] = [];
  isModalOpen = false;
  modalTitle = '';
  currentCategory: Partial<Category> = {
    name: '',
    description: ''
  };
  isEditing = false;
  isLoading = true;
  error: string | null = null;

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.isLoading = true;
    this.error = null;
    this.categoryService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al cargar categorías:', error);
        this.error = 'Error al cargar las categorías. Por favor, intente nuevamente.';
        this.isLoading = false;
      }
    });
  }

  openModal() {
    this.isEditing = false;
    this.modalTitle = 'Nueva Categoría';
    this.currentCategory = {
      name: '',
      description: ''
    };
    this.isModalOpen = true;
  }

  editCategory(category: Category) {
    this.isEditing = true;
    this.modalTitle = 'Editar Categoría';
    this.currentCategory = { ...category };
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.currentCategory = {
      name: '',
      description: ''
    };
  }

  saveCategory() {
    if (this.isEditing) {
      this.categoryService.updateCategory(this.currentCategory.id!, this.currentCategory).subscribe({
        next: () => {
          this.loadCategories();
          this.closeModal();
        },
        error: (error) => {
          console.error('Error al actualizar categoría:', error);
          this.error = 'Error al actualizar la categoría. Por favor, intente nuevamente.';
        }
      });
    } else {
      this.categoryService.createCategory(this.currentCategory as Omit<Category, 'id'>).subscribe({
        next: () => {
          this.loadCategories();
          this.closeModal();
        },
        error: (error) => {
          console.error('Error al crear categoría:', error);
          this.error = 'Error al crear la categoría. Por favor, intente nuevamente.';
        }
      });
    }
  }

  deleteCategory(id: number) {
    if (confirm('¿Está seguro de que desea eliminar esta categoría?')) {
      this.categoryService.deleteCategory(id).subscribe({
        next: () => {
          this.loadCategories();
        },
        error: (error) => {
          console.error('Error al eliminar categoría:', error);
          this.error = 'Error al eliminar la categoría. Por favor, intente nuevamente.';
        }
      });
    }
  }
} 