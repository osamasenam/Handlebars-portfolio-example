var carousel = document.getElementsByClassName('carousel')[0];
var photos = document.getElementsByTagName('img');
var dots = document.getElementsByClassName('dot');
// console.log(dots[0]);

var i=0; // current photo index
var iInterrupt; // the index of clicked photo
var timer; // 5 secs delay handler
var transitioning = false; // flag to indicate a transition is on-going 
var userInterrupt = false; // flag to indicate a dot is clicked 

function photosLoop() {
    transitioning = true;
    //move the current img to the left
    photos[i].classList.remove('current');
    photos[i].classList.add('after');
    dots[i].classList.remove('on');


     // auto swap or specific click
    if(userInterrupt == true) {
        i = iInterrupt; // Loop increment
        userInterrupt = false;
    }
    else {
        i++; // Loop increment
    }

    // restart photos cycle from beginning once the last one is reached
    if(i == photos.length) {
        i = 0;
    }

    // bring the next img from the right
    photos[i].classList.add('current');
    dots[i].classList.add('on');
}   
    
//show the first img transition on screen     
timer = setTimeout(photosLoop, 5000);


//Auto-swaping happens after the first img transition occur
carousel.addEventListener("transitionend", function (e) {
            transitioning = false;
            if (e.target.classList.contains("after")) {
                e.target.classList.remove("after");
                timer = setTimeout(photosLoop, 5000);
            }
        });

// detecting once a click occurs on a dot
for(var j=0; j< dots.length; j++) {
    dots[j].addEventListener('click', clickHandler(j));
}

function clickHandler(dotIndex) {
    
    return function() {
        if(transitioning == true || dotIndex == i) {
            console.log('Do Nothing', dotIndex);
        }
        else {
            clearTimeout(timer);
            userInterrupt = true;
            iInterrupt = dotIndex;
            photosLoop();
        }
        
    };
}


