FROM        node:18-alpine3.18

RUN        npm set progress=true

WORKDIR    /app
COPY       package.json ./

RUN         npm install --omit=dev
COPY        ./src ./

RUN         npm cache clean --force

CMD         ["node", "app.js"]

EXPOSE 5000