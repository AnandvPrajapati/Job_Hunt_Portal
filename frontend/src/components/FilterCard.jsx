import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'

const filterData = [
    {
        filterType: "Location",
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
    },
    {
        filterType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
    },
    {
        filterType: "Salary",
        array: ["0-3LPA", "3LPA - 5LPA", "5LPA - 10LPA", "10LPA above"]
    },
]

const salaryRanges = {
    "0-3LPA": [0, 3],
    "3LPA - 5LPA": [3.1, 5],
    "5LPA - 10LPA": [5.1, 10],
    "10LPA above": [10.1, Infinity]
};

const FilterCard = ({ selectedValue, setSelectedValue  }) => {
    const dispatch = useDispatch();

    const changeHandler = (value) => {
        setSelectedValue(value); // Set the local selected value for UI
        if (salaryRanges[value]) {
            // Dispatch the numerical range for salary filtering
            dispatch(setSearchedQuery(salaryRanges[value]));
        } else {
            // Dispatch the selected string for other filters
            dispatch(setSearchedQuery(value)); 
        }
    };

    return (
        <div className='w-full bg-white p-3 rounded-md'>
            <h1 className='font-bold text-lg'>Filter Jobs</h1>
            <hr className='mt-3' />
            <RadioGroup value={selectedValue} onValueChange={changeHandler}>
                {
                    filterData.map((data, index) => (
                        <div key={index}>
                            <h1 className='font-bold text-lg'>{data.filterType}</h1>
                            {
                                data.array.map((item, idx) => {
                                    const itemId = `id${index}-${idx}`
                                    return (
                                        <div key={itemId} className='flex items-center space-x-2 my-2'>
                                            <RadioGroupItem value={item} id={itemId} />
                                            <Label htmlFor={itemId}>{item}</Label>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    ))
                }
            </RadioGroup>
        </div>
    )
}

export default FilterCard