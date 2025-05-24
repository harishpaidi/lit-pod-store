import "./product-page.js"

export default {
  title: "Pages/ProductPage",
  component: "product-page",
  parameters: {
    layout: "fullscreen",
  },
}

export const Default = {
  render: () => `<product-page></product-page>`,
}

export const DarkTheme = {
  render: () => `<product-page theme="dark"></product-page>`,
}

export const NeonTheme = {
  render: () => `<product-page theme="neon"></product-page>`,
}
