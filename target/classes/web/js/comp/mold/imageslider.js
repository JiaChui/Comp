/**
* Here's the mold file , a mold means a HTML struct that the widget really presented.
* yep, we build html in Javascript , that make it more clear and powerful.
*/
function (out) {

	var uuid = this.uuid;
	
	out.push('<div', this.domAttrs_(), '>');
	out.push('<div class="', this.$s('left'), '" id="', uuid, '-left"></div>');
	out.push('<div class="', this.$s('container'), '" id="', uuid, '-container">');
	out.push('<div class="', this.$s('slider'), '" id="', uuid, '-slider">');
	for (var child = this.firstChild; child; child = child.nextSibling)
		this.encloseChildHTML_(child, out);
	out.push('</div></div>');
	out.push('<div class="', this.$s('right'), '" id="', uuid, '-right"></div>');
	out.push('</div>');
	
}