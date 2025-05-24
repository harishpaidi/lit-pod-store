# Lit POD Store

## Overview
This project is a customizable Print-On-Demand (POD) t-shirt store implemented as a Single Page Application (SPA) using Lit Web Components. It features a pixel-perfect home page animation and a highly interactive product page for customizing apparel with 3D previews.

---

## Features

### Home Page
- Pixel-perfect SPA conversion of [Repeating Image Transition](https://tympanus.net/Development/RepeatingImageTransition/)
- Uses Lit Web Components for modular design
- Smooth, original frame-based image transition animation
- Internal state management and routing with Lit

### Product Page
- UI based on [jkantner's CodePen](https://codepen.io/jkantner/full/OPJrMbp) and dropdowns from [jh3y's CodePen](https://codepen.io/jh3y/pen/QWPGwOr)
- Replace "Width in Characters" with Height, Weight, and Build selectors (default: 180cm, 80kg, athletic)
- Product types menu (tshirt, hoodie, sleevie, cap) with interactive 3D models from [threejs-t-shirt repo](https://github.com/Starklord17/threejs-t-shirt)
- Upload custom images by drag/drop or file upload; image shown large and inside 3D model
- Text input for up to 3 lines to print on apparel
- Three different layout and style versions; switch with Alt + Q
- Responsive design using Tailwind CSS and Lit components

---

## Development

### Installation
```bash
git clone <repository-url>
cd lit-pod-store-main
npm install
npm run dev
