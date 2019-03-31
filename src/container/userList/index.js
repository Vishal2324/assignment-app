import React, { Component } from 'react';
import Pagination from 'react-bootstrap/Pagination'
import { connect } from 'react-redux';
import { getUser } from '../../store/reducers/user_action';
import './style.css';

class UserList extends Component{
    constructor(){
        super();
        this.state = {
            userList: [],
            pages: [],
            token: ''
        }
    }

    componentDidMount(){
        if(this.props.user.token){
            fetch('https://api.prontoitlabs.com/api/v1/user?page=0&size=25', {
                method: 'get',
                headers: {'X-AUTH-TOKEN': this.props.user.token},
            }).then((response)=> {
                return response.json();
            }).then((data)=> {
                if(data.data !== null){
                    var pageTemp = [];
                    var num = data.data.totalPages;
                    for(var i=0; i<num; i++){
                        pageTemp.push(i + 1);
                    }
                    this.props.getUser(data.data.content);
                    this.setState({
                        pages: pageTemp
                    });
                }
            });
        }
    }

    pageChange = (page) => {
        fetch(`https://api.prontoitlabs.com/api/v1/user?page=${page-1}&size=25`, {
            method: 'get',
            headers: {'X-AUTH-TOKEN': 'Vishal Bajaj'},
        }).then((response)=> {
            return response.json();
        }).then((data)=> {
            this.props.getUser(data.data.content);
        });
    }

    render(){
        return(
            <div className="container">
                {this.props.user.token && <div className="row"> 
                    <h2 style={{textAlign: 'center'}}>
                        User list
                    </h2>
                    <hr />
                    <div>
                        {
                            this.props.userList.map(item =>
                                <div key={item.id}>
                                    <div className="col-sm-2">{`User Id : ${item.id}`}</div>
                                    <div className="col-sm-6">{`User Name : ${item.userName}`}</div>
                                    <div className="col-sm-4">{`User Gender : ${item.gender}`}</div>
                                </div>
                            )
                        }
                    </div>
                    <Pagination>
                        {
                            this.state.pages.map(item =>{
                                if(item === 1){
                                    return(
                                        <Pagination.Item key={item} onClick={()=>{this.pageChange(item)}}>{item}</Pagination.Item>
                                    )
                                }else{
                                    return(
                                        <Pagination.Item key={item} onClick={()=>{this.pageChange(item)}}
                                        >{item}</Pagination.Item>
                                    )
                                }
                            })
                        }
                    </Pagination>
                </div>}
                {!this.props.user.token && <h2 style={{textAlign: 'center'}}>Please Login/Signup to see users list.</h2>}
            </div>
        )
    }
}

function mapStateToProps (state) {    
    return {
        user: state.userData.user,
        userList: state.userData.userList
    }
}

function mapDispatchToProps (dispatch) {
    return {
        getUser: (data) => dispatch(getUser(data)),
    }
}
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserList)