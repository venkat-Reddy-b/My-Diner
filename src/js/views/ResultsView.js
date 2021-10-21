import View from './View';
import icons from 'url:../../img/icons.svg';


class ResultsView extends View{

    _parentElement = document.querySelector('.results');
    _errormessage = 'No dishes found for the query your searching, please try again!';


    _generateMarkup()
    {
        //console.log(this._data);
        return this._data.map(this._generatePreview).join('');
    }

    _generatePreview(data)
    {
        const id = window.location.hash.slice(1);
        return `
        <li class="preview">
            <a class="preview__link
            ${data.id===id? 'preview_link--active':''}
            " href="#${data.id}">
                <figure class="preview__fig">
                    <img src="${data.imageurl}" alt="Test" />
                </figure>        
                <div class="preview__data">
                    <h4 class="preview__title">${data.foodname}&nbsp<span class = "fty ${data.foodtype}">${data.foodtype}</span></h4>
                    <p class="preview__hotel ">${data.hotelname}</p>  
                </div>
            </a>
        </li>
        `;
    }
}
export default new ResultsView();