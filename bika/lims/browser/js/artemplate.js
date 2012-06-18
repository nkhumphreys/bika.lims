(function( $ ) {

function autocomplete_samplepoint(request,callback){
	$.getJSON(window.portal_url + "/ajax_samplepoints",
		{'term':request.term,
		 'sampletype':$("#SampleType").val(),
		 '_authenticator': $('input[name="_authenticator"]').val()},
		function(data,textStatus){
			callback(data);
		}
	);
	function set_sp(e){
  		sp = window.bsc.data.sp_uids[$(e).val()];
  		if (sp != undefined && sp != null){
  			if (sp['sampletypes'].length == 1){
  				$("#SampleType").val(sp['sampletypes'][0]);
  			}
  		}
	}

	$("#SamplePoint").focus(function(){
		window._ac_focus = this;
	});
	$("#SamplePoint").change(function(){
		set_sp(this);
	});
	$("#SamplePoint").blur(function(){
		set_sp(this);
	});    
}

function autocomplete_sampletype(request,callback){
	$.getJSON(window.portal_url + "/ajax_sampletypes",
		{'term':request.term,
		 'samplepoint':$("#SamplePoint").val(),
		 '_authenticator': $('input[name="_authenticator"]').val(),},
		function(data,textStatus){
			callback(data);
		}
	);

  	function set_st(e){
  		st = window.bsc.data.st_uids[$(e).val()];
  		if (st != undefined && st != null){
			if (st['samplepoints'].length == 1){
					$("#SamplePoint").val(st['samplepoints'][0]);
			}
		}
	}

	$("#SampleType").focus(function(){
		window._ac_focus = this;
	});
	// also set on .change() though because sometimes we set these manually.
	$("#SampleType").change( function(){
		set_st(this);
	});
  	$("#SampleType").blur(function(){
  		set_st(this);
  	});
}

function portalMessage(message){
	str = "<dl class='portalMessage error'>"+
		"<dt>"+window.jsi18n("Error")+"</dt>"+
		"<dd><ul>" + window.jsi18n(message) +
		"</ul></dd></dl>";
	$('.portalMessage').remove();
	$(str).appendTo('#viewlet-above-content');
}

function clickSaveButton(event){
	selected_analyses = $('[name^="uids\\:list"]').filter(':checked');
	if(selected_analyses.length < 1){
		portalMessage("No analyses have been selected");
		window.scroll(0, 0);
		return false;
	}
}

$(document).ready(function(){

	_ = window.jsi18n;

	$("#SampleType").autocomplete({ minLength: 0, source: autocomplete_sampletype});
	$("#SamplePoint").autocomplete({ minLength: 0, source: autocomplete_samplepoint});

	$("input[name$=save]").addClass('allowMultiSubmit');
	$("input[name$=save]").click(clickSaveButton);

});
}(jQuery));

