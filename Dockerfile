#Dockerfile for the React web page
# using node.js as runtime parent image
FROM node:16-alpine

# Setting the working directory in the container
WORKDIR /app

#copying its contents to the container app
COPY . /app

#installing the required packages 
RUN npm install

#Building the app
RUN npm run build 

#Installing a simple HTTP server to serve static content
RUN npm install -g serve

#making the port 5173 avaliable
EXPOSE 5173

# Serve the app
CMD ["serve", "-s", "build"]