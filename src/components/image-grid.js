import { LitElement, html, css } from "lit"

export class ImageGrid extends LitElement {
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
  `

  constructor() {
    super()
    this.effectType = "effect1"
    this.images = this._generateImages()
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
      src: `https://picsum.photos/320/400?random=${index + 1}`,
      ...data,
    }))
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

  render() {
    const config = this._getEffectConfig(this.effectType)
    const itemsToShow = this.effectType === "effect1" ? 16 : 16

    return html`
      <div class="grid">
        ${this.images.slice(0, itemsToShow).map(
          (image, index) => html`
            <grid-item
              .image=${image}
              .config=${config}
              .captionId=${"caption" + (index + 1)}
            ></grid-item>
          `,
        )}
      </div>
    `
  }
}

customElements.define("image-grid", ImageGrid)
