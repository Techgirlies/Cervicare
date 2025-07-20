# ---- Static Frontend ----
FROM nginx:alpine

# Clear the default nginx content
RUN rm -rf /usr/share/nginx/html/*

# Copy your built frontend (HTML/CSS/JS) into nginx directory
COPY . /usr/share/nginx/html

# Expose default HTTP port
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
