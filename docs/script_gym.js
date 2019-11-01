let EXPECTED_VERSIONS = {'nycpokemap.com':'ver627','sgpokemap.com':'ver649','vanpokemap.com':'ver633','sydneypogomap.com':'ver626'};
let MAP_CENTERS = {'nycpokemap.com':[40.696336,-73.923997],'sgpokemap.com':[1.3521,103.8198],'vanpokemap.com':[49.277877,-123.119785],'sydneypogomap.com':[-33.873906,151.200785]};

let version = document.currentScript.src.split('/').pop().split('?').pop();
let mapCenter = MAP_CENTERS[location.hostname];
if (version !== EXPECTED_VERSIONS[location.hostname]) {
  alert('Javascript file version has been updated: ' + document.currentScript.src.split('/').pop());
}

var pokemons = [];
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

pokeArray = pokeArray.concat([{"i":"0","n":"Egg"}]);


var weatherAffinities = {"1":[12,5,10],"2":[11,13,7],"3":[1,6],"4":[18,2,4],"5":[16,3,14],"6":[15,9],"7":[17,8]};

var movesDict = {"1":"Thunder Shock","2":"Quick Attack","3":"Scratch","4":"Ember","5":"Vine Whip","6":"Tackle","7":"Razor Leaf","8":"Take Down","9":"Water Gun","10":"Bite","11":"Pound","12":"Double Slap","13":"Wrap","14":"Hyper Beam","15":"Lick","16":"Dark Pulse","17":"Smog","18":"Sludge","19":"Metal Claw","20":"Vice Grip","21":"Flame Wheel","22":"Megahorn","23":"Wing Attack","24":"Flamethrower","25":"Sucker Punch","26":"Dig","27":"Low Kick","28":"Cross Chop","29":"Psycho Cut","30":"Psybeam","31":"Earthquake","32":"Stone Edge","33":"Ice Punch","34":"Heart Stamp","35":"Discharge","36":"Flash Cannon","37":"Peck","38":"Drill Peck","39":"Ice Beam","40":"Blizzard","41":"Air Slash","42":"Heat Wave","43":"Twineedle","44":"Poison Jab","45":"Aerial Ace","46":"Drill Run","47":"Petal Blizzard","48":"Mega Drain","49":"Bug Buzz","50":"Poison Fang","51":"Night Slash","52":"Slash","53":"Bubble Beam","54":"Submission","55":"Karate Chop","56":"Low Sweep","57":"Aqua Jet","58":"Aqua Tail","59":"Seed Bomb","60":"Psyshock","61":"Rock Throw","62":"Ancient Power","63":"Rock Tomb","64":"Rock Slide","65":"Power Gem","66":"Shadow Sneak","67":"Shadow Punch","68":"Shadow Claw","69":"Ominous Wind","70":"Shadow Ball","71":"Bullet Punch","72":"Magnet Bomb","73":"Steel Wing","74":"Iron Head","75":"Parabolic Charge","76":"Spark","77":"Thunder Punch","78":"Thunder","79":"Thunderbolt","80":"Twister","81":"Dragon Breath","82":"Dragon Pulse","83":"Dragon Claw","84":"Disarming Voice","85":"Draining Kiss","86":"Dazzling Gleam","87":"Moonblast","88":"Play Rough","89":"Cross Poison","90":"Sludge Bomb","91":"Sludge Wave","92":"Gunk Shot","93":"Mud Shot","94":"Bone Club","95":"Bulldoze","96":"Mud Bomb","97":"Fury Cutter","98":"Bug Bite","99":"Signal Beam","100":"X Scissor","101":"Flame Charge","102":"Flame Burst","103":"Fire Blast","104":"Brine","105":"Water Pulse","106":"Scald"
  ,"107":"Hydro Pump","108":"Psychic","109":"Psystrike","110":"Ice Shard","111":"Icy Wind","112":"Frost Breath","113":"Absorb","114":"Giga Drain","115":"Fire Punch","116":"Solar Beam","117":"Leaf Blade","118":"Power Whip","119":"Splash","120":"Acid","121":"Air Cutter","122":"Hurricane","123":"Brick Break","124":"Cut","125":"Swift","126":"Horn Attack","127":"Stomp","128":"Headbutt","129":"Hyper Fang","130":"Slam","131":"Body Slam","132":"Rest","133":"Struggle","134":"Scald","135":"Hydro Pump","136":"Wrap Green","137":"Wrap Pink","200":"Fury Cutter","201":"Bug Bite","202":"Bite","203":"Sucker Punch","204":"Dragon Breath","205":"Thunder Shock","206":"Spark","207":"Low Kick","208":"Karate Chop","209":"Ember","210":"Wing Attack","211":"Peck","212":"Lick","213":"Shadow Claw","214":"Vine Whip","215":"Razor Leaf","216":"Mud Shot","217":"Ice Shard","218":"Frost Breath","219":"Quick Attack","220":"Scratch","221":"Tackle","222":"Pound","223":"Cut","224":"Poison Jab","225":"Acid","226":"Psycho Cut","227":"Rock Throw","228":"Metal Claw","229":"Bullet Punch","230":"Water Gun","231":"Splash","232":"Water Gun","233":"Mud Slap","234":"Zen Headbutt","235":"Confusion","236":"Poison Sting","237":"Bubble","238":"Feint Attack","239":"Steel Wing","240":"Fire Fang","241":"Rock Smash","242":"Transform","243":"Counter","244":"Powder Snow","245":"Close Combat","246":"Dynamic Punch","247":"Focus Blast","248":"Aurora Beam","249":"Charge Beam","250":"Volt Switch","251":"Wild Charge","252":"Zap Cannon","253":"Dragon Tail","254":"Avalanche","255":"Air Slash","256":"Brave Bird","257":"Sky Attack","258":"Sand Tomb","259":"Rock Blast","260":"Infestation","261":"Struggle Bug","262":"Silver Wind","263":"Astonish","264":"Hex","265":"Night Shade","266":"Iron Tail","267":"Gyro Ball","268":"Heavy Slam","269":"Fire Spin","270":"Overheat","271":"Bullet Seed","272":"Grass Knot","273":"Energy Ball","274":"Extrasensory","275":"Futuresight","276":"Mirror Coat","277":"Outrage","278":"Snarl","279":"Crunch","280":"Foul Play","281":"Hidden Power","282":"Take Down","283":"Waterfall","284":"Surf","285":"Draco Meteor","286":"Doom Desire","287":"Yawn","288":"Psycho Boost","289":"Origin Pulse","290":"Precipice Blades","291":"Present","292":"Weather Ball Fire","293":"Weather Ball Ice","294":"Weather Ball Rock","295":"Weather Ball Water","296":"Frenzy Plant","297":"Smack Down","298":"Blast Burn","299":"Hydro Cannon","300":"Last Resort","301":"Meteor Mash","302":"Skull Bash","303":"Acid Spray","304":"Earth Power","305":"Crabhammer","306":"Lunge","307":"Crush Claw","308":"Octazooka","309":"Mirror Shot","310":"Super Power","311":"Fell Stinger","312":"Leaf Tornado","313":"Leech Life","314":"Drain Punch","315":"Shadow Bone","316":"Muddy Water","317":"Blaze Kick","318":"Razor Shell","319":"Power Up Punch","320":"Charm","321":"Giga Impact","322":"Frustration","323":"Return","324":"Synchronoise","325":"Lock On"};

