// data.js — Données des 13 régions métropolitaines de France
const REGIONS = {
  "ile-de-france": {
    nom: "Île-de-France",
    capitale: "Paris",
    population: "12 271 794",
    superficie: "12 012 km²",
    climat: "Climat océanique dégradé : hivers doux, étés tempérés, précipitations modérées toute l'année.",
    sitesTouristiques: [
      "Tour Eiffel",
      "Musée du Louvre",
      "Château de Versailles",
      "Cathédrale Notre-Dame",
      "Arc de Triomphe",
      "Sacré-Cœur de Montmartre",
      "Disneyland Paris"
    ],
    culture: "Capitale mondiale de l'art, de la mode et de la gastronomie. Vie culturelle intense avec des centaines de musées, théâtres et galeries.",
    patrimoine: "Classée au patrimoine mondial de l'UNESCO : les rives de la Seine, le château de Versailles et le château de Fontainebleau.",
    economie: "Premier pôle économique français, centre financier européen, siège de nombreuses multinationales. PIB régional représentant ~31% du PIB national.",
    specialites: [
      "Brie de Meaux",
      "Brie de Melun",
      "Croissants et pâtisseries parisiennes",
      "Champignons de Paris"
    ],
    mode: [
      "Chanel",
      "Louis Vuitton",
      "Dior",
      "Hermès",
      "Saint Laurent",
      "Givenchy",
      "Balenciaga"
    ]
  },
  "hauts-de-france": {
    nom: "Hauts-de-France",
    capitale: "Lille",
    population: "6 004 108",
    superficie: "31 806 km²",
    climat: "Climat océanique : hivers frais et humides, étés doux. Influence maritime marquée.",
    sitesTouristiques: [
      "Beffrois de Belgique et de France (UNESCO)",
      "Cathédrale Notre-Dame d'Amiens",
      "Baie de Somme",
      "Château de Chantilly",
      "Mémorial de Vimy"
    ],
    culture: "Terre de carnavals et de traditions populaires. Le carnaval de Dunkerque est l'un des plus célèbres de France.",
    patrimoine: "Beffrois inscrits à l'UNESCO, cathédrales gothiques remarquables, sites de mémoire des deux guerres mondiales.",
    economie: "Troisième région économique de France. Agriculture intensive, industrie agroalimentaire, commerce et logistique.",
    specialites: [
      "Maroilles",
      "Endives du Nord",
      "Bêtises de Cambrai",
      "Ficelle picarde",
      "Carbonade flamande"
    ],
    mode: [
      "Kiabi (Hem)",
      "Damart (Roubaix)"
    ]
  },
  "grand-est": {
    nom: "Grand Est",
    capitale: "Strasbourg",
    population: "5 562 651",
    superficie: "57 441 km²",
    climat: "Climat semi-continental : hivers froids avec neige fréquente, étés chauds. Forte amplitude thermique.",
    sitesTouristiques: [
      "Cathédrale de Strasbourg",
      "Route des Vins d'Alsace",
      "Place Stanislas à Nancy",
      "Cathédrale de Reims",
      "Château du Haut-Kœnigsbourg"
    ],
    culture: "Carrefour des cultures française et germanique. Marchés de Noël célèbres, traditions alsaciennes et champenoises.",
    patrimoine: "Grande Île de Strasbourg (UNESCO), cathédrale de Reims (sacre des rois de France), place Stanislas à Nancy.",
    economie: "Viticulture (champagne, vins d'Alsace), industrie automobile (Peugeot), agroalimentaire et tourisme.",
    specialites: [
      "Champagne",
      "Vins d'Alsace (Riesling, Gewurztraminer)",
      "Choucroute",
      "Kouglof",
      "Quiche lorraine",
      "Mirabelles de Lorraine"
    ],
    mode: [
      "Petit Bateau (Troyes)"
    ]
  },
  "normandie": {
    nom: "Normandie",
    capitale: "Rouen",
    population: "3 325 522",
    superficie: "29 906 km²",
    climat: "Climat océanique prononcé : hivers doux, étés frais, pluies fréquentes. Brumes maritimes.",
    sitesTouristiques: [
      "Mont-Saint-Michel",
      "Falaises d'Étretat",
      "Plages du Débarquement",
      "Tapisserie de Bayeux",
      "Giverny (Jardins de Monet)"
    ],
    culture: "Berceau de l'impressionnisme. Terre de légendes et de conquêtes normandes. Forte tradition maritime.",
    patrimoine: "Mont-Saint-Michel (UNESCO), centres historiques de Rouen et Caen, mémorial du Débarquement.",
    economie: "Agriculture et élevage (produits laitiers), industrie pharmaceutique, tourisme balnéaire et culturel, port du Havre.",
    specialites: [
      "Camembert",
      "Calvados",
      "Cidre normand",
      "Teurgoule",
      "Tripes à la mode de Caen"
    ],
    mode: []
  },
  "bretagne": {
    nom: "Bretagne",
    capitale: "Rennes",
    population: "3 373 835",
    superficie: "27 208 km²",
    climat: "Climat océanique tempéré : hivers doux, étés frais. Vents forts sur le littoral, précipitations régulières.",
    sitesTouristiques: [
      "Alignements de Carnac",
      "Côte de Granit Rose",
      "Saint-Malo (cité corsaire)",
      "Pointe du Raz",
      "Forêt de Brocéliande"
    ],
    culture: "Culture celtique vivante : fest-noz, musique bretonne, danse traditionnelle. Forte identité régionale et langue bretonne.",
    patrimoine: "Alignements mégalithiques de Carnac, remparts de Saint-Malo, cathédrale de Quimper, patrimoine maritime exceptionnel.",
    economie: "Premier pôle agroalimentaire français, pêche et mytiliculture, télécommunications (Lannion), cybersécurité (Rennes).",
    specialites: [
      "Crêpes et galettes bretonnes",
      "Kouign-amann",
      "Huîtres de Cancale",
      "Cidre breton",
      "Far breton",
      "Beurre salé"
    ],
    mode: [
      "Armor Lux (Quimper)",
      "Saint James"
    ]
  },
  "pays-de-la-loire": {
    nom: "Pays de la Loire",
    capitale: "Nantes",
    population: "3 838 060",
    superficie: "32 082 km²",
    climat: "Climat océanique doux : hivers modérés, étés agréables. Ensoleillement généreux sur la côte.",
    sitesTouristiques: [
      "Châteaux de la Loire (Chambord, Chenonceau)",
      "Le Mans (circuit des 24 Heures)",
      "Machines de l'île à Nantes",
      "Abbaye de Fontevraud",
      "La Baule"
    ],
    culture: "Terre des châteaux de la Renaissance. Le festival des 24 Heures du Mans, le Voyage à Nantes, et le Hellfest.",
    patrimoine: "Châteaux de la Loire inscrits à l'UNESCO, abbaye de Fontevraud, centre historique de Nantes.",
    economie: "Industrie aéronautique (Airbus à Nantes), agroalimentaire, construction navale, tourisme.",
    specialites: [
      "Muscadet",
      "Rillettes du Mans",
      "Sel de Guérande",
      "Berlingots nantais",
      "Curé nantais"
    ],
    mode: []
  },
  "centre-val-de-loire": {
    nom: "Centre-Val de Loire",
    capitale: "Orléans",
    population: "2 573 180",
    superficie: "39 151 km²",
    climat: "Climat océanique dégradé à tendance continentale : hivers frais, étés chauds et secs.",
    sitesTouristiques: [
      "Château de Chambord",
      "Château de Chenonceau",
      "Cathédrale de Chartres",
      "Zoo de Beauval",
      "Château d'Amboise"
    ],
    culture: "Jardin de la France, terre de l'art de vivre à la Renaissance. Patrie de Rabelais et de Jeanne d'Arc.",
    patrimoine: "Val de Loire inscrit à l'UNESCO, cathédrale de Chartres (UNESCO), châteaux royaux.",
    economie: "Cosmétique (Cosmetic Valley), pharmacie, céréales, tourisme culturel et œnologique.",
    specialites: [
      "Vins de Touraine (Vouvray, Chinon)",
      "Tarte Tatin",
      "Pithiviers",
      "Crottin de Chavignol",
      "Pralines de Montargis"
    ],
    mode: [
      "Christian Dior (Granville, influence locale)"
    ]
  },
  "bourgogne-franche-comte": {
    nom: "Bourgogne-Franche-Comté",
    capitale: "Dijon",
    population: "2 807 807",
    superficie: "47 784 km²",
    climat: "Climat semi-continental : hivers rigoureux, étés chauds. Neige fréquente dans le Jura.",
    sitesTouristiques: [
      "Hospices de Beaune",
      "Abbaye de Fontenay",
      "Citadelle de Besançon (Vauban)",
      "Vignobles de Bourgogne",
      "Vézelay"
    ],
    culture: "Terre de gastronomie et de grands vins. Berceau de l'art roman avec les abbayes de Cluny et Vézelay.",
    patrimoine: "Climats du vignoble de Bourgogne (UNESCO), basilique de Vézelay, citadelle Vauban de Besançon, abbaye de Fontenay.",
    economie: "Viticulture de prestige (Bourgogne), horlogerie (Besançon), métallurgie, industrie automobile (PSA Sochaux).",
    specialites: [
      "Bourgogne (Romanée-Conti, Chablis, Meursault)",
      "Moutarde de Dijon",
      "Époisses",
      "Bœuf bourguignon",
      "Escargots de Bourgogne",
      "Comté"
    ],
    mode: []
  },
  "nouvelle-aquitaine": {
    nom: "Nouvelle-Aquitaine",
    capitale: "Bordeaux",
    population: "6 033 952",
    superficie: "84 036 km²",
    climat: "Climat océanique au nord et à l'ouest, climat océanique altéré au sud-est. Hivers doux, étés chauds et ensoleillés.",
    sitesTouristiques: [
      "Dune du Pilat",
      "Bordeaux (Port de la Lune)",
      "Futuroscope de Poitiers",
      "Grottes de Lascaux",
      "Biarritz et la Côte Basque"
    ],
    culture: "Terre de traditions basques, gasconnes et périgourdines. Fêtes de Bayonne, gastronomie périgourdine.",
    patrimoine: "Bordeaux – Port de la Lune (UNESCO), juridiction de Saint-Émilion, grottes préhistoriques du Périgord.",
    economie: "Première région agricole de France, viticulture (Bordeaux), aéronautique, tourisme balnéaire et culturel.",
    specialites: [
      "Vins de Bordeaux",
      "Foie gras du Périgord",
      "Canelés bordelais",
      "Piment d'Espelette",
      "Huîtres du Bassin d'Arcachon",
      "Cognac"
    ],
    mode: []
  },
  "occitanie": {
    nom: "Occitanie",
    capitale: "Toulouse",
    population: "5 973 969",
    superficie: "72 724 km²",
    climat: "Climat méditerranéen à l'est, océanique au sud-ouest, montagnard dans les Pyrénées. Étés chauds et secs.",
    sitesTouristiques: [
      "Cité de Carcassonne",
      "Pont du Gard",
      "Canal du Midi",
      "Cirque de Gavarnie",
      "Cité de l'Espace à Toulouse"
    ],
    culture: "Terre de troubadours et de rugby. Culture occitane vivante, cathares et chevalerie médiévale.",
    patrimoine: "Canal du Midi (UNESCO), cité de Carcassonne (UNESCO), pont du Gard (UNESCO), chemins de Saint-Jacques-de-Compostelle.",
    economie: "Capital aéronautique européen (Airbus, ATR), spatial (CNES à Toulouse), viticulture, tourisme.",
    specialites: [
      "Cassoulet de Castelnaudary",
      "Roquefort",
      "Violette de Toulouse",
      "Armagnac",
      "Floc de Gascogne",
      "Vins du Languedoc"
    ],
    mode: []
  },
  "auvergne-rhone-alpes": {
    nom: "Auvergne-Rhône-Alpes",
    capitale: "Lyon",
    population: "8 092 526",
    superficie: "69 711 km²",
    climat: "Climat continental en plaine, montagnard en altitude. Hivers froids avec neige abondante en montagne, étés chauds en vallée.",
    sitesTouristiques: [
      "Mont Blanc et Chamonix",
      "Vieux Lyon (UNESCO)",
      "Volcans d'Auvergne",
      "Gorges de l'Ardèche",
      "Stations de ski (Courchevel, Val d'Isère)"
    ],
    culture: "Capitale de la gastronomie française (Lyon). Fête des Lumières, biennales d'art, traditions montagnardes.",
    patrimoine: "Vieux Lyon (UNESCO), chaîne des Puys (UNESCO), grottes ornées de l'Ardèche, thermes romains de Vienne.",
    economie: "Deuxième pôle économique français. Industrie pharmaceutique, chimie, technologie, tourisme hivernal et gastronomique.",
    specialites: [
      "Saint-Marcellin",
      "Quenelles de Lyon",
      "Nougat de Montélimar",
      "Saint-Nectaire",
      "Cantal",
      "Lentilles vertes du Puy"
    ],
    mode: [
      "Vêtements Lafuma (Anneyron)",
      "Rossignol (Isère)"
    ]
  },
  "provence-alpes-cote-d-azur": {
    nom: "Provence-Alpes-Côte d'Azur",
    capitale: "Marseille",
    population: "5 098 935",
    superficie: "31 400 km²",
    climat: "Climat méditerranéen : étés chauds et secs, hivers doux. Mistral soufflant dans la vallée du Rhône.",
    sitesTouristiques: [
      "Calanques de Marseille",
      "Palais des Papes à Avignon",
      "Promenade des Anglais à Nice",
      "Gorges du Verdon",
      "Saint-Tropez et la Côte d'Azur"
    ],
    culture: "Art de vivre provençal, marchés colorés, lavande et cigales. Festival d'Avignon, festival de Cannes.",
    patrimoine: "Palais des Papes d'Avignon (UNESCO), arènes d'Arles, théâtre antique d'Orange, grotte Cosquer.",
    economie: "Tourisme (première destination mondiale), port de Marseille-Fos, technologie (Sophia Antipolis), agriculture (lavande, olive).",
    specialites: [
      "Bouillabaisse",
      "Calissons d'Aix",
      "Vins de Provence (rosé)",
      "Huile d'olive",
      "Navettes marseillaises",
      "Savon de Marseille"
    ],
    mode: [
      "Jacquemus (né à Mallemort)"
    ]
  },
  "corse": {
    nom: "Corse",
    capitale: "Ajaccio",
    population: "349 465",
    superficie: "8 680 km²",
    climat: "Climat méditerranéen : étés chauds et secs, hivers doux sur le littoral. Montagnard à l'intérieur.",
    sitesTouristiques: [
      "Réserve naturelle de Scandola (UNESCO)",
      "Calanques de Piana",
      "Citadelle de Bonifacio",
      "Sentier GR20",
      "Plage de Palombaggia"
    ],
    culture: "Île de Beauté aux traditions fortes : chants polyphoniques corses, fêtes patronales, culture pastorale.",
    patrimoine: "Golfe de Porto – Scandola (UNESCO), tours génoises, citadelle de Calvi, maison natale de Napoléon à Ajaccio.",
    economie: "Tourisme (principal moteur économique), agriculture (vignes, agrumes, châtaignes), artisanat.",
    specialites: [
      "Brocciu (fromage AOP)",
      "Charcuterie corse (lonzu, coppa, prisuttu)",
      "Fiadone",
      "Clémentine de Corse",
      "Vins corses (Patrimonio, Ajaccio)",
      "Miel de Corse"
    ],
    mode: []
  }
};
