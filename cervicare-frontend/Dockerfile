# Use a minimal NGINX image
FROM nginx:alpine

# Remove default nginx web content
RUN rm -rf /usr/share/nginx/html/*

# Copy all static files (HTML, CSS, JS, images, etc.)
COPY . /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Run nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
