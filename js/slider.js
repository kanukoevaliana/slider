var Slider = (function(){
    return function (selector, config){
        var mainElement = document.querySelector(selector),
        sliderList = mainElement.querySelector(".slider__list"),
        sliderItem = mainElement.querySelectorAll(".slider__item"),
        sliderControl = mainElement.querySelectorAll(".slider__control"),
        left = mainElement.querySelector(".left"),
        right = mainElement.querySelector(".right"),
        listWidth = parseFloat(getComputedStyle(sliderList).width),
        itemWidth = parseFloat(getComputedStyle(sliderItem[0]).width),
        positionLeftItem = 0,
        transform = 0,
        step = 600 + 'px',
        items = [];

        sliderItem.forEach(function(item, index){
            items.push({item: item, position: index, transform: 0});
        });
        
        var position = {
            getMin: 0,
            getMax: items.length - 1,
        }

        var transformItem = function(direction){
            if(direction === 'right'){
                if((positionLeftItem + listWidth / itemWidth - 1) >= position.getMax){
                    return ;
                }
                positionLeftItem++;
                transform -= step;
            }
            if(direction === 'left'){
                if(positionLeftItem <= position.getMin){
                    return ;
                }
                positionLeftItem--;
                transform += step;
            }
            sliderList.style.transform = 'translateX(' + transform + ')%';
        }

        var controlClick = function(e){
            var direction = this.classList.contains('.right') ? 'right' : 'left';

            e.preventDefault();
            transformItem(direction);
        };

        var setUpListeners = function(){
            sliderControl.forEach(function(item){
                item.addEventListener('click', controlClick);
            })
        }

        setUpListeners();

        return {
            right: function(){
                transformItem('right');
            },
            left: function(){
                transformItem('left');
            }
        }
    }
}());

var run = Slider('.slider')