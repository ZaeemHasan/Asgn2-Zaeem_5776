// for updating weather on dashboard, as well well as for showing 5 days weather prediction on weather widget

var query = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22islamabad%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";

window.predic = this.angular.module('predic', []);
predic.controller('pre', function($scope,$timeout,$http) {
   
	var weekDay = new Array("Sun","Mon","Tue","Wed","Thu","Fri","Sat","Sun");
	$timeout(function() {
		$http.get(query).success(function(data) {
			$scope.city = data.query.results.channel.location.city; 
			
			$scope.tempF = data.query.results.channel.item.condition.temp; 
			$scope.cond = data.query.results.channel.item.condition.text;
			$scope.tempC = (Math.round((parseInt($scope.tempF) - 32) * (5 / 9)));
			$scope.cur = $scope.tempC + "&degC (" + $scope.cond + ")";
			
			var d = new Date();
			$scope.wday = weekDay[d.getDay()];
			document.getElementById("wthr").innerHTML = $scope.cur;
			var place=data.query.results.channel.item.description;
			var str = "<br />\n<br />\n<a href=\"http://us.rd.yahoo.com/dailynews/rss/weather/Islamabad__PK/*http://weather.yahoo.com/forecast/PKXX0006_f.html\">Full Forecast at Yahoo! Weather</a><BR/><BR/>\n(provided by <a href=\"http://www.weather.com\" >The Weather Channel</a>)<br/>\n";
			var res = place.replace(str, "");
			document.getElementById("fu").innerHTML = res;
		});
		return;
	}, 1000);
		
});

// for updating time and date on dashboard

var myVar = setInterval(updateMain ,1000);
function updateMain() {
    var d = new Date();
	var month = new Array("Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec");
	document.getElementById("tme").innerHTML = d.toLocaleTimeString();
	document.getElementById("dte").innerHTML = d.getDate()+"/"+month[d.getMonth()]+"/"+d.getFullYear();
}

/*Code for Analog Clock*/

var myVar = setInterval(startClock,1000);
        
function startClock() {
	var secs = new Date().getSeconds();		// fetching current time
	var mins = new Date().getMinutes();
	var hrs = new Date().getHours();
			   
    var sdegree = secs * 6;					// converting time into angles
    var mdegree = mins * 6;
	var hdegree = hrs * 30 + (mins / 2);
			  
	var srotate = "rotate(" + sdegree + "deg)";			// setting strings for rotation at their calculated angles
    var mrotate = "rotate(" + mdegree + "deg)";
	var hrotate = "rotate(" + hdegree + "deg)";
			  
    $("#sec").css({"-moz-transform" : srotate, "-webkit-transform" : srotate});			// running css rotation code via javascript
    $("#min").css({"-moz-transform" : mrotate, "-webkit-transform" : mrotate});
	$("#hour").css({"-moz-transform" : hrotate, "-webkit-transform" : hrotate});
              
}

/*Code for Dynamic Monthly Calendar*/

var myVar = setInterval(setCal,1000);

function setCal() {
	var arMN = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
	var arMD = new Array(31,"null",31,30,31,30, 31,31,30,31,30,31);		// array containing no. of days in each month respectively
	var monthName, monthDays;
	
	var curDate = new Date();
	var date = curDate.getDate();
	var month = curDate.getMonth();
	var year = curDate.getFullYear();
	
	if (year % 4 == 0)	// checking leap year
		arMD[1]=29;		// arMD[1] :- february.... 29 days if leap year
	else 
		arMD[1]=28;
		
	monthName = arMN[month];
	monthDays = arMD[month];

	var fDayM_Ins = new Date(year, month, 1);		// create 1st date of month instance to get weekday 
	var firstDay = fDayM_Ins.getDay();

	firstDay = firstDay + 1;
	var lastDate = monthDays;

	var text = 	'<center>' + 									// create basic table structure
					'<table border=2 cellspacing=4 >' + 
						'<th colspan=7 height=100 style="text-align:center; background-color:\'#393939\'; "> ' + 
							'<font color=\'#ededed\' size=+3 >' + 
								monthName + ' ' + year + 
							'</font>' +
						'</th>';

	var openCol = 	'<td width=70 height=50 style="background-color:\'#393939\'"><font color=\'#ededed\'>';
	var closeCol = 	'</font></td>';

	var weekDay = new Array("Sun","Mon","Tue","Wed","Thu","Fri","Sat","Sun")

	text += 		'<tr align="center" valign="center">';	
	
	var dayNum=0;					// loop for concatenating html code for weekdays name's row 
	while(dayNum<7){
		text += openCol + weekDay[dayNum] + closeCol;
		dayNum++;
	}
	text += 		'</tr>';

// declaration and initialization of two variables to help with tables
	var digit = 1;
	var curCell = 1;

	for (var row = 1; row <= Math.ceil((lastDate + firstDay - 1) / 7); ++row) {
		text += 	'<tr align="right" valign="top">'
		for (var col = 1; col <= 7; ++col) {
			if (digit > lastDate)
				break;
			
			if (curCell < firstDay) {
				text += '<td style="background-color:\'#393939\'"></td>';
				curCell++
			} else {
				if (digit == date) { // current cell represent today's date
					text += '<td height=50 style="background-color:purple">' + 
								'<font color="white">' + digit + '</font><br>' +
							'</td>'
				} else
					text += '<td height=50 style="background-color:darkgrey"><font color="white">' + digit + '</font></td>';
				digit++;
			}
		}
		text += 	'</tr>';
	}

	text += 	'</TABLE>' +
			'</CENTER>';
	
	document.getElementById("cal").innerHTML = text;
}

// action listeners:

$("#c1").click(function() {
		$("#nav").css("display","none");
		$("#gapdiv").css("display","none");
		$("#widget").css("display","none");
		$("footer").css("display","none");
		$("#w1").css("display","block");
}).css({'cursor': 'pointer'});

$("#c2").click(function() {
		$("#nav").css("display","none");
		$("#gapdiv").css("display","none");
		$("#widget").css("display","none");
		$("footer").css("display","none");
		$("#w2").css("display","block");
}).css({'cursor': 'pointer'});

$("#c3").click(function() {
		$("#nav").css("display","none");
		$("#gapdiv").css("display","none");
		$("#widget").css("display","none");
		$("footer").css("display","none");
		$("#w3").css("display","block");
}).css({'cursor': 'pointer'});

$("#b1").click(function() {
		$("#w1").css("display","none");
		$("#nav").css("display","block");
		$("#gapdiv").css("display","block");
		$("#widget").css("display","block");
		$("footer").css("display","block");
});

$("#b2").click(function() {
		$("#w2").css("display","none");
		$("#nav").css("display","block");
		$("#gapdiv").css("display","block");
		$("#widget").css("display","block");
		$("footer").css("display","block");
});

$("#b3").click(function() {
		$("#w3").css("display","none");
		$("#nav").css("display","block");
		$("#gapdiv").css("display","block");
		$("#widget").css("display","block");
		$("footer").css("display","block");
});