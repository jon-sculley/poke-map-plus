let EXPECTED_VERSIONS = {'nycpokemap.com':'ver632','sgpokemap.com':'ver659','vanpokemap.com':'ver638','sydneypogomap.com':'ver632'};
let MAP_CENTERS = {'nycpokemap.com':[40.696336,-73.923997],'sgpokemap.com':[1.3521,103.8198],'vanpokemap.com':[49.277877,-123.119785],'sydneypogomap.com':[-33.873906,151.200785]};

let version = document.currentScript.src.split('/').pop().split('?').pop();
let mapCenter = MAP_CENTERS[location.hostname];
if (version !== EXPECTED_VERSIONS[location.hostname]) {
  alert('Javascript file version has been updated: ' + document.currentScript.src.split('/').pop());
}

String.prototype.formatUnicorn = String.prototype.formatUnicorn ||
  function () {
    "use strict";
    var str = this.toString();
    if (arguments.length) {
      var t = typeof arguments[0];
      var key;
      var args = ("string" === t || "number" === t) ?
        Array.prototype.slice.call(arguments)
        : arguments[0];

      for (key in args) {
        str = str.replace(new RegExp("\\{" + key + "\\}", "gi"), args[key]);
      }
    }

    return str;
  };

var quests = [];
var all_quests = [];
var markers = [];
var infoWindows = [];
var pokeDict = {};
var pokeArray = [];
pokeArray = pokeArray.concat([{"i":"460","n":"Abomasnow","types":[12,15]},{"i":"63","n":"Abra","types":[14]},{"i":"359","n":"Absol","types":[17]},{"i":"617","n":"Accelgor","types":[7]},{"i":"142","n":"Aerodactyl","types":[6,3]},{"i":"306","n":"Aggron","types":[9,6]},{"i":"190","n":"Aipom","types":[1]},{"i":"65","n":"Alakazam","types":[14]},{"i":"594","n":"Alomomola","types":[11]},{"i":"334","n":"Altaria","types":[16,3]},{"i":"424","n":"Ambipom","types":[1]},{"i":"591","n":"Amoonguss","types":[12,4]},{"i":"181","n":"Ampharos","types":[13]},{"i":"347","n":"Anorith","types":[6,7]},{"i":"24","n":"Arbok","types":[4]},{"i":"59","n":"Arcanine","types":[10]},{"i":"493","n":"Arceus","types":[1]},{"i":"566","n":"Archen","types":[6,3]},{"i":"567","n":"Archeops","types":[6,3]},{"i":"168","n":"Ariados","types":[7,4]},{"i":"348","n":"Armaldo","types":[6,7]},{"i":"304","n":"Aron","types":[9,6]},{"i":"144","n":"Articuno","types":[15,3]},{"i":"531","n":"Audino","types":[1]},{"i":"610","n":"Axew","types":[16]},{"i":"482","n":"Azelf","types":[14]},{"i":"184","n":"Azumarill","types":[11,18]},{"i":"298","n":"Azurill","types":[1,18]},{"i":"371","n":"Bagon","types":[16]},{"i":"343","n":"Baltoy","types":[5,14]},{"i":"354","n":"Banette","types":[8]},{"i":"339","n":"Barboach","types":[11,5]},{"i":"550","n":"Basculin","types":[11]},{"i":"411","n":"Bastiodon","types":[6,9]},{"i":"153","n":"Bayleef","types":[12]},{"i":"614","n":"Beartic","types":[15]},{"i":"267","n":"Beautifly","types":[7,3]},{"i":"15","n":"Beedrill","types":[7,4]},{"i":"606","n":"Beheeyem","types":[14]},{"i":"374","n":"Beldum","types":[9,14]},{"i":"182","n":"Bellossom","types":[12]},{"i":"69","n":"Bellsprout","types":[12,4]},{"i":"400","n":"Bibarel","types":[1,11]},{"i":"399","n":"Bidoof","types":[1]},{"i":"625","n":"Bisharp","types":[17,9]},{"i":"9","n":"Blastoise","types":[11]},{"i":"257","n":"Blaziken","types":[10,2]},{"i":"242","n":"Blissey","types":[1]},{"i":"522","n":"Blitzle","types":[13]},{"i":"525","n":"Boldore","types":[6]},{"i":"438","n":"Bonsly","types":[6]},{"i":"626","n":"Bouffalant","types":[1]},{"i":"628","n":"Braviary","types":[1,3]},{"i":"286","n":"Breloom","types":[12,2]},{"i":"437","n":"Bronzong","types":[9,14]},{"i":"436","n":"Bronzor","types":[9,14]},{"i":"406","n":"Budew","types":[12,4]},{"i":"418","n":"Buizel","types":[11]},{"i":"1","n":"Bulbasaur","types":[12,4]},{"i":"427","n":"Buneary","types":[1]},{"i":"412","n":"Burmy","types":[7]},{"i":"12","n":"Butterfree","types":[7,3]},{"i":"331","n":"Cacnea","types":[12]},{"i":"332","n":"Cacturne","types":[12,17]}]);

pokeArray = pokeArray.concat([{"i":"323","n":"Camerupt","types":[10,5]},{"i":"455","n":"Carnivine","types":[12]},{"i":"565","n":"Carracosta","types":[11,6]},{"i":"318","n":"Carvanha","types":[11,17]},{"i":"268","n":"Cascoon","types":[7]},{"i":"351","n":"Castform","types":[1]},{"i":"10","n":"Caterpie","types":[7]},{"i":"251","n":"Celebi","types":[14,12]},{"i":"609","n":"Chandelure","types":[8,10]},{"i":"113","n":"Chansey","types":[1]},{"i":"6","n":"Charizard","types":[10,3]},{"i":"4","n":"Charmander","types":[10]},{"i":"5","n":"Charmeleon","types":[10]},{"i":"441","n":"Chatot","types":[1,3]},{"i":"421","n":"Cherrim","types":[12]},{"i":"420","n":"Cherubi","types":[12]},{"i":"152","n":"Chikorita","types":[12]},{"i":"390","n":"Chimchar","types":[10]},{"i":"358","n":"Chimecho","types":[14]},{"i":"170","n":"Chinchou","types":[11,13]},{"i":"433","n":"Chingling","types":[14]},{"i":"573","n":"Cinccino","types":[1]},{"i":"366","n":"Clamperl","types":[11]},{"i":"344","n":"Claydol","types":[5,14]},{"i":"36","n":"Clefable","types":[18]},{"i":"35","n":"Clefairy","types":[18]},{"i":"173","n":"Cleffa","types":[18]},{"i":"91","n":"Cloyster","types":[11,15]},{"i":"638","n":"Cobalion","types":[9,2]},{"i":"563","n":"Cofagrigus","types":[8]},{"i":"415","n":"Combee","types":[7,3]},{"i":"256","n":"Combusken","types":[10,2]},{"i":"534","n":"Conkeldurr","types":[2]},{"i":"341","n":"Corphish","types":[11]},{"i":"222","n":"Corsola","types":[11,6]},{"i":"546","n":"Cottonee","types":[12,18]},{"i":"346","n":"Cradily","types":[6,12]},{"i":"408","n":"Cranidos","types":[6]},{"i":"342","n":"Crawdaunt","types":[11,17]},{"i":"488","n":"Cresselia","types":[14]},{"i":"453","n":"Croagunk","types":[4,2]},{"i":"169","n":"Crobat","types":[4,3]},{"i":"159","n":"Croconaw","types":[11]},{"i":"558","n":"Crustle","types":[7,6]},{"i":"615","n":"Cryogonal","types":[15]},{"i":"613","n":"Cubchoo","types":[15]},{"i":"104","n":"Cubone","types":[5]},{"i":"155","n":"Cyndaquil","types":[10]},{"i":"491","n":"Darkrai","types":[17]},{"i":"555","n":"Darmanitan","types":[10]},{"i":"554","n":"Darumaka","types":[10]},{"i":"585","n":"Deerling","types":[1,12]},{"i":"633","n":"Deino","types":[17,16]},{"i":"301","n":"Delcatty","types":[1]},{"i":"225","n":"Delibird","types":[15,3]},{"i":"386","n":"Deoxys","types":[14]},{"i":"87","n":"Dewgong","types":[11,15]},{"i":"502","n":"Dewott","types":[11]},{"i":"483","n":"Dialga","types":[9,16]},{"i":"50","n":"Diglett","types":[5]},{"i":"132","n":"Ditto","types":[1]},{"i":"85","n":"Dodrio","types":[1,3]},{"i":"84","n":"Doduo","types":[1,3]},{"i":"232","n":"Donphan","types":[5]}]);

