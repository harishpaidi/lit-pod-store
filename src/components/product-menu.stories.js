import "./product-menu.js"

export default {
  title: "Components/ProductMenu",
  component: "product-menu",
}

export const Default = {
  render: () => `<product-menu></product-menu>`,
}

export const WithSelection = {
  render: () => `<product-menu selected="hoodie"></product-menu>`,
}
