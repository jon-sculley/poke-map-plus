let EXPECTED_VERSIONS = {'nycpokemap.com':'ver630','sgpokemap.com':'ver657','vanpokemap.com':'ver636','sydneypogomap.com':'ver630'};
let MAP_CENTERS = {'nycpokemap.com':[40.696336,-73.923997],'sgpokemap.com':[1.3521,103.8198],'vanpokemap.com':[49.277877,-123.119785],'sydneypogomap.com':[-33.873906,151.200785]};

let version = document.currentScript.src.split('/').pop().split('?').pop();
let mapCenter = MAP_CENTERS[location.hostname];
if (version !== EXPECTED_VERSIONS[location.hostname]) {
  alert('Javascript file version has been updated: ' + document.currentScript.src.split('/').pop());
}

var pokestops = [];
var markers = [];
var infoWindows = [];

var inserted = 0;
var selectedMarker = null;
var map = null;
var locationMarker = null;
var shouldShowLocationError = false;
var timeOffset = 0;
var shouldUpdate = true;
var lastLoad = 0;
var hashPokemonLat = 0;
var hashPokemonLng = 0;

var min_iv;
min_iv = 0;

var grunts=[{name:"giovanni",characters:[44]},{name:"arlo",characters:[42]},{name:"cliff",characters:[41]},{name:"sierra",characters:[43]},{name:"grunt",characters:[4,5]},{name:"bug",characters:[6,7]},{name:"ghost",characters:[47,48]},{name:"dark",characters:[10,11]},{name:"dragon",characters:[12,13]},{name:"fairy",characters:[14,15]},{name:"fighting",characters:[16,17]},{name:"fire",characters:[18,19]},{name:"flying",characters:[20,21]},{name:"grass",characters:[22,23]},{name:"ground",characters:[24,25]},{name:"ice",characters:[26,27]},{name:"metal",characters:[28,29]},{name:"normal",characters:[30,31]},{name:"poison",characters:[32,33]},{name:"psychic",characters:[34,35]},{name:"rock",characters:[36,37]},{name:"water",characters:[38,39]},{name:"electric",characters:[48,49]}];

var gruntDict={4:"grunt",5:"grunt",6:"bug",7:"bug",48:"ghost",47:"ghost",10:"dark",11:"dark",12:"dragon",13:"dragon",14:"fairy",15:"fairy",16:"fighting",17:"fighting",18:"fire",19:"fire",20:"flying",21:"flying",22:"grass",23:"grass",24:"ground",25:"ground",26:"ice",27:"ice",28:"metal",29:"metal",30:"normal",31:"normal",32:"poison",33:"poison",34:"psychic",35:"psychic",36:"rock",37:"rock",38:"water",39:"water",49:"electric",50:"electric",41:"cliff",42:"arlo",43:"sierra",44:"giovanni"};

var hostNameArray = window.location.hostname.split('.');
var currentTopDomainName = hostNameArray.slice(hostNameArray.length - 2).join('.');

L.HtmlIcon = L.Icon.extend({
  options: {
    /*
    html: (String) (required)
    iconAnchor: (Point)
    popupAnchor: (Point)
    */
  },

  initialize: function (options) {
    L.Util.setOptions(this, options);
  },

  createIcon: function () {
    var div = document.createElement('div');
    div.innerHTML = this.options.html;
    return div;
  },

  createShadow: function () {
    return null;
  }
});

function getAssetURL(pokestop) {
  if (pokestop.invasion_end) {
    return '/images/pokestop/rocket.png?ver625'
  }

  return "";
}

function getTypeURL(pokestop) {
  return '/images/pokestop/type_' + pokestop.invasionType() + '.png?ver625';
}

function pokestopHTML(pokestop) {
  var returnString = "<div class='pokestop_icon'>";
  if (pokestop.invasion_end) {
    var assetURL = getAssetURL(pokestop);
    var typeURL = getTypeURL(pokestop);
    returnString += "<img class='pokestop_type_icon_img' src='" + typeURL + "' /><img class='pokestop_icon_img' src='" + assetURL + "' />";
  }
  returnString += "</div>";
  return returnString;
}


