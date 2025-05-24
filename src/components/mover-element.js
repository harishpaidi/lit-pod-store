import { LitElement, html, css } from "lit"

export class MoverElement extends LitElement {
  static properties = {
    image: { type: Object },
    config: { type: Object },
    startRect: { type: Object },
    stepIndex: { type: Number },
  }

  static styles = css`
    :host {
      position: fixed;
      aspect-ratio: var(--aspect);
      background-size: cover;
      background-position: 50% 50%;
      will-change: transform, clip-path;
      pointer-events: none;
      z-index: 1500;
      opacity: 0;
    }
  `

  animate() {
    if (!this.startRect || !this.config) return

    const {
      rotationRange = 3,
      moverPauseBeforeExit = 0.15,
      pathMotion,
      sineAmplitude = 0,
      moverBlendMode,
    } = this.config

    // Set initial position and style
    this.style.left = `${this.startRect.left}px`
    this.style.top = `${this.startRect.top}px`
    this.style.width = `${this.startRect.width}px`
    this.style.height = `${this.startRect.height}px`

    // Use the same image source as the grid item
    this.style.backgroundImage = `url(${this.image.src})`
    this.style.backgroundSize = "cover"
    this.style.backgroundPosition = "center"

    if (moverBlendMode) {
      this.style.mixBlendMode = moverBlendMode
    }

    // Calculate target position (center of screen)
    const centerX = window.innerWidth / 2 - this.startRect.width / 2
    const centerY = window.innerHeight / 2 - this.startRect.height / 2

    // Calculate path with sine wave if specified
    let targetX = centerX
    const targetY = centerY

    if (pathMotion === "sine" && sineAmplitude > 0) {
      const progress = this.stepIndex / 10
      const sineOffset = Math.sin(progress * Math.PI * 2) * sineAmplitude
      targetX += sineOffset
    }

    // Random rotation
    const rotation = (Math.random() - 0.5) * rotationRange * 2

    // Animate entrance
    this.style.opacity = "1"
    this.style.transition = "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)"

    setTimeout(() => {
      this.style.transform = `translate(${targetX - this.startRect.left}px, ${targetY - this.startRect.top}px) rotate(${rotation}deg) scale(0.9)`
    }, 50)

    // Animate exit
    setTimeout(
      () => {
        this.style.transition = "all 0.6s cubic-bezier(0.55, 0.055, 0.675, 0.19)"
        this.style.opacity = "0"
        this.style.transform += " scale(0.7)"
      },
      (moverPauseBeforeExit + 0.8) * 1000,
    )

    // Remove element
    setTimeout(
      () => {
        if (this.parentNode) {
          this.parentNode.removeChild(this)
        }
      },
      (moverPauseBeforeExit + 1.5) * 1000,
    )
  }

  render() {
    return html``
  }
}

customElements.define("mover-element", MoverElement)
