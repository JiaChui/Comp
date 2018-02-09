
zk.$package('comp');

comp.Imageslider = zk.$extends(zul.Widget, {
	
	_selectedIndex: -1,
	_viewportSize: 3,
	_imageWidth: 200,
	
	$define: {
		selectedIndex: function(v) {
			if (this.desktop) {
				this._changeSelected(v);
			}
		},
		
		viewportSize: function(v) {
			if (this.desktop) {
				var imageWidth = this._imageWidth;
				jq(this.$n()).width(v * imageWidth);
				this._shallCheckBtn = true;
			}
		},
		
		imageWidth: function(v) {
			if (this.desktop) {
				this._setView();
				this._shallCheckSliderSize = true;
			}
		}
	},
	
	bind_: function () {
		this.$supers(comp.Imageslider,'bind_', arguments);
		this.domListen_(this.$n('left'), 'onClick', '_requestSlide');
		this.domListen_(this.$n('right'), 'onClick', '_requestSlide');
		zWatch.listen({onCommandReady: this});
		
		this._setView();
		this._checkButton();
	},
	
	unbind_: function() {
		zWatch.unlisten({onCommandReady: this});
		this.domUnlisten_(this.$n('right'), 'onClick', '_requestSlide');
		this.domUnlisten_(this.$n('left'), 'onClick', '_requestSlide');
		this.$supers(comp.Imageslider,'unbind_', arguments);
	},
	
	onCommandReady: function() {
		if(this._shallCheckBtn)
			this._checkButton();
		if(this._shallCheckSliderSize)
			this._checkSliderSize();
	},
	
	
	_setView: function() {
		var imageWidth = this._imageWidth;
		jq(this.$n()).width(this._viewportSize * imageWidth);
		jq(this.$n('slider')).width(imageWidth * this.nChildren);
		jq(this.$n()).find('.' + this.$s('img')).css({
			'width' : jq.px0(imageWidth),
			'box-sizing' : 'border-box'
		});
	},
	
	_checkSliderSize: function() {
		jq(this.$n('slider')).width(this.nChildren * this._imageWidth);
		this._shallCheckSliderSize = false;
	},
	
	_checkButton: function() {
		var showButton = this._viewportSize < this.nChildren;
		jq(this.$n('left')).toggle(showButton);
		jq(this.$n('right')).toggle(showButton);
		this._shallCheckBtn = false;
	},
	
	_requestSlide: function(e) {
		 this._slide(e.domTarget == this.$n('right') ? -1 : 1, 1);
	},
	
	_slide: function(direction, speed) {
		if (!this._moving) {
			var container = this.$n('container'),
				scroll = container.scrollLeft,
				canMoveRight = direction > 0 && scroll < this._imageWidth * (this.nChildren - 1),
				canMoveLeft = direction < 0 && scroll > 0,
				wgt = this;
			
			direction *= (this._imageWidth * speed / 10);
			
			if (canMoveRight || canMoveLeft) {
				var count = 0;
				wgt._moving = setInterval(function () {
					if (count == 10) {
						count = 0;
						clearInterval(wgt._moving);
						wgt._moving = null;
					} else {
						count++;
						container.scrollLeft += direction;
					}
				}, 100);
			}
		}
	},
	
	_changeSelected: function(index) {
		if (index == -1)
			return;
		
		jq(this.$n()).find('.' + this.$s('border')).removeClass(this.$s('border'));
		jq(this.getChildAt(index).$n()).parent().addClass(this.$s('border'));
		
		var scrollPosition = this.$n('container').scrollLeft / this._imageWidth;
		
		if (index < scrollPosition)
			this._slide(-1, scrollPosition - index);
		else if	(index > scrollPosition + this._viewportSize - 1)
			this._slide(1, index - (scrollPosition + this._viewportSize - 1));
	},
	
	removeChildHTML_: function(child) {
		var cloth = jq(child.$n()).parent(),
			childIdx = child.getChildIndex();
		
		this.$supers('removeChildHTML_', arguments);
		cloth.remove();
		
		this._shallCheckBtn = true;
		this._shallCheckSliderSize = true;
	},
	
	insertChildHTML_: function (child, before, desktop) {
		var out = [];
		this.encloseChildHTML_(child, out);
		
		before ? jq(before.$n()).parent().before(out.join('')) : jq(this.$n('slider')).append(out.join(''))
				
		child.bind(desktop);
		jq(child.$n()).parent().width(this._imageWidth);
		
		this._shallCheckBtn = true;
		this._shallCheckSliderSize = true;
	},
	
	encloseChildHTML_: function(child, out) {
		out.push('<div class="', this.$s('img'), '">');
		child.redraw(out);
		out.push('</div>');
	},
	
	doSelect_: function(e) {
		var domTarget = e.domTarget;
		
		if (domTarget != this.$n('right') && domTarget != this.$n('left')) {
			this._changeSelected(e.target.getChildIndex());
			this.fire('onSelect', {'reference' : e.target, 'items' : [e.target]});
		}
	}
});
