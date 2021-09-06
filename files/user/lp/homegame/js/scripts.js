/* -----------------------------------------------
Table of Contents (common js)
--------------------------------------------------
1. userAgent判別
2. URL判別
3. 設定
4. JSファイル読み込み時即実行(Execute JavaScript when the page loaded.)
5. DOM構築後実行(Execute JavaScript when the DOM is fully loaded.)
6. 画像など含めてページ読込み完了後に実行(Execute JavaScript when the Window Object is fully loaded.)
7. 動的コンテンツに対してイベントを設定
8. その他のイベントを設定
9. 関数(プラグイン)複数

// require jQuery JavaScript Library v3.4.1
*/

/* ============================================================
 * defineFoundationVariable
 * ============================================================ */

/* ------------------------------------------------------------
 * [ userAgent ] http://www.useragentstring.com/pages/useragentstring.php
 * ------------------------------------------------------------ */
var ua                   = window.navigator.userAgent;
var appVer               = window.navigator.appVersion;

//PC
var isIE                 = ua.indexOf('MSIE') != -1 || ua.indexOf('Trident') != -1;
var isIE6                = isIE && appVer.indexOf('MSIE 6') != -1;
var isIE7                = isIE && appVer.indexOf('MSIE 7.') != -1;
var isIE8                = isIE && ua.indexOf('Trident/4.') != -1;
var isIE9                = isIE && ua.indexOf('Trident/5.') != -1;
var isIE10               = isIE && ua.indexOf('Trident/6.') != -1;
var isIE11               = ua.indexOf('Trident/7.') != -1;

var isFirefox            = ua.indexOf('Firefox') != -1;
var isChrome             = ua.indexOf('Chrome') != -1;
var isSafari             = navigator.vendor && navigator.vendor.indexOf('Apple') > -1 &&
						   navigator.userAgent &&
						   navigator.userAgent.indexOf('CriOS') == -1 &&
						   navigator.userAgent.indexOf('FxiOS') == -1;

//Mobile (smartphone + tablet)
var isMobileSafari       = ua.match(/iPhone|iPad|iPod/i) ? true : false;
var isMobileSafariTypeT  = ua.match(/ipad/i) ? true : false;
var isMobileSafariTypeS  = ua.match(/iphone|ipod/i) ? true : false;
var isAndroid            = ua.indexOf('Android') != -1;
var isMobileAndroidTypeT = isAndroid && ua.indexOf('Mobile') == -1;
var isMobileAndroidTypeS = isAndroid && ua.indexOf('Mobile') != -1;
var isAndroidChrome      = isChrome && isAndroid;
var isAndroidFirefox     = isFirefox && isAndroid;
var isMobileFirefox      = isFirefox && ua.indexOf('Mobile') != -1;
var isTabletFirefox      = isFirefox && ua.indexOf('Tablet') != -1;

//PC or Mobile
var isTablet             = isMobileSafariTypeT || isMobileAndroidTypeT || isTabletFirefox;
var isSmartPhone         = isMobileSafariTypeS || isMobileAndroidTypeS || isMobileFirefox;
var isMobile             = isTablet || isSmartPhone || isAndroidChrome || isAndroidFirefox;
var isPC                 = !isMobile;



/* ------------------------------------------------------------
 * [ Location ]
 * ------------------------------------------------------------ */
var  locationHref     = window.location.href,     // http://www.google.com:80/search?q=demo#test
	 locationProtocol = window.location.protocol, // http:
	 locationHostname = window.location.hostname, // www.google.com
	 locationHost     = window.location.host,     // www.google.com:80
	 locationPort     = window.location.port,     // 80
	 locationPath     = window.location.pathname, // /search
	 locationSearch   = window.location.search,   // ?q=demo
	 locationHash     = window.location.hash;     // #test

/* ------------------------------------------------------------
 * [ motionConfig ]
 * ------------------------------------------------------------ */
