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
rhit.FB_KEY_QUOTE = "quote";
rhit.FB_KEY_MOVIE = "movie";
rhit.FB_KEY_LAST_TOUCHED = "lastTouched";
rhit.fbMovieQuotesManager = null;

rhit.ListPageController = class {
	constructor() {
		console.log("created ListPageController")
	}
	updateList() {}
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
	add(quote, movie) {}
	beginListening(changeListener) {}
	stopListening() {}
	update(id, quote, movie) {}
	delete(id) {}
	get length() {}
	getMovieQuoteAtIndex(index) {}
   }
   

/* Main */
/** function and class syntax examples */
rhit.main = function () {
	console.log("Ready");

	if(document.querySelector("#listPage")) {
		console.log("You are on the list page.")
		rhit.fvMovieQuoteManager = new rhit.FbMovieQuotesManager();
		new rhit.ListPageController



	}


	if(document.querySelector("#detailPage")) {
		console.log("You are on the detail page.")
		new rhit.ListPageController
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
