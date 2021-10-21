import { async } from "regenerator-runtime";
import { TIMEOUT_SEC } from "./config";

const timeout = function (s) {
    return new Promise(function (_, reject) {
      setTimeout(function () {
        reject(new Error(`Request took too long! Timeout after ${s} seconds , Please Search again!`));
      }, s * 1000);
    });
  };


export const getJSON = async function(url) {
    try{
        const res = await Promise.race([fetch(url),timeout(TIMEOUT_SEC)]) ;
        const data = await res.json();
        
        if(!(data.id||data[0]))
        {
            throw 'No such Dish or Restaurant  found, please try Again!';
            return;
        }

        return data;
    }
    catch(err)
    {
        throw err;
    }
}