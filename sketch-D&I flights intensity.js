// This interactive visualisation shows flight distribution by distance ranging from shortest to longest.

var table;

function preload() {
  table = loadTable("flights-details.csv","csv","header")
}

function setup() {
  createCanvas(windowWidth, windowHeight)
  noStroke()
  noLoop()
} 

function draw(){
  // fill(48,192,241,10)
  background(25,26,26)
  var rows = table.getRows()
  
  for (var row_i = 0; row_i < rows.length; row_i++) {
    var distance = rows[row_i].getNum("distance")
    var mouseX_min = mouseX - 50
    var mouseX_max = mouseX + 50
    var min_distance = map(mouseX_min,0,1800,0,15406)
    var max_distance = map(mouseX_max,0,1800,0,15406)
    
    
  if ( min_distance < distance && distance < max_distance ) {
    var long_data = rows[row_i].getNum("from_long")
    var lat_data = rows[row_i].getNum("from_lat")
    var source_country = rows[row_i].getString("from_country")
    var des_country = rows[row_i].getString("to_country")
    var distance = rows[row_i].getNum("distance")
    
    var x = map(long_data,-180,180,0,width)
    var y = map(lat_data,-90,90,height,0)
    
    if(source_country == des_country){
        fill(252,83,32,20)
    } else {
        fill(48,192,241,20)
    }
    
    // var dot_size = map(mouseX,1,1000,3,12)
    ellipse(x,y,5,5)
    }
  }
}

function mouseMoved() {
  redraw()
  return false
}



