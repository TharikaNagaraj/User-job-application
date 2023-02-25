import React, { useState,useEffect } from "react";
import axios from "axios";

const UserJobForm = (props) => 
{
    const [userName,setUserName] = useState('')
    const [userEmail,setUserEmail] = useState('')
    const [userNum,setUserNum] = useState('')
    const [userExp,setUserExp] = useState('')
    const [userSkills,setUserSkills] = useState('')
    const [userJob,setUserJob] = useState('')
    const [jobForm,setJobForm] = useState({})
    const handleTextInput = (e) => 
    {
        const input1 = e.target.name
        if(input1 == 'fName')
        {
            setUserName(e.target.value)
        }
        else if(input1 == 'email')
        {
            setUserEmail(e.target.value)
        }
        else if(input1 == 'contactNum')
        {
            setUserNum(e.target.value)
        }
        else if(input1 == 'exp')
        {
            setUserExp(e.target.value)
        }
        else
        {
            setUserSkills(e.target.value)
        }
        //console.log(e.target.value)
    }
    const handleSelect = (e) => 
    {
        //console.log('select value',e.target.value)
        setUserJob(e.target.value)
    }

    const handleSubmit = (e) => 
    {
        e.preventDefault()
        const formData = {
            "name":userName,
            "email":userEmail,
            "phone" :userNum,
            "skills" :userSkills,
            "jobTitle" :userJob,
            "experience" : userExp
        }
        setJobForm(formData)
        setUserName('')
        setUserEmail('')
        setUserNum('')
        setUserExp('')
        setUserSkills('')
        setUserJob('')
        console.log(formData)
    }
    
    useEffect(() => 
    {
        const url = 'https://dct-application-form.herokuapp.com/users/application-form'
        axios.post(url,jobForm)   
        .then((ele) => 
        {
            console.log('Form GET data',ele.data)
        })
        .catch((err) => 
        {
            console.log(err.message)
        })
    },[jobForm])


    return(
        <div>
            <form onSubmit={handleSubmit}>
                <h2>APPLY FOR JOB</h2>
                <label htmlFor="fName">Full Name</label>{" "}
                <input type="text" id="fName" name="fName" value={userName} onChange={handleTextInput}/><br /><br />
                <label htmlFor="email">Email address</label>{" "}
                <input type="text" id="email" name="email" value={userEmail} onChange={handleTextInput}/><br /><br />
                <label htmlFor="contactNum">Contact Number</label>{" "}
                <input type="text" id="contactNum" name="contactNum" value={userNum} onChange={handleTextInput}/><br /><br />
                <label>Applying for Job</label>{" "}
                <select name="jobtype" value={userJob} onChange={handleSelect}>
                    <option>Select</option>
                    <option>Front-End Developer</option>
                    <option>Node.js Developer</option>
                    <option>MEAN Stack Developer</option>
                    <option>FULL Stack Developer</option>   
                </select><br /><br />
                <label htmlFor="exp">Experience</label>{" "}
                <input type="text" id="exp" name="exp" value={userExp} onChange={handleTextInput}/><br /><br />
                <label>Technical Skills</label>{" "}
                <textarea name="techSkills" value={userSkills} onChange={handleTextInput}></textarea><br /><br />
                <input type="submit"/> 
            </form>
        </div>
    )
}
export default UserJobForm