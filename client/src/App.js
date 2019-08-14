import React, { Component } from 'react';
import './App.css';
import API from './utils/API';

class App extends Component {
  state = {
    trending: [],
    timelineData: [],
    searchQuery: ''
  };
  
  componentDidMount() {
    this.callApi()
  }
  
  callApi = async () => {
    const searchWord = {
      searchQuery: "Valentine's Day",
      startTime: '2017-01-01',
      endTime: '2017-12-31'
    }
    API.currentTrends().then(res => {
      const trending = res.data.default.trendingSearchesDays[0].trendingSearches.map(item => item.title.query)
      this.setState({trending: trending})
    })
    API.searchQuery(searchWord).then(res => {
      const timelineData = res.data.default.timelineData
      this.setState({timelineData: timelineData})
      console.log(timelineData)
    })
  };
  
render() {
  const trendingList = this.state.trending.map(res => {
    return <li key={res}>{res}</li>
  })
  const timelineData = this.state.timelineData.map(res => {
    return <li key={res.time}>Date: {res.formattedAxisTime} Value: {res.value}</li>
  })
    return (
      <div className="App">
        <h3>Top Searches Today</h3>
        <p>
        {trendingList}
        </p>
        <h3>Trending over time</h3>
        <p>
        {timelineData}
        </p>
      </div>
    );
  }
}

export default App;