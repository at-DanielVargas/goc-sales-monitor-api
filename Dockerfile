FROM node:17.0.1-alpine3.14 as builder

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build


FROM node:17.0.1-alpine3.14

WORKDIR /app

COPY --from=builder /app/package.json /app/package.json
COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/node_modules /app/node_modules


ARG PORT
ARG MOVIES_SERVICE_PORT
ARG MONGO_URI

ENV MONGO_URI=$MONGO_URI
ENV PORT=$PORT
ENV MOVIES_SERVICE_PORT=$MOVIES_SERVICE_PORT


EXPOSE $PORT

CMD ["node", "dist/main.js"]