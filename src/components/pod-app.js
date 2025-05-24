import { LitElement, html, css } from "lit"
import { Router } from "@vaadin/router"
import Lenis from "@studio-freight/lenis"
import gsap from "gsap"

export class PodApp extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 100%;
      min-height: 100vh;
    }
  `

  firstUpdated() {
    const router = new Router(this.shadowRoot.querySelector("#outlet"))
    router.setRoutes([
      { path: "/", component: "home-page" },
      { path: "/product", component: "product-page" },
      { path: "(.*)", redirect: "/" },
    ])

    // Initialize smooth scrolling
    this.initSmoothScrolling()

    // Remove loading class after initialization
    setTimeout(() => {
      document.body.classList.remove("loading")
    }, 1000)
  }

  initSmoothScrolling() {
    if (typeof Lenis !== "undefined") {
      const lenis = new Lenis({ lerp: 0.1 })

      if (typeof gsap !== "undefined") {
        gsap.ticker.add((time) => {
          lenis.raf(time * 1000)
        })
        gsap.ticker.lagSmoothing(0)
      }
    }
  }

  render() {
    return html`
      <div id="outlet"></div>
      <theme-switcher></theme-switcher>
    `
  }
}

customElements.define("pod-app", PodApp)
