import React, { Component } from 'react'
import './PageTitleHeader.scss'

class PageTitleHeader extends Component {
	render() {
		return <div className="PageTitleHeader">{this.props.header}</div>
	}
}

export default PageTitleHeader
