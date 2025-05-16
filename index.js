// import pkg from 'jsonfile';
// const { writeFile } = pkg;
// import dayjs from 'dayjs';
// import simpleGit from 'simple-git';
// import { randomInt } from 'crypto';

// const FILE_PATH = './data.json';
// const git = simpleGit();

// const makeCommit = async (n) => {
//   if (n === 0) {
//     await git.push();
//     console.log('All commits pushed!');
//     return;
//   }

//   const x = randomInt(0, 55); // Random weeks (0-54 inclusive).
//   const y = randomInt(0, 7);  // Random days (0-6 inclusive).

//   // Generate a random date within the past year, but not beyond today.
//   const DATE = dayjs()
//     .subtract(1, 'year')
//     .add(x, 'week')
//     .add(y, 'day')
//     .endOf('day') // To ensure the date is not after today.
//     .isAfter(dayjs()) ? dayjs() : dayjs().subtract(1, 'year').add(x, 'week').add(y, 'day');

//   const formattedDate = DATE.format();

//   console.log(`Generated date: ${formattedDate}`);

//   const data = { date: formattedDate };

//   await writeFile(FILE_PATH, data);
//   await git.add([FILE_PATH]).commit(formattedDate, { '--date': formattedDate });
//   console.log(`Commit #${n} created with date: ${formattedDate}`);

//   await makeCommit(n - 1);
// };

// makeCommit(500).then(() => console.log('Commit process complete.'));

//===============================================================================================================================

import pkg from "jsonfile";
const { writeFile } = pkg;
import simpleGit from "simple-git";
import dayjs from "dayjs";

const FILE_PATH = "./data.json";
const git = simpleGit();

const getRandomTime = (selectedDate) => {
  const startOfDay = dayjs(selectedDate).startOf("day").valueOf();
  const endOfDay = dayjs(selectedDate).endOf("day").valueOf();
  const randomTimestamp =
    Math.floor(Math.random() * (endOfDay - startOfDay + 1)) + startOfDay;
  return dayjs(randomTimestamp).format(); // Return a random time within the day.
};

const makeCommitsOnDate = async (n, selectedDate) => {
  if (n <= 0) {
    await git.push();
    console.log("All commits pushed!");
    return;
  }

  // Generate a random time for the commit on the selected date.
  const DATE = getRandomTime(selectedDate);
  const data = { date: DATE };

  console.log(`Making commit #${n} on: ${DATE}`);

  try {
    await writeFile(FILE_PATH, data); // Write the random date and time to the file.
    await git.add([FILE_PATH]).commit(DATE, { "--date": DATE }); // Create the commit with the random time.
    console.log(`Commit #${n} created.`);
    await makeCommitsOnDate(n - 1, selectedDate); // Recursive call.
  } catch (error) {
    console.error("Error during commit process:", error);
  }
};

// Example Usage:
// Replace '2024-11-26' with your chosen date in YYYY-MM-DD format.
// Replace 10 with the number of commits you want.
makeCommitsOnDate(8, "2025-05-20").then(() =>
  console.log("Commit process complete.")
);

//===============================================================================================================================

// import pkg from 'jsonfile';
// const { writeFile } = pkg;
// import simpleGit from 'simple-git';
// import dayjs from 'dayjs';

// const FILE_PATH = './data.json';
// const git = simpleGit();

// // Helper function to generate a random time within the selected date
// const getRandomTime = (selectedDate) => {
//   const startOfDay = dayjs(selectedDate).startOf('day').valueOf();
//   const endOfDay = dayjs(selectedDate).endOf('day').valueOf();
//   const randomTimestamp = Math.floor(Math.random() * (endOfDay - startOfDay + 1)) + startOfDay;
//   return dayjs(randomTimestamp).format(); // Return a random time within the day.
// };

