
 
      // making selection
      const menuImages = document.querySelectorAll('.item > img');
      const menuPrices = document.querySelectorAll('.item > p');
      const listItems = document.querySelectorAll('div.item');
      const stars = document.querySelectorAll('.actions > span');
      const showTip = document.querySelector('span.tip');
      
      let menu = [];
      
      const getRating = (star) => {
        star = star.getAttribute("data-rate");
        let starInt = parseInt(star);
        return starInt;
      }
      
      const formatMoney = (figure) => {
        return figure.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
      };
      
      const tipWith = (tip) => {
        tip = formatMoney(tip);
        return showTip.textContent = `${tip}`;
      };
      
      
      
      const calculateTip = () => {
        let tip = 0;
        
        const mealId = document.querySelector('.item[data-selected]').getAttribute("data-meal-id");
        const meal = menu.find((food) => food.id === mealId);
        
        const rating = maximumRating();
        if (rating >= 3){
          tip = Math.round((rating / 50) * meal.price);
        }
        
        return tipWith(tip);
      };
      
      const maximumRating = () => {
        let holder = [];
        
        const stars = document.querySelectorAll('span.rated')
        let starsArr = Array.from(stars)
        for (let index = 0; index < stars.length; index++) {
          holder.push(starsArr[index].getAttribute("data-rate"))
        }
        return parseInt(Math.max(...holder));
      };
      
      const mealChoosen = ({target}) => {
        listItems.forEach((item, index) => {
          item.removeAttribute("data-selected")
          if (target) {
            target.parentElement.setAttribute("data-selected", "")
          }
        })
        
        calculateTip();
      };
      
      const rateMeal = ({target}) => {
        const rating = getRating(target);
        if (!selected()) {
          return;
        }
        
        if (selected()) {
          stars.forEach((star, index) => {
            starNumber = star.getAttribute("data-rate")
            starNumberInt = parseInt(starNumber)
            star.classList.remove('rated')
            
            if (starNumberInt <= rating) {
              star.classList.add('rated')
            }
          });
        }
        
        calculateTip();
        
      };
      
      const selected = () => {
        let imageSelected = false;
        listItems.forEach((item) => {
          if (item.hasAttribute('data-selected')) imageSelected = true;
        });
        return imageSelected;
      }
      
      const rated = () => {
        let ratingSelected = false;
        stars.forEach((star) => {
          if (star.classList.contains(".rated")) ratingSelected = true;
        });
        return ratingSelected;
      }
      
      const uiCanInteract = () => {
        listItems.forEach((item) => item.addEventListener('click', mealChoosen))
        
        stars.forEach((star) => star.addEventListener('click', rateMeal))
        
      };
      
      const displayMenu = ({results}) => {
        const [data] = results;
        menu = Object.values(data);
        
        menu.forEach((meal, index) => {
          menuImages[index].src = `${meal.sample}`;
          
          let formattedPrice = formatMoney(meal.price);
          menuPrices[index].textContent = `${formattedPrice}`;
          listItems[index].setAttribute("data-meal-id", meal.id)
        });
        
        uiCanInteract();
      };
      
      const fetchAndDisplayMenu = () => {
        const api = 'https://randomapi.com/api/d12c99b82acfefae33f7ce9239b57811';
        fetch(api)
        	.then((response) => response.json())
        	.then((data) => displayMenu(data))
      
      };
      
      
      
     
      
     const startApp = () => {
       fetchAndDisplayMenu();
     };
      
      startApp();