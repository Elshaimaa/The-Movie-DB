"use strict";
$('.xIcon').click(function(){
	if($('.blackBar').offset().left == 0){
		var value = $('.blackBar').width();
		$('.xIcon').html('<i class="iconz closeOpenIcon fa-solid fa-bars fs-2"></i>')
		$('.navList').animate({left:`-=${value}`},500);
		$('.listBar').find('li').each(function(i){
			var pos = Number(i)*2000;
			var delayTime = "animate__delay-"+i+"s"
			$(this).removeClass(`animate__fadeInUpBig`)
			$(this).addClass(`animate__animated animate__fadeOutDownBig animate__faster ${delayTime}`)
		})
	}
	else{
		var value = $('.blackBar').width()*-1;
		$('.xIcon').html('<i class="iconz closeOpenIcon fw-bold fa fa-align-justify fa-times"></i>')
		$('.navList').animate({left:`-=${value}`},500);
		$('.listBar').find('li').each(function(i){
			var pos = Number(i)*2000;
			var delayTime = "animate__delay-"+i+"s"
			$(this).addClass(`animate__animated animate__fadeInUpBig animate__faster ${delayTime}`)
			$(this).removeClass(`animate__fadeOutDownBig`)
		})
	}
})
$('.nowPlaying').click(function(){
	displayMoviesFromCategory("movie/now_playing")
})
$('.Popular').click(function(){
	displayMoviesFromCategory("movie/popular")
})
$('.topRated').click(function(){
	displayMoviesFromCategory("movie/top_rated")
})
$('.trending').click(function(){
	displayMoviesFromCategory("trending/all/day")
})
$('.upComing').click(function(){
	displayMoviesFromCategory("movie/upcoming")
})
$('.search').keyup(function(e){
	var value = e.target.value.toLowerCase();
	$('.blockDiv').each(function( index ) {
		var movieName = $( this ).find('h2')[0].innerText.toLowerCase();
		// alert(movieName,value)
		if(movieName.includes(value)){
			$(this).removeClass("d-none");
		}
		else{
			$(this).addClass("d-none");
		}
	});
})
$('.searchAPI').keyup(async function(e){
	var API = 'https://api.themoviedb.org/3/search/movie?api_key=db41e8cf4083933f662065661b445d1a&language=en-US&page=1&include_adult=false&query='+e.target.value;
	var response = await fetch(API)
	var jsonResponse= await response.json();
	var results = jsonResponse.results;
	displayMovies(results);
})
async function displayMoviesFromCategory(apiName){
	var API = `https://api.themoviedb.org/3/${apiName}?api_key=db41e8cf4083933f662065661b445d1a&language=en-US&page=1`
	var response = await fetch(API)
	var jsonResponse= await response.json();
	var results = jsonResponse.results;
	displayMovies(results);
}
function displayMovies(results){
	var data = ""
	for(var i=0;i<results.length;i++){
		var path ="https://image.tmdb.org/t/p/w500/" + results[i].poster_path;
		data += `
		<div class="blockDiv overflow-hidden col-sm-12 col-md-6 col-lg-4 my-3 shadow">
			<div class="position-relative" >
				<img class="img-fluid h-100 w-100 rounded m-0 p-0" src="${path}" alt="movie photo">
				<div class="coverDiv h-100 w-100 text-center rounded d-flex">
					<div class="align-self-center">
						<h2 class="fw-lighter">${results[i].original_title}</h2>
						<p>${results[i].overview}</p>
						<p>rate: ${results[i].vote_average}</p>
						<p>${results[i].release_date}</p>
					</div>
				</div>
			</div>
		</div>`
	}
	$('.moviesDisplay').html(data)
}
displayMoviesFromCategory("movie/now_playing")

$('.contactInfo #name').keyup(function(e){
	var flag = e.target.value.toLowerCase().match(/^[A-Za-z][A-Za-z0-9_]{1,29}$/);
	if(flag == null){
		$('.nameWarning').removeClass("d-none")
	}
	else{
		$('.nameWarning').addClass("d-none")
	}
});

$('.contactInfo #email').keyup(function(e){
	var flag = e.target.value.toLowerCase().match(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9-]+.com$/);
	if(flag == null){
		$('.emailWarning').removeClass("d-none")
	}
	else{
		$('.emailWarning').addClass("d-none")
	}
})
$('.contactInfo #phone').keyup(function(e){
	var flag = e.target.value.toLowerCase().match(/^01[0125][0-9]{8}$/);
	if(flag == null){
		$('.phoneWarning').removeClass("d-none")
	}
	else{
		$('.phoneWarning').addClass("d-none")
	}
})
$('.contactInfo #age').keyup(function(e){

	var flag = e.target.value.toLowerCase().match(/^100$|^[1-9]{1}[0-9]{1}$|^[1-9]{1}$/);
	if(flag == null){
		$('.ageWarning').removeClass("d-none")
	}
	else{
		$('.ageWarning').addClass("d-none")
	}
})
$('.contactInfo #pass').keyup(function(e){

	var flag = e.target.value.toLowerCase().match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/);
	if(flag == null){
		$('.passWarning').removeClass("d-none")
	}
	else{
		$('.passWarning').addClass("d-none")
	}
})
$('.contactInfo #repass').keyup(function(e){
	if($('#pass').val() != e.target.value){
		$('.repassWarning').removeClass("d-none")
	}
	else{
		$('.repassWarning').addClass("d-none")
	}
})