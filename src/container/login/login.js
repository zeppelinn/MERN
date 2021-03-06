import React, { Component } from 'react'
import Logo from '../../component/logo/logo';
import {
    List,
    InputItem,
    WingBlank,
    WhiteSpace,
    Button,
    Flex
} from 'antd-mobile';
import {Redirect} from 'react-router-dom';
import { connect } from 'react-redux'
import { login } from '../../redux/user.redux';
import formModel from '../../component/formModel/formModel';

@connect(
    state => state.user,
    {login}
)
@formModel
export default class Login extends Component {
    constructor(props){
        super(props);
        this.register = this.register.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin = () => {
        this.props.login(this.props.state);
    }

    register = () => {
        this.props.history.push('/register')
    }

    render() {
        return (
        <div>
            {this.props.redirectTo && this.props.redirectTo !== '/login' ? <Redirect to={this.props.redirectTo} ></Redirect> : null}
            <Logo></Logo>
            {this.props.msg ?  <p className="error_msg">{this.props.msg}</p> : <p className="error_msg"></p> }
            <WingBlank>
                <List>
                    <InputItem
                        onChange={text => this.props.handleInputChange('user',text)}
                    >
                        用户
                    </InputItem>
                    <WhiteSpace/>
                    <InputItem
                        type='password'
                        onChange={text => this.props.handleInputChange('pwd',text)}
                    >
                        密码
                    </InputItem>
                </List>
                <Flex direction='row' justify='center' >
                    <Button style={{marginLeft:20, marginRight:20, width:160, marginTop:20}} onClick={this.register} type='primary' >
                        注册
                    </Button>
                    <Button style={{marginLeft:20, marginRight:20, marginTop:20,width:160}} type='primary' onClick={this.handleLogin}>
                        登录
                    </Button>
                    <WhiteSpace/>
                </Flex>
            </WingBlank>
        </div>
        )
    }
}
