# Node JS Image
FROM node:latest

# Set Working Directory
WORKDIR /app

# Copy all files to working directory
COPY . /app

# Install Dependencies
RUN npm install

# Expose Port
EXPOSE 3000

# Build App
RUN npm run build

# Start App
CMD ["npm", "run", "start"]