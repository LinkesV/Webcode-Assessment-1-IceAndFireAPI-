let url = 'https://www.anapioficeandfire.com/api/books';

//Giving ID to the body
let mainbody = document.querySelector("body");
mainbody.id = "main";

// NavBar
let navbar = document.createElement("nav");
navbar.className = "navbar bg-warning ";
navbar.innerHTML = `<div class="container-fluid"><span class="navbar-brand mb-0 h1">ICE AND FIRE API</span></div>`
document.getElementById("main").appendChild(navbar);

//Main Div

let maindiv = document.createElement("div");
maindiv.id = "maindiv";
maindiv.className = "container hidden";
document.getElementById("main").appendChild(maindiv);

// Loading Screen

let loading = document.createElement("div");
loading.className = "loading-container";
loading.id = "loader";
loading.innerHTML = `<div class="loading"></div><div id="loading-text">loading</div>`;
document.getElementById("main").appendChild(loading);

// Div for the books

let books = document.createElement("div");
books.id = "books"
document.getElementById("maindiv").appendChild(books);

//Adding a search bar to the Application

let search = document.createElement("div");
search.id = "search bar"
search.innerHTML = `<input type="search" class="book-control" placeholder=" Search for books" id="searchName"/>`
document.getElementById("books").appendChild(search);


// Adding Search Capability to the Search bar
const searchbar = document.getElementById("searchName");
let allbooks = [];
searchbar.addEventListener("input", (x) => {
    console.log(allbooks);
    const inputname = x.target.value.toLowerCase();
    allbooks.forEach(y=> {
        const filter = y.name.toLowerCase().includes(inputname) || y.isbn.toLowerCase().includes(inputname) || y.pages.toLowerCase().includes(inputname) || y.author.toLowerCase().includes(inputname) || y.publisher.toLowerCase().includes(inputname) || y.releasedate.toLowerCase().includes(inputname)||y.characters.toLowerCase().includes(inputname);
        const change = document.getElementById(`card-${y.name}`);
        change.classList.toggle("hidden",!filter);
        
        
     //HighLigh Text by bolding 

        let change2 = document.querySelectorAll(`.highlight-${y.isbn}`);
       
                for(item of change2){
                    let regExp = new RegExp(inputname,"i");
                    item.innerHTML = (item.textContent).replace(regExp,`<b>$&</b>`);
                };    
    })
})

//Alert for Loading
alert("Please wait for the website to load");

// Async Function
async function CreateBooks(){
    try{

        //Await Keyword 
        const res = await fetch(url);
        const bookdetails = await res.json();

        for(book of bookdetails){
        
            // Gettings the book details 
            let name = book.name;
            let isbn = book.isbn;
            let pages = String(book.numberOfPages);
            let author = book.authors[0];
            let publisher = book.publisher;
            let releasedate = book.released;


            // Gettings the 5 characters for the book
            let characterslist = await getCharacters(book.characters);

            // for Search
            allbooks = bookdetails.map(x =>{
                return {name: x.name,  
                    isbn: x.isbn, 
                    pages : String(x.numberOfPages), 
                    author:x.authors[0], 
                    publisher : x.publisher, 
                    releasedate: x.released,
                    characters: characterslist.join(" ")
                }
            })
            

            // Creating the card using BOOTSTRAP

            let card = document.createElement("div");
            card.className = "card";
            card.id = `card-${name}`;
            // card.style = 
            document.getElementById("books").appendChild(card);


            // Creating IMG

            let pic = document.createElement("img");
            pic.className = "card-img-top"
            pic.setAttribute("src",`./bookcovers/${isbn}.jpg`);
            
        
            pic.id = `pic-${name}`;
            document.getElementById(`card-${name}`).appendChild(pic);

            // Creating Card Body 
            let body = document.createElement("div")
            body.className = "card-body";
            body.id = name;
            document.getElementById(`card-${name}`).appendChild(body);

            // Adding Cart Image

            let cart = document.createElement("div");
            cart.className = "cart-body"
            cart.innerHTML = `<img class = "cart" src="./cart.png"/> <p>Add To Cart</p>`
            document.getElementById(name).append(cart);

            // Adding Name of book

            let title = document.createElement("h1");
            title.className = "card-title";
            title.innerHTML = name;
            title.className = `highlight-${isbn}`;
            document.getElementById(name).appendChild(title);

            // Author

            let writer = document.createElement("div")
            writer.className = "card-text"
            writer.innerHTML = `<p class="highlight-${isbn}">Author:<br> <span>${author}</span></p>`;
            document.getElementById(name).appendChild(writer);

            //Publisher 
            let pub = document.createElement("div");
            pub.className = "card-text"
            pub.innerHTML = `<p class="highlight-${isbn}">Publisher:<br> <span>${publisher}</span></p>`;
            document.getElementById(name).appendChild(pub);

            //ISBN 
            let num = document.createElement("div");
            num.className = "card-text";
            num.innerHTML = `<p class="highlight-${isbn}">ISBN number:<br> <span>${isbn}</span></p>`;
            document.getElementById(name).appendChild(num);

            //Release Date
            let date = document.createElement("div");
            date.className = "card-text";
            date.innerHTML = `<p class="highlight-${isbn}">Release Date:<br> <span>${releasedate.slice(0,10)}</span></p>`;
            document.getElementById(name).appendChild(date);

            //Pages
            let nopage = document.createElement("div");
            nopage.className = "card-text";
            nopage.innerHTML = `<p class="highlight-${isbn}">Number of pages:<br> <span>${[pages]}</span></p>`;
            document.getElementById(name).appendChild(nopage);

            //Characters

            let people = document.createElement("div");
            people.className="card-text";
            people.innerHTML = `<p class="highlight-${isbn} char">Characters:<br> <span>${characterslist.join(", ")}</span></p>`;
            document.getElementById(name).appendChild(people);

        }

        // Once all the content is loaded it becomes visibile 
        maindiv.classList.remove("hidden");
        loading.classList.add("hidden");
    }

    catch(error){
        console.log(error);
    }
};

//Gettings the characters for the books 

async function getCharacters(listofurls){
 try{
    
    let listofcharacters = [];
    let x = 5;
    for(let i = 0; i < x; i++){
        let characterurl = listofurls[i];

        let res2 = await fetch(characterurl);
        let characterdetails = await res2.json();
        
        // Some of names in the Chracter URL ARE BLANK so solving that ERROR 
        if(characterdetails.name == ""){
             x ++;
        }
        else{
            listofcharacters.push(characterdetails.name)
        }

        }
    return listofcharacters;
 }
 catch(error){
    console.log(error);
 }
}

// Search Function 



CreateBooks();


