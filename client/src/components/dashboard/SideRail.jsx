import React from 'react';

class SideRail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editValue: '',
      selectedPlanId: ''
    }
    this.confirmDelete = this.confirmDelete.bind(this)
    this.saveName = this.saveName.bind(this)
    this.onEdit = this.onEdit.bind(this)
    this.launchPlaidLink = this.launchPlaidLink.bind(this);
    this.setPlan = this.setPlan.bind(this);
  }

  confirmDelete(id) {
    console.log('confirm delete');
    this.props.deletePlan(id);
  }

  saveName(name, id) {
    this.props.editPlanName(name, id)
    this.setState({
      editValue: ''
    })
    this.props.updatePlans()
  }

  onEdit(e) {
    this.setState({ editValue: e.target.value})
  }

  shouldComponentUpdate(nextProp, nextState) {
    return true
  }

  launchPlaidLink() {
    this.handler.open();
  }

  setPlan(plan){
    this.props.setActivePlan(plan);
    this.setState({ selectedPlanId: plan.planId})
  }

  render() {
    return (
      <div className="card side-rail">
        <div className="card-block">
          <img className="card-img-top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKkYg7YWw9mG3zsEI5lCHeTz30oLSjMXXxm5irxjnGTj5deUKOPA" />
          <div className="card-body border-bottom">
            <h5 className="card-title">Welcome {this.props.userData && this.props.userData.fullname}</h5>
            <button id="link-btn" className="btn theme-btn" onClick={this.props.launchPlaidLink}>Link Account</button>
            <br /></div>
          <div className="card-body border-bottom theme-hover cursorPointer" onClick={this.props.setOverview}>
            <i className="fa fa-home fa-fw" aria-hidden="true"></i><a  >&nbsp;Home</a>
          </div>
          <div className="card-body border-bottom">
            <i className="fa fa-list-alt " aria-hidden="true"></i><a >&nbsp; Plans </a>
          </div>
          {/* After receiving the props, map them to the rail including all handlers */}
          {this.props.plans && this.props.plans.map((plan, idx) => (
            <div key={plan.planId} className="card-body border-bottom py-1">
              <div className="panel-default">
                <div className="panel-heading">
                  <h6 className="panel-title theme-hover cursorPointer" data-toggle="collapse" onClick={() => this.setPlan(plan)} data-target={`#collapseExample${idx}`} aria-expanded="false" aria-controls="collapseExample">
                    <i className="fa fa-caret-down" aria-hidden="true"></i>
                    {this.state.selectedPlanId === plan.planId ? (<React.Fragment>&nbsp;<u>{plan.name || 'Plan'}</u></React.Fragment>) : (<React.Fragment>&nbsp;{plan.name || 'Plan'}</React.Fragment>)}                    
                  </h6>
                  {/* Ellipsis that allows you to open the modals for edit/delete plans */}

                  {/* VERY IMPORTANT: Edit/delete works upon the active plan which is selected by clicking on the plan name.
                  You are able to select the dropdown for a plan that isn't the active one, but the action will be performed
                  on the active plan. */}

                  <span className="dropdown align-right">
                    <a className="dropdown-toggle float-right" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <i className="fa fa-ellipsis-v " aria-hidden="true"></i>
                    </a>

                    <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                      <a className="dropdown-item" data-toggle="modal" data-target="#editModal" aria-label="Edit name" href="#">Edit name</a>
                      <a className="dropdown-item" data-toggle="modal" data-target="#deleteModal" aria-label="Delete" href="#">Delete plan</a>
                    </div>
                  </span>

                </div>
                <div className="panel-body collapse" id={`collapseExample${idx}`} >
                  <div>Created: {plan['created_at'].slice(0, 10)}</div>
                  <div>Current savings: ${plan.currentSavings.toLocaleString()}</div>
                  <div>Monthly savings: ${plan.monthlySavings.toLocaleString()}</div>
                  <div>Retire by {plan.retirementAge}</div>
                  <br></br>
                </div>
              </div>
            </div>
          )
          )}
          {/* End map */}
          {this.props.plans.length > 1 ? (
            <div className="card-body theme-hover border-bottom cursorPointer" onClick={this.props.setCompare}>
              <i className="fa fa-search " aria-hidden="true"></i><a >&nbsp; Compare Plans </a>
            </div>) : ''}
          <div className="modal fade" id="editModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div className="modal-dialog" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Edit plan name</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        Rename your plan: <input value={this.state.editValue} onChange={this.onEdit}></input>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Discard</button>
                        <button type="button" data-dismiss="modal" onClick={() => this.saveName(this.state.editValue, this.props.activePlan.planId)} className="btn btn-success">Save</button>
                      </div>
                    </div>
                  </div>
                </div>
          <div className="modal fade" id="deleteModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div className="modal-dialog" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Are you sure?</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        Please confirm that you wish to delete this plan.
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" data-dismiss="modal" onClick={() => this.confirmDelete(this.props.activePlan.planId)} className="btn btn-danger">Delete</button>
                      </div>
                    </div>
                  </div>
                </div>
          <div className="card-body border-bottom theme-hover">
            <a className="cursorPointer" onClick={this.props.createPlan}><i className="fa fa-plus-square" aria-hidden="true"></i>&nbsp; Add new plan </a>
          </div>
        </div>
      </div>
    );
  }

}

export default SideRail;