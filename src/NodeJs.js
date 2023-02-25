import React,{useState,useEffect} from "react";
import {Link,Route} from 'react-router-dom'
import AdminDashboard from "./AdminDashboard";
import axios from 'axios'

const NodeJs = (props) => 
{
    const [jobData,setJobData] = useState([])
    useEffect(() => 
    {
        const url = 'https://dct-application-form.herokuapp.com/users/application-forms'
        axios.get(url)
        .then((values) => 
        {
            const output = values.data
            const result = output.filter((ele) => 
            {
                return(ele.jobTitle == 'Node.js Developer')
            })
            console.log(result)
            setJobData(result)
        })
        .catch((err) => 
        {
            console.log(err.message)
        })
    },[])

    const handleShortList = (id) => 
    {
        const url = `https://dct-application-form.herokuapp.com/users/application-form/update/${id}`
        axios.put(url,{status:'Shortlisted'})
        .then((ele) => 
        {
            //console.log(ele.data)
            const output = ele.data
            const result = jobData.map((data) => 
            {
                if(data._id == id)
                {
                    return({...data,...output})
                }
                else
                {
                    return data
                }
            })
            setJobData(result)
        })
        .catch((err) => 
        {
            console.log(err.message)
        })
    }
    const handleReject = (id) => 
    {
        const url = `https://dct-application-form.herokuapp.com/users/application-form/update/${id}`
        axios.put(url,{status:'rejected'})
        .then((ele) => 
        {
            const output = ele.data
            const result = jobData.map((data) => 
            {
                if(data._id == id)
                {
                    return({...data,...output})
                }
                else
                {
                    return data
                }
            })
            setJobData(result)
        })
        .catch((err) => 
        {
            console.log(err.message)
        })
    }
    const handleViewDetails = (id) => 
    {
        const result = jobData.find((ele) => 
        {
            return(ele._id == id)
        })
        console.log('dialog data',result)
        
        alert(`${result.name}'s profile:
        Contact Number : ${result.phone},
        Email : ${result.email},
        Skills : ${result.skills},
        Experience : ${result.experience}`)
    }
    return(
        <div>
            NodeJS Developer<br /><br />
            <Link to='/admin/nodejs/nodeback'>Back</Link>

            <Route path={'/admin/nodejs/nodeback'} component={AdminDashboard}/>  
            {((jobData.length) > 0) && (
                <table border="1">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Technical Skills</th>
                            <th>Experience</th>
                            <th>Applied Date</th>
                            <th>View Details</th>
                            <th>Update Application Status</th>
                            <th>Job title</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jobData.map((ele) => 
                            {
                                return(
                                    <tr key={ele._id}>
                                        <td>{ele.name}</td>
                                        <td>{ele.skills}</td>
                                        <td>{ele.experience}</td>
                                        <td>{ele.createdAt}</td>
                                        <td><button style={{backgroundColor:'lightblue'}} onClick={(e) => {handleViewDetails(ele._id)}}>View Details</button></td>
                                        <td>{(ele.status == 'applied') ? (
                                            <div key={ele._id}>
                                                <button style={{backgroundColor:'green'}} onClick={(e) => {handleShortList(ele._id)}}>Shortlist</button>
                                                <button style={{backgroundColor:'red'}} onClick={(e) => {handleReject(ele._id)}}>Reject</button>
                                            </div>
                                        )
                                        :
                                        (ele.status == 'rejected') ? 
                                        <h4 style={{color:'red'}}>Rejected</h4> 
                                        :
                                        <h4 style={{color:'green'}}>Shortlisted</h4>
                                    }
                                    </td>
                                    <td>{ele.jobTitle}</td>
                                    </tr>
                                )
                            }
                        )}
                       
                    </tbody>

                </table>
            )}  
        </div>
    )
}
export default NodeJs