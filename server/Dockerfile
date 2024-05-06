# Use the official Node.js image
FROM node:14

# Set the working directory
WORKDIR /server

# Copy Node.js dependency files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the port your application uses
EXPOSE 3001

# Command to run the application, adjusted for the correct directory
CMD ["node", "src/main.js"]
