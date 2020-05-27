window.onload = function () {
	getCoronaStats_IND();
	document.querySelector( '.switcher i' ).addEventListener( 'click', ({target}) => toggleData( target ) )   
	get_state("KL");
	document.getElementById('location').onchange = function(){
		get_state(this.value);
	 };
	 }

function get_state(value){

	fetch("https://api.track-covid19.in/reports_v2.json")
		.then(function (resp) {
			return resp.json()
		})
		.then(function (data) {
			console.log(data);


			let count = data.states;
			let i = value;

			document.getElementById("active").innerHTML = count[i].active;
			document.getElementById("rec").innerHTML = count[i].recovered;
			document.getElementById("death").innerHTML = count[i].dead;
			document.getElementById("confirmed").innerHTML = count[i].confirmed;

			//today's stats

			document.getElementById("tactive").innerHTML = count[i].today.active;
			document.getElementById("trec").innerHTML = count[i].today.recovered;
			document.getElementById("tdeath").innerHTML = count[i].today.dead;
			document.getElementById("tconfirmed").innerHTML = count[i].today.confirmed;




		})
		.catch(function () {
			console.log("error!");
		})
	setTimeout(get_state, 300);//updates every 5min
}

function getCoronaStats_IND() {

	let type = document.querySelector( '.switcher .fa-toggle-off' ).getAttribute( 'data-type' );

   if (type=="nation"){
	fetch("https://api.track-covid19.in/reports_v2.json")
			.then(function (resp) {
			return resp.json()
		})
		.then(function (data) {
			console.log(data);
			let confirmed = data.confirmed;
			let active=data.active;
			let recovered = data.recovered;
			let death = data.dead;
			let tconfirmed = data.today.confirmed;
			let tactive=data.today.active;
			let trecovered = data.today.recovered;
			let tdeath = data.today.dead;

			document.getElementById('confirmed').innerHTML = confirmed.toLocaleString('en');
			document.getElementById('active').innerHTML = active.toLocaleString('en');
			document.getElementById('rec').innerHTML = recovered.toLocaleString('en');
			document.getElementById('death').innerHTML = death.toLocaleString('en');
			document.getElementById('tconfirmed').innerHTML = tconfirmed.toLocaleString('en');
			document.getElementById('tactive').innerHTML = tactive.toLocaleString('en');
			document.getElementById('trec').innerHTML = trecovered.toLocaleString('en');
			document.getElementById('tdeath').innerHTML = tdeath.toLocaleString('en');

		
		})
		.catch(function () {
			console.log("error!");
		})
	}
	
	else{
		get_state(this.value);
	}
	
	setTimeout(getCoronaStats_IND, 300);//updates every 5min
}

const toggleData = async ( element ) => {

	element.getAttribute( 'data-type' ) == 'local' ? element.setAttribute( 'data-type', 'nation' ) : element.setAttribute( 'data-type', 'local' )

	element.classList.toggle( 'fa-rotate-180' )
}
