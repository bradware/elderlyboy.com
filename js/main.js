// Constants
const WINDOW_LOCATION = window.location;
const REDIRECT_MATCH = 'tudios.elderlyboy.com';
const REDIRECT_URL = 'https://www.youtube.com/@elderlyboy';

const HTML = 'html';
const BODY = 'body';
const FAVICON = '#favicon';
const LOADING = '#loading';
const CONTENT = '#content';
const PX = 'px';
const ICON = 'I';

const COLOR = 'color';
const BACKGROUND_COLOR = 'background-color';
const LIGHT = '#33CCCC';
const DARK = '#E75556';
const MARGIN_TOP = 'marginTop';
const HREF = 'href';
const FAVICON_DARK = 'assets/favicon_dark.png';
const FAVICON_LIGHT = 'assets/favicon_light.png';

const ONE_SECOND = 1000;
const LOADING_OFFSET = ONE_SECOND * 2;
const HEIGHT_OFFSET = 0.75;

let IS_DARK_MODE = true;
let START_TIME = $.now();

// studios.elderlyboy.com redirect to the ebs youtube channel
if (WINDOW_LOCATION.href.indexOf(REDIRECT_MATCH) > -1) {
	console.log('it worked!');
	// WINDOW_LOCATION.replace(REDIRECT_URL);
}

$(document).ready(function() {
	const loading = $(LOADING);
	const content = $(CONTENT);
	const body = $(BODY);
	const html = $(HTML);
	const favicon = $(FAVICON);

	loading.delay(ONE_SECOND).fadeOut(ONE_SECOND);
	content.delay(LOADING_OFFSET).fadeIn(ONE_SECOND);

	body.css(MARGIN_TOP, -(body.height() * HEIGHT_OFFSET) + PX);
	html.click(function(event) {
		// Ignore if clicking on an icon (external link) or the content hasn't loaded yet
		if (isTargetEligible(event.target) && isTimeEligible()) {
			toggleColorScheme(body, favicon);
		}
	});
});

function isTargetEligible(target) {
	return target.tagName !== ICON;
}

function isTimeEligible() {
	return $.now() - START_TIME > LOADING_OFFSET;
}

function toggleColorScheme(domElement, favicon) {
	IS_DARK_MODE = !IS_DARK_MODE;

	if (IS_DARK_MODE) {
		domElement.css(COLOR, LIGHT);
		domElement.css(BACKGROUND_COLOR, DARK);
		favicon.attr(HREF, FAVICON_DARK);
	} else {
		domElement.css(COLOR, DARK);
		domElement.css(BACKGROUND_COLOR, LIGHT);
		favicon.attr(HREF, FAVICON_LIGHT);
	}
}