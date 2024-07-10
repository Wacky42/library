
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        if (this.read == true) {
            return `${this.title} by ${this.author}, ${pages} pages, read`
        }
        else {
            return `${this.title} by ${this.author}, ${pages} pages, not read yet`
        }
    }
}

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    return newBook;
}

function removeBook(index) {
    myLibrary.splice(index, 1);
}

function toggleReadStatus(index) {
    myLibrary[index].read = !myLibrary[index].read;
}

const myLibrary = []
const bookOne = addBookToLibrary('bookOne', 'authorOne', 296, true);
const bookTwo = addBookToLibrary('bookTwo', 'authorTwo', 96, false);
const bookThree = addBookToLibrary('bookThree', 'authorThree', 196, true);
const bookFour = addBookToLibrary('bookFour', 'authorFour', 69, false);
const bookFive = addBookToLibrary('bookFive', 'authorFive', 296, true);

function listBooks() {
    const bookList = document.querySelector(".bookList")
    bookList.innerHTML = '';

    myLibrary.forEach((book, index) => {
        const bookRow = document.createElement("div");
        bookRow.classList.add("bookRow");

        const title = document.createElement("div");
        title.classList.add("title");
        title.textContent = book.title;

        const author = document.createElement("div");
        author.classList.add("author");
        author.textContent = book.author;

        const pages = document.createElement("div");
        author.classList.add("pages");
        pages.textContent = parseInt(book.pages);

        const readStatus = document.createElement("button");
        readStatus.textContent = book.read ? 'Read' : 'Not Read';
        readStatus.classList.add("readStatus");

        readStatus.addEventListener("click", function() {
            toggleReadStatus(index);
            listBooks();
        })

        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.classList.add("removeButton");
        removeButton.addEventListener("click", function() {
            removeBook(index);
            listBooks();
        })
        
        bookRow.appendChild(title);
        bookRow.appendChild(author);
        bookRow.appendChild(pages);
        bookRow.appendChild(readStatus);
        bookRow.appendChild(removeButton);

        bookList.appendChild(bookRow);
    })
}


document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const pages = parseInt(document.getElementById('pages').value);
        const read = document.getElementById('read').checked;

        addBookToLibrary(title, author, pages, read);
        form.reset();

        listBooks();
    })
})

listBooks();


