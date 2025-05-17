import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  template: `
    <div class="app-container">
      <nav class="navbar">
        <div class="nav-brand">Bar Admin</div>
        <div class="nav-links">
          <a routerLink="/products" routerLinkActive="active">Productos</a>
          <a routerLink="/categories" routerLinkActive="active">Categorías</a>
        </div>
      </nav>
      <main class="content">
        <div class="notification is-info">
          <p>Angular está funcionando correctamente</p>
          <p>Ruta actual: {{currentRoute}}</p>
        </div>
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }
    .navbar {
      background-color: #2c3e50;
      padding: 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: white;
    }
    .nav-brand {
      font-size: 1.5rem;
      font-weight: bold;
    }
    .nav-links {
      display: flex;
      gap: 1rem;
    }
    .nav-links a {
      color: white;
      text-decoration: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      transition: background-color 0.3s;
    }
    .nav-links a:hover {
      background-color: #34495e;
    }
    .nav-links a.active {
      background-color: #3498db;
    }
    .content {
      flex: 1;
      padding: 1rem;
      background-color: #f5f6fa;
    }
  `]
})
export class AppComponent implements OnInit {
  title = 'bar-admin';
  currentRoute = '';

  ngOnInit() {
    console.log('AppComponent inicializado');
    this.currentRoute = window.location.pathname;
  }
} 