class Book {
    constructor(book) {
        this.id = book.id
        this.title = book.title
        this.author = book.author
        this.link = book.link
        this.imageLink = book.imageLink
        this.language = book.language
        this.page = book.page
        this.year = book.year
        this.country = book.country
        this.comments = book.comments
    }

    render(){

        // grab container for books
        let books_area = document.querySelector(".row")

        // create book card area
        let book_div = document.createElement('div')
        book_div.setAttribute("data-id",this.id)
        book_div.classList.add("col-lg-3")
        book_div.classList.add("col-md-6")
        book_div.classList.add("mb-4")


        // create book card 
        let book_card_div = document.createElement('div')
        book_card_div.classList.add("card")


        // add images
        let book_img = document.createElement('img')
        let bLink = `./src/${this.imageLink}` 
        book_img.src = bLink
        book_img.classList.add("card-img-top")

        // add card body 
        let card_body = document.createElement('div')
        card_body.classList.add("card-body")

        // add card title 
        let card_title = document.createElement('h4')
        card_title.className = "card-title"
        card_title.innerHTML += `${this.title}`

        // add comments 
        let book_comments = document.createElement('p')
        book_comments.className = "card-text"
        // book_comments.setAttribute("data-id",this.id)

        this.comments.forEach(comment => {
        book_comments.innerHTML += `<br>${comment.content} - ${comment.comment_type}<br>`
        })
        // book_comments.innerHTML += "testing this out"

        // add card footer
        let card_footer = document.createElement('div')
        card_footer.classList.add("card-footer")

        // add footer button
        // card_footer.innerHTML += `<a href="#" onclick='displayCreateCommentForm();return false;'>Add a Comment</a>`
        let comment_button = document.createElement('button')
        // comment_button.href = "#"
        comment_button.classList.add("btn")
        comment_button.classList.add("btn-primary")
        comment_button.innerHTML = "Add Comment"
        // comment_button.onclick = displayCreateCommentForm()
        // comment_button.add
        //book_div.innerHTML += `<a href="#" onclick='displayCreateCommentForm();return false;'>Add a Comment</a>`
  


        // display comment form from button
        comment_button.addEventListener("click", (event) => displayCreateCommentForm(event), false)

        

        books_area.appendChild(book_div)

        book_div.appendChild(book_card_div)
      
        book_card_div.appendChild(book_img)

        book_card_div.appendChild(card_body)

        card_body.appendChild(card_title)

        card_body.appendChild(book_comments)

        book_card_div.appendChild(card_footer)

        card_footer.appendChild(comment_button)

        

    }

    renderNewBook(){
    document.querySelector("#book-form").remove()

    let book_area = document.querySelector(".jumbotron")

     book_area.innerHTML += `
      <li><a href="#" data-id="${this.id}">${this.title}</a>
       - ${this.author} ${this.imageLink}
       </li>
      `
    
    }


}
