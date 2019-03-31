import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';  
import { logOutUser } from '../../store/reducers/user_action';
import './style.css';

class Header extends Component{
    constructor(){
        super();
        this.state = {

        }
    }

    render(){
        return(
            <header className="header">
                {this.props.user.token && <h3>{`LOOGED IN USER : ${this.props.user.user.userName}`}</h3>}
                {!this.props.user.token && <div className="pull-right">
                    <NavLink to={{pathname:'/login'}} className="link">LOGIN</NavLink>
                    <NavLink to={{pathname:'/signup'}} className="link">SIGNUP</NavLink>
                </div>}
                {this.props.user.token && <div className="pull-right">
                    <button className="btn btn-warning" onClick={this.props.logOutUser}>LOG OUT</button>
                </div>}
            </header>
        )
    }
}

function mapStateToProps (state) {    
    return {
        user: state.userData.user
    }
}

function mapDispatchToProps (dispatch) {    
    return {
        logOutUser: () => dispatch(logOutUser()),
    }
}
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header)