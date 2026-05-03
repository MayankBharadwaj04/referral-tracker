import { useState } from "react";

function JobDetail({ job, setSelectedJob, jobs, setJobs }) {
  const [name, setName] = useState("");

  const updateStatus = (personId, field, value) => {
    const updatedJobs = jobs.map((j) => {
      if (j.id === job.id) {
        return {
          ...j,
          people: j.people.map((p) => {
            if (p.id === personId) {
              return { ...p, [field]: value };
            }
            return p;
          }),
        };
      }
      return j;
    });

    setJobs(updatedJobs);
  };

  const addPerson = () => {
    if (!name) return;

    const updatedJobs = jobs.map((j) => {
      if (j.id === job.id) {
        return {
          ...j,
          people: [
            ...j.people,
            {
              id: Date.now(),
              name,
              connection: "sent",
              message: "not_sent",
              referral: "not_asked",
              notes: "",
              followUp: "",
            },
          ],
        };
      }
      return j;
    });

    setJobs(updatedJobs);
    setName("");
  };

  const currentJob = jobs.find((j) => j.id === job.id);

  return (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <button
        onClick={() => setSelectedJob(null)}
        className="text-sm text-gray-500 hover:text-purple-600 mb-4"
      >
        ⬅ Back
      </button>

      <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
        {job.company}
      </h2>
      <p className="text-gray-500 mb-2">{job.role}</p>

      <p className="text-sm text-gray-400">Job ID: {job.jobId}</p>
      <a
        href={job.link}
        target="_blank"
        rel="noreferrer"
        className="text-sm text-purple-600 hover:underline"
      >
        Open Job Link
      </a>

      <div className="mt-6">
        <h3 className="text-md font-medium mb-2 text-gray-700 dark:text-gray-200">
          Add Person
        </h3>

        <div className="flex gap-2">
          <input
            className="input flex-1"
            placeholder="Person Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button className="btn" onClick={addPerson}>
            Add
          </button>
        </div>
      </div>

      <h3 className="mt-6 mb-3 text-md font-medium text-gray-700 dark:text-gray-200">
        People
      </h3>

      <div className="space-y-4">
        {currentJob.people.map((p) => (
          <div
            key={p.id}
            className="p-4 border border-gray-200 dark:border-gray-700 rounded-md"
          >
            <div className="font-medium text-gray-800 dark:text-white mb-2">
              {p.name}
            </div>

            <div className="grid grid-cols-1 gap-3">

              <div>
                <label className="text-xs text-gray-500">
                  Connection Status
                </label>
                <select
                  className="input"
                  value={p.connection}
                  onChange={(e) =>
                    updateStatus(p.id, "connection", e.target.value)
                  }
                >
                  <option value="sent">Request Sent</option>
                  <option value="accepted">Accepted</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-gray-500">
                  Message Status
                </label>
                <select
                  className="input"
                  value={p.message}
                  onChange={(e) =>
                    updateStatus(p.id, "message", e.target.value)
                  }
                >
                  <option value="not_sent">Not Sent</option>
                  <option value="sent">Sent</option>
                  <option value="replied">Replied</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-gray-500">
                  Referral Status
                </label>
                <select
                  className="input"
                  value={p.referral}
                  onChange={(e) =>
                    updateStatus(p.id, "referral", e.target.value)
                  }
                >
                  <option value="not_asked">Not Asked</option>
                  <option value="asked">Asked</option>
                  <option value="referred">Referred</option>
                  <option value="ignored">Ignored</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-gray-500">Notes</label>
                <textarea
                  className="input"
                  placeholder="What did they say?"
                  value={p.notes}
                  onChange={(e) =>
                    updateStatus(p.id, "notes", e.target.value)
                  }
                />
              </div>

              <div>
                <label className="text-xs text-gray-500">
                  Follow-up Date
                </label>
                <input
                  type="date"
                  className="input"
                  value={p.followUp}
                  onChange={(e) =>
                    updateStatus(p.id, "followUp", e.target.value)
                  }
                />
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default JobDetail;