import { LitElement, html, css } from "lit"
import gsap from "gsap"
import imagesLoaded from "imagesloaded"

export class TympanusGrid extends LitElement {
  static properties = {
    effectType: { type: String },
  }

  static styles = css`
    :host {
      display: block;
    }

    .grid {
      padding: 1rem 0;
      display: grid;
      grid-template-columns: repeat(var(--column-count), minmax(var(--column), 1fr));
      grid-column-gap: var(--c-gap);
      grid-row-gap: 5rem;
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

    .panel {
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
    }

    @media screen and (min-width: 40em) {
      .panel {
        grid-template-columns: var(--panel-img-size) 1fr;
        grid-template-areas: 'panel-image panel-content';
        grid-template-rows: 100%;
      }
    }

    .panel--right {
      @media screen and (min-width: 40em) {
        grid-template-columns: 1fr var(--panel-img-size);
        grid-template-areas: 'panel-content panel-image';
      }
    }

    .panel__img {
      grid-area: panel-image;
      background-size: cover;
      background-position: center;
      width: 100%;
      height: auto;
      aspect-ratio: var(--aspect);
    }

    @media screen and (min-width: 40em) {
      .panel__img {
        height: 100%;
        width: auto;
        max-width: 100%;
      }
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

    @media screen and (min-width: 65em) {
      .panel--right .panel__content {
        align-items: start;
        text-align: left;
      }
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
    }

    .panel__close:hover,
    .panel__close:focus {
      outline: none;
      color: var(--color-link-hover);
    }
  `

  constructor() {
    super()
    this.effectType = "effect1"
    this.images = this._generateImages()
    this.isAnimating = false
    this.isPanelOpen = false
    this.currentItem = null
  }

  firstUpdated() {
    this.initializeEffect()
  }

  async initializeEffect() {
    // Wait for imagesLoaded to be available
    while (typeof imagesLoaded === "undefined") {
      await new Promise((resolve) => setTimeout(resolve, 100))
    }

    // Preload images
    await this.preloadImages()

    // Initialize the effect
    this.setupEventListeners()
  }

  preloadImages() {
    return new Promise((resolve) => {
      imagesLoaded(this.shadowRoot.querySelectorAll(".grid__item-image"), { background: true }, resolve)
    })
  }