pokeArray = pokeArray.concat([{"i":"148","n":"Dragonair","types":[16]},{"i":"149","n":"Dragonite","types":[16,3]},{"i":"452","n":"Drapion","types":[4,17]},{"i":"147","n":"Dratini","types":[16]},{"i":"426","n":"Drifblim","types":[8,3]},{"i":"425","n":"Drifloon","types":[8,3]},{"i":"529","n":"Drilbur","types":[5]},{"i":"96","n":"Drowzee","types":[14]},{"i":"621","n":"Druddigon","types":[16]},{"i":"580","n":"Ducklett","types":[11,3]},{"i":"51","n":"Dugtrio","types":[5]},{"i":"206","n":"Dunsparce","types":[1]},{"i":"578","n":"Duosion","types":[14]},{"i":"632","n":"Durant","types":[7,9]},{"i":"356","n":"Dusclops","types":[8]},{"i":"477","n":"Dusknoir","types":[8]},{"i":"355","n":"Duskull","types":[8]},{"i":"269","n":"Dustox","types":[7,4]},{"i":"557","n":"Dwebble","types":[7,6]},{"i":"603","n":"Eelektrik","types":[13]},{"i":"604","n":"Eelektross","types":[13]},{"i":"133","n":"Eevee","types":[1]},{"i":"23","n":"Ekans","types":[4]},{"i":"125","n":"Electabuzz","types":[13]},{"i":"466","n":"Electivire","types":[13]},{"i":"309","n":"Electrike","types":[13]},{"i":"101","n":"Electrode","types":[13]},{"i":"239","n":"Elekid","types":[13]},{"i":"605","n":"Elgyem","types":[14]},{"i":"500","n":"Emboar","types":[10,2]},{"i":"587","n":"Emolga","types":[13,3]},{"i":"395","n":"Empoleon","types":[11,9]},{"i":"244","n":"Entei","types":[10]},{"i":"589","n":"Escavalier","types":[7,9]},{"i":"196","n":"Espeon","types":[14]},{"i":"530","n":"Excadrill","types":[5,9]},{"i":"102","n":"Exeggcute","types":[12,14]},{"i":"103","n":"Exeggutor","types":[12,14]},{"i":"295","n":"Exploud","types":[1]},{"i":"83","n":"Farfetch'd","types":[1,3]},{"i":"22","n":"Fearow","types":[1,3]},{"i":"349","n":"Feebas","types":[11]},{"i":"160","n":"Feraligatr","types":[11]},{"i":"597","n":"Ferroseed","types":[12,9]},{"i":"598","n":"Ferrothorn","types":[12,9]},{"i":"456","n":"Finneon","types":[11]},{"i":"180","n":"Flaaffy","types":[13]},{"i":"136","n":"Flareon","types":[10]},{"i":"419","n":"Floatzel","types":[11]},{"i":"330","n":"Flygon","types":[5,16]},{"i":"590","n":"Foongus","types":[12,4]},{"i":"205","n":"Forretress","types":[7,9]},{"i":"611","n":"Fraxure","types":[16]},{"i":"592","n":"Frillish","types":[11,8]},{"i":"478","n":"Froslass","types":[15,8]},{"i":"162","n":"Furret","types":[1]},{"i":"444","n":"Gabite","types":[16,5]},{"i":"475","n":"Gallade","types":[14,2]},{"i":"596","n":"Galvantula","types":[7,13]},{"i":"569","n":"Garbodor","types":[4]},{"i":"445","n":"Garchomp","types":[16,5]},{"i":"282","n":"Gardevoir","types":[14,18]},{"i":"92","n":"Gastly","types":[8,4]},{"i":"423","n":"Gastrodon","types":[11,5]}]);

pokeArray = pokeArray.concat([{"i":"649","n":"Genesect","types":[7,9]},{"i":"94","n":"Gengar","types":[8,4]},{"i":"74","n":"Geodude","types":[6,5]},{"i":"443","n":"Gible","types":[16,5]},{"i":"526","n":"Gigalith","types":[6]},{"i":"203","n":"Girafarig","types":[1,14]},{"i":"487","n":"Giratina","types":[8,16]},{"i":"471","n":"Glaceon","types":[15]},{"i":"362","n":"Glalie","types":[15]},{"i":"431","n":"Glameow","types":[1]},{"i":"207","n":"Gligar","types":[5,3]},{"i":"472","n":"Gliscor","types":[5,3]},{"i":"44","n":"Gloom","types":[12,4]},{"i":"42","n":"Golbat","types":[4,3]},{"i":"118","n":"Goldeen","types":[11]},{"i":"55","n":"Golduck","types":[11]},{"i":"76","n":"Golem","types":[6,5]},{"i":"622","n":"Golett","types":[5,8]},{"i":"623","n":"Golurk","types":[5,8]},{"i":"368","n":"Gorebyss","types":[11]},{"i":"574","n":"Gothita","types":[14]},{"i":"576","n":"Gothitelle","types":[14]},{"i":"575","n":"Gothorita","types":[14]},{"i":"210","n":"Granbull","types":[18]},{"i":"75","n":"Graveler","types":[6,5]},{"i":"88","n":"Grimer","types":[4]},{"i":"388","n":"Grotle","types":[12]},{"i":"383","n":"Groudon","types":[5]},{"i":"253","n":"Grovyle","types":[12]},{"i":"58","n":"Growlithe","types":[10]},{"i":"326","n":"Grumpig","types":[14]},{"i":"316","n":"Gulpin","types":[4]},{"i":"533","n":"Gurdurr","types":[2]},{"i":"130","n":"Gyarados","types":[11,3]},{"i":"440","n":"Happiny","types":[1]},{"i":"297","n":"Hariyama","types":[2]},{"i":"93","n":"Haunter","types":[8,4]},{"i":"612","n":"Haxorus","types":[16]},{"i":"631","n":"Heatmor","types":[10]},{"i":"485","n":"Heatran","types":[10,9]},{"i":"214","n":"Heracross","types":[7,2]},{"i":"507","n":"Herdier","types":[1]},{"i":"449","n":"Hippopotas","types":[5]},{"i":"450","n":"Hippowdon","types":[5]},{"i":"107","n":"Hitmonchan","types":[2]},{"i":"106","n":"Hitmonlee","types":[2]},{"i":"237","n":"Hitmontop","types":[2]},{"i":"250","n":"Ho-Oh","types":[10,3]},{"i":"430","n":"Honchkrow","types":[17,3]},{"i":"163","n":"Hoothoot","types":[1,3]},{"i":"187","n":"Hoppip","types":[12,3]},{"i":"116","n":"Horsea","types":[11]},{"i":"229","n":"Houndoom","types":[17,10]},{"i":"228","n":"Houndour","types":[17,10]},{"i":"367","n":"Huntail","types":[11]},{"i":"635","n":"Hydreigon","types":[17,16]},{"i":"97","n":"Hypno","types":[14]},{"i":"174","n":"Igglybuff","types":[1,18]},{"i":"314","n":"Illumise","types":[7]},{"i":"392","n":"Infernape","types":[10,2]},{"i":"2","n":"Ivysaur","types":[12,4]},{"i":"593","n":"Jellicent","types":[11,8]},{"i":"39","n":"Jigglypuff","types":[1,18]},{"i":"385","n":"Jirachi","types":[9,14]}]);

