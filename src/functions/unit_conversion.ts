export function getConversionFactor(unit: string, name_en:string): number {
  let conversionFactor: number = 0;

  let volumeMatch: RegExpMatchArray | null = unit.match(/^(?<prefix>.)?l$/i);
  if (volumeMatch !== null) {
    if (volumeMatch.groups !== undefined) {
      if (volumeMatch.groups.prefix == "c") {
        conversionFactor = 10;
      } else if (volumeMatch.groups.prefix == "m") {
        conversionFactor = 1;
      } else if (volumeMatch.groups.prefix == "d") {
        conversionFactor = 100;
      } else if (volumeMatch.groups.prefix === undefined) {
        conversionFactor = 1000;
      }
    }
  }

  let massMatch: RegExpMatchArray | null = unit.match(/^(?<prefix>.)?g$/i);
  if (massMatch !== null) {
    if (massMatch.groups !== undefined) {
      if (massMatch.groups.prefix == "c") {
        conversionFactor = 0.01;
      } else if (massMatch.groups.prefix == "m") {
        conversionFactor = 0.001;
      } else if (massMatch.groups.prefix == "d") {
        conversionFactor = 0.1;
      } else if (massMatch.groups.prefix === undefined) {
        conversionFactor = 1;
      } else if (massMatch.groups.prefix == "k") {
        conversionFactor = 1000;
      }
    }
  }

  let csMatch: RegExpMatchArray | null = unit.match(/^cs$/i);
  if (csMatch !== null) {
    conversionFactor = 15;
  }

  let ccMatch: RegExpMatchArray | null = unit.match(/^cc$/i);
  if (ccMatch !== null) {
    conversionFactor = 5;
  }

  if (conversionFactor === 0) {
    if (name_en in measures) {
      conversionFactor = Number(measures[name_en])
    } else if (name_en.replace(/s$/, "") in measures) {
      conversionFactor = Number(measures[name_en.replace(/s$/, "")])
    } else if (unit in common_unit_measures) {
      conversionFactor = Number(common_unit_measures[unit])  
    }
  }

  return conversionFactor;
}


const common_unit_measures: any = {
  gousse:"5",
  pincée:"0.5"
}

const measures:any = {
  "anchovy":"4",
  "aniseed ring":"17",
  "apple":"176",
  "artichoke":"133",
  "avocado":"159",
  "broccoli":"400",
  "baby carrot":"18",
  "bagel":"120",
  "bean":"4,3",
  "beetroot":"82",
  "blini":"14",
  "block":"170",
  "breast":"248",
  "brussel sprout":"19",
  "basil":"40",
  "coriander":"40",
  "mint":"40",
  "parsley":"40",
  "spinach":"340",
  "bush apple":"138",
  "cabbage":"454",
  "calamari ring":"22",
  "capsicum":"261",
  "bell pepper":"261",
  "carrot":"129",
  "celeriac":"254",
  "chat/baby":"93",
  "chilli":"15",
  "lamb chop":"76",
  "veal chop":"192",
  "pork chop":"150",
  "choy sum":"87",
  "bok choy":"87",
  "clove":"3",
  "coconut":"106",
  "crab":"106",
  "crab claw":"50",
  "crepe":"115",
  "croissant":"67",
  "crumpet":"62",
  "cube":"5",
  "cucumber":"227",
  "lamb cutlet":"31",
  "veal cutlet":"188",
  "dragon fruit":"182",
  "drumstick":"101",
  "corn":"163",
  "egg":"44",
  "eggplant":"459",
  "fennel":"234",
  "pork fillet":"280",
  "chicken fillet":"198",
  "buffalo fillet":"200",
  "kangaroo fillet":"154",
  "barramundi fillet":"125",
  "bassa fillet":"100",
  "dugong fillet":"111",
  "flathead fillet":"125",
  "mackerel fillet":"150",
  "kingfish fillet":"110",
  "trout fillet":"140",
  "turtle fillet":"140",
  "herring fillet":"15",
  "salmon fillet":"142",
  "tuna steak":"140",
  "floret":"36",
  "floret/piece":"20",
  "apricot":"59",
  "banana":"98",
  "blackberry":"5",
  "blueberry":"1,2",
  "cherry":"7",
  "cranberry":"1,2",
  "kumquat":"19",
  "feijoa":"30",
  "fig":"50",
  "grape":"4,5",
  "grapefruit":"258",
  "guava":"90",
  "jackfruit":"805",
  "kiwi":"86",
  "lemon":"99",
  "lime":"49",
  "loquat":"13",
  "lychee":"10",
  "mandarin":"75",
  "tangelo":"115",
  "tangerine":"86",
  "mango":"294",
  "berry":"4,4",
  "mulberry":"5",
  "nectarine":"151",
  "orange":"193",
  "passionfruit":"18",
  "papaya":"201",
  "peach":"206",
  "pear":"176",
  "pepino":"123",
  "persimmon":"76",
  "pineapple":"550",
  "pomegranate":"240",
  "quince":"463",
  "raisin":"1,4",
  "rambutan":"16",
  "raspberry":"1,9",
  "strawberry":"12",
  "tamarillo":"71",
  "cheese fruit":"60",
  "quandong":"4,5",
  "endive":"390",
  "artichoke heart":"40",
  "laughing cow":"21",
  "spinach leaf":"10",
  "leek":"195",
  "leg steak":"177",
  "lettuce":"300",
  "lollipop":"12",
  "marshmallow":"5",
  "meatball":"34",
  "medallion":"115",
  "melon":"945",
  "watermelon":"3000",
  "muffin":"163",
  "mushroom":"35",
  "almond":"1,2",
  "brazil nut":"3,3",
  "cashew":"1,3",
  "chestnut":"8,4",
  "hazelnut":"0,8",
  "macadamia":"2",
  "peanut":"0,9",
  "pecan":"2,2",
  "pine nut":"0,05",
  "pistachio":"0,8",
  "walnut":"2,2",
  "octopus":"500",
  "okra":"10,6",
  "onion":"132",
  "oyster":"15",
  "pancake":"68",
  "pappadam":"10",
  "parsnip":"72",
  "pea":"1,2",
  "pikelet":"25",
  "pipi":"10",
  "plum":"31",
  "pod":"4",
  "possum":"200",
  "potato":"239",
  "prawn":"19",
  "shrimp":"19",
  "radish":"20",
  "rasher":"64",
  "rib":"81",
  "sausage":"94",
  "scallop":"13",
  "seed":"0,05",
  "shallot":"5,5",
  "shank":"164",
  "slice":"25",
  "snow pea":"3,3",
  "asparagus":"16",
  "spear":"16",
  "spring onion":"15",
  "sprout":"0,5",
  "square":"5",
  "squash":"57",
  "stalk":"40",
  "starfruit":"91",
  "steak":"206",
  "lamb steak":"81",
  "swede":"276",
  "sweet potato":"420",
  "tail":"264",
  "thigh":"148",
  "cherry tomato":"8",
  "tomato":"138",
  "turnip":"122",
  "waffle":"55",
  "caper":"0,5",
  "gherkin":"25",
  "olive":"4",
  "wing":"46",
  "yabby":"13",
  "zucchini":"195",
  }