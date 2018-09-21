import React, { Component } from 'react'
import axios from 'axios';
import {
    Card,
    WhiteSpace,
    WingBlank
} from 'antd-mobile'
import { connect } from 'react-redux';
import { getUserList } from '../../redux/chatuser.redux';
import UserInfo from '../userinfo/UserInfo';

@connect(
    state => state.chatTarget,
    {getUserList}
)

export default class Boss extends Component {

    constructor(props){
        super(props);
        this.state = {
            data:[]
        }
        this.updateState = this.updateState.bind(this);
    }

    updateState = (dict) => {
        if(!this) return ;
        this.setState(dict);
    }

    componentDidMount = () =>  {
        this.props.getUserList('genius')
    }

    render() {
        return <UserInfo userList = {this.props.userList} />
    }
}
