import jobs from "../data";

export const getAllJobs = () => {
  return Object.values(jobs);
};

export const getJob = (slug) => {
  return jobs[slug];
};
