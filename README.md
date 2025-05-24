# LIT POD T-Shirt Store - Complete Implementation

A pixel-perfect recreation of the Tympanus Repeating Image Transition effect built with LIT Web Components, featuring a complete POD (Print on Demand) t-shirt store with advanced animations and 3D product visualization.

## 🚀 Features

### Part 1 - Home Page (Pixel Perfect Tympanus Recreation)
- **Exact recreation** of the original Tympanus Repeating Image Transition effect
- **Four distinct animation effects** matching the original
- **33 actual images** from `/public/assets/img1.webp` through `/public/assets/img33.webp`
- **Sophisticated mover animation system** with configurable parameters
- **Panel overlay system** for detailed image viewing
- **Responsive grid layout** (4 columns mobile, 8 columns desktop)

### Part 2 - Product Page (Advanced 3D Designer)
- **Interactive 3D t-shirt visualization** using Three.js and GLTFLoader
- **Real-time texture mapping** with user images and custom text
- **Product selector dropdown** (T-Shirt, Hoodie, Long Sleeve, Cap)
- **Drag & drop image upload** with file input fallback
- **Custom text input** (max 3 lines, 150 characters)
- **User measurements** (Height: 180cm, Weight: 80kg, Build: athletic as defaults)
- **Three distinct theme variations** (Light, Dark, Neon) - switch with Alt + Q
- **Responsive layout** optimized for mobile and desktop

## 🛠 Technical Implementation

### 3D Visualization
- **Three.js integration** with GLTFLoader for 3D model loading
- **OrbitControls** for interactive camera movement
- **Real-time texture generation** using HTML5 Canvas
- **Dynamic material application** to 3D models
- **Proper lighting and shadow setup**

### Advanced UI Components
- **Product Selector** - Custom dropdown with smooth animations
- **3D Viewer** - Three.js powered interactive preview
- **Theme Switcher** - Three distinct visual themes
- **Drag & Drop Upload** - File handling with visual feedback

### State Management & Architecture
- **Event-driven architecture** using CustomEvents
- **Property-based reactivity** with LIT's reactive properties
- **Theme management** via document-level event bubbling
- **Router integration** with @vaadin/router for SPA navigation

## 📦 Installation & Setup

\`\`\`bash
# Install dependencies
npm install

# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
\`\`\`

## 🎨 Theme System

### Light Theme (Default)
- Clean, modern interface with blue accents
- White backgrounds with subtle shadows
- Professional color palette

### Dark Theme
- Dark backgrounds with light text
- Muted blue accents
- Comfortable for low-light environments

### Neon Theme
- Black backgrounds with neon green/pink accents
- Cyberpunk-inspired color scheme
- High contrast for dramatic effect

Switch themes with **Alt + Q**

## 🌐 Deployment to Cloudflare Pages

### Setup Instructions
1. **Connect Repository**: Link your Git repository to Cloudflare Pages
2. **Build Configuration**:
   - Build command: `npm run build`
   - Output directory: `dist`
   - Node version: 18+
3. **Environment Variables**: None required for this static site
4. **Deploy**: Automatic deployment on push to main branch

### Build Process
\`\`\`bash
# Production build
npm run build

# The dist/ folder contains the deployable static files
\`\`\`

## 🎯 Key Features Implemented

### 1. Asset Integration
- ✅ Uses actual images from `/public/assets/img1.webp` through `/public/assets/img33.webp`
- ✅ Loads 3D model from `/public/models/shirt_baked.glb`

### 2. Advanced Product Designer
- ✅ Product selector dropdown (T-Shirt, Hoodie, Long Sleeve, Cap)
- ✅ User measurements (Height, Weight, Build with proper defaults)
- ✅ Drag & drop image upload
- ✅ Custom text input (max 3 lines)
- ✅ Real-time 3D preview with texture mapping

### 3. Three.js Integration
- ✅ Interactive 3D model viewer
- ✅ Real-time texture generation and application
- ✅ Proper lighting and camera controls
- ✅ Responsive 3D viewport

### 4. Theme System
- ✅ Three distinct themes (Light, Dark, Neon)
- ✅ Alt + Q keyboard shortcut for theme switching
- ✅ Consistent theming across all components

### 5. Responsive Design
- ✅ Mobile-first approach
- ✅ Adaptive layouts for different screen sizes
- ✅ Touch-optimized interactions

## 🔧 Browser Support
- **Modern browsers** (Chrome 80+, Firefox 75+, Safari 13+, Edge 80+)
- **WebGL support** required for 3D visualization
- **ES2020 features** with Vite transpilation
- **Web Components** native support required

## 📱 Performance Optimizations
- **Efficient re-rendering** with LIT's reactive system
- **3D model optimization** with proper disposal
- **Image preloading** for smooth transitions
- **Lazy loading** for better initial load times
- **Memory management** for Three.js resources

## 🎨 Design System
- **Consistent spacing** using CSS custom properties
- **Accessible color contrasts** across all themes
- **Focus management** for keyboard navigation
- **Smooth animations** with proper easing

## 🚀 Advanced Features
- **Real-time 3D texture mapping** with user content
- **Interactive camera controls** for 3D model inspection
- **Dynamic theme switching** with visual feedback
- **Professional UI components** based on modern design patterns
- **File drag & drop** with visual feedback
- **Responsive 3D viewport** that adapts to container size

This implementation showcases advanced frontend development skills including:
- Complex 3D graphics programming with Three.js
- Modern web component architecture with LIT
- Sophisticated state management patterns
- Performance-optimized rendering techniques
- Responsive design principles and mobile optimization
- Accessibility best practices and semantic HTML
- Professional UI/UX design implementation
