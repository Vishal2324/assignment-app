import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../../store/reducers/user_action'
import { Redirect } from 'react-router-dom';
import './style.css';

class Login extends Component{
    constructor(){
        super();
        this.state = {
            loginName: '',
            loginPass: '',
            redirectToList: false,
            loginNameError: '',
            loginPassError: '   '
        }
    }

    getLoginName = (e) => {
        this.setState({loginName: e.target.value});
    }

    getLoginPassword = (e) => {
        this.setState({loginPass: e.target.value});
    }

    checkLoginName = () => {
        if (this.state.loginName.trim() === '') {
            this.setState({
                loginNameError: 'Please Enter User Name to Login.'
            })
        }else {
            this.setState({
                loginNameError: ''
            })
        }
    }

    checkLoginPass = () => {
        if (this.state.loginPass.trim() === '') {
            this.setState({
                loginPassError: 'Please Enter User Password to Login.'
            })
        }else {
            this.setState({
                loginPassError: ''
            })
        }
    }

    loginUser = (e) => {
        e.preventDefault();
        if(this.state.loginNameError !== '' || this.state.loginPassError !== '' || this.state.loginName === '' || this.state.loginPass === ''){
            return false;
        }

        var loginObj = {
            userName: this.state.loginName,
            password: this.state.loginPass,
        }

        fetch('https://api.prontoitlabs.com/api/v1/user/login', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(loginObj)
            }).then((response) => {
                return response.json();
            }).then((data) => {
                if(data.errorMessage !== null){
                    alert(data.errorMessage);
                }else{
                    this.props.loginUser(data.data);
                    if(data.status){
                        this.setState({redirectToList: true})
                    }
                }
            });
    }


    render(){
        if (this.state.redirectToList) return <Redirect to={'/'} />;

        return(
            <div className="container">
                <div className="row">
                    <h2>LOGIN FORM</h2>
                    <form>
                        <label htmlFor="username">Enter User Name : </label>
                        <input id="username" type="text" className="form-control" placeholder="Enter User Name" onChange={this.getLoginName} onBlur={this.checkLoginName} />
                        <span style={{color: 'red'}}>{this.state.loginNameError}</span>
                        <br />
                        <label htmlFor="username">Enter Password : </label>
                        <input id="userpassword" type="password" className="form-control" placeholder="Enter Password" onChange={this.getLoginPassword} onBlur={this.checkLoginPass} />
                        <span style={{color: 'red'}}>{this.state.loginPassError}</span>
                        <br />
                        <button className="btn btn-primary btn-block" onClick={this.loginUser}>LOG IN</button>
                    </form>
                </div>  
            </div>
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
        loginUser: (data) => dispatch(loginUser(data)),
    }
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Login)