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
			'@white': '#f1eeee',
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
			'@text-color-secondary': '@white',
			'@text-color-dark': '@white',
			'@text-color-dark-secondary': '@white',

			// Component Styles
			// '@body-background': '@primary-1',
			'@component-background': '@white',
			'@body-background': '@white',
			'@card-background': '@primary-2',
			'@card-head-color': '@white',
			'@border-color-base': '@primary-3',
			'@table-bg': '@primary-2'
		}
	})
)
