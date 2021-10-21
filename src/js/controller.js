
import * as model from './model.js';
import foodView from './views/FoodView.js';
import searchView from './views/SearchView.js';
import resultsView from './views/ResultsView.js';
import orderView from './views/OrderView.js';
import bookMarksView from './views/BookMarksView.js';
import AddProfileView from './views/AddProfileView.js';


import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime/runtime';


//const foodContainer = document.querySelector('.food');
// alert('Please allow location for good experience!');

const showFood = async function()
{
  try{

    const id = window.location.hash.slice(1);
    if(!id) return;

    //loading spinner
    foodView.renderSpinner();

    //loading food
    await model.loadFood(id);

    //rendering food
    foodView.render(model.state.food);

    // //bookmark render
    // bookMarksView.render(model.state.bookmarks)
  }
  catch(err)
  {
     foodView.renderError(`${err} 🍖🥗🌭🍿`);
    
  }
}

const controlSearchResults = async function()
{
  try{
    //getSearch Query
    const query = searchView.getQuery().trim();
    if(!query)
    {
      throw 'Please search for a valid dish!';
      return;
    }

    //loadSpinner
    resultsView.renderSpinner();

    //load Searchresults
    await model.loadSearchResults(query);
    resultsView.render(model.state.search.result);
  }
  catch(err)
  {
    resultsView.renderError(`${err} 🥗`);
  }
}

const controlQuantityF = function(newQuantity)//Full
{
  model.updateQuantityF(newQuantity);
  foodView.render(model.state.food);
}
const controlQuantityH = function(newQuantity)//Half
{
  model.updateQuantityH(newQuantity);
  foodView.render(model.state.food);
}

const controlOrderDetails = function()
{
  model.updateOrderTotal();
  orderView.render(model.state.food,model.state.total);
}

const controlCancelCart = async function()
{
  try{
    model.state.total = 0;

    const id = window.location.hash.slice(1);
    if(!id) return;

    //loading spinner
    foodView.renderSpinner();

    //loading food
    await model.loadFood(id);

    //rendering food
    foodView.render(model.state.food);

    // //bookmark render
    // bookMarksView.render(model.state.bookmarks)
  }
  catch(err)
  {
     foodView.renderError(`${err} 🍖🥗🌭🍿`);
    
  }

}


const controlBookmark = function()
{
  if(!model.state.food.bookmarked) model.addBookmark(model.state.food);
  else model.deleteBookmark(model.state.food.id);
  //console.log(model.state.food);
  
  foodView.render(model.state.food);

  bookMarksView.render(model.state.bookmarks);
  if(model.state.bookmarks.length === 0) return bookMarksView.render('');
}

const init = function()
{
  foodView.addHandlerRender(showFood);
  foodView.addHandlerUpdateQuantityF(controlQuantityF);
  foodView.addHandlerUpdateQuantityH(controlQuantityH);
  foodView.addHandlerAddBookmark(controlBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  orderView.addHandlerOrderDetails(controlOrderDetails);
  orderView.addHandlerclearcart(controlCancelCart);
  orderView.addHandlerPlaceOrder();
}
init();