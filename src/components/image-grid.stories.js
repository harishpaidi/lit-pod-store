import "./image-grid.js"

export default {
  title: "Components/ImageGrid",
  component: "image-grid",
  parameters: {
    layout: "fullscreen",
  },
}

export const Effect1 = {
  render: () => `
    <div style="padding: 2rem; background: #fff;">
      <image-grid effect-type="effect1"></image-grid>
    </div>
  `,
}

export const Effect2 = {
  render: () => `
    <div style="padding: 2rem; background: #fff;">
      <image-grid effect-type="effect2"></image-grid>
    </div>
  `,
}

export const Effect3 = {
  render: () => `
    <div style="padding: 2rem; background: #fff;">
      <image-grid effect-type="effect3"></image-grid>
    </div>
  `,
}

export const Effect4 = {
  render: () => `
    <div style="padding: 2rem; background: #fff;">
      <image-grid effect-type="effect4"></image-grid>
    </div>
  `,
}
