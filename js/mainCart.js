if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready);
 }else{
     ready();
 };

    function ready() {
        var removeCartItemButtons = document.getElementsByClassName('remove-item')
        for (var i = 0; i < removeCartItemButtons.length; i++){
        var button = removeCartItemButtons[i];
        button.addEventListener('click', removeCartItem);
        }
        var addToCartButtons = document.getElementsByClassName('buyItbtn')
        for (var i = 0; i < addToCartButtons.length; i++){
            var button = addToCartButtons[i];
            button.addEventListener('click', addToCartClicked);
        }

        // var goToCartbtn = document.getElementsByClassName('btn btn-primary btn-sm md-btn-flat text-expanded ml-1');
        // for(var i=0; i < goToCartbtn.length; i++ ){
        //     var button = goToCartbtn[i];
        //     button.addEventListener('click', gotToCart);
        // }
        storedItems();
        // updateCartTotal();
        badge();
    };
    
    var cartArray = JSON.parse(localStorage.getItem('cartArray')) || [];
    

    function badge(){
        var fetchData = JSON.parse(localStorage.getItem('cartArray'));
        var parentBadge = document.getElementsByClassName('badgeHolder')[0];
        var badgeHolder = document.createElement('span');
        var badge = `<span class="badge badge-danger indicator">${fetchData.length}</span>`;
        // var checkOutbtn= document.getElementsByClassName('btn btn-primary btn-sm md-btn-flat text-expanded ml-1')[0];
        if(fetchData.length > 0){
            while (parentBadge.firstChild) {
                parentBadge.removeChild(parentBadge.firstChild);
                }
                badgeHolder.innerHTML= badge;
                parentBadge.append(badgeHolder); 
                // checkOutbtn.classList.remove('disabled');   
        }else if(fetchData.length === 0){
                while (parentBadge.firstChild) {
                    parentBadge.removeChild(parentBadge.firstChild);
                }
                // checkOutbtn.classList.add('disabled');
                // console.log(checkOutbtn);
            }
    }
   
    function addToCartClicked(event) {
        var button = event.target;
        var shopItem = button.parentElement.parentElement;

        var parentBadge = document.getElementsByClassName('badgeHolder')[0];

        //create an object with all the properties needed 
        var items = {
        title : shopItem.getElementsByClassName('productTitle')[0].innerText,
        price : shopItem.getElementsByClassName('productPrice')[0].innerText,
        quantity : shopItem.getElementsByClassName('productQuantity')[0].innerText,
        imageSrc : shopItem.getElementsByClassName('productImage')[0].src
        };
        for (var i = 0; i < cartArray.length; i++) {
            if(cartArray[i].title === items.title){
                var itemQnty = parseInt(cartArray[i].quantity);
                itemQnty++;
                cartArray[i].quantity = itemQnty.toString();
                localStorage.setItem('cartArray', JSON.stringify(cartArray));
                storedItems();
                // updateCartTotal();            
                return;
            }
        }
        cartArray.push(items);
        localStorage.setItem('cartArray', JSON.stringify(cartArray));
        storedItems();
        badge();
        // updateCartTotal();
}
    //create the items in the cart
    function cartItemMaker(title,price,quantity,imageSrc){
        var cartItems = document.getElementsByClassName('cartrows')[0];
        var cartRow = document.createElement('div');
        cartRow.classList.add('cartitem');
        var cartRowContents = `
            <div class="cartitem media align-items-center p-3">
               <img src=" ${imageSrc} " class="d-block ui-w-40" alt="">
               <div class="media-body small mx-3">
                  <a href="#" class="cart-item-title text-dark font-weight-semibold">${title}</a><br>
                  <span class="cartprice text-muted">${price}</span>
                  <span class="text-muted"> x </span>
                  <span class="cart-quanity text-muted">${quantity}</span> 
               </div>
               <a href="#" class="remove-item text-danger text-xlarge font-weight-light">×</a>
            </div>
            <hr class="m-0">`
        cartRow.innerHTML = cartRowContents;
        cartItems.append(cartRow);
        cartRow.getElementsByClassName('remove-item')[0].addEventListener('click',removeCartItem);    
};
    //display items in the cart according to the LS
    function storedItems(){
         //cleanOut the whole cart div only from the view before you create more divs
        var cart = document.getElementsByClassName('cartrows')[0];
        while (cart.firstChild) {
            cart.removeChild(cart.firstChild);
            }
        if (localStorage =! null && localStorage.length > 0){
            var fetchData = JSON.parse(localStorage.getItem('cartArray'));
            fetchData.forEach(element => {
                cartItemMaker(element.title,element.price,element.quantity,element.imageSrc); 
            });
        }
    }

    function removeCartItem(event){
        var buttonClicked = event.target;
        var del = buttonClicked.parentElement;
        var targetItem = del.getElementsByClassName('cart-item-title')[0].innerText;
        for (var i=0; i < cartArray.length; i++){
            if(cartArray[i].title === targetItem){
                 var index = cartArray.indexOf(cartArray[i]);
                 var deletedItem = cartArray.splice(index,1);
                 localStorage.setItem('cartArray', JSON.stringify(cartArray));
                storedItems();
                // updateCartTotal();
                badge();
                
            }
        }
    };

    // function updateCartTotal(){
    //         var cartRows = document.getElementsByClassName('cartitem media align-items-center p-3');
    //         var total = 0;
    //         for (var i = 0; i < cartRows.length; i++){
    //             var cartRow = cartRows[i];
    //             console.log(cartRows[i]);
    //             var priceElement = cartRow.getElementsByClassName('cartprice')[0];
    //             var quantityElement = cartRow.getElementsByClassName('cart-quanity')[0];
    //             var price = parseFloat(priceElement.innerText.replace('€',''));
    //             var quantity = parseFloat(quantityElement.innerText);
    //             total = total +(price * quantity);
    //         }
    //         document.getElementsByClassName('cart-total-price')[0].innerText = '€' + total; 
    //         console.log('quantity=', quantity);
    //         console.log('price=', price);
    //         console.log('Total=', total);
    //     };
    
    // function gotToCart(event){
    //    console.log("checkout button is clicked!"); 
    //    $.ajax(
    //     {
    //         url: "http://localhost:8887/store/index.php/checkout/",
    //         type: "POST",
    //         data: '{name ="sonia"}',
            
    //         success: function(html){ 
    //            if (html) {
                
    //            }
    //         }        //  success: function() {window.location.reload(true)}
    //     }
        
    //     );   
    // }


