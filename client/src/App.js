// Added React Router #RR#

import React from 'react'
import { Link, Route, Switch } from 'react-router-dom'; //#RR#
import IssueDetail from './IssueDetail'; //#RR#
import './App.css'

const issuePreview = (issue) => (
//   <li>{issue.id} - {issue.description}</li>
//#RR#
<li>
<Link to={`/issue/${issue.id}`}>
  {issue.id} - {issue.description}
</Link>
</li>
)

const issueList = (issues) => (
  <ul>
    {issues.map(issuePreview)}
  </ul>
)

const userIssueList = (user) => (
  <div>
    {user.email}
    {issueList(user.issues)}
  </div>
)

const orderByCreatedOn = (issue1, issue2) => {
  let date1 = new Date(issue1.createdOn)
  let date2 = new Date(issue2.createdOn)

  return Math.sign(date2.getTime() - date1.getTime())
}

const recentIssues = (allIssues) => 
  issueList(allIssues.sort(orderByCreatedOn).slice(0, 5))

//#RR#
// const issueDetails = (issue) => (
//   <div>
//     {issue.id} - {issue.description}
//     <button>{issue.status ? "Close" : "Open"}</button>
//   </div>
// )
//#RR#

const userPreview = (user) => (
  <option value={user.id}>{user.username}</option>
)

const userList = (users, currentUserId, onChange) => (
  <select value={currentUserId} onChange={(evnt) => onChange(evnt.target.value)}> 
    {users.map(userPreview)}
  </select>
)

class NewUserForm extends React.Component {

  state = 
    { username: ""
    , email   : ""
    }

  handleInput = (evnt) => {
    let newUser = {...this.state};
    newUser[evnt.target.name] = evnt.target.value;
    this.setState(newUser)
  }

  handleSubmit = (evnt) => {
    evnt.preventDefault();
    this.props.addNewUser(this.state)
    this.setState({ username: "", email: ""})
  }

  render = () => (
    <form onSubmit={this.handleSubmit}>
      <input type="text"   name="username" onChange={this.handleInput} value={this.state.username} placeholder="User Name"/>
      <input type="email"  name="email"    onChange={this.handleInput} value={this.state.email}    placeholder="Email"/>
      <input type="submit"                 value="New User" />
    </form>
  )
}

class NewIssueForm extends React.Component {
  state = {
    description: ""
  }

  handleInput = (evnt) => {
    this.setState({description: evnt.target.value})
  }

  handleSubmit = (evnt) => {
    evnt.preventDefault();

    this.props.addNewIssue(this.state.description)
    this.setState({ description: "" })
  }

  render = () => (
    <form onSubmit={this.handleSubmit}>
      <input type="text"   name="description" onChange={this.handleInput} value={this.state.description} placeholder="Description" />
      <input type="submit"                    value="New Issue" />
    </form>
  )
} // end of class NewIssueForm extends React.Component {

    const testUsers = {
        1: {
          id: 1,
          email: 'foo@foo.com',
          username: 'Bob',
          issues: [
            {
              description: 'a test issue 2',
              status: true,
              id: 2,
              createdOn: '2019-09-28T15:05:18.180058Z'
            },
            {
              description: 'a test issue',
              status: true,
              id: 1,
              createdOn: '2019-09-27T15:05:18.180058Z'
            },
            {
              description: 'a test issue 3',
              status: true,
              id: 3,
              createdOn: '2019-09-29T15:05:18.180058Z'
            }
          ]
        },
        7: {
          id: 7,
          email: 'bar@bar.com',
          username: 'Joe',
          issues: [
            {
              description: 'a joes test issue 2',
              status: true,
              id: 2,
              createdOn: '2019-09-28T15:05:18.180058Z'
            },
            {
              description: 'a joes test issue',
              status: true,
              id: 1,
              createdOn: '2019-09-27T15:05:18.180058Z'
            },
            {
              description: 'a joes test issue 3',
              status: true,
              id: 3,
              createdOn: '2019-09-29T15:05:18.180058Z'
            }
          ]
        }
      };

const getUsersFromServer = () => 
  fetch('/api/user/')
    .then(res => res.json())

const getIssuesFromServer = () =>
  fetch('/api/issue/')
    .then(res => res.json())

