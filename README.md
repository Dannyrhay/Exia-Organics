# Exia Organics

Exia Organics is a premium, responsive e-commerce frontend for organic beauty and wellness products. Designed with a "luxury organic" aesthetic, it provides a seamless shopping experience from discovery to direct order.

## ✨ Key Features

- **Branded Preloader**: A custom loading screen featuring the Exia Organics logo and animated loading indicators.
- **Product Catalog**: Dynamic grid displaying organic products with pricing and special offers.
- **Product Detail Pages**: Deep-dive views for every product, featuring high-quality imagery and detailed descriptions.
- **WhatsApp Integration**: Direct "Contact Seller" functionality allowing users to order products via WhatsApp.
- **Fully Responsive**: Optimized for seamless viewing on mobile, tablet, and desktop devices.
- **Smooth Animations**: Powered by Framer Motion for a fluid and high-end feel.

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Components**: [Radix UI](https://www.radix-ui.com/) (Primitives)

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/)

### Installation

1. Clone the repository:
   ```bash
   git clone [repository-url]
   ```
2. Navigate to the project directory:
   ```bash
   cd ExiaOrganics
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Development

Run the development server:
```bash
npm run dev
```
The application will be available at `http://localhost:5173`.

### Production Build

Create an optimized production build:
```bash
npm run build
```

## 📁 Project Structure

- `src/assets/`: Images and static assets.
- `src/components/`:
    - `ui/`: Reusable primitive components (Button, Badge, Avatar, etc.).
    - Feature sections (Navbar, Hero, Products, Footer).
- `src/pages/`: Main page components (HomePage, ProductsPage, ProductDetail).
- `src/data/`: Centralized product data (`products.js`).
- `src/lib/`: Utility functions (`utils.js`).

## 🛒 For Users (Ordering Process)

1. **Browse**: Navigate to the [Products](/products) page.
2. **View**: Click **"View Details"** on any product that interests you.
3. **Order**: On the product page, click **"Contact Seller via WhatsApp"**. This will open a WhatsApp window with a pre-filled message including the product name, allowing you to finalize your purchase directly with Exia Organics.

---

*Designed and Developed for Exia Organics.*
