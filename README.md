
# Live Weather Web Application

Live Weather is a responsive web application that provides up-to-the-minute weather information for any location worldwide. Built with React, CSS Modules and JavaScript, this app leverages the OpenWeatherMap API to deliver accurate and timely weather data.

## Tech Stack

**Client:** React, NextJS,


## Run Locally

Clone the project

```bash
  git clone https://github.com/sridhar02/live-weather-website
```

Go to the project directory

```bash
  cd live-weather-website
```

copy `env-example` into `.env` & Replace the `NEXT_PUBLIC_API_KEY` with your own API key from OpenWeatherMap

```bash
cp env-example .env
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```


## Deployment

To deploy this project run

```bash
  npm run build
```


## Demo

- Live example of hyderabad city weather & error handling for invalid city name

<video src="./demo.mp4" controls="controls" style="max-width: 730px;">
</video>

## Authors

- [@sridhar02](https://github.com/sridhar02)


## License

[MIT](https://choosealicense.com/licenses/mit/)

