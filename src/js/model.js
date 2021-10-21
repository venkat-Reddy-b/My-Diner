import { async } from "regenerator-runtime"
import {API_URL} from "./config.js";
import { getJSON } from "./helper.js";
export const state = {
    food: {},
    search: {
        query:'',
        result:[]
    },
    total: 0,
    bookmarks:[],
}

export const loadFood = async function(id){

    try{
        const data = await getJSON(`${API_URL}/${id}`);
        state.food ={
        id: data.id,
        title: data.title,
        hotelname:data.hotelname,
        deliverytime: data.deliverytime,
        full:data.full,
        half:data.half,
        foodtype:data.foodtype,
        reviews:data.reviews,
        image:data.image_url,
        fqt:0,
        hqt:0,
        prc:0,
        }

        if(state.bookmarks.some(bookmark=>bookmark.id===id))
        state.food.bookmarked =true
        else
        state.food.bookmarked=false;
        //console.log(state.food);
    }
    catch(err)
    {
        throw err;
    }
}

export const loadSearchResults = async function(query)
{
    try{
        state.search.query=query;
        const data = await getJSON(`${API_URL}?q=${query}`);
        state.search.result=data.map( food => {
            return {
                id:food.id,
                foodname:food.title,
                hotelname:food.hotelname,
                imageurl:food.image_url,
                foodtype: food.foodtype,
            }
        });
        
    }
    catch(err)
    {
        throw err;
    }
}


export const updateQuantityF= function(newQuantity)
{
    state.food.fqt=newQuantity;
    state.food.prc=(+state.food.full.slice(0,3))*newQuantity;
    state.food.hqt=0;
    
}

export const updateQuantityH= function(newQuantity)
{
    state.food.hqt=newQuantity;
    state.food.prc=(+state.food.half.slice(0,2))*newQuantity;
    state.food.fqt=0;
}
export const updateOrderTotal = function()
{
    state.total=state.total+state.food.prc;
    
}

export const addBookmark = function(dish)
{
    //Add Bookmark
    state.bookmarks.push(dish);

    //mark current dish  as Bookmarked
    if(dish.id === state.food.id) state.food.bookmarked=true;
}

export const deleteBookmark = function(id)
{
    //delete bookmark
    const index = state.bookmarks.findIndex(el => el.id === id)
    state.bookmarks.splice(index,1);

    // mark  current dish  as not bookmarked
    if(id === state.food.id) state.food.bookmarked=false;

}