var animateInterval = 500;
var commonScript;
$j341 = jQuery.noConflict();


/* ------------------------------------------------------------
 * [ ie11 array.from() polyfill ]
 * ------------------------------------------------------------ */
if (!Array.from) {
	Array.from = (function () {
		var toStr = Object.prototype.toString;
		var isCallable = function (fn) {
			return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
		};
		var toInteger = function (value) {
			var number = Number(value);
			if (isNaN(number)) { return 0; }
			if (number === 0 || !isFinite(number)) { return number; }
			return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
		};
		var maxSafeInteger = Math.pow(2, 53) - 1;
		var toLength = function (value) {
			var len = toInteger(value);
			return Math.min(Math.max(len, 0), maxSafeInteger);
		};

		return function from(arrayLike) {
			var C = this;

			var items = Object(arrayLike);

			if (arrayLike == null) {
				throw new TypeError('Array.from requires an array-like object - not null or undefined');
			}

			var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
			var T;
			if (typeof mapFn !== 'undefined') {
				if (!isCallable(mapFn)) {
					throw new TypeError('Array.from: when provided, the second argument must be a function');
				}

				if (arguments.length > 2) {
					T = arguments[2];
				}
			}

			var len = toLength(items.length);

			var A = isCallable(C) ? Object(new C(len)) : new Array(len);

			var k = 0;
			var kValue;
			while (k < len) {
				kValue = items[k];
				if (mapFn) {
					A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
				} else {
					A[k] = kValue;
				}
				k += 1;
			}
			A.length = len;
			return A;
		};
	}());
}

/* ============================================================
 * Execute JavaScript when the DOM is fully loaded.
 * ============================================================ */
