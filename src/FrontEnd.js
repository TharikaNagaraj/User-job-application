import React,{useState,useEffect} from "react";
import {Link,Route} from 'react-router-dom'
import AdminDashboard from "./AdminDashboard";
import axios from "axios";

const FrontEnd = (props) => 
{
    const [jobData,setJobData] = useState([])
    const [toggle,setToggle] = useState(false)
    const [dialogData,setDialogData] = useState({})
    useEffect(() => 
    {
        const url = 'https://dct-application-form.herokuapp.com/users/application-forms'
        axios.get(url)
        .then((values) => 
        {
            //console.log('GET data',values.data)
            const output = values.data
            const result = output.filter((ele) => 
            {
                return(ele.jobTitle == 'Front-End Developer')
            })
            //console.log(result)
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
        axios.put(url,{status:'shortlisted'})
        .then((ele) => 
        {
            const data = ele.data
            //console.log(data)
            const result = jobData.map((ele) => 
            {
                if(ele._id == data._id)
                {
                    console.log({...ele,...data})
                    return({...ele,...data})
                }
                else
                {
                    return ele
                }
                
            })
            setJobData(result)
        })
        .catch((err) => 
        {
            console.log(err.message)
        })
        const input = !toggle
        setToggle(input)

    }

    const handleReject = (id) => 
    {
        const url = `https://dct-application-form.herokuapp.com/users/application-form/update/${id}`
        axios.put(url,{status:'rejected'})
        .then((ele) => 
        {
            const data = ele.data
            const result = jobData.map((ele) => 
            {
                if(ele._id == data._id)
                {
                    return({...ele,...data})
                }
                else
                {
                    return ele
                }
            })
            setJobData(result)
        })
        .catch((err) => 
        {
            console.log(err.message)
        })
        const input = !toggle
        setToggle(input)
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
            Front End Developer<br /><br />
            <Link to='/admin/frontend/back'>Back</Link>

            <Route path={'/admin/frontend/back'} component={AdminDashboard}/>
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
                            <th>job Title</th>
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
                                            <div>
                                                <button style={{backgroundColor:'green'}} onClick={(e) => {handleShortList(ele._id)}}>Shortlist</button>
                                                <button style={{backgroundColor:'red'}} onClick={(e) => {handleReject(ele._id)}}>Reject</button>
                                            </div>
                                                    
                                        )
                                        :
                                        (ele.status == 'rejected') ? 
                                        <h4 style={{color:'red'}}>Rejected</h4> 
                                        :
                                        <h4 style={{color:'green'}}>Shortlisted</h4>
                                    }</td>
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
export default FrontEnd