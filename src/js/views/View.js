import icons from 'url:../../img/icons.svg';

export default class View{
    _data;
    renderSpinner = function()
    {
    const markup = `<div class="spinner">
    <svg>
        <use href="${icons}#icon-loader"></use>
    </svg>
        </div>`;
        this._clear();
        this._parentElement.insertAdjacentHTML("afterbegin",markup);
    }
    renderError = function(message = this._errormessage)
    {
        const markup = `
        <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
        `;
        this._clear();
        this._parentElement.insertAdjacentHTML("afterbegin",markup);
    }
    render(data,rend = true)
    {
        if(!data) return this.renderError();
        this._data =data;
        const markup = this._generateMarkup();

        if(!rend) return markup;
        this._clear();
        this._parentElement.insertAdjacentHTML("afterbegin",markup);
    }

    _clear()
    {
        this._parentElement.innerHTML='';
    }

}