var formDict = {"1":"A","2":"B","3":"C","4":"D","5":"E","6":"F","7":"G","8":"H","9":"I","10":"J","11":"K","12":"L","13":"M","14":"N","15":"O","16":"P","17":"Q","18":"R","19":"S","20":"T","21":"U","22":"V","23":"W","24":"X","25":"Y","26":"Z","27":"!","28":"?","29":"Normal","30":"Sunny","31":"Rainy","32":"Snowy","33":"Normal","34":"Attack","35":"Defense","36":"Speed","37":"00","38":"01","39":"02","40":"03","41":"04","42":"05","43":"06","44":"07","45":"Normal","46":"Alola","47":"Normal","48":"Alola","49":"Normal","50":"Alola","51":"Normal","52":"Alola","53":"Normal","54":"Alola","55":"Normal","56":"Alola","57":"Normal","58":"Alola","59":"Normal","60":"Alola","61":"Normal","62":"Alola","63":"Normal","64":"Alola","65":"Normal","66":"Alola","67":"Normal","68":"Alola","69":"Normal","70":"Alola","71":"Normal","72":"Alola","73":"Normal","74":"Alola","75":"Normal","76":"Alola","77":"Normal","78":"Alola","79":"Normal","80":"Alola","81":"Normal","82":"Frost","83":"Fan","84":"Mow","85":"Wash","86":"Heat","87":"Plant","88":"Sandy","89":"Trash","90":"Altered","91":"Origin","92":"Sky","93":"Land","94":"Overcast","95":"Sunny","96":"West Sea","97":"East Sea","98":"West Sea","99":"East Sea","100":"Normal","101":"Fighting","102":"Flying","103":"Poison","104":"Ground","105":"Rock","106":"Bug","107":"Ghost","108":"Steel","109":"Fire","110":"Water","111":"Grass","112":"Electric","113":"Psychic","114":"Ice","115":"Dragon","116":"Dark","117":"Fairy","118":"Plant","119":"Sandy","120":"Trash","121":"08","122":"09","123":"10","124":"11","125":"12","126":"13","127":"14","128":"15","129":"16","130":"17","131":"18","132":"19","133":"Armored","134":"Armored Intro","135":"Normal","136":"Red Striped","137":"Blue Striped","138":"Standard","139":"Zen","140":"Incarnate","141":"Therian","142":"Incarnate","143":"Therian","144":"Incarnate","145":"Therian","146":"Normal","147":"Black","148":"White","149":"Ordinary","150":"Resolute","151":"Aria","152":"Pirouette","153":"Shadow","154":"Purified","155":"Shadow","156":"Purified","157":"Normal","158":"Shadow","159":"Purified","160":"Normal","161":"Shadow","162":"Purified","163":"Normal","164":"Shadow","165":"Purified","166":"Normal","167":"Shadow","168":"Purified","169":"Normal","170":"Shadow","171":"Purified","172":"Normal","173":"Shadow","174":"Purified","175":"Normal","176":"Shadow","177":"Purified","178":"Normal","179":"Shadow","180":"Purified","181":"Normal","182":"Shadow","183":"Purified","184":"Normal","185":"Shadow","186":"Purified","187":"Normal","188":"Shadow","189":"Purified","190":"Normal","191":"Shadow","192":"Purified","193":"Normal","194":"Shadow","195":"Purified","196":"Normal","197":"Shadow","198":"Purified","199":"Normal","200":"Shadow","201":"Purified","202":"Normal","203":"Shadow","204":"Purified","205":"Normal","206":"Shadow","207":"Purified","208":"Normal","209":"Shadow","210":"Purified","211":"Normal","212":"Shadow","213":"Purified","214":"Normal","215":"Shadow","216":"Purified","217":"Normal","218":"Shadow","219":"Purified","220":"Shadow","221":"Purified","222":"Shadow","223":"Purified","224":"Normal","225":"Shadow","226":"Purified","227":"Shadow","228":"Purified","229":"Normal","230":"Shadow","231":"Purified","232":"Normal","233":"Shadow","234":"Purified","235":"Normal","236":"Shadow","237":"Purified","238":"Normal","239":"Shadow","240":"Purified","241":"Normal","242":"Shadow","243":"Purified","244":"Normal","245":"Shadow","246":"Purified","247":"Normal","248":"Shadow","249":"Purified","250":"Normal","251":"Shadow","252":"Purified","253":"Normal","254":"Shadow","255":"Purified","256":"Normal","257":"Shadow","258":"Purified","259":"Normal","260":"Shadow","261":"Purified","262":"Normal","263":"Shadow","264":"Purified","265":"Normal","266":"Shadow","267":"Purified","268":"Normal","269":"Shadow","270":"Purified","271":"Normal","272":"Shadow","273":"Purified","274":"Normal","275":"Shadow","276":"Purified","277":"Normal","278":"Shadow","279":"Purified","280":"Normal","281":"Shadow","282":"Purified","283":"Normal","284":"Shadow","285":"Purified","286":"Normal","287":"Shadow","288":"Purified"
  ,"289":"Normal","290":"Shadow","291":"Purified","292":"Normal","293":"Shadow","294":"Purified","295":"Normal","296":"Shadow","297":"Purified","298":"Normal","299":"Shadow","300":"Purified","301":"Normal","302":"Shadow","303":"Purified","304":"Normal","305":"Shadow","306":"Purified","307":"Normal","308":"Shadow","309":"Purified","310":"Normal","311":"Shadow","312":"Purified","313":"Normal","314":"Shadow","315":"Purified","316":"Normal","317":"Shadow","318":"Purified","319":"Normal","320":"Shadow","321":"Purified","322":"Normal","323":"Shadow","324":"Purified","585":"Spring","586":"Summer","587":"Autumn","588":"Winter","589":"Spring","590":"Summer","591":"Autumn","592":"Winter","593":"Normal","594":"Shock","595":"Burn","596":"Chill","597":"Douse","598":"Normal","600":"Normal","602":"Normal","610":"Normal","611":"Shadow","612":"Purified","613":"Normal","614":"Shadow","615":"Purified","616":"Normal","617":"Shadow","618":"Purified","619":"Normal","620":"Shadow","621":"Purified","622":"Normal","623":"Shadow","624":"Purified","625":"Normal","626":"Shadow","627":"Purified","628":"Normal","629":"Shadow","630":"Purified","631":"Normal","632":"Shadow","633":"Purified","634":"Normal","635":"Shadow","636":"Purified","637":"Normal","638":"Shadow","639":"Purified","640":"Normal","641":"Shadow","642":"Purified","643":"Normal","644":"Shadow","645":"Purified","646":"Normal","647":"Shadow","648":"Purified","649":"Normal","650":"Shadow","651":"Purified","652":"Normal","653":"Shadow","654":"Purified","655":"Normal","656":"Shadow","657":"Purified","658":"Normal","659":"Shadow","660":"Purified","661":"Normal","662":"Shadow","663":"Purified","664":"Normal","665":"Shadow","666":"Purified","667":"Normal","668":"Shadow","669":"Purified","670":"Normal","671":"Shadow","672":"Purified","673":"Shadow","674":"Purified","675":"Shadow","676":"Purified","677":"Normal","678":"Shadow","679":"Purified","680":"Normal","681":"Shadow","682":"Purified","683":"Normal","684":"Shadow","685":"Purified","686":"Shadow","687":"Purified","688":"Normal","689":"Shadow","690":"Purified","691":"Normal","692":"Shadow","693":"Purified","694":"Normal","695":"Shadow","696":"Purified","697":"Normal","698":"Shadow","699":"Purified","700":"Normal","701":"Shadow","702":"Purified","703":"Normal","704":"Shadow","705":"Purified","706":"Normal","707":"Shadow","708":"Purified","709":"Shadow","710":"Purified","711":"Shadow","712":"Purified","713":"Normal","714":"Shadow","715":"Purified","716":"Normal","717":"Shadow","718":"Purified","719":"Normal","720":"Shadow","721":"Purified","722":"Normal","723":"Shadow","724":"Purified","725":"Shadow","726":"Purified","727":"Shadow","728":"Purified","729":"Normal","730":"Shadow","731":"Purified","732":"Shadow","733":"Purified","734":"Normal","735":"Shadow","736":"Purified","737":"Normal","738":"Shadow","739":"Purified","740":"Normal","741":"Shadow","742":"Purified","743":"Normal","744":"Shadow","745":"Purified","746":"Normal","747":"Shadow","748":"Purified","749":"Normal","750":"Shadow","751":"Purified","752":"Normal","753":"Shadow","754":"Purified","755":"Normal","756":"Shadow","757":"Purified","758":"Normal","759":"Shadow","760":"Purified","761":"Normal","762":"Shadow","763":"Purified","764":"Normal","765":"Shadow","766":"Purified","767":"Normal","768":"Shadow","769":"Purified","770":"Normal","771":"Shadow","772":"Purified","773":"Normal","774":"Shadow","775":"Purified","776":"Normal","777":"Shadow","778":"Purified","779":"Normal","780":"Shadow","781":"Purified","782":"Normal","783":"Shadow","784":"Purified","785":"Normal","786":"Shadow","787":"Purified","788":"Normal","789":"Shadow","790":"Purified","791":"Normal","792":"Shadow"
  ,"793":"Purified","794":"Normal","795":"Shadow","796":"Purified","797":"Normal","798":"Shadow","799":"Purified","800":"Normal","801":"Shadow","802":"Purified","803":"Normal","804":"Shadow","805":"Purified","806":"Normal","807":"Shadow","808":"Purified","809":"Normal","810":"Shadow","811":"Purified","812":"Normal","813":"Shadow","814":"Purified","815":"Normal","816":"Shadow","817":"Purified","818":"Normal","819":"Shadow","820":"Purified","821":"Normal","822":"Shadow","823":"Purified","824":"Normal","825":"Shadow","826":"Purified","827":"Normal","828":"Shadow","829":"Purified","830":"Normal","831":"Shadow","832":"Purified","833":"Normal","834":"Shadow","835":"Purified","836":"Normal","837":"Shadow","838":"Purified","839":"Normal","840":"Shadow","841":"Purified","842":"Shadow","843":"Purified","844":"Shadow","845":"Purified","846":"Normal","847":"Shadow","848":"Purified","849":"Normal","850":"Shadow","851":"Purified","852":"Normal","853":"Shadow","854":"Purified","855":"Normal","856":"Shadow","857":"Purified","858":"Normal","859":"Shadow","860":"Purified","861":"Normal","862":"Shadow","863":"Purified","864":"Normal","865":"Shadow","866":"Purified","867":"Normal","868":"Shadow","869":"Purified","870":"Normal","871":"Shadow","872":"Purified","873":"Normal","874":"Shadow","875":"Purified","876":"Normal","877":"Shadow","878":"Purified","879":"Normal","880":"Shadow","881":"Purified","882":"Shadow","883":"Purified","884":"Shadow","885":"Purified","886":"Shadow","887":"Purified","888":"Normal","889":"Shadow","890":"Purified","891":"Normal","892":"Shadow","893":"Purified","894":"Fall 2019","895":"Fall 2019","896":"Fall 2019","897":"Fall 2019","898":"Normal","899":"Shadow","900":"Purified"}

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

