import React from 'react';
import { connect } from 'react-redux';
import { addNum, reduceNum, addAsync } from './index.redux';


// ######写法1，不使用装饰器的方式来书写connect#######
// 需要传递的属性
// const mapStateToProps = (state) => {
//     return {num:state}
// }
// 所有的action，在将actionCreators传入到connect中之后，凡是actionCreators中引用的action就会被react-redux加入到props中
// 同时被注册进去的action在通过props引用时，被加上dispatch功能，也就是说只要调用action，就能够自动dispatch
// const actionCreators = { addNum, reduceNum, addAsync };
// App = connect(mapStateToProps, actionCreators)(App);

// ######写法2，使用@connect装饰器来书写connect######
@connect(
    state => ({num:state.counter}),
    { addNum, reduceNum, addAsync }
)

class App extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                <h1>
                    Current Number is {this.props.num}
                </h1>
                <button onClick={() => this.props.addNum()} >Add</button>
                <button onClick={() => this.props.reduceNum()} >Reduce</button>
                <button onClick={() => this.props.addAsync()} >Async Add</button>
            </div>
        )
    }
}

export default App;