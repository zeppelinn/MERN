import React, { Component } from 'react'
import axios from 'axios';
import {
    Card,
    WhiteSpace,
    WingBlank
} from 'antd-mobile'

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
        axios.get('/user/list?type=genius')
            .then(res => {
                this.updateState({
                    data:res.data
                })
            })
    }

    render() {
        console.log(this.state);
        const Header = Card.Header
        const Body = Card.Body
        return (
            <WingBlank>
                {this.state.data.map(v => (
                    v.avatar ? 
                    (<div style={{paddingTop:15}} key={v.title}>
                        <Card>
                            <Header
                                title={v.user}
                                thumb={require(`../../res/images/${v.avatar}.png`)}
                                extra={<span>{v.title}</span>}
                            />
                            <Body style={{marginLeft:5}} >
                                {v.desc.split('\n').map(v => (
                                    <div key={v}>{v}</div>
                                ))}
                            </Body>
                        </Card>
                        <WhiteSpace/>
                    </div>) :
                    null
                ))}
            </WingBlank>
        )
    }
}