pokeArray = pokeArray.concat([{"i":"135","n":"Jolteon","types":[13]},{"i":"595","n":"Joltik","types":[7,13]},{"i":"189","n":"Jumpluff","types":[12,3]},{"i":"124","n":"Jynx","types":[15,14]},{"i":"140","n":"Kabuto","types":[6,11]},{"i":"141","n":"Kabutops","types":[6,11]},{"i":"64","n":"Kadabra","types":[14]},{"i":"14","n":"Kakuna","types":[7,4]},{"i":"115","n":"Kangaskhan","types":[1]},{"i":"588","n":"Karrablast","types":[7]},{"i":"352","n":"Kecleon","types":[1]},{"i":"647","n":"Keldeo","types":[11,2]},{"i":"230","n":"Kingdra","types":[11,16]},{"i":"99","n":"Kingler","types":[11]},{"i":"281","n":"Kirlia","types":[14,18]},{"i":"600","n":"Klang","types":[9]},{"i":"599","n":"Klink","types":[9]},{"i":"601","n":"Klinklang","types":[9]},{"i":"109","n":"Koffing","types":[4]},{"i":"98","n":"Krabby","types":[11]},{"i":"401","n":"Kricketot","types":[7]},{"i":"402","n":"Kricketune","types":[7]},{"i":"552","n":"Krokorok","types":[5,17]},{"i":"553","n":"Krookodile","types":[5,17]},{"i":"382","n":"Kyogre","types":[11]},{"i":"646","n":"Kyurem","types":[16,15]},{"i":"305","n":"Lairon","types":[9,6]},{"i":"608","n":"Lampent","types":[8,10]},{"i":"645","n":"Landorus","types":[5,3]},{"i":"171","n":"Lanturn","types":[11,13]},{"i":"131","n":"Lapras","types":[11,15]},{"i":"636","n":"Larvesta","types":[7,10]},{"i":"246","n":"Larvitar","types":[6,5]},{"i":"380","n":"Latias","types":[16,14]},{"i":"381","n":"Latios","types":[16,14]},{"i":"470","n":"Leafeon","types":[12]},{"i":"542","n":"Leavanny","types":[7,12]},{"i":"166","n":"Ledian","types":[7,3]},{"i":"165","n":"Ledyba","types":[7,3]},{"i":"463","n":"Lickilicky","types":[1]},{"i":"108","n":"Lickitung","types":[1]},{"i":"510","n":"Liepard","types":[17]},{"i":"345","n":"Lileep","types":[6,12]},{"i":"549","n":"Lilligant","types":[12]},{"i":"506","n":"Lillipup","types":[1]},{"i":"264","n":"Linoone","types":[1]},{"i":"607","n":"Litwick","types":[8,10]},{"i":"271","n":"Lombre","types":[11,12]},{"i":"428","n":"Lopunny","types":[1]},{"i":"270","n":"Lotad","types":[11,12]},{"i":"294","n":"Loudred","types":[1]},{"i":"448","n":"Lucario","types":[2,9]},{"i":"272","n":"Ludicolo","types":[11,12]},{"i":"249","n":"Lugia","types":[14,3]},{"i":"457","n":"Lumineon","types":[11]},{"i":"337","n":"Lunatone","types":[6,14]},{"i":"370","n":"Luvdisc","types":[11]},{"i":"404","n":"Luxio","types":[13]},{"i":"405","n":"Luxray","types":[13]},{"i":"68","n":"Machamp","types":[2]},{"i":"67","n":"Machoke","types":[2]},{"i":"66","n":"Machop","types":[2]},{"i":"240","n":"Magby","types":[10]},{"i":"219","n":"Magcargo","types":[10,6]}]);

pokeArray = pokeArray.concat([{"i":"129","n":"Magikarp","types":[11]},{"i":"126","n":"Magmar","types":[10]},{"i":"467","n":"Magmortar","types":[10]},{"i":"81","n":"Magnemite","types":[13,9]},{"i":"82","n":"Magneton","types":[13,9]},{"i":"462","n":"Magnezone","types":[13,9]},{"i":"296","n":"Makuhita","types":[2]},{"i":"473","n":"Mamoswine","types":[15,5]},{"i":"490","n":"Manaphy","types":[11]},{"i":"630","n":"Mandibuzz","types":[17,3]},{"i":"310","n":"Manectric","types":[13]},{"i":"56","n":"Mankey","types":[2]},{"i":"226","n":"Mantine","types":[11,3]},{"i":"458","n":"Mantyke","types":[11,3]},{"i":"556","n":"Maractus","types":[12]},{"i":"179","n":"Mareep","types":[13]},{"i":"183","n":"Marill","types":[11,18]},{"i":"105","n":"Marowak","types":[5]},{"i":"259","n":"Marshtomp","types":[11,5]},{"i":"284","n":"Masquerain","types":[7,3]},{"i":"303","n":"Mawile","types":[9,18]},{"i":"308","n":"Medicham","types":[2,14]},{"i":"307","n":"Meditite","types":[2,14]},{"i":"154","n":"Meganium","types":[12]},{"i":"648","n":"Meloetta","types":[1,14]},{"i":"52","n":"Meowth","types":[1]},{"i":"481","n":"Mesprit","types":[14]},{"i":"376","n":"Metagross","types":[9,14]},{"i":"375","n":"Metang","types":[9,14]},{"i":"11","n":"Metapod","types":[7]},{"i":"151","n":"Mew","types":[14]},{"i":"150","n":"Mewtwo","types":[14]},{"i":"619","n":"Mienfoo","types":[2]},{"i":"620","n":"Mienshao","types":[2]},{"i":"262","n":"Mightyena","types":[17]},{"i":"350","n":"Milotic","types":[11]},{"i":"241","n":"Miltank","types":[1]},{"i":"439","n":"Mime-jr","types":[14,18]},{"i":"572","n":"Minccino","types":[1]},{"i":"312","n":"Minun","types":[13]},{"i":"200","n":"Misdreavus","types":[8]},{"i":"429","n":"Mismagius","types":[8]},{"i":"146","n":"Moltres","types":[10,3]},{"i":"391","n":"Monferno","types":[10,2]},{"i":"414","n":"Mothim","types":[7,3]},{"i":"122","n":"Mr. Mime","types":[14,18]},{"i":"258","n":"Mudkip","types":[11]},{"i":"89","n":"Muk","types":[4]},{"i":"446","n":"Munchlax","types":[1]},{"i":"517","n":"Munna","types":[14]},{"i":"198","n":"Murkrow","types":[17,3]},{"i":"518","n":"Musharna","types":[14]},{"i":"177","n":"Natu","types":[14,3]},{"i":"34","n":"Nidoking","types":[4,5]},{"i":"31","n":"Nidoqueen","types":[4,5]},{"i":"29","n":"Nidoran♀","types":[4]},{"i":"32","n":"Nidoran♂","types":[4]},{"i":"30","n":"Nidorina","types":[4]},{"i":"33","n":"Nidorino","types":[4]},{"i":"290","n":"Nincada","types":[7,5]},{"i":"38","n":"Ninetales","types":[10]},{"i":"291","n":"Ninjask","types":[7,3]},{"i":"164","n":"Noctowl","types":[1,3]},{"i":"299","n":"Nosepass","types":[6]}]);

