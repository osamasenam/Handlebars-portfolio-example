var headlines = document.getElementById('headlines');
var links = document.getElementsByTagName('a');
var step = 3;
var animId;


// stop the ticker move when the mouse hover 
headlines.addEventListener('mouseenter', function() {
    cancelAnimationFrame(animId);
})

// resume the ticker move once the mouse leaves
headlines.addEventListener('mouseleave', function() {
    headlinesMove();
})

function headlinesMove() {
    var headlinesOffset = headlines.offsetLeft; // the headlines container left offset
    var firstLinkWidth = links[0].offsetWidth; // the width of the first link inside links collection
    // once the first link goes away to the right >> move it to the tail of links collection & adjust this move caused position distortion 
    if(headlinesOffset < -firstLinkWidth) {
        headlines.appendChild(links[0]);
        headlinesOffset += firstLinkWidth;
    }
    headlinesOffset -= step;
    headlines.style.left = headlinesOffset + 'px';
    // requestAnimationFrame must take a callback input to keep doing the movement
    animId = window.requestAnimationFrame(headlinesMove);

}

headlinesMove();