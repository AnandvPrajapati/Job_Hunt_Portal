import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateJob } from '../../redux/jobSlice';

const EditJob = () => {
    const { id: jobId } = useParams(); // Ensure you're extracting 'id' from params correctly
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [jobData, setJobData] = useState({
        title: '',
        description: '',
        salary: '',
        location: '',
        position: '',
        jobType: '',
        lastDateOfApplication: '',
        experienceLevel: '' // Correcting the typo in `experienceLevel`
    });

    const { allAdminJobs, loading, error } = useSelector(store => store.job);

    // Find the job by its ID in the Redux store (if already fetched)
    useEffect(() => {
        const job = allAdminJobs.find(job => job._id === jobId);
        // console.log(job);

        if (job) {
            setJobData({
                title: job.title || '',
                description: job.description || '',
                salary: job.salary || '',
                location: job.location || '',
                position: job.position || '',
                jobType: job.jobType || '',
                lastDateOfApplication: job.lastDateOfApplication?.split("T")[0] || '', // Make sure it's in 'YYYY-MM-DD' format
                experienceLevel: job.experienceLevel || '' // Corrected spelling and used optional chaining for safety
            });
        }
    }, [allAdminJobs, jobId]);

    const handleChange = (e) => {
        setJobData({
            ...jobData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateJob({ jobId, updatedData: jobData }));  // Pass jobId and jobData as an object
    };

    // Optional: Redirect after job update success
    useEffect(() => {
        console.log("EditJob Component is Called.")
        if (!loading && !error) {
            navigate('/admin/jobs');  // Redirect back to the admin jobs list if update is successful
        }
    }, [loading, error, navigate]);

    return (
        <div>
            <h2>Edit Job</h2>
            {error && <p style={{ color: 'red' }}>Failed to update job: {error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title</label>
                    <input
                        type="text"
                        name="title"
                        value={jobData.title}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Description</label>
                    <textarea
                        name="description"
                        value={jobData.description}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Salary</label>
                    <input
                        type="text"
                        name="salary"
                        value={jobData.salary}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Location</label>
                    <input
                        type="text"
                        name="location"
                        value={jobData.location}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Position</label>
                    <input
                        type="text"
                        name="position"
                        value={jobData.position}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Job Type</label>
                    <input
                        type="text"
                        name="jobType"
                        value={jobData.jobType}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Experience Level</label>
                    <input
                        type="text"
                        name="experienceLevel"
                        value={jobData.experienceLevel}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Last Date of Application</label>
                    <input
                        type="date"
                        name="lastDateOfApplication"
                        value={jobData.lastDateOfApplication} // Already in 'YYYY-MM-DD' format
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Updating...' : 'Update Job'}
                </button>
            </form>
        </div>
    );
};

export default EditJob;
