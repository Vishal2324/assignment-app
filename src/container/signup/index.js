import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signupUser } from '../../store/reducers/user_action';
import { Redirect } from 'react-router-dom';
import './style.css';

class Signup extends Component{
    constructor(){
        super();
        this.state = {
            username: '',
            userpass: '',
            usergender: '',
            redirectToList: false,
            userNameError: '',
            userPassError: '',
            userGenderError: '',
        }
    }

    getUserName = (e) => {
        this.setState({username: e.target.value});
    }

    getUserPassword = (e) => {
        this.setState({userpass: e.target.value});
    }

    getUserGender = (e) => {
        this.setState({usergender: e.target.value});
    }

    registerUser = (e) => {
        e.preventDefault();
        if(this.state.username === '' || this.state.userpass === '' || this.state.usergender === '' || this.state.userNameError !== '' || this.state.userPassError !== '' || this.state.userGenderError !== '') {
            return false;
        }
        var signupObj = {
            userName: this.state.username,
            password: this.state.userpass,
            gender: this.state.usergender
        }

        fetch('https://api.prontoitlabs.com/api/v1/user', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(signupObj)
            }).then((response) => {
                debugger;
                return response.json();
            }).then((data) => {
                if(data.errorMessage !== null){
                    alert(data.errorMessage);
                }else {
                    this.props.signupUser(data.data);
                    if(data.status){
                        this.setState({redirectToList: true})
                    }
                }
            });
    }

    checkUserName = () => {
        if(this.state.username.trim() === '') {
            this.setState({
                userNameError: 'Please Enter User Name.'
            })
        }else {
            this.setState({
                userNameError: ''
            })
        }
    }

    checkUserPass = () => {
        if(this.state.userpass.trim() === '') {
            this.setState({
                userPassError: 'Please Enter Password.'
            })
        }else {
            this.setState({
                userPassError: ''
            })
        }
    }

    checkUserGender = () => {
        debugger;
        if(this.state.usergender.trim() === '') {
            this.setState({
                userGenderError: 'Please Select Gender.'
            })
        }else {
            this.setState({
                userGenderError: ''
            })
        }
    }

    render(){
        if (this.state.redirectToList) return <Redirect to={'/'} />;

        return(
            <div className="container">
                <div className="row">
                    <h2>SIGNUP FORM</h2>
                    <form>
                        <label htmlFor="username">Enter Name : </label>
                        <input id="username" type="text" className="form-control" placeholder="Enter Full Name" onChange={this.getUserName} onBlur={this.checkUserName} />
                        <span style={{color: 'red'}}>{this.state.userNameError}</span>
                        <br />
                        <label htmlFor="username">Enter Password : </label>
                        <input id="userpassword" type="password" className="form-control" placeholder="Enter Password" onChange={this.getUserPassword} onBlur={this.checkUserPass} />
                        <span style={{color: 'red'}}>{this.state.userPassError}</span>
                        <br />
                        <label htmlFor="username">Select Your Gender : </label>
                        <select className="form-control" defaultValue="0" onChange={this.getUserGender} onBlur={this.checkUserGender} >
                            <option disabled value="0">Select Gender</option>
                            <option value="MALE">male</option>
                            <option value="FEMALE">female</option>
                            <option value="OTHER">other</option>
                        </select>
                        <span style={{color: 'red'}}>{this.state.userGenderError}</span>
                        <br />
                        <button className="btn btn-success btn-block" onClick={this.registerUser}>Register</button>
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
        signupUser: (data) => dispatch(signupUser(data)),
    }
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Signup)