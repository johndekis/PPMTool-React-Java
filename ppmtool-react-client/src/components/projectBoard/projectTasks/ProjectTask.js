import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { deleteProjectTask } from '../../../actions/backlogActions'

export class ProjectTask extends Component {

    onDeleteClick(backlog_id, pt_id) {
        this.props.deleteProjectTask(backlog_id, pt_id)
    }

  render() {
    const { project_task } = this.props
    const backlog_id  = project_task.projectIdentifier
    const pt_id = project_task.projectSequence
    let priorityClass;
    let priorityString;

    if(project_task.priority === 1) {
       priorityClass = "bg-danger text-light"
       priorityString = "HIGH"
    }
    if(project_task.priority === 2) {
        priorityClass = "bg-warning text-light"
       priorityString = "MEDIUM"
    }
    if(project_task.priority === 3) {
        priorityClass = "bg-info text-light"
       priorityString = "LOW"
    }
    return (
        <div className="card mb-1 bg-light">
            <div className={`card-header text-primary ${priorityClass}`}>
                ID: {project_task.projectSequence} -- Priority: {priorityString}
            </div>
            <div className="card-body bg-light">
            <h5 className="card-title">{project_task.summary}</h5>
                <p className="card-text text-truncate ">
                    {project_task.acceptanceCriteria}
                </p>
                <Link to={`/updateProjectTask/${backlog_id}/${pt_id}`} className="btn btn-primary">
                    View / Update
                </Link>
                <button 
                onClick={this.onDeleteClick.bind(this, backlog_id, pt_id)} 
                className="btn btn-danger ml-4">
                    Delete
                </button>
            </div>
        </div>
    )
  }
}

ProjectTask.propTypes = {
    deleteProjectTask: PropTypes.func.isRequired
}

export default connect(null, { deleteProjectTask })(ProjectTask);
 