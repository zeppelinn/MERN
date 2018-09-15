import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import { login } from './Auth.redux';

@connect(
    state => ({auth:state.auth}),
    {login}
)

export default class Auth extends Component {

    constructor(props){
        super(props);
    }

    onClick = () => {
        this.props.login();
    }

    render() {
        console.log('login ---> ', this.props.auth.isAuth);
        return (
            <div>
                {this.props.auth.isAuth ? 
                    <Redirect to="/dashboard"/> :
                    <div>
                        <h2>
                            没有权限，需要登录
                        </h2>
                        <button onClick={() => this.onClick()} >
                            登录
                        </button>
                    </div>
                }
                
            </div>
        )
    }
}
