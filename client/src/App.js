import React, { Component } from 'react';
import './App.css';
import API from './utils/API';

class App extends Component {
  state = {
    trending: []
  };
  
  componentDidMount() {
    this.callApi()
  }
  
  callApi = async () => {
    API.currentTrends().then(res => {
      const trending = res.data.default.trendingSearchesDays[0].trendingSearches.map(item => item.title.query)
      this.setState({trending: trending})
    })
  };
  
render() {
  const trendingList = this.state.trending.map(res => {
    return <li key={res}>{res}</li>
  })
    return (
      <div style={{listStyle: 'none'}} className="App">
        {trendingList}
      </div>
    );
  }
}

export default App;