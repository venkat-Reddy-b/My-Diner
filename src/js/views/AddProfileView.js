import View from "./View";
let coordinates;

class AddProfileView extends View {

    _parentElement = document.querySelector('.upload');
    _winddow = document.querySelector('.add-food-window');
    _overlay = document.querySelector('.overlay');
    _btnOpen = document.querySelector('.nav__btn--add-food');
    _btnClose = document.querySelector('.btn--close-modal');
    _location = document.querySelector('.location__btn');
    _submitprofile =  document.querySelector('.submit__prof');

    constructor()
    {
        super();
        this._addHandlershowWindow();
        this._addHandlercloseWindow();
        this._addHandlerlocation();
        this._addHandlersubmitProfile();
    }

    toggleWindow()
    {
        this._overlay.classList.toggle('hidden');
        this._winddow.classList.toggle('hidden');
    }
    _addHandlershowWindow()
    {
        this._btnOpen.addEventListener('click',this.toggleWindow.bind(this) );

        if(navigator.geolocation)
        {
            navigator.geolocation.getCurrentPosition(function(position)
            {
                const {latitude,longitude} = position.coords;
                coordinates = [latitude,longitude];
                // console.log(position.coords);
                console.log(latitude,longitude);
                const map = L.map('map').setView(coordinates, 13);

                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

                let loc =L.marker(coordinates).addTo(map)
                    .bindPopup('your location')
                    .openPopup();


                map.on('click',function(mapEvent)
                {
                    loc.addTo(map);
                    loc.remove();
                    const {lat,lng} = mapEvent.latlng;
                    coordinates = [lat,lng];
                
                    loc = L.marker([lat,lng]).addTo(map)
                    .bindPopup('your location')
                    .openPopup();
                })
            },function(){
                alert('could not get your position! Enter Address Manually')
                
            })
        }
    }
    _addHandlercloseWindow()
    {
        this._btnClose.addEventListener('click',this.toggleWindow.bind(this) );
        this._overlay.addEventListener('click',this.toggleWindow.bind(this) );
    }

    _addHandlerlocation()
    {
        this._location.addEventListener('click',function(e)
        {
            e.preventDefault();
            console.log('new location',coordinates);
            alert('your location is set successfully!');
        })
    }

    _addHandlersubmitProfile()
    {
        this._parentElement.addEventListener('submit',function(e)
        {
            e.preventDefault();
            const data = [...new FormData(this)];
            if(!coordinates) coordinates = data[3][1];
            if(!coordinates)
            {
                alert('Please Enter Address Manually as your location is not accesible!');
                return;
            }
            
            console.log(data);
            alert('Profile is submitted, Thank you!');
        })

    }

}

export default new AddProfileView();