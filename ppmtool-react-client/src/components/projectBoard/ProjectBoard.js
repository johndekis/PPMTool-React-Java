import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Backlog from './Backlog';
import { getBacklog } from '../../actions/backlogActions'
//import { getErrors } from '../../actions/'


export class ProjectBoard extends Component {
  constructor() {
    super()
    this.state = {
      errors: {}
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.errors) {
      this.setState({ errors: nextProps.errors})
    }
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getBacklog(id)
  }

  render() {
    const { id } = this.props.match.params;  
    const { project_tasks } = this.props;
    const { errors } = this.state

    let BoardContent; 

    const boardDisplay = (project_tasks, errors) => {
      if(project_tasks.length < 1 ) {
        if(errors.projectNotFound) {
          return (
            <div className="alert alert-danger text-center" role="alert">{errors.projectNotFound}</div>
          )
        } else {
          return ( 
            <div className="alert alert-info text-center" role="alert"> There are no Tasks for this project! </div>
            )
        }
      } else {
        return (<Backlog project_tasks={project_tasks} />)
      }
    }

    BoardContent = boardDisplay(project_tasks, errors)
    
    return (
      
      <div className="container">
          <Link to={`/addProjectTask/${id}`} className="btn btn-primary mb-3">
              <i className="fas fa-plus-circle"> Create Project Task</i>
          </Link>
          <br />
          <hr />
         {BoardContent}
          
      </div>
    )
  }
}

ProjectBoard.propTypes = {
  project_tasks : PropTypes.array.isRequired,
  getBacklog : PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  project_tasks: state.backlog.project_tasks,
  errors: state.errors
})

export default connect(mapStateToProps, { getBacklog })(ProjectBoard)