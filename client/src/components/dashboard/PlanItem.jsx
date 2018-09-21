import React from 'react';

class PlanItem extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div className="card compareCards">
        <div className="card-body">
        {this.props.plan ? (
          <React.Fragment>
          <div className="card-text text-center">Plan Name: {this.props.plan.name}</div>
          <div><br></br></div>
          <div className="card-text">Retirement Age: {this.props.plan.retirementAge}</div>
          <div className="card-text">Retirement Goal:</div>
          <div className="card-text">{this.props.retireDescriptions[this.props.plan.retireGoal-1]}</div>
          <div><br></br></div>
          <div className="card-text">Current Age: {this.props.plan.currentAge}</div>
          <div className="card-text">Annual Income: ${Number(this.props.plan.annualIncome).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</div>
          <div><br></br></div>
          <div className="card-text">Current Savings: ${Number(this.props.plan.currentSavings).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</div>
          <div className="card-text">Monthly Savings: ${Number(this.props.plan.monthlySavings).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</div>
          <div className="card-text">Monthly Spending: ${Number(this.props.plan.monthlySpending).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</div>
          <div><br></br></div>
          <div className="card-text text-center">
            <button id="link-btn" className="btn theme-btn" onClick={() => this.props.setComparePlanList(this.props.plan)}>Remove Plan</button>
          </div>
          </React.Fragment>
        ) : (
          <React.Fragment>
          <div className="card-text text-center"><img src="images/empty-plan.png"></img></div>
          <div><br></br></div>
          <div className="card-text text-center">
            <button id="link-btn" className="btn theme-btn" onClick={this.props.setSelectPlans}>Add Plan</button>
          </div>
          </React.Fragment>
        ) }
        
      </div>
    </div>
    )
  }
}

export default PlanItem;