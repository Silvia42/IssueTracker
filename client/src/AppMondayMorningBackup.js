import React from 'react';
import './App.css';

const issuePreview = (issue) => (
  <li>{issue.id} - {issue.descripton} - {issue.createdOn}</li>
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

const issueDetails = (issue) => (
  <div>
    {issue.id} - {issue.description}
    <button>{issue.status ? "Close" : "Open"}</button>
  </div>
)

const userList = (users) => (
  <select>
    {users.map(userPreview)}
  </select>
)

// const userIssueList = (user) => (
//   <ul>
//     {user.email}
//     {issueList(user.issues)}
//   </ul>
// )

const orderByCreateOn = (issue1,issue2) =>{
  let date1 = new Date(issue1.createdOn)
  let date2 = new Date(issue2.createdOn)
  // console.log(date1,date2)
  // console.log((-1)*Math.sign(date2.getTime()-date1.getTime()))
  return (-1)*Math.sign(date2.getTime()-date1.getTime())
  // return Math.sign(date2.getTime() - date1.getTime())
}

const newUserForm = () => (
  <form>
    <input type="text"  name="username" value="" placeholedet="User Name" />
    <input type="email" name="email"    value="" placeholedet="Email" />
    <input type="submit"                value="New User" /> 
  </form>
)

const newIssueForm = () => (
  <form>
    <input type="text"   name="description" value="" placeholder="Description" />
    <input type="submit"                    value="New Issue" />
  </form>
)

const recentIssues = (allIssues) => 
  issueList(allIssues.sort(orderByCreateOn).slice(0,5))

const userPreview = (user) => (
  <option value="none" selected disabled hidden>Select a User</option>
  // <option value={user.id}>{user.name}</option>
)

const testIssues =                                 
  [ {descripton: "a test issue", id: 1, createdOn: "2019-09-27T15:05:18.180058Z"}
  , {descripton: "a test issue 2", id: 2, createdOn: "2019-09-27T15:07:18.180058Z"}
  ]

const testUser = 
[
{email: "foo@foo.com", 
  name: "Bob",
  issues: 
  [ {descripton: "a test issue", id: 1, createdOn: "2019-09-27T15:05:18.180058Z"}
  , {descripton: "a test issue 2", id: 2, createdOn: "2019-09-27T15:05:28.180058Z"}
]}
]

const testUsers = 
  [
    { id : 1
    , email  : "foo@foo.com"
    , username: "Bob"
    , issues : 
        [ {description: "a test issue 2", status: true, id: 2, createdOn: "2019-09-28T15:05:18.180058Z"}
        , {description: "a test issue"  , status: true, id: 1, createdOn: "2019-09-27T15:05:18.180058Z"}
        , {description: "a test issue 3", status: true, id: 3, createdOn: "2019-09-29T15:05:18.180058Z"}
        ]
    }
  ]


const App = () => (
  <div className="container">
    {issueList(testIssues)}
    {/* {userIssueList(testUser)} */}
    <h1>User List</h1>
    {userList(testUser)} 
    {testUser.email}
    <h1>Recent Issues</h1>
    {recentIssues(testIssues)}

    
    <aside className="sidebar">
      {newUserForm()}
      {/* {newIssueForm()} */}
      {/* {recentIssues(testUsers[0].issues)} */}
    </aside>

    <article className="mainContent">
      {/* {userList(testUsers)} */}
      {/* {userIssueList(testUsers[0])} */}
    </article>

  </div>
)
    
export default App;

