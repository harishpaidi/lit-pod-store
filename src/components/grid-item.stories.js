import "./grid-item.js"

export default {
  title: "Components/GridItem",
  component: "grid-item",
  argTypes: {
    config: {
      control: { type: "object" },
    },
  },
}

export const Default = {
  render: (args) => `
    <grid-item 
      .image='${JSON.stringify(args.image)}'
      .config='${JSON.stringify(args.config)}'
      caption-id="test-caption"
    ></grid-item>
  `,
  args: {
    image: {
      id: 1,
      src: "/placeholder.svg?height=400&width=320&text=Test+Image",
      title: "Test — A01",
      model: "Test Model",
    },
    config: {
      steps: 6,
      rotationRange: 3,
      stepInterval: 0.08,
    },
  },
}

export const Effect2 = {
  render: (args) => `
    <grid-item 
      .image='${JSON.stringify(args.image)}'
      .config='${JSON.stringify(args.config)}'
      caption-id="test-caption-2"
    ></grid-item>
  `,
  args: {
    image: {
      id: 2,
      src: "/placeholder.svg?height=400&width=320&text=Effect+2",
      title: "Effect 2 — B02",
      model: "Test Model 2",
    },
    config: {
      steps: 8,
      rotationRange: 7,
      stepInterval: 0.05,
    },
  },
}
