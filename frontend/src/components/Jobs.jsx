import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { setSearchedQuery } from '@/redux/jobSlice';

// const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8];

const Jobs = () => {
    const dispatch = useDispatch();
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);
    const [selectedValue, setSelectedValue] = useState('');
    
    useEffect(() => {
        if (searchedQuery) {
            const filteredJobs = allJobs.filter((job) => {
                if (Array.isArray(searchedQuery)) {
                    // Salary filtering
                    const [minSalary, maxSalary] = searchedQuery;
                    return job.salary >= minSalary && job.salary <= maxSalary;
                } else {
                    // Handle other filters like location, industry
                    const queryLowerCase = searchedQuery.toLowerCase();
                    return job.title.toLowerCase().includes(queryLowerCase) ||
                    job.description.toLowerCase().includes(queryLowerCase) ||
                    job.location.toLowerCase().includes(queryLowerCase);
                }
            })
            setFilterJobs(filteredJobs)
        } else {
            setFilterJobs(allJobs)
        }
    }, [allJobs, searchedQuery]);
    
    const handleClearFilters = () => {
        dispatch(setSearchedQuery('')); // Use the correct action to clear the filters
        setSelectedValue(''); // Reset selected value for filters
    };

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto mt-5'>
                <div className='flex gap-5'>
                    <div className='w-20%'>
                        <FilterCard selectedValue={selectedValue} setSelectedValue={setSelectedValue} />
                    </div>
                    {
                        filterJobs.length <= 0 ? (
                            <div className="flex flex-1 justify-center h-[50vh]">
                                <div className="flex flex-col items-center justify-center">
                                    <h2 className="text-xl font-semibold mb-2">No Jobs Found</h2>
                                    <p className="text-gray-500">We couldn't find any jobs matching your criteria.</p>
                                    <button 
                                        className="mt-5 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all"
                                        onClick={handleClearFilters}
                                    >
                                        Clear Filters
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                                <div className='grid grid-cols-3 gap-4'>
                                    {
                                        filterJobs.map((job) => (
                                            <motion.div
                                                initial={{ opacity: 0, x: 100 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -100 }}
                                                transition={{ duration: 0.3 }}
                                                key={job?._id}>
                                                <Job job={job} />
                                            </motion.div>
                                        ))
                                    }
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>


        </div>
    )
}

export default Jobs