$j341(document).ready(function($) {
	commonScript = function(){
		$j341('.js-pagetop').click(function(){$j341('html, body').animate({scrollTop: 0}, 1000);return false;});

		$j341('.js-anchor').click(function(){$j341('html, body').animate({scrollTop: $($j341(this).attr("href")).offset().top}, 1000);return false;});

		$j341('.js_fullbg').jsFullBackground();

		$j341('.js_sticky_bottom').stickyBottom();

		$j341('.box-point--01 .js-slide-point-main').slick({
			speed: 1000,
			dots: true,
			infinite: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			autoplay: true,
			autoplaySpeed: 5000,
			arrows: true,
			asNavFor: '.box-point--01 .js-slide-point-thumb',
			responsive: [
				{
					breakpoint: 768,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
						centerMode: true,
						centerPadding: '28px',
						autoplay: true,
						autoplaySpeed: 5000,
						arrows: true,
						dots: true,
						speed: 1000
					}
				}
			]
		});
		$j341('.box-point--01 .js-slide-point-thumb').slick({
			speed: 1000,
			dots: false,
			infinite: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: false,
			variableWidth: true,
			autoplay: false,
			asNavFor: '.box-point--01 .js-slide-point-main'
		});
		$j341('.box-point--03 .js-slide-point-main').slick({
			speed: 1000,
			dots: true,
			infinite: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			autoplay: true,
			autoplaySpeed: 5000,
			arrows: true,
			asNavFor: '.box-point--03 .js-slide-point-thumb',
			responsive: [
				{
					breakpoint: 768,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
						centerMode: true,
						centerPadding: '28px',
						autoplay: true,
						autoplaySpeed: 5000,
						arrows: true,
						dots: true,
						speed: 1000
					}
				}
			]
		});
		$j341('.box-point--03 .js-slide-point-thumb').slick({
			speed: 1000,
			dots: false,
			infinite: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: false,
			variableWidth: true,
			autoplay: false,
			asNavFor: '.box-point--03 .js-slide-point-main'
		});
		$j341('.box-point--05 .js-slide-point-main').slick({
			speed: 1000,
			dots: true,
			infinite: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			autoplay: true,
			autoplaySpeed: 5000,
			arrows: true,
			asNavFor: '.box-point--05 .js-slide-point-thumb',
			responsive: [
				{
					breakpoint: 768,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
						centerMode: true,
						centerPadding: '28px',
						autoplay: true,
						autoplaySpeed: 5000,
						arrows: true,
						dots: true,
						speed: 1000
					}
				}
			]
		});
		$j341('.box-point--05 .js-slide-point-thumb').slick({
			speed: 1000,
			dots: false,
			infinite: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: false,
			variableWidth: true,
			autoplay: false,
			asNavFor: '.box-point--05 .js-slide-point-main'
		});
		$j341('.js-slide-point-main-rt').slick({
			speed: 1000,
			dots: true,
			infinite: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			autoplay: true,
			autoplaySpeed: 5000,
			arrows: true,
			rtl: true,
			asNavFor: '.js-slide-point-thumb-rt',
			responsive: [
				{
					breakpoint: 768,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
						centerMode: true,
						centerPadding: '28px',
						autoplay: true,
						autoplaySpeed: 5000,
						arrows: true,
						dots: true,
						rtl: true,
						speed: 1000
					}
				}
			]
		});
		$j341('.js-slide-point-thumb-rt').slick({
			speed: 1000,
			dots: false,
			infinite: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: false,
			variableWidth: true,
			autoplay: false,
			rtl: true,
			asNavFor: '.js-slide-point-main-rt'
		});
		$j341('.js-slide-player-main').slick({
			speed: 1000,
			dots: true,
			infinite: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			autoplay: true,
			autoplaySpeed: 5000,
			arrows: true,
			rtl: true,
			asNavFor: '.js-slide-player-thumb, .js-slide-player',
			responsive: [
				{
					breakpoint: 768,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
						centerMode: true,
						centerPadding: '28px',
						autoplay: true,
						autoplaySpeed: 5000,
						arrows: true,
						dots: true,
						speed: 1000,
						rtl: true,
						asNavFor: '.js-slide-player'
					}
				}
			]
		});
		$j341('.js-slide-player').slick({
			speed: 1000,
			dots: false,
			infinite: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: false,
			fade: true,
			autoplay: false,
			asNavFor: '.js-slide-player-main, .js-slide-player-thumb'
		});
		$j341('.js-slide-player-thumb').slick({
			speed: 1000,
			dots: false,
			infinite: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: false,
			variableWidth: true,
			autoplay: false,
			rtl: true,
			asNavFor: '.js-slide-player-main, .js-slide-player'
		});
		$j341('.js-slide-player-main-lt').slick({
			speed: 1000,
			dots: true,
			infinite: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			autoplay: true,
			autoplaySpeed: 5000,
			arrows: true,
			asNavFor: '.js-slide-player-thumb-lt, .js-slide-player-lt',
			responsive: [
				{
					breakpoint: 768,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
						centerMode: true,
						centerPadding: '28px',
						autoplay: true,
						autoplaySpeed: 5000,
						arrows: true,
						dots: true,
						speed: 1000,
						asNavFor: '.js-slide-player-lt'
					}
				}
			]
		});
		$j341('.js-slide-player-lt').slick({
			speed: 1000,
			dots: false,
			infinite: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: false,
			fade: true,
			autoplay: false,
			asNavFor: '.js-slide-player-main-lt, .js-slide-player-thumb-lt'
		});
		$j341('.js-slide-player-thumb-lt').slick({
			speed: 1000,
			dots: false,
			infinite: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: false,
			variableWidth: true,
			autoplay: false,
			asNavFor: '.js-slide-player-main-lt, .js-slide-player-lt'
		});
	}

	commonScript();

	cloneItem();
	rellaxBg();

	mvSlide();

});//End -> ready method

// ブロックごとにJSでIDを付与する

