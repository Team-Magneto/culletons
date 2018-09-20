import React from 'react';

class PlanItem extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
    <div>
      <div className="card">
        <div className="row">
          <div className="card-body col">
            <img src="images/empty-plan.png"></img>
            <button id="link-btn" className="btn theme-btn" onClick={this.props.setSelectPlans}>Add Plan</button>
          </div>
        </div>
      </div>
    </div>
    )
  }
}

export default PlanItem;