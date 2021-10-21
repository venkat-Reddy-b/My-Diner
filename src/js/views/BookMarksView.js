import View from './View';
import PreviewView from './PreviewView';
import icons from 'url:../../img/icons.svg';


class BookMarksView extends View{

    _parentElement = document.querySelector('.bookmarks__list');
    _errormessage = 'No Bookmarks yet!, Please find a Dish and book mark it :)';

    _generateMarkup()
    {
        return this._data.map(bookmark => PreviewView.render(bookmark, false)).join('');
    }
}
export default new BookMarksView();