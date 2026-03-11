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

function draw(){}

function drawCamden(){
  clear();

  for (let i = 0; i < camden.getRowCount(); i++) {

    const latitude = Number(camden.getString(i, 'Latitude'));
    const longitude = Number(camden.getString(i, 'Longitude'));

    const pos = myMap.latLngToPixel(latitude, longitude);

    ellipse(pos.x, pos.y, 5, 5);
  }
}