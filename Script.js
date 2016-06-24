var cApath = Qva.Remote + "?public=only&type=Document&name=Extensions/centerAlign/";
Qva.LoadCSS(cApath + "style.css");
Qva.AddDocumentExtension('centerAlign', function() {
	var _this = this;
	//default width is 1024 to act as a minimum width for your content 
	
	
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
		gridName="CH42";
		$(".QvFrame").filter(".Document_TX_HOVER").css("position", "relative").css("zIndex", "100").hide();
		selfL=$(".QvFrame").filter(".Document_"+gridName).css("left");
		selfW=$(".QvFrame").filter(".Document_"+gridName).css("width");
		
		$(".QvFrame").filter(".Document_CH42").on('mouseout', function (event) {
				event.stopPropagation();
				$(".QvFrame").filter(".Document_TX_HOVER").hide();
			});		

		$(".QvFrame").filter(".Document_CH42").on('mouseover', function (event) {
				event.stopPropagation();
				$(".QvFrame").filter(".Document_TX_HOVER").css("top", event.pageY).css("left", selfL+selfW).show();
			});		
		//------------------------------------------------------------------- EPAM	
	}
	_this.Document.SetOnUpdateComplete(centerIt);
});
