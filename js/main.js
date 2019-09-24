$(document).ready(function(){
	$('button.scrollTop').click(function(){
		$('html, body').animate({
			scrollTop: $('body').offset().top
		}, 300);
	});
});

$(window).scroll(function() {    
	var scroll = $(window).scrollTop();

	if (scroll >= 154) {
		$(".scrollTop").addClass("active");
	}else{
		$(".scrollTop").removeClass("active");
	}
});

var searchval ;
var pagenumber ;

function moviesearch(){
	$.getJSON("http://www.omdbapi.com/?s=" + searchval +'&page='+pagenumber+"&plot=full&apikey=4a241885", function(data){
		var movie = data.Search;

		if (typeof(movie) !== 'undefined'){
			for(var i = 0, length1 = movie.length; i < length1; i++){

				$.getJSON("http://www.omdbapi.com/?t=" + movie[i].Title +"&plot=full&apikey=4a241885", function(item){

					var html = '<div class="item">';
					var Title = '<div class="wrapper"><p class="title">'+item.Title+'('+item.Year +')'+'</p>';
					var imdbRate = '<p class="rate"><i class="fas fa-star"></i>'+item.imdbRating+'<span>/10</span></p>';
					var Lang = '<p class="lang"><b>Dil:</b>'+ item.Language+'</p>';
					var Actor = '<p class="actors"><b>Oyuncular:</b>'+item.Actors+'</p>';
					var Desc = '<p class="description">'+item.Plot+'</p>';
					var Poster = '<div class="img-area"><img class="poster" src=" '+ item.Poster+'"></div>';

					html += Poster + Title + imdbRate + Lang + Actor + Desc;
					html += '</div>';
					$('div.result-area').append(html);
				});

				$('div.more').show();
				$('div.result-area').show();
			}
		}
	});
}

$('div.input-area input').keyup(function(){
	if ($(this).val().length >= 3){
		$('div.input-area button img').attr('src','images/right-arrow.svg');
		$('div.result-area').empty();
		$('div.more').hide();
		$('div.result-area').hide();

		searchval = $('div.input-area input').val();
		pagenumber = 1;

		moviesearch();

		$('div.result-area').fadeIn(200);
		$('div.more').click(function(){
			$('div.result-area div.item').addClass('show');
			pagenumber += 1;
			moviesearch();
		});
	}else {
		$('div.result-area').hide();
		$('div.more').hide();
		$('div.input-area button img').attr('src','images/search.svg');
	}
});

$('span.clear').click(function(){
	$('div.result-area').empty();
	$('div.result-area').fadeOut();
	$('div.input-area input').val('');
	$('div.more').fadeOut();
	$(this).removeClass('active');
});

$('div.input-area input').keyup(function(){
	if ($('div.input-area input').val().length >= 1) {
		$('span.clear').addClass('active');
	}else {
		$('span.clear').removeClass('active');
	}
});

/* Filter prod --
$("div.input-area button").click(function() {
	var value = $('div.input-area input').val().toLowerCase();
	$("div.result-area div.item p.title").filter(function() {
		$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
		$('div.item p.title').toggleClass( "search" );
	});
});
*/