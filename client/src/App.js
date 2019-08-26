import React, { Component } from 'react';
import './App.css';
import API from './utils/API';
import Wrapper from './components/Wrapper';
import Card from './components/Card/Card';
import Header from './components/Header/';
import Selector from './components/common/Selector';
import Section from './components/Section';
import Geos from './geos';
import Results from './components/Results';
import Chart from './components/Chart';
// import Window from './components/Window';

class App extends Component {
  constructor(props) {
    super(props);
  this.state = {
    trending: [],
    timelineData: [],
    pastDays: [],
    chartData: [],
    chartDisplay: false,
    trendsResults: false,
    selectorLists: {
      startYear: this.arrayCreator(2004, new Date().getFullYear()),
      endYear: this.arrayCreator(2004, new Date().getFullYear()),
      month: this.arrayCreator(1, 12),
      startDay: this.arrayCreator(1, 31),
      endDay: this.arrayCreator(1, 31),
      pastDays: this.getDates(),
      regions: Geos
    },
    searchQuery: 'Bill Gates',
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

  getDates = () => {
    const present = new Date();
      const past = new Date(present);
      const newArr = [];
      for(let i = 1; i <= 15; i++){
        if(i === 1){
          present.setDate(past.getDate() - i)
          const arrItem = {value: present, name: 'yesterday'}
          newArr.push(arrItem)
        } else {
          present.setDate(past.getDate() - i)
          const formattedDate = this.yyyymmdd(present);
          const fullDate = new Date().getFullYear() + '-' + formattedDate
          const arrItem = {value: fullDate, name: formattedDate}
          newArr.push(arrItem);
        }
      }
      console.log(newArr)
      return newArr;
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

  yyyymmdd = date => {
    var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate()

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [month, day].join('-');
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
          let selectorLists = Object.assign({}, prevState.selectorLists);  
          selectorLists.endYear = newArray;                                    
          return { selectorLists };                                
        })
        
      }
    })
  }

  resetSearch = event => {
    event.preventDefault();
    this.setState({
      trendsResults: false
    })
  }

  formatChartData = data => {
    const chartData = {
      labels: [],
      values: []
    }
    for(let i = 0; i< data.length; i++){
      chartData.labels.push(data[i].formattedTime);
      chartData.values.push(data[i].value[0]);
    }
    console.log(chartData);
    return chartData;
  }

  handleSubmit = event => {
    const { name } = event.target;
    event.preventDefault();
    if(name === 'search'){
      const searchQuery = {date: this.state.searchDate, region: this.state.searchRegion};
      console.log(searchQuery);
      API.currentTrends(searchQuery).then( res => {
        const trending = res.data.default.trendingSearchesDays[0].trendingSearches.map(item => item.title.query)
        console.log(trending)
        this.setState({ trending: trending, trendsResults: true })
      })
    }
    if(name === 'timeline'){
      const {searchQuery, startYear, 
        startMonth, startDay, 
        endYear, endMonth,
      endDay} = this.state;
      const searchBody = {
        keyword: searchQuery,
        startTime: startYear + '-' + startMonth + '-' + startDay,
        endTime: endYear + '-' + endMonth + '-' + endDay
      }
      API.trendsOvertime(searchBody).then( res => {
        const chartData = this.formatChartData(res.data.default.timelineData);
        
          this.setState({
            chartData: chartData,
            chartDisplay: true
          })
      
      })
    }
  }


  render() {
    const { formStyle, inputStyle } = styles
    return (
      <div className="App">
        <Header />
        <Wrapper>
          <Card>
          <Section
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'baseline',
            textAlign: 'center'
          }} 
          
          >
             {this.state.trendsResults ? 
           <Results 
           list={this.state.trending}
           onClick={this.resetSearch}
           style={{display: 'block'}}
           />
          :
          <Results 
           list={this.state.trending}
           onClick={this.resetSearch}
           style={{display: 'none'}}
           />
          
          }
          </Section>
          <Section 
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'baseline',
          }} 
          title='Top google searches in '
        >
           
            
              <Selector onChange={this.handleSelector} list={this.state.selectorLists.regions} name='searchRegion' text={'your region'} />
              <Selector onChange={this.handleSelector} list={this.state.selectorLists.pastDays} name='searchDate' text={'right now'} />
            </Section>
            

            <button onClick={this.handleSubmit} name='search'>Go!</button>
            {this.state.chartDisplay
            ?    <Section style={{
              marginTop: '10px',
              alignSelf: 'center',
              textAlign: 'center'
            }}>
              <Chart data={this.state.chartData}/>
            </Section>
            :<Section style={{
              flexDirection: 'column',
              alignSelf: 'center',
              textAlign: 'center'
            }}>
              <h2>Trends Over Time</h2>
              <input onChange={this.handleSelector} style={inputStyle} name='searchQuery' placeholder={'Bill Gates'} />
              Start Date
            <div style={formStyle}>
                <Selector onChange={this.handleSelector} list={this.state.selectorLists.startYear} name='startYear' text={'Year'} />
                <Selector onChange={this.handleSelector} list={this.state.selectorLists.month} name='startMonth' text={'Month'} />
                <Selector onChange={this.handleSelector} list={this.state.selectorLists.startDay} name='startDay' text={'Day'} />
              </div>
              End Date
              <div style={formStyle}>
                <Selector onChange={this.handleSelector} list={this.state.selectorLists.endYear} name='endYear' text={'Year'} />
                <Selector onChange={this.handleSelector} list={this.state.selectorLists.month} name='endMonth' text={'Month'} />
                <Selector onChange={this.handleSelector} list={this.state.selectorLists.endDay} name='endDay' text={'Day'} />
              </div>
            </Section>
            }
            
            <button onClick={this.handleSubmit} name='timeline'>Go!</button>
         
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

