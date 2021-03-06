const BASE_URL = 'https://booktap-api.herokuapp.com/'
const BOOKS_URL = 'https://booktap-api.herokuapp.com/books'

document.addEventListener("DOMContentLoaded", () => {

     fetchBooks()

     //add event listener to add book button when page loads
     let addBook = document.querySelector(".btn.btn-primary.btn-lg")
     addBook.addEventListener("click", (event) => displayCreateBookForm(event), false)

     //add event listener to add order book button when page loads
     let bookOrder = document.querySelector(".btn.btn-secondary.btn-lg")
     bookOrder.addEventListener("click", (event) => anotherFetch(event), false)

  })

  function anotherFetch() {
    //Order books alphabetically books.sort

    
    fetch(BOOKS_URL)
    .then(resp => resp.json())
    .then(books => orderBooks(books)) ;
    }

    function orderBooks(books) {
      //Order books alphabetically books.sort
      let sortedBooks = books.sort(function(a, b) {
        if (a.title < b.title) {
          return -1;
        }
        if (a.title > b.title) {
          return 1;
        }
        // a must be equal to b
        return 0;
      })
      renderBooks(sortedBooks)
    }



  // retrieve all book objects from the database 
   function fetchBooks() {
    fetch(BOOKS_URL)
    .then(resp => resp.json())
    .then(books => renderBooks(books));
   }




   // display fetch results on page
  function renderBooks(books) {
    const books_area = document.querySelector(".row")
    books_area.innerHTML = ""; 

  // interate over book objects to retrive data for each book
    books.forEach(book => {
      let objB = new Book(book)
      objB.render()
    })
  }

  
  //
  function clearForm(){
    let bookFormDiv = document.getElementById("book-form")
    bookFormDiv.innerHTML = ''
  }

//show book form 
function displayCreateBookForm(){
  let bookFormDiv = document.createElement("div")
  bookFormDiv.id = "book-form" 
  let html = `
      <form onsubmit="createBook();return false;">
      <br>
      <label>Title</label>
      <input type ="text" id="title"><br>
      <label>Author</label>
      <input type ="text" id="author"></br>
      <label>Book Link</label>
      <input type ="text" id="link"></br>
      <label>Image URL</label>
      <input type ="text" id="image-link"></br>
      <label>Language</label>
      <input type ="text" id="language"></br>
      <label>Pages</label>
      <input type ="text" id="pages"></br>
      <label>Year</label>
      <input type ="text" id="year"></br>
      <label>Country</label>
      <input type ="text" id="country"></br>
      <input type ="submit" value="Create book">
  `
  bookFormDiv.innerHTML += html

  //create variables for DOM elements
  let form = bookFormDiv.querySelector('form')
  let jumbo = document.querySelector(".jumbotron")

  //add event listener to the submit button to create a new book using the createBook function
  form.addEventListener("submit", createBook)

  // add form to create book to the DOM
  jumbo.append(bookFormDiv)
}


//add new book to database and display new book on page
function createBook(){
  const book = {
      title: document.getElementById('title').value,
      author: document.getElementById('author').value,
      imageLink: document.getElementById('image-link').value
  }
  fetch(BOOKS_URL,{
      method: "POST",
      body: JSON.stringify(book),
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      }
  })
  .then(resp => resp.json())
  .then(book => {
      let objB = new Book(book)
      objB.renderNewBook() 
      clearForm()
  })
}

//sort books



//Create Comments Form
function displayCreateCommentForm(event) {

  // retrieve book id stored as a data-id attribute on the the top level card element
  let book_id = event.target.parentElement.parentElement.parentElement.dataset.id
  
  // retrieve data from an individual book object, passed by the book_id of the card or book selected
  fetch(`${BASE_URL}/books/${book_id}`)
  .then(resp => resp.json())
  .then(book => {

    // 
    let card_footer = event.target.parentElement


    // remove comment form if it already exists 
    if(document.querySelector("#comment-form"))
      document.querySelector("#comment-form").remove()

    //create DOM element for the comment form
    let formDiv = document.createElement("div")
    formDiv.id = "comment-form"

    //create comment form 
    let html = `
      <form>
      <input type="hidden" id="book_id" name="book_id" value=${book.id}></br>
      <label>Comment</label>
      <input type ="text" id="content" name="content"></br>
      <label>Type</label>
      <input type ="text" id="comment_type" name-"comment_type"></br>
      <input type="submit">
      </form>
      `
    //add form to comment form element 
    formDiv.innerHTML += html

    // add event listener to the submit button on the comment form to create a new comment 
    let form = formDiv.querySelector('form')
    form.addEventListener("submit", createComment)

    // add comment form to the card footer element 
    card_footer.append(formDiv)
  })
}

// add new comment to the database and display it on the associated book card 
function createComment() {
  event.preventDefault()

  const comment = {
    content: event.target.content.value,
    comment_type: event.target.comment_type.value,
    book_id: event.target.book_id.value
  }

  fetch(BASE_URL+'/books/'+comment.book_id+'/comments',{
    method: "POST",
    body: JSON.stringify(comment),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  } )
    .then(resp => resp.json())
    .then(comment => {


      document.querySelector(`div [data-id="${comment.book_id}"]`).querySelector('.card-text').innerHTML += `<br>${comment.content} - ${comment.comment_type}<br>`

     })

    document.querySelector("#comment-form").remove()

}
