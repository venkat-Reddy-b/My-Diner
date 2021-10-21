import icons from 'url:../../img/icons.svg';
import View from './View';


class FoodView extends View {
    _parentElement = document.querySelector('.food');
    _errormessage = 'No such food found please try again';


    addHandlerRender(handler)
    {
       ['hashchange','load'].forEach( ev =>
          {
            window.addEventListener(ev,handler);
          });
    }

    addHandlerUpdateQuantityF(handler)
    {
        this._parentElement.addEventListener('click',function(e)
        {
            const btn= e.target.closest('.btn--update-servings-f');
            if(!btn) return;
            const updateTo = +btn.dataset.updateTo;
            if(updateTo>=0) handler(updateTo);
        })
    }

    addHandlerUpdateQuantityH(handler)
    {
        this._parentElement.addEventListener('click',function(e)
        {
            const btn= e.target.closest('.btn--update-servings-h');
            if(!btn) return;
            const updateTo = +btn.dataset.updateTo;
            if(updateTo>=0) handler(updateTo);
        })
    }

    addHandlerAddBookmark(handler)
    {
        this._parentElement.addEventListener('click',function(e)
        {
            const btn = e.target.closest('.btn--bookmark');
            if(!btn) return;
            handler()
        })
    }

    _generateMarkup()
    {
        return  `
        <figure class="food__fig">
            <img src="${this._data.image}" alt="" class="food__img" />
            <h1 class="food__title">
            <span>${this._data.title}</span>
            </h1>
        </figure>

        <div class="food__details">
            <div class="food__info">
            <svg class="food__info-icon">
                <use href="${icons}#icon-clock"></use>
            </svg>
            <span class="food__info-text">Delivery in&nbsp</span>
            <span class="food__info-data food__info-data--minutes">&nbsp ${this._data.deliverytime}</span>
            </div>
            <div class="food__info">
            <span class="food__info-value">₹ ${this._data.prc}&nbsp</span>
            <div class="add-order">
            <button class="btn--small">
            <svg class="food__info-icon">
            <use href="${icons}#icon-cart"></use>
            </svg>
            <span class="food__info-add" > ADD </span>
            </button>
            </div>
            </div>
            <div>
            <span class = "bookmark-text">${this._data.bookmarked? 'UN':''}BOOKMARK &nbsp</span>
            </div>
            <button class="btn--round btn--bookmark">
            <svg class="">
                <use href="${icons}#icon-bookmark${this._data.bookmarked? '-fill':''}"></use>
            </svg>
            </button>
        </div>

        <div class="food__properties">
            <h2 class="heading--1"> Restaurant : ${this._data.hotelname}</h2>
            <h2 class="heading--1 ${this._data.foodtype}">Food Type : ${this._data.foodtype}</h2>
            <h2 class="heading--2">Price</h2>
            <ul class="food__property-list">
            <li class="food__property">
                <div class="food__description">
                <span class="food__unit"><b>Full : &nbsp</b></span>
                </div>
                <div class="food__info-value">${this._data.full}</div>
                <div class="food__info-buttons">
                <button class="btn--tiny btn--update-servings-f item--added" data-update-to ="${this._data.fqt+1}">
                    <svg>
                    <use href="${icons}#icon-plus-circle"></use>
                    </svg>
                </button>
                <div class="food__description">
                <span class="food__unit"><b>&nbsp ${this._data.fqt} &nbsp</b></span>
                </div>
                <button class="btn--tiny btn--update-servings-f" data-update-to ="${this._data.fqt-1}">
                    <svg>
                    <use href="${icons}#icon-minus-circle"></use>
                    </svg>
                </button>
                </div>
            </li>
            <li class="food__property">
                <div class="food__description">
                <span class="food__unit"><b>Single : &nbsp</b></span>
                </div>
                <div class="food__info-value">${this._data.half}</div>
                <div class="food__info-buttons">
                <button class="btn--tiny btn--update-servings-h item--added" data-update-to ="${this._data.hqt+1}">
                    <svg>
                    <use href="${icons}#icon-plus-circle"></use>
                    </svg>
                </button>
                <div class="food__description">
                <span class="food__unit"><b>&nbsp ${this._data.hqt} &nbsp</b></span>
                </div>
                <button class="btn--tiny btn--update-servings-h" data-update-to ="${this._data.hqt-1}">
                    <svg>
                    <use href="${icons}#icon-minus-circle"></use>
                    </svg>
                </button>
                </div>
            </li>
            </ul>
            <h2 class="heading--2">Reviews</h2>
            <div>
            <ul>
            ${this._data.reviews.map(rev => 
                {
                return `<li>
                <p class = "food-review">${rev}</p>
                </li>`
                }).join('')}
                <li>
                <p class = "food-review">The food is really great</p>
                </li>
            </ul>
            </div>
        </div>`;
    }
}

export default new FoodView();