function mvSlide(){
	// Main visual
	var $slideMv = $j341('.js-slide-main');
	var elDataDelay = Array.from(document.querySelectorAll("[data-delay]"));
	var ImagePauses = [];
	for (var index = 0; index < elDataDelay.length; index++){
		ImagePauses.push(elDataDelay[index].getAttribute("data-delay"));
	}
	$slideMv.each(function(index){
		var $this = $j341(this);
		setTimeout(function() {
			$this.slick({
				speed: 1000,
				dots: false,
				infinite: true,
				slidesToShow: 1,
				slidesToScroll: 1,
				adaptiveHeight: true,
				autoplay: true,
				arrows: false,
				draggable: false,
				touchMove: false,
				swipeToSlide: false,
				focusOnSelect: false,
				pauseOnHover:false
			});
		}, ImagePauses[index]);
	});
}

function cloneItem(){
	if($j341('.js-clone').get(0)){
		$j341('.js-clone-item').each(function(){
			var $el = $j341(this),
				$elParent = $j341(this).closest('.js-clone'),
				dataIndex = $j341(this).parent().data('clone-index');
				$elClone = $el.clone(true,true);
			if(viewport().width > 767){
				$elParent.find('[data-clone-index="' + dataIndex + '"][data-clone-mode="PC"]').append($elClone);
				$el.remove();
			} else{
				$elParent.find('[data-clone-index="' + dataIndex + '"][data-clone-mode="SP"]').append($elClone);
				$el.remove();
			}
		});
	}
}

$j341(window).on('load', function() {
	animateElement();
	animateElementLr();
});


function viewport(){
	var e = window, a = 'inner';
	if ( !( 'innerWidth' in window ) ){
		a = 'client';
		e = document.documentElement || document.body;
	}
	return { width : e[ a+'Width' ] , height : e[ a+'Height' ] }
}

function rellaxBg() {
	var rellax = new Rellax('.bg-back', {
		speed: -2,
		center: true,
		wrapper: null,
		round: true,
		vertical: true,
		horizontal: false,
		breakpoints: [576, 768, 1201]
	});
	var rellax = new Rellax('.bg-front', {
		speed: -2,
		center: true,
		wrapper: null,
		round: true,
		vertical: true,
		horizontal: false,
		breakpoints: [576, 768, 1201]
	});
}

function animateElement(){
	$j341('.js-fade').each(function(){
		var elemPos = $j341(this).offset().top,
			scroll = $j341(window).scrollTop(),
			windowHeight = $j341(window).height() + scroll;

		if(windowHeight > elemPos) {
			$j341(this).addClass('animated');
		}
	});

	$j341(window).scroll(function () {
		$j341('.js-fade').each(function(){
			var elemPos = $j341(this).offset().top,
				scroll = $j341(window).scrollTop(),
				windowHeight = $j341(window).height();

			if(scroll > elemPos - windowHeight + 300) {
				$j341(this).addClass('animated');
			}
		});
	});
}
function animateElementLr(){
	$j341('.js-fade-lr').each(function(){
		var elemPos = $j341(this).offset().top,
			scroll = $j341(window).scrollTop(),
			windowHeight = $j341(window).height() + scroll;

		if(windowHeight > elemPos) {
			$j341(this).addClass('animated');
		} else {
			$j341(this).removeClass('animated');
		}
	});

	$j341(window).scroll(function () {
		$j341('.js-fade-lr').each(function(){
			var elemPos = $j341(this).offset().top,
				scroll = $j341(window).scrollTop(),
				windowHeight = $j341(window).height();

			if(scroll > elemPos - windowHeight + 300) {
				$j341(this).addClass('animated');
			} else {
				$j341(this).removeClass('animated');
			}
		});
	});
}

// resize
var timer = false;
$j341(window).resize(function() {
	if (timer !== false) {
		clearTimeout(timer);
	}
	timer = setTimeout(function() {
		$j341('.js_fullbg').jsFullBackground();
		cloneItem();
	}, 200);
});
/* ============================================================
 * Plugin
 * ============================================================ */

