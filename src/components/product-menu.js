import { LitElement, html, css } from "lit"

export class ProductMenu extends LitElement {
  static properties = {
    selected: { type: String },
    isOpen: { type: Boolean },
  }

  static styles = css`
    :host {
      display: block;
      position: relative;
    }

    .menu-trigger {
      background: var(--accent-color, #4ecdc4);
      color: white;
      border: none;
      padding: 1rem 2rem;
      border-radius: 8px;
      font-size: 1.1rem;
      font-weight: 600;
      cursor: pointer;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      transition: all 0.3s ease;
    }

    .menu-trigger:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(78, 205, 196, 0.3);
    }

    .menu-dropdown {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: var(--card-bg, white);
      border-radius: 8px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
      z-index: 1000;
      overflow: hidden;
      transform: translateY(-10px);
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }

    .menu-dropdown.open {
      transform: translateY(0);
      opacity: 1;
      visibility: visible;
    }

    .menu-item {
      padding: 1rem 1.5rem;
      cursor: pointer;
      transition: background 0.2s ease;
      border-bottom: 1px solid var(--border-color, #eee);
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .menu-item:last-child {
      border-bottom: none;
    }

    .menu-item:hover {
      background: var(--hover-bg, #f8f9fa);
    }

    .menu-item.selected {
      background: var(--accent-color, #4ecdc4);
      color: white;
    }

    .menu-icon {
      font-size: 1.2rem;
    }

    .arrow {
      transition: transform 0.3s ease;
    }

    .arrow.open {
      transform: rotate(180deg);
    }
  `

  constructor() {
    super()
    this.selected = "tshirt"
    this.isOpen = false
    this.products = [
      { id: "tshirt", name: "T-Shirt", icon: "👕" },
      { id: "hoodie", name: "Hoodie", icon: "🧥" },
      { id: "sleevie", name: "Long Sleeve", icon: "👔" },
      { id: "cap", name: "Cap", icon: "🧢" },
    ]
  }

  connectedCallback() {
    super.connectedCallback()
    document.addEventListener("click", this._handleOutsideClick.bind(this))
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    document.removeEventListener("click", this._handleOutsideClick.bind(this))
  }

  _handleOutsideClick(e) {
    if (!this.contains(e.target)) {
      this.isOpen = false
    }
  }

  _toggleMenu() {
    this.isOpen = !this.isOpen
  }

  _selectProduct(productId) {
    this.selected = productId
    this.isOpen = false
    this.dispatchEvent(
      new CustomEvent("product-change", {
        detail: { product: productId },
        bubbles: true,
      }),
    )
  }

  render() {
    const selectedProduct = this.products.find((p) => p.id === this.selected)

    return html`
      <button class="menu-trigger" @click=${this._toggleMenu}>
        <span>
          <span class="menu-icon">${selectedProduct?.icon}</span>
          ${selectedProduct?.name || "Select Product"}
        </span>
        <span class="arrow ${this.isOpen ? "open" : ""}">▼</span>
      </button>

      <div class="menu-dropdown ${this.isOpen ? "open" : ""}">
        ${this.products.map(
          (product) => html`
          <div 
            class="menu-item ${product.id === this.selected ? "selected" : ""}"
            @click=${() => this._selectProduct(product.id)}
          >
            <span class="menu-icon">${product.icon}</span>
            <span>${product.name}</span>
          </div>
        `,
        )}
      </div>
    `
  }
}

customElements.define("product-menu", ProductMenu)
