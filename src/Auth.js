import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import { login, fetchUser } from './Auth.redux';
import axios from 'axios';

@connect(
    state => ({auth:state.auth}),
    {login, fetchUser}
)

export default class Auth extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount = () => {
        this.props.fetchUser();
    }

    onClick = () => {
        this.props.login();
    }

    // componentDidMount = () => {
    //     axios.get('/data')
    //         .then(res => {
    //             if(res.status === 200){
    //                 console.log('type ===> ', res.data[0].user)
    //                 this.updateState({
    //                     data: res.data
    //                 })
    //             }
    //         })
    // }

    // updateState = (dict) => {
    //     if(!this) return ;
    //     this.setState(dict)
    // }

    render() {
        return (
            <div>
                {this.props.auth.isAuth ? 
                    <Redirect to="/dashboard"/> :
                    <div>
                        <h2>
                            {this.props.auth[0] ? this.props.auth[0].user : null}，您没有权限，需要登录
                        </h2>
                        name:{this.props.auth[0] ? this.props.auth[0].user : null}
                        <br/>
                        age:{this.props.auth[0] ? this.props.auth[0].age : 0}
                        <br/>
                        <button onClick={() => this.onClick()} >
                            登录
                        </button>
                    </div>
                }
                
            </div>
        )
    }
}
