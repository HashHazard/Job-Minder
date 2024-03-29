import * as SQLite from "expo-sqlite/next";
import * as FileSystem from "expo-file-system";
import { Asset } from "expo-asset";

/* 
  CREATE TABLE IF NOT EXISTS Jobs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    jobTitle TEXT NOT NULL,
    company TEXT NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('Bookmarked', 'Applying', 'Applied', 'Interviewing', 'Negotiating', 'Accepted', 'Declined', 'Rejected', 'Archived')),
    location TEXT,
    url TEXT,
    dateSaved DATE DEFAULT (datetime('now','localtime')),
    dateApplied DATE,
    dateFollowUp DATE,
    notes TEXT
  );
*/

// Load and save database in filesystem
export async function openDatabase() {
  if (
    !(await FileSystem.getInfoAsync(FileSystem.documentDirectory + "SQLite"))
      .exists
  ) {
    await FileSystem.makeDirectoryAsync(
      FileSystem.documentDirectory + "SQLite"
    );
  }
  await FileSystem.downloadAsync(
    Asset.fromModule(require("../../assets/jobDatabase.db")).uri,
    FileSystem.documentDirectory + "SQLite/jobDatabase.db"
  );
  return await SQLite.openDatabaseAsync("jobDatabase.db");
}

// Get all jobs
export async function getAllJobs(db) {
  try {
    const results = await db.getAllAsync(
      "Select * from Jobs Order By dateSaved DESC"
    );
    return results;
  } catch (err) {
    console.error("getAllJobs error: ", err);
  }
}

export async function getJobById(db, id) {
  try {
    const result = await db.getFirstAsync(
      "Select * from Jobs Where id = ?",
      id
    );
    return result;
  } catch (err) {
    console.err("getJobById err: ", err);
  }
}

export async function insertJob(db, job) {
  try {
    db.withTransactionAsync(async () => {
      await db.runAsync(
        "INSERT INTO Jobs (jobTitle, company, status, location, url) VALUES (?, ?, ?, ?, ?)",
        [job.jobTitle, job.company, "Bookmarked", job.location, job.url]
      );
    });
  } catch (err) {
    console.error("insertJob err: ", err);
  }
}

export const deleteJob = async (db, id) => {
  const deleteQuery = `DELETE from Jobs WHERE id = ?`;
  try {
    await db.runAsync(deleteQuery, id);
  } catch (err) {
    console.log("deleteJob err: ", err);
  }
};

// ---------------------------------------------------------------
// ---------------------------------------------------------------
// import { enablePromise, openDatabase } from "react-native-sqlite-storage";

// enablePromise(true);

// export const getDBConnection = async () => {
//   return openDatabase({ name: "job-data.db", location: "default" });
// };

// export const createTable = async (db) => {
//   //   const query = `CREATE TABLE IF NOT EXISTS Jobs (
//   //   id INTEGER PRIMARY KEY AUTOINCREMENT,
//   //   jobTitle TEXT NOT NULL,
//   //   company TEXT NOT NULL,
//   //   status TEXT NOT NULL CHECK (status IN ('Bookmarked', 'Applying', 'Applied', 'Interviewing', 'Negotiating', 'Accepted', 'Declined', 'Rejected', 'Archived')),
//   //   location TEXT DEFAULT '',
//   //   url TEXT DEFAULT '',
//   //   dateSaved DATE DEFAULT (datetime('now','localtime')),
//   //   dateApplied DATE DEFAULT '',
//   //   dateFollowUp DATE DEFAULT '',
//   //   notes TEXT DEFAULT ''
//   // );`;
//   const query = `CREATE TABLE IF NOT EXISTS Jobs (
//   id INTEGER PRIMARY KEY AUTOINCREMENT,
//   jobTitle TEXT NOT NULL,
//   company TEXT NOT NULL,
//   status TEXT NOT NULL CHECK (status IN ('Bookmarked', 'Applying', 'Applied', 'Interviewing', 'Negotiating', 'Accepted', 'Declined', 'Rejected', 'Archived')),
//   location TEXT,
//   url TEXT,
//   dateSaved TEXT,
//   dateApplied TEXT,
//   dateFollowUp TEXT,
//   notes TEXT
// );`;
//   try {
//     await db.executeSql(query);
//   } catch (err) {
//     console.error("Error in creating DB", err);
//   }
// };

// export const getJobs = async (db) => {
//   try {
//     const jobs = [];
//     const results = await db.executeSql(`SELECT * from Jobs`);
//     results.forEach((result) => {
//       for (let i = 0; i < result.rows.length; i++) {
//         jobs.push(result.rows.item(i));
//       }
//     });
//     return jobs;
//   } catch (error) {
//     console.error("DB ERR getJobs ", error);
//     throw Error("Failed to get all jobs");
//   }
// };

// export const saveJobs = async (db, jobs) => {
//   const insertQuery = `INSERT INTO Jobs (jobTitle, company, status, location, url, dateSaved, dateApplied, dateFollowUp, notes)
// VALUES ('Data Analyst', 'Tech Solutions Inc.', 'Applied', 'San Francisco, CA', 'http://example.com/job/data-analyst', '2024-03-20', '2024-03-21', '2024-03-28', 'The Data Analyst position at Tech Solutions Inc. involves analyzing data to provide insights and recommendations for business decisions. Requirements: - Bachelor''s degree in Statistics, Mathematics, Economics, or related field. - Proficiency in SQL and Python. - Experience with data visualization tools such as Tableau or Power BI.');
// `;
//   try {
//     return db.executeSql(insertQuery);
//   } catch (error) {
//     console.log("SAVE JOBS: ", error);
//   }
// };

// // export const saveJobs = async (db, jobs) => {
// //   const insertQuery =
// //     `INSERT OR REPLACE INTO Jobs
// //     (jobTitle, company, status, location, url, dateSaved,
// //         dateApplied, dateFollowUp, notes) VALUES` +
// //     jobs
// //       .map(
// //         (i) =>
// //           `('${i.jobTitle}', '${i.company}', '${i.status}', '${i.location}', '${i.url}', '${i.dateSaved}', '${i.dateApplied}', '${i.dateFollowUp}', '${i.notes}')`
// //       )
// //       .join(",");

// //   return db.executeSql(insertQuery);
// // };

// const insertJob = async (db, params) => {
//   const insertQuery = `INSERT OR REPLACE INTO Jobs
//     (jobTitle, company, status, location, url, dateSaved, dateApplied, dateFollowUp, notes)
//     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
//   try {
//     await db.executeSql(insertQuery, params);
//   } catch (error) {
//     console.error("DB ERR insertJob: ", error);
//   }
// };

// const updateJob = async (db, params) => {
//   const updateQuery = `UPDATE users SET jobTitle = ? WHERE id = ?`;
//   try {
//     await db.executeSql(updateQuery, params);
//   } catch (err) {
//     console.err("DB ERR updateJob: ", err);
//   }
// };

// export const deleteJob = async (db, id) => {
//   const deleteQuery = `DELETE from Jobs where id = ${id}`;
//   try {
//     await db.executeSql(deleteQuery);
//   } catch (err) {
//     console.log(err);
//   }
// };

// export const deleteTable = async (db) => {
//   const query = `drop table Jobs`;
//   try {
//     await db.executeSql(query);
//   } catch (err) {
//     console.log(err);
//   }
// };

// // export const saveJobs = async (db, jobs) => {
// //   const insertQuery = `INSERT OR REPLACE INTO Jobs
// //     (jobTitle, company, status, location, url, dateSaved, dateApplied, dateFollowUp, notes)` +
// //     jobs.map(j=>`($)`);
// // };
