import React,{useState,useEffect} from "react";
import axios from 'axios'
import { Link, Route } from "react-router-dom";
import FrontEnd from "./FrontEnd";
import NodeJs from "./NodeJs";
import FullSTack from "./FullSTack";
import MeanStack from "./MeanStack";

const AdminDashboard = (props) => 
{
    
    return(
        <div>
            <h3>Welcome Admin</h3>
            <Link to='/admin/frontend'>Front End Developer</Link>{" "}
            <Link to='/admin/nodejs'>NodeJs Developer</Link>{" "}
            <Link to='/admin/meanstack'>MEAN Stack Developer</Link>{" "}
            <Link to='/admin/fullstack'>Full Stack Developer</Link>{" "}

            <Route path={'/admin/frontend'} component={FrontEnd} exact={true}/>
            <Route path={'/admin/nodejs'} component={NodeJs} exact={true}/>
            <Route path={'/admin/meanstack'} component={MeanStack} exact={true}/>
            <Route path={'/admin/fullstack'} component={FullSTack} exact={true}/>
        </div>
    )
}
export default AdminDashboard