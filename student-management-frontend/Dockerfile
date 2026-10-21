# ===========================
# 1. Build React App
# ===========================
FROM node:18 AS build
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

COPY . .
RUN npm run build


# ===========================
# 2. NGINX Production Server
# ===========================
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Remove default static files
RUN rm -rf ./*

# Copy build output
COPY --from=build /app/build .

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
