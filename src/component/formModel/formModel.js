import React from 'react';

export default function formModel(Comp){
    return class WrapComponent extends React.Component{
        
        constructor(props){
            super(props);
            this.state = {};
            this.handleInputChange = this.handleInputChange.bind(this);
        }

        handleInputChange = (k, v) => {
            console.log('key--->', k, ' value--->', v);
            this.setState({
                [k]: v
            })
        }

        render(){
            return (
                <Comp handleInputChange={this.handleInputChange} state={this.state} {...this.props} ></Comp>
            )
        }
    }
}