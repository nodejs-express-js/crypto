


#!/bin/bash

# Go to backend folder and start the server
echo "Starting backend..."
cd backend || { echo "Backend folder not found!"; exit 1; }
pnpm tsx server.ts &
BACKEND_PID=$!

# Go to project-pluto folder and start the dev server
echo "Starting frontend..."
cd ../project-pluto || { echo "project-pluto folder not found!"; exit 1; }
pnpm run dev &
FRONTEND_PID=$!

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID
