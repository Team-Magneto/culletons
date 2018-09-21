import React from "react";
import PlanItem from "./PlanItem.jsx";
import ComparePlanItem from "./ComparePlanItem.jsx";
import chunk from "lodash/chunk";

class ComparePlans extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleComparePlans: true,
      toggleSelectPlans: false,
      compareCount : 3,
      plans: {}
    };
    this.setComparePlans = this.setComparePlans.bind(this);
    this.setSelectPlans = this.setSelectPlans.bind(this);
    this.setComparePlanList = this.setComparePlanList.bind(this);
  }

  setComparePlans() {
    this.setState({
      toggleComparePlans: true,
      toggleSelectPlan: false
    });
  }

  setSelectPlans() {
    this.setState({
      toggleComparePlans: false,
      toggleSelectPlan: true
    });
  }

  setComparePlanList(plan){
    var planCopy = Object.assign({}, this.state.plans);
    //either add or remove plan 
    if(planCopy[plan.planId]){
      delete planCopy[plan.planId];
      this.setState({
        compareCount : ++this.state.compareCount
      })
    } else {
      planCopy[plan.planId] = plan;
      this.setState({
        compareCount : --this.state.compareCount
      })
    }
    this.setState({
      plans: planCopy
    })
  }

  render() {
    return (
        <div className="card">
          {this.state.toggleComparePlans && (
            <React.Fragment>
              <div className="card-body">
                <h5 className="card-title">Compare Plans</h5>
              </div>
              <div className="card-body">
              <div className="card-deck">
                <PlanItem setSelectPlans={this.setSelectPlans} setComparePlanList={this.setComparePlanList} plan={this.state.plans[Object.keys(this.state.plans)[0]]} retireDescriptions={this.props.retireDescriptions} />
                <PlanItem setSelectPlans={this.setSelectPlans} setComparePlanList={this.setComparePlanList} plan={this.state.plans[Object.keys(this.state.plans)[1]]} retireDescriptions={this.props.retireDescriptions} />
                <PlanItem setSelectPlans={this.setSelectPlans} setComparePlanList={this.setComparePlanList} plan={this.state.plans[Object.keys(this.state.plans)[2]]} retireDescriptions={this.props.retireDescriptions} />
              </div></div>
            </React.Fragment>
          )}
          {this.state.toggleSelectPlan && (
            <React.Fragment>
              <div className="card-body">
                <h5 className="card-title">Add Plan to Compare</h5>
                <div className="card-text">
                  Select up to {this.state.compareCount} to compare.
                </div>
              </div>
              {
                chunk(this.props.plans, 3).map((planRow, i) => (
                <div key={i} className="card-body">
                <div className="row">
                {
                  planRow.map((plan) => (
                    <ComparePlanItem planSelected={this.state.plans[plan.planId] ? true : false} key={plan.planId} currentCount={this.state.compareCount} plan={plan} retireDescriptions={this.props.retireDescriptions} setComparePlanList={this.setComparePlanList}></ComparePlanItem>
                  ))
                }
                </div>
                </div>
                ))
              }
              <div className="card-body">
                <div className="card-text">
                  <button id="link-btn" className="btn theme-btn" onClick={this.setComparePlans}>Compare Plans</button>
                </div>
              </div>

            </React.Fragment>
          )}
        </div>
    );
  }
}

export default ComparePlans;
