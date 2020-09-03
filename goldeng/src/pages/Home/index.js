import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Auth } from 'aws-amplify'

import logo from '../../assets/logo.png'
import './styles.css'

export default class Home extends Component {
    handleLogOut = async event => {
        event.preventDefault()
        try {
            Auth.signOut()
            this.props.auth.setAuthStatus(false)
        }
        catch (error){
            console.log(error.message)
        }
    }

    render () {
        return (  
            <>
                {!this.props.auth.isAuthenticated &&
                    <div className="col-sm-4 bg-light text-center offset-sm-4 mt-5 rounded pt-3 pb-3">
                        <div className="row justify-content-center mt-4 mb-5">
                            <div className="row justify-content-center mt-3 mb-2">
                                <img src={logo} style={{width:'48%', height: '96%'}} alt="logo"/>
                            </div>
                            <div className="form-group form-check mt-4">
                                <Link to="/login">
                                    <button className="mr-3">Log In</button>
                                </Link>
                                <Link to="/verify">
                                    <button className="mr-3">Verify</button>
                                </Link>
                                <Link to="/register">
                                    <button className="mr-3">Register</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                }
                {this.props.auth.isAuthenticated &&
                    <div className="col-sm-4 bg-light text-center offset-sm-4 mt-5 rounded pt-3 pb-3">
                        <div className="row justify-content-center mt-4 mb-5">
                            <p className="h1" style={{color: "rgba(227, 32, 49, 1)"}}>Welcome</p>
                            <div className="row justify-content-center mt-3 mb-2">
                                <img src={logo} style={{width:'48%', height: '96%'}} alt="logo"/>
                            </div>
                            
                            <button onClick={this.handleLogOut} className="mt-4">Log Out</button>
                                
                        </div>
                    </div>
                }
            </>
        )
    }
}