  setupEventListeners() {
    const gridItems = this.shadowRoot.querySelectorAll(".grid__item")
    gridItems.forEach((item) => {
      item.addEventListener("click", (e) => this.onGridItemClick(e, item))
    })

    const closeButton = this.shadowRoot.querySelector(".panel__close")
    if (closeButton) {
      closeButton.addEventListener("click", () => this.resetView())
    }

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.isPanelOpen && !this.isAnimating) {
        this.resetView()
      }
    })
  }

  onGridItemClick(e, item) {
    if (this.isAnimating) return

    this.isAnimating = true
    this.currentItem = item

    const config = this._getEffectConfig(this.effectType)
    const overrides = this.extractItemConfigOverrides(item)
    Object.assign(config, overrides)

    this.positionPanelBasedOnClick(item)

    const { imgURL, title, desc } = this.extractItemData(item)
    this.setPanelContent({ imgURL, title, desc })

    const allItems = this.shadowRoot.querySelectorAll(".grid__item")
    const delays = this.computeStaggerDelays(item, allItems)
    this.animateGridItems(allItems, item, delays)
    this.animateTransition(
      item.querySelector(".grid__item-image"),
      this.shadowRoot.querySelector(".panel__img"),
      imgURL,
      config,
    )
  }

  extractItemConfigOverrides(item) {
    const overrides = {}
    const dataset = item.dataset

    if (dataset.steps) overrides.steps = Number.parseInt(dataset.steps)
    if (dataset.stepDuration) overrides.stepDuration = Number.parseFloat(dataset.stepDuration)
    if (dataset.stepInterval) overrides.stepInterval = Number.parseFloat(dataset.stepInterval)
    if (dataset.rotationRange) overrides.rotationRange = Number.parseFloat(dataset.rotationRange)
    if (dataset.moverPauseBeforeExit) overrides.moverPauseBeforeExit = Number.parseFloat(dataset.moverPauseBeforeExit)
    if (dataset.panelRevealEase) overrides.panelRevealEase = dataset.panelRevealEase
    if (dataset.moverEnterEase) overrides.moverEnterEase = dataset.moverEnterEase
    if (dataset.moverExitEase) overrides.moverExitEase = dataset.moverExitEase
    if (dataset.panelRevealDurationFactor)
      overrides.panelRevealDurationFactor = Number.parseFloat(dataset.panelRevealDurationFactor)
    if (dataset.moverBlendMode) overrides.moverBlendMode = dataset.moverBlendMode
    if (dataset.pathMotion) overrides.pathMotion = dataset.pathMotion
    if (dataset.sineAmplitude) overrides.sineAmplitude = Number.parseFloat(dataset.sineAmplitude)
    if (dataset.clipPathDirection) overrides.clipPathDirection = dataset.clipPathDirection

    return overrides
  }

  positionPanelBasedOnClick(clickedItem) {
    const panel = this.shadowRoot.querySelector(".panel")
    const centerX = this.getElementCenter(clickedItem).x
    const windowHalf = window.innerWidth / 2
    const isLeftSide = centerX < windowHalf

    if (isLeftSide) {
      panel.classList.add("panel--right")
    } else {
      panel.classList.remove("panel--right")
    }
  }

  extractItemData(item) {
    const imgDiv = item.querySelector(".grid__item-image")
    const caption = item.querySelector("figcaption")
    return {
      imgURL: imgDiv.style.backgroundImage,
      title: caption.querySelector("h3").textContent,
      desc: caption.querySelector("p")?.textContent || "Model description",
    }
  }

  setPanelContent({ imgURL, title, desc }) {
    const panel = this.shadowRoot.querySelector(".panel")
    panel.querySelector(".panel__img").style.backgroundImage = imgURL
    panel.querySelector("h3").textContent = title
    panel.querySelector("p").textContent = desc
  }

  getElementCenter(el) {
    const rect = el.getBoundingClientRect()
    return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
  }

  computeStaggerDelays(clickedItem, items) {
    const baseCenter = this.getElementCenter(clickedItem)
    const distances = Array.from(items).map((el) => {
      const center = this.getElementCenter(el)
      return Math.hypot(center.x - baseCenter.x, center.y - baseCenter.y)
    })
    const max = Math.max(...distances)
    return distances.map((d) => (d / max) * 0.3)
  }

  animateGridItems(items, clickedItem, delays) {
    const clipPaths = this.getClipPathsForDirection("top-bottom")

    gsap.to(items, {
      opacity: 0,
      scale: (i, el) => (el === clickedItem ? 1 : 0.8),
      duration: (i, el) => (el === clickedItem ? 0.7 : 0.3),
      ease: "sine",
      clipPath: (i, el) => (el === clickedItem ? clipPaths.from : "none"),
      delay: (i) => delays[i],
    })
  }

  animateTransition(startEl, endEl, imgURL, config) {
    this.hideFrame()

    const path = this.generateMotionPath(
      startEl.getBoundingClientRect(),
      endEl.getBoundingClientRect(),
      config.steps || 6,
    )

    const clipPaths = this.getClipPathsForDirection(config.clipPathDirection || "top-bottom")
    const fragment = document.createDocumentFragment()

    path.forEach((step, index) => {
      const mover = document.createElement("div")
      mover.className = "mover"
      this.setMoverStyle(mover, step, index, imgURL, config)
      fragment.appendChild(mover)

      const delay = index * (config.stepInterval || 0.05)
      gsap
        .timeline({ delay })
        .fromTo(
          mover,
          { opacity: 0.4, clipPath: clipPaths.hide },
          {
            opacity: 1,
            clipPath: clipPaths.reveal,
            duration: config.stepDuration || 0.35,
            ease: config.moverEnterEase || "sine.in",
          },
        )
        .to(
          mover,
          {
            clipPath: clipPaths.from,
            duration: config.stepDuration || 0.35,
            ease: config.moverExitEase || "sine",
          },
          `+=${config.moverPauseBeforeExit || 0.14}`,
        )
    })

    document.body.appendChild(fragment)
    this.scheduleCleanup(document.querySelectorAll(".mover"), config)
    this.revealPanel(endEl, config)
  }

  setMoverStyle(mover, step, index, imgURL, config) {
    Object.assign(mover.style, {
      backgroundImage: imgURL,
      position: "fixed",
      left: step.left + "px",
      top: step.top + "px",
      width: step.width + "px",
      height: step.height + "px",
      clipPath: this.getClipPathsForDirection(config.clipPathDirection || "top-bottom").from,
      zIndex: 1000 + index,
      backgroundPosition: "50% 50%",
      backgroundSize: "cover",
      transform: `rotateZ(${(Math.random() - 0.5) * (config.rotationRange || 0) * 2}deg)`,
      mixBlendMode: config.moverBlendMode || "normal",
    })
  }

  scheduleCleanup(movers, config) {
    const cleanupDelay =
      (config.steps || 6) * (config.stepInterval || 0.05) +
      (config.stepDuration || 0.35) * 2 +
      (config.moverPauseBeforeExit || 0.14)

    gsap.delayedCall(cleanupDelay, () => {
      movers.forEach((m) => m.remove())
    })
  }

  revealPanel(endImg, config) {
    const panel = this.shadowRoot.querySelector(".panel")
    const panelContent = this.shadowRoot.querySelector(".panel__content")
    const clipPaths = this.getClipPathsForDirection(config.clipPathDirection || "top-bottom")

    gsap.set(panelContent, { opacity: 0 })
    gsap.set(panel, { opacity: 1, pointerEvents: "auto" })

    gsap
      .timeline({
        defaults: {
          duration: (config.stepDuration || 0.35) * (config.panelRevealDurationFactor || 2),
          ease: config.panelRevealEase || "sine.inOut",
        },
      })
      .fromTo(
        endImg,
        { clipPath: clipPaths.hide },
        {
          clipPath: clipPaths.reveal,
          pointerEvents: "auto",
          delay: (config.steps || 6) * (config.stepInterval || 0.05),
        },
      )
      .fromTo(
        panelContent,
        { y: 25 },
        {
          duration: 1,
          ease: "expo",
          opacity: 1,
          y: 0,
          delay: (config.steps || 6) * (config.stepInterval || 0.05),
          onComplete: () => {
            this.isAnimating = false
            this.isPanelOpen = true
          },
        },
        "<-=.2",
      )
  }

  generateMotionPath(startRect, endRect, steps) {
    const path = []
    const fullSteps = steps + 2
    const startCenter = {
      x: startRect.left + startRect.width / 2,
      y: startRect.top + startRect.height / 2,
    }
    const endCenter = {
      x: endRect.left + endRect.width / 2,
      y: endRect.top + endRect.height / 2,
    }

    for (let i = 0; i < fullSteps; i++) {
      const t = i / (fullSteps - 1)
      const width = this.lerp(startRect.width, endRect.width, t)
      const height = this.lerp(startRect.height, endRect.height, t)
      const centerX = this.lerp(startCenter.x, endCenter.x, t)
      const centerY = this.lerp(startCenter.y, endCenter.y, t)

      path.push({
        left: centerX - width / 2,
        top: centerY - height / 2,
        width,
        height,
      })
    }

    return path.slice(1, -1)
  }

  lerp(a, b, t) {
    return a + (b - a) * t
  }

  getClipPathsForDirection(direction) {
    switch (direction) {
      case "bottom-top":
        return {
          from: "inset(0% 0% 100% 0%)",
          reveal: "inset(0% 0% 0% 0%)",
          hide: "inset(100% 0% 0% 0%)",
        }
      case "left-right":
        return {
          from: "inset(0% 100% 0% 0%)",
          reveal: "inset(0% 0% 0% 0%)",
          hide: "inset(0% 0% 0% 100%)",
        }
      case "right-left":
        return {
          from: "inset(0% 0% 0% 100%)",
          reveal: "inset(0% 0% 0% 0%)",
          hide: "inset(0% 100% 0% 0%)",
        }
      case "top-bottom":
      default:
        return {
          from: "inset(100% 0% 0% 0%)",
          reveal: "inset(0% 0% 0% 0%)",
          hide: "inset(0% 0% 100% 0%)",
        }
    }
  }

  hideFrame() {
    const frames = document.querySelectorAll(".frame")
    gsap.to(frames, {
      opacity: 0,
      duration: 0.5,
      ease: "sine.inOut",
      pointerEvents: "none",
    })
  }

  showFrame() {
    const frames = document.querySelectorAll(".frame")
    gsap.to(frames, {
      opacity: 1,
      duration: 0.5,
      ease: "sine.inOut",
      pointerEvents: "auto",
    })
  }

  resetView() {
    if (this.isAnimating) return
    this.isAnimating = true

    const panel = this.shadowRoot.querySelector(".panel")
    const allItems = this.shadowRoot.querySelectorAll(".grid__item")
    const delays = this.computeStaggerDelays(this.currentItem, allItems)

    gsap
      .timeline({
        defaults: { duration: 0.35, ease: "expo" },
        onComplete: () => {
          panel.classList.remove("panel--right")
          this.isAnimating = false
          this.isPanelOpen = false
        },
      })
      .to(panel, { opacity: 0 })
      .add(() => this.showFrame(), 0)
      .set(panel, { opacity: 0, pointerEvents: "none" })
      .set(panel.querySelector(".panel__img"), {
        clipPath: "inset(0% 0% 100% 0%)",
      })
      .set(allItems, { clipPath: "none", opacity: 0, scale: 0.8 }, 0)
      .to(
        allItems,
        {
          opacity: 1,
          scale: 1,
          delay: (i) => delays[i],
        },
        ">",
      )
  }

  _getEffectConfig(effectType) {
    const configs = {
      effect1: {
        steps: 6,
        rotationRange: 3,
        stepInterval: 0.08,
        moverPauseBeforeExit: 0.15,
        moverEnterEase: "power2.out",
        moverExitEase: "power2.in",
        panelRevealEase: "power2.out",
      },
      effect2: {
        steps: 8,
        rotationRange: 7,
        stepInterval: 0.05,
        moverPauseBeforeExit: 0.25,
        moverEnterEase: "sine.in",
        moverExitEase: "power2",
        panelRevealEase: "power2",
      },
      effect3: {
        steps: 10,
        stepDuration: 0.3,
        pathMotion: "sine",
        sineAmplitude: 300,
        clipPathDirection: "left-right",
        autoAdjustHorizontalClipPath: true,
        stepInterval: 0.07,
        moverPauseBeforeExit: 0.3,
        moverEnterEase: "sine",
        moverExitEase: "power4",
        panelRevealEase: "power4",
        panelRevealDurationFactor: 4,
      },
      effect4: {
        steps: 4,
        clipPathDirection: "bottom-top",
        stepDuration: 0.25,
        stepInterval: 0.06,
        moverPauseBeforeExit: 0.2,
        moverEnterEase: "sine.in",
        moverExitEase: "expo",
        panelRevealEase: "expo",
        panelRevealDurationFactor: 4,
        moverBlendMode: "hard-light",
      },
    }
    return configs[effectType] || configs.effect1
  }

  _generateImages() {
    const imageData = [
      { title: "Drift — A04", model: "Amelia Hart" },
      { title: "Veil — K18", model: "Irina Volkova" },
      { title: "Ember — M45", model: "Charlotte Byrne" },
      { title: "Gleam — S12", model: "Anastasia Morozova" },
      { title: "Bloom — J29", model: "Eva Ramirez" },
      { title: "Whisper — V87", model: "Milana Petrova" },
      { title: "Trace — Z05", model: "Sofia Carter" },
      { title: "Flicker — Q62", model: "Alina Kuznetsova" },
      { title: "Grain — H71", model: "Isabella Novak" },
      { title: "Pulse — B90", model: "Daria Sokolova" },
      { title: "Mist — L36", model: "Victoria Fields" },
      { title: "Shard — Y22", model: "Natalia Popova & Emily Stone" },
      { title: "Vapor — X79", model: "Yulia Orlova" },
      { title: "Glow — F13", model: "Camila Ford" },
      { title: "Flux — N48", model: "Sofia Mikhailova" },
      { title: "Spire — C65", model: "Ava Bennett" },
      { title: "Driftwood — W50", model: "Valeria Smirnova" },
      { title: "Fold — T81", model: "Emma Chase" },
      { title: "Shroud — E26", model: "Marina Belova" },
      { title: "Ripple — P34", model: "Chloe Martin" },
      { title: "Fray — U07", model: "Alexandra Dmitrieva" },
      { title: "Wane — R52", model: "Isabella Moore" },
      { title: "Tide — S33", model: "Ksenia Egorova" },
      { title: "Rift — G08", model: "Mia Anderson" },
      { title: "Spool — H94", model: "Anna Mikhailova" },
      { title: "Glitch — M70", model: "Emily Brown" },
      { title: "Slip — F02", model: "Ekaterina Ivanova" },
      { title: "Husk — C15", model: "Olivia Reed" },
      { title: "Blur — V86", model: "Sofia Lebedeva" },
      { title: "Fracture — A63", model: "Harper Gray" },
      { title: "Mote — Y39", model: "Elizaveta Petrova" },
      { title: "Aura — K21", model: "Lily Cooper" },
      { title: "Whorl — B45", model: "Anastasia Volkova" },
    ]

    return imageData.map((data, index) => ({
      id: index + 1,
      src: `/assets/img${index + 1}.webp`,
      ...data,
    }))
  }

  render() {
    const config = this._getEffectConfig(this.effectType)
    const itemsToShow = 16

    return html`
      <div class="grid">
        ${this.images.slice(0, itemsToShow).map((image, index) => {
          const dataAttrs = this._getDataAttributes(this.effectType)
          return html`
            <figure 
              class="grid__item" 
              role="img" 
              aria-labelledby="caption${index + 1}"
              ${dataAttrs}
            >
              <div 
                class="grid__item-image" 
                style="background-image: url(${image.src})"
              ></div>
              <figcaption class="grid__item-caption" id="caption${index + 1}">
                <h3>${image.title}</h3>
                <p>Model: ${image.model}</p>
              </figcaption>
            </figure>
          `
        })}
      </div>

      <!-- Panel for large preview -->
      <figure class="panel" role="img" aria-labelledby="panel-caption">
        <div class="panel__img"></div>
        <figcaption class="panel__content" id="panel-caption">
          <h3>murmur—207</h3>
          <p>
            Beneath the soft static of this lies a fragmented recollection of motion—faded pulses echoing through
            time-warped layers of light and silence. A stillness wrapped in artifact.
          </p>
          <button type="button" class="panel__close" aria-label="Close preview">Close</button>
        </figcaption>
      </figure>
    `
  }

  _getDataAttributes(effectType) {
    const configs = {
      effect2:
        'data-steps="8" data-rotation-range="7" data-step-interval="0.05" data-mover-pause-before-exit="0.25" data-mover-enter-ease="sine.in" data-mover-exit-ease="power2" data-panel-reveal-ease="power2"',
      effect3:
        'data-steps="10" data-step-duration="0.3" data-path-motion="sine" data-sine-amplitude="300" data-clip-path-direction="left-right" data-step-interval="0.07" data-mover-pause-before-exit="0.3" data-mover-enter-ease="sine" data-mover-exit-ease="power4" data-panel-reveal-ease="power4" data-panel-reveal-duration-factor="4"',
      effect4:
        'data-steps="4" data-clip-path-direction="bottom-top" data-step-duration="0.25" data-step-interval="0.06" data-mover-pause-before-exit="0.2" data-mover-enter-ease="sine.in" data-mover-exit-ease="expo" data-panel-reveal-ease="expo" data-panel-reveal-duration-factor="4" data-mover-blend-mode="hard-light"',
    }
    return configs[effectType] || ""
  }
}

customElements.define("tympanus-grid", TympanusGrid)
