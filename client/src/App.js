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
import Loader from './components/common/Loader';

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
    loadingList: false,
    loadingChart: false,
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

  // Sets item from selector to the state

  handleSelector = e => {
    const { name, value } = e.target;
   if( value !== '- date -' && value !== '- region -'){
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
  }


// Gets current dates from the last 15 dates and formats them

  getDates = () => {
    const present = new Date();
      const past = new Date(present);
      const newArr = [];
      for(let i = 0; i <= 15; i++){
        if(i === 0){
          present.setDate(past.getDate() - i)
          console.log(present)
          const arrItem = {value: present, name: 'right now'}
          newArr.push(arrItem)
        }else if(i === 1){
          present.setDate(past.getDate() - i)
          const arrItem = {value: present, name: 'yesterday'}
          newArr.push(arrItem)
        }
        
        else {
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

  // Creates lists of dates for dropboxes

  arrayCreator = (min, max) => {
    const newArr = []
    for(let i = min; i <= max; i++){
      newArr.push({value:i, name:i})
    }
    return newArr;
  }

  // Gets the current Year, Month, and Day

  presentDay = () => {
    this.setState({
      endDay: new Date().getDate(),
      endYear: new Date().getFullYear(),
      endMonth: new Date().getMonth()
    })
   
  }

  // Formats the date to YYYY/MM/DD for compatability

  yyyymmdd = date => {
    var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate()

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [month, day].join('-');
  }

  // closes the search results

  resetSearch = event => {
    event.preventDefault();
    this.setState({
      trendsResults: false
    })
  }

  // closes the chart

  formReset = event => {
    event.preventDefault();
    this.setState({
      chartDisplay: false
    })
  }

  // Formats the data for the chart

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

  // Sends a request to API and sets the response to the state

  handleSubmit = event => {
    const { name } = event.target;
    const {searchDate, searchRegion} = this.state
    event.preventDefault();
    if(name === 'search' && searchDate !== undefined){
      this.setState({loadingList: true})
      const searchQuery = {date: searchDate, region: searchRegion};
      console.log(searchQuery);
      API.currentTrends(searchQuery).then( res => {
        const trending = res.data.default.trendingSearchesDays[0].trendingSearches.map(item => item.title.query)
        console.log(trending)
        this.setState({ trending: trending, trendsResults: true, loadingList: false })
      })
    }
    if(name === 'timeline'){
      this.setState({loadingChart: true})
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
            chartDisplay: true,
            loadingChart: false
          })
      
      })
    }
  }


  render() {
    const { formStyle, inputStyle } = styles
    const loadingList = this.state.loadingList;
    const loadingChart = this.state.loadingChart;
    let loadIconList;
    let loadIconChart;
    if(loadingList){
      loadIconList = <Loader />;
    }
    if(loadingChart){
      loadIconChart = <Loader />;
    }
    return (
      <div className="App">

        <Header />

        <Wrapper>

          <Card>

            {/* Current Trends Section */}

            <Section 
              style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'baseline',
              }} 
            title='Top google searches in '
            >
              <Selector onChange={this.handleSelector} list={this.state.selectorLists.regions} name='searchRegion' defaultValue={this.state.selectorLists.regions[0].value} text={'- region -'}/>
              <Selector onChange={this.handleSelector} list={this.state.selectorLists.pastDays} name='searchDate'  defaultValue={this.state.selectorLists.pastDays[0].value} text={'- date -'}/>
            </Section>
            <button onClick={this.handleSubmit} name='search'>Go!</button>

            {loadIconList}

              {/* Trends results */}

            {this.state.trendsResults ? 
              <Section
               style={{
                 flexDirection: 'column',
                 justifyContent: 'center',
                 alignItems: 'baseline',
                 textAlign: 'center',
                 animation: 'expand .5s linear forwards'
               }} 
               >
              <Results 
                list={this.state.trending}
                close={this.resetSearch}
                style={{display: 'block'}}
                />
              </Section>
              :
              <Section
                style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'baseline',
                textAlign: 'center'
              }}>

              <Results 
              list={this.state.trending}
              onClick={this.resetSearch}
              style={{display: 'none'}}
              />
           
          </Section>
          }
          

            <hr />

            {/* Interest over time section */}

            {this.state.chartDisplay
            ?    <Section style={{
              marginTop: '10px',
              alignSelf: 'center',
              textAlign: 'center',
              animation: 'expand .8s linear forwards'
            }}>

            {/* Chart display */}

              <Chart title={this.state.searchQuery} data={this.state.chartData}/>

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
              <div style={formStyle}>
              <input onChange={this.presentDay} type="checkbox" id="presentDay" name="presentDay"
          />
            <label for="scales">Present Day</label>
              </div>
            </Section>
            
            }
            {loadIconChart}
            {this.state.chartDisplay===false
            ? 
              <button onClick={this.handleSubmit} name='timeline'>Go!</button>

            : <button onClick={this.formReset}>Search Again</button>
            } 
         
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

