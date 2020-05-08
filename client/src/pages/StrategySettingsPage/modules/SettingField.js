import React, { Component } from 'react'

const camelToTitle = (camelCase) => camelCase.replace(/([A-Z])/g, (match) => ` ${match}`).replace(/^./, (match) => match.toUpperCase())

class SettingField extends Component {
	render() {
		return (
			<div>
				<Form.Item
					className={this.props.setting}
					name={this.props.setting}
					label={camelToTitle(this.props.setting)}
					onChange={this.handleSaveInputToState}
				>
					<InputNumber parser={this.numInputRegEx} style={fieldStyle} />
				</Form.Item>
			</div>
		)
	}
}

export default SettingField
