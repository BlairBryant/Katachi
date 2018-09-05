import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'

export default (
    <Switch>
        <Route path='/' component={Login} exact/>
        <Route path='/home' component={Home} />
    </Switch>
)