import { LitElement, html, css } from "lit"

export class ProductSelector extends LitElement {
  static properties = {
    selected: { type: String },
    isOpen: { type: Boolean },
  }

  static styles = css`
    :host {
      display: block;
      position: relative;
    }

    .selector {
      position: relative;
      width: 100%;
    }

    .selector__trigger {
      background: var(--selector-bg, #fff);
      border: 2px solid var(--selector-border, #e2e8f0);
      border-radius: 12px;
      padding: 1rem 1.5rem;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      transition: all 0.3s ease;
      font-size: 1rem;
      font-weight: 500;
      color: var(--selector-text, #1a202c);
    }

    .selector__trigger:hover {
      border-color: var(--selector-hover, #4299e1);
      box-shadow: 0 0 0 3px var(--selector-focus-ring, rgba(66, 153, 225, 0.1));
    }

    .selector__trigger.open {
      border-color: var(--selector-active, #3182ce);
      box-shadow: 0 0 0 3px var(--selector-focus-ring, rgba(66, 153, 225, 0.2));
    }

    .selector__content {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .selector__icon {
      font-size: 1.25rem;
    }

    .selector__arrow {
      transition: transform 0.3s ease;
      font-size: 0.875rem;
      color: var(--selector-arrow, #718096);
    }

    .selector__arrow.open {
      transform: rotate(180deg);
    }

    .selector__dropdown {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: var(--dropdown-bg, #fff);
      border: 2px solid var(--dropdown-border, #e2e8f0);
      border-radius: 12px;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
      z-index: 1000;
      overflow: hidden;
      transform: translateY(-10px);
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      margin-top: 0.5rem;
    }

    .selector__dropdown.open {
      transform: translateY(0);
      opacity: 1;
      visibility: visible;
    }

    .selector__option {
      padding: 1rem 1.5rem;
      cursor: pointer;
      transition: all 0.2s ease;
      border-bottom: 1px solid var(--option-border, #f7fafc);
      display: flex;
      align-items: center;
      gap: 0.75rem;
      color: var(--option-text, #2d3748);
    }

    .selector__option:last-child {
      border-bottom: none;
    }

    .selector__option:hover {
      background: var(--option-hover, #f7fafc);
    }

    .selector__option.selected {
      background: var(--option-selected, #ebf8ff);
      color: var(--option-selected-text, #2b6cb0);
    }

    .selector__option-icon {
      font-size: 1.25rem;
    }

    /* Theme variations */
    :host([theme="dark"]) {
      --selector-bg: #2d3748;
      --selector-border: #4a5568;
      --selector-text: #e2e8f0;
      --selector-hover: #63b3ed;
      --dropdown-bg: #2d3748;
      --dropdown-border: #4a5568;
      --option-text: #e2e8f0;
      --option-hover: #4a5568;
      --option-selected: #2c5282;
      --option-selected-text: #90cdf4;
    }

    :host([theme="neon"]) {
      --selector-bg: #1a1a2e;
      --selector-border: #00ff88;
      --selector-text: #00ff88;
      --selector-hover: #ff0080;
      --dropdown-bg: #1a1a2e;
      --dropdown-border: #00ff88;
      --option-text: #00ff88;
      --option-hover: #16213e;
      --option-selected: #ff0080;
      --option-selected-text: #ffffff;
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

  _toggleSelector() {
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
      <div class="selector">
        <div 
          class="selector__trigger ${this.isOpen ? "open" : ""}" 
          @click=${this._toggleSelector}
        >
          <div class="selector__content">
            <span class="selector__icon">${selectedProduct?.icon}</span>
            <span>${selectedProduct?.name || "Select Product"}</span>
          </div>
          <span class="selector__arrow ${this.isOpen ? "open" : ""}">▼</span>
        </div>

        <div class="selector__dropdown ${this.isOpen ? "open" : ""}">
          ${this.products.map(
            (product) => html`
              <div 
                class="selector__option ${product.id === this.selected ? "selected" : ""}"
                @click=${() => this._selectProduct(product.id)}
              >
                <span class="selector__option-icon">${product.icon}</span>
                <span>${product.name}</span>
              </div>
            `,
          )}
        </div>
      </div>
    `
  }
}

customElements.define("product-selector", ProductSelector)
