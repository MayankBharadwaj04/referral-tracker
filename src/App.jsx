import { useState } from "react";
import JobDetail from "./JobDetail";

function App() {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [jobId, setJobId] = useState("");
  const [link, setLink] = useState("");
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);

  const addJob = () => {
    if (!company || !role || !jobId || !link) return;

    const newJob = {
      id: Date.now(),
      company,
      role,
      jobId,
      link,
      people: [],
    };

    setJobs([...jobs, newJob]);

    setCompany("");
    setRole("");
    setJobId("");
    setLink("");
  };
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex justify-center py-10 px-4">
      <div className="w-full max-w-xl">
        <h1 className="text-3xl font-semibold text-gray-800 dark:text-white mb-6 text-center">
          Referral Tracker
        </h1>

        {!selectedJob ? (
          <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-medium mb-4 text-gray-700 dark:text-gray-200">
              Add Job
            </h2>

            <div className="space-y-3">
              <input
                className="input"
                placeholder="Company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
              <input
                className="input"
                placeholder="Role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />
              <input
                className="input"
                placeholder="Job ID"
                value={jobId}
                onChange={(e) => setJobId(e.target.value)}
              />
              <input
                className="input"
                placeholder="Job Link"
                value={link}
                onChange={(e) => setLink(e.target.value)}
              />
            </div>

            <button onClick={addJob} className="btn w-full mt-4">
              Add Job
            </button>

            <h2 className="text-lg font-medium mt-6 mb-3 text-gray-700 dark:text-gray-200">
              Jobs
            </h2>

            <ul className="space-y-2">
              {jobs.map((job) => (
                <li
                  key={job.id}
                  className="p-3 rounded-md border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition"
                  onClick={() => setSelectedJob(job)}
                >
                  <div className="font-medium text-gray-800 dark:text-white">
                    {job.company}
                  </div>
                  <div className="text-sm text-gray-500">{job.role}</div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <JobDetail
            job={selectedJob}
            setSelectedJob={setSelectedJob}
            jobs={jobs}
            setJobs={setJobs}
          />
        )}
      </div>
    </div>
  );
}

export default App;
