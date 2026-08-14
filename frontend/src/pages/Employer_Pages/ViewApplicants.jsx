import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router";

export default function ViewApplicants(){
    const [applicants,setApplicants] = useState([]);
    const token = localStorage.getItem("token");
    const {jobId} = useParams();

    useEffect(() => {
        async function getApplicants() {
            try {
                const response = await axios.get(`http://localhost:8080/view-applicants/${jobId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )
                setApplicants(response.data.applicants);
            } catch (err) {
                console.log(err.message);
            }
        }
        getApplicants();
    },[])
    return (
        <div>
            {
                applicants.map((applicant) => (
                    <div>
                        <h3>{applicant.seeker.name}</h3>
                        <h3>{applicant.seeker.email}</h3>
                    </div>
                ))
            }
        </div>
    )
}