
# 📦 Mini Web Application

---

## 📋 Project Overview

This mini app contains two main functionalities based on the provided SOW:

1. **Products Price List**: A responsive web page showing a price list of 20 test products.
2. **Terms Page Clone**: A responsive clone of https://online.123fakturera.se/terms/ with full language support (English and Svenska).

Both modules are fully responsive across desktop, tablet, and mobile devices.

**Deployed App Link**: [https://fakturera-app-frontend.vercel.app](https://fakturera-app-frontend.vercel.app)

---

## 🚀 Tech Stacka

- **Frontend**: Vite + React.js
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Icons**: Lucide React Icons
- **API Communication**: Axios

---

## 🎨 Frontend Features

- Responsive header with hamburger menu (Drawer functionality).
- Smooth scrolling behavior across all devices.
- Search functionality by "Article No" and "Product" fields.
- Editable product list rows with Save and Cancel options.
- Dynamic responsiveness for Desktop, Tablet, and Mobile devices.
- Routing between Price List and Terms pages.
- Language switcher with English and Svenska support (data pulled from DB).

### 📁 Frontend Project Structure

```plaintext
frontend/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── App.jsx
│   └── main.jsx
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

---

## 📦 Frontend Dependencies

| Package              | Version     | Purpose                                   |
|----------------------|-------------|-------------------------------------------|
| react                | ^19.0.0     | Core React library                       |
| react-dom            | ^19.0.0     | React DOM rendering                      |
| react-router-dom     | ^7.5.2      | Routing and navigation                   |
| axios                | ^1.9.0      | Promise-based HTTP client                |
| tailwindcss          | ^4.1.4      | Utility-first CSS framework              |
| @tailwindcss/vite    | ^4.1.4      | Tailwind integration with Vite           |
| lucide-react         | ^0.503.0    | Lightweight icons for React              |

### 📦 Frontend Dev Dependencies

| Package                  | Version     |
|---------------------------|-------------|
| vite                      | ^6.3.1       |
| eslint                    | ^9.22.0      |
| @vitejs/plugin-react       | ^4.3.4       |
| @types/react              | ^19.0.10     |
| @types/react-dom          | ^19.0.4      |
| eslint-plugin-react-hooks | ^5.2.0       |
| eslint-plugin-react-refresh | ^0.4.19   |
| globals                   | ^16.0.0      |
