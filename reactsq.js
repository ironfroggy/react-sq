var CounterList = React.createClass({
    render: function() {
        var props = this.props;
        var counterNodes = props.data.map(function (counter, i) {
          return (
            <Counter color={counter.color} value={counter.value} i={i} onCounterIncrement={props.onCounterIncrement}>
            </Counter>
          );
        });
        return (
          <div className="counter-list">
            {counterNodes}
          </div>
        );
  }
});

var AddCounter = React.createClass({
    handleClick: function(e) {
        e.preventDefault();
        var color = '#' + (function co(lor){   return (lor +=
            [7,8,9,'a','b','c','d','e'][Math.floor(Math.random()*8)])
            && (lor.length == 6) ?  lor : co(lor); })('');
        this.props.onCounterAdd({color: color, value: 0});
        return;
    },
    render: function() {
        return (
            <div className="add-counter" onClick={this.handleClick}><span>+</span></div>
        );
    }
});

var Counter = React.createClass({
    handleClick: function() {
        this.props.onCounterIncrement(this.props.i);
    },
    render: function() {
        return (
          <div className="counter" onClick={this.handleClick} style={{backgroundColor: this.props.color}}>
            <span>{this.props.value}</span>
          </div>
        );
    }
});

var ReactSQ = React.createClass({
  getInitialState: function() {
      var saved = JSON.parse(localStorage["counters"]||"[]");
    return {data: saved};
  },
  updateCounters: function(counters) {
      var serialized = JSON.stringify(counters);
      localStorage["counters"] = serialized;
      this.setState({data: counters});
  },
  handleAddCounter: function(counter) {
      var counters = this.state.data;
      var newCounters = counters.concat([counter]);
      this.updateCounters(newCounters);
  },
  handleCounterIncrement: function(counterId) {
      var counters = this.state.data.slice();
      counters[counterId].value += 1;
      this.updateCounters(counters);
  },
  componentDidMount: function() {
    //   this.loadComments();
  },
  render: function() {
    return (
      <div className="reactsq">
          <h1>ReactSQ</h1>
          <CounterList data={this.state.data} onCounterIncrement={this.handleCounterIncrement}/>
          <AddCounter onCounterAdd={this.handleAddCounter} />
      </div>
    );
  }
});

React.render(
  <ReactSQ />,
  document.getElementById('content')
);
