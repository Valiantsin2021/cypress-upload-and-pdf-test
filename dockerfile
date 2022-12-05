FROM cypress/included:10.9.0
RUN mkdir /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN npx cypress verify && npx cypress open --browser chrome