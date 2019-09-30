correctEmail = (someString) => 
(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(someString))

console.log(correctEmail('a@a'.toUpperCase()))
console.log(correctEmail('silvia@gmail.com'.toUpperCase()))




// function ValidateEmail(mail) 
// {
//  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(someString))
//   {
//     return (true)
//   }
//     alert("You have entered an invalid email address!")
//     return (false)
// }