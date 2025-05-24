import "./three-d-tshirt.js"

export default {
  title: "Components/ThreeDTshirt",
  component: "three-d-tshirt",
  argTypes: {
    productType: {
      control: { type: "select" },
      options: ["tshirt", "hoodie", "sleevie", "cap"],
    },
    theme: {
      control: { type: "select" },
      options: ["light", "dark", "neon"],
    },
  },
}

export const TShirt = {
  render: (args) => `
    <three-d-tshirt 
      product-type="${args.productType}" 
      theme="${args.theme}"
      custom-text="${args.customText}"
    ></three-d-tshirt>
  `,
  args: {
    productType: "tshirt",
    theme: "light",
    customText: "",
  },
}

export const Hoodie = {
  render: () => `<three-d-tshirt product-type="hoodie"></three-d-tshirt>`,
}

export const WithCustomText = {
  render: () => `<three-d-tshirt product-type="tshirt" custom-text="Hello World!"></three-d-tshirt>`,
}

export const DarkTheme = {
  render: () => `<three-d-tshirt product-type="tshirt" theme="dark"></three-d-tshirt>`,
}

export const NeonTheme = {
  render: () => `<three-d-tshirt product-type="tshirt" theme="neon"></three-d-tshirt>`,
}
