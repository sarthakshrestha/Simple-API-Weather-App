const bodyParser = require("body-parser");
const express = require("express");
const https = require("https");
const path = require("path");

const app = express();

// Serve static files (including styles.css)
app.use(express.static(path.join(__dirname, "/")));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.listen(3001, function () {
  console.log("Server is running on port 3001");
});

app.post("/", function (req, res) {
  console.log(req.body.cityName);

  const location = req.body.cityName;
  const apiKey = "de6ca186fc7812616bfd93bc68595175";
  const units = "metric";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    location +
    "&appid=" +
    apiKey +
    "&units=" +
    units;

  https.get(url, function (response) {
    let data = "";

    response.on("data", function (chunk) {
      // Collect the data chunks
      data += chunk;
    });

    response.on("end", function () {
      // Parse the complete data when the response ends
      const weatherData = JSON.parse(data);

      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL =
        "https://openweathermap.org/img/wn/" + icon + "@2x.png";

      console.log(temp);
      console.log(weatherData);

      // Additional logging for testing purposes
      const object = {
        name: "Ram Shyam",
        favFood: "Ramen",
      };
      const fObject = JSON.stringify(object);
      console.log(fObject);
      console.log(description);

      res.write(
        "<div class='weather-info'>" +
          "<p>The weather in " +
          location +
          " is " +
          description +
          " and the temperature is " +
          temp +
          "</p>" +
          "<h1>The temperature in " +
          location +
          " is " +
          temp +
          " degrees Celsius.</h1>" +
          "<img src=" +
          imageURL +
          ">" +
          "</div>"
      );
      res.write(
        "<script>document.querySelector('.container').classList.add('show');</script>"
      );

      res.send();
    });
  });

  console.log("Post Req Received");
});
