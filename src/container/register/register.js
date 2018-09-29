import React, { Component } from 'react'
import Logo from '../../component/logo/logo';
import {
    List,
    InputItem,
	Button,
	Radio,
	WingBlank
} from 'antd-mobile';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { register } from '../../redux/user.redux';
import '../../index.css';
import formModel from '../../component/formModel/formModel';

@connect(
	state => state.user,
	{register}
)

@formModel
export default class Register extends Component {

	constructor(props){
		super(props);
		this.handleRegister = this.handleRegister.bind(this);
	}

	componentDidMount() {
		this.props.handleInputChange('type', 'genius');
	}
	

	handleRegister = () => {
		this.props.register(this.props.state);
	}

	render() {
		const RadioItem = Radio.RadioItem;
		return (
			<div>
				{this.props.redirectTo ? <Redirect to={this.props.redirectTo} ></Redirect> : null}
				<Logo></Logo>
				<WingBlank>
					<List>
						{this.props.msg ?  <p className="error_msg">{this.props.msg}</p> : null }
						<InputItem 
							onChange={text => this.props.handleInputChange('user',text)}
						>
							用户名
						</InputItem>
						<InputItem
							type='password'
							onChange={text => this.props.handleInputChange('pwd',text)}
						>
							密码
						</InputItem>
						<InputItem
							type='password'
							onChange={text => this.props.handleInputChange('repeatPwd',text)}
						>
							确认密码
						</InputItem>
						<RadioItem 
							checked={this.props.state.type === 'genius'} 
							onChange={() => this.props.handleInputChange('type','genius')}
						>
							求职
						</RadioItem>
						<RadioItem 
							checked={this.props.state.type === 'boss'} 
							onChange={() => this.props.handleInputChange('type','boss')}
						>
							招聘
						</RadioItem>
					</List>
				</WingBlank>
				<Button style={{marginTop:20, marginLeft:30, marginRight:30}} type='primary' onClick={() => this.handleRegister()}>注册</Button>
			</div>
		)
	}
}
