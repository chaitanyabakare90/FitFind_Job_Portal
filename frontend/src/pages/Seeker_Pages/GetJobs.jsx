import axios from "axios";
import { useEffect, useState } from "react"

export default function GetJobs(){
    const [jobs,setJobs] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        async function fetchData() {
            try{
                const response = await axios.get("http://localhost:8080/jobs",
                    {
                        headers : {
                            Authorization: `Bearer ${token}`     
                        }
                    }
                )
                setJobs(response.data.jobs);
            }catch(err){
                console.log(err.message);
            }
        }
        fetchData();
    },[])


    return(
        <div>
            {jobs.map((job) => (
                <div key={job._id}>
                    <h2>{job.title}</h2>
                    <p>{job.company}</p>
                    <p>{job.location}</p>
                </div>
            ))}
        </div>
    )
}