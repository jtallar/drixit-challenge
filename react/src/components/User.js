import { Component } from 'react'
import { Redirect } from 'react-router-dom'
import userService from '../services/userService'
import authenticationService from '../services/authenticationService'

export default function User ({user}) {
    if (!user) {
        return <><div></div></>
    }

    return (
        <>
            <div>
                <div className="profile-img">
                    <img src={user.avatar}/>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <label>Name</label>
                    </div>
                    <div className="col-md-6">
                        <p>{user.name}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <label>Surname</label>
                    </div>
                    <div className="col-md-6">
                        <p>{user.surname}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <label>Id</label>
                    </div>
                    <div className="col-md-6">
                        <p>{user.id}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <label>Email</label>
                    </div>
                    <div className="col-md-6">
                        <p>{user.email}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <label>Age</label>
                    </div>
                    <div className="col-md-6">
                        <p>{user.age}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <label>Role</label>
                    </div>
                    <div className="col-md-6">
                        <p>{user.role}</p>
                    </div>
                </div>
            </div>
        </>
    );
}