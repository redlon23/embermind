const { override, fixBabelImports, addLessLoader } = require('customize-cra')

module.exports = override(
	fixBabelImports('import', {
		libraryName: 'antd',
		libraryDirectory: 'es',
		style: true
	}),
	addLessLoader({
		javascriptEnabled: true,
		modifyVars: {
			// Custom Style Colors
			'@white': '#fcfcfc',
			'@black': '#020202',
			'@primary-1': '#1D222C',
			'@primary-2': '#1A1C25',
			'@primary-3': '#1A3554',
			'@primary-4': '#848EB7',
			'@primary-5': '#A6ACBE',
			'@primary-6': '#DBDBDB',
			'@primary-7': '#0DDD22',
			'@primary-8': '#B40500',
			'@primary-9': '#FFB800',
			'@primary-10': '#006BB3',

			// Text Styles
			'@text-color': '@black',
			'@text-color-secondary': '@primary-6',
			'@text-color-dark': '@primary-5',
			'@text-color-dark-secondary': '@primary-4',

			// Component Styles
			// '@body-background': '@primary-1',
			'@component-background': '@white',
			'@body-background': '@white',
			'@btn-primary-bg': '@primary-5',
			'@card-background': '@primary-2'
		}
	})
)
