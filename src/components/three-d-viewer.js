import { LitElement, html, css } from "lit"
import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"

export class ThreeDViewer extends LitElement {
  static properties = {
    productType: { type: String },
    userImage: { type: String },
    customText: { type: String },
    theme: { type: String },
  }

  static styles = css`
    :host {
      display: block;
      width: 100%;
      height: 400px;
      border-radius: 12px;
      overflow: hidden;
      position: relative;
    }

    .viewer-container {
      width: 100%;
      height: 100%;
      position: relative;
      background: var(--viewer-bg, linear-gradient(135deg, #667eea 0%, #764ba2 100%));
    }

    .loading {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: white;
      font-size: 1.1rem;
      font-weight: 600;
    }

    canvas {
      width: 100% !important;
      height: 100% !important;
    }

    /* Theme variations */
    :host([theme="dark"]) .viewer-container {
      --viewer-bg: linear-gradient(135deg, #2d3748 0%, #1a202c 100%);
    }

    :host([theme="neon"]) .viewer-container {
      --viewer-bg: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
    }
  `

  constructor() {
    super()
    this.productType = "tshirt"
    this.userImage = ""
    this.customText = ""
    this.theme = "light"
    this.scene = null
    this.camera = null
    this.renderer = null
    this.controls = null
    this.model = null
    this.isLoading = true
  }

  firstUpdated() {
    this.initThreeJS()
    this.loadModel()
  }

  updated(changedProperties) {
    if (changedProperties.has("productType")) {
      this.loadModel()
    }
    if (changedProperties.has("userImage") || changedProperties.has("customText")) {
      this.updateTexture()
    }
  }

  initThreeJS() {
    const container = this.shadowRoot.querySelector(".viewer-container")

    // Scene
    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color(0x000000)

    // Camera
    this.camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000)
    this.camera.position.set(0, 0, 3)

    // Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    this.renderer.setSize(container.clientWidth, container.clientHeight)
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.shadowMap.enabled = true
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
    container.appendChild(this.renderer.domElement)

    // Controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.enableDamping = true
    this.controls.dampingFactor = 0.05
    this.controls.enableZoom = true
    this.controls.enablePan = false

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    this.scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(5, 5, 5)
    directionalLight.castShadow = true
    this.scene.add(directionalLight)

    // Start render loop
    this.animate()

    // Handle resize
    window.addEventListener("resize", () => this.onWindowResize())
  }

  async loadModel() {
    if (!this.scene) return

    // Remove existing model
    if (this.model) {
      this.scene.remove(this.model)
    }

    this.isLoading = true
    this.requestUpdate()

    try {
      const loader = new GLTFLoader()
      const gltf = await new Promise((resolve, reject) => {
        loader.load("/models/shirt_baked.glb", resolve, undefined, reject)
      })

      this.model = gltf.scene
      this.model.scale.setScalar(1)
      this.model.position.set(0, 0, 0)

      // Enable shadows
      this.model.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true
          child.receiveShadow = true
        }
      })

      this.scene.add(this.model)
      this.updateTexture()
      this.isLoading = false
      this.requestUpdate()
    } catch (error) {
      console.error("Error loading 3D model:", error)
      this.isLoading = false
      this.requestUpdate()
    }
  }

  updateTexture() {
    if (!this.model) return

    // Create canvas for custom texture
    const canvas = document.createElement("canvas")
    canvas.width = 512
    canvas.height = 512
    const ctx = canvas.getContext("2d")

    // Fill with white background
    ctx.fillStyle = "#ffffff"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw user image if available
    if (this.userImage) {
      const img = new Image()
      img.crossOrigin = "anonymous"
      img.onload = () => {
        const size = Math.min(canvas.width * 0.6, canvas.height * 0.6)
        const x = (canvas.width - size) / 2
        const y = (canvas.height - size) / 2 - 50
        ctx.drawImage(img, x, y, size, size)

        // Add text below image
        this.addTextToCanvas(ctx, canvas)
        this.applyTextureToModel(canvas)
      }
      img.src = this.userImage
    } else {
      // Just add text
      this.addTextToCanvas(ctx, canvas)
      this.applyTextureToModel(canvas)
    }
  }

  addTextToCanvas(ctx, canvas) {
    if (!this.customText) return

    ctx.fillStyle = "#000000"
    ctx.font = "bold 32px Arial"
    ctx.textAlign = "center"

    const lines = this.customText.split("\n").slice(0, 3) // Max 3 lines
    const lineHeight = 40
    const startY = canvas.height * 0.7

    lines.forEach((line, index) => {
      ctx.fillText(line, canvas.width / 2, startY + index * lineHeight)
    })
  }

  applyTextureToModel(canvas) {
    if (!this.model) return

    const texture = new THREE.CanvasTexture(canvas)
    texture.flipY = false

    this.model.traverse((child) => {
      if (child.isMesh && child.material) {
        // Apply texture to the main material
        if (child.material.map) {
          child.material.map = texture
        } else {
          child.material = new THREE.MeshLambertMaterial({ map: texture })
        }
        child.material.needsUpdate = true
      }
    })
  }

  animate() {
    requestAnimationFrame(() => this.animate())

    if (this.controls) {
      this.controls.update()
    }

    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera)
    }
  }

  onWindowResize() {
    if (!this.renderer || !this.camera) return

    const container = this.shadowRoot.querySelector(".viewer-container")
    if (!container) return

    this.camera.aspect = container.clientWidth / container.clientHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(container.clientWidth, container.clientHeight)
  }

  disconnectedCallback() {
    super.disconnectedCallback()

    // Cleanup Three.js resources
    if (this.renderer) {
      this.renderer.dispose()
    }
    if (this.controls) {
      this.controls.dispose()
    }

    window.removeEventListener("resize", () => this.onWindowResize())
  }

  render() {
    return html`
      <div class="viewer-container">
        ${this.isLoading ? html`<div class="loading">Loading 3D Model...</div>` : ""}
      </div>
    `
  }
}

customElements.define("three-d-viewer", ThreeDViewer)
