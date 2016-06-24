var cApath = Qva.Remote + "?public=only&type=Document&name=Extensions/centerAlign/";
Qva.LoadCSS(cApath + "style.css");
Qva.AddDocumentExtension('centerAlign', function() {
	var _this = this;
	//default width is 1024 to act as a minimum width for your content 
	var elementsUnderGrid;	
	var elementsUnderGridDet;
	var elementsBeyondGrid;	 // one textbox
	
	function centerIt() {
		if(!($("body").hasClass("centerAlign"))) {
			$("body").addClass("centerAlign");
			//wrap a container around the whole document and center it.
			$("body").append('<div class="master" />').find('.master').append($('#PageContainer'));
			$("#MainContainer").css("position", "relative");
			//center the tabs if they exist
			$("head").append("<style>.qvtr-tabs{margin:0 auto !important;}</style>");
			//center the background image if there is one.
			$("body").css("background-position", "center 30px");
		}
		var maxRight = 1024;		
		//loop through all QV alements on the page and determine the maximum right position on the page
		//in order to determine the bounding box of the QV doc.  It needs to be done this way because all of the elements
		//are absolutely positioned
		$(".QvFrame").each(function(){
			var tMR = $(this).position().left + $(this).width();
			if(tMR > maxRight){
				maxRight = tMR;
			}
		});
		$(".centerAlign .master").css("width", maxRight + "px");
		$(".qvtr-tabs").css("width", $(".master").width() + "px");
		
		$(".QvFrame").filter(".Document_TX_HOVER").css("position", "relative").css("zIndex", "100").hide();
		console.log("set2");

		/*
		$(".QvFrame").filter("Document_CH01").hover(function() {
			//$(".QvFrame").filter(".Document_TX_HOVER").show();
			console.log("hover");
		});
		//console.log('Capture for ' + event.type + ' target is ' + event.target.id);
		*/
		selfL=$(".QvFrame").filter(".Document_CH42").css("left");
		selfW=$(".QvFrame").filter(".Document_CH42").css("width");
		
		$(".QvFrame").filter(".Document_CH42").on('mouseout', function (event) {
				event.stopPropagation();
				$(".QvFrame").filter(".Document_TX_HOVER").hide();
			});		

		$(".QvFrame").filter(".Document_CH42").on('mouseover', function (event) {
				event.stopPropagation();
				$(".QvFrame").filter(".Document_TX_HOVER").css("top", event.pageY).css("left", selfL+selfW).show();
				//$(".QvFrame").filter(".Document_TX_HOVER").css("top", event.pageY).show();
				console.log('x: ' +  event.pageX+ ' y: ' +  event.pageY+ ' '+$(this).css("left") );
				
			});		
		
		var grName = "CH31";
		var grNameDet = "CH42";
		//var grMainY=$(".QvFrame").filter(".Document_"+grName).css("top")+$(".QvFrame").filter(".Document_"+grName).css("height");
		//console.log("mainY= "+grMainY);
		//var grMainY=$(".QvFrame").filter(":visible").filter(".Document_"+grName);
		var grMain=$(".QvFrame").filter(":visible").filter(".Document_"+grName+", .Document_"+grNameDet);
		//var grDet =$(".QvFrame").filter(":visible").filter(".Document_"+grNameDet);
		//grMain.each(function(){	console.log("nm= "+$(this).attr("class").indexOf("Document_"+grName));	});
		
		//filter(function() {
		//  return ($(this).attr("class").indexOf("Document_"+grName ) || $(this).attr("class").indexOf("Document_"+grNameDet))
		//});
		var grMainY = grMain.position().top+grMain.outerHeight();
		//console.log("pos= "+grMain.position().top+ " hg="+ grMain.outerHeight());
		
		// shift buttons up to grid 
		if ((elementsUnderGrid==undefined) && (grMain.attr("class").indexOf("Document_"+grName)>=0)) {
			elementsUnderGrid=$(".QvFrame").filter(function () {
				return grMainY< $(this).position().top;
			});
		}	
		console.log("*");
		if ((elementsUnderGridDet==undefined)  && (grMain.attr("class").indexOf("Document_"+grNameDet)>=0)) {
			elementsUnderGridDet=$(".QvFrame").filter(function () {
				return grMainY< $(this).position().top;
			});
		}	
		console.log("**");
		if (elementsUnderGridDet!=undefined) {
			elementsUnderGridDet.css("top", grMainY+10);
		}	
		if (elementsUnderGrid!=undefined) {
			elementsUnderGrid.css("top", grMainY+10);
		}	
		if (elementsBeyondGrid==undefined) {
			elementsBeyondGrid=$(".QvFrame").filter(function () {
				return (grMainY< $(this).position().top+$(this).outerHeight()) && (grMainY> $(this).position().top);
			});
		}	
		
		elementsBeyondGrid.each(function(){
			$(this).css("height", grMainY-$(this).position().top+100).children().filter(".QvContent").css("height", grMainY-$(this).position().top+100);
			console.log("grMainY="+grMainY+" topNew= "+ $(this).position().top + " hg="+$(this).outerHeight()+" css = "+$(this).css("height"));
			console.log($(this).attr("class"));
		})
		
	}
	_this.Document.SetOnUpdateComplete(centerIt);
});
