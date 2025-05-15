import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="admin-layout">
      <nav class="admin-nav">
        <div class="nav-header">
          <h2>Bar Admin</h2>
        </div>
        <ul class="nav-menu">
          <li><a routerLink="/admin/dashboard" routerLinkActive="active">Dashboard</a></li>
          <li><a routerLink="/admin/products" routerLinkActive="active">Productos</a></li>
          <li><a routerLink="/admin/categories" routerLinkActive="active">Categorías</a></li>
          <li><a routerLink="/admin/orders" routerLinkActive="active">Pedidos</a></li>
        </ul>
      </nav>
      <main class="admin-content">
        <header class="content-header">
          <h1>Panel de Administración</h1>
        </header>
        <div class="content-body">
          <router-outlet></router-outlet>
        </div>
      </main>
    </div>
  `,
  styles: [`
    .admin-layout {
      display: flex;
      min-height: 100vh;
    }
    .admin-nav {
      width: 250px;
      background-color: #2c3e50;
      color: white;
      padding: 1rem;
    }
    .nav-header {
      padding: 1rem 0;
      border-bottom: 1px solid rgba(255,255,255,0.1);
    }
    .nav-menu {
      list-style: none;
      padding: 0;
      margin: 1rem 0;
    }
    .nav-menu li {
      margin: 0.5rem 0;
    }
    .nav-menu a {
      color: white;
      text-decoration: none;
      padding: 0.5rem 1rem;
      display: block;
      border-radius: 4px;
    }
    .nav-menu a:hover, .nav-menu a.active {
      background-color: rgba(255,255,255,0.1);
    }
    .admin-content {
      flex: 1;
      padding: 2rem;
      background-color: #f5f6fa;
    }
    .content-header {
      margin-bottom: 2rem;
    }
    .content-body {
      background-color: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
  `]
})
export class AdminComponent {
  title = 'Panel de Administración';
} 