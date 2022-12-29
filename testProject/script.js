let map = L.map('map').setView([42.87, 74.59], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

//http://agromap.24mycrm.com:8111/contour/

    var qrcode = new QRCode("qrcode",
    "https://g-b.24mycrm.com");
