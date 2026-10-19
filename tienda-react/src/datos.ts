import type { Producto } from "./tipos";

// Los productos 4 al 12 son reales: salen de https://dummyjson.com/products
// (nombre, marca, precio, stock, imagen y descripción tal cual los devuelve la API).
export const productos: Producto[] = [
  { id: 1, nombre: 'Audífonos inalámbricos', marca: 'TechSound', categoria: 'Audio', precio: 249.9, imagen: 'https://cdn.dummyjson.com/products/images/mobile-accessories/Apple%20Airpods/1.png', stock: 12 },
  { id: 2, nombre: 'Laptop ultradelgada 14"', marca: 'Nova', categoria: 'Laptops', precio: 3499, imagen: 'https://cdn.dummyjson.com/products/images/laptops/Asus%20Zenbook%20Pro%20Dual%20Screen%20Laptop/1.png', stock: 0 },
  { id: 3, nombre: 'Reloj inteligente', marca: 'Clik', categoria: 'Relojes', precio: 499.9, imagen: 'https://cdn.dummyjson.com/products/images/mens-watches/Brown%20Leather%20Belt%20Watch/1.png', stock: 20 },
  {
    id: 4, nombre: 'Apple MacBook Pro 14 Inch Space Grey', marca: 'Apple', categoria: 'Laptops', precio: 1999.99, stock: 24,
    imagen: 'https://cdn.dummyjson.com/product-images/laptops/apple-macbook-pro-14-inch-space-grey/1.webp',
    descripcion: "The MacBook Pro 14 Inch in Space Grey is a powerful and sleek laptop, featuring Apple's M1 Pro chip for exceptional performance and a stunning Retina display.",
  },
  {
    id: 5, nombre: 'Lenovo Yoga 920', marca: 'Lenovo', categoria: 'Laptops', precio: 1099.99, stock: 40,
    imagen: 'https://cdn.dummyjson.com/product-images/laptops/lenovo-yoga-920/1.webp',
    descripcion: 'The Lenovo Yoga 920 is a 2-in-1 convertible laptop with a flexible hinge, allowing you to use it as a laptop or tablet, offering versatility and portability.',
  },
  {
    id: 6, nombre: 'iPhone 13 Pro', marca: 'Apple', categoria: 'Smartphones', precio: 1099.99, stock: 56,
    imagen: 'https://cdn.dummyjson.com/product-images/smartphones/iphone-13-pro/1.webp',
    descripcion: 'The iPhone 13 Pro is a cutting-edge smartphone with a powerful camera system, high-performance chip, and stunning display. It offers advanced features for users who demand top-notch technology.',
  },
  {
    id: 7, nombre: 'Oppo F19 Pro Plus', marca: 'Oppo', categoria: 'Smartphones', precio: 399.99, stock: 78,
    imagen: 'https://cdn.dummyjson.com/product-images/smartphones/oppo-f19-pro-plus/1.webp',
    descripcion: 'The Oppo F19 Pro Plus is a feature-rich smartphone with a focus on camera capabilities. It boasts advanced photography features and a powerful performance for a premium user experience.',
  },
  {
    id: 8, nombre: 'iPad Mini 2021 Starlight', marca: 'Apple', categoria: 'Tablets', precio: 499.99, stock: 47,
    imagen: 'https://cdn.dummyjson.com/product-images/tablets/ipad-mini-2021-starlight/1.webp',
    descripcion: 'The iPad Mini 2021 in Starlight is a compact and powerful tablet from Apple. Featuring a stunning Retina display, powerful A-series chip, and a sleek design, it offers a premium tablet experience.',
  },
  {
    id: 9, nombre: 'Samsung Galaxy Tab S8 Plus Grey', marca: 'Samsung', categoria: 'Tablets', precio: 599.99, stock: 62,
    imagen: 'https://cdn.dummyjson.com/product-images/tablets/samsung-galaxy-tab-s8-plus-grey/1.webp',
    descripcion: "The Samsung Galaxy Tab S8 Plus in Grey is a high-performance Android tablet by Samsung. With a large AMOLED display, powerful processor, and S Pen support, it's ideal for productivity and entertainment.",
  },
  {
    id: 10, nombre: 'Apple AirPods Max Silver', marca: 'Apple', categoria: 'Audio', precio: 549.99, stock: 59,
    imagen: 'https://cdn.dummyjson.com/product-images/mobile-accessories/apple-airpods-max-silver/1.webp',
    descripcion: 'The Apple AirPods Max in Silver are premium over-ear headphones with high-fidelity audio, adaptive EQ, and active noise cancellation. Experience immersive sound in style.',
  },
  {
    id: 11, nombre: 'Apple Airpower Wireless Charger', marca: 'Apple', categoria: 'Accesorios', precio: 79.99, stock: 1,
    imagen: 'https://cdn.dummyjson.com/product-images/mobile-accessories/apple-airpower-wireless-charger/1.webp',
    descripcion: 'The Apple AirPower Wireless Charger provides a convenient way to charge your compatible Apple devices wirelessly. Simply place your devices on the charging mat for effortless charging.',
  },
  {
    id: 12, nombre: 'Longines Master Collection', marca: 'Longines', categoria: 'Relojes', precio: 1499.99, stock: 100,
    imagen: 'https://cdn.dummyjson.com/product-images/mens-watches/longines-master-collection/1.webp',
    descripcion: "The Longines Master Collection is an elegant and refined watch known for its precision and craftsmanship. With a timeless design, it's a symbol of luxury and sophistication.",
  },
];
