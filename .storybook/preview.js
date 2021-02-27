import { muiTheme } from 'storybook-addon-material-ui'

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}

export const decorators = [
	muiTheme()
];