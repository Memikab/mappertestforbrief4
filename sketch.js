let myMap;
let canvas;
let camden;

const mappa = new Mappa('Leaflet');

const options = {
  lat: 51.54,
  lng: -0.14,
  zoom: 13,
  style: "https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
}


 


async function setup(){
  canvas = createCanvas(windowWidth,windowHeight);

    camden = await loadTable('/assets/camdenlights.csv', ',', 'header');

  myMap = mappa.tileMap(options); 
  myMap.overlay(canvas);

  console.log(camden.columns);
  

  myMap.onChange(drawCamden);

  fill(200,100,100);
}


function drawCamden(){
  clear();

  for (let i = 0; i < camden.getRowCount(); i++) {

    const latitude = Number(camden.getString(i, 'Latitude'));
    const longitude = Number(camden.getString(i, 'Longitude'));
    const lightType = camden.getString(i,'Lamp Type');
    
  const pos = myMap.latLngToPixel(latitude, longitude);
  

  if (lightType === "Generic LED Lighting") {
  fill(0, 200, 255);  
  }else if(lightType === "High Pressure Sodium"){
  fill(245, 209, 66);  
  }else if(lightType === "Cosmopolis"){
  fill(212, 104, 242);   
  } else if(lightType === "High Pressure Mercury"){
fill(180, 240, 206);
  }

ellipse(pos.x, pos.y, 5, 5);

    
  }

}
