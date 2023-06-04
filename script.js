function yandexMap() {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'Accept-Version': '1.0.0',
      authorization: 'Bearer 1414ae229c8765d66d8c0597cdfd6c7499f1544b327f3451d62adcff1a367b30'
    }
  };
  
  fetch('https://api.webflow.com/collections/646e6389b4343c8e941797be/items', options)
    .then(response => response.json())
    .then(response => {
      ymaps.ready(function () {
        var map = new ymaps.Map("russia-map", {
          center: [57.956985, 87.73943],
          zoom: 3.5
        });
  
        if (map) {
          ymaps.modules.require(['Placemark', 'Circle'], function (Placemark, Circle) {
            response.items.forEach(item => {
              var name = item.name;
              var lng = item.shirota;
              var lat = item.dolgota;
              var address = item.adres;
              var phone = item.phone;
  
              var placemark = new ymaps.Placemark([lat,lng],
                {
                  balloonContentHeader: '<div class="metka-header">'+name+'</div>',
                  balloonContentBody: '<div class="metka-contact">'+address+"<br>"+phone+'</div>',
                  iconContent: name
                },
                {
                  iconLayout: 'default#image',
                  iconImageHref: "https://uploads-ssl.webflow.com/6454cc1d3bc9b9214a693b3b/647c770f2eaf2b1b445620f2_heleo_map-point.svg",
                  iconImageSize: [117, 122],
                  iconImageOffset: [-58, -61]
                }
              );
              map.geoObjects.add(placemark);
            });
          });
        }
      });
    })
    .catch(err => console.error(err));
  }
  
  function launch() {
    yandexMap();
  }