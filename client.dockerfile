# --- Build stage ---
FROM node:20-alpine AS builder

WORKDIR /app

# --- ADD THESE TWO LINES ---
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
# ---------------------------
RUN echo "THE API URL IS: $VITE_API_BASE_URL"
COPY client/package*.json ./
RUN npm ci

COPY client .
RUN npm run build

# --- Runtime stage ---
FROM nginx:alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY client/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]