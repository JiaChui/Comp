<%--
	Here you could do any styling job you want , all CSS stuff.
--%>
<%@ taglib uri="http://www.zkoss.org/dsp/web/core" prefix="c" %>

.z-imageslider {
    text-align: center;
	margin: 50px auto;
	position: relative;
	display: block;
}

.z-imageslider-left {
	width: 40px;
	height: 40px;
	background-image: url(${c:encodeURL('/img/40_40_left_wb.PNG')});
	position: absolute;
	bottom: 50%;
	left: -60px;
	transform: translateY(50%);
}

.z-imageslider-right {
	width: 40px;
	height: 40px;
	background-image: url(${c:encodeURL('/img/40_40_right_wb.PNG')});
	position: absolute;
	bottom: 50%;
	right: -60px;
	transform: translateY(50%);
}

.z-imageslider-container {
	text-align: left;
	overflow: hidden;
	display: inline-block;
	height: 100%;
	width: 100%;
}

.z-imageslider-slider {
	text-align: left;
	display: inline-block;
}

.z-imageslider-img {
	text-align: left;
	display: inline-block;
}

.z-imageslider-border {
	box-sizing: border-box;
	border: 3px solid red;
}

.z-imageslider .z-image {
	width: 100%;
}


