package org.exam.comp;

import org.zkoss.zk.au.AuRequest;
import org.zkoss.zk.ui.Component;
import org.zkoss.zk.ui.UiException;
import org.zkoss.zk.ui.event.Events;
import org.zkoss.zk.ui.event.SelectEvent;
import org.zkoss.zul.Image;
import org.zkoss.zul.impl.XulElement;

public class Imageslider extends XulElement {
	private static final long serialVersionUID = 1L;

	private int _selectedIndex = -1;
	private int _viewportSize = 3;
	private int _imageWidth = 200;

	static {
		addClientEvent(Imageslider.class, Events.ON_SELECT, CE_IMPORTANT);
	}

	public Image getSelectedItem() {
		return _selectedIndex == -1 ? null : (Image) this.getChildren().get(_selectedIndex);
	}

	public void setSelectedItem(Image img) {
		if (img == null)
			throw new UiException("Image can not be null");
		if (this.getChildren().contains(img)) {
			setSelectedIndex(this.getChildren().indexOf(img));
		} else {
			throw new UiException("Imageslider didn't contain this Image: " + img);
		}
	}

	public int getSelectedIndex() {
		return _selectedIndex;
	}

	public void setSelectedIndex(int index) {
		if (index < 0)
			index = -1;
		if (index > this.getChildren().size() - 1)
			throw new UiException("Index out of range: " + index);
		if (this._selectedIndex != index) {
			this._selectedIndex = index;
			smartUpdate("selectedIndex", _selectedIndex);
		}
	}

	public int getViewportSize() {
		return _viewportSize;
	}

	public void setViewportSize(int size) {
		if (size <= 0)
			throw new UiException("ViewportSize can not be lower than 0: " + size);
		if (this._viewportSize != size) {
			this._viewportSize = size;
			smartUpdate("viewportSize", _viewportSize);
		}
	}

	public int getImageWidth() {
		return _imageWidth;
	}

	public void setImageWidth(int width) {
		if (width <= 0)
			throw new UiException("ImageWidth can not be lower than 0: " + width);
		if (this._imageWidth != width) {
			this._imageWidth = width;
			smartUpdate("imageWidth", _imageWidth);
		}
	}

	@Override
	public void beforeChildAdded(Component child, Component insertBefore) {
		if (!(child instanceof Image))
			throw new UiException("Unsupported child for Imageslider: " + child);
		super.beforeChildAdded(child, insertBefore);
	}

	@Override
	public void onChildAdded(Component child) {
		if (this.getChildren().indexOf(child) <= this._selectedIndex)
			setSelectedIndex(++this._selectedIndex);
		super.onChildAdded(child);
	}

	@Override
	public void onChildRemoved(Component child) {
		int childIdx = getChildren().indexOf(child);
		if (this._selectedIndex == childIdx)
			setSelectedIndex(-1);
		else if (this._selectedIndex > childIdx)
			setSelectedIndex(--this._selectedIndex);
		super.onChildRemoved(child);
	}

	protected void renderProperties(org.zkoss.zk.ui.sys.ContentRenderer renderer) throws java.io.IOException {
		super.renderProperties(renderer);
		if (_selectedIndex != -1)
			render(renderer, "selectedIndex", _selectedIndex);
		if (_viewportSize != 3)
			render(renderer, "viewportSize", _viewportSize);
		if (_imageWidth != 200)
			render(renderer, "imageWidth", _imageWidth);
	}

	public void service(AuRequest request, boolean everError) {
		final String cmd = request.getCommand();

		if (cmd.equals(Events.ON_SELECT)) {
			SelectEvent<Image, Object> event = SelectEvent.getSelectEvent(request);
			this._selectedIndex = this.getChildren().indexOf(event.getReference());
			Events.postEvent(event);
		} else
			super.service(request, everError);
	}

	public String getZclass() {
		return (this._zclass != null ? this._zclass : "z-imageslider");
	}
}