$j341.fn.stickyBottom = function(config){
	var defaults = {
	};
	var config = $j341.extend({}, defaults, config);
	return this.each(function() {
		var $this = $j341(this);
		var $container = $j341('#l-container');
		if(!$this.data('inited')){
			$this.data('inited', true);
			var $clone = $this.clone().addClass("clone");
			$clone.css({
				position: 'fixed',
				width: '100%',
				bottom: 0,
				left: 0,
				zIndex: 99
			})
			$container.after($clone);
			$j341('.clone').find('.footer__schedule').addClass('is-sticky');
			$j341(window).scroll(function(){
				var $thisOffset = $this.offset().top;
				var $topOffset = $j341(window).scrollTop() + $j341(window).height();
				if($topOffset > $thisOffset) {
					$clone.addClass('is-hide')
				}else {
					$clone.removeClass('is-hide')
				}
			});
		}
	});
}

$j341.fn.jsFullBackground = function(config){
	var defaults = {
		position : 'center center',
		bgsize: 'cover',
		repeat: 'no-repeat'
	};
	var config = $j341.extend({}, defaults, config);
	return this.each(function() {
		var $this = $j341(this);
		var $img = $this.children('img').first();
		if ($img.length){
			var src = $img.attr('src');
			var position = config.position;
			var bgsize = config.bgsize;
			var repeat = config.repeat;
			if ($this.data('position')) {
				position = $this.data('position');
			}
			if ($this.data('bgsize')) {
				bgsize = $this.data('bgsize');
			}
			if ($this.data('repeat')) {
				repeat = $this.data('repeat');
			}
			$this.css({
				backgroundSize: bgsize,
				backgroundImage: 'url(' + src + ')',
				backgroundRepeat: repeat,
				backgroundPosition: position
			});
			$img.hide();
		}
	});
}

/* ------------------------------------------------------------
 * [ jQuery Easing v1.3 ] http://gsgd.co.uk/sandbox/jQuery/easing/
 * ------------------------------------------------------------
 * Open source under the BSD License.
 *
 * Copyright 2008 George McGinley Smith
 * All rights reserved.
 * ------------------------------------------------------------ */
