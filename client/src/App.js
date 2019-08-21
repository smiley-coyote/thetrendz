import React, { Component } from 'react';
import './App.css';
import API from './utils/API';
import Wrapper from './components/Wrapper';
import Card from './components/Card/Card';
import Header from './components/Header/';
import Selector from './components/common/Selector';
import Section from './components/Section';
// import Window from './components/Window';

class App extends Component {
  constructor(props) {
    super(props);
  this.state = {
    trending: [],
    timelineData: [],
    searchQuery: 'Bill Gates',
    selectorLists: {
      year: this.arrayCreator(2004, 2019),
      month: this.arrayCreator(1, 12),
      day: this.arrayCreator(1, 31) 
    },
    searchRegion: 'US',
    searchDate: new Date(),
    startYear: '2004',
    startMonth: '01',
    startDay: '01',
    endYear: '2019',
    endMonth: '01',
    endDay: '01'
  };
  this.arrayCreator = this.arrayCreator.bind(this);
}

  

  componentDidMount() {
    // 
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

  arrayCreator = (min, max) => {
    const newArr = []
    for(let i = min; i <= max; i++){
      newArr.push({value:i, name:i})
    }
    return newArr;
  }

  handleSelector = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    }, () => {
      if(name === 'startYear'){
        const minYear = this.state.startYear
        const newArray = this.arrayCreator(minYear, new Date().getFullYear());
        
        this.setState(prevState => {
          let selectorLists = Object.assign({}, prevState.selectorLists);  // creating copy of state variable jasper
          selectorLists.year = newArray;                     // update the name property, assign a new value                 
          return { selectorLists };                                 // return new object jasper object
        })
        
      }
    })
    
    
  }

  handleSubmit = event => {
    event.preventDefault();
    console.log(this.state)
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
            <Section 
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'baseline',
              }} 
              title='Top google searches in '
            >
              <Selector onChange={this.handleSelector} list={this.state.selectorLists.year} name='searchRegion' text={'your region'} />
              <Selector onChange={this.handleSelector} list={this.state.selectorLists.year} name='searchDate' text={'today'} />
            </Section>

            <button>Go!</button>
            <Section style={{
              flexDirection: 'column',
              alignSelf: 'center',
              textAlign: 'center'
            }}>
              <h2>Trends Over Time</h2>
              <input style={inputStyle} placeholder={'Bill Gates'} />
              Start Date
            <div style={formStyle}>
                <Selector onChange={this.handleSelector} list={this.state.selectorLists.year} name='startYear' text={'Year'} />
                <Selector onChange={this.handleSelector} list={this.state.selectorLists.month} name='startMonth' text={'Month'} />
                <Selector onChange={this.handleSelector} list={this.state.selectorLists.day} name='startDay' text={'Day'} />
              </div>
              End Date
              <div style={formStyle}>
                <Selector onChange={this.handleSelector} list={this.state.selectorLists.year} name='endYear' text={'Year'} />
                <Selector onChange={this.handleSelector} list={this.state.selectorLists.month} name='endMonth' text={'Month'} />
                <Selector onChange={this.handleSelector} list={this.state.selectorLists.day} name='endDay' text={'Day'} />
              </div>
            </Section>
            <button onClick={this.handleSubmit}>Go!</button>
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