var weathers = {};

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

function getMoveName(moveId) {
  if (movesDict[moveId]) {
    return movesDict[moveId];
  }
  return "";
}

function getFormString(pokemon) {
  var formKey = "" + pokemon.form;

  if (formDict[formKey]) {
    return "" + formDict[formKey];
  }
  return "";
}

function getGenderString(pokemon) {
  var genderInt = parseInt(pokemon.gender);

  if (genderInt == 1) {
    return "Male";
  }
  else if (genderInt == 2) {
    return "Female";
  }

  return "";
}

function getAssetURL(pokemonId, pokemonLevel, is_exclusive) {

  var assetServer = parseInt(pokemonId) % 8 + 1;

  if (pokemonId == 0) {
    if (is_exclusive) {
      return '//assets-' + assetServer.toString() + '.' + currentTopDomainName + '/images/poke_number/0_ex.png?' + version;
    }

    if (pokemonLevel) {
      return '//assets-' + assetServer.toString() + '.' + currentTopDomainName + '/images/poke_number/' + pokemonId + '_' + pokemonLevel + '.png?' + version;
    }
    return '//assets-' + assetServer.toString() + '.' + currentTopDomainName + '/images/poke_number/' + pokemonId + '.png?' + version;
  }

  if (localStorage.getItem('icon'+pokemonId)) {
    return localStorage.getItem('icon'+pokemonId);
  }


  return '//assets-' + assetServer.toString() + '.' + currentTopDomainName + '/images/poke_number/' + pokemonId + '.png?' + version;
}

