module.exports = {
  apps: [
    {
      name: "backend", // Name of the backend process
      script: "node ./index.js", // Path to your backend entry file
      cwd: "./backend", // Backend working directory
      env: {
        NODE_ENV: "production",
      },
    },
    {
      name: "frontend", // Name of the frontend process
      script: "npx", // We will use npx to run the serve package
      args: "serve -s public -l 3000", // Serve the frontend build from the 'public' folder on port 3000
      cwd: "./backend", // Since we copy the frontend build to the backend's 'public' folder
      env: {
        NODE_ENV: "production",
      },
    },
  ],
}
