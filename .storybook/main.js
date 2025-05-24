export default {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx|mdx)"],
  addons: ["@storybook/addon-essentials", "@storybook/addon-links", "@storybook/addon-controls"],
  framework: {
    name: "@storybook/web-components-vite",
    options: {},
  },
  core: {
    builder: "@storybook/builder-vite",
  },
}
