import View from './View';
import icons from 'url:../../img/icons.svg';


class PreviewView extends View{

    _parentElement = '';
   
    _generateMarkup()
    {
        const id = window.location.hash.slice(1);
        return `
        <li class="preview">
            <a class="preview__link" 
            ${this._data.id===id? 'preview_link--active':''}
            href="#${this._data.id}">
                <figure class="preview__fig">
                    <img src="${this._data.image}" alt="Test" />
                </figure>        
                <div class="preview__data">
                    <h4 class="preview__title">${this._data.title}&nbsp<span class = "fty ${this._data.foodtype}">${this._data.foodtype}</span></h4>
                    <p class="preview__hotel ">${this._data.hotelname}</p>  
                </div>
            </a>
        </li>
        `;
    }
}
export default new PreviewView();