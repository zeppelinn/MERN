import React, { Component } from 'react'
import "./logo.css";
const logoImg = require('./job.png');
export default class Logo extends Component {
    render() {
        return (
            <div className="logo-container">
                <img src={logoImg} alt=""/>
            </div>
        )
    }
}
