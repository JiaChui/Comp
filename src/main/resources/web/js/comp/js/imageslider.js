var container,
	imgs,
	moving,
	imageWidth,
	selectedIndex,
	viewportSize,
	selectedItem;
	
window.addEventListener('load', init);

function init() {
	container = document.getElementById('container');
	imgs = document.getElementsByClassName('img');
	moving = null;
	imageWidth = parseInt(imgs[0].style.width);
	viewportSize = parseInt(container.style.width);
	
	if(document.getElementById('right'))
		document.getElementById('right').addEventListener('click', requestSlide);
	if(document.getElementById('left'))
		document.getElementById('left').addEventListener('click', requestSlide);
	for(var i = 0; i < imgs.length; i++){
		imgs[i].addEventListener('click', select);
	}
}

function requestSlide() {
	if (!moving) {
		this.id == 'right' ? slide(-1) : slide(1);
	}
}

//function slide(direction) {
//	var scroll = container.scrollLeft;
//	direction *= (imageWidth / 10);
//	if (direction > 0 && scroll < imageWidth * (imgs.length - 1) || direction < 0 && scroll > 0) {
//		var count = 0;
//		moving = setInterval(function () {
//			if (count == 10) {
//				count = 0;
//				clearInterval(moving);
//				moving = null;
//			} else {
//				count++;
//				container.scrollLeft += direction;
//			}
//		}, 100);
//	}
//}

function select(){
	selectedIndex = this.id.substr(3)
}
