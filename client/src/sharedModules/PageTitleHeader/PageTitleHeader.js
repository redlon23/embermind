import React, { Component } from 'react'

const headerStyle = {
	height: '3rem',
	backgroundColor: '#1A1C25',
	color: '#EBEBEB',
	display: 'flex',
	alignItems: 'center',
	fontSize: '16pt',
	padding: '1rem'
}

class PageTitleHeader extends Component {
	render() {
		return <div style={headerStyle}>Account Settings</div>
	}
}

export default PageTitleHeader
