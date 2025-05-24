import { LitElement, html, css } from "lit"

export class ProductPage extends LitElement {
  static properties = {
    selectedProduct: { type: String },
    userImage: { type: String },
    customText: { type: String },
    height: { type: String },
    weight: { type: String },
    build: { type: String },
    theme: { type: String },
  }

  static styles = css`
    :host {
      display: block;
      min-height: 100vh;
      background: var(--bg-color, #f8f9fa);
      color: var(--text-color, #1a202c);
      font-family: 'Inter', sans-serif;
      transition: all 0.3s ease;
    }

    .container {
      max-width: 1400px;
      margin: 0 auto;
      padding: 2rem;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3rem;
      align-items: start;
      min-height: 100vh;
    }

    .back-button {
      position: fixed;
      top: 2rem;
      left: 2rem;
      background: var(--accent-color, #4299e1);
      color: white;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 25px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      z-index: 1000;
      box-shadow: 0 4px 12px rgba(66, 153, 225, 0.3);
    }

    .back-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(66, 153, 225, 0.4);
    }

    .left-panel {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    .section {
      background: var(--card-bg, #ffffff);
      border-radius: 16px;
      padding: 2rem;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
      border: 1px solid var(--border-color, #e2e8f0);
    }

    .section-title {
      font-size: 1.25rem;
      font-weight: 700;
      margin-bottom: 1.5rem;
      color: var(--heading-color, #2d3748);
    }

    .upload-area {
      border: 2px dashed var(--border-color, #cbd5e0);
      border-radius: 12px;
      padding: 2rem;
      text-align: center;
      transition: all 0.3s ease;
      cursor: pointer;
      position: relative;
      min-height: 200px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 1rem;
    }

    .upload-area:hover,
    .upload-area.dragover {
      border-color: var(--accent-color, #4299e1);
      background: var(--upload-hover-bg, #ebf8ff);
      transform: scale(1.02);
    }

    .upload-area.has-image {
      padding: 1rem;
    }

    .preview-image {
      max-width: 100%;
      max-height: 150px;
      border-radius: 8px;
      object-fit: contain;
    }

    .upload-text {
      color: var(--text-muted, #718096);
      font-size: 0.9rem;
    }

    .hidden-input {
      display: none;
    }

    .text-input {
      width: 100%;
      min-height: 120px;
      border: 2px solid var(--border-color, #e2e8f0);
      border-radius: 12px;
      padding: 1rem;
      font-family: inherit;
      font-size: 1rem;
      resize: vertical;
      background: var(--input-bg, #ffffff);
      color: var(--text-color, #1a202c);
      transition: border-color 0.3s ease;
    }

    .text-input:focus {
      outline: none;
      border-color: var(--accent-color, #4299e1);
      box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.1);
    }

    .controls-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }

    .control-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .control-group.full-width {
      grid-column: 1 / -1;
    }

    .control-label {
      font-weight: 600;
      color: var(--label-color, #4a5568);
      font-size: 0.9rem;
    }

    .control-input {
      padding: 0.75rem 1rem;
      border: 2px solid var(--border-color, #e2e8f0);
      border-radius: 8px;
      font-size: 1rem;
      background: var(--input-bg, #ffffff);
      color: var(--text-color, #1a202c);
      transition: border-color 0.3s ease;
    }

    .control-input:focus {
      outline: none;
      border-color: var(--accent-color, #4299e1);
      box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.1);
    }

    .right-panel {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    .viewer-section {
      background: var(--card-bg, #ffffff);
      border-radius: 16px;
      padding: 1.5rem;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
      border: 1px solid var(--border-color, #e2e8f0);
    }

    /* Theme variations */
    :host([theme="dark"]) {
      --bg-color: #1a202c;
      --text-color: #e2e8f0;
      --card-bg: #2d3748;
      --border-color: #4a5568;
      --input-bg: #4a5568;
      --heading-color: #f7fafc;
      --label-color: #cbd5e0;
      --text-muted: #a0aec0;
      --upload-hover-bg: #2c5282;
      --accent-color: #63b3ed;
    }

    :host([theme="neon"]) {
      --bg-color: #0a0a0a;
      --text-color: #00ff88;
      --card-bg: #1a1a2e;
      --border-color: #00ff88;
      --input-bg: #16213e;
      --heading-color: #00ff88;
      --label-color: #00ff88;
      --text-muted: #4ecdc4;
      --upload-hover-bg: #16213e;
      --accent-color: #ff0080;
    }

    @media (max-width: 768px) {
      .container {
        grid-template-columns: 1fr;
        gap: 2rem;
        padding: 1rem;
      }

      .controls-grid {
        grid-template-columns: 1fr;
      }
    }
  `

  constructor() {
    super()
    this.selectedProduct = "tshirt"
    this.userImage = ""
    this.customText = ""
    this.height = "180cm"
    this.weight = "80kg"
    this.build = "athletic"
    this.theme = "light"
  }

