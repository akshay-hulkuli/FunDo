import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import auth from './Auth'

export const ProtectedRoute = ({component: Component, ...rest}) =>  {
    return (
        <Route {...rest} render ={
            (props) => {
                if(localStorage.getItem('uid')){
                    console.log(props)
                    return <Component/>
                }
                else {
                    return <Redirect to ={
                        {
                            pathname:'/',
                            state: {
                                from : props.location
                            }
                        }
                    } />
                }
            }}
        />
    )
}
