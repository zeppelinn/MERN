import React, { Component } from 'react'
import Logo from '../../component/logo/logo';
import {
    List,
    InputItem,
    WhiteSpace,
	Button,
	Radio
} from 'antd-mobile';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { register } from '../../redux/user.redux';
import '../../index.css';

@connect(
	state => state.user,
	{register}
)

export default class Register extends Component {

	constructor(props){
		super(props);
		this.state = {
			type:'genius',
			user:'',
			pwd:'',
			repeatPwd:'',
		}
		
		this.handleRegister = this.handleRegister.bind(this);
	}

	updateState = (dict) => {
		if(!this) return ;
		this.setState(dict);
	}

	handleRegister = () => {
		this.props.register(this.state);
	}

	render() {
		const RadioItem = Radio.RadioItem;
		return (
			<div>
				{this.props.redirectTo ? <Redirect to={this.props.redirectTo} ></Redirect> : null}
				<Logo></Logo>
				<List>
					{this.props.msg ?  <p className="error_msg">{this.props.msg}</p> : null }
					<InputItem 
						onChange={text => this.updateState({'user':text})}
					>
						用户名
					</InputItem>
					<InputItem
						type='password'
						onChange={text => this.updateState({'pwd':text})}
					>
						密码
					</InputItem>
					<InputItem
						type='password'
						onChange={text => this.updateState({'repeatPwd':text})}
					>
						确认密码
					</InputItem>
					<WhiteSpace/>
					<RadioItem 
						checked={this.state.type === 'genius'} 
						onChange={() => this.updateState({'type':'genius'})}
					>
						求职
					</RadioItem>
					<RadioItem 
						checked={this.state.type === 'boss'} 
						onChange={() => this.updateState({'type':'boss'})}
					>
						招聘
					</RadioItem>
					<WhiteSpace/>
					<Button type='primary' onClick={() => this.handleRegister()}>注册</Button>
				</List>
			</div>
		)
	}
}
