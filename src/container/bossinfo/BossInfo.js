import React, { Component } from 'react'
import {
    NavBar,
    InputItem,
    TextareaItem,
    Button
} from 'antd-mobile';
import { connect } from 'react-redux';
import { updateBossInfo } from '../../redux/user.redux';
import { Redirect } from 'react-router-dom';
import AvatarSelector from '../../component/avatarselector/AvatarSelector';

@connect(
    state => state.user,
    {updateBossInfo}
)

export default class Bossinfo extends Component {
    constructor(props){
        super(props);
        this.state = {
            title:'',
            company:'',
            salary:'',
            desc:'',
            avatar:''
        }
        this.updateState = this.updateState.bind(this);
    }

    updateState = (k, v) => {
        if(!this) return ;
        this.setState({
            [k]:v
        })
    }

    render() {
        const path = this.props.location.pathname
        const redirectPath = this.props.redirectTo
        return (
        <div>
            {redirectPath && path !== redirectPath ? <Redirect to={redirectPath} ></Redirect> : null}
            <NavBar mode="dark">
                Boss
            </NavBar>
            <AvatarSelector selectAvatar={text => this.updateState('avatar',text)} >

            </AvatarSelector>
            <InputItem onChange = {text => this.updateState('title', text)} >
                招聘职位
            </InputItem>
            <InputItem onChange = {text => this.updateState('company', text)} >
                公司名称
            </InputItem>
            <InputItem onChange = {text => this.updateState('salary', text)} >
                职位薪资
            </InputItem>
            <TextareaItem 
                onChange = {text => this.updateState('desc', text)}
                rows={3}
                autoHeight
                title='职位要求'
            >
            </TextareaItem>
            <Button onClick={() => this.props.updateBossInfo(this.state)} style={{marginLeft:20, marginRight:20, marginTop:20}} type="primary" >保存</Button>
        </div>
        )
    }
}