function pokeHTML(pokemon, shouldHide) {
  var assetURL = getAssetURL(pokemon.id, pokemon.level, pokemon.is_exclusive);
  return "<div class='pokemon_icon'><img class='pokemon_icon_img' src='" + assetURL + "' /></div>";
}

function Point(lat, lng) {
  this.lat = parseFloat(lat);
  this.lng = parseFloat(lng);
}

function Pokemon(pokemon_id, level, cp, center, raid_spawn, raid_start, raid_end, team, move1, move2, gym_name, ex_raid_eligible, sponsor, is_exclusive, cell_id, form, gender) {
  this.id = pokemon_id;
  this.center = center;
  this.level = parseInt(level);
  this.cp = parseInt(cp);
  this.raidSpawn = parseInt(raid_spawn);
  this.raidStart = parseInt(raid_start);
  this.raidEnd = parseInt(raid_end);
  this.team = parseInt(team);
  this.move1 = parseInt(move1);
  this.move2 = parseInt(move2);
  this.gym_name = gym_name;
  this.ex_raid_eligible = parseInt(ex_raid_eligible);
  this.sponsor = parseInt(sponsor);
  this.is_exclusive = parseInt(is_exclusive);
  this.cell_id = cell_id;
  this.form = parseInt(form);
  this.gender = parseInt(gender);

  this.isEqual = function(pokemon) {
    return (this.id == pokemon.id &&
      this.center.lat == pokemon.center.lat &&
      this.center.lng == pokemon.center.lng &&
      this.raidSpawn == pokemon.raidSpawn);
  }

  this.startingTime = function() {
    var currentUnixTime = Math.floor(Date.now() / 1000) - timeOffset;
    var remain = this.raidStart - currentUnixTime;
    return remain;
  }

  this.remainingTime = function() {
    var currentUnixTime = Math.floor(Date.now() / 1000) - timeOffset;
    var remain = this.raidEnd - currentUnixTime;
    return remain;
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

function refreshPokemons() {
  if (!shouldUpdate) {
    return; //don't update when map is moving
  }

  var toBeRemovedIndexes = [];

  var currentUnixTime = Math.floor(Date.now() / 1000) - timeOffset;

  for (var i = 0; i < pokemons.length; ++i) {
    var currentPokemon = pokemons[i];
    var marker = markers[i];
    var shouldRemove = false;

    if (currentPokemon.raidEnd < currentUnixTime - 10 ||
      (!isPokemonChecked(currentPokemon.level) && !shouldTurnFilterOff())) {
      shouldRemove = true;
    }

    //if egg and is starting or we don't like egg
    if (currentPokemon.id == 0) {
      if ((currentPokemon.raidStart < currentUnixTime - 10 || !isPokemonChecked('egg'))) {
        shouldRemove = true;
      }
    }
    else {
      if (!isPokemonChecked('boss')) {
        shouldRemove = true;
      }
    }

    //remove team
    //0: no team
    //1: mystic
    //2: valor
    //3: instinct

    if (!isPokemonChecked('mystic') && currentPokemon.team == 1) {
      shouldRemove = true;
    }

    if (!isPokemonChecked('valor') && currentPokemon.team == 2) {
      shouldRemove = true;
    }

    if (!isPokemonChecked('instinct') && currentPokemon.team == 3) {
      shouldRemove = true;
    }

    if (isPokemonChecked('exraid') && !currentPokemon.ex_raid_eligible && !currentPokemon.sponsor) {
      shouldRemove = true;
    }

    if (isPokemonChecked('boosted') && !isRaidBoosted(currentPokemon)) {
      shouldRemove = true;
    }

    if (shouldRemove) {
      removeMarker(marker);
    }
    else {
      addMarker(marker);
    }
  }

  for (var i = toBeRemovedIndexes.length - 1; i >= 0; --i) {
    var marker = markers[toBeRemovedIndexes[i]];
    if (marker._map) {
      marker.removeFrom(map);
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
      marker.bindPopup(infoWindowString(pokemons[index]));
    }
  }

  if (locationMarker) {
    map.locate();
  }
}

function indexOfPokemons(pokemon, pokemons) {
  for (var i = 0; i < pokemons.length; ++i) {
    var currentPokemon = pokemons[i];
    if (pokemon.isEqual(currentPokemon)) {
      return i;
    }
  }
  return -1;
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

function processNewPokemons(newPokemons) {
  var shouldHide = true;
  if (map.getZoom() >= 14 || (markers.length + newPokemons.length) <= 15) {
    // shouldHide = false;
  }

  for (var i = 0; i < newPokemons.length; ++i) {
    var pokemon = new Pokemon(
      newPokemons[i]['pokemon_id'],
      newPokemons[i]['level'],
      newPokemons[i]['cp'],
      new Point(
        newPokemons[i]['lat'],
        newPokemons[i]['lng']
      ),
      newPokemons[i]['raid_end'],
      newPokemons[i]['raid_start'],
      newPokemons[i]['raid_end'],
      newPokemons[i]['team'],
      newPokemons[i]['move1'],
      newPokemons[i]['move2'],
      newPokemons[i]['gym_name'],
      newPokemons[i]['ex_raid_eligible'],
      newPokemons[i]['sponsor'],
      newPokemons[i]['is_exclusive'],
      newPokemons[i]['cell_id'],
      newPokemons[i]['form'],
      newPokemons[i]['gender']
    );

    if (!pokemon.gym_name) {
      pokemon.gym_name = "Unknown";
    }

    // console.log(pokemon.level);

    var currentUnixTime = Math.floor(Date.now() / 1000) - timeOffset;

    //ignore started eggs

    if (currentUnixTime > pokemon.raidStart && pokemon.id == 0) {
      continue;
    }

    if (currentUnixTime < pokemon.raidEnd) {
      var index = indexOfPokemons(pokemon, pokemons);
      if (index == -1) {
        pokemons.push(pokemon);

        var markerLocation = new L.LatLng(pokemon.center.lat, pokemon.center.lng);

        var iconDimension = 36;
        var iconOptions = {
          iconSize: [iconDimension, iconDimension],
          iconAnchor: [iconDimension/2, iconDimension],
          popupAnchor: [0, -iconDimension],
          zIndexOffset: -1000,
          html : pokeHTML(pokemon, shouldHide)
        }
        var htmlIcon = new L.HtmlIcon(iconOptions);

        var marker = new L.Marker(markerLocation, {icon: htmlIcon});

        //check if egg and we have enable them

        if (isPokemonChecked(pokemon.level)) {
          if (pokemon.id == 0) {
            if (isPokemonChecked('egg')) {
              marker.addTo(map);
            }
          }
          else {
            if (isPokemonChecked('boss')) {
              marker.addTo(map);
            }
          }
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
            selectedMarker.bindPopup(infoWindowString(pokemons[index]));
          }
        });

        if (parseFloat(newPokemons[i]['lat']) == hashPokemonLat && parseFloat(newPokemons[i]['lng']) == hashPokemonLng) {
          hashPokemonLat = 0;
          hashPokemonLng = 0;
          selectedMarker = marker;
          selectedMarker.bindPopup(infoWindowString(pokemon));
          selectedMarker.openPopup();
        }
      }
    }
  }
  refreshPokemons();
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

function reloadPokemons() {
  var currentTime = Math.floor(Date.now() / 1000);
  if (currentTime - 2 < lastLoad) {
    //try to reload in the next 5 seconds
    if (!pendingLoad) {
      pendingLoad = setTimeout(function() {
        reloadPokemons();
      }, (lastLoad + 2 - currentTime) * 1000);
    }

    return;
  }

  pendingLoad = null;

  lastLoad = currentTime;

  var doneFunction = function(data) {
    var newPokemons = data['raids'];
    var meta = data['meta'];
    // console.log(meta);
    timeOffset = Math.floor(Date.now() / 1000) - parseInt(meta['time']);
    processNewPokemons(newPokemons);

    //process weather
    if (data['weathers']) {
      for (var i = 0; i < data['weathers'].length; ++i) {
        var tmpWeather = data['weathers'][i];

        weathers[tmpWeather.cell_id] = tmpWeather.weather;
      }
    }
  }

  $.ajax({
    type: 'GET',
    url: 'raids.php',
    data: {time: Date.now()}
  }).done(doneFunction);
}

function getPokemonName(pokemon) {
  return pokeDict[pokemon.id]["name"];
}

function getPokemonTypes(pokemon) {
  return pokeDict[pokemon.id].types;
}

function getMoveName(moveId) {
  if (movesDict[moveId]) {
    return movesDict[moveId];
  }
  return "";
}

function isRaidBoosted(raid) {
  if (weathers[raid.cell_id]) {
    var key = "" + weathers[raid.cell_id];
    var weatherAffinitie = weatherAffinities[key];
    var pokemonTypes = getPokemonTypes(raid);

    if (pokemonTypes && weatherAffinitie) {
      for (var i = 0; i < pokemonTypes.length; ++i) {
        if (weatherAffinitie.indexOf(pokemonTypes[i]) != -1) {
          return true;
        }
      }
    }
  }

  return false;
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

function infoWindowString(pokemon) {

  var startTime = "";
  var endTime = "";
  var cpString = "";
  var teamString = "";
  var movesetString = "";
  var exRaidEligibleString = "";
  var sponsorString = "";
  var exclusiveString = "";

  if (pokemon.id == 0) {
    startTime = "<br/><b>Starting in:</b> " + timeToString(pokemon.startingTime());
  }
  else {
    endTime = "<br/><b>Ending in:</b> " + timeToString(pokemon.remainingTime());

    var currentTeam;
    switch (pokemon.team) {
      case 0:
        currentTeam = "No team";
        break;
      case 1:
        currentTeam = "Mystic";
        break;
      case 2:
        currentTeam = "Valor";
        break;
      case 3:
        currentTeam = "Instinct";
        break;
      default:
        currentTeam = "Unknown";
    }
    teamString = "<br/><br/><b>Current team:</b> " + currentTeam;

    movesetString = "<br><b>Moveset:</b> " + getMoveName(pokemon.move1) + " | " + getMoveName(pokemon.move2);
  }

  var weatherString = "";
  var tmpWeather = parseInt(weathers[pokemon.cell_id]);
  switch (tmpWeather) {
    case 0:
      weatherString += "None";
      break;
    case 1:
      weatherString += "Clear";
      break;
    case 2:
      weatherString += "Rainy";
      break;
    case 3:
      weatherString += "Partly Cloudy";
      break;
    case 4:
      weatherString += "Cloudy";
      break;
    case 5:
      weatherString += "Windy";
      break;
    case 6:
      weatherString += "Snow";
      break;
    case 7:
      weatherString += "Fog";
      break;
    default:
      weatherString = "";
      break;
  }

  if (isRaidBoosted(pokemon)) {
    weatherString += " <b>(Boosted)</b>";
  }

  weatherString = "<br/><b>Current weather:</b> " + weatherString;

  if (pokemon.id != 0) {
    cpString = '<br/><b>CP:</b> ' + pokemon.cp;
  }

  if (pokemon.ex_raid_eligible || pokemon.sponsor) {
    exRaidEligibleString = "<br/><b>EX Raid Eligible: YES</b>";
  }

  if (pokemon.sponsor) {
    sponsorString = "<br/><b>Sponsored Gym: YES</b>";
  }

  if (pokemon.is_exclusive && pokemon.id == 0) {
    exclusiveString = "<br /><b>Will hatch Mewtwo, ex pass required to see</b>";
  }

  var genderString = "";
  var formString = "";

  if (pokemon.gender) {
    genderString = "<br/><b>Gender</b>: " + getGenderString(pokemon);
  }

  if (pokemon.form) {
    formString = "<br/><b>Form</b>: " + getFormString(pokemon);
  }

  // let coordsString = ' | <a href="javascript:navigator.clipboard.writeText(\'' + pokemon.center.lat + ',' + pokemon.center.lng + '\').then(() => { });">Coords</a>';
  let coordsString = '';
  let pbDevices = localStorage.getItem('PB_DEVICES');
  if (pbDevices) {
    pbDevices = JSON.parse(pbDevices);
    for (let i = 0; i < pbDevices.length; i++) {
      coordsString += ' | <a href="javascript:pbCoords(' + i + ',' + pokemon.center.lat + ',' + pokemon.center.lng + ')">' + pbDevices[i].name + '</a>';
    }
  }

  return '<b>Gym name:</b> ' + pokemon.gym_name + exRaidEligibleString + sponsorString + exclusiveString + '<br/><br/><b>Boss:</b> ' + getPokemonName(pokemon) + '<br/><b>Level:</b> ' + pokemon.level + cpString + formString + genderString + movesetString + teamString + weatherString + '<br/>' +  startTime + endTime + '<br/><br/><a target="_blank" href="https://maps.google.com/maps?q=' + pokemon.center.lat + ',' + pokemon.center.lng + '">Maps</a>' + coordsString;
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
  if (localStorage.getItem('firstRunGym') != "1") {
    localStorage.setItem('gym_raid_level_egg', "1");
    localStorage.setItem('gym_raid_level_boss', "1");
    localStorage.setItem('gym_raid_level_1', "0");
    localStorage.setItem('gym_raid_level_2', "0");
    localStorage.setItem('gym_raid_level_3', "0");
    localStorage.setItem('gym_raid_level_4', "1");
    localStorage.setItem('gym_raid_level_5', "1");

    localStorage.setItem('firstRunGym', "1");
  }

  if (localStorage.getItem('firstRunGymTeam') != "1") {
    localStorage.setItem('gym_raid_level_mystic', "1");
    localStorage.setItem('gym_raid_level_valor', "1");
    localStorage.setItem('gym_raid_level_instinct', "1");

    localStorage.setItem('firstRunGymTeam', "1");
  }


}

function loadPokemonList() {
  pokeDict = {};

  for (var i in pokeArray) {
    var pokemon = pokeArray[i];

    pokeDict[pokemon['i']] = {
      name: pokemon['n'],
      show_filter: pokemon['h'] ? false : true,
      types: pokemon['types']
    };
  }

  firstRun();
  reloadPokemons();
  refreshPokemons();
  setInterval(function(){
    refreshPokemons();
  }, 1000);

  setInterval(function(){
    refreshMarker();
  }, 1000);

  setInterval(function(){
    reloadPokemons();
  }, 30000);
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

function openFilter() {
  $('#filter').css('display', 'block');
  localStorage.setItem('openRaidFilter', '1');
}

function questMapToastClicked() {
  localStorage.setItem('questMapToastClicked', '1');
  document.location = "quest.html";
}

function showQuestMapToast() {
  toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-bottom-center",
    "preventDuplicates": false,
    "onclick": questMapToastClicked,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "20000",
    "extendedTimeOut": "20000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  }

  toastr.info("Introducing QUEST Map!");
}

function initMap() {
  $(document).ready(function() {
    $('#map').css('top', '40px');
    $('#map').css('bottom', '0px');

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
        $('#filter_settings').fadeIn();
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
        // reloadPokemons();
      }
    });
    map.on("dragstart", function(event) {
      shouldUpdate = false;
    });
    map.on("dragend", function(event) {
      shouldUpdate = true;
      if (shouldTurnFilterOff()) {
        inserted = 0;
        // reloadPokemons();
      }
    });
    map.on("zoomstart", function(event) {
      shouldUpdate = false;
    });
    map.on('zoomend', function() {
      shouldUpdate = true;
      refreshPokemons();
      if (shouldShowTimers()) {
        $('.pokemon_icon_timer').css('display', 'block');
      }
      else {
        $('.pokemon_icon_timer').css('display', 'none');
      }
      if (shouldTurnFilterOff()) {
        inserted = 0;
        // reloadPokemons();
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
        // reloadPokemons();
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

    var raidLevels = ['egg', 'boss', '1', '2', '3', '4', '5', 'mystic', 'valor', 'instinct', 'exraid', 'boosted'];

    for (var i = 0; i < raidLevels.length; ++i) {
      var level = raidLevels[i];
      var isFilterCheck = isPokemonChecked(level);

      var cssId = '#checkbox_raid_' + level;

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