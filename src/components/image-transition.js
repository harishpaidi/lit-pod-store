import { LitElement, html, css } from "lit"

export class ImageTransition extends LitElement {
  static properties = {
    currentIndex: { type: Number },
    isAnimating: { type: Boolean },
  }

  static styles = css`
    :host {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
    }

    .image-container {
      position: absolute;
      width: 100%;
      height: 100%;
      display: grid;
      grid-template-columns: repeat(var(--cols, 8), 1fr);
      grid-template-rows: repeat(var(--rows, 6), 1fr);
      gap: 2px;
    }

    .image-piece {
      background-size: calc(100% * var(--cols, 8)) calc(100% * var(--rows, 6));
      background-repeat: no-repeat;
      transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      will-change: transform;
    }

    .image-piece.animate-out {
      transform: scale(0) rotate(180deg);
    }

    .image-piece.animate-in {
      transform: scale(1) rotate(0deg);
    }

    @media (max-width: 768px) {
      .image-container {
        grid-template-columns: repeat(6, 1fr);
        grid-template-rows: repeat(4, 1fr);
        --cols: 6;
        --rows: 4;
      }
    }
  `

  constructor() {
    super()
    this.currentIndex = 0
    this.isAnimating = false
    this.images = [
      "/placeholder.svg?height=800&width=1200&text=T-Shirt+Design+1",
      "/placeholder.svg?height=800&width=1200&text=T-Shirt+Design+2",
      "/placeholder.svg?height=800&width=1200&text=T-Shirt+Design+3",
      "/placeholder.svg?height=800&width=1200&text=T-Shirt+Design+4",
    ]
    this.cols = window.innerWidth <= 768 ? 6 : 8
    this.rows = window.innerWidth <= 768 ? 4 : 6
  }

  firstUpdated() {
    this.startTransition()
    setInterval(() => {
      if (!this.isAnimating) {
        this.nextImage()
      }
    }, 4000)

    window.addEventListener("resize", () => {
      this.cols = window.innerWidth <= 768 ? 6 : 8
      this.rows = window.innerWidth <= 768 ? 4 : 6
      this.requestUpdate()
    })
  }

  nextImage() {
    if (this.isAnimating) return

    this.isAnimating = true
    this.currentIndex = (this.currentIndex + 1) % this.images.length
    this.startTransition()
  }

  startTransition() {
    const pieces = this.shadowRoot.querySelectorAll(".image-piece")

    // Animate out current pieces
    pieces.forEach((piece, index) => {
      setTimeout(() => {
        piece.classList.add("animate-out")
      }, index * 20)
    })

    // After animation, update image and animate in
    setTimeout(() => {
      this.requestUpdate()

      setTimeout(() => {
        const newPieces = this.shadowRoot.querySelectorAll(".image-piece")
        newPieces.forEach((piece, index) => {
          piece.classList.remove("animate-out")
          setTimeout(() => {
            piece.classList.add("animate-in")
          }, index * 20)
        })

        setTimeout(() => {
          this.isAnimating = false
        }, 1000)
      }, 50)
    }, 800)
  }

  render() {
    const totalPieces = this.cols * this.rows
    const currentImage = this.images[this.currentIndex]

    return html`
      <div class="image-container" style="--cols: ${this.cols}; --rows: ${this.rows};">
        ${Array.from({ length: totalPieces }, (_, i) => {
          const col = i % this.cols
          const row = Math.floor(i / this.cols)
          const bgPosX = -col * (100 / (this.cols - 1))
          const bgPosY = -row * (100 / (this.rows - 1))

          return html`
            <div 
              class="image-piece"
              style="
                background-image: url(${currentImage});
                background-position: ${bgPosX}% ${bgPosY}%;
              "
            ></div>
          `
        })}
      </div>
    `
  }
}

customElements.define("image-transition", ImageTransition)
