import { useState } from "react"
import axios from "axios"
export default function CreateJob() {
    let [formData, setFormData] = useState({
        title: "",
        company: "",
        description: "",
        location: "",
        salary: "",
        skills: []
    });
   let handleInputChange = (event) => {
    const { name, value } = event.target;
        if (name === "skills") {
            setFormData((currData) => ({
                ...currData,
                skills: value.split(",").map((skill) => skill.trim())
                // for skills becaz someone can enter more spaces in between
            }));
        } else {
            setFormData((currData) => ({
                ...currData,
                [name]: value
            }));
        }
    };
    let handleOnSubmit = async (event) =>{
        event.preventDefault();
        setFormData({
            title: "",
            company: "",
            description: "",
            location: "",
            salary: "",
            skills: []
        })
        let token = localStorage.getItem("token")
        try{
            const response = await axios.post("http://localhost:8080/jobs",
                formData, 
                {
                    headers :{
                        Authorization: `Bearer ${token}`                     
                    }
                }
            );
        }catch(err){
            console.log(err.message);
        }
    }
    
    return (
        <>
            <div className="container">
                <form onSubmit={handleOnSubmit}>
                    <label htmlFor="title">Title</label>
                    <input 
                        type="text" 
                        name="title" 
                        id="title" 
                        value={formData.title} 
                        placeholder="Enter Job Title"
                        onChange={handleInputChange} 
                        required 
                    />
                    <label htmlFor="company">Company Name</label>
                    <input 
                        type="text" 
                        name="company" 
                        id="company" 
                        value={formData.company} 
                        placeholder="Enter Company Name"
                        onChange={handleInputChange} 
                        required 
                    />
                    <label htmlFor="description">Description</label>
                    <input 
                        type="text" 
                        name="description" 
                        id="description" 
                        value={formData.description} 
                        placeholder="Enter Job Description"
                        onChange={handleInputChange} 
                        required 
                    />
                    <label htmlFor="location">Location</label>
                    <input 
                        type="text" 
                        name="location" 
                        id="location" 
                        value={formData.location} 
                        onChange={handleInputChange} 
                        required 
                    />
                    <label htmlFor="salary">Salary</label>
                    <input 
                        type="number" 
                        name="salary" 
                        id="salary" 
                        value={formData.salary}
                        placeholder="Enter Salary" 
                        onChange={handleInputChange} 
                        required 
                    />
                    <label htmlFor="skills">Skills</label>
                    <input 
                        type="text" 
                        name="skills" 
                        id="skills" 
                        value={formData.skills.join(",")} 
                        placeholder="Enter Skills Required"
                        onChange={handleInputChange} 
                        required 
                    />
                    <button>Submit</button>
                </form>
            </div>
        </>
    )
}