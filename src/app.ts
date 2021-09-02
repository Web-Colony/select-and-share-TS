const form = document.querySelector("form")!;
const latInput = document.getElementById("lat")! as HTMLInputElement;
const longInput = document.getElementById("long")! as HTMLInputElement;

declare var ol: any;

const searchAddress = (e: Event) => {
  e.preventDefault();
  const lat = latInput.value;
  const long = longInput.value;

  if (!lat || !long) {
    alert("Please Enter coordinations");
    return;
  }

  document.getElementById("map")!.innerHTML = "";

  const iconFeature = new ol.Feature({
    geometry: new ol.geom.Point(ol.proj.fromLonLat([+long, +lat])),
  });

  new ol.Map({
    target: "map",
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM(),
      }),
      new ol.layer.Vector({
        source: new ol.source.Vector({
          features: [iconFeature],
        }),
        style: new ol.style.Style({
          image: new ol.style.Icon({
            scale: 0.07,
            anchorYUnits: "pixels",
            anchorXUnits: "fraction",
            src: "../imgs/location-pin.png",
          }),
        }),
      }),
    ],
    view: new ol.View({
      center: ol.proj.fromLonLat([+long, +lat]),
      zoom: 6,
    }),
  });
};

form.addEventListener("submit", searchAddress);
