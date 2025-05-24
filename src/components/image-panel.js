import { LitElement, html, css } from "lit"

export class ImagePanel extends LitElement {
  static properties = {
    isOpen: { type: Boolean },
    selectedImage: { type: Object },
    isRightAligned: { type: Boolean },
  }

  static styles = css`
    :host {
      position: fixed;
      margin: 0;
      width: 100%;
      height: 100vh;
      padding: var(--page-padding);
      top: 0;
      left: 0;
      display: grid;
      gap: var(--panel-gap);
      opacity: 0;
      pointer-events: none;
      z-index: 2000;
      will-change: transform, clip-path;
      justify-content: center;
      grid-template-rows: 1fr min-content;
      grid-template-columns: 100%;
      grid-template-areas: 'panel-image' 'panel-content';
      background: var(--color-bg);
      transition: opacity 0.5s ease;
    }

    :host([open]) {
      opacity: 1;
      pointer-events: auto;
    }

    :host([right-aligned]) {
      grid-template-columns: 1fr var(--panel-img-size);
      grid-template-areas: 'panel-content panel-image';
    }

    .panel__img {
      grid-area: panel-image;
      background-size: cover;
      background-position: center;
      width: 100%;
      height: auto;
      aspect-ratio: var(--aspect);
    }

    .panel__content {
      grid-area: panel-content;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      justify-content: end;
      align-items: end;
      text-align: right;
    }

    .panel__content h3 {
      margin: 0;
      font-size: 1rem;
      font-weight: 500;
    }

    .panel__content p {
      margin: 0;
      max-width: 150px;
      text-wrap: pretty;
    }

    .panel__close {
      background: none;
      border: 0;
      padding: 0;
      margin: 0;
      font: inherit;
      cursor: pointer;
      color: var(--color-close);
      transition: color 0.3s ease;
    }

    .panel__close:hover,
    .panel__close:focus {
      outline: none;
      color: var(--color-link-hover);
    }

    @media screen and (min-width: 40em) {
      :host {
        grid-template-columns: var(--panel-img-size) 1fr;
        grid-template-areas: 'panel-image panel-content';
        grid-template-rows: 100%;
      }

      .panel__img {
        height: 100%;
        width: auto;
        max-width: 100%;
      }
    }

    @media screen and (min-width: 65em) {
      :host([right-aligned]) .panel__content {
        align-items: start;
        text-align: left;
      }
    }
  `

  constructor() {
    super()
    this.isOpen = false
    this.selectedImage = null
    this.isRightAligned = false
  }

  connectedCallback() {
    super.connectedCallback()
    document.addEventListener("image-selected", this._handleImageSelected.bind(this))
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    document.removeEventListener("image-selected", this._handleImageSelected.bind(this))
  }

  _handleImageSelected(event) {
    this.selectedImage = event.detail.image
    this.isRightAligned = Math.random() > 0.5 // Random alignment like original

    // Delay panel reveal to allow mover animations
    setTimeout(() => {
      this.isOpen = true
      this.setAttribute("open", "")
      if (this.isRightAligned) {
        this.setAttribute("right-aligned", "")
      }
    }, 800)
  }

  _closePanel() {
    this.isOpen = false
    this.removeAttribute("open")
    this.removeAttribute("right-aligned")
    this.selectedImage = null
    this.isRightAligned = false
  }

  render() {
    if (!this.selectedImage) return html``

    return html`
      <div 
        class="panel__img" 
        style="background-image: url(${this.selectedImage.src})"
      ></div>
      <div class="panel__content">
        <h3>${this.selectedImage.title}</h3>
        <p>Model: ${this.selectedImage.model}</p>
        <p>
          Beneath the soft static of this lies a fragmented recollection of motion—faded pulses echoing through
          time-warped layers of light and silence. A stillness wrapped in artifact.
        </p>
        <button type="button" class="panel__close" @click=${this._closePanel} aria-label="Close preview">
          Close
        </button>
      </div>
    `
  }
}

customElements.define("image-panel", ImagePanel)
