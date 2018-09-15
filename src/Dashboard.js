import React, { Component } from 'react'
import {
    Link,
    Route,
    Redirect
} from 'react-router-dom';
import App from './App';
import { connect } from 'react-redux';
import { logout } from './Auth.redux';

const PageTwo = () => {
    return <h2>
        Page Two
    </h2>
}

const PageThree = () => {
    return <h2>
        Page Three
    </h2>
}

@connect(
    state => ({auth:state.auth}),
    {logout}
)

export default class Dashboard extends Component {
    constructor(props){
        super(props);
        this.url = this.props.match.url;
    }

    getUrl = (param) => {
        return this.url + param;
    }

    render() {
        const redirectRouter =  <Redirect to='/login' ></Redirect>
        const app = this.props.auth.isAuth ?
        <div>
            Page Dashboard
            <br/>
            {this.props.auth.isAuth ? <button onClick={() => this.props.logout()} >注销</button> : null}
            <ul>
                <li>
                    <Link to={this.getUrl()} >Page one</Link>
                </li>
                <li>
                <Link to={this.getUrl('/page_two')} >Page two</Link>
                </li>
                <li>
                <Link to={this.getUrl('/page_three')} >Page three</Link>
                </li>
            </ul>
            <Route path={this.url} exact component={App}/>
            <Route path={this.getUrl('/page_two')} component={PageTwo}/>
            <Route path={this.getUrl('/page_three')} component={PageThree}/>
        </div> : redirectRouter;

        return (
            <div>
                {app}
            </div>
        )
    }
}
