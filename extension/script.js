// ==UserScript== 
// @name Basecamp Calendar Project Names
// @include https://*.basecamphq.com/*
// ==/UserScript==

var add_jq = function(callback) {
	var script = document.createElement("script");
	script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
	script.addEventListener('load', function() {
		var script = document.createElement("script");
		script.textContent = "(" + callback.toString() + ")();";
		document.body.appendChild(script);
	}, false);
	document.body.appendChild(script);
};
function main(){
	var j = jQuery.noConflict();
	var ProjectNames = {
		separator: '&mdash;',
		init: function() {
			ProjectNames.addProjectNames();
			
			var container = jQuery('.calendar_container');
			
			container = container[0];
			container.addEventListener("DOMNodeInserted", ProjectNames.addProjectNames);
		},
		addProjectNames: function() {
			
			j('.calendar_event.spanned').each(function(){
				if ( j(this).hasClass('owc-modified') )
					return;
					
				j(this).addClass('owc-modified');
				
				var el = j(this).find('a.entry_title');
				var title = /:(.*)/.exec(el.attr('title'));
				
				if ( title.length > 1 ) {
					title = title[1];
					
					el.prepend( title + ' ' + ProjectNames.separator + ' ');
				}
			});
			
		}
	};
	ProjectNames.init();
}
add_jq(main);