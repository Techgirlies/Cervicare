FROM nginx:alpine

# Clear the default nginx content
RUN rm -rf /usr/share/nginx/html/*

# Copy all your frontend files into the nginx web root
COPY . /usr/share/nginx/html

# Expose HTTP port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
