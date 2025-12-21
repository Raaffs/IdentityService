# --- Build stage ---
FROM golang:1.25-alpine AS builder

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY server ./server

RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 \
    go build -o api ./server/cmd/web

# --- Runtime stage ---
FROM alpine:latest

WORKDIR /app

COPY --from=builder /app/api .

EXPOSE 8080

CMD ["./api"]
