import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard">
      <div class="stats-grid">
        <div class="stat-card">
          <h3>Total Productos</h3>
          <p class="stat-number">0</p>
        </div>
        <div class="stat-card">
          <h3>Categorías</h3>
          <p class="stat-number">0</p>
        </div>
        <div class="stat-card">
          <h3>Pedidos Hoy</h3>
          <p class="stat-number">0</p>
        </div>
        <div class="stat-card">
          <h3>Ingresos Hoy</h3>
          <p class="stat-number">$0</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard {
      padding: 1rem;
    }
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
    }
    .stat-card {
      background: white;
      padding: 1.5rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .stat-card h3 {
      margin: 0;
      color: #666;
      font-size: 1rem;
    }
    .stat-number {
      margin: 0.5rem 0 0;
      font-size: 2rem;
      font-weight: bold;
      color: #2c3e50;
    }
  `]
})
export class DashboardComponent {} 