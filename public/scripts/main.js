 /**
 * @fileoverview
 * Provides the JavaScript interactions for all pages.
 *
 * @author 
 * PUT_YOUR_NAME_HERE
 */

/** namespace. */
var rhit = rhit || {};

/** globals */
rhit.FB_COLLECTION_MOVIEQUOTES = "MovieQuotes";
rhit.FB_KEY_QUOTE = "Quote";
rhit.FB_KEY_MOVIE = "Movie";
rhit.FB_KEY_LAST_TOUCHED = "lastTouched";
rhit.fbMovieQuotesManager = null;

// I stole this from: the video.. looks like the stackoverflow thing was edited..
function htmlToElement(html) {
	var template = document.createElement('template');
	html = html.trim();
	template.innerHTML = html;
	return template.content.firstChild;
  }
  
rhit.ListPageController = class {
	constructor() {

		document.querySelector("#submitAddQuote").onclick = (event) => {
			const quote = document.querySelector("#inputQuote").value;
			const movie = document.querySelector("#inputMovie").value;
			rhit.fbMovieQuotesManager.add(quote, movie);
		};

		//pre animation
		$("#addQuoteDialogue").on("show.bs.modal", (event) => {
			document.querySelector("#inputQuote").value = "";
			document.querySelector("#inputMovie").value = "";
		});

		//post animation
		$("#addQuoteDialogue").on("shown.bs.modal", (event) => {
			document.querySelector("#inputQuote").focus();
		});

		//start listening
		rhit.fbMovieQuotesManager.beginListening(this.updateList.bind(this));

	}
	updateList() {

		console.log("I need to update the list on the page!");
		console.log(`Num quotes = ${rhit.fbMovieQuotesManager.length}`);
		console.log(`Example quote = `, rhit.fbMovieQuotesManager.getMovieQuoteAtIndex(0));

		// Make a new quoteListContainer
		const newList = htmlToElement('<div id="quoteListContainer"></div>');
		// Fill the quoteListContainer with quote cards
		for (let i = 0; i <rhit.fbMovieQuotesManager.length; i++) {
			const mq = rhit.fbMovieQuotesManager.getMovieQuoteAtIndex(i);
			const newCard = this._createCard(mq);
			newList.appendChild(newCard);
		}

		//remove the old quoteListContainer
		const oldList = document.querySelector("#quoteListContainer");
		oldList.removeAttribute("id");
		oldList.hidden = true;
		//put in the new quoteListContainer
		oldList.parentElement.appendChild(newList);
	}

	_createCard(movieQuote) {
		return htmlToElement(`<div class="card">
        <div class="card-body">
          <h5 class="card-title">${movieQuote.quote}</h5>
          <h6 class="card-subtitle mb-2 text-muted">${movieQuote.movie}</h6>
        </div>
      </div>`);
	}
   }
   
   rhit.MovieQuote = class {
	constructor(id, quote, movie) {
	  this.id = id;
	  this.quote = quote;
	  this.movie = movie;  
	}
   }
   
   rhit.FbMovieQuotesManager = class {
	constructor() {
	console.log("created FbMovieQuotesManager")
	  this._documentSnapshots = [];
	  this._ref = firebase.firestore().collection(rhit.FB_COLLECTION_MOVIEQUOTES);
	}

	add(quote, movie) {

		console.log(quote, movie);

	// Add a new document with a generated id.
		this._ref.add({
			[rhit.FB_KEY_QUOTE]: quote,
			[rhit.FB_KEY_MOVIE]: movie,
			[rhit.FB_KEY_LAST_TOUCHED]: firebase.firestore.Timestamp.now(),
		})
		.then(function (docRef) {
			console.log("Document written with ID: ", docRef.id);
		})
		.catch(function (error) {
			console.error("Error adding document: ", error);
		});
		
	}

	beginListening(changeListener) {
		this._unsubscribe = this._ref.orderBy(rhit.FB_KEY_LAST_TOUCHED, "desc").limit(50).onSnapshot((querySnapshot) => {
			console.log("MovieQuote Update!");
			this._documentSnapshots = querySnapshot.docs;


			// querySnapshot.forEach((doc) => {
			// 	console.log(doc.data());
			// });
			
			changeListener();
		});
	}
	stopListening() {
		this._unsubscribe();
	}
	update(id, quote, movie) {}
	delete(id) {}
	get length() {
		return this._documentSnapshots.length;
	}
	getMovieQuoteAtIndex(index) {
		const docSnapshot = this._documentSnapshots[index];
		const mq = new rhit.MovieQuote (
			docSnapshot.id,
			docSnapshot.get(rhit.FB_KEY_QUOTE),
			docSnapshot.get(rhit.FB_KEY_MOVIE),
		);

		return mq;
	}
   }
   

/* Main */
/** function and class syntax examples */
rhit.main = function () {
	console.log("Ready");

	if(document.querySelector("#listPage")) {
		console.log("You are on the list page.")
		rhit.fbMovieQuotesManager = new rhit.FbMovieQuotesManager();
		new rhit.ListPageController();



	}


	if(document.querySelector("#detailPage")) {
		console.log("You are on the detail page.")
		new rhit.ListPageController();
	}


	// //temp code for read and add
	// const ref = firebase.firestore().collection("MovieQuotes");
	// ref.onSnapshot((quearySnapshot) => {

	// 	quearySnapshot.forEach((doc) => {
	// 		console.log(doc.data());
	// 	});
	// });

	// ref.add({
	// 	quote: "My first test",
	// 	movie: "My first movie"
	// });

};




rhit.main();
