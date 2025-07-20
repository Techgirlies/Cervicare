# Use the official NGINX image
FROM nginx:alpine

# Remove the default NGINX static content
RUN rm -rf /usr/share/nginx/html/*

# Copy all frontend files (HTML, CSS, JS, images, etc.) to NGINX web root
COPY . /usr/share/nginx/html

# Optional: Copy a custom nginx config (you can skip this if using defaults)
# COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80 for the container
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