  firstUpdated() {
    this.setupDragAndDrop()

    // Listen for theme changes
    document.addEventListener("theme-change", (e) => {
      this.theme = e.detail.theme
      if (this.theme === "light") {
        this.removeAttribute("theme")
      } else {
        this.setAttribute("theme", this.theme)
      }
    })
  }

  setupDragAndDrop() {
    const uploadArea = this.shadowRoot.querySelector(".upload-area")
    ;["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
      uploadArea.addEventListener(eventName, this.preventDefaults, false)
    })
    ;["dragenter", "dragover"].forEach((eventName) => {
      uploadArea.addEventListener(eventName, () => uploadArea.classList.add("dragover"), false)
    })
    ;["dragleave", "drop"].forEach((eventName) => {
      uploadArea.addEventListener(eventName, () => uploadArea.classList.remove("dragover"), false)
    })

    uploadArea.addEventListener("drop", this.handleDrop.bind(this), false)
  }

  preventDefaults(e) {
    e.preventDefault()
    e.stopPropagation()
  }

  handleDrop(e) {
    const dt = e.dataTransfer
    const files = dt.files
    this.handleFiles(files)
  }

  handleFiles(files) {
    if (files.length > 0) {
      const file = files[0]
      if (file.type.startsWith("image/")) {
        const reader = new FileReader()
        reader.onload = (e) => {
          this.userImage = e.target.result
          this.requestUpdate()
        }
        reader.readAsDataURL(file)
      }
    }
  }

  _handleFileInput(e) {
    this.handleFiles(e.target.files)
  }

  _triggerFileInput() {
    this.shadowRoot.querySelector(".hidden-input").click()
  }

  _handleProductChange(e) {
    this.selectedProduct = e.detail.product
  }

  _goBack() {
    window.history.pushState({}, "", "/")
    window.dispatchEvent(new PopStateEvent("popstate"))
  }

  render() {
    return html`
      <button class="back-button" @click=${this._goBack}>
        ← Back to Gallery
      </button>

      <div class="container">
        <div class="left-panel">
          <!-- Product Selector -->
          <div class="section">
            <h3 class="section-title">Product Type</h3>
            <product-selector 
              .selected=${this.selectedProduct}
              .theme=${this.theme}
              @product-change=${this._handleProductChange}
            ></product-selector>
          </div>

          <!-- Image Upload -->
          <div class="section">
            <h3 class="section-title">Design Upload</h3>
            <div class="upload-area ${this.userImage ? "has-image" : ""}" @click=${this._triggerFileInput}>
              <input 
                type="file" 
                accept="image/*" 
                class="hidden-input"
                @change=${this._handleFileInput}
              >
              ${
                this.userImage
                  ? html`
                <img src="${this.userImage}" alt="Preview" class="preview-image">
                <p class="upload-text">Click or drag to change image</p>
              `
                  : html`
                <div>📁</div>
                <p class="upload-text">Click or drag image here</p>
                <p class="upload-text">Supports JPG, PNG, SVG</p>
              `
              }
            </div>
          </div>

          <!-- Custom Text -->
          <div class="section">
            <h3 class="section-title">Custom Text</h3>
            <textarea 
              class="text-input"
              placeholder="Enter your custom text here... (Max 3 lines)"
              .value=${this.customText}
              @input=${(e) => (this.customText = e.target.value)}
              maxlength="150"
            ></textarea>
          </div>

          <!-- User Measurements -->
          <div class="section">
            <h3 class="section-title">Your Measurements</h3>
            <div class="controls-grid">
              <div class="control-group">
                <label class="control-label">Height</label>
                <input 
                  type="text" 
                  class="control-input"
                  .value=${this.height}
                  @input=${(e) => (this.height = e.target.value)}
                  placeholder="e.g., 180cm"
                >
              </div>

              <div class="control-group">
                <label class="control-label">Weight</label>
                <input 
                  type="text" 
                  class="control-input"
                  .value=${this.weight}
                  @input=${(e) => (this.weight = e.target.value)}
                  placeholder="e.g., 80kg"
                >
              </div>

              <div class="control-group full-width">
                <label class="control-label">Build</label>
                <select 
                  class="control-input"
                  .value=${this.build}
                  @change=${(e) => (this.build = e.target.value)}
                >
                  <option value="lean">Lean</option>
                  <option value="reg">Regular</option>
                  <option value="athletic">Athletic</option>
                  <option value="big">Big</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div class="right-panel">
          <!-- 3D Viewer -->
          <div class="viewer-section">
            <h3 class="section-title">3D Preview</h3>
            <three-d-viewer 
              .productType=${this.selectedProduct}
              .userImage=${this.userImage}
              .customText=${this.customText}
              .theme=${this.theme}
            ></three-d-viewer>
          </div>

          <!-- Large Image Preview -->
          ${
            this.userImage
              ? html`
            <div class="section">
              <h3 class="section-title">Design Preview</h3>
              <img 
                src="${this.userImage}" 
                alt="Large preview" 
                style="width: 100%; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);"
              >
            </div>
          `
              : ""
          }
        </div>
      </div>
    `
  }
}

customElements.define("product-page", ProductPage)
