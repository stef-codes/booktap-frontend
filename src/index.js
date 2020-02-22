const BASE_URL = 'http://localhost:3000'
const BOOKS_URL = 'http://localhost:3000/books'

document.addEventListener("DOMContentLoaded", () => {
     fetchBooks()

     //add event listener to add book button
     let addBook = document.querySelector(".btn.btn-primary.btn-lg")
     addBook.addEventListener("click", (event) => displayCreateBookForm(event), false)

  })


   function fetchBooks() {
    fetch(BOOKS_URL)
    .then(resp => resp.json())
    .then(books => renderBooks(books));
   }

  function renderBooks(books) {
    const books_area = document.querySelector(".row")
    books_area.innerHTML = ""; 

    books.forEach(book => {
      let objB = new Book(book)
      objB.render()
    })
  }

  

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
  let form = bookFormDiv.querySelector('form')
  let jumbo = document.querySelector(".jumbotron")
  form.addEventListener("submit", createBook)
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

// for testing
function fetchBook() {
  let book_id = event.target.parentElement.dataset.id

  fetch(BASE_URL+'/books/'+book_id)
  .then(resp => resp.json())
  .then(book => console.log(book));
 }


//Create Comments Form
function displayCreateCommentForm(event) {
  let book_id = event.target.parentElement.parentElement.parentElement.dataset.id
fetch(`${BASE_URL}/books/${book_id}`)
  .then(resp => resp.json())
  .then(book => {
    let card_footer = event.target.parentElement
     if(document.querySelector("#comment-form"))
  document.querySelector("#comment-form").remove()
let formDiv = document.createElement("div")
formDiv.id = "comment-form"
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
    formDiv.innerHTML += html
    let form = formDiv.querySelector('form')
    form.addEventListener("submit", createComment)
    card_footer.append(formDiv)
  })
}

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
