import { LitElement, html, css } from "lit"

export class ThreeDTshirt extends LitElement {
  static properties = {
    productType: { type: String },
    userImage: { type: String },
    customText: { type: String },
    theme: { type: String },
  }

  static styles = css`
    :host {
      display: block;
      width: 100%;
      height: 400px;
      background: var(--card-bg, white);
      border-radius: 12px;
      overflow: hidden;
      position: relative;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
    }

    .canvas-container {
      width: 100%;
      height: 100%;
      position: relative;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }

    .tshirt-mockup {
      width: 300px;
      height: 300px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }

    .tshirt-svg {
      width: 100%;
      height: 100%;
      filter: drop-shadow(0 20px 40px rgba(0, 0, 0, 0.3));
      transition: transform 0.3s ease;
    }

    .tshirt-mockup:hover .tshirt-svg {
      transform: scale(1.05) rotateY(5deg);
    }

    .design-overlay {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 120px;
      height: 120px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      background: rgba(255, 255, 255, 0.9);
      border-radius: 8px;
      padding: 0.5rem;
      box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .design-image {
      max-width: 80px;
      max-height: 60px;
      object-fit: contain;
      border-radius: 4px;
    }

    .design-text {
      font-size: 0.7rem;
      text-align: center;
      color: #333;
      font-weight: 600;
      line-height: 1.1;
      max-height: 40px;
      overflow: hidden;
      word-wrap: break-word;
    }

    .product-label {
      position: absolute;
      top: 1rem;
      left: 1rem;
      background: rgba(0, 0, 0, 0.7);
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      font-size: 0.9rem;
      font-weight: 600;
      backdrop-filter: blur(10px);
    }

    .placeholder {
      color: #999;
      font-style: italic;
      text-align: center;
      opacity: 0.7;
      font-size: 0.8rem;
    }

    /* Theme variations */
    :host([theme="dark"]) .canvas-container {
      background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
    }

    :host([theme="neon"]) .canvas-container {
      background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%);
    }

    :host([theme="neon"]) .product-label {
      background: rgba(0, 255, 136, 0.2);
      border: 1px solid #00ff88;
      color: #00ff88;
    }
  `

  constructor() {
    super()
    this.productType = "tshirt"
    this.userImage = ""
    this.customText = ""
    this.theme = "light"
  }

  _getProductName() {
    const names = {
      tshirt: "T-Shirt",
      hoodie: "Hoodie",
      sleevie: "Long Sleeve",
      cap: "Cap",
    }
    return names[this.productType] || "T-Shirt"
  }

  _getTshirtColor() {
    const colors = {
      tshirt: "#ffffff",
      hoodie: "#2c3e50",
      sleevie: "#9b59b6",
      cap: "#e74c3c",
    }
    return colors[this.productType] || "#ffffff"
  }

  _renderTshirtSVG() {
    const color = this._getTshirtColor()

    if (this.productType === "cap") {
      return html`
        <svg class="tshirt-svg" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <!-- Cap shape -->
          <ellipse cx="100" cy="120" rx="80" ry="60" fill="${color}" stroke="#333" stroke-width="2"/>
          <ellipse cx="100" cy="110" rx="75" ry="55" fill="${color}" stroke="#333" stroke-width="1"/>
          <path d="M 25 120 Q 100 140 175 120" fill="none" stroke="#333" stroke-width="2"/>
        </svg>
      `
    }

    return html`
      <svg class="tshirt-svg" viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg">
        <!-- T-shirt body -->
        <path d="M 60 80 L 60 220 L 140 220 L 140 80 Z" fill="${color}" stroke="#333" stroke-width="2"/>
        
        <!-- T-shirt sleeves -->
        <path d="M 40 60 L 60 80 L 60 120 L 40 110 Z" fill="${color}" stroke="#333" stroke-width="2"/>
        <path d="M 160 60 L 140 80 L 140 120 L 160 110 Z" fill="${color}" stroke="#333" stroke-width="2"/>
        
        <!-- Neckline -->
        <path d="M 80 60 Q 100 70 120 60 L 120 80 L 80 80 Z" fill="${color}" stroke="#333" stroke-width="2"/>
        
        <!-- Collar -->
        <path d="M 85 60 Q 100 55 115 60" fill="none" stroke="#333" stroke-width="2"/>
        
        <!-- Seam lines -->
        <line x1="60" y1="80" x2="60" y2="220" stroke="#ddd" stroke-width="1"/>
        <line x1="140" y1="80" x2="140" y2="220" stroke="#ddd" stroke-width="1"/>
        
        <!-- Hem -->
        <line x1="60" y1="215" x2="140" y2="215" stroke="#ddd" stroke-width="1"/>
      </svg>
    `
  }

  render() {
    return html`
      <div class="canvas-container">
        <div class="product-label">${this._getProductName()}</div>
        <div class="tshirt-mockup">
          ${this._renderTshirtSVG()}
          
          <div class="design-overlay">
            ${this.userImage ? html`<img src="${this.userImage}" alt="Design" class="design-image">` : ""}
            
            ${this.customText ? html`<div class="design-text">${this.customText}</div>` : ""}
            
            ${
              !this.userImage && !this.customText
                ? html`<div class="placeholder">Your design will appear here</div>`
                : ""
            }
          </div>
        </div>
      </div>
    `
  }
}

customElements.define("three-d-tshirt", ThreeDTshirt)
