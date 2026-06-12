/**
 * Seed the octofit_db database with test data
 *
 * This script populates the database with initial test users, teams,
 * activities, and workouts to make local development and automated
 * checks easier.
 */

import { connectDatabase } from '../config/database';

async function seed() {
  await connectDatabase();
  console.log('Seeding octofit_db with test data (placeholder)');
  // TODO: implement actual seed logic (users, teams, activities, workouts)
  process.exit(0);
}

if (require.main === module) {
  seed().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
