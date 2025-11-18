# React CRUD Demo (Login + AG Grid + JSON Server)

## What is included
- Login page (mocked auth via `db.json`)
- CRUD for users (list, add, edit, delete)
- AG Grid for listing
- Mock API with `json-server`

## Quick start

1. Extract the zip and open terminal in project folder.
2. Install deps:
   ```
   npm install
   ```
3. In one terminal start JSON server:
   ```
   npm run server
   ```
   This runs: http://localhost:5000
4. In another terminal start React:
   ```
   npm start
   ```
5. Login with:
   - username: `admin`
   - password: `123456`

## Notes
- If you get CORS/network errors make sure json-server is running on port 5000.
- This is a minimal demo intended for learning. You can expand it (validation, JWT, styling).

