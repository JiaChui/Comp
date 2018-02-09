package test.ctrl;

import java.util.List;

import org.exam.comp.Imageslider;
import org.zkoss.zk.ui.Component;
import org.zkoss.zk.ui.event.Event;
import org.zkoss.zk.ui.event.ForwardEvent;
import org.zkoss.zk.ui.select.SelectorComposer;
import org.zkoss.zk.ui.select.annotation.Wire;
import org.zkoss.zul.Image;

public class DemoWindowComposer extends SelectorComposer {

	@Wire
	private Imageslider myComp;

	public void doAfterCompose(Component comp) throws Exception {
		super.doAfterCompose(comp);
	}

	// @Listen("onFoo = #myComp")
	public void onFoo$myComp(ForwardEvent event) {
		Event mouseEvent = (Event) event.getOrigin();
		alert("You listen onFoo: " + mouseEvent.getTarget());
	}
}