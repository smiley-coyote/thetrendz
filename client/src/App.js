import React, { Component } from 'react';
import './App.css';
import API from './utils/API';
import Wrapper from './components/Wrapper';
import Card from './components/Card/Card';
import Header from './components/Header/';
import Selector from './components/common/Selector';
import Section from './components/Section';


class App extends Component {
  state = {
    trending: [],
    timelineData: [],
    searchQuery: ''
  };

  componentDidMount() {

  }

  callApi = async () => {
    const searchWord = {
      searchQuery: this.state.searchQuery,
      startTime: '2017-01-01',
      endTime: '2017-12-31'
    }
    API.currentTrends().then(res => {
      const trending = res.data.default.trendingSearchesDays[0].trendingSearches.map(item => item.title.query)
      this.setState({ trending: trending })
    })
    API.searchQuery(searchWord).then(res => {
      const timelineData = res.data.default.timelineData
      this.setState({ timelineData: timelineData })
      console.log(timelineData)
    })
  };

  topSearches = () => {
    API.currentTrends().then(res => {
      const trending = res.data.default.trendingSearchesDays[0].trendingSearches.map(item => item.title.query)
      this.setState({ trending: trending })
    })
  }

  handleInputChange = event => {
    const { value } = event.target;
    this.setState({
      searchQuery: value
    });
  };

  onSubmit = () => {
    const searchWord = {
      searchQuery: this.state.searchQuery,
      startTime: '2017-01-01',
      endTime: '2017-12-31'
    }
    API.searchQuery(searchWord).then(res => {
      const timelineData = res.data.default.timelineData
      this.setState({ timelineData: timelineData })
    })
  }

  render() {
    // const trendingList = this.state.trending.map(res => {
    //   return <li key={res}>{res}</li>
    // })
    // const timelineData = this.state.timelineData.map(res => {
    //   return <li key={res.time}>Date: {res.formattedAxisTime} Value: {res.value}</li>
    // })
    const { formStyle, inputStyle } = styles
    return (
      <div className="App">
        <Header />
        <Wrapper>
          <Card>
            <Section style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'baseline'
            }}>
              Top google searches in
              <Selector text={'your region'} />
              <Selector text={'right now'} />
            </Section>

            <button>Go!</button>
            <Section style={{
              flexDirection: 'column',
              alignSelf: 'center',
              textAlign: 'center'
            }}>
              <h2>Trends Over Time</h2>
              <input style={inputStyle} placeHolder={'Bill Gates'} />
              Start Date
            <div style={formStyle}>
                <Selector text={'Year'} />
                <Selector text={'Month'} />
                <Selector text={'Day'} />
              </div>
              End Date
              <div style={formStyle}>
                <Selector text={'Year'} />
                <Selector text={'Month'} />
                <Selector text={'Day'} />
              </div>
            </Section>
            <button>Go!</button>
          </Card>
        </Wrapper>
      </div>
    );
  }
}

const styles = {
  formStyle: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  inputStyle: {
    width: 80,
    height: 25,
    alignSelf: 'center',
    textAlign: 'center'
  }
}

export default App;