$j341.easing['jswing']=$j341.easing['swing'];$j341.extend($j341.easing,{def:'easeOutQuad',swing:function(x,t,b,c,d){return $j341.easing[$j341.easing.def](x,t,b,c,d)},easeInQuad:function(x,t,b,c,d){return c*(t/=d)*t+b},easeOutQuad:function(x,t,b,c,d){return-c*(t/=d)*(t-2)+b},easeInOutQuad:function(x,t,b,c,d){if ((t/=d/2)<1)return c/2*t*t+b;return-c/2*((--t)*(t-2)-1)+b},easeInCubic:function(x,t,b,c,d){return c*(t/=d)*t*t+b},easeOutCubic:function(x,t,b,c,d){return c*((t=t/d-1)*t*t+1)+b},easeInOutCubic:function(x,t,b,c,d){if ((t/=d/2)<1)return c/2*t*t*t+b;return c/2*((t-=2)*t*t+2)+b},easeInQuart:function(x,t,b,c,d){return c*(t/=d)*t*t*t+b},easeOutQuart:function(x,t,b,c,d){return-c*((t=t/d-1)*t*t*t-1)+b},easeInOutQuart:function(x,t,b,c,d){if ((t/=d/2)<1)return c/2*t*t*t*t+b;return-c/2*((t-=2)*t*t*t-2)+b},easeInQuint:function(x,t,b,c,d){return c*(t/=d)*t*t*t*t+b},easeOutQuint:function(x,t,b,c,d){return c*((t=t/d-1)*t*t*t*t+1)+b},easeInOutQuint:function(x,t,b,c,d){if ((t/=d/2)<1)return c/2*t*t*t*t*t+b;return c/2*((t-=2)*t*t*t*t+2)+b},easeInSine:function(x,t,b,c,d){return-c*Math.cos(t/d*(Math.PI/2))+c+b},easeOutSine:function(x,t,b,c,d){return c*Math.sin(t/d*(Math.PI/2))+b},easeInOutSine:function(x,t,b,c,d){return-c/2*(Math.cos(Math.PI*t/d)-1)+b},easeInExpo:function(x,t,b,c,d){return(t==0)?b:c*Math.pow(2,10*(t/d-1))+b},easeOutExpo:function(x,t,b,c,d){return(t==d)?b+c:c*(-Math.pow(2,-10*t/d)+1)+b},easeInOutExpo:function(x,t,b,c,d){if (t==0)return b;if (t==d)return b+c;if ((t/=d/2)<1)return c/2*Math.pow(2,10*(t-1))+b;return c/2*(-Math.pow(2,-10*--t)+2)+b},easeInCirc:function(x,t,b,c,d){return-c*(Math.sqrt(1-(t/=d)*t)-1)+b},easeOutCirc:function(x,t,b,c,d){return c*Math.sqrt(1-(t=t/d-1)*t)+b},easeInOutCirc:function(x,t,b,c,d){if ((t/=d/2)<1)return-c/2*(Math.sqrt(1-t*t)-1)+b;return c/2*(Math.sqrt(1-(t-=2)*t)+1)+b},easeInElastic:function(x,t,b,c,d){var s=1.70158;var p=0;var a=c;if (t==0)return b;if ((t/=d)==1)return b+c;if (!p)p=d*.3;if (a<Math.abs(c)){a=c;var s=p/4}else var s=p/(2*Math.PI)*Math.asin(c/a);return-(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b},easeOutElastic:function(x,t,b,c,d){var s=1.70158;var p=0;var a=c;if (t==0)return b;if ((t/=d)==1)return b+c;if (!p)p=d*.3;if (a<Math.abs(c)){a=c;var s=p/4}else var s=p/(2*Math.PI)*Math.asin(c/a);return a*Math.pow(2,-10*t)*Math.sin((t*d-s)*(2*Math.PI)/p)+c+b},easeInOutElastic:function(x,t,b,c,d){var s=1.70158;var p=0;var a=c;if (t==0)return b;if ((t/=d/2)==2)return b+c;if (!p)p=d*(.3*1.5);if (a<Math.abs(c)){a=c;var s=p/4}else var s=p/(2*Math.PI)*Math.asin(c/a);if (t<1)return-.5*(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b;return a*Math.pow(2,-10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p)*.5+c+b},easeInBack:function(x,t,b,c,d,s){if (s==undefined)s=1.70158;return c*(t/=d)*t*((s+1)*t-s)+b},easeOutBack:function(x,t,b,c,d,s){if (s==undefined)s=1.70158;return c*((t=t/d-1)*t*((s+1)*t+s)+1)+b},easeInOutBack:function(x,t,b,c,d,s){if (s==undefined)s=1.70158;if ((t/=d/2)<1)return c/2*(t*t*(((s*=(1.525))+1)*t-s))+b;return c/2*((t-=2)*t*(((s*=(1.525))+1)*t+s)+2)+b},easeInBounce:function(x,t,b,c,d){return c-$j341.easing.easeOutBounce(x,d-t,0,c,d)+b},easeOutBounce:function(x,t,b,c,d){if ((t/=d)<(1/2.75)){return c*(7.5625*t*t)+b}else if (t<(2/2.75)){return c*(7.5625*(t-=(1.5/2.75))*t+.75)+b}else if (t<(2.5/2.75)){return c*(7.5625*(t-=(2.25/2.75))*t+.9375)+b}else{return c*(7.5625*(t-=(2.625/2.75))*t+.984375)+b}},easeInOutBounce:function(x,t,b,c,d){if (t<d/2)return $j341.easing.easeInBounce(x,t*2,0,c,d)*.5+b;return $j341.easing.easeOutBounce(x,t*2-d,0,c,d)*.5+c*.5+b}});
