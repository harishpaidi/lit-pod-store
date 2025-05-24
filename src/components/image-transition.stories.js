import "./image-transition.js"

export default {
  title: "Components/ImageTransition",
  component: "image-transition",
  parameters: {
    layout: "fullscreen",
  },
}

export const Default = {
  render: () => `
    <div style="width: 100vw; height: 100vh; position: relative;">
      <image-transition></image-transition>
    </div>
  `,
}

export const Mobile = {
  render: () => `
    <div style="width: 375px; height: 667px; position: relative; margin: 0 auto;">
      <image-transition></image-transition>
    </div>
  `,
  parameters: {
    viewport: {
      defaultViewport: "iphone6",
    },
  },
}
