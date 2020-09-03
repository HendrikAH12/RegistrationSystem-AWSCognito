import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Auth } from 'aws-amplify'

import logo from '../../assets/logo.png'
import logo1 from '../../assets/logo1.png'
import './styles.css'

import Validate from '../FormValidation'
import Message from '../message'

class Verify extends Component {
    state = {
        username: "",
        code: "",
        errors: {
            cognito: null,
            blankfield: false
        }
    }
    
    clearErrorState = () => {
        this.setState({
                errors: {
                cognito: null,
                blankfield: false
            }
        })
    }
    
    handleSubmit = async event => {
        event.preventDefault()

        this.clearErrorState()
        const error = Validate(event, this.state)
        if (error) {
            this.setState({
                errors: { ...this.state.errors, ...error }
            })
        }

        try{
            const confirmCode = await Auth.confirmSignUp(this.state.username, this.state.code)
            console.log(confirmCode)
            this.props.history.push('/')
        }catch(error){
            this.setState({
                errors: {
                    ...this.state.errors,
                    cognito: error
                }
            })
        }
    }
    
    onInputChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        })
        document.getElementById(event.target.id).classList.remove("is-danger")
    } 


    render () {
        return (
            <>
                <nav className="navbar px-0 justify-content-center">
                    <header className="background-color shadow-sm py-1 container-fluid">
                        <Link to="/">
                            <img className="rounded mb-2" style={{width: '11vw', minWidth: '80px'}} src={logo1} alt="Logo GoldenGate"/>
                        </Link>
                    </header>
                </nav>

                <div className="col-sm-4 text-center offset-sm-4 mt-3 rounded pt-3 pb-3">
                    <h3>You received an email with the confirmation code</h3>
                </div>

                <Message formerrors={this.state.errors}/>

                <div className="col-sm-4 bg-light text-center offset-sm-4 mt-3 rounded pt-3 pb-3">
                    <div className="row justify-content-center mt-5 mb-5">
                        <img src={logo} style={{width:'25%', height: '25%',  minWidth: '80px', minHeight: '50px'}} alt="logo"/>
                    </div>
                    <div className="row justify-content-center mt-2 mb-5">
                        <form className="text-center" onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label className="text-danger" htmlFor="">Username</label>
                                <input className="form-control"
                                    type="text"
                                    id="username"
                                    value={this.state.username} 
                                    onChange={this.onInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label className="text-danger" htmlFor="">Code</label>
                                <input className="form-control"
                                    type="text"
                                    id="code"
                                    value={this.state.code} 
                                    onChange={this.onInputChange}
                                    required
                                />
                            </div>

                            <button type="submit">Verify</button>
                        </form>
                    </div>
                </div>
            </>
        )
    }
}

export default Verify