// // Main function to make commits
// const makeCommitsOnDate = async (selectedDate, minCommits, maxCommits) => {
//   // Generate a random number of commits
//   const commitCount = Math.floor(Math.random() * (maxCommits - minCommits + 1)) + minCommits;

//   console.log(`Generating ${commitCount} commits on ${selectedDate}`);

//   const createCommit = async (n) => {
//     if (n <= 0) {
//       await git.push();
//       console.log('All commits pushed!');
//       return;
//     }

//     // Generate a random time for the commit on the selected date
//     const DATE = getRandomTime(selectedDate);
//     const data = { date: DATE };

//     console.log(`Making commit #${n} on: ${DATE}`);

//     try {
//       await writeFile(FILE_PATH, data); // Write the random date and time to the file
//       await git.add([FILE_PATH]).commit(DATE, { '--date': DATE }); // Create the commit with the random time
//       console.log(`Commit #${n} created.`);
//       await createCommit(n - 1); // Recursive call
//     } catch (error) {
//       console.error('Error during commit process:', error);
//     }
//   };

//   // Start creating commits
//   await createCommit(commitCount);
// };

// // Example Usage:
// // Replace '2024-11-26' with your chosen date in YYYY-MM-DD format.
// // Replace 5 (minCommits) and 15 (maxCommits) with your desired range for the number of commits.
// makeCommitsOnDate('2024-11-28', 5, 15).then(() => console.log('Commit process complete.'));

//===============================================================================================================================

// //Delete Commits Froma a Specific Date

// import { exec } from 'child_process';

// const deleteCommitsOnDate = (targetDate) => {
//   console.log(`Deleting all commits on ${targetDate}...`);

//   const command = `
//     git filter-repo --commit-callback '
//       commit.author_date.startswith("${targetDate}") or
//       commit.committer_date.startswith("${targetDate}") and commit.message is None'
//   `;

//   exec(command, (error, stdout, stderr) => {
//     if (error) {
//       console.error(`Error deleting commits: ${error.message}`);
//       return;
//     }
//     if (stderr) {
//       console.error(`stderr: ${stderr}`);
//       return;
//     }
//     console.log(stdout);
//     console.log('All commits for the target date have been deleted.');
//   });
// };

// // Example Usage
// // Replace '2024-11-26' with your target date in YYYY-MM-DD format.
// deleteCommitsOnDate('2024-12-06');

// import simpleGit from 'simple-git';
// import moment from 'moment';  // For date manipulation

// // Initialize simpleGit
// const git = simpleGit();

// // The date to delete commits on (in YYYY-MM-DD format)
// const targetDate = '2024-12-13';

// // Function to get commits and filter by date
// async function deleteCommitsByDate() {
//   try {
//     // Fetch all commits with detailed info
//     const log = await git.log();

//     // Filter commits by the target date
//     const commitsToDelete = log.all.filter(commit => {
//       const commitDate = moment(commit.date);
//       return commitDate.format('YYYY-MM-DD') === targetDate;
//     });

//     if (commitsToDelete.length === 0) {
//       console.log(`No commits found for the date ${targetDate}`);
//       return;
//     }

//     // Go through each commit and reset (delete) it from the history
//     for (const commit of commitsToDelete) {
//       console.log(`Deleting commit ${commit.hash} from ${commit.date}`);

//       // Use git filter-branch or other tools to delete commit (this is a destructive operation)
//       await git.raw([
//         'filter-branch', '--force', '--commit-filter',
//         `
//           if [ "$(git show -s --format=%ci $GIT_COMMIT)" = "${commit.date}" ]; then
//             skip_commit "$@";
//           else
//             git commit-tree "$@";
//           fi
//         `, '--', '--all'
//       ]);

//       console.log(`Commit ${commit.hash} deleted`);
//     }

//     console.log(`Successfully deleted all commits on ${targetDate}`);
//   } catch (error) {
//     console.error('Error deleting commits:', error);
//   }
// }

// // Run the function
// deleteCommitsByDate();
