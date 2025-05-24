import "./product-selector.js"

export default {
  title: "Components/ProductSelector",
  component: "product-selector",
  argTypes: {
    selected: {
      control: { type: "select" },
      options: ["tshirt", "hoodie", "sleevie", "cap"],
    },
  },
}

export const Default = {
  render: (args) => `<product-selector selected="${args.selected}"></product-selector>`,
  args: {
    selected: "tshirt",
  },
}

export const Hoodie = {
  render: () => `<product-selector selected="hoodie"></product-selector>`,
}

export const Cap = {
  render: () => `<product-selector selected="cap"></product-selector>`,
}
