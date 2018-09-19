import React, { Component } from 'react'
import { Grid, List } from 'antd-mobile';
import PropTypes from 'prop-types';

export default class AvatarSelector extends Component {

    static propTypes = {
        selectAvatar:PropTypes.func.isRequired,
    }

    constructor(props){
        super(props);
        this.state = {

        }
    }

    render() {
        const avatarList = 'boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'
                            .split(',')
                            .map(item => ({
                                icon:require(`../../res/images/${item}.png`),
                                text:'',
                                mDesc:item
                            }))
        const gridHeader = this.state.mDesc ?
                (<div>
                    <span style={{fontSize:20, marginRight:20}} >
                        已选择头像
                    </span>
                    <img style={{width:18, height:18, alignItems:'center'}} src={this.state.icon}/>
                </div>):
                (<div>
                    <span style={{fontSize:20}}>请选择头像</span>
                </div>)
        return (
        <div>
            <List renderHeader={() => gridHeader} >
                <Grid
                    data={avatarList}
                    columnNum={5}
                    onClick={item => {
                        this.setState(item)
                        this.props.selectAvatar(item.mDesc)
                    }}    
                />
            </List>
        </div>
        )
    }
}
