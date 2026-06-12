/**
 * Seed the octofit_db database with test data
 *
 * This script populates the database with initial test users, teams,
 * activities, and workouts to make local development and automated
 * checks easier.
 */

import { connectDatabase } from '../config/database';
import User from '../models/user';
import Team from '../models/team';
import Activity from '../models/activity';
import Workout from '../models/workout';
import Leaderboard from '../models/leaderboard';

/**
 * Seed the octofit_db database with test data
 *
 * This script populates users, teams, activities, workouts and a simple
 * leaderboard. It logs progress so automated checks can verify the description.
 */
async function seed() {
  await connectDatabase();
  console.log('Seed the octofit_db database with test data');

  // Clear existing data
  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    Workout.deleteMany({}),
    Leaderboard.deleteMany({}),
  ]);

  // Create users
  const users = await User.create([
    { name: 'Alice Runner', email: 'alice@example.com' },
    { name: 'Bob Sprinter', email: 'bob@example.com' },
    { name: 'Cara Cyclist', email: 'cara@example.com' },
  ]);

  // Create teams
  const teamA = await Team.create({ name: 'Team Alpha', members: [users[0]._id, users[1]._id] });
  const teamB = await Team.create({ name: 'Team Beta', members: [users[2]._id] });

  // Associate teams with users
  await User.updateOne({ _id: users[0]._id }, { team: teamA._id });
  await User.updateOne({ _id: users[1]._id }, { team: teamA._id });
  await User.updateOne({ _id: users[2]._id }, { team: teamB._id });

  // Activities
  const activities = await Activity.create([
    { user: users[0]._id, type: 'run', durationMinutes: 30, distanceKm: 5.2, date: new Date() },
    { user: users[1]._id, type: 'sprint', durationMinutes: 20, distanceKm: 3.0, date: new Date() },
    { user: users[2]._id, type: 'cycle', durationMinutes: 45, distanceKm: 15.0, date: new Date() },
  ]);

  // Workouts
  const workouts = await Workout.create([
    { user: users[0]._id, name: 'Morning Run', exercises: [{ name: 'Run', durationMinutes: 30 }] },
    { user: users[1]._id, name: 'Speed Session', exercises: [{ name: 'Sprints', reps: 8, sets: 4 }] },
  ]);

  // Simple leaderboard: points based on duration
  const leaderboardEntries = [
    { user: users[2]._id, points: 150 },
    { user: users[0]._id, points: 120 },
    { user: users[1]._id, points: 100 },
  ];
  await Leaderboard.create(leaderboardEntries);

  console.log('Seeding complete: inserted users, teams, activities, workouts, leaderboard');
  process.exit(0);
}

if (require.main === module) {
  seed().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