const objectFromListById = (users, issues) =>
  //convert from an array of user objects to an
  //object of user objects where the keys are user ids
  users.reduce((obj, user) => { 
    //get all issues belonging to the user
    user.issues = issues.filter(issue => issue.user === user.id);
    obj[user.id] = user; 
    return obj; 
  }, {})

const getUsersAndIssuesFromServer = () =>
  getUsersFromServer().then(users => 
  getIssuesFromServer().then(issues =>
      objectFromListById(users, issues)
  ))

const deleteUserFromServer = (userId) => 
fetch('/api/user/'+userId.toString()+'/',
{ method: "DELETE"
}
) 
// .then(res => res.json())  /// this is not needed

const saveUserToServer = (newUser) => 
  fetch('/api/user/',
    { method  : "POST"
    , headers : { "Content-Type": "application/json" }
    , body    : JSON.stringify(newUser)
    }
  ).then(res => res.json())

const saveIssueToServer = (newIssue) => 
  fetch('/api/issue/',
    { method  : "POST"
    , headers : { "Content-Type": "application/json" }
    , body    : JSON.stringify(newIssue)
    }
  ).then(res => res.json())

class App extends React.Component {

  state = {
    currentUser: 1,
    users: testUsers
  }

  componentDidMount = () => {
    // saveUserToServer({userName: "testUser", email: "foo@foobar.com"})
    // deleteUserFromServer(4)

    getUsersAndIssuesFromServer()
      .then(users => {
        this.setState({ users })
      })
    // if this.state.users

  }

  getNextId = () =>
    //gets the max id from the isssues of the current user
    Math.max(...this.getCurrentUser().issues.map(issue => issue.id)) + 1

  addNewIssueCurrentUser = (description) => {
    saveIssueToServer({ description , status: true, user: this.state.currentUser })
      .then(newIssue => {

        let users = {...this.state.users};

        users[this.state.currentUser].issues.push(newIssue);

        this.setState({ users });
      })
  }

  getNextUserId = () =>
    Math.max(...this.getAllUsers().map(user => user.id)) + 1

  addNewUser = (newUserInfo) => {
    newUserInfo=    {
        "userName": newUserInfo.username,
        "email": newUserInfo.email
    } 
    console.log(newUserInfo)  
    saveUserToServer(newUserInfo)
      .then(newUser => {
        console.log(newUser);
        newUser.issues = [];

        let users = {...this.state.users};

        users[newUser.id] = newUser;

        this.setState({ users, currentUser: newUser.id });
    })
  }

  getCurrentUser = () =>
    this.state.users[this.state.currentUser]

  getAllUsers = () =>
    Object.values(this.state.users)

  getAllIssues = () =>
    this.getAllUsers().flatMap(user => user.issues)
    //this.getAllUsers().map(user => user.issues).flat()
  
  setCurrentUser = (currentUser) => {
    this.setState({ currentUser })
  }
////#RR# 
//   render = () => (
//     <div className="container">
//       <aside className="sidebar">
//         <NewUserForm addNewUser={this.addNewUser}/>
//         <NewIssueForm addNewIssue={this.addNewIssueCurrentUser} />
//         {recentIssues(this.getAllIssues())}
//       </aside>
//
//       <article className="mainContent">
//         {userList(this.getAllUsers(), this.state.currentUser, this.setCurrentUser)}
//         {userIssueList(this.getCurrentUser())}
//       </article>
//     </div>
//   )
////#RR# This is replaced with a code for Router

render = () => (
    <div className="container">
      <aside className="sidebar">
        <NewUserForm addNewUser={this.addNewUser} />
        <NewIssueForm addNewIssue={this.addNewIssueCurrentUser} />
        {recentIssues(this.getAllIssues())}
      </aside>

      <article className="mainContent">
        <Switch>
          <Route
            path="/"
            exact
            render={() => (
              <div>
                {userList(
                  this.getAllUsers(),
                  this.state.currentUser,
                  this.setCurrentUser
                )}
                {userIssueList(this.getCurrentUser())}
              </div>
            )}
          />
          <Route path="/issue/:id" component={IssueDetail} />
        </Switch>
      </article>
    </div>
  );


}

export default App;