import { LitElement, html, css } from "lit"

export class HomePage extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 100%;
      min-height: 100vh;
    }

    main {
      padding: var(--page-padding);
    }

    .frame {
      font-size: var(--font-size-l);
      font-weight: 500;
      display: grid;
      z-index: 1000;
      width: 100%;
      position: relative;
      grid-column-gap: var(--c-gap);
      grid-row-gap: 0.5rem;
      pointer-events: none;
      justify-items: start;
      grid-template-columns: auto;
      grid-template-areas:
        'title'
        'links'
        'tags'
        'sponsor';
    }

    .frame a,
    .frame button {
      pointer-events: auto;
      color: var(--color-text);
    }

    .frame__title {
      font-size: inherit;
      margin: 0;
      font-weight: inherit;
      grid-area: title;
    }

    .frame__tags,
    .frame__links {
      grid-area: tags;
      display: flex;
      gap: 0.5rem;
      align-items: start;
    }

    .frame__links {
      grid-area: links;
    }

    .frame--footer {
      display: flex;
      min-height: 300px;
      align-items: end;
      justify-content: space-between;
    }

    .heading {
      display: flex;
      flex-wrap: wrap;
      align-items: end;
      justify-content: space-between;
      gap: 1rem;
      margin: 10rem 0 1rem;
    }

    .heading__title {
      font-family: 'owners-xnarrow', sans-serif;
      font-weight: 700;
      text-transform: uppercase;
      font-size: var(--font-size-xl);
      margin: 0;
      line-height: 0.77;
    }

    .heading__meta::after {
      content: '·';
      font-family: serif;
      font-size: 3.5rem;
      line-height: 0.2;
      vertical-align: middle;
      margin-left: 0.5rem;
      display: inline-flex;
    }

    .cta-button {
      background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
      border: none;
      padding: 1rem 2rem;
      font-size: 1.2rem;
      font-weight: 600;
      color: white;
      border-radius: 50px;
      cursor: pointer;
      transition: transform 0.3s ease;
      text-decoration: none;
      display: inline-block;
      margin: 2rem 0;
      pointer-events: auto;
    }

    .cta-button:hover {
      transform: scale(1.05);
    }

    @media screen and (min-width: 65em) {
      .frame {
        grid-template-columns: repeat(var(--column-count), minmax(var(--column), 1fr));
        grid-template-areas: 'title title links links tags tags ... sponsor';
      }
    }
  `

  render() {
    return html`
      <main>
        <header class="frame">
          <h1 class="frame__title">Custom POD Store</h1>
          <nav class="frame__links">
            <a class="line" href="https://tympanus.net/codrops/?p=92571">More info,</a>
            <a class="line" href="https://github.com/codrops/RepeatingImageTransition/">Code,</a>
            <a class="line" href="https://tympanus.net/codrops/demos/">All demos</a>
          </nav>
          <nav class="frame__tags">
            <a class="line" href="#transition">transition,</a>
            <a class="line" href="#animation">animation,</a>
            <a class="line" href="#grid">grid</a>
          </nav>
        </header>

        <div class="heading">
          <h2 class="heading__title">Shane Weber</h2>
          <span class="heading__meta">
            effect 01: straight linear paths, smooth easing, clean timing, minimal rotation.
          </span>
        </div>

        <tympanus-grid effect-type="effect1"></tympanus-grid>

        <div class="heading">
          <h2 class="heading__title">Manika Jorge</h2>
          <span class="heading__meta">effect 02: Adjusts mover count, rotation, timing, and animation feel.</span>
        </div>

        <tympanus-grid effect-type="effect2"></tympanus-grid>

        <div class="heading">
          <h2 class="heading__title">Angela Wong</h2>
          <span class="heading__meta">effect 03: Big arcs, smooth start, powerful snap, slow reveal.</span>
        </div>

        <tympanus-grid effect-type="effect3"></tympanus-grid>

        <div class="heading">
          <h2 class="heading__title">Kaito Nakamo</h2>
          <span class="heading__meta">effect 04: Quick upward motion with bold blending and smooth slow reveal.</span>
        </div>

        <tympanus-grid effect-type="effect4"></tympanus-grid>

        <div class="heading">
          <h2 class="heading__title">Start Creating</h2>
          <span class="heading__meta">Design your perfect custom t-shirt with our interactive designer.</span>
        </div>

        <a href="/product" class="cta-button" @click=${this._navigateToProduct}>
          Open Designer
        </a>

        <footer class="frame frame--footer">
          <span>
            Made by
            <a href="https://codrops.com/" class="line">@codrops</a>
          </span>
          <span><a href="#demos" class="line">All demos</a></span>
        </footer>
      </main>
    `
  }

  _navigateToProduct(e) {
    e.preventDefault()
    window.history.pushState({}, "", "/product")
    window.dispatchEvent(new PopStateEvent("popstate"))
  }
}

customElements.define("home-page", HomePage)
