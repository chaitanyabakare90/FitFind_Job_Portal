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

    let handleOnClick = async (job_id) => {
        try{
            const response = await axios.post("http://localhost:8080/applications",
                {
                    job_id : job_id
                },
                {
                    headers : {
                        Authorization : `Bearer ${token}` 
                    }
                }
            );

        }catch(err){
            console.log(err.message);
        }
    }

    return(
        <div>
            {jobs.map((job) => (
                <div key={job._id}>
                    <h2>{job.title}</h2>
                    <p>{job.company}</p>
                    <p>{job.location}</p>
                    <button onClick={()=> handleOnClick(job._id)}>Apply</button>
                </div>
            ))}
        </div>
    )
}