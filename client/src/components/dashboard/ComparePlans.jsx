import React from "react";
import PlanItem from "./PlanItem.jsx";
import chunk from "lodash/chunk";

class ComparePlans extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleComparePlans: true,
      toggleSelectPlans: false
    };
    this.setComparePlans = this.setComparePlans.bind(this);
    this.setSelectPlans = this.setSelectPlans.bind(this);
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

  render() {
    return (
      <div>
        <div className="card">
          {this.state.toggleComparePlans && (
            <React.Fragment>
              <div className="row">
                <div className="card-body col">Compare Plans</div>
              </div>
              <div className="row">
                <div className="card-body col-4">
                  <PlanItem setSelectPlans={this.setSelectPlans} />
                </div>
                <div className="card-body col-4">
                  <PlanItem setSelectPlans={this.setSelectPlans} />
                </div>
                <div className="card-body col-4">
                  <PlanItem setSelectPlans={this.setSelectPlans} />
                </div>
              </div>
            </React.Fragment>
          )}
          {this.state.toggleSelectPlan && (
            <React.Fragment>
              <div className="row">
                <div className="card-body col">Add Plan to Compare</div>
              </div>
              {
                chunk(this.props.plans, 3).map((planRow, i) => (
                <div className="row">
                {
                  planRow.map((plan) => (
                    <div className="card-body col-4">
                      <div className="card">
                        <div className="row">
                          <div className="card-body col">
                          <h5 className="card-title">Retirement Age : {plan.retirementAge}</h5>
                          <p className="card-text">Goal : {this.props.retireDescriptions[plan.retireGoal-1]}</p>
                          <p className="card-text">current Age : {plan.currentAge}</p>
                          <div><a href="#" className="btn btn-primary">Compare</a></div>
                        </div>
                        </div>
                      </div>
                    </div>
                  ))
                }
                </div>
                ))
              }
              <div className="row">
                <div className="card-body col">
                  <button
                    id="link-btn"
                    className="btn theme-btn"
                    onClick={this.setComparePlans}
                  >
                    Compare
                  </button>
                </div>
              </div>
            </React.Fragment>
          )}
        </div>
      </div>
    );
  }
}

export default ComparePlans;
