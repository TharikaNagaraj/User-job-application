import React, { useState,useEffect } from "react";
import UserJobForm from "./UserJobForm";
import AdminDashboard from "./AdminDashboard";
import axios from "axios";
import {Link,Route} from 'react-router-dom'

const UserJobContainer = (props) => 
{
    const [toggle,setToggle] = useState(false)
    return(
        <div>
            <Link to='/'>Home</Link><br />
            <Link to='/jobform'>Apply for Job</Link><br />
            <Link to='/admin'>Admin Dashboard</Link>
            
            <Route path={'/jobform'} component={UserJobForm} exact={true}/>
            <Route path={'/admin'} component={AdminDashboard}/>    
        </div>
    )
}
export default UserJobContainer