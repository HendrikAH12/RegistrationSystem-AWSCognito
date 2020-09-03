import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Auth } from 'aws-amplify'

import logo from '../../assets/logo.png'
import logo1 from '../../assets/logo1.png'
import './styles.css'

import Validate from '../FormValidation'
import Message from '../message'

class Register extends Component {

    state = {
        name: "",
        email: "",
        username: "",
        password: "",
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
        const error = Validate(event, this.state);
        if (error) {
            this.setState({
                errors: { ...this.state.errors, ...error }
            })
        }

        const { name, email, username, password } = this.state

        try{
            const signUpResponse = await Auth.signUp({
                username,
                password,
                attributes: {
                    email: email,
                    name: name
                }
            })
            console.log(signUpResponse)
            this.props.history.push('/verify')
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
        document.getElementById(event.target.id).classList.remove("isdanger")
    }    

    render(){
        return (
            <>
                <nav className="navbar px-0 justify-content-center">
                    <header className="background-color shadow-sm py-1 container-fluid">
                        <Link to="/">
                            <img className="rounded mb-2" style={{width: '11vw', minWidth: '80px'}} src={logo1} alt="Logo GoldenGate"/>
                        </Link>
                    </header>
                </nav>

                <Message formerrors={this.state.errors}/>

                <div className="col-sm-4 bg-light text-center offset-sm-4 mt-5 rounded pt-3 pb-3">
                    <div className="row justify-content-center mt-5 mb-5">
                        <img src={logo} style={{width:'25%', height: '25%',  minWidth: '80px', minHeight: '50px'}} alt="logo"/>
                    </div>
                    <div className="row justify-content-center mt-2 mb-5">
                        <form className="text-center" onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label className="text-danger" htmlFor="">Name</label>
                                <input className="form-control"
                                    type="text"
                                    id="name"
                                    value={this.state.name} 
                                    onChange={this.onInputChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label className="text-danger" htmlFor="">E-mail</label>
                                <input className="form-control"
                                    type="email"
                                    id="email"
                                    value={this.state.email}
                                    onChange={this.onInputChange}
                                    required
                                />
                            </div>

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
                                <label className="text-danger" htmlFor="">Password</label>
                                <input className="form-control"
                                    type="password"
                                    id="password"
                                    value={this.state.password}
                                    onChange={this.onInputChange}
                                    required
                                />
                            </div>
                                    
                            <button type="submit">Register</button>    
                        </form>   
                    </div>
                </div>
            </>
        )
    }
}

export default Register