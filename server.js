const express = require('express');
const bodyParser = require('body-parser');
const googleTrends = require('google-trends-api');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Top trends

app.post('/api/trends', (req, res) => {
  const {date, region} = req.body;
  googleTrends.dailyTrends({
    trendDate: new Date(date),
    geo: region,
  }, function(err, results) {
    if (err) {
      console.log(err);
    }else{
      res.send(results)
    }
  });
});

// Trends over time

app.post('/api/search', (req, res) => {
  const {keyword, startTime, endTime } = req.body
  googleTrends.interestOverTime({
    keyword: keyword, 
    startTime: new Date(startTime), 
    endTime: new Date(endTime)})
.then(function(results){
  res.send(results)
})
.catch(function(err){
  console.error(err);
});

})

app.post('/api/world', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});

app.listen(port, () => console.log(`Listening on port ${port}`));