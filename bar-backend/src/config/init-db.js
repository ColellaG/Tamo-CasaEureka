const db = require('./database');

// Datos iniciales de categorías
const categories = [
  { name: 'Desayunos & Meriendas' },
  { name: 'Cafetería' },
  { name: 'Café Fríos' },
  { name: 'Sandwiches' },
  { name: 'Tostados' },
  { name: 'Smoothie' },
  { name: 'Jugos' },
  { name: 'Bebidas' },
  { name: 'Tentaciones' },
  { name: 'Delicias Sin TACC' }
];

// Datos iniciales de productos
const products = [
  // Desayunos & Meriendas
  { name: 'Clásico', description: 'Infusión, 2 tortillas o medialunas + Jugo de naranja', price: 4800, categoryId: 1, isAvailable: true },
  { name: 'Light', description: 'Infusión, 2 tostadas + Queso y mermelada + Jugo de naranja + Ensalada de frutas', price: 8000, categoryId: 1, isAvailable: true },
  { name: 'De Campo', description: 'Infusión, 2 pan de campo + Manteca y dulce de leche + Jugo de naranja + Ensalada de frutas', price: 8000, categoryId: 1, isAvailable: true },
  { name: 'Power', description: 'Infusión, Torre de panqueques + Fruta de estación + Crocante de frutos secos + Coco rallado + Dulce de leche + Dips de miel o pasta de maní', price: 9000, categoryId: 1, isAvailable: true },
  { name: 'Energy', description: 'Infusión, yogurt griego con granola y frutas de estación', price: 8000, categoryId: 1, isAvailable: true },
  { name: 'Avocado', description: 'Infusión, Tostón de pan de campo + Palta + Huevo revuelto o poche + Tomate confitado', price: 7600, categoryId: 1, isAvailable: true },
  { name: 'Keto', description: 'Infusión, Cracker de mix de semillas + Huevo revuelto + Palta + Queso en escamas + Panceta', price: 8000, categoryId: 1, isAvailable: true },
  { name: 'Americano', description: 'Infusión, 2 tostadas + Huevo revuelto + 2 Fetas de queso + 2 Fetas de jamón + Panceta', price: 7200, categoryId: 1, isAvailable: true },
  { name: 'Kids', description: 'Licuado/jugo/gaseosa + Medio tostado en pan de miga de jamón y queso o ternera queso y tomate', price: 6000, categoryId: 1, isAvailable: true },
  { name: 'Duo', description: 'Infusión, 1 medialuna rellena de jamón y queso + 1 medialuna rellena de dulce de leche + Jugo de naranja', price: 8100, categoryId: 1, isAvailable: true },

  // Cafetería
  { name: 'Café', description: 'Café negro tradicional', price: 1800, categoryId: 2, isAvailable: true },
  { name: 'Café con leche', description: 'Café con leche caliente', price: 2000, categoryId: 2, isAvailable: true },
  { name: 'Chocolatada', description: 'Chocolate caliente con leche', price: 3000, categoryId: 2, isAvailable: true },
  { name: 'Cortado', description: 'Café con un toque de leche', price: 2000, categoryId: 2, isAvailable: true },
  { name: 'Capuccino', description: 'Café con leche y espuma', price: 2500, categoryId: 2, isAvailable: true },
  { name: 'Submarino', description: 'Leche caliente con chocolate', price: 3000, categoryId: 2, isAvailable: true },
  { name: 'Café espresso', description: 'Café concentrado', price: 2100, categoryId: 2, isAvailable: true },
  { name: 'Café doble espresso', description: 'Doble dosis de café concentrado', price: 3000, categoryId: 2, isAvailable: true },
  { name: 'Café Lungo', description: 'Café espresso más largo', price: 2000, categoryId: 2, isAvailable: true },
  { name: 'Latte', description: 'Café con leche y poca espuma', price: 2400, categoryId: 2, isAvailable: true },
  { name: 'Flat white', description: 'Café con leche y microespuma', price: 2400, categoryId: 2, isAvailable: true },
  { name: 'Mocha', description: 'Café con chocolate y leche', price: 1800, categoryId: 2, isAvailable: true },
  { name: 'Té', description: 'Infusión de hierbas', price: 1800, categoryId: 2, isAvailable: true },
  { name: 'Mate cocido', description: 'Infusión de yerba mate', price: 1800, categoryId: 2, isAvailable: true },

  // Café Fríos
  { name: 'Ice latte', description: 'Café con leche frío', price: 3000, categoryId: 3, isAvailable: true },
  { name: 'Cold Brew', description: 'Café preparado en frío', price: 2500, categoryId: 3, isAvailable: true },
  { name: 'Cold tea', description: 'Té helado', price: 1900, categoryId: 3, isAvailable: true },

  // Sandwiches
  { name: 'Sandwich Jamón Crudo', description: 'Jamón crudo, rúcula, tomate confitado, queso', price: 7800, categoryId: 4, isAvailable: true },
  { name: 'Sandwich Eureka', description: 'Lomito ahumado, nuez, queso azul, rúcula, reducción de aceto', price: 8300, categoryId: 4, isAvailable: true },
  { name: 'Veggie', description: 'Queso, hongos, palta, tomate, espinaca fresca o rúcula', price: 7800, categoryId: 4, isAvailable: true },

  // Tostados
  { name: 'Jamón y Queso', description: 'Sandwich de jamón y queso', price: 6500, categoryId: 5, isAvailable: true },
  { name: 'Ternera y Queso', description: 'Sandwich de ternera y queso', price: 8500, categoryId: 5, isAvailable: true },

  // Smoothie
  { name: 'Banana con leche o agua', description: 'Licuado de banana', price: 3000, categoryId: 6, isAvailable: true },
  { name: 'Frutilla con leche o agua', description: 'Licuado de frutilla', price: 3000, categoryId: 6, isAvailable: true },
  { name: 'Durazno con leche o agua', description: 'Licuado de durazno', price: 3000, categoryId: 6, isAvailable: true },

  // Jugos
  { name: 'Jugo de naranja', description: 'Jugo natural de naranja', price: 5000, categoryId: 7, isAvailable: true },
  { name: 'Jugo Frutal', description: 'Jugo de kiwi, durazno y maracuyá', price: 5000, categoryId: 7, isAvailable: true },
  { name: 'Limonada clásica', description: 'Limonada tradicional', price: 5000, categoryId: 7, isAvailable: true },
  { name: 'Limonada menta, jengibre y miel', description: 'Limonada con menta, jengibre y miel', price: 5200, categoryId: 7, isAvailable: true },
  { name: 'Limonada con maracuyá', description: 'Limonada con maracuyá', price: 5200, categoryId: 7, isAvailable: true },
  { name: 'Limonada con sandía', description: 'Limonada con sandía', price: 5200, categoryId: 7, isAvailable: true },

  // Bebidas
  { name: 'Gaseosas', description: 'Línea Coca Cola', price: 3000, categoryId: 8, isAvailable: true },
  { name: 'Agua', description: 'Agua mineral', price: 1900, categoryId: 8, isAvailable: true },
  { name: 'Soda', description: 'Agua con gas', price: 1900, categoryId: 8, isAvailable: true },

  // Tentaciones
  { name: 'Budín de chocolate', description: 'Budín casero de chocolate', price: 2200, categoryId: 9, isAvailable: true },
  { name: 'Budín marmolado', description: 'Budín casero marmolado', price: 2200, categoryId: 9, isAvailable: true },
  { name: 'Budín de limón', description: 'Budín casero de limón', price: 2200, categoryId: 9, isAvailable: true },
  { name: 'Alfajor de maicena', description: 'Alfajor tradicional de maicena', price: 2600, categoryId: 9, isAvailable: true },
  { name: 'Alfajor de chocolate', description: 'Alfajor de chocolate', price: 3100, categoryId: 9, isAvailable: true },

  // Delicias Sin TACC
  { name: 'Alfajor de capitas', description: 'Alfajor de capitas', price: 2600, categoryId: 10, isAvailable: true },
  { name: 'Alfajor de chocolate', description: 'Alfajor de chocolate', price: 3100, categoryId: 10, isAvailable: true },
  { name: 'Tortillas', description: 'Tortillas caseras', price: 2200, categoryId: 10, isAvailable: true },
  { name: 'Panqueques', description: 'Panqueques caseros', price: 2200, categoryId: 10, isAvailable: true }
];

// Función para inicializar la base de datos
async function initializeDatabase() {
  try {
    // Insertar categorías
    for (const category of categories) {
      await db.run('INSERT INTO categories (name) VALUES (?)', [category.name]);
    }
    console.log('Categorías insertadas correctamente');

    // Insertar productos
    for (const product of products) {
      await db.run(
        'INSERT INTO products (name, description, price, categoryId, isAvailable) VALUES (?, ?, ?, ?, ?)',
        [product.name, product.description, product.price, product.categoryId, product.isAvailable]
      );
    }
    console.log('Productos insertados correctamente');

  } catch (error) {
    console.error('Error al inicializar la base de datos:', error);
  }
}

// Ejecutar la inicialización
initializeDatabase(); 