import { LitElement, html, css } from "lit"

export class GridItem extends LitElement {
  static properties = {
    image: { type: Object },
    config: { type: Object },
    captionId: { type: String },
  }

  static styles = css`
    :host {
      display: block;
    }

    .grid__item {
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      cursor: pointer;
      will-change: transform, clip-path;
      overflow: hidden;
    }

    .grid__item:hover .grid__item-image {
      opacity: 0.7;
    }

    .grid__item-image {
      width: 100%;
      aspect-ratio: var(--aspect);
      background-size: cover;
      background-position: 50% 50%;
      transition: opacity 0.15s cubic-bezier(0.2, 0, 0.2, 1);
    }

    .grid__item-caption h3 {
      font-size: 1rem;
      font-weight: 500;
      margin: 0;
      text-align: right;
    }

    .grid__item-caption p {
      display: none;
      margin: 0;
      font-size: 0.9rem;
      opacity: 0.7;
      text-align: right;
    }

    @media screen and (min-width: 40em) {
      .grid__item-caption p {
        display: block;
      }
    }
  `

  _handleClick(e) {
    const rect = this.getBoundingClientRect()

    // Create mover elements for transition effect
    this._createMovers(rect)

    // Dispatch event to show panel
    this.dispatchEvent(
      new CustomEvent("image-selected", {
        detail: {
          image: this.image,
          rect,
          config: this.config,
        },
        bubbles: true,
        composed: true,
      }),
    )
  }

  _createMovers(rect) {
    const { steps = 6, stepInterval = 0.08, rotationRange = 3 } = this.config

    for (let i = 0; i < steps; i++) {
      setTimeout(
        () => {
          const mover = document.createElement("mover-element")
          mover.image = this.image
          mover.config = this.config
          mover.startRect = rect
          mover.stepIndex = i
          document.body.appendChild(mover)

          // Start animation
          mover.animate()
        },
        i * stepInterval * 1000,
      )
    }
  }

  render() {
    if (!this.image) return html``

    return html`
      <figure 
        class="grid__item" 
        role="img" 
        aria-labelledby="${this.captionId}"
        @click=${this._handleClick}
      >
        <div 
          class="grid__item-image" 
          style="background-image: url(${this.image.src})"
        ></div>
        <figcaption class="grid__item-caption" id="${this.captionId}">
          <h3>${this.image.title}</h3>
          <p>Model: ${this.image.model}</p>
        </figcaption>
      </figure>
    `
  }
}

customElements.define("grid-item", GridItem)