pokeArray = pokeArray.concat([{"i":"322","n":"Numel","types":[10,5]},{"i":"274","n":"Nuzleaf","types":[12,17]},{"i":"224","n":"Octillery","types":[11]},{"i":"43","n":"Oddish","types":[12,4]},{"i":"138","n":"Omanyte","types":[6,11]},{"i":"139","n":"Omastar","types":[6,11]},{"i":"95","n":"Onix","types":[6,5]},{"i":"501","n":"Oshawott","types":[11]},{"i":"417","n":"Pachirisu","types":[13]},{"i":"484","n":"Palkia","types":[11,16]},{"i":"536","n":"Palpitoad","types":[11,5]},{"i":"515","n":"Panpour","types":[11]},{"i":"511","n":"Pansage","types":[12]},{"i":"513","n":"Pansear","types":[10]},{"i":"46","n":"Paras","types":[7,12]},{"i":"47","n":"Parasect","types":[7,12]},{"i":"504","n":"Patrat","types":[1]},{"i":"624","n":"Pawniard","types":[17,9]},{"i":"279","n":"Pelipper","types":[11,3]},{"i":"53","n":"Persian","types":[1]},{"i":"548","n":"Petilil","types":[12]},{"i":"231","n":"Phanpy","types":[5]},{"i":"489","n":"Phione","types":[11]},{"i":"172","n":"Pichu","types":[13]},{"i":"18","n":"Pidgeot","types":[1,3]},{"i":"17","n":"Pidgeotto","types":[1,3]},{"i":"16","n":"Pidgey","types":[1,3]},{"i":"519","n":"Pidove","types":[1,3]},{"i":"499","n":"Pignite","types":[10,2]},{"i":"25","n":"Pikachu","types":[13]},{"i":"221","n":"Piloswine","types":[15,5]},{"i":"204","n":"Pineco","types":[7]},{"i":"127","n":"Pinsir","types":[7]},{"i":"393","n":"Piplup","types":[11]},{"i":"311","n":"Plusle","types":[13]},{"i":"186","n":"Politoed","types":[11]},{"i":"60","n":"Poliwag","types":[11]},{"i":"61","n":"Poliwhirl","types":[11]},{"i":"62","n":"Poliwrath","types":[11,2]},{"i":"77","n":"Ponyta","types":[10]},{"i":"261","n":"Poochyena","types":[17]},{"i":"137","n":"Porygon","types":[1]},{"i":"474","n":"Porygon-z","types":[1]},{"i":"233","n":"Porygon2","types":[1]},{"i":"57","n":"Primeape","types":[2]},{"i":"394","n":"Prinplup","types":[11]},{"i":"476","n":"Probopass","types":[6,9]},{"i":"54","n":"Psyduck","types":[11]},{"i":"247","n":"Pupitar","types":[6,5]},{"i":"509","n":"Purrloin","types":[17]},{"i":"432","n":"Purugly","types":[1]},{"i":"195","n":"Quagsire","types":[11,5]},{"i":"156","n":"Quilava","types":[10]},{"i":"211","n":"Qwilfish","types":[11,4]},{"i":"26","n":"Raichu","types":[13]},{"i":"243","n":"Raikou","types":[13]},{"i":"280","n":"Ralts","types":[14,18]},{"i":"409","n":"Rampardos","types":[6]},{"i":"78","n":"Rapidash","types":[10]},{"i":"20","n":"Raticate","types":[1]},{"i":"19","n":"Rattata","types":[1]},{"i":"384","n":"Rayquaza","types":[16,3]},{"i":"378","n":"Regice","types":[15]},{"i":"486","n":"Regigigas","types":[1]}]);

pokeArray = pokeArray.concat([{"i":"377","n":"Regirock","types":[6]},{"i":"379","n":"Registeel","types":[9]},{"i":"369","n":"Relicanth","types":[11,6]},{"i":"223","n":"Remoraid","types":[11]},{"i":"643","n":"Reshiram","types":[16,10]},{"i":"579","n":"Reuniclus","types":[14]},{"i":"112","n":"Rhydon","types":[5,6]},{"i":"111","n":"Rhyhorn","types":[5,6]},{"i":"464","n":"Rhyperior","types":[5,6]},{"i":"447","n":"Riolu","types":[2]},{"i":"524","n":"Roggenrola","types":[6]},{"i":"315","n":"Roselia","types":[12,4]},{"i":"407","n":"Roserade","types":[12,4]},{"i":"479","n":"Rotom","types":[13,8]},{"i":"627","n":"Rufflet","types":[1,3]},{"i":"302","n":"Sableye","types":[17,8]},{"i":"373","n":"Salamence","types":[16,3]},{"i":"503","n":"Samurott","types":[11]},{"i":"551","n":"Sandile","types":[5,17]},{"i":"27","n":"Sandshrew","types":[5]},{"i":"28","n":"Sandslash","types":[5]},{"i":"539","n":"Sawk","types":[2]},{"i":"586","n":"Sawsbuck","types":[1,12]},{"i":"254","n":"Sceptile","types":[12]},{"i":"212","n":"Scizor","types":[7,9]},{"i":"545","n":"Scolipede","types":[7,4]},{"i":"560","n":"Scrafty","types":[17,2]},{"i":"559","n":"Scraggy","types":[17,2]},{"i":"123","n":"Scyther","types":[7,3]},{"i":"117","n":"Seadra","types":[11]},{"i":"119","n":"Seaking","types":[11]},{"i":"364","n":"Sealeo","types":[15,11]},{"i":"273","n":"Seedot","types":[12]},{"i":"86","n":"Seel","types":[11]},{"i":"537","n":"Seismitoad","types":[11,5]},{"i":"161","n":"Sentret","types":[1]},{"i":"497","n":"Serperior","types":[12]},{"i":"496","n":"Servine","types":[12]},{"i":"336","n":"Seviper","types":[4]},{"i":"540","n":"Sewaddle","types":[7,12]},{"i":"319","n":"Sharpedo","types":[11,17]},{"i":"492","n":"Shaymin","types":[12]},{"i":"292","n":"Shedinja","types":[7,8]},{"i":"372","n":"Shelgon","types":[16]},{"i":"90","n":"Shellder","types":[11]},{"i":"422","n":"Shellos","types":[11]},{"i":"616","n":"Shelmet","types":[7]},{"i":"410","n":"Shieldon","types":[6,9]},{"i":"275","n":"Shiftry","types":[12,17]},{"i":"403","n":"Shinx","types":[13]},{"i":"285","n":"Shroomish","types":[12]},{"i":"213","n":"Shuckle","types":[7,6]},{"i":"353","n":"Shuppet","types":[8]},{"i":"561","n":"Sigilyph","types":[14,3]},{"i":"266","n":"Silcoon","types":[7]},{"i":"516","n":"Simipour","types":[11]},{"i":"512","n":"Simisage","types":[12]},{"i":"514","n":"Simisear","types":[10]},{"i":"227","n":"Skarmory","types":[9,3]},{"i":"188","n":"Skiploom","types":[12,3]},{"i":"300","n":"Skitty","types":[1]},{"i":"451","n":"Skorupi","types":[4,7]},{"i":"435","n":"Skuntank","types":[4,17]},{"i":"289","n":"Slaking","types":[1]}]);

pokeArray = pokeArray.concat([{"i":"287","n":"Slakoth","types":[1]},{"i":"80","n":"Slowbro","types":[11,14]},{"i":"199","n":"Slowking","types":[11,14]},{"i":"79","n":"Slowpoke","types":[11,14]},{"i":"218","n":"Slugma","types":[10]},{"i":"235","n":"Smeargle","types":[1]},{"i":"238","n":"Smoochum","types":[15,14]},{"i":"215","n":"Sneasel","types":[17,15]},{"i":"495","n":"Snivy","types":[12]},{"i":"143","n":"Snorlax","types":[1]},{"i":"361","n":"Snorunt","types":[15]},{"i":"459","n":"Snover","types":[12,15]},{"i":"209","n":"Snubbull","types":[18]},{"i":"577","n":"Solosis","types":[14]},{"i":"338","n":"Solrock","types":[6,14]},{"i":"21","n":"Spearow","types":[1,3]},{"i":"363","n":"Spheal","types":[15,11]},{"i":"167","n":"Spinarak","types":[7,4]},{"i":"327","n":"Spinda","types":[1]},{"i":"442","n":"Spiritomb","types":[8,17]},{"i":"325","n":"Spoink","types":[14]},{"i":"7","n":"Squirtle","types":[11]},{"i":"234","n":"Stantler","types":[1]},{"i":"398","n":"Staraptor","types":[1,3]},{"i":"397","n":"Staravia","types":[1,3]},{"i":"396","n":"Starly","types":[1,3]},{"i":"121","n":"Starmie","types":[11,14]},{"i":"120","n":"Staryu","types":[11]},{"i":"208","n":"Steelix","types":[9,5]},{"i":"508","n":"Stoutland","types":[1]},{"i":"618","n":"Stunfisk","types":[5,13]},{"i":"434","n":"Stunky","types":[4,17]},{"i":"185","n":"Sudowoodo","types":[6]},{"i":"245","n":"Suicune","types":[11]},{"i":"192","n":"Sunflora","types":[12]},{"i":"191","n":"Sunkern","types":[12]},{"i":"283","n":"Surskit","types":[7,11]},{"i":"333","n":"Swablu","types":[1,3]},{"i":"541","n":"Swadloon","types":[7,12]},{"i":"317","n":"Swalot","types":[4]},{"i":"260","n":"Swampert","types":[11,5]},{"i":"581","n":"Swanna","types":[11,3]},{"i":"277","n":"Swellow","types":[1,3]},{"i":"220","n":"Swinub","types":[15,5]},{"i":"528","n":"Swoobat","types":[14,3]},{"i":"276","n":"Taillow","types":[1,3]},{"i":"114","n":"Tangela","types":[12]},{"i":"465","n":"Tangrowth","types":[12]},{"i":"128","n":"Tauros","types":[1]},{"i":"216","n":"Teddiursa","types":[1]},{"i":"72","n":"Tentacool","types":[11,4]},{"i":"73","n":"Tentacruel","types":[11,4]},{"i":"498","n":"Tepig","types":[10]},{"i":"639","n":"Terrakion","types":[6,2]},{"i":"538","n":"Throh","types":[2]},{"i":"642","n":"Thundurus","types":[13,3]},{"i":"532","n":"Timburr","types":[2]},{"i":"564","n":"Tirtouga","types":[11,6]},{"i":"468","n":"Togekiss","types":[18,3]},{"i":"175","n":"Togepi","types":[18]},{"i":"176","n":"Togetic","types":[18,3]},{"i":"255","n":"Torchic","types":[10]},{"i":"324","n":"Torkoal","types":[10]},{"i":"641","n":"Tornadus","types":[3]}]);

