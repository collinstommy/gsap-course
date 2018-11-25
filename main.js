(function($) {

	/* 
		Colors before reset
		orange - #F8AD43
		red - #F8876E
		green - #73C996
	
		Meter bcg - #c6d7df to #5AB783
		Meter stroke - #7c99a2 to #448962
	*/

	var $body = $('body'),
		$coin = $('#Coin'),
		$Petr = $('#Petr'),
		$h1 = $('h1'),
		$MainBulb = $('#MainBulb'),
		$Liquids = $('.liquid'),
		$Liquid01 = $('#Liquid1'),
		$Liquid02 = $('#Liquid2'),
		$Liquid03 = $('#Liquid3'),
		$Liquid04 = $('#Liquid4'),
		$Liquid05 = $('#Liquid5'),
		$Liquid06 = $('#Liquid6'),
		$Liquid07 = $('#Liquid7'),
		$Liquid08 = $('#Liquid8'),
		$Liquid09 = $('#Liquid9'),
		$LiquidInsideMask01 = $('#LiquidInside1Mask'),
		$LiquidInsideMask02 = $('#LiquidInside2Mask'),
		$LiquidInsideMask03 = $('#LiquidInside3Mask'),
		$LiquidInsideMask04 = $('#LiquidInside4Mask'),
		$LiquidInsideMask05 = $('#LiquidInside5Mask'),
		$LiquidInsideMask06 = $('#LiquidInside6Mask'),
		$LiquidInsideMask07 = $('#LiquidInside7Mask'),
		$bulb1 = $('#Bulb1 .bulb'),
		$bulb3 = $('#Bulb2 .bulb'),
		$bulb4 = $('#Bulb3 .bulb'),
		$meterBcg = $('#meterBcg'),
		$meterStroke = $('#meterStroke'),
		$part2light = $('#Part2 .light'),
		$part2lightLeft = $('#Part2 .light-left'),
		$part2lightMid = $('#Part2 .light-mid'),
		$part2lightRight = $('#Part2 .light-right'),
		$printerLightsTop = $('#PrinterLIghtTop, #PrinterLIghtTop_2_'),
		$printerLightsBottom = $('#PrinterLIghtBottom, #PrinterLIghtBottom_1_'),
		$mainLight = $('#MainLight'),
		$paper = $('#Paper'),
		$slider = $('#slider'),
		$stage = $('#stage'),
		$MainMask = $('#MainMask'),
		$smile = $('#smile'),
		mainTl = new TimelineMax();

	function clearStage(){
		var clearTl = new TimelineMax();

		clearTl
			.set($coin, {x: -90, y: 120, scale: 0.5, transformOrigin: 'center center'})
			.set($MainBulb, {fill: '#ffffff'})
			.set($Liquids, {stroke: '#ffffff'})
			.set($Petr, {autoAlpha: 1, x: '1400%', scale: 2.5, transformOrigin: 'bottom center'})
			.set($stage, {autoAlpha: 0.5})
			.set($MainMask, {attr: {x: 932}})
			// Clear liquid
			.set($LiquidInsideMask01, {attr: {y: 492}}) /* y value = y + height */
			.set($LiquidInsideMask02, {attr: {y: 494}}) /* 451+43 */
			.set($LiquidInsideMask03, {attr: {y: 491}})
			.set($LiquidInsideMask04, {attr: {y: 656}})
			.set($LiquidInsideMask05, {attr: {y: 654}})
			.set($LiquidInsideMask06, {attr: {y: 651}})
			.set($LiquidInsideMask07, {attr: {y: 651}})
			.set($paper, {y: '+=55'});

		return clearTl;
	}

	function getIntroTl(){
		var introTL = new TimelineMax();

		introTL
			.set($h1, {y: '-=40px'})
			.to($Petr, 0.8, {x: '1000%', ease: Power4.easeInOut})
			.fromTo($h1, 0.5, {x: '-46%', autoAlpha: 0}, {x: '-50%', autoAlpha: 1}, '-=0.4')
			.fromTo($smile, 0.4, {scale: 0.4, transformOrigin: 'center center'}, {scale: 1, ease: Power4.easeInOut}, '+=1.2')
			.add('zoom-out')
			.to($Petr, 1, {x: '0%', scale: 1, ease: Power4.easeInOut}, 'zoom-out+=1')
			.to($h1, 0.5, {autoAlpha: 0}, 'zoom-out+=1')
			.to($MainMask, 1, {attr: {x: 131}, ease: Power4.easeInOut}, 'zoom-out+=1')
			.set($body, {className: '+=is-active'}, 'zoom-out+=1')
			.set($h1, {y: '-=60px', text: 'and this is my GreenSock Lab!'}) // update heading text
			.add('text-in')
			.to($h1, 0.3, {y: '+=20px', autoAlpha: 1, ease: Power4.easeInOut}, 'text-in')
			.to($h1, 0.2, {y: '+=10px', autoAlpha: 0, ease: Power4.easeInOut}, '+=2.5')
			.set($h1, {y: '-=30px', text: "Let's have some fun..."})
			.to($h1, 0.3, {y: '+=20px', autoAlpha: 1, ease: Power4.easeInOut})
			.to($h1, 0.2, {y: '+=10px', autoAlpha: 0, ease: Power4.easeInOut}, '+=2')
			.to($stage, 0.2, {autoAlpha: 1, ease: Power0.none}, '-=0.2');

		introTL.seek('text-in');

		return introTL;
	}

	function init(){

		mainTl
			.add(clearStage())
			.add(getIntroTl(), 'scene-intro');

	}
	init();

})(jQuery);




