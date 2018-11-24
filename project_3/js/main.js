(() => {

	/* colors 
	orange = #F8AD43
	red =  #F8876E
	green = #73C996

	meter bcg #c6d7df

	*/

	const coin = document.querySelector('#Coin');
	const petr = document.querySelector('#Petr');
	const mainBulb = document.querySelector('#MainBulb');
	const liquids = document.querySelectorAll('.liquid');
	const liquid01 = document.querySelector('#Liquid1');
	const liquid02 = document.querySelector('#Liquid2');
	const liquid03 = document.querySelector('#Liquid3');
	const liquid04 = document.querySelector('#Liquid4');
	const liquid05 = document.querySelector('#Liquid5');
	const liquid06 = document.querySelector('#Liquid6');
	const liquid07 = document.querySelector('#Liquid7');
	const liquid08 = document.querySelector('#Liquid8');
	const liquid09 = document.querySelector('#Liquid9');
	const liquidInsideMask01 = document.querySelector('#LiquidInside1Mask');
	const liquidInsideMask02 = document.querySelector('#LiquidInside2Mask');
	const liquidInsideMask03 = document.querySelector('#LiquidInside3Mask');
	const liquidInsideMask04 = document.querySelector('#LiquidInside4Mask');
	const liquidInsideMask05 = document.querySelector('#LiquidInside5Mask');
	const liquidInsideMask06 = document.querySelector('#LiquidInside6Mask');
	const liquidInsideMask07 = document.querySelector('#LiquidInside7Mask');
	const bulb1 = document.querySelector('#Bulb1 .bulb');
	const bulb2 = document.querySelector('#Bulb2 .bulb');
	const bulb3 = document.querySelector('#Bulb3 .bulb');
	const meterBcg = document.querySelector('#meterBcg');
	const meterStroke = document.querySelector('#meterStroke');
	const part2light = document.querySelector('#Part2 .light')
	const part2lightLeft = document.querySelector('#Part2 .light-left')
	const part2lightMid = document.querySelector('#Part2 .light-mid')
	const part2lightRight = document.querySelector('#Part2 .light-right')
	const printerLightsTop = document.querySelector('#PrinterLIghtTop, #PrinterLIghtTop_2_');
	const printerLightsBottom = document.querySelector('#PrinterLIghtBottom, #PrinterLIghtBottom_2_');
	const mainLight = document.querySelector('#MainLight');
	const paper = document.querySelector('#Paper');
	const slider = document.querySelector('#slider');
	const mainTl = new TimelineMax();

	const clearStage = () => {
		const clearTl = new TimelineMax();
		clearTl
			.set(coin, {
				scale: 0.5,
				transformOrigin: 'center center',
				x: -90,
				y: 120
			})
			.set(mainBulb, { fill: '#ffffff' })
			.set(liquids, { stroke: '#ffffff' })
			.set(petr, { autoAlpha: 1, scale: 2.5, x: '1400%', transformOrigin: 'bottom center' })
			.set(liquidInsideMask01, { attr: { y: 492 } })  /* y values = y + height*/
			.set(liquidInsideMask02, { attr: { y: 494 } })
			.set(liquidInsideMask03, { attr: { y: 491 } })
			.set(liquidInsideMask04, { attr: { y: 656 } })
			.set(liquidInsideMask05, { attr: { y: 654 } })
			.set(liquidInsideMask06, { attr: { y: 651 } })
			.set(liquidInsideMask07, { attr: { y: 651 } })
			.set(paper, { y: '+=55'})

		return clearTl;
	};

	const init = () => {
		mainTl.add(clearStage());
	};

	init();
})();