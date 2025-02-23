import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../main';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/v1/job/getall", { withCredentials: true });
        if (res.data && res.data.jobs) {
          setJobs(res.data.jobs);
        } else {
          setJobs([]);
        }
      } catch (error) {
        console.error(error);
        setJobs([]);
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    if (!isAuthorized) {
      navigateTo("/login");
    }
  }, [isAuthorized, navigateTo]);

  return (
    <>
      <div className="jobs page">
        <div className="container">
          <h1>ALL AVAILABLE JOBS</h1>
          <div className="banner">
            {jobs.length > 0 ? (
              jobs.map((element) => (
                <div className="card" key={element._id}>
                  <p>{element.title}</p>
                  <p>{element.category}</p>
                  <p>{element.country}</p>
                  <Link to={`/job/${element._id}`}>Job Details</Link>
                </div>
              ))
            ) : (
              <p>No jobs available</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Jobs;
