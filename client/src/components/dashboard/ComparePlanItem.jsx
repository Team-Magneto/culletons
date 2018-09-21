import React from 'react';

class ComparePlanItem extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      selected: false
    }
    this.handleSelectCompare = this.handleSelectCompare.bind(this);
  }

  componentDidMount(){
    if(this.props.planSelected) {
      this.setState({
        selected: true
      })
    }
  }

  handleSelectCompare(e){
    e.preventDefault();
    this.props.setComparePlanList(this.props.plan);
    this.setState({
      selected: !this.state.selected
    })
  }

  render() {
    return (
      <div key={this.props.plan.planId} className="col-sm-4">
        <div className={this.state.selected ? 'card compareCards selected' : 'card compareCards'}>
            <div className="card-body col">
              <h5 className="card-title">Retirement Age : {this.props.plan.retirementAge}</h5>
              <div className="card-text goal">Goal : {this.props.retireDescriptions[this.props.plan.retireGoal-1]}</div>
              <div className="card-text">Current Age : {this.props.plan.currentAge}</div>
              <div className="card-text">Annual Income : ${Number(this.props.plan.annualIncome).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</div>
              <div className="card-text">Current Savings : ${Number(this.props.plan.currentSavings).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</div>
              <div className="card-text">Monthly Savings : ${Number(this.props.plan.monthlySavings).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</div>
              <div className="card-text">Monthly Spending : ${Number(this.props.plan.monthlySpending).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</div>
              <div className="card-text text-center"><a href="#" onClick={this.handleSelectCompare} className={this.props.currentCount !== 0 || this.state.selected ? 'btn btn-primary' :'btn btn-primary disabled'}>{this.state.selected ? 'Remove' : 'Add'}</a></div>
            </div>
        </div>
      </div>
    )
  }
}

export default ComparePlanItem;