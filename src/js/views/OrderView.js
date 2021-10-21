import View from './View';

let first_clr = 0;
class OrderView extends View {
    _parentElement = document.querySelector('.order_details');


    addHandlerOrderDetails(handler)
    {
        document.querySelector('.food').addEventListener('click', function(e)
        {
            const clicked = e.target.closest('.add-order')
            if(!clicked) return;
            const added = document.querySelector('.food__info-value').innerHTML
            if(added.slice(2,added.length-6)=='0') 
            {
                alert("Please select atleast one item to add to Cart!");
                return;
            }
            const add = document.querySelector('.food__info-add');
            if(add.innerHTML==='ADDED') {
                alert("this item is already added to the cart!");
                return;}
            add.innerHTML='ADDED';
            handler();
        })
    }

    addHandlerclearcart(handler)
    {
        document.querySelector('.clear__cart').addEventListener('click',function()
        {
            handler();
            document.querySelector('.disp-tot-prc').innerHTML='0';
            document.querySelector('.order_details').innerHTML=`<p class="food__orders-text">
            your cart is empty!!!
          </p>`;
          first_clr = 0;
        })
    }

    addHandlerPlaceOrder()
    {
            document.querySelector('.food__btn').addEventListener('click',function()
            {
                const value =+document.querySelector('.disp-tot-prc').innerHTML;
                if(value===0)
                {
                    alert('please select atleast one item to place order');
                }
                else
                {
                alert('Order Placed Successfully, Thank you!');
                location.reload();
                }
            }) 
    }

    render(data,total)
    {
        if(!data) return this.renderError();
        this._data =data;
        const markup = this._generateMarkup();
        if(first_clr===0) this._parentElement.innerHTML ='';
        first_clr=1;
        // console.log(first_clr);
        this._parentElement.insertAdjacentHTML("afterbegin",markup);
        document.querySelector('.disp-tot-prc').innerHTML=`${total}`;
        //console.log(document.querySelector('.disp-tot-prc').innerHTML)
    }
    _generateMarkup()
    {
        return `<p class="food__orders-text">
        ${this._data.title} | <span class = "fty ${this._data.foodtype}">${this._data.foodtype}</span> | ₹${this._data.prc} 
      </p>`;
    }   

}

export default new OrderView();