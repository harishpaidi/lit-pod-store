import { LitElement, html, css } from "lit"

export class ThemeSwitcher extends LitElement {
  static properties = {
    currentTheme: { type: Number },
    showIndicator: { type: Boolean },
  }

  static styles = css`
    :host {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 1000;
    }

    .theme-indicator {
      background: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      font-size: 0.9rem;
      font-weight: 600;
      opacity: 0;
      transform: translateY(-10px);
      transition: all 0.3s ease;
      pointer-events: none;
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }

    .theme-indicator.show {
      opacity: 1;
      transform: translateY(0);
    }
  `

  constructor() {
    super()
    this.currentTheme = 0
    this.showIndicator = false
    this.themes = ["light", "dark", "neon"]
    this.themeNames = ["Light Theme", "Dark Theme", "Neon Theme"]
  }

  connectedCallback() {
    super.connectedCallback()
    document.addEventListener("keydown", this._handleKeydown.bind(this))
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    document.removeEventListener("keydown", this._handleKeydown.bind(this))
  }

  _handleKeydown(e) {
    if (e.altKey && e.key === "q") {
      e.preventDefault()
      this._switchTheme()
    }
  }

  _switchTheme() {
    this.currentTheme = (this.currentTheme + 1) % this.themes.length
    const theme = this.themes[this.currentTheme]

    // Apply theme to document body
    document.body.className = theme === "light" ? "" : `theme-${theme}`

    // Dispatch theme change event
    document.dispatchEvent(
      new CustomEvent("theme-change", {
        detail: { theme },
      }),
    )

    this._showThemeIndicator()
  }

  _showThemeIndicator() {
    this.showIndicator = true
    setTimeout(() => {
      this.showIndicator = false
    }, 2000)
  }

  render() {
    const currentThemeName = this.themeNames[this.currentTheme]

    return html`
      <div class="theme-indicator ${this.showIndicator ? "show" : ""}">
        ${currentThemeName} (Alt + Q)
      </div>
    `
  }
}

customElements.define("theme-switcher", ThemeSwitcher)
