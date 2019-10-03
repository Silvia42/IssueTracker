import React, {Component}  from 'react';
import { Link } from 'react-router-dom';

class IssueDetail extends Component {
    state = {
      issue: {}
    };
  
    getSingleIssue = () => {
        fetch(`/api/issue/${this.props.match.params.id}/`)
          .then(res => res.json())
          .then(issue => {
            this.setState({ issue });
          });
      };
    
      componentDidMount = () => {
        this.getSingleIssue();
      };
    
      componentDidUpdate = prevProps => {
        if (prevProps.match.params.id !== this.props.match.params.id) {
          this.getSingleIssue();
        }
      };

    // render = () => {
    //     // fetch('api/issue/${this.props.match.params.id}');
    // };      

    render = () => {
        return (
          <div>
            <Link to="/">Home</Link>
            <h1>This is the id {this.props.match.params.id}</h1>
            <p>{this.state.issue.description}</p>
          </div>
        );
      };
    }

export default IssueDetail;