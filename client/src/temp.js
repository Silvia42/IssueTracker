
// lodash  
// underscore

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
  },
  { id : 7
  , email  : "bar@bar.com"
  , username: "Joe"
  , issues : 
      [ {description: "a joes test issue 2", status: true, id: 2, createdOn: "2019-09-28T15:05:18.180058Z"}
      , {description: "a joes test issue"  , status: true, id: 1, createdOn: "2019-09-27T15:05:18.180058Z"}
      , {description: "a joes test issue 3", status: true, id: 3, createdOn: "2019-09-29T15:05:18.180058Z"}
      ]
  }
]

let bbb = testUsers.map(x => Object.assign(x.id,x))
let ccc = Object.assign({}, ...testUsers.map(item => ({[item.id]: item})))
let ddd = Object.assign({}, ...testUsers.map(item => ({[Number(item.id)]: item})))

console.log(ccc)
//  console.log('dsdgdgaadgadg',ccc[7])
// console.log(ddd)

// const arrayToObject = (arr, keyField) =>
//   Object.assign({}, ...arr.map(item => ({[item[keyField]]: item})))




// correctEmail = (someString) => 
// (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(someString))

// console.log(correctEmail('a@a'.toUpperCase()))
// console.log(correctEmail('silvia@gmail.com'.toUpperCase()))




// function ValidateEmail(mail) 
// {
//  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(someString))
//   {
//     return (true)
//   }
//     alert("You have entered an invalid email address!")
//     return (false)
// }

console.log(0.1 + 0.2 === 0.3)