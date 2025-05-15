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
    <div class="categories">
      <div class="header">
        <h2>Categorías</h2>
        <button class="btn-primary" (click)="openNewCategoryModal()">Nueva Categoría</button>
      </div>
      
      <div class="table-container">
        <table>
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
                <button class="btn-edit" (click)="editCategory(category)">Editar</button>
                <button class="btn-delete" (click)="deleteCategory(category.id)">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal para nueva/editar categoría -->
    <app-modal
      [isOpen]="isModalOpen"
      [title]="isEditing ? 'Editar Categoría' : 'Nueva Categoría'"
      (onClose)="closeModal()"
      (onSave)="saveCategory()"
    >
      <form class="category-form" (ngSubmit)="saveCategory()">
        <div class="form-group">
          <label for="name">Nombre</label>
          <input type="text" id="name" [(ngModel)]="currentCategory.name" name="name" required>
        </div>
        <div class="form-group">
          <label for="description">Descripción</label>
          <textarea id="description" [(ngModel)]="currentCategory.description" name="description" rows="3"></textarea>
        </div>
      </form>
    </app-modal>
  `,
  styles: [`
    .categories {
      padding: 1rem;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }
    .btn-primary {
      background-color: #3498db;
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      cursor: pointer;
    }
    .btn-primary:hover {
      background-color: #2980b9;
    }
    .table-container {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      overflow: hidden;
    }
    table {
      width: 100%;
      border-collapse: collapse;
    }
    th, td {
      padding: 1rem;
      text-align: left;
      border-bottom: 1px solid #eee;
    }
    th {
      background-color: #f8f9fa;
      font-weight: 600;
    }
    .btn-edit, .btn-delete {
      padding: 0.25rem 0.5rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      margin-right: 0.5rem;
    }
    .btn-edit {
      background-color: #2ecc71;
      color: white;
    }
    .btn-delete {
      background-color: #e74c3c;
      color: white;
    }
    .btn-edit:hover {
      background-color: #27ae60;
    }
    .btn-delete:hover {
      background-color: #c0392b;
    }
    .category-form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    .form-group label {
      font-weight: 500;
    }
    .form-group input[type="text"],
    .form-group textarea {
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
  `]
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = [];
  isModalOpen = false;
  isEditing = false;
  currentCategory: Partial<Category> = {
    name: '',
    description: ''
  };

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (error) => {
        console.error('Error al cargar categorías:', error);
      }
    });
  }

  openNewCategoryModal() {
    this.isEditing = false;
    this.currentCategory = {
      name: '',
      description: ''
    };
    this.isModalOpen = true;
  }

  editCategory(category: Category) {
    this.isEditing = true;
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
    if (this.isEditing && this.currentCategory.id) {
      this.categoryService.updateCategory(this.currentCategory.id, this.currentCategory).subscribe({
        next: () => {
          this.loadCategories();
          this.closeModal();
        },
        error: (error) => {
          console.error('Error al actualizar categoría:', error);
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
        }
      });
    }
  }

  deleteCategory(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar esta categoría?')) {
      this.categoryService.deleteCategory(id).subscribe({
        next: () => {
          this.loadCategories();
        },
        error: (error) => {
          console.error('Error al eliminar categoría:', error);
        }
      });
    }
  }
} 