pokeArray = pokeArray.concat([{"i":"389","n":"Torterra","types":[12,5]},{"i":"158","n":"Totodile","types":[11]},{"i":"454","n":"Toxicroak","types":[4,2]},{"i":"520","n":"Tranquill","types":[1,3]},{"i":"328","n":"Trapinch","types":[5]},{"i":"252","n":"Treecko","types":[12]},{"i":"357","n":"Tropius","types":[12,3]},{"i":"568","n":"Trubbish","types":[4]},{"i":"387","n":"Turtwig","types":[12]},{"i":"535","n":"Tympole","types":[11]},{"i":"602","n":"Tynamo","types":[13]},{"i":"157","n":"Typhlosion","types":[10]},{"i":"248","n":"Tyranitar","types":[6,17]},{"i":"236","n":"Tyrogue","types":[2]},{"i":"197","n":"Umbreon","types":[17]},{"i":"521","n":"Unfezant","types":[1,3]},{"i":"201","n":"Unown","types":[14]},{"i":"217","n":"Ursaring","types":[1]},{"i":"480","n":"Uxie","types":[14]},{"i":"583","n":"Vanillish","types":[15]},{"i":"582","n":"Vanillite","types":[15]},{"i":"584","n":"Vanilluxe","types":[15]},{"i":"134","n":"Vaporeon","types":[11]},{"i":"543","n":"Venipede","types":[7,4]},{"i":"49","n":"Venomoth","types":[7,4]},{"i":"48","n":"Venonat","types":[7,4]},{"i":"3","n":"Venusaur","types":[12,4]},{"i":"416","n":"Vespiquen","types":[7,3]},{"i":"329","n":"Vibrava","types":[5,16]},{"i":"494","n":"Victini","types":[14,10]},{"i":"71","n":"Victreebel","types":[12,4]},{"i":"288","n":"Vigoroth","types":[1]},{"i":"45","n":"Vileplume","types":[12,4]},{"i":"640","n":"Virizion","types":[12,2]},{"i":"313","n":"Volbeat","types":[7]},{"i":"637","n":"Volcarona","types":[7,10]},{"i":"100","n":"Voltorb","types":[13]},{"i":"629","n":"Vullaby","types":[17,3]},{"i":"37","n":"Vulpix","types":[10]},{"i":"320","n":"Wailmer","types":[11]},{"i":"321","n":"Wailord","types":[11]},{"i":"365","n":"Walrein","types":[15,11]},{"i":"8","n":"Wartortle","types":[11]},{"i":"505","n":"Watchog","types":[1]},{"i":"461","n":"Weavile","types":[17,15]},{"i":"13","n":"Weedle","types":[7,4]},{"i":"70","n":"Weepinbell","types":[12,4]},{"i":"110","n":"Weezing","types":[4]},{"i":"547","n":"Whimsicott","types":[12,18]},{"i":"544","n":"Whirlipede","types":[7,4]},{"i":"340","n":"Whiscash","types":[11,5]},{"i":"293","n":"Whismur","types":[1]},{"i":"40","n":"Wigglytuff","types":[1,18]},{"i":"278","n":"Wingull","types":[11,3]},{"i":"202","n":"Wobbuffet","types":[14]},{"i":"527","n":"Woobat","types":[14,3]},{"i":"194","n":"Wooper","types":[11,5]},{"i":"413","n":"Wormadam","types":[7,12]},{"i":"265","n":"Wurmple","types":[7]},{"i":"360","n":"Wynaut","types":[14]},{"i":"178","n":"Xatu","types":[14,3]},{"i":"562","n":"Yamask","types":[8]},{"i":"193","n":"Yanma","types":[7,3]},{"i":"469","n":"Yanmega","types":[7,3]},{"i":"335","n":"Zangoose","types":[1]},{"i":"145","n":"Zapdos","types":[13,3]},{"i":"523","n":"Zebstrika","types":[13]},{"i":"644","n":"Zekrom","types":[16,13]},{"i":"263","n":"Zigzagoon","types":[1]},{"i":"571","n":"Zoroark","types":[17]},{"i":"570","n":"Zorua","types":[17]},{"i":"41","n":"Zubat","types":[4,3]},{"i":"634","n":"Zweilous","types":[17,16]}]);

var itemDict = {
  "item1": "Poké Ball",
  "item2": "Great Ball",
  "item3": "Ultra Ball",
  "item4": "Master Ball",
  "item5": "Premier Ball",
  "item101": "Potion",
  "item102": "Super Potion",
  "item103": "Hyper Potion",
  "item104": "Max Potion",
  "item201": "Revive",
  "item202": "Max Revive",
  "item301": "Lucky Egg",
  "item401": "Incense Ordinary",
  "item402": "Incense Spicy",
  "item403": "Incense Cool",
  "item404": "Incense Floral",
  "item501": "Lure Module",
  "item602": "X Attack",
  "item603": "X Defense",
  "item604": "X Miracle",
  "item701": "Razz Berry",
  "item702": "Bluk Berry",
  "item703": "Nanab Berry",
  "item704": "Wepar Berry",
  "item705": "Pinap Berry",
  "item706": "Golden Razz Berry",
  "item707": "Golden Nanab Berry",
  "item708": "Silver Pinap Berry",
  "item902": "Egg Incubator",
  "item903": "Super Incubator",
  "item1001": "Pokémon Storage Upgrade",
  "item1002": "Item Storag Upgrade",
  "item1101": "Sun Stone",
  "item1102": "King's Rock",
  "item1103": "Metal Coat",
  "item1104": "Dragon Scale",
  "item1105": "Up-Grade",
  "item1201": "Fast TM",
  "item1202": "Charge TM",
  "item1301": "Rare Candy",
  "item1401": "Raid Pass",
  "item1402": "Premium Raid Pass",
  "item1403": "EX Raid Pass",
  "item1404": "Star Piece",
  "item1405": "Gift"
};

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

var hostNameArray = window.location.hostname.split('.');
var currentTopDomainName = hostNameArray.slice(hostNameArray.length - 2).join('.');

// let filter_quest = '';
// if (localStorage.getItem('filter_quest')) {
//   filter_quest = localStorage.getItem('filter_quest');
// }

let filter_sub_options = {};
let checkbox_sub_id_quest = {};
let checkbox_sub_id_reward = {};
let lastNewQuests = [];

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

function getAssetURL(quest) {
  if (quest.image.indexOf('pokemon') == -1) {
    return '/images/quest/' + quest.image + '.png?' + version;
  }
  else {
    var tmpArray =  quest.image.split('_');
    var pokemonId = tmpArray[tmpArray.length - 1];
    if (localStorage.getItem('icon'+pokemonId)) {
      return localStorage.getItem('icon'+pokemonId);
    }
    else {
      return '/images/poke_number/' + pokemonId + '.png?' + version;
    }
  }
  return "";
}

function questHTML(quest) {
  var assetURL = getAssetURL(quest);
  return "<div class='pokemon_icon'><img class='pokemon_icon_img' src='" + assetURL + "' /></div>";
}

function Quest(lat, lng, pokestop_name, rewards_string, conditions_string, image, expiration) {
  this.lat = lat;
  this.lng = lng;
  this.pokestop_name = pokestop_name;
  this.rewards_string = rewards_string;
  this.conditions_string = conditions_string;
  this.image = image;
  this.expiration = expiration;

  this.isEqual = function(quest) {
    return (
      this.lat == quest.lat &&
      this.lng == quest.lng &&
      this.pokestop_name == quest.pokestop_name
    );
  }
}

function locateMeButton() {
  shouldShowLocationError = true;
  map.locate({setView : true});
  map.on('locationfound', function (e) {
    shouldShowLocationError = false;
    if (!locationMarker) {
      var iconOptions = {
        iconUrl: 'images/your_location.png?' + version,
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

function refreshQuests() {
  if (!shouldUpdate) {
    return; //don't update when map is moving
  }

  var currentUnixTime = Math.floor(Date.now() / 1000) - timeOffset;

  for (var i = 0; i < quests.length; ++i) {
    var currentQuest = quests[i];
    var marker = markers[i];
    var shouldRemove = false;

    if (currentUnixTime > currentQuest.expiration) {
      shouldRemove = true;
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
      marker.bindPopup(infoWindowString(quests[index]));
    }
  }

  if (locationMarker) {
    map.locate();
  }
}

function indexOfQuest(quest, quests) {
  for (var i = 0; i < quests.length; ++i) {
    var currentQuest = quests[i];
    if (quest.isEqual(currentQuest)) {
      return i;
    }
  }
  return -1;
}

function string_to_id(str) {
  return str.trim().toLowerCase().replace(/é/g, 'e').replace(/[():]/g, '').replace(/ /g, '_');
}

function subfilter_pass(condition, reward) {
  var string = localStorage.getItem('questSubFilter');
  if (!string) {
    return false;
  }
  var currentFilter = JSON.parse(string);
  for (let i = 0; i < currentFilter.length; i++) {
    if (checkbox_sub_id_quest[currentFilter[i]] === condition && checkbox_sub_id_reward[currentFilter[i]] === reward) {
      return true;
    }
  }
  return false;
}

function processNewQuests(newQuests) {
  for (var i = 0; i < markers.length; ++i) {
    markers[i].removeFrom(map);
  }

  quests = [];
  all_quests = [];
  markers = [];

  for (var i = 0; i < newQuests.length; ++i) {
    var quest = new Quest(
      newQuests[i]['lat'],
      newQuests[i]['lng'],
      newQuests[i]['name'],
      newQuests[i]['rewards_string'],
      newQuests[i]['conditions_string'],
      newQuests[i]['image'],
      newQuests[i]['expiration']
    );

    if (!quest.pokestop_name) {
      quest.pokestop_name = "Unknown";
    }

    // if (!quest.conditions_string.toLowerCase().includes(filter_quest.toLowerCase())) {
    //   continue;
    // }

    var index = indexOfQuest(quest, quests);
    if (index == -1) {
      all_quests.push(quest);

      if (!subfilter_pass(quest.conditions_string, quest.rewards_string)) {
        continue;
      }

      quests.push(quest);

      var markerLocation = new L.LatLng(quest.lat, quest.lng);

      var iconDimension = 36;
      var iconOptions = {
        iconSize: [iconDimension, iconDimension],
        iconAnchor: [iconDimension/2, iconDimension],
        popupAnchor: [0, -iconDimension],
        zIndexOffset: -1000,
        html : questHTML(quest)
      };
      var htmlIcon = new L.HtmlIcon(iconOptions);

      var marker = new L.Marker(markerLocation, {icon: htmlIcon});

      marker.addTo(map);

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
          selectedMarker.bindPopup(infoWindowString(quests[index]));
        }
      });
    }
  }
}

function processNewFilter(filterData) {
  let filterHTMLString = "<strong>Stardust:</strong> <br /><br />";

  var currentFilterString = localStorage.getItem('questFilter');

  if (!currentFilterString) {
    currentFilterString = '[]';
  }

  var currentFilter = JSON.parse(currentFilterString);

  var currentSubFilterString = localStorage.getItem('questSubFilter');

  if (!currentSubFilterString) {
    currentSubFilterString = '[]';
  }

  var currentSubFilter = JSON.parse(currentSubFilterString);

  let checkbox_group_ids = [];

  for (var i = 0; i < filterData.t3.length; ++i) {
    var valueString = "3,{amount},0".formatUnicorn({
      amount: filterData.t3[i]
    });

    var checkedString = "";
    if (currentFilter.indexOf(valueString) != -1) {
      checkedString = "checked";
    }

    let checkbox_group_id = 'checkbox_stardust_' + filterData.t3[i];
    if (!(checkbox_group_id in filter_sub_options)) {
      filter_sub_options[checkbox_group_id] = new Set();
    }

    filterHTMLString += '<div class="filter_checkbox">';
    filterHTMLString += ('<input {checkedString} id="{checkbox_group_id}" type="checkbox" value="{valueString}"><label for="{checkbox_group_id}"><img src="images/quest/quest_stardust.png?' + version + '" style="max-height: 10px"> {amount} </label>').formatUnicorn({
      amount: filterData.t3[i],
      valueString: valueString,
      checkedString: checkedString,
      checkbox_group_id: checkbox_group_id
    });

    let conditionsSet = new Set();
    let rewardsString = filterData.t3[i] + ' Stardust';
    for (let j = 0; j < all_quests.length; ++j) {
      if (all_quests[j]['rewards_string'] === rewardsString) {
        conditionsSet.add(all_quests[j]['conditions_string']);
      }
    }
    if (conditionsSet.size > 0) {
      filterHTMLString += '<ul style="list-style:none; margin-block-start:0em; padding-left:20px">';
      Array.from(conditionsSet).sort().forEach(function (value) {
        let id = checkbox_group_id + '_' + string_to_id(value);
        let checkedSubString = "";
        if (currentSubFilter.indexOf(id) != -1) {
          checkedSubString = "checked";
        }
        filterHTMLString += '<div><li><input ' + checkedSubString + ' type="checkbox" id=' + id + '><label for=' + id + ' style="font-size:0.7em;"> ' + value + '</label></li></div>';
        filter_sub_options[checkbox_group_id].add(id);
        checkbox_sub_id_quest[id] = value;
        checkbox_sub_id_reward[id] = rewardsString;
      });
      filterHTMLString += '</ul>';
      checkbox_group_ids.push(checkbox_group_id);
    }
    filterHTMLString += '</div>';
  }

  filterHTMLString += "<strong>Pokémon Encounter:</strong> <br /><br />";

  for (var i = 0; i < filterData.t7.length; ++i) {

    var reward = filterData.t7[i];

    var valueString = "7,0,{reward}".formatUnicorn({
      reward: reward
    });

    var checkedString = "";
    if (currentFilter.indexOf(valueString) != -1) {
      checkedString = "checked";
    }

    var reward_url;
    if (localStorage.getItem('icon'+reward)) {
      reward_url = localStorage.getItem('icon'+reward);
    }
    else {
      reward_url = '/images/poke_number/' + reward + '.png?' + version;
    }

    let checkbox_group_id = 'checkbox_pokemon_' + getPokemonName({ id: reward });
    if (!(checkbox_group_id in filter_sub_options)) {
      filter_sub_options[checkbox_group_id] = new Set();
    }

    filterHTMLString += '<div class="filter_checkbox">';
    filterHTMLString += ('<input {checkedString} id="{checkbox_group_id}" type="checkbox" value="7,0,{reward}"><label for="{checkbox_group_id}"><img src="{reward_url}?' + version + '" style="max-height: 20px"> {pokemon_name} </label>').formatUnicorn({
      reward: reward,
      reward_url: reward_url,
      pokemon_name: getPokemonName({
        id: reward
      }),
      checkedString: checkedString,
      checkbox_group_id: checkbox_group_id
    });

    let conditionsSet = new Set();
    let rewardsString = 'Pokémon Encounter: ' + getPokemonName({ id: reward });
    for (let j = 0; j < all_quests.length; ++j) {
      if (all_quests[j]['rewards_string'] === rewardsString) {
        conditionsSet.add(all_quests[j]['conditions_string']);
      }
    }
    if (conditionsSet.size > 0) {
      filterHTMLString += '<ul style="list-style:none; margin-block-start:0em; padding-left:20px">';
      Array.from(conditionsSet).sort().forEach(function (value) {
        let id = checkbox_group_id + '_' + string_to_id(value);
        let checkedSubString = "";
        if (currentSubFilter.indexOf(id) != -1) {
          checkedSubString = "checked";
        }
        filterHTMLString += '<div><li><input ' + checkedSubString + ' type="checkbox" id=' + id + '><label for=' + id + ' style="font-size:0.7em;"> ' + value + '</label></li></div>';
        filter_sub_options[checkbox_group_id].add(id);
        checkbox_sub_id_quest[id] = value;
        checkbox_sub_id_reward[id] = rewardsString;
      });
      filterHTMLString += '</ul>';
      checkbox_group_ids.push(checkbox_group_id);
    }
    filterHTMLString += '</div>';
  }

  filterHTMLString += "<strong>Item:</strong> <br /><br />";

  for (var i = 0; i < filterData.t2.length; ++i) {

    var reward = filterData.t2[i];
    var reward_url = ('/images/quest/quest_item_{reward}.png?' + version).formatUnicorn({
      reward: reward
    });

    var valueString = "2,0,{reward}".formatUnicorn({
      reward: reward
    });

    var checkedString = "";
    if (currentFilter.indexOf(valueString) != -1) {
      checkedString = "checked";
    }

    let checkbox_group_id = 'checkbox_item_' + string_to_id(itemDict["item" + reward]);
    if (!(checkbox_group_id in filter_sub_options)) {
      filter_sub_options[checkbox_group_id] = new Set();
    }

    filterHTMLString += '<div class="filter_checkbox">';
    filterHTMLString += ('<input {checkedString} id="{checkbox_group_id}" type="checkbox" value="2,0,{reward}"><label for="{checkbox_group_id}"><img src="{reward_url}?' + version + '" style="max-height: 20px"> {item_name} </label>').formatUnicorn({
      reward: reward,
      reward_url: reward_url,
      item_name: itemDict["item" + reward],
      checkedString: checkedString,
      checkbox_group_id: checkbox_group_id
    });

    let conditionsSet = new Set();
    let conditionRewardsString = {};
    for (let j = 0; j < all_quests.length; ++j) {
      let formItem = all_quests[j]['rewards_string'].substr(all_quests[j]['rewards_string'].indexOf(' ') + 1).replace('Balls', 'Ball').replace('Potions', 'Potion').replace('Revives', 'Revive').replace('Berries', 'Berry').replace('Candies', 'Candy');
      if (formItem === itemDict["item" + reward]) {
        conditionsSet.add(all_quests[j]['conditions_string']);
        conditionRewardsString[all_quests[j]['conditions_string']] = all_quests[j]['rewards_string'];
      }
    }
    if (conditionsSet.size > 0) {
      filterHTMLString += '<ul style="list-style:none; margin-block-start:0em; padding-left:20px">';
      Array.from(conditionsSet).sort().forEach(function (value) {
        let id = checkbox_group_id + '_' + string_to_id(value);
        let checkedSubString = "";
        if (currentSubFilter.indexOf(id) != -1) {
          checkedSubString = "checked";
        }
        filterHTMLString += '<div><li><input ' + checkedSubString + ' type="checkbox" id=' + id + '><label for=' + id + ' style="font-size:0.7em;"> ' + conditionRewardsString[value].substr(0, conditionRewardsString[value].indexOf(' ')) + ' - ' + value + '</label></li></div>';
        filter_sub_options[checkbox_group_id].add(id);

        checkbox_sub_id_quest[id] = value;
        checkbox_sub_id_reward[id] = conditionRewardsString[value];
      });
      filterHTMLString += '</ul>';
      checkbox_group_ids.push(checkbox_group_id);
    }
    filterHTMLString += '</div>';
  }

  $('#filter_list_top').html(filterHTMLString);

  $('.filter_checkbox > input').bind("change", function(data) {
    if (this.checked) {
      tickFilter(this.value, this.id);
      reloadQuests();
    }
    else {
      untickFilter(this.value, this.id);
      reloadQuests();
    }
    $('span[id^=profile_][id$=_name]').css('font-weight', '');
  });

  $('.filter_checkbox > ul input').bind("change", function(data) {
    if (this.checked) {
      tickSubFilter(this.id);
      processNewQuests(lastNewQuests);
    }
    else {
      untickSubFilter(this.id);
      processNewQuests(lastNewQuests);
    }
    $('span[id^=profile_][id$=_name]').css('font-weight', '');
  });
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

function reloadQuests() {
  var currentTime = Math.floor(Date.now() / 1000);
  if (currentTime - 2 < lastLoad) {
    //try to reload in the next 5 seconds
    if (!pendingLoad) {
      pendingLoad = setTimeout(function() {
        reloadQuests();
      }, (lastLoad + 2 - currentTime) * 1000);
    }

    return;
  }

  pendingLoad = null;

  lastLoad = currentTime;

  var doneFunction = function(data) {
    lastNewQuests = data['quests'];
    var filterData = data['filters'];
    var meta = data['meta'];
    // console.log(meta);
    timeOffset = Math.floor(Date.now() / 1000) - parseInt(meta['time']);
    processNewQuests(lastNewQuests);
    processNewFilter(filterData);
    processNewQuests(lastNewQuests);
  };

  var currentFilterString = localStorage.getItem('questFilter');

  if (!currentFilterString) {
    currentFilterString = "[]";
  }

  var currentFilter = JSON.parse(currentFilterString);

  $.ajax({
    type: 'GET',
    url: 'quests.php',
    data: {
      quests: currentFilter,
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

function infoWindowString(quest) {
  // let coordsString = ' | <a href="javascript:navigator.clipboard.writeText(\'' + quest.lat + ',' + quest.lng + '\').then(() => { });">Coords</a>';
  let coordsString = '';
  let pbDevices = localStorage.getItem('PB_DEVICES');
  if (pbDevices) {
    pbDevices = JSON.parse(pbDevices);
    for (let i = 0; i < pbDevices.length; i++) {
      coordsString += ' | <a href="javascript:pbCoords(' + i + ',' + quest.lat + ',' + quest.lng + ')">' + pbDevices[i].name + '</a>';
    }
  }
  return "<strong>Pókestop Name:</strong> " + quest.pokestop_name + "<br/><br/><strong>Quest:</strong> " + quest.conditions_string + "<br/><br/><strong>Reward:</strong> " + quest.rewards_string + "<br/><a href='https://maps.google.com/maps?q=" + quest.lat + "," + quest.lng + "'>Maps</a>" + coordsString;
}

function tickFilter(value, id) {
  var string = localStorage.getItem('questFilter');
  if (!string) {
    string ="[]";
  }
  var currentFilter = JSON.parse(string);
  if (currentFilter.indexOf(value) == -1) {
    currentFilter.push(value);
  }
  localStorage.setItem('questFilter', JSON.stringify(currentFilter));

  filter_sub_options[id].forEach(function (element) {
    untickSubFilter(element);
  });
}

function tickSubFilter(id) {
  var string = localStorage.getItem('questSubFilter');
  if (!string) {
    string ="[]";
  }
  var currentFilter = JSON.parse(string);
  if (currentFilter.indexOf(id) == -1) {
    currentFilter.push(id);
  }
  localStorage.setItem('questSubFilter', JSON.stringify(currentFilter));
}

function untickFilter(value, id) {
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

  filter_sub_options[id].forEach(function (element) {
    untickSubFilter(element);
  });
}

function untickSubFilter(id) {
  var string = localStorage.getItem('questSubFilter');
  if (!string) {
    return;
  }
  var currentFilter = JSON.parse(string);
  var questIndex = currentFilter.indexOf(id);
  if (questIndex == -1) {
    return;
  }
  currentFilter.splice(questIndex, 1);
  localStorage.setItem('questSubFilter', JSON.stringify(currentFilter));
}

function checkPokemon(pokemon_level) {
  var key = 'gym_raid_level_' + pokemon_level;
  localStorage.setItem(key, '1');
}

function uncheckPokemon(pokemon_level) {
  var key = 'gym_raid_level_' + pokemon_level;
  localStorage.setItem(key, '0');
}

function isPokemonChecked(pokemon_level) {
  var key = 'gym_raid_level_' + pokemon_level;
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
  if (localStorage.getItem('firstRunQuest') != "1") {
    var defaultFilter = [
      "3,1500,0",
      "7,0,113",
      "7,0,147",
      "7,0,246",
      "7,0,290",
      "2,0,3",
      "2,0,706",
      "2,0,708",
      "2,0,1301"
    ]
    localStorage.setItem('questFilter', JSON.stringify(defaultFilter));

    localStorage.setItem('firstRunQuest', "1");
  }
}

function loadPokemonList() {
  pokeDict = {};

  for (var i in pokeArray) {
    var pokemon = pokeArray[i];
    var show_filter = true;
    if (pokemon['h']) {
      show_filter = false;
    }
    pokeDict[pokemon['i']] = {"name": pokemon['n'], 'show_filter': show_filter};
  }

  firstRun();
  reloadQuests();
  setInterval(function(){
    refreshQuests();
  }, 1000);

  setInterval(function(){
    refreshMarker();
  }, 60 * 1000);


  setInterval(function(){
    reloadQuests();
  }, 120000);
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

function filterQuestMapToastClicked() {
  localStorage.setItem('openQuestFilter', '1');
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
    "onclick": filterQuestMapToastClicked,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "20000",
    "extendedTimeOut": "20000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  }

  toastr.info("Use Filter to find more quests!");
}

function openFilter() {
  $('#filter').css('display', 'block');
  localStorage.setItem('openQuestFilter', '1');
}

function addProfile() {
  let index = $('#all_profile_div').children().length + 1;

  if (index > 100) {
    alert('Maximum number of profiles reached!');
    return -1;
  }

  let profileElements = $();
  profileElements = profileElements.add($('<span>', {id: 'profile_' + index + '_name'}).html('Profile ' + index));
  // profileElements = profileElements.add('<span>: </span>');

  let buttonElements = $();
  buttonElements = buttonElements.add($('<input>', {type: 'button', name: 'profile_' + index + '_load', id: 'profile_' + index + '_load', value: 'Load'}));
  buttonElements = buttonElements.add('<span> </span>');
  buttonElements = buttonElements.add($('<input>', {type: 'button', name: 'profile_' + index + '_save', id: 'profile_' + index + '_save', value: 'Save'}));
  buttonElements = buttonElements.add('<span> </span>');
  buttonElements = buttonElements.add($('<input>', {type: 'button', name: 'profile_' + index + '_rename', id: 'profile_' + index + '_rename', value: 'Rename'}));
  profileElements = profileElements.add($('<span>').css('float', 'right').append(buttonElements));

  profileElements = profileElements.add('<br>');
  profileElements = profileElements.add('<br>');

  $('#all_profile_div').append($('<div>', {id: 'profile_div_' + index}).append(profileElements));

  $('#profile_' + index + '_save').bind('click', function() {
    if (confirm('Do you really want to update profile "' + $('#profile_' + index + '_name').text() + '"?')) {
      let profile = {
        'name': $('#profile_' + index + '_name').text(),
        'filter': [],
        'subFilter': []
      };

      let filterString = localStorage.getItem('questFilter');
      if (filterString) {
        profile['filter'] = JSON.parse(filterString);
      }

      let subFilterString = localStorage.getItem('questSubFilter');
      if (subFilterString) {
        profile['subFilter'] = JSON.parse(subFilterString);
      }

      localStorage.setItem('quest_profile_' + index, JSON.stringify(profile));
      $('span[id^=profile_][id$=_name]').css('font-weight', '');
      $('#profile_' + index + '_name').css('font-weight', 'bold');
    }
  });

  $('#profile_' + index + '_load').bind('click', function() {
    loadProfile(index);
  });

  $('#profile_' + index + '_rename').bind('click', function() {
    let newName = prompt('Please enter new profile name', $('#profile_' + index + '_name').text());
    if (newName !== null && newName !== '') {
      $('#profile_' + index + '_name').html(newName);
      let profile = JSON.parse(localStorage.getItem('quest_profile_' + index));
      profile.name = newName;
      localStorage.setItem('quest_profile_' + index, JSON.stringify(profile));
    }
  });

  return index;
}

function loadProfile(index) {
  let profile = JSON.parse(localStorage.getItem('quest_profile_' + index));

  localStorage.setItem('questFilter', JSON.stringify(profile.filter));
  localStorage.setItem('questSubFilter', JSON.stringify(profile.subFilter));

  reloadQuests();

  $('span[id^=profile_][id$=_name]').css('font-weight', '');
  $('#profile_' + index + '_name').css('font-weight', 'bold');
}

function initMap() {
  $(document).ready(function() {
    $('#map').css('top', '40px');
    $('#map').css('bottom', '0px');

    let newElements = $();
    newElements = newElements.add('<span>Saved Profiles:</span>');
    newElements = newElements.add('<br>');
    newElements = newElements.add('<br>');
    newElements = newElements.add($('<div>', {id: 'all_profile_div'}));
    newElements = newElements.add($('<input>', {type: 'button', name: 'profile_add', id: 'profile_add', value: 'Add Profile'}));
    newElements = newElements.add('<span> </span>');
    newElements = newElements.add($('<input>', {type: 'button', name: 'profile_remove', id: 'profile_remove', value: 'Remove Profile'}));
    newElements = newElements.add('<br>');

    $('#filter').prepend($('<div>', {id: 'filter_new_div', style: 'padding: 10px; font-family: -apple-system, Helvetica, Arial, sans-serif;'}));
    $('#filter_new_div').prepend(newElements);

    for (let index = 1; index <= 100; index++) {
      let profileText = localStorage.getItem('quest_profile_' + index);
      if (profileText) {
        addProfile();
        $('#profile_' + index + '_name').html(JSON.parse(profileText).name);
      } else {
        break;
      }
    }

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

    $('#profile_add').bind('click', function() {
      let index = addProfile();
      if (index !== -1) {
        localStorage.setItem('quest_profile_' + index, JSON.stringify({ 'filter': [], 'subFilter': [] }));
      }
    });

    $('#profile_remove').bind('click', function() {
      let num = $('#all_profile_div').children().length;
      if (num !== 0 && confirm('Do you really want to remove profile "' + $('#profile_' + num + '_name').text() + '"?')) {
        $('#profile_div_' + num).remove();
        localStorage.removeItem('quest_profile_' + num);
      }
    });

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
        // reloadQuests();
      }
    });
    map.on("dragstart", function(event) {
      shouldUpdate = false;
    });
    map.on("dragend", function(event) {
      shouldUpdate = true;
      if (shouldTurnFilterOff()) {
        inserted = 0;
        // reloadQuests();
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
        // reloadQuests();
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
        // reloadQuests();
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

    // var raidLevels = ['egg', 'boss', '1', '2', '3', '4', '5', 'mystic', 'valor', 'instinct', 'exraid'];
//
//     for (var i = 0; i < raidLevels.length; ++i) {
//       var level = raidLevels[i];
//       var isFilterCheck = isPokemonChecked(level);
//
//       var cssId = '#checkbox_raid_' + level;
//
//       if (isFilterCheck) {
//         $(cssId).prop('checked', true);
//       }
//     }

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

function setupFilters() {
  localStorage.setItem('quest_profile_1', '{"filter":["2,0,1301","2,0,706","3,1500,0","7,0,147","2,0,3"],"subFilter":["checkbox_stardust_1500_catch_1_pokemon_type_dragon","checkbox_pokemon_Dratini_catch_1_pokemon_type_dragon","checkbox_item_ultra_ball_catch_1_pokemon_type_dragon","checkbox_item_golden_razz_berry_catch_1_pokemon_type_dragon","checkbox_item_rare_candy_catch_1_pokemon_type_dragon"],"name":"Dragon"}');
  localStorage.setItem('quest_profile_2', '{"filter":["2,0,708"],"subFilter":["checkbox_item_silver_pinap_berry_spin_10_pokestops_or_gyms"],"name":"Silver Pinap"}');
  localStorage.setItem('quest_profile_3', '{"filter":["3,1000,0","2,0,103","2,0,201"],"subFilter":["checkbox_stardust_1000_win_3_gym_battles","checkbox_item_hyper_potion_win_3_gym_battles","checkbox_item_revive_win_3_gym_battles"],"name":"Win 3 Gym"}');
  localStorage.setItem('quest_profile_4', '{"filter":["2,0,201","3,500,0","2,0,102"],"subFilter":["checkbox_stardust_500_win_1_gym_battle","checkbox_item_super_potion_win_1_gym_battle","checkbox_item_revive_win_1_gym_battle"],"name":"Win 1 Gym"}');
}