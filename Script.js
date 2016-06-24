var cApath = Qva.Remote + "?public=only&type=Document&name=Extensions/centerAlignPENSKE/";
Qva.LoadCSS(cApath + "style.css");
Qva.AddDocumentExtension('centerAlignPENSKE', function() {
	var _this = this;
	//default width is 1024 to act as a minimum width for your content 

	//------------------------------------------------------------------- EPAM
	var elementsUnderGrid;	 // set of elements under Main grid
	var elementsUnderGridDet; // set of elements under Detail grid
	var elementsBeyondGrid;	 // one textbox
	var grName = "CH31";	// name of the Main grid
	var grNameDet = "CH60"; // name of the Detail grid
	//------------------------------------------------------------------- EPAM
	
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
		
		//------------------------------------------------------------------- EPAM
		
		//------------------------------------------------------------------- objects under grid move
		var grMain=$(".QvFrame").filter(":visible").filter(".Document_"+grName+", .Document_"+grNameDet);
		var grMainY = grMain.position().top+grMain.outerHeight();
		
		// shift buttons up to grid 
		if ((elementsUnderGrid==undefined) && (grMain.attr("class").indexOf("Document_"+grName)>=0)) {
			elementsUnderGrid=$(".QvFrame").filter(function () {
				return grMainY< $(this).position().top;
			});
		}	
		if ((elementsUnderGridDet==undefined)  && (grMain.attr("class").indexOf("Document_"+grNameDet)>=0)) {
			elementsUnderGridDet=$(".QvFrame").filter(function () {
				return grMainY< $(this).position().top;
			});
		}	
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
			$(this).css("height", grMainY-$(this).position().top+60).children().filter(".QvContent").css("height", grMainY-$(this).position().top+60);
			console.log("grMainY="+grMainY+" topNew= "+ $(this).position().top + " hg="+$(this).outerHeight()+" css = "+$(this).css("height"));
			console.log($(this).attr("class"));
		})
		//------------------------------------------------------------------- EPAM	
		
	}
	_this.Document.SetOnUpdateComplete(centerIt);
});