function Pokestop(lat, lng, pokestop_name, invasion_end, invasion_character, lure_type, lure_end) {
  this.lat = lat;
  this.lng = lng;
  this.pokestop_name = pokestop_name;
  this.invasion_end = invasion_end;
  this.invasion_character = parseInt(invasion_character);
  this.lure_type = lure_type;
  this.lure_end = lure_end;

  this.isEqual = function(pokestop) {
    return (
      this.lat == pokestop.lat &&
      this.lng == pokestop.lng &&
      this.pokestop_name == pokestop.pokestop_name &&
      this.invasion_end == pokestop.invasion_end &&
      this.lure_type == pokestop.lure_type &&
      this.lure_end == pokestop.lure_end
    );
  }

  this.remainingInvasionTime = function() {
    var currentUnixTime = Math.floor(Date.now() / 1000) - timeOffset;
    var remain = this.invasion_end - currentUnixTime;
    return remain;
  }

  this.invasionType = function() {
    for (var i = 0; i < grunts.length; ++i) {
      var grunt = grunts[i];

      if (grunt.characters.indexOf(this.invasion_character) != -1) {
        return grunt.name;
      }
    }
    return "unknown";
  }
}

function locateMeButton() {
  shouldShowLocationError = true;
  map.locate({setView : true});
  map.on('locationfound', function (e) {
    shouldShowLocationError = false;
    if (!locationMarker) {
      var iconOptions = {
        iconUrl: 'images/your_location.png?ver625',
        iconAnchor: [12, 25],
        iconSize: [25, 25],
        zIndexOffset: 1000
      }
      locationMarker = L.marker(e.latlng, {icon: L.icon(iconOptions)});
      locationMarker.addTo(map);
    }
    else {
      locationMarker.setLatLng(e.latlng);
    }
  });
  map.on('locationerror', function (e) {
    if (shouldShowLocationError) {
      alert("You need to allow your browser (Safari/Chrome/etc) to have location access. It's usually in Settings.");
      shouldShowLocationError = false;
    }
  });
}

function locateMe() {
  map.locate({setView : true});
}

function refreshPokestop() {
  if (!shouldUpdate) {
    return; //don't update when map is moving
  }

  var currentUnixTime = Math.floor(Date.now() / 1000) - timeOffset;

  for (var i = 0; i < pokestops.length; ++i) {
    var currentPokestop = pokestops[i];
    var marker = markers[i];
    var shouldRemove = false;

    if (currentUnixTime > currentPokestop.invasion_end) {
      shouldRemove = true;
    }

    var character = currentPokestop.invasion_character;
    var typeToCheck = gruntDict["" + character];

    if (typeToCheck) {
      shouldRemove = !isPokemonChecked(typeToCheck);
    }

    if (shouldRemove) {
      removeMarker(marker);
    }
    else {
      addMarker(marker);
    }
  }
}

function removeMarker(marker) {
  if (marker._map) {
    marker.removeFrom(map);
  }
}

function addMarker(marker) {
  if (!marker._map) {
    marker.addTo(map);
  }
}

function refreshMarker() {
  //update selected marker
  if (selectedMarker) {
    var index = -1;
    for (var i = 0; i < markers.length; i ++) {
      var marker = markers[i];
      if (marker == selectedMarker) {
        index = i;
        break;
      }
    }

    if (index != -1) {
      marker.bindPopup(infoWindowString(pokestops[index]));
    }
  }

  if (locationMarker) {
    map.locate();
  }
}

function indexOfPokestop(pokestop, pokestops) {
  for (var i = 0; i < pokestops.length; ++i) {
    var currentPokestop = pokestops[i];
    if (pokestop.isEqual(currentPokestop)) {
      return i;
    }
  }
  return -1;
}

function processNewPokestops(newPokestops) {

  //clear all quests and marker

  for (var i = 0; i < markers.length; ++i) {
    markers[i].removeFrom(map);
  }

  pokestops = [];
  markers = [];

  for (var i = 0; i < newPokestops.length; ++i) {
    var pokestop = new Pokestop(
      newPokestops[i]['lat'],
      newPokestops[i]['lng'],
      newPokestops[i]['name'],
      newPokestops[i]['invasion_end'],
      newPokestops[i]['character'],
      0,
      0
    );

    if (!pokestop.pokestop_name) {
      pokestop.pokestop_name = "Unknown";
    }

    var index = indexOfPokestop(pokestop, pokestops);
    if (index == -1) {
      pokestops.push(pokestop);

      var markerLocation = new L.LatLng(pokestop.lat, pokestop.lng);

      var iconDimension = 36;
      var iconOptions = {
        iconSize: [iconDimension, iconDimension],
        iconAnchor: [iconDimension/2, iconDimension],
        popupAnchor: [0, -iconDimension],
        zIndexOffset: -1000,
        html : pokestopHTML(pokestop)
      }
      var htmlIcon = new L.HtmlIcon(iconOptions);

      var marker = new L.Marker(markerLocation, {icon: htmlIcon});

      var character = pokestop.invasion_character;
      var typeToCheck = gruntDict["" + character];

      if (typeToCheck) {
        shouldRemove = !isPokemonChecked(typeToCheck);
      }

      if (!shouldRemove) {
        marker.addTo(map);
      }

      marker.bindPopup("");
      markers.push(marker);
      marker.addEventListener('click', function(e) {
        selectedMarker = e.target;
        var index = -1;
        for (var i = 0; i < markers.length; ++i) {
          if (markers[i] == selectedMarker) {
            index = i;
            break;
          }
        }
        if (index != -1) {
          selectedMarker.bindPopup(infoWindowString(pokestops[index]));
        }
      });
    }
  }
}

function shouldTurnFilterOff() {
  return false;
  var userSettings = localStorage.getItem('filterOff');
  if (userSettings != '1')  {
    return false;
  }
  return shouldShowFilterLabel();
}

function shouldShowFilterLabel() {
  if (window.mobilecheck()) {
    return (map.getZoom() >= 14);
  }
  return (map.getZoom() >= 15);
}

var pendingLoad = null;

function reloadPokestops() {
  var currentTime = Math.floor(Date.now() / 1000);
  if (currentTime - 2 < lastLoad) {
    //try to reload in the next 5 seconds
    if (!pendingLoad) {
      pendingLoad = setTimeout(function() {
        reloadPokestops();
      }, (lastLoad + 2 - currentTime) * 1000);
    }

    return;
  }

  pendingLoad = null;

  lastLoad = currentTime;

  var doneFunction = function(data) {
    var newPokestops = data['invasions'];
    var meta = data['meta'];
    // console.log(meta);
    timeOffset = Math.floor(Date.now() / 1000) - parseInt(meta['time']);
    processNewPokestops(newPokestops);
  }

  // var currentFilterString = localStorage.getItem('questFilter');
//
//   if (!currentFilterString) {
//     currentFilterString = "[]";
//   }
//
//   var currentFilter = JSON.parse(currentFilterString);

  $.ajax({
    type: 'GET',
    url: 'pokestop.php',
    data: {
      time: Date.now()
    }
  }).done(doneFunction);
}

function getPokemonName(pokemon) {
  return pokeDict[pokemon.id]["name"];
}

function pbCoords(device_index, lat, lng) {
  let pbKey = localStorage.getItem('PB_ACCESS_TOKEN');
  let pbDevices = localStorage.getItem('PB_DEVICES');
  if (pbKey && pbDevices) {
    pbDevices = JSON.parse(pbDevices);
    let ajax = new XMLHttpRequest();
    ajax.open('POST', 'https://api.pushbullet.com/v2/pushes', true);
    ajax.setRequestHeader('Authorization', 'Basic ' + window.btoa(pbKey + ':'));
    ajax.setRequestHeader('Content-Type', 'application/json');
    ajax.send(JSON.stringify({device_iden: pbDevices[device_index].id, type: 'note', title: 'POKETP' + device_index, body: lat + ' ' + lng}));
  }
}

function infoWindowString(pokestop) {

  var gruntType = pokestop.invasionType();

  if (gruntType == 'arlo' || gruntType == 'cliff' || gruntType == 'sierra') {
    gruntType += " <strong>(Require a Rocket Radar to see.)</strong>";
  }
  else if (gruntType == 'giovanni') {
    gruntType += " <strong>(Require a Super Rocket Radar to see)</strong>";
  }

  var endTime = "<br/><b>Ending in:</b> " + timeToString(pokestop.remainingInvasionTime());
  // let coordsString = ' | <a href="javascript:navigator.clipboard.writeText(\'' + pokestop.lat + ',' + pokestop.lng + '\').then(() => { });">Coords</a>';
  let coordsString = '';
  let pbDevices = localStorage.getItem('PB_DEVICES');
  if (pbDevices) {
    pbDevices = JSON.parse(pbDevices);
    for (let i = 0; i < pbDevices.length; i++) {
      coordsString += ' | <a href="javascript:pbCoords(' + i + ',' + pokestop.lat + ',' + pokestop.lng + ')">' + pbDevices[i].name + '</a>';
    }
  }
  return "<strong>Team Rocket has invaded!</strong><br/><br/>\
<strong>Grunt Type: </strong>" + capitalizedFirstChar(gruntType) + "<br/>\
<strong>Pókestop Name:</strong> " + pokestop.pokestop_name + endTime + "<br/><br/>\
<a target='_blank' href='https://maps.google.com/maps?q=" + pokestop.lat + "," + pokestop.lng + "'>Maps</a>" + coordsString;
}

function capitalizedFirstChar(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function timeToString(seconds) {
  if (seconds < 0) {
    return 'Expired';
  }

  var currentUnixTime = Math.floor(Date.now() / 1000) - timeOffset;

  var despawn = currentUnixTime + seconds;

  //https://stackoverflow.com/a/847196
  //https://stackoverflow.com/a/8888498

  var tmpDate = new Date(despawn*1000);
  var tmpHours = tmpDate.getHours();
  var ampm = tmpHours >= 12 ? "pm" : "am";
  tmpHours = tmpHours % 12;
  tmpHours = tmpHours ? tmpHours : 12;
  tmpHours = "0" + tmpHours;
  var tmpMinutes = "0" + tmpDate.getMinutes();
  var tmpSeconds = "0" + tmpDate.getSeconds();

  var formattedTime = tmpHours.substr(-2) + ':' + tmpMinutes.substr(-2) + ':' + tmpSeconds.substr(-2) + " " + ampm;

  var hours = Math.floor(seconds / 3600);
  var minutes = Math.floor((seconds % 3600) / 60);
  var seconds = seconds % 60;

  var hourString = '' + hours;
  var minuteString = '' + minutes;
  var secondString = '' + seconds;

  if (hours < 10) {
    hourString = '0' + hourString;
  }
  if (minutes < 10) {
    minuteString = '0' + minuteString;
  }
  if (seconds < 10) {
    secondString = '0' + secondString;
  }
  return hourString + ':' + minuteString + ':' + secondString + " (" + formattedTime + ")";
}

function tickFilter(value) {
  var string = localStorage.getItem('questFilter');
  if (!string) {
    string ="[]";
  }

  var currentFilter = JSON.parse(string);

  if (currentFilter.indexOf(value) == -1) {
    currentFilter.push(value);
  }

  localStorage.setItem('questFilter', JSON.stringify(currentFilter));
  reloadPokestops();
}

function untickFilter(value) {
  var string = localStorage.getItem('questFilter');
  if (!string) {
    return;
  }

  var currentFilter = JSON.parse(string);
  var questIndex = currentFilter.indexOf(value);
  if (questIndex == -1) {
    return;
  }

  currentFilter.splice(questIndex, 1);

  localStorage.setItem('questFilter', JSON.stringify(currentFilter));
  reloadPokestops();
}

function checkPokemon(type) {
  var key = 'filter_invasion_' + type;
  localStorage.setItem(key, '1');
}

function uncheckPokemon(type) {
  var key = 'filter_invasion_' + type;
  localStorage.setItem(key, '0');
}

function isPokemonChecked(type) {
  var key = 'filter_invasion_' + type;
  var string = localStorage.getItem(key);
  return (string == '1');
}

function compare(a, b) {
  if (a.rank < b.rank) {
    return -1;
  }
  else {
    return 1;
  }
}

function firstRun() {
  if (localStorage.getItem('firstRunPokestop') != "1") {
    localStorage.setItem('filter_invasion_grunt', "1");
    localStorage.setItem('filter_invasion_dragon', "1");
    localStorage.setItem('firstRunPokestop', "1");
  }
}

function loadPokemonList() {
  // pokeDict = {};
//
//   for (var i in pokeArray) {
//     var pokemon = pokeArray[i];
//     var show_filter = true;
//     if (pokemon['h']) {
//       show_filter = false;
//     }
//     pokeDict[pokemon['i']] = {"name": pokemon['n'], 'show_filter': show_filter};
//   }

  firstRun();
  reloadPokestops();
  setInterval(function(){
    refreshPokestop();
  }, 1000);

  setInterval(function(){
    refreshMarker();
  }, 1000);


  setInterval(function(){
    reloadPokestops();
  }, 30 * 1000);
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function checkPrivateSafari() {
  try { localStorage.test = 2; } catch (e) {
    alert("NYCPokeMap doesn't work in private browsing mode. Please switch it off.");
  }
}

function shouldShowTimers() {
  return false;
  return (map.getZoom() >= 14 || markers.length <= 15);
}

function updateFilterLabel() {
  var userSettings = localStorage.getItem('filterOff');
  if (userSettings == '1') {
    $('#filter_settings_center a').html('Filter Off');
  }
  else {
    $('#filter_settings_center a').html('Filter On');
  }
}

function filterToastClicked() {
  openFilter();
}

function showFilterToast() {
  toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-bottom-center",
    "preventDuplicates": false,
    "onclick": filterToastClicked,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "20000",
    "extendedTimeOut": "20000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  }

  if (localStorage.getItem('openRaidFilter') != "1") {
    toastr.info("Use the filter to see more eggs/bosses.");
  }
}

function donateToastClicked() {
  localStorage.setItem('donatePerkToastClick', '1');
  document.location = "donate.html";
}

function showDonatePerkToast() {
  toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-bottom-center",
    "preventDuplicates": false,
    "onclick": donateToastClicked,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "20000",
    "extendedTimeOut": "20000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  }

  toastr.info("Perk for donators: personalized notification bot!");
}

function filterPokestopMapToastClicked() {
  localStorage.setItem('openPokestopFilter', '1');
  openFilter();
}

function showFilterQuestMapToast() {
  toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-bottom-center",
    "preventDuplicates": false,
    "onclick": filterPokestopMapToastClicked,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "20000",
    "extendedTimeOut": "20000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  }

  toastr.info("Use Filter to find more invasions!");
}

function openFilter() {
  $('#filter').css('display', 'block');
  localStorage.setItem('openPokestopFilter', '1');
}

function initMap() {
  $(document).ready(function() {
    // localStorage.setItem('raidToastClick', '1');
    $('#map').css('top', '40px');
    $('#map').css('bottom', '0px');

    // document.getElementById('checkbox_invasion_grunt').nextSibling.childNodes[1].nodeValue = ' Snorlax';
    // document.getElementById('checkbox_invasion_ice').nextSibling.childNodes[0].src = document.getElementById('checkbox_invasion_grunt').nextSibling.childNodes[0].src;
    // document.getElementById('checkbox_invasion_ice').nextSibling.childNodes[1].nodeValue = ' Kanto';

    var zoomLevel = 11;
    if (window.mobilecheck()) {
      zoomLevel = 10;
    }

    if (window.location.hash != "") {
      var hash = window.location.hash.substr(1);

      var array = hash.split(",");

      if (array.length == 2) {
        var hashLat = parseFloat(array[0]);
        var hashLng = parseFloat(array[1]);

        hashPokemonLat = hashLat;
        hashPokemonLng = hashLng;

        mapCenter = [hashLat, hashLng];
        zoomLevel = 15;
      }
    }

    map = L.map('map').setView(mapCenter, zoomLevel);

    checkPrivateSafari();
    updateFilterLabel();
    loadPokemonList();

    $('#close_donation_button a').bind('click', function() {
      $('#overlay').hide();
      return false;
    });
    $('#donate_button a').bind('click', function() {
      $('#overlay').hide();
    });

    map.on('popupclose', function() {
      selectedMarker = null;
    });

    map.on("movestart", function(event) {
      shouldUpdate = false;
    });
    map.on("moveend", function(event) {
      shouldUpdate = true;
      if (shouldTurnFilterOff()) {
        inserted = 0;
        // reloadPokestops();
      }
    });
    map.on("dragstart", function(event) {
      shouldUpdate = false;
    });
    map.on("dragend", function(event) {
      shouldUpdate = true;
      if (shouldTurnFilterOff()) {
        inserted = 0;
        // reloadPokestops();
      }
    });
    map.on("zoomstart", function(event) {
      shouldUpdate = false;
    });
    map.on('zoomend', function() {
      shouldUpdate = true;
      //refreshQuests();
      if (shouldShowTimers()) {
        $('.pokemon_icon_timer').css('display', 'block');
      }
      else {
        $('.pokemon_icon_timer').css('display', 'none');
      }
      if (shouldTurnFilterOff()) {
        inserted = 0;
        // reloadPokestops();
      }

      // if (shouldShowFilterLabel()) {
      //   $('#filter_settings').fadeIn();
      // }
      // else {
      $('#filter_settings').fadeOut();
      // }
    });

    $('#filter_settings_center a').bind('click', function() {
      var nextFilter = '';
      var text = '';
      if (localStorage.getItem('filterOff') == '1') {
        nextFilter = '0';
        text = 'Filter On';
      }
      else {
        nextFilter = '1';
        text = 'Filter Off';
      }
      localStorage.setItem('filterOff', nextFilter);
      $(this).html(text);

      if (nextFilter == '1') {
        // reloadPokestops();
      }
      return false;
    });

    let tilesServer = 'https://api.mapbox.com/styles/v1/jonathansculley/ck2e4boyw20l21cphp91ln4xx/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoiam9uYXRoYW5zY3VsbGV5IiwiYSI6ImhZa2xhM2sifQ._e0HJ8mu3nPev5Kki06F3w';

    let mapAttribution = '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors';

    L.tileLayer(tilesServer, {
      maxZoom: 17,
      minZoom: 9,
      attribution: mapAttribution
    }).addTo(map);

    //check filter checked

    $('#filter_link').bind('click', function() {
      openFilter();
      ga('send', 'event', 'Filter', 'click');
      return false;
    });

    for (var i = 0; i < grunts.length; ++i) {
      var type = grunts[i].name;

      var isFilterCheck = isPokemonChecked(type);
      var cssId = "#checkbox_invasion_" + type;

      if (isFilterCheck) {
        $(cssId).prop('checked', true);
      }
    }

    $('.filter_checkbox input').bind("change", function(data) {
      if (this.checked) {
        checkPokemon(this.value);
      }
      else {
        uncheckPokemon(this.value);
      }
    });


    $('#close_btn').bind('click', function() {
      $('#filter').css('display', 'none');
      return false;
    });
  });
}