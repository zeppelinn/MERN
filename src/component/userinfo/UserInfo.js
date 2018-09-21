import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Card,
    WhiteSpace,
    WingBlank
} from 'antd-mobile'

class UserInfo extends Component {

    static propTypes = {
        userList:PropTypes.array.isRequired
    }

    render() {
        const Header = Card.Header;
        const Body = Card.Body;
        return (
            <WingBlank>
                {this.props.userList.map(v => (
                    v.avatar ? 
                    (<div style={{paddingTop:15}} key={v.title}>
                        <Card>
                            <Header
                                title={v.user}
                                thumb={require(`../../res/images/${v.avatar}.png`)}
                                extra={<span>{v.title}</span>}
                            />
                            <Body style={{marginLeft:5}} >
                                {v.type === 'boss' ? <div>公司: {v.company}</div> : null}
                                {v.desc.split('\n').map(d => (
                                    <div key={d}>{d}</div>
                                ))}
                                {v.type === 'boss' ? <div>薪资: {v.salary}</div> : null}
                            </Body>
                        </Card>
                        <WhiteSpace/>
                    </div>) :
                    null
                ))}
            </WingBlank>
        );
    }
}

export default UserInfo;