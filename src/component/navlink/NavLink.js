import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {
    TabBar
} from 'antd-mobile';
import { withRouter } from 'react-router-dom';

@withRouter

export default class NavLinkBar extends Component {

    static propTypes = {
        data:PropTypes.array.isRequired
    }

    render() {
        const navList = this.props.data.filter(v => !v.hide);
        return (
            <TabBar>
                {navList.map(v => (
                    <TabBar.Item
                        key={v.path}
                        title={v.text}
                        icon={{uri:require(`../../res/images/${v.icon}.png`)}}
                        selectedIcon={{uri:require(`../../res/images/${v.icon}-active.png`)}}
                        selected={this.props.location.pathname === v.path}
                        onPress={() => this.props.history.push(v.path)}
                    >
                    </TabBar.Item>
                ))}
            </TabBar>
        )
    }
}