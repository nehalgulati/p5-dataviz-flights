
var table;
var all_flights=[];

var pg;
var t;
var flight_description =  function(dis,flon,flat,tlon,tlat,fcon,tcon){
    this.distance = dis
    this.from_long = flon
    this.from_lat = flat
    this.to_long = tlon
    this.to_lat = tlat
    this.from_con = fcon
    this.to_con = tcon

    this.departureX = map(this.from_long, -180,180,0,width)
    this.departureY = map(this.from_lat, -90,90,height/2,0)
    this.arrivalX = map(this.to_long, -180,180,0,width)
    this.arrivalY = map(this.to_lat, -90,90,height,height/2)
   
    this.selected = function() {
        if (dist(mouseX, mouseY, this.departureX, this.departureY)<10) {
            return true
        } else {
            return false
        }
    }
        
    this.show_bkg_airport = function() {
        pg.ellipse(this.departureX, this.departureY, 5,5)
        pg.ellipse(this.arrivalX, this.arrivalY, 5,5)
    }
	
    this.show_selected_airport = function() {
        if ( this.selected() ) {
            fill(255,0,0,25)
            
            ellipse(this.departureX, this.departureY, 5,5)
            ellipse(this.arrivalX, this.arrivalY, 5,5)
            
            // text("Attention",mouseX, mouseY);

        }
        
    }
}


function preload() {
  table = loadTable("flights-details.csv","csv","header")
}
    
function setup() {
  createCanvas(windowWidth, windowHeight)
  noStroke()
  noLoop()
  // fill(48,192,241,10)
  
  var rows = table.getRows()
    for ( var i in rows ) {
        var from_air = rows[i].getString("from_airport")
        var from_city = rows[i].getString("from_city")
        var from_con = rows[i].getString("from_country")
        var from_long = rows[i].getNum("from_long")
        var from_lat = rows[i].getNum("from_lat")
        var to_air = rows[i].getString("to_airport")
        var to_city = rows[i].getString("to_city")
        var to_con = rows[i].getString("to_country")
        var to_long = rows[i].getNum("to_long")
        var to_lat = rows[i].getNum("to_lat")
        var airline = rows[i].getString("airline")
        var airline_con = rows[i].getString("airline_country")
        var distance = rows[i].getNum("distance")
    
         var this_flight = new flight_description(distance, from_long, from_lat, to_long, to_lat, from_con, to_con)
         all_flights.push(this_flight)
    }
        
        pg = createGraphics(windowWidth, windowHeight);
        pg.background(25,26,26);
        pg.noStroke();
        pg.fill(225,225,255,10);
        for ( var i in all_flights ) {
            all_flights[i].show_bkg_airport()
	}
}


function draw() {
    background(25,26,26)
    image(pg,0,0)
    for ( var i in all_flights ) {
        all_flights[i].show_selected_airport()
    }
}


function mouseMoved() {
  redraw()
  //return false
}





