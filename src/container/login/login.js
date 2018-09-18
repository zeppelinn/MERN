import React, { Component } from 'react'
import Logo from '../../component/logo/logo';
import {
    List,
    InputItem,
    WingBlank,
    WhiteSpace,
    Button
} from 'antd-mobile';
import {Redirect} from 'react-router-dom';
import { connect } from 'react-redux'
import { login, cleanState } from '../../redux/user.redux';

@connect(
    state => state.user,
    {login, cleanState}
)

export default class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            user:'',
            pwd:''
        }
        this.register = this.register.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.cleanState = this.cleanState.bind(this);
    }

    handleLogin = () => {
        this.props.login(this.state);
    }

    register = () => {
        this.cleanState();
        this.props.history.push('/register')
    }

    cleanState = () => {
        this.props.cleanState();
    }

    updateState = (dict) => {
        if(!this) return ;
        this.setState(dict);
    }

    render() {
        return (
        <div>
            {this.props.redirectTo ? <Redirect to={this.props.redirectTo} ></Redirect> : null}
            <Logo></Logo>
            {this.props.msg ?  <p className="error_msg">{this.props.msg}</p> : <p className="error_msg"></p> }
            <WingBlank>
                <List>
                    <InputItem
                        onChange={text => this.updateState({user:text})}
                    >
                        用户
                    </InputItem>
                    <WhiteSpace/>
                    <InputItem
                        type='password'
                        onChange={text => this.updateState({pwd:text})}
                    >
                        密码
                    </InputItem>
                </List>
                <Button type='primary' onClick={this.handleLogin}>
                    登录
                </Button>
                <WhiteSpace/>
                <Button onClick={this.register} type='primary' >
                    注册
                </Button>
            </WingBlank>
        </div>
        )
    }
}
