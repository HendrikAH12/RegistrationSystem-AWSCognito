import React, { Component } from 'react'
import { Route, BrowserRouter } from 'react-router-dom'
import { Auth } from 'aws-amplify'

import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Verify from './pages/Verify'

class Routes extends Component{
    state = {
        isAuthenticated: false,
        isAuthenticating: true
    }
      
    setAuthStatus = authenticated => {
        this.setState({ isAuthenticated: authenticated })
    }
    
    async componentDidMount() {
        try{
            await Auth.currentSession()
            this.setAuthStatus(true)
        }
        catch (error){
            console.log(error)
        }
        this.setState({ isAuthenticating: false })
    }

    render () {
        const authProps = {
            isAuthenticated: this.state.isAuthenticated,
            setAuthStatus: this.setAuthStatus
        }
        return (
            !this.state.isAuthenticating &&
            <BrowserRouter>
                <Route path="/" exact render={(props) => <Home {...props} auth={authProps} />} />
                <Route component={Register} path="/register" exact />
                <Route path="/login" exact render={(props) => <Login {...props} auth={authProps} />} />
                <Route component={Verify} path="/verify" exact />
            </BrowserRouter>
        )
    }
}

export default Routes