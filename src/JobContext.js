import { createContext, useContext } from "react";

export const JobContext = createContext();

export function useJobContext() {
  const job = useContext(JobsContext);
  if (job === undefined) {
    throw new Error("useJobContext must be used with a JobContext");
  }
  return job;
}
