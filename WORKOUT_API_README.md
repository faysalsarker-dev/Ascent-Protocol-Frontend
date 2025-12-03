# AURA Fitness - Workout API Documentation

Complete API documentation for workout planning and tracking endpoints.

## 🔐 Authentication

All endpoints require authentication. Include the `accessToken` cookie in your requests.

---

## 📋 Table of Contents

1. [Workout Plans](#workout-plans)
2. [Workout Days](#workout-days)
3. [Planned Exercises](#planned-exercises)
4. [Workout Sessions](#workout-sessions)
5. [Exercise Sets](#exercise-sets)

---

## 🎯 Workout Plans

### Create a Weekly Plan

**POST** `/api/workout-plans`

Creates a new weekly workout plan and automatically sets it as active (deactivates other plans).

**Request Body:**
```json
{
  "name": "Muscle Building Plan",
  "description": "A 7-day plan focused on muscle growth",
  "startDate": "2024-01-01T00:00:00.000Z" // Optional, defaults to now
}
```

**Response:**
```json
{
  "success": true,
  "message": "Workout plan created successfully",
  "data": {
    "id": "uuid",
    "userId": "uuid",
    "name": "Muscle Building Plan",
    "description": "A 7-day plan focused on muscle growth",
    "isActive": true,
    "startDate": "2024-01-01T00:00:00.000Z",
    "endDate": null,
    "workoutDays": [],
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

### Get All Plans

**GET** `/api/workout-plans`

Returns all workout plans for the authenticated user.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "name": "Muscle Building Plan",
      "isActive": true,
      "workoutDays": [...],
      "_count": {
        "workoutDays": 7,
        "sessions": 12
      }
    }
  ]
}
```

---

### Get Active Plan

**GET** `/api/workout-plans/active`

Returns the currently active workout plan.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "Muscle Building Plan",
    "isActive": true,
    "workoutDays": [
      {
        "id": "uuid",
        "dayOfWeek": 1,
        "name": "Chest & Shoulder",
        "exercises": [...]
      }
    ]
  }
}
```

---

### Get Plan by ID

**GET** `/api/workout-plans/:planId`

Returns a specific plan by ID.

**Response:** Same structure as Create Plan

---

### Update Plan

**PUT** `/api/workout-plans/:planId`

Updates a workout plan.

**Request Body:**
```json
{
  "name": "Updated Plan Name",
  "description": "New description",
  "endDate": "2024-12-31T00:00:00.000Z" // Optional
}
```

---

### Activate Plan

**PATCH** `/api/workout-plans/:planId/activate`

Activates a specific plan and deactivates all others.

**Response:**
```json
{
  "success": true,
  "message": "Plan activated successfully",
  "data": { ... }
}
```

---

### Delete Plan

**DELETE** `/api/workout-plans/:planId`

Deletes a workout plan (cascades to workout days and exercises).

---

## 📅 Workout Days

### Add Workout Day

**POST** `/api/workout-days/plan/:planId`

Adds a new day to a workout plan.

**Request Body:**
```json
{
  "dayOfWeek": 1, // 1=Monday, 2=Tuesday, ..., 7=Sunday
  "name": "Chest & Shoulder",
  "isRestDay": false,
  "notes": "Focus on form",
  "order": 1 // Optional, auto-increments if not provided
}
```

**Response:**
```json
{
  "success": true,
  "message": "Workout day added successfully",
  "data": {
    "id": "uuid",
    "weeklyPlanId": "uuid",
    "dayOfWeek": 1,
    "name": "Chest & Shoulder",
    "isRestDay": false,
    "notes": "Focus on form",
    "order": 1,
    "exercises": [],
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

### Get Plan Days

**GET** `/api/workout-days/plan/:planId`

Returns all days for a specific plan.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "dayOfWeek": 1,
      "name": "Chest & Shoulder",
      "exercises": [...],
      "_count": {
        "exercises": 5,
        "sessions": 3
      }
    }
  ]
}
```

---

### Get Today's Workout

**GET** `/api/workout-days/today`

Returns today's scheduled workout based on the active plan.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "dayOfWeek": 1,
    "name": "Chest & Shoulder",
    "exercises": [
      {
        "id": "uuid",
        "exerciseName": "Bench Press",
        "muscleGroup": "CHEST",
        "targetSets": 3,
        "targetReps": "8-12",
        "targetWeight": 60,
        "order": 1
      }
    ],
    "weeklyPlan": {
      "id": "uuid",
      "name": "Muscle Building Plan",
      "isActive": true
    }
  }
}
```

---

### Get Workout Day

**GET** `/api/workout-days/:dayId`

Returns a specific workout day.

---

### Update Workout Day

**PUT** `/api/workout-days/:dayId`

Updates a workout day.

**Request Body:**
```json
{
  "name": "Updated Day Name",
  "isRestDay": false,
  "notes": "Updated notes",
  "order": 2
}
```

---

### Delete Workout Day

**DELETE** `/api/workout-days/:dayId`

Deletes a workout day (cascades to exercises).

---

## 💪 Planned Exercises

### Add Exercise

**POST** `/api/planned-exercises/day/:dayId`

Adds an exercise to a workout day.

**Request Body:**
```json
{
  "exerciseName": "Incline Bench Press",
  "muscleGroup": "CHEST", // CHEST, BACK, SHOULDERS, BICEPS, TRICEPS, LEGS, GLUTES, CORE, CARDIO, FULL_BODY
  "targetSets": 3,
  "targetReps": "8-12", // Can be "10" or "8-12"
  "targetWeight": 60, // Optional, in kg
  "restSeconds": 90, // Optional
  "notes": "Focus on controlled movement", // Optional
  "videoUrl": "https://example.com/video", // Optional
  "order": 1 // Optional, auto-increments
}
```

**Response:**
```json
{
  "success": true,
  "message": "Exercise added successfully",
  "data": {
    "id": "uuid",
    "workoutDayId": "uuid",
    "exerciseName": "Incline Bench Press",
    "muscleGroup": "CHEST",
    "targetSets": 3,
    "targetReps": "8-12",
    "targetWeight": 60,
    "restSeconds": 90,
    "order": 1,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

### Get Day Exercises

**GET** `/api/planned-exercises/day/:dayId`

Returns all exercises for a workout day.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "exerciseName": "Incline Bench Press",
      "muscleGroup": "CHEST",
      "targetSets": 3,
      "targetReps": "8-12",
      "targetWeight": 60,
      "order": 1
    }
  ]
}
```

---

### Update Exercise

**PUT** `/api/planned-exercises/:exerciseId`

Updates a planned exercise.

**Request Body:**
```json
{
  "targetSets": 4,
  "targetReps": "10-12",
  "targetWeight": 65,
  "restSeconds": 120
}
```

---

### Delete Exercise

**DELETE** `/api/planned-exercises/:exerciseId`

Deletes a planned exercise.

---

### Reorder Exercises

**POST** `/api/planned-exercises/day/:dayId/reorder`

Reorders exercises within a day.

**Request Body:**
```json
[
  {
    "exerciseId": "uuid-1",
    "newOrder": 1
  },
  {
    "exerciseId": "uuid-2",
    "newOrder": 2
  }
]
```

---

### Duplicate Exercise

**POST** `/api/planned-exercises/:exerciseId/duplicate`

Creates a copy of an exercise in the same day.

---

## 🏋️ Workout Sessions

### Start Session

**POST** `/api/workout-sessions`

Starts a new workout session.

**Request Body:**
```json
{
  "workoutDayId": "uuid", // Optional, links to planned day
  "sessionDate": "2024-01-01T00:00:00.000Z", // Optional, defaults to now
  "dayName": "Chest & Shoulder",
  "notes": "Feeling strong today" // Optional
}
```

**Response:**
```json
{
  "success": true,
  "message": "Workout session started",
  "data": {
    "id": "uuid",
    "userId": "uuid",
    "workoutDayId": "uuid",
    "sessionDate": "2024-01-01T00:00:00.000Z",
    "dayName": "Chest & Shoulder",
    "status": "IN_PROGRESS",
    "startedAt": "2024-01-01T10:00:00.000Z",
    "completedAt": null,
    "durationMin": null,
    "totalSets": 0,
    "totalVolume": null,
    "xpEarned": 0,
    "workoutDay": {
      "exercises": [...]
    }
  }
}
```

---

### Get Current Session

**GET** `/api/workout-sessions/current`

Returns the current in-progress session, if any.

**Response:** Same structure as Start Session, or `null` if no active session

---

### Get Session

**GET** `/api/workout-sessions/:sessionId`

Returns a specific workout session with all exercise sets.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "status": "COMPLETED",
    "dayName": "Chest & Shoulder",
    "startedAt": "2024-01-01T10:00:00.000Z",
    "completedAt": "2024-01-01T11:30:00.000Z",
    "durationMin": 90,
    "totalSets": 15,
    "totalVolume": 4500,
    "mood": "GOOD",
    "energyLevel": 8,
    "xpEarned": 55,
    "exerciseSets": [
      {
        "id": "uuid",
        "exerciseName": "Bench Press",
        "setNumber": 1,
        "reps": 12,
        "weight": 60,
        "formRating": 4,
        "difficulty": 3
      }
    ]
  }
}
```

---

### Get User Sessions

**GET** `/api/workout-sessions`

Returns all workout sessions for the user with pagination.

**Query Parameters:**
- `status` - Filter by status: `IN_PROGRESS`, `COMPLETED`, `SKIPPED`
- `limit` - Number of results (default: 50)
- `offset` - Pagination offset (default: 0)
- `startDate` - Filter sessions from this date
- `endDate` - Filter sessions until this date

**Example:**
```
GET /api/workout-sessions?status=COMPLETED&limit=20&offset=0&startDate=2024-01-01&endDate=2024-01-31
```

**Response:**
```json
{
  "success": true,
  "data": [...],
  "meta": {
    "pagination": {
      "total": 50,
      "limit": 20,
      "offset": 0
    }
  }
}
```

---

### Update Session

**PUT** `/api/workout-sessions/:sessionId`

Updates a workout session.

**Request Body:**
```json
{
  "status": "IN_PROGRESS", // Optional
  "completedAt": "2024-01-01T11:30:00.000Z", // Optional
  "durationMin": 90, // Optional, auto-calculated if completedAt provided
  "mood": "GOOD", // Optional: EXCELLENT, GOOD, AVERAGE, TIRED, POOR
  "energyLevel": 8, // Optional: 1-10
  "notes": "Great workout!" // Optional
}
```

---

### Complete Session

**PATCH** `/api/workout-sessions/:sessionId/complete`

Completes a workout session and calculates XP, updates user stats.

**Request Body:**
```json
{
  "mood": "GOOD", // Optional
  "energyLevel": 8, // Optional: 1-10
  "notes": "Great workout!" // Optional
}
```

**Response:**
```json
{
  "success": true,
  "message": "Workout completed successfully!",
  "data": {
    "id": "uuid",
    "status": "COMPLETED",
    "completedAt": "2024-01-01T11:30:00.000Z",
    "durationMin": 90,
    "totalSets": 15,
    "totalVolume": 4500,
    "xpEarned": 55,
    "mood": "GOOD",
    "energyLevel": 8
  }
}
```

---

### Skip Session

**PATCH** `/api/workout-sessions/:sessionId/skip`

Marks a session as skipped.

---

### Delete Session

**DELETE** `/api/workout-sessions/:sessionId`

Deletes a workout session (cascades to exercise sets).

---

## 📊 Exercise Sets

### Add Set

**POST** `/api/exercise-sets/session/:sessionId`

Adds a single exercise set to a session.

**Request Body:**
```json
{
  "exerciseName": "Bench Press",
  "muscleGroup": "CHEST",
  "setNumber": 1,
  "reps": 12,
  "weight": 60, // Optional, in kg
  "restSeconds": 90, // Optional
  "formRating": 4, // Optional: 1-5
  "difficulty": 3, // Optional: 1-5
  "notes": "Felt strong" // Optional
}
```

**Response:**
```json
{
  "success": true,
  "message": "Set added successfully",
  "data": {
    "id": "uuid",
    "sessionId": "uuid",
    "exerciseName": "Bench Press",
    "muscleGroup": "CHEST",
    "setNumber": 1,
    "reps": 12,
    "weight": 60,
    "restSeconds": 90,
    "formRating": 4,
    "difficulty": 3,
    "isPersonalRecord": false,
    "previousReps": null,
    "previousWeight": null,
    "improvement": null,
    "createdAt": "2024-01-01T10:15:00.000Z"
  }
}
```

---

### Add Bulk Sets

**POST** `/api/exercise-sets/session/:sessionId/bulk`

Adds multiple sets for an exercise at once.

**Request Body:**
```json
{
  "exerciseName": "Bench Press",
  "muscleGroup": "CHEST",
  "sets": [
    {
      "setNumber": 1,
      "reps": 12,
      "weight": 60,
      "restSeconds": 90,
      "formRating": 4,
      "difficulty": 3
    },
    {
      "setNumber": 2,
      "reps": 10,
      "weight": 60,
      "restSeconds": 90,
      "formRating": 4,
      "difficulty": 4
    },
    {
      "setNumber": 3,
      "reps": 8,
      "weight": 60,
      "restSeconds": null,
      "formRating": 3,
      "difficulty": 5
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "message": "Sets added successfully",
  "data": [
    { ...set1 },
    { ...set2 },
    { ...set3 }
  ]
}
```

---

### Get Session Sets

**GET** `/api/exercise-sets/session/:sessionId`

Returns all sets for a session, ordered by exercise name and set number.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "exerciseName": "Bench Press",
      "setNumber": 1,
      "reps": 12,
      "weight": 60
    },
    {
      "id": "uuid",
      "exerciseName": "Bench Press",
      "setNumber": 2,
      "reps": 10,
      "weight": 60
    }
  ]
}
```

---

### Get Session Sets Grouped

**GET** `/api/exercise-sets/session/:sessionId/grouped`

Returns sets grouped by exercise name.

**Response:**
```json
{
  "success": true,
  "data": {
    "Bench Press": [
      { "setNumber": 1, "reps": 12, "weight": 60 },
      { "setNumber": 2, "reps": 10, "weight": 60 }
    ],
    "Incline Dumbbell Press": [
      { "setNumber": 1, "reps": 10, "weight": 25 }
    ]
  }
}
```

---

### Get Set

**GET** `/api/exercise-sets/:setId`

Returns a specific exercise set.

---

### Update Set

**PUT** `/api/exercise-sets/:setId`

Updates an exercise set.

**Request Body:**
```json
{
  "reps": 13,
  "weight": 62.5,
  "formRating": 5,
  "difficulty": 2,
  "isPersonalRecord": true,
  "notes": "New PR!"
}
```

---

### Delete Set

**DELETE** `/api/exercise-sets/:setId`

Deletes an exercise set and updates session totals.

---

### Get Exercise History

**GET** `/api/exercise-sets/history/:exerciseName`

Returns historical data for a specific exercise.

**Query Parameters:**
- `limit` - Number of results (default: 50)

**Example:**
```
GET /api/exercise-sets/history/Bench%20Press?limit=30
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "exerciseName": "Bench Press",
      "setNumber": 1,
      "reps": 12,
      "weight": 60,
      "session": {
        "id": "uuid",
        "sessionDate": "2024-01-01T00:00:00.000Z",
        "dayName": "Chest & Shoulder"
      }
    }
  ]
}
```

---

### Get Personal Records

**GET** `/api/exercise-sets/personal-records`

Returns all personal records for the user.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "exerciseName": "Bench Press",
      "reps": 12,
      "weight": 80,
      "isPersonalRecord": true,
      "session": {
        "sessionDate": "2024-01-15T00:00:00.000Z",
        "dayName": "Chest & Shoulder"
      }
    }
  ]
}
```

---

## 🔄 Complete Workflow Example

### 1. Create a Plan
```bash
POST /api/workout-plans
{
  "name": "My First Plan",
  "description": "A beginner-friendly plan"
}
```

### 2. Add Workout Days
```bash
POST /api/workout-days/plan/{planId}
{
  "dayOfWeek": 1,
  "name": "Chest & Shoulder"
}
```

### 3. Add Exercises to Day
```bash
POST /api/planned-exercises/day/{dayId}
{
  "exerciseName": "Bench Press",
  "muscleGroup": "CHEST",
  "targetSets": 3,
  "targetReps": "8-12",
  "targetWeight": 60
}
```

### 4. Start Workout Session
```bash
POST /api/workout-sessions
{
  "workoutDayId": "{dayId}",
  "dayName": "Chest & Shoulder"
}
```

### 5. Log Exercise Sets
```bash
POST /api/exercise-sets/session/{sessionId}
{
  "exerciseName": "Bench Press",
  "muscleGroup": "CHEST",
  "setNumber": 1,
  "reps": 12,
  "weight": 60,
  "formRating": 4
}
```

### 6. Complete Session
```bash
PATCH /api/workout-sessions/{sessionId}/complete
{
  "mood": "GOOD",
  "energyLevel": 8
}
```

---

## ⚠️ Error Responses

All errors follow this format:

```json
{
  "success": false,
  "error": {
    "code": "NOT_FOUND_ERROR",
    "message": "Plan not found"
  }
}
```

**Common Error Codes:**
- `NOT_FOUND_ERROR` - Resource not found (404)
- `VALIDATION_ERROR` - Invalid input data (400)
- `CONFLICT_ERROR` - Resource conflict (409)
- `AUTHENTICATION_ERROR` - Missing or invalid token (401)
- `AUTHORIZATION_ERROR` - Insufficient permissions (403)

---

## 📝 Notes

1. **User Isolation**: All endpoints automatically filter by the authenticated user's ID
2. **Cascading Deletes**: Deleting a plan deletes all days and exercises. Deleting a session deletes all sets.
3. **Auto-calculation**: Session totals (totalSets, totalVolume) are automatically calculated from exercise sets
4. **XP System**: Completing a session automatically calculates and awards XP, updates user level and streaks
5. **Personal Records**: The system automatically detects PRs when weight exceeds previous records

---

## 🎯 Muscle Groups

Available muscle group values:
- `CHEST`
- `BACK`
- `SHOULDERS`
- `BICEPS`
- `TRICEPS`
- `LEGS`
- `GLUTES`
- `CORE`
- `CARDIO`
- `FULL_BODY`

---

## 📊 Workout Status

Available status values:
- `PLANNED` - Not started yet
- `IN_PROGRESS` - Currently working out
- `COMPLETED` - Finished
- `SKIPPED` - Missed this day

---

## 😊 Mood Values

Available mood values:
- `EXCELLENT`
- `GOOD`
- `AVERAGE`
- `TIRED`
- `POOR`

---

## 🔗 Related Endpoints

- User Profile: `/api/users/profile`
- User Stats: `/api/users/stats`
- Achievements: `/api/users/achievements`
- AI Insights: `/api/ai/*`

---

**Happy Training! 💪**

