const SLOT_ORDER = [
  { key: "fullback", label: "Fullback", line: "fullback" },
  { key: "wing", label: "Wing 1", line: "wings" },
  { key: "wing", label: "Wing 2", line: "wings" },
  { key: "centre", label: "Centre 1", line: "centres" },
  { key: "centre", label: "Centre 2", line: "centres" },
  { key: "half", label: "Half 1", line: "halves" },
  { key: "half", label: "Half 2", line: "halves" },
  { key: "edge", label: "Edge 1", line: "edges" },
  { key: "edge", label: "Edge 2", line: "edges" },
  { key: "middle", label: "Middle 1", line: "middles" },
  { key: "middle", label: "Middle 2", line: "middles" },
  { key: "lock", label: "Lock", line: "lock" },
  { key: "hooker", label: "Hooker", line: "hooker" }
];

const SLOT_LINES = [
  { key: "fullback", slots: [0] },
  { key: "wings", slots: [1, 2] },
  { key: "centres", slots: [3, 4] },
  { key: "halves", slots: [5, 6] },
  { key: "edges", slots: [7, 8] },
  { key: "middles", slots: [9, 10] },
  { key: "lock", slots: [11] },
  { key: "hooker", slots: [12] }
];

const POSITION_LABELS = {
  fullback: "FB",
  wing: "Wing",
  centre: "Centre",
  half: "Half",
  edge: "Edge",
  middle: "Middle",
  lock: "Lock",
  hooker: "Hooker"
};

const SPINE_POSITIONS = ["fullback", "half", "hooker"];

const PLAY_STYLES = {
  balanced: {
    label: "Balanced",
    description: "No major trade-off",
    attack: 0,
    defence: 0,
    power: 0,
    clutch: 0,
    tempo: 1
  },
  attacking: {
    label: "Attacking",
    description: "More points, leakier defence",
    attack: 6,
    defence: -4,
    power: 1,
    clutch: 0,
    tempo: 1.08
  },
  defensive: {
    label: "Defensive",
    description: "Lower scores, harder to break",
    attack: -4,
    defence: 6,
    power: 2,
    clutch: 1,
    tempo: 0.92
  }
};

const WEATHER_TYPES = [
  { key: "dry", label: "Dry", attack: 1.02, defence: 0.99, kicking: 1.02, tempo: 1.02, variance: 1 },
  { key: "wet", label: "Wet", attack: 0.9, defence: 1.04, kicking: 0.9, tempo: 0.9, variance: 1.2 },
  { key: "cold", label: "Cold", attack: 0.96, defence: 1.03, kicking: 0.97, tempo: 0.94, variance: 1.08 },
  { key: "hot", label: "Hot", attack: 1, defence: 0.95, kicking: 0.98, tempo: 1.03, variance: 1.12 },
  { key: "windy", label: "Windy", attack: 0.97, defence: 1, kicking: 0.84, tempo: 0.98, variance: 1.22 },
  { key: "humid", label: "Humid", attack: 0.98, defence: 0.96, kicking: 0.98, tempo: 1, variance: 1.14 }
];

const TEAM_COLOURS = {
  Adelaide: ["#c8102e", "#f6c343"],
  Balmain: ["#f58220", "#111111"],
  Brisbane: ["#6f263d", "#f2a900"],
  Canberra: ["#84bd00", "#1d428a"],
  "Canterbury-Bankstown": ["#005eb8", "#ffffff"],
  "Cronulla-Sutherland": ["#67b7e8", "#111111"],
  Dolphins: ["#e2231a", "#f6c343"],
  "Gold Coast": ["#00a3e0", "#f2a900"],
  Illawarra: ["#d71920", "#ffffff"],
  "Manly Warringah": ["#6f263d", "#ffffff"],
  Melbourne: ["#512d6d", "#fdb515"],
  Newcastle: ["#005eb8", "#c8102e"],
  "North Queensland": ["#0b1f3a", "#f6c343"],
  "North Sydney": ["#e2231a", "#111111"],
  "Northern Eagles": ["#6f263d", "#ffffff"],
  Parramatta: ["#005eb8", "#f2a900"],
  Penrith: ["#111111", "#ff5ca8"],
  "South Sydney": ["#00843d", "#e2231a"],
  "St George": ["#e2231a", "#ffffff"],
  "St George Illawarra": ["#e2231a", "#ffffff"],
  "Sydney Roosters": ["#0033a0", "#e2231a"],
  Warriors: ["#003b5c", "#00a3a1"],
  "Wests Tigers": ["#f58220", "#111111"],
  "Western Suburbs": ["#111111", "#ffffff"],
  "NRL Invincible": ["#b7ef5d", "#67d8d0"]
};

const TEAM_ALIASES = {
  Auckland: "Warriors",
  "New Zealand Warriors": "Warriors",
  "Sydney City": "Sydney Roosters",
  "Eastern Suburbs": "Sydney Roosters",
  "Gold Coast Titans": "Gold Coast",
  "Gold Coast Seagulls": "Gold Coast",
  Redcliffe: "Dolphins",
  "Redcliffe Dolphins": "Dolphins",
  St: "St George"
};

const CAREER_POSITION_OVERRIDES = {
  anthonyminichiello: ["fullback", "wing"],
  andrewjohns: ["half"],
  darrenlockyer: ["fullback", "half"],
  greginglis: ["centre", "fullback", "wing"],
  billyslater: ["fullback"],
  cameronmunster: ["half", "fullback"],
  bradfittler: ["half", "centre", "lock"],
  cameronsmith: ["hooker", "half"],
  johnathanthurston: ["half"],
  coopercronk: ["half"],
  johnsutton: ["edge", "half", "lock"],
  jarrydhayne: ["fullback", "wing", "centre"],
  dariusboyd: ["fullback", "wing", "centre"],
  rogertuivasasheck: ["fullback", "wing"],
  kalynponga: ["fullback", "half"],
  clintgutherson: ["fullback", "centre", "half"],
  latrellmitchell: ["centre", "fullback"],
  valentineholmes: ["wing", "fullback", "centre"],
  jamestedesco: ["fullback"]
};

const CAREER_RATING_CALIBRATION = {
  "aaron-woods-16588": 85,
  "adam-blair-3530": 85,
  "adam-wheeler-2938": 48,
  "alex-twal-23762": 88,
  "allan-langer-227": 98,
  "andrew-johns-276": 99,
  "andrew-mccullough-7732": 89,
  "anthony-minichiello-834": 95,
  "anthony-seibold-3210": 59,
  "beau-scott-2834": 89,
  "ben-creagh-811": 90,
  "ben-hannant-848": 87,
  "ben-kusto-1455": 76,
  "benji-marshall-312": 94,
  "bill-tupou-14518": 80,
  "billy-slater-735": 98,
  "blaine-stanley-1497": 79,
  "blake-taaffe-31263": 79,
  "brent-kite-825": 91,
  "brett-finch-1389": 89,
  "brett-oliver-154": 54,
  "brian-kelly-23406": 84,
  "brian-to-o-28598": 93,
  "bryce-cartwright-20829": 84,
  "caleb-binge-20837": 48,
  "cameron-mcinnes-20170": 89,
  "cameron-munster-20831": 93,
  "cameron-smith-742": 99,
  "chase-stanley-5561": 77,
  "chevy-stewart-37919": 67,
  "chris-houston-5567": 84,
  "chris-levy-2867": 48,
  "chris-lewis-29828": 80,
  "christian-crichton-25267": 80,
  "cody-walker-22612": 93,
  "cooper-cronk-1595": 98,
  "corey-horsburgh-28215": 88,
  "corey-norman-14500": 86,
  "corey-parker-116": 93,
  "craig-hall-274": 77,
  "craig-smith-1757": 81,
  "daly-cherry-evans-16582": 93,
  "damien-mostyn-2766": 76,
  "dan-hunt-5551": 85,
  "daniel-frame-2337": 56,
  "daniel-wagon-759": 88,
  "danny-buderus-782": 94,
  "danny-fualalo-21502": 70,
  "darius-boyd-3516": 91,
  "darren-lockyer-111": 98,
  "dave-taylor-3722": 86,
  "david-fifita-20722": 54,
  "david-fusitu-a-20719": 84,
  "david-howell-788": 77,
  "david-klemmer-20223": 85,
  "david-nofoaluma-20268": 83,
  "dean-ieremia-30863": 81,
  "dean-matterson-35520": 52,
  "demitric-vaimauga-37238": 64,
  "erin-clark-22763": 86,
  "euan-aitken-21476": 83,
  "frank-pritchard-777": 90,
  "fuifui-moimoi-1402": 84,
  "gavin-lester-1305": 81,
  "george-fai-23419": 48,
  "gerard-beale-13877": 88,
  "glen-fisiiahi-16578": 71,
  "gorden-tallis-1273": 97,
  "gordon-chan-kum-tong-37246": 54,
  "gray-viane-2332": 48,
  "greg-alexander-346": 91,
  "greg-eastwood-3165": 86,
  "greg-inglis-1379": 98,
  "isaah-yeo-20713": 95,
  "issac-luke-5665": 89,
  "jack-cole-34025": 73,
  "jack-de-belin-17216": 89,
  "jack-wighton-19515": 90,
  "jacob-liddle-22806": 81,
  "jacob-saifiti-21515": 83,
  "jahrome-hughes-20275": 97,
  "jake-trbojevic-20586": 90,
  "jake-turpin-26262": 71,
  "jakob-arthur-30903": 76,
  "jamal-shibasaki-38577": 48,
  "james-fisher-harris-22606": 93,
  "james-maloney-13818": 90,
  "james-mcmanus-5547": 83,
  "james-segeyaro-16662": 84,
  "james-tedesco-19474": 98,
  "jamie-lyon-1635": 92,
  "jarryd-hayne-3709": 93,
  "jason-croker-209": 89,
  "jason-death-18": 80,
  "jason-king-827": 87,
  "jason-moodie-1278": 86,
  "jason-ryles-810": 86,
  "jason-stevens-294": 87,
  "jason-taumalolo-15034": 95,
  "jaylan-de-groot-37323": 74,
  "jeff-hardy-533": 76,
  "jeremy-marshall-king-23993": 88,
  "jesse-bromwich-14505": 94,
  "joe-ofahengaue-21473": 81,
  "joel-thompson-7862": 84,
  "john-williams-2751": 80,
  "johnathan-thurston-125": 99,
  "johnathon-ford-15030": 70,
  "jonah-pezet-35412": 76,
  "jonus-pearson-22843": 70,
  "josh-addo-carr-22717": 90,
  "josh-hoffman-7803": 82,
  "josh-lewis-3725": 74,
  "josh-perry-1394": 85,
  "junior-paulo-20880": 89,
  "justin-hodges-107": 91,
  "justin-o-neill-15020": 89,
  "kane-elgey-21483": 76,
  "keith-galloway-1592": 85,
  "kevin-proctor-7737": 90,
  "kobe-hetherington-30910": 85,
  "korbin-sims-20241": 79,
  "lachlan-galvin-47250": 83,
  "lachlan-lewis-26198": 75,
  "lamar-liolevave-21480": 48,
  "leeson-ah-mau-13578": 86,
  "lewis-brown-13862": 84,
  "lewis-dodd-30247": 59,
  "lorenzo-ma-afu-7726": 48,
  "luke-burt-758": 88,
  "luke-dorn-2370": 77,
  "luke-douglas-3519": 88,
  "luke-kelly-13944": 77,
  "luke-lewis-324": 91,
  "luke-priddis-331": 88,
  "manu-vatuvei-171": 83,
  "mark-lennon-3365": 48,
  "mark-riddell-765": 85,
  "mat-croker-31084": 73,
  "matt-bowen-123": 90,
  "matt-burton-28814": 94,
  "matt-eisenhuth-23753": 85,
  "matt-frawley-23469": 77,
  "matt-french-35525": 48,
  "matt-gillett-14502": 92,
  "matt-orford-741": 90,
  "michael-ennis-815": 90,
  "michael-hodgson-1490": 89,
  "michael-lichaa-20721": 78,
  "michael-sullivan-302": 70,
  "micheal-luck-137": 85,
  "mitch-rein-16581": 84,
  "mitchell-aubusson-5553": 85,
  "nathan-cayless-764": 90,
  "nathan-cleary-22776": 99,
  "nathan-gardner-14545": 74,
  "nathan-hindmarsh-767": 90,
  "nene-macdonald-20645": 82,
  "nick-slyney-7815": 48,
  "patrice-siolo-20912": 48,
  "paul-gallen-299": 95,
  "paul-khoury-1684": 71,
  "payne-haas-25859": 98,
  "peter-lewis-1481": 67,
  "peter-wallace-2748": 88,
  "phillip-lee-1274": 84,
  "preston-campbell-328": 89,
  "rangi-chase-3760": 70,
  "reed-mahoney-26162": 87,
  "reimis-smith-22773": 86,
  "robbie-beckett-648": 80,
  "roger-tuivasa-sheck-19974": 94,
  "ronaldo-mulitalo-28465": 88,
  "roy-asotasi-147": 87,
  "ryan-hoffman-745": 93,
  "sam-burgess-3482": 94,
  "sam-thaiday-122": 91,
  "sandor-earl-13917": 77,
  "scott-murray-1855": 48,
  "shane-gray-20274": 48,
  "shaun-johnson-17202": 89,
  "siliva-havili-20657": 81,
  "simon-mannering-2246": 89,
  "simon-woolford-700": 87,
  "sione-katoa-24765": 87,
  "stephen-crichton-28813": 94,
  "suliasi-vunivalu-22719": 88,
  "taine-tuaupiki-35163": 76,
  "tame-tupou-1766": 80,
  "tanah-boyd-28831": 84,
  "tim-grant-5643": 80,
  "tim-mannah-13577": 87,
  "toby-rudolf-29765": 84,
  "tohu-harris-20221": 90,
  "tom-trbojevic-21487": 96,
  "trai-fuller-35222": 81,
  "tui-kamikamica-22760": 85,
  "tyrone-may-23814": 84,
  "william-zillman-3524": 84,
  "willie-poching-58": 48,
  "zeb-taia-3536": 70
};

const IMMORTAL_RATINGS = ratings(100, 100, 100, 100, 100, 100, 100);
const IMMORTAL_OFFER_CHANCE = 0.015;
const IMMORTAL_OPPONENT_CHANCE = 0.012;
const IMMORTAL_GRAND_FINAL_CHANCE = 0.08;

const IMMORTALS = [
  immortal("clive-churchill", "Clive Churchill", 1981, ["South Sydney"], ["fullback", "half"], "Immortal fullback"),
  immortal("bob-fulton", "Bob Fulton", 1981, ["Manly Warringah", "Sydney Roosters"], ["centre", "half", "lock"], "Immortal backline genius"),
  immortal("reg-gasnier", "Reg Gasnier", 1981, ["St George", "St George Illawarra"], ["centre", "fullback", "half"], "Immortal centre"),
  immortal("johnny-raper", "Johnny Raper", 1981, ["St George", "St George Illawarra", "Western Suburbs"], ["lock", "half", "edge", "centre", "middle"], "Immortal lock"),
  immortal("graeme-langlands", "Graeme Langlands", 1999, ["St George", "St George Illawarra"], ["fullback", "centre", "wing"], "Immortal fullback"),
  immortal("wally-lewis", "Wally Lewis", 1999, ["Brisbane", "Gold Coast"], ["half", "lock", "centre"], "Immortal five-eighth"),
  immortal("arthur-beetson", "Arthur Beetson", 2003, ["Balmain", "Sydney Roosters", "Parramatta", "Dolphins"], ["middle", "edge", "lock"], "Immortal forward"),
  immortal("andrew-johns", "Andrew Johns", 2012, ["Newcastle"], ["half", "hooker"], "Immortal halfback"),
  immortal("dave-brown", "Dave Brown", 2018, ["Sydney Roosters"], ["centre", "wing", "fullback", "half"], "Immortal centre"),
  immortal("frank-burge", "Frank Burge", 2018, ["St George", "St George Illawarra"], ["lock", "edge", "middle", "wing", "centre", "hooker"], "Immortal forward"),
  immortal("mal-meninga", "Mal Meninga", 2018, ["Canberra"], ["centre", "edge", "half", "wing"], "Immortal centre"),
  immortal("dally-messenger", "Dally Messenger", 2018, ["Sydney Roosters"], ["centre", "wing", "half"], "Immortal centre"),
  immortal("norm-provan", "Norm Provan", 2018, ["St George", "St George Illawarra"], ["edge", "lock"], "Immortal second-rower"),
  immortal("ron-coote", "Ron Coote", 2024, ["South Sydney", "Sydney Roosters"], ["lock", "edge", "centre", "middle"], "Immortal lock")
];

function ratings(overall, attack, defence, workrate, kicking, goalKicking, bigGame) {
  return { overall, attack, defence, workrate, kicking, goalKicking, bigGame };
}

function player(id, careerId, name, season, club, positions, role, ratingSet) {
  return { id, careerId, name, season, club, positions, role, ratings: ratingSet };
}

function immortal(id, name, induction, clubs, positions, role) {
  return { id, name, induction, clubs, positions, role };
}

const PLAYER_SEASONS = [
  player("lockyer-1998-brisbane", "darren-lockyer", "Darren Lockyer", 1998, "Brisbane", ["fullback", "half"], "electric ball-player", ratings(94, 95, 82, 86, 88, 55, 94)),
  player("sailor-1998-brisbane", "wendell-sailor", "Wendell Sailor", 1998, "Brisbane", ["wing", "centre"], "power winger", ratings(90, 91, 77, 85, 36, 20, 88)),
  player("renouf-1998-brisbane", "steve-renouf", "Steve Renouf", 1998, "Brisbane", ["centre"], "strike centre", ratings(89, 91, 76, 78, 32, 20, 87)),
  player("langer-1998-brisbane", "allan-langer", "Allan Langer", 1998, "Brisbane", ["half"], "scheming halfback", ratings(92, 91, 80, 87, 92, 32, 95)),
  player("tallis-1998-brisbane", "gorden-tallis", "Gorden Tallis", 1998, "Brisbane", ["edge", "middle"], "rampaging forward", ratings(91, 87, 88, 91, 24, 10, 94)),
  player("webcke-1998-brisbane", "shane-webcke", "Shane Webcke", 1998, "Brisbane", ["middle"], "elite prop", ratings(90, 79, 91, 93, 18, 10, 91)),
  player("gee-1998-brisbane", "andrew-gee", "Andrew Gee", 1998, "Brisbane", ["middle", "edge"], "workhorse forward", ratings(84, 72, 85, 88, 16, 10, 82)),
  player("priddis-1998-brisbane", "luke-priddis", "Luke Priddis", 1998, "Brisbane", ["hooker"], "busy dummy-half", ratings(82, 78, 80, 86, 58, 40, 81)),

  player("ross-1999-melbourne", "robbie-ross", "Robbie Ross", 1999, "Melbourne", ["fullback"], "support fullback", ratings(86, 86, 78, 82, 50, 20, 86)),
  player("bai-1999-melbourne", "marcus-bai", "Marcus Bai", 1999, "Melbourne", ["wing"], "finishing winger", ratings(88, 90, 74, 83, 28, 10, 87)),
  player("geyer-1999-melbourne", "matt-geyer", "Matt Geyer", 1999, "Melbourne", ["wing", "centre"], "utility outside back", ratings(85, 85, 78, 84, 52, 78, 85)),
  player("hill-1999-melbourne", "scott-hill", "Scott Hill", 1999, "Melbourne", ["half", "centre"], "running five-eighth", ratings(86, 86, 77, 82, 78, 28, 87)),
  player("kimmorley-1999-melbourne", "brett-kimmorley", "Brett Kimmorley", 1999, "Melbourne", ["half"], "tempo halfback", ratings(89, 87, 80, 86, 91, 55, 90)),
  player("nikau-1999-melbourne", "tawera-nikau", "Tawera Nikau", 1999, "Melbourne", ["edge", "middle"], "grand final edge", ratings(87, 83, 84, 87, 22, 10, 91)),
  player("howe-1999-melbourne", "rodney-howe", "Rodney Howe", 1999, "Melbourne", ["middle"], "heavy-contact prop", ratings(84, 72, 85, 87, 16, 10, 84)),
  player("swain-1999-melbourne", "richard-swain", "Richard Swain", 1999, "Melbourne", ["hooker"], "defensive hooker", ratings(84, 76, 87, 91, 56, 22, 85)),

  player("odavis-2001-newcastle", "robbie-odavis", "Robbie O'Davis", 2001, "Newcastle", ["fullback", "wing"], "support fullback", ratings(86, 86, 76, 82, 42, 20, 87)),
  player("tahu-2001-newcastle", "timana-tahu", "Timana Tahu", 2001, "Newcastle", ["wing", "centre"], "explosive finisher", ratings(88, 90, 75, 82, 24, 12, 87)),
  player("gidley-2001-newcastle", "matt-gidley", "Matt Gidley", 2001, "Newcastle", ["centre"], "creative centre", ratings(88, 89, 77, 82, 58, 25, 88)),
  player("johns-2001-newcastle", "andrew-johns", "Andrew Johns", 2001, "Newcastle", ["half"], "all-time halfback", ratings(98, 97, 86, 91, 98, 88, 99)),
  player("kennedy-2001-newcastle", "ben-kennedy", "Ben Kennedy", 2001, "Newcastle", ["edge", "middle"], "damaging back-rower", ratings(90, 86, 88, 91, 22, 10, 91)),
  player("parsons-2001-newcastle", "matthew-parsons", "Matthew Parsons", 2001, "Newcastle", ["middle"], "grand final prop", ratings(83, 72, 84, 86, 14, 10, 84)),
  player("buderus-2001-newcastle", "danny-buderus", "Danny Buderus", 2001, "Newcastle", ["hooker"], "elite ruck controller", ratings(91, 87, 90, 94, 76, 28, 91)),

  player("minichiello-2002-roosters", "anthony-minichiello", "Anthony Minichiello", 2002, "Sydney Roosters", ["fullback", "wing"], "kick-return threat", ratings(88, 88, 78, 86, 42, 16, 88)),
  player("hegarty-2002-roosters", "shannon-hegarty", "Shannon Hegarty", 2002, "Sydney Roosters", ["wing", "centre"], "direct runner", ratings(82, 82, 75, 80, 22, 12, 82)),
  player("cross-2002-roosters", "ryan-cross", "Ryan Cross", 2002, "Sydney Roosters", ["centre"], "hard-running centre", ratings(83, 83, 76, 81, 18, 10, 83)),
  player("fittler-2002-roosters", "brad-fittler", "Brad Fittler", 2002, "Sydney Roosters", ["half", "centre"], "captain playmaker", ratings(94, 92, 84, 88, 90, 35, 96)),
  player("wing-2002-roosters", "craig-wing", "Craig Wing", 2002, "Sydney Roosters", ["hooker", "half"], "speed dummy-half", ratings(88, 87, 80, 89, 74, 28, 88)),
  player("fitzgibbon-2002-roosters", "craig-fitzgibbon", "Craig Fitzgibbon", 2002, "Sydney Roosters", ["edge"], "goal-kicking edge", ratings(89, 82, 88, 93, 30, 88, 90)),
  player("ricketson-2002-roosters", "luke-ricketson", "Luke Ricketson", 2002, "Sydney Roosters", ["edge", "middle"], "defensive leader", ratings(87, 78, 89, 92, 20, 10, 89)),
  player("morley-2002-roosters", "adrian-morley", "Adrian Morley", 2002, "Sydney Roosters", ["middle", "edge"], "enforcer", ratings(88, 79, 88, 88, 12, 10, 90)),

  player("wesser-2003-penrith", "rhys-wesser", "Rhys Wesser", 2003, "Penrith", ["fullback"], "try-scoring fullback", ratings(90, 92, 74, 84, 42, 18, 89)),
  player("lewis-2003-penrith", "luke-lewis", "Luke Lewis", 2003, "Penrith", ["wing", "centre", "edge"], "young finisher", ratings(84, 84, 78, 85, 28, 14, 84)),
  player("girdler-2003-penrith", "ryan-girdler", "Ryan Girdler", 2003, "Penrith", ["centre"], "goal-kicking centre", ratings(88, 87, 79, 84, 48, 92, 88)),
  player("campbell-2003-penrith", "preston-campbell", "Preston Campbell", 2003, "Penrith", ["half", "fullback"], "chaos runner", ratings(87, 88, 70, 84, 79, 65, 87)),
  player("gower-2003-penrith", "craig-gower", "Craig Gower", 2003, "Penrith", ["half", "hooker"], "combative halfback", ratings(90, 87, 84, 91, 88, 24, 91)),
  player("puletua-2003-penrith", "tony-puletua", "Tony Puletua", 2003, "Penrith", ["edge", "middle"], "offloading forward", ratings(88, 84, 84, 88, 18, 10, 89)),
  player("lang-2003-penrith", "martin-lang", "Martin Lang", 2003, "Penrith", ["middle"], "collision prop", ratings(84, 73, 85, 88, 12, 10, 85)),
  player("priddis-2003-penrith", "luke-priddis", "Luke Priddis", 2003, "Penrith", ["hooker"], "finals hooker", ratings(88, 84, 84, 91, 66, 42, 92)),

  player("patten-2004-bulldogs", "luke-patten", "Luke Patten", 2004, "Canterbury-Bankstown", ["fullback"], "support fullback", ratings(86, 86, 79, 85, 44, 18, 86)),
  player("elmasri-2004-bulldogs", "hazem-el-masri", "Hazem El Masri", 2004, "Canterbury-Bankstown", ["wing"], "elite finisher", ratings(89, 88, 78, 84, 36, 98, 90)),
  player("tonga-2004-bulldogs", "willie-tonga", "Willie Tonga", 2004, "Canterbury-Bankstown", ["centre"], "strike centre", ratings(87, 88, 77, 82, 20, 10, 87)),
  player("anasta-2004-bulldogs", "braith-anasta", "Braith Anasta", 2004, "Canterbury-Bankstown", ["half", "edge"], "big-frame five-eighth", ratings(88, 85, 81, 86, 86, 40, 88)),
  player("sherwin-2004-bulldogs", "brent-sherwin", "Brent Sherwin", 2004, "Canterbury-Bankstown", ["half"], "kicking halfback", ratings(86, 83, 76, 84, 90, 45, 86)),
  player("sbw-2004-bulldogs", "sonny-bill-williams", "Sonny Bill Williams", 2004, "Canterbury-Bankstown", ["edge", "middle"], "impact forward", ratings(91, 89, 83, 86, 28, 10, 92)),
  player("mason-2004-bulldogs", "willie-mason", "Willie Mason", 2004, "Canterbury-Bankstown", ["middle", "edge"], "dominant middle", ratings(90, 84, 87, 89, 14, 10, 91)),
  player("ryan-2004-bulldogs", "andrew-ryan", "Andrew Ryan", 2004, "Canterbury-Bankstown", ["edge"], "tireless captain", ratings(87, 78, 88, 93, 20, 10, 89)),
  player("omeley-2004-bulldogs", "mark-omeley", "Mark O'Meley", 2004, "Canterbury-Bankstown", ["middle"], "front-row punch", ratings(87, 77, 87, 88, 12, 10, 88)),

  player("hodgson-2005-tigers", "brett-hodgson", "Brett Hodgson", 2005, "Wests Tigers", ["fullback"], "goal-kicking fullback", ratings(89, 89, 76, 85, 64, 90, 89)),
  player("richards-2005-tigers", "pat-richards", "Pat Richards", 2005, "Wests Tigers", ["wing"], "long-range winger", ratings(87, 88, 75, 82, 52, 88, 88)),
  player("whatuira-2005-tigers", "paul-whatuira", "Paul Whatuira", 2005, "Wests Tigers", ["centre"], "calm centre", ratings(84, 83, 80, 82, 22, 10, 85)),
  player("marshall-2005-tigers", "benji-marshall", "Benji Marshall", 2005, "Wests Tigers", ["half"], "spark five-eighth", ratings(91, 94, 69, 83, 84, 42, 94)),
  player("prince-2005-tigers", "scott-prince", "Scott Prince", 2005, "Wests Tigers", ["half"], "organising halfback", ratings(90, 88, 77, 86, 91, 80, 91)),
  player("farah-2005-tigers", "robbie-farah", "Robbie Farah", 2005, "Wests Tigers", ["hooker", "half"], "creative hooker", ratings(87, 86, 82, 91, 80, 44, 87)),
  player("halatau-2005-tigers", "dene-halatau", "Dene Halatau", 2005, "Wests Tigers", ["edge", "hooker"], "mobile forward", ratings(82, 77, 82, 88, 26, 10, 84)),
  player("payten-2005-tigers", "todd-payten", "Todd Payten", 2005, "Wests Tigers", ["middle"], "ball-playing prop", ratings(83, 77, 83, 87, 30, 10, 84)),
  player("laffranchi-2005-tigers", "anthony-laffranchi", "Anthony Laffranchi", 2005, "Wests Tigers", ["edge", "middle"], "running edge", ratings(84, 80, 83, 88, 20, 10, 85)),

  player("hunt-2006-brisbane", "karmichael-hunt", "Karmichael Hunt", 2006, "Brisbane", ["fullback"], "heavy-contact fullback", ratings(88, 87, 82, 87, 46, 18, 89)),
  player("hodges-2006-brisbane", "justin-hodges", "Justin Hodges", 2006, "Brisbane", ["centre", "fullback"], "power centre", ratings(90, 91, 80, 85, 24, 10, 91)),
  player("tate-2006-brisbane", "brent-tate", "Brent Tate", 2006, "Brisbane", ["wing", "centre"], "line-break centre", ratings(87, 87, 78, 84, 24, 10, 88)),
  player("lockyer-2006-brisbane", "darren-lockyer", "Darren Lockyer", 2006, "Brisbane", ["half"], "champion five-eighth", ratings(96, 95, 80, 87, 94, 50, 98)),
  player("parker-2006-brisbane", "corey-parker", "Corey Parker", 2006, "Brisbane", ["edge", "middle"], "goal-kicking forward", ratings(85, 78, 85, 91, 26, 83, 86)),
  player("civoniceva-2006-brisbane", "petero-civoniceva", "Petero Civoniceva", 2006, "Brisbane", ["middle"], "elite metre-eater", ratings(90, 80, 90, 94, 14, 10, 91)),
  player("webcke-2006-brisbane", "shane-webcke", "Shane Webcke", 2006, "Brisbane", ["middle"], "grand final prop", ratings(89, 77, 91, 93, 12, 10, 92)),
  player("berrigan-2006-brisbane", "shaun-berrigan", "Shaun Berrigan", 2006, "Brisbane", ["hooker", "centre"], "finals utility", ratings(88, 86, 84, 89, 58, 20, 93)),

  player("slater-2007-melbourne", "billy-slater", "Billy Slater", 2007, "Melbourne", ["fullback"], "support fullback", ratings(92, 94, 78, 88, 46, 15, 92)),
  player("folau-2007-melbourne", "israel-folau", "Israel Folau", 2007, "Melbourne", ["wing", "centre"], "aerial winger", ratings(90, 92, 76, 83, 20, 10, 90)),
  player("inglis-2007-melbourne", "greg-inglis", "Greg Inglis", 2007, "Melbourne", ["centre", "wing", "fullback"], "strike weapon", ratings(93, 95, 78, 84, 42, 20, 94)),
  player("cronk-2007-melbourne", "cooper-cronk", "Cooper Cronk", 2007, "Melbourne", ["half"], "system halfback", ratings(90, 88, 82, 88, 92, 26, 91)),
  player("smith-2007-melbourne", "cameron-smith", "Cameron Smith", 2007, "Melbourne", ["hooker"], "elite controller", ratings(94, 90, 91, 95, 88, 90, 95)),
  player("hoffman-2007-melbourne", "ryan-hoffman", "Ryan Hoffman", 2007, "Melbourne", ["edge"], "hole-running edge", ratings(87, 83, 85, 90, 20, 10, 88)),
  player("johnson-2007-melbourne", "dallas-johnson", "Dallas Johnson", 2007, "Melbourne", ["middle", "edge"], "defensive machine", ratings(87, 73, 92, 96, 12, 10, 88)),
  player("white-2007-melbourne", "brett-white", "Brett White", 2007, "Melbourne", ["middle"], "straight-line prop", ratings(83, 72, 84, 87, 12, 10, 83)),

  player("bstewart-2008-manly", "brett-stewart", "Brett Stewart", 2008, "Manly Warringah", ["fullback"], "try-scoring fullback", ratings(91, 93, 77, 85, 44, 14, 91)),
  player("robertson-2008-manly", "michael-robertson", "Michael Robertson", 2008, "Manly Warringah", ["wing"], "finals finisher", ratings(84, 85, 76, 81, 18, 10, 88)),
  player("matai-2008-manly", "steve-matai", "Steve Matai", 2008, "Manly Warringah", ["centre"], "contact centre", ratings(86, 84, 83, 84, 18, 10, 87)),
  player("lyon-2008-manly", "jamie-lyon", "Jamie Lyon", 2008, "Manly Warringah", ["centre", "half"], "composed creator", ratings(90, 89, 82, 84, 76, 87, 91)),
  player("orford-2008-manly", "matt-orford", "Matt Orford", 2008, "Manly Warringah", ["half"], "Dally M halfback", ratings(90, 88, 77, 86, 91, 78, 90)),
  player("gstewart-2008-manly", "glenn-stewart", "Glenn Stewart", 2008, "Manly Warringah", ["edge", "middle"], "ball-playing forward", ratings(89, 86, 85, 89, 40, 10, 91)),
  player("watmough-2008-manly", "anthony-watmough", "Anthony Watmough", 2008, "Manly Warringah", ["edge", "middle"], "relentless runner", ratings(88, 84, 86, 93, 18, 10, 89)),
  player("kite-2008-manly", "brent-kite", "Brent Kite", 2008, "Manly Warringah", ["middle"], "grand final prop", ratings(87, 76, 87, 88, 12, 10, 89)),
  player("ballin-2008-manly", "matt-ballin", "Matt Ballin", 2008, "Manly Warringah", ["hooker"], "reliable hooker", ratings(85, 78, 87, 92, 62, 22, 86)),

  player("hayne-2009-parramatta", "jarryd-hayne", "Jarryd Hayne", 2009, "Parramatta", ["fullback", "wing"], "runaway fullback", ratings(96, 98, 78, 88, 70, 65, 97)),
  player("burt-2009-parramatta", "luke-burt", "Luke Burt", 2009, "Parramatta", ["wing", "fullback"], "goal-kicking finisher", ratings(84, 84, 76, 82, 44, 91, 84)),
  player("inu-2009-parramatta", "krisnan-inu", "Krisnan Inu", 2009, "Parramatta", ["centre", "wing"], "skill centre", ratings(82, 83, 73, 78, 36, 83, 83)),
  player("mortimer-2009-parramatta", "daniel-mortimer", "Daniel Mortimer", 2009, "Parramatta", ["half"], "rookie runner", ratings(81, 81, 72, 80, 75, 32, 82)),
  player("hindmarsh-2009-parramatta", "nathan-hindmarsh", "Nathan Hindmarsh", 2009, "Parramatta", ["edge", "middle"], "tackle legend", ratings(90, 77, 94, 97, 14, 10, 91)),
  player("moimoi-2009-parramatta", "fuifui-moimoi", "Fuifui Moimoi", 2009, "Parramatta", ["middle"], "impact prop", ratings(87, 83, 82, 86, 12, 10, 88)),
  player("mannah-2009-parramatta", "tim-mannah", "Tim Mannah", 2009, "Parramatta", ["middle"], "young prop", ratings(81, 72, 82, 86, 12, 10, 81)),
  player("keating-2009-parramatta", "matt-keating", "Matt Keating", 2009, "Parramatta", ["hooker"], "steady hooker", ratings(79, 74, 80, 85, 52, 16, 79)),

  player("boyd-2010-dragons", "darius-boyd", "Darius Boyd", 2010, "St George Illawarra", ["fullback", "wing"], "defensive fullback", ratings(90, 88, 86, 86, 52, 18, 92)),
  player("bmorris-2010-dragons", "brett-morris", "Brett Morris", 2010, "St George Illawarra", ["wing", "fullback"], "elite finisher", ratings(89, 91, 79, 86, 22, 10, 89)),
  player("cooper-2010-dragons", "matt-cooper", "Matt Cooper", 2010, "St George Illawarra", ["centre"], "defensive centre", ratings(86, 83, 86, 84, 18, 10, 87)),
  player("soward-2010-dragons", "jamie-soward", "Jamie Soward", 2010, "St George Illawarra", ["half"], "kicking five-eighth", ratings(88, 85, 75, 83, 92, 88, 90)),
  player("hornby-2010-dragons", "ben-hornby", "Ben Hornby", 2010, "St George Illawarra", ["half", "hooker"], "captain organiser", ratings(87, 84, 79, 87, 86, 30, 89)),
  player("creagh-2010-dragons", "ben-creagh", "Ben Creagh", 2010, "St George Illawarra", ["edge"], "line-running edge", ratings(86, 81, 85, 90, 16, 10, 87)),
  player("bscott-2010-dragons", "beau-scott", "Beau Scott", 2010, "St George Illawarra", ["edge", "centre"], "defensive edge", ratings(85, 76, 88, 90, 14, 10, 87)),
  player("jsmith-2010-dragons", "jeremy-smith", "Jeremy Smith", 2010, "St George Illawarra", ["middle", "edge"], "tough forward", ratings(86, 76, 88, 90, 14, 10, 88)),
  player("young-2010-dragons", "dean-young", "Dean Young", 2010, "St George Illawarra", ["hooker", "middle"], "utility defender", ratings(84, 76, 86, 91, 56, 18, 86)),

  player("inglis-2014-souths", "greg-inglis", "Greg Inglis", 2014, "South Sydney", ["fullback", "centre"], "captain fullback", ratings(95, 96, 81, 87, 46, 18, 96)),
  player("ajohnston-2014-souths", "alex-johnston", "Alex Johnston", 2014, "South Sydney", ["wing", "fullback"], "rookie finisher", ratings(84, 87, 74, 81, 18, 10, 85)),
  player("walker-2014-souths", "dylan-walker", "Dylan Walker", 2014, "South Sydney", ["centre", "half"], "running centre", ratings(85, 86, 76, 82, 42, 35, 85)),
  player("areynolds-2014-souths", "adam-reynolds", "Adam Reynolds", 2014, "South Sydney", ["half"], "precision kicker", ratings(89, 86, 76, 84, 94, 92, 90)),
  player("sutton-2014-souths", "john-sutton", "John Sutton", 2014, "South Sydney", ["edge", "half"], "big five-eighth", ratings(87, 84, 82, 87, 78, 20, 88)),
  player("samburgess-2014-souths", "sam-burgess", "Sam Burgess", 2014, "South Sydney", ["middle", "edge"], "dominant forward", ratings(94, 88, 91, 95, 18, 10, 97)),
  player("gburgess-2014-souths", "george-burgess", "George Burgess", 2014, "South Sydney", ["middle"], "power prop", ratings(87, 82, 83, 87, 12, 10, 88)),
  player("teo-2014-souths", "ben-teo", "Ben Te'o", 2014, "South Sydney", ["edge", "middle"], "big-game edge", ratings(87, 82, 85, 88, 16, 10, 90)),
  player("iluke-2014-souths", "issac-luke", "Issac Luke", 2014, "South Sydney", ["hooker"], "running hooker", ratings(89, 87, 84, 91, 70, 20, 89)),

  player("coote-2015-cowboys", "lachlan-coote", "Lachlan Coote", 2015, "North Queensland", ["fullback"], "link fullback", ratings(88, 87, 80, 86, 62, 70, 89)),
  player("feldt-2015-cowboys", "kyle-feldt", "Kyle Feldt", 2015, "North Queensland", ["wing"], "clutch winger", ratings(85, 86, 75, 82, 24, 77, 90)),
  player("oneill-2015-cowboys", "justin-oneill", "Justin O'Neill", 2015, "North Queensland", ["centre"], "smooth centre", ratings(84, 84, 78, 82, 18, 10, 85)),
  player("thurston-2015-cowboys", "johnathan-thurston", "Johnathan Thurston", 2015, "North Queensland", ["half"], "premiership halfback", ratings(98, 97, 79, 88, 97, 95, 99)),
  player("morgan-2015-cowboys", "michael-morgan", "Michael Morgan", 2015, "North Queensland", ["half", "centre", "fullback"], "running playmaker", ratings(89, 89, 78, 84, 86, 28, 91)),
  player("gcooper-2015-cowboys", "gavin-cooper", "Gavin Cooper", 2015, "North Queensland", ["edge"], "left-edge runner", ratings(85, 82, 84, 89, 18, 10, 86)),
  player("taumalolo-2015-cowboys", "jason-taumalolo", "Jason Taumalolo", 2015, "North Queensland", ["middle", "edge"], "power lock", ratings(91, 89, 86, 92, 14, 10, 92)),
  player("mscott-2015-cowboys", "matt-scott", "Matt Scott", 2015, "North Queensland", ["middle"], "elite prop", ratings(90, 80, 90, 92, 12, 10, 92)),
  player("granville-2015-cowboys", "jake-granville", "Jake Granville", 2015, "North Queensland", ["hooker"], "speed hooker", ratings(86, 85, 80, 89, 62, 18, 88)),

  player("barba-2016-sharks", "ben-barba", "Ben Barba", 2016, "Cronulla-Sutherland", ["fullback"], "sweeping fullback", ratings(91, 93, 75, 84, 48, 18, 92)),
  player("vholmes-2016-sharks", "valentine-holmes", "Valentine Holmes", 2016, "Cronulla-Sutherland", ["wing", "fullback"], "strike winger", ratings(86, 88, 75, 82, 40, 80, 86)),
  player("bird-2016-sharks", "jack-bird", "Jack Bird", 2016, "Cronulla-Sutherland", ["centre", "half", "edge"], "roaming utility", ratings(86, 86, 79, 86, 58, 22, 88)),
  player("maloney-2016-sharks", "james-maloney", "James Maloney", 2016, "Cronulla-Sutherland", ["half"], "big-game five-eighth", ratings(90, 87, 73, 84, 91, 91, 93)),
  player("townsend-2016-sharks", "chad-townsend", "Chad Townsend", 2016, "Cronulla-Sutherland", ["half"], "organising half", ratings(84, 81, 76, 84, 88, 45, 84)),
  player("wgraham-2016-sharks", "wade-graham", "Wade Graham", 2016, "Cronulla-Sutherland", ["edge", "half"], "ball-playing edge", ratings(88, 86, 84, 90, 62, 20, 89)),
  player("llewis-2016-sharks", "luke-lewis", "Luke Lewis", 2016, "Cronulla-Sutherland", ["edge", "centre"], "veteran edge", ratings(88, 82, 88, 92, 24, 10, 91)),
  player("fifita-2016-sharks", "andrew-fifita", "Andrew Fifita", 2016, "Cronulla-Sutherland", ["middle"], "wrecking-ball prop", ratings(91, 87, 85, 90, 14, 10, 93)),
  player("gallen-2016-sharks", "paul-gallen", "Paul Gallen", 2016, "Cronulla-Sutherland", ["middle", "edge"], "workload lock", ratings(90, 82, 90, 96, 16, 10, 91)),
  player("ennis-2016-sharks", "michael-ennis", "Michael Ennis", 2016, "Cronulla-Sutherland", ["hooker"], "niggling controller", ratings(88, 85, 86, 91, 74, 22, 90)),

  player("slater-2017-melbourne", "billy-slater", "Billy Slater", 2017, "Melbourne", ["fullback"], "champion fullback", ratings(96, 97, 83, 88, 54, 15, 98)),
  player("addocarr-2017-melbourne", "josh-addo-carr", "Josh Addo-Carr", 2017, "Melbourne", ["wing"], "speed winger", ratings(86, 89, 73, 82, 18, 10, 86)),
  player("wchambers-2017-melbourne", "will-chambers", "Will Chambers", 2017, "Melbourne", ["centre"], "rep centre", ratings(87, 86, 82, 84, 20, 10, 88)),
  player("munster-2017-melbourne", "cameron-munster", "Cameron Munster", 2017, "Melbourne", ["half", "fullback"], "instinct playmaker", ratings(90, 91, 78, 85, 84, 42, 91)),
  player("cronk-2017-melbourne", "cooper-cronk", "Cooper Cronk", 2017, "Melbourne", ["half"], "title halfback", ratings(95, 93, 84, 89, 96, 24, 97)),
  player("smith-2017-melbourne", "cameron-smith", "Cameron Smith", 2017, "Melbourne", ["hooker"], "master controller", ratings(97, 94, 92, 96, 93, 95, 98)),
  player("kaufusi-2017-melbourne", "felise-kaufusi", "Felise Kaufusi", 2017, "Melbourne", ["edge"], "right-edge finisher", ratings(85, 82, 84, 89, 16, 10, 86)),
  player("harris-2017-melbourne", "tohu-harris", "Tohu Harris", 2017, "Melbourne", ["edge", "middle"], "complete forward", ratings(89, 84, 88, 92, 26, 10, 90)),
  player("jbromwich-2017-melbourne", "jesse-bromwich", "Jesse Bromwich", 2017, "Melbourne", ["middle"], "elite prop", ratings(89, 81, 88, 91, 16, 10, 90)),
  player("finucane-2017-melbourne", "dale-finucane", "Dale Finucane", 2017, "Melbourne", ["middle", "edge"], "defensive middle", ratings(87, 76, 90, 93, 12, 10, 88)),

  player("tedesco-2018-roosters", "james-tedesco", "James Tedesco", 2018, "Sydney Roosters", ["fullback"], "line-break fullback", ratings(95, 97, 80, 89, 48, 18, 96)),
  player("ferguson-2018-roosters", "blake-ferguson", "Blake Ferguson", 2018, "Sydney Roosters", ["wing", "centre"], "metre winger", ratings(88, 88, 78, 88, 18, 10, 88)),
  player("lmitchell-2018-roosters", "latrell-mitchell", "Latrell Mitchell", 2018, "Sydney Roosters", ["centre", "fullback"], "power centre", ratings(91, 93, 78, 82, 46, 91, 93)),
  player("keary-2018-roosters", "luke-keary", "Luke Keary", 2018, "Sydney Roosters", ["half"], "grand final five-eighth", ratings(92, 92, 77, 86, 90, 34, 96)),
  player("cronk-2018-roosters", "cooper-cronk", "Cooper Cronk", 2018, "Sydney Roosters", ["half"], "injured-arm general", ratings(91, 88, 83, 87, 94, 20, 98)),
  player("cordner-2018-roosters", "boyd-cordner", "Boyd Cordner", 2018, "Sydney Roosters", ["edge"], "captain edge", ratings(89, 84, 88, 92, 16, 10, 91)),
  player("radley-2018-roosters", "victor-radley", "Victor Radley", 2018, "Sydney Roosters", ["middle", "hooker"], "ball-playing lock", ratings(85, 82, 85, 90, 34, 10, 86)),
  player("jwh-2018-roosters", "jared-waerea-hargreaves", "Jared Waerea-Hargreaves", 2018, "Sydney Roosters", ["middle"], "front-row enforcer", ratings(88, 78, 88, 89, 12, 10, 90)),
  player("friend-2018-roosters", "jake-friend", "Jake Friend", 2018, "Sydney Roosters", ["hooker"], "defensive hooker", ratings(87, 79, 90, 94, 66, 18, 88)),

  player("cnk-2019-raiders", "charnze-nicoll-klokstad", "Charnze Nicoll-Klokstad", 2019, "Canberra", ["fullback", "wing"], "effort fullback", ratings(87, 86, 82, 89, 42, 14, 87)),
  player("rapana-2019-raiders", "jordan-rapana", "Jordan Rapana", 2019, "Canberra", ["wing"], "high-energy winger", ratings(86, 87, 77, 85, 20, 10, 86)),
  player("croker-2019-raiders", "jarrod-croker", "Jarrod Croker", 2019, "Canberra", ["centre"], "goal-kicking centre", ratings(85, 84, 78, 84, 34, 93, 85)),
  player("wighton-2019-raiders", "jack-wighton", "Jack Wighton", 2019, "Canberra", ["half", "fullback", "centre"], "power five-eighth", ratings(89, 90, 81, 87, 80, 22, 91)),
  player("sezer-2019-raiders", "aidan-sezer", "Aidan Sezer", 2019, "Canberra", ["half"], "steady halfback", ratings(84, 81, 77, 83, 88, 78, 84)),
  player("bateman-2019-raiders", "john-bateman", "John Bateman", 2019, "Canberra", ["edge", "middle"], "chaotic edge", ratings(89, 85, 87, 93, 24, 10, 90)),
  player("whitehead-2019-raiders", "elliott-whitehead", "Elliott Whitehead", 2019, "Canberra", ["edge"], "smart edge", ratings(85, 80, 85, 90, 20, 10, 86)),
  player("papalii-2019-raiders", "josh-papalii", "Josh Papalii", 2019, "Canberra", ["middle"], "dominant prop", ratings(90, 84, 88, 91, 12, 10, 91)),
  player("hodgson-2019-raiders", "josh-hodgson", "Josh Hodgson", 2019, "Canberra", ["hooker"], "creative hooker", ratings(88, 87, 83, 91, 78, 18, 89)),

  player("edwards-2020-panthers", "dylan-edwards", "Dylan Edwards", 2020, "Penrith", ["fullback"], "effort fullback", ratings(87, 85, 84, 91, 42, 12, 86)),
  player("too-2020-panthers", "brian-too", "Brian To'o", 2020, "Penrith", ["wing"], "yardage winger", ratings(87, 87, 78, 91, 18, 10, 86)),
  player("crichton-2020-panthers", "stephen-crichton", "Stephen Crichton", 2020, "Penrith", ["centre", "wing"], "tall centre", ratings(86, 87, 78, 83, 22, 76, 86)),
  player("luai-2020-panthers", "jarome-luai", "Jarome Luai", 2020, "Penrith", ["half"], "left-edge creator", ratings(88, 89, 75, 84, 82, 22, 88)),
  player("cleary-2020-panthers", "nathan-cleary", "Nathan Cleary", 2020, "Penrith", ["half"], "complete halfback", ratings(93, 91, 82, 88, 95, 93, 93)),
  player("kikau-2020-panthers", "viliame-kikau", "Viliame Kikau", 2020, "Penrith", ["edge"], "strike edge", ratings(88, 88, 80, 86, 16, 10, 89)),
  player("yeo-2020-panthers", "isaah-yeo", "Isaah Yeo", 2020, "Penrith", ["middle", "edge"], "ball-playing lock", ratings(89, 84, 88, 93, 46, 10, 90)),
  player("jfh-2020-panthers", "james-fisher-harris", "James Fisher-Harris", 2020, "Penrith", ["middle"], "elite prop", ratings(89, 80, 90, 93, 12, 10, 90)),
  player("api-2020-panthers", "apisai-koroisau", "Apisai Koroisau", 2020, "Penrith", ["hooker"], "craft hooker", ratings(88, 87, 83, 91, 72, 18, 88)),

  player("gutherson-2022-eels", "clint-gutherson", "Clint Gutherson", 2022, "Parramatta", ["fullback", "centre"], "effort fullback", ratings(88, 87, 82, 91, 46, 68, 88)),
  player("sivo-2022-eels", "maika-sivo", "Maika Sivo", 2022, "Parramatta", ["wing"], "power winger", ratings(84, 86, 72, 82, 18, 10, 84)),
  player("brown-2022-eels", "dylan-brown", "Dylan Brown", 2022, "Parramatta", ["half"], "running five-eighth", ratings(88, 89, 79, 86, 80, 20, 88)),
  player("moses-2022-eels", "mitchell-moses", "Mitchell Moses", 2022, "Parramatta", ["half"], "long-kicking halfback", ratings(91, 89, 77, 86, 95, 91, 90)),
  player("ipapalii-2022-eels", "isaiah-papalii", "Isaiah Papali'i", 2022, "Parramatta", ["edge", "middle"], "power edge", ratings(88, 85, 85, 91, 16, 10, 88)),
  player("jpaulo-2022-eels", "junior-paulo", "Junior Paulo", 2022, "Parramatta", ["middle"], "offloading prop", ratings(88, 84, 84, 88, 28, 10, 88)),
  player("rcg-2022-eels", "reagan-campbell-gillard", "Reagan Campbell-Gillard", 2022, "Parramatta", ["middle"], "front-row leader", ratings(87, 78, 87, 90, 12, 10, 87)),
  player("mahoney-2022-eels", "reed-mahoney", "Reed Mahoney", 2022, "Parramatta", ["hooker"], "tough hooker", ratings(86, 83, 85, 92, 70, 18, 86)),

  player("walsh-2023-broncos", "reece-walsh", "Reece Walsh", 2023, "Brisbane", ["fullback"], "electric fullback", ratings(91, 94, 73, 85, 60, 78, 91)),
  player("cobbo-2023-broncos", "selwyn-cobbo", "Selwyn Cobbo", 2023, "Brisbane", ["wing", "centre"], "power winger", ratings(86, 88, 75, 84, 20, 10, 86)),
  player("farnworth-2023-broncos", "herbie-farnworth", "Herbie Farnworth", 2023, "Brisbane", ["centre"], "metre centre", ratings(87, 87, 81, 86, 18, 10, 88)),
  player("staggs-2023-broncos", "kotoni-staggs", "Kotoni Staggs", 2023, "Brisbane", ["centre"], "power centre", ratings(86, 88, 77, 82, 28, 68, 86)),
  player("mam-2023-broncos", "ezra-mam", "Ezra Mam", 2023, "Brisbane", ["half"], "strike five-eighth", ratings(87, 90, 73, 83, 76, 18, 89)),
  player("areynolds-2023-broncos", "adam-reynolds", "Adam Reynolds", 2023, "Brisbane", ["half"], "veteran halfback", ratings(91, 88, 76, 84, 96, 94, 92)),
  player("carrigan-2023-broncos", "patrick-carrigan", "Patrick Carrigan", 2023, "Brisbane", ["middle"], "engine lock", ratings(90, 82, 89, 96, 18, 10, 91)),
  player("haas-2023-broncos", "payne-haas", "Payne Haas", 2023, "Brisbane", ["middle"], "elite prop", ratings(93, 86, 90, 96, 12, 10, 92)),
  player("riki-2023-broncos", "jordan-riki", "Jordan Riki", 2023, "Brisbane", ["edge"], "athletic edge", ratings(84, 82, 83, 88, 16, 10, 84)),
  player("paix-2023-broncos", "cory-paix", "Cory Paix", 2023, "Brisbane", ["hooker"], "support hooker", ratings(78, 76, 78, 84, 54, 14, 78)),

  player("cnk-2023-warriors", "charnze-nicoll-klokstad", "Charnze Nicoll-Klokstad", 2023, "Warriors", ["fullback"], "revival fullback", ratings(88, 87, 84, 90, 42, 12, 88)),
  player("dwz-2023-warriors", "dallin-watene-zelezniak", "Dallin Watene-Zelezniak", 2023, "Warriors", ["wing"], "acrobatic winger", ratings(86, 88, 75, 84, 18, 10, 86)),
  player("pompey-2023-warriors", "adam-pompey", "Adam Pompey", 2023, "Warriors", ["centre", "wing"], "goal-kicking centre", ratings(80, 79, 77, 82, 26, 83, 80)),
  player("sjohnson-2023-warriors", "shaun-johnson", "Shaun Johnson", 2023, "Warriors", ["half"], "renaissance halfback", ratings(92, 92, 76, 86, 94, 90, 92)),
  player("metcalf-2023-warriors", "luke-metcalf", "Luke Metcalf", 2023, "Warriors", ["half", "fullback"], "speed playmaker", ratings(81, 83, 72, 80, 75, 20, 81)),
  player("tohu-2023-warriors", "tohu-harris", "Tohu Harris", 2023, "Warriors", ["middle", "edge"], "captain lock", ratings(90, 84, 90, 95, 32, 10, 91)),
  player("afblake-2023-warriors", "addin-fonua-blake", "Addin Fonua-Blake", 2023, "Warriors", ["middle"], "premium prop", ratings(91, 84, 88, 92, 12, 10, 91)),
  player("egan-2023-warriors", "wayde-egan", "Wayde Egan", 2023, "Warriors", ["hooker"], "sharp hooker", ratings(85, 84, 83, 90, 64, 18, 85)),

  player("edwards-2024-panthers", "dylan-edwards", "Dylan Edwards", 2024, "Penrith", ["fullback"], "Clive Churchill fullback", ratings(92, 90, 88, 95, 44, 12, 94)),
  player("too-2024-panthers", "brian-too", "Brian To'o", 2024, "Penrith", ["wing"], "yardage king", ratings(90, 90, 80, 94, 18, 10, 90)),
  player("tago-2024-panthers", "izack-tago", "Izack Tago", 2024, "Penrith", ["centre"], "physical centre", ratings(85, 85, 79, 84, 18, 10, 85)),
  player("cleary-2024-panthers", "nathan-cleary", "Nathan Cleary", 2024, "Penrith", ["half"], "champion halfback", ratings(97, 96, 84, 90, 98, 96, 99)),
  player("luai-2024-panthers", "jarome-luai", "Jarome Luai", 2024, "Penrith", ["half"], "premiership five-eighth", ratings(91, 91, 78, 86, 85, 22, 92)),
  player("lmartin-2024-panthers", "liam-martin", "Liam Martin", 2024, "Penrith", ["edge"], "big-game edge", ratings(89, 85, 88, 93, 16, 10, 93)),
  player("yeo-2024-panthers", "isaah-yeo", "Isaah Yeo", 2024, "Penrith", ["middle"], "elite lock", ratings(93, 87, 91, 96, 52, 10, 95)),
  player("jfh-2024-panthers", "james-fisher-harris", "James Fisher-Harris", 2024, "Penrith", ["middle"], "premier prop", ratings(91, 82, 91, 94, 12, 10, 92)),
  player("leota-2024-panthers", "moses-leota", "Moses Leota", 2024, "Penrith", ["middle"], "collision prop", ratings(88, 80, 88, 91, 12, 10, 88)),
  player("kenny-2024-panthers", "mitch-kenny", "Mitch Kenny", 2024, "Penrith", ["hooker"], "defensive hooker", ratings(84, 78, 87, 91, 56, 16, 86))
];

const SQUAD_DEPTH = [
  player("devere-1998-brisbane", "michael-de-vere", "Michael De Vere", 1998, "Brisbane", ["centre", "wing"], "goal-kicking outside back", ratings(82, 80, 78, 82, 36, 82, 82)),
  player("carroll-1998-brisbane", "tonie-carroll", "Tonie Carroll", 1998, "Brisbane", ["centre", "edge"], "defensive utility", ratings(84, 78, 86, 88, 14, 10, 84)),
  player("walters-1998-brisbane", "kevin-walters", "Kevin Walters", 1998, "Brisbane", ["half", "hooker"], "veteran organiser", ratings(84, 82, 77, 84, 84, 28, 85)),
  player("thorn-1998-brisbane", "brad-thorn", "Brad Thorn", 1998, "Brisbane", ["middle", "edge"], "young enforcer", ratings(82, 75, 84, 88, 12, 10, 83)),
  player("campion-1998-brisbane", "kevin-campion", "Kevin Campion", 1998, "Brisbane", ["edge", "middle"], "abrasive back-rower", ratings(83, 74, 86, 90, 12, 10, 84)),

  player("martin-1999-melbourne", "tony-martin", "Tony Martin", 1999, "Melbourne", ["centre", "wing"], "steady outside back", ratings(80, 79, 75, 80, 34, 80, 80)),
  player("king-1999-melbourne", "matt-king", "Matt King", 1999, "Melbourne", ["centre", "wing"], "developing back", ratings(77, 78, 73, 78, 16, 10, 77)),
  player("kearney-1999-melbourne", "stephen-kearney", "Stephen Kearney", 1999, "Melbourne", ["edge", "middle"], "captain forward", ratings(86, 80, 86, 90, 18, 10, 87)),
  player("kearns-1999-melbourne", "robbie-kearns", "Robbie Kearns", 1999, "Melbourne", ["middle"], "representative prop", ratings(86, 77, 86, 90, 12, 10, 87)),
  player("lazarus-1999-melbourne", "glenn-lazarus", "Glenn Lazarus", 1999, "Melbourne", ["middle"], "veteran prop", ratings(84, 74, 84, 86, 12, 10, 86)),

  player("macdougall-2001-newcastle", "adam-macdougall", "Adam MacDougall", 2001, "Newcastle", ["centre", "wing"], "power outside back", ratings(86, 86, 76, 83, 22, 20, 86)),
  player("hughes-2001-newcastle", "mark-hughes", "Mark Hughes", 2001, "Newcastle", ["centre", "fullback", "wing"], "versatile back", ratings(81, 80, 77, 81, 30, 18, 82)),
  player("simpson-2001-newcastle", "steve-simpson", "Steve Simpson", 2001, "Newcastle", ["edge", "middle"], "hard-running edge", ratings(87, 81, 87, 91, 14, 10, 88)),
  player("perry-2001-newcastle", "josh-perry", "Josh Perry", 2001, "Newcastle", ["middle"], "young prop", ratings(81, 73, 82, 86, 12, 10, 82)),
  player("abraham-2001-newcastle", "daniel-abraham", "Daniel Abraham", 2001, "Newcastle", ["edge", "centre"], "mobile back-rower", ratings(80, 78, 79, 84, 18, 10, 80)),

  player("byrne-2002-roosters", "chris-walker", "Chris Walker", 2002, "Sydney Roosters", ["wing", "centre"], "speed outside back", ratings(83, 84, 72, 79, 18, 10, 83)),
  player("hodges-2002-roosters", "justin-hodges", "Justin Hodges", 2002, "Sydney Roosters", ["centre", "wing"], "young strike centre", ratings(83, 85, 73, 79, 18, 10, 83)),
  player("fletcher-2002-roosters", "bryan-fletcher", "Bryan Fletcher", 2002, "Sydney Roosters", ["edge", "middle"], "skilful forward", ratings(86, 82, 84, 88, 18, 10, 87)),
  player("cayless-2002-roosters", "jason-cayless", "Jason Cayless", 2002, "Sydney Roosters", ["middle"], "mobile prop", ratings(84, 76, 84, 88, 12, 10, 85)),
  player("catic-2002-roosters", "ned-catic", "Ned Catic", 2002, "Sydney Roosters", ["middle"], "bench prop", ratings(79, 70, 80, 84, 12, 10, 79)),

  player("rooney-2003-penrith", "luke-rooney", "Luke Rooney", 2003, "Penrith", ["wing"], "tall finisher", ratings(85, 87, 74, 82, 18, 10, 86)),
  player("sattler-2003-penrith", "scott-sattler", "Scott Sattler", 2003, "Penrith", ["middle", "edge"], "cover-tackle lock", ratings(84, 75, 86, 90, 14, 10, 88)),
  player("waterhouse-2003-penrith", "trent-waterhouse", "Trent Waterhouse", 2003, "Penrith", ["edge", "middle"], "rangy back-rower", ratings(86, 83, 83, 88, 18, 10, 86)),
  player("clinton-2003-penrith", "joel-clinton", "Joel Clinton", 2003, "Penrith", ["middle"], "front-row leader", ratings(84, 74, 84, 87, 12, 10, 85)),
  player("swain-2003-penrith", "joe-galuvao", "Joe Galuvao", 2003, "Penrith", ["edge", "middle"], "impact forward", ratings(85, 82, 81, 86, 12, 10, 86)),

  player("utai-2004-bulldogs", "matt-utai", "Matt Utai", 2004, "Canterbury-Bankstown", ["wing"], "low-centre winger", ratings(85, 86, 73, 84, 14, 10, 86)),
  player("lolesi-2004-bulldogs", "jamaal-lolesi", "Jamaal Lolesi", 2004, "Canterbury-Bankstown", ["centre", "wing"], "strong outside back", ratings(83, 83, 76, 81, 18, 10, 84)),
  player("maitua-2004-bulldogs", "reni-maitua", "Reni Maitua", 2004, "Canterbury-Bankstown", ["edge", "centre", "middle"], "utility forward", ratings(84, 81, 82, 86, 24, 10, 84)),
  player("grimaldi-2004-bulldogs", "tony-grimaldi", "Tony Grimaldi", 2004, "Canterbury-Bankstown", ["middle", "edge"], "defensive lock", ratings(82, 71, 86, 90, 12, 10, 83)),
  player("hughes-2004-bulldogs", "corey-hughes", "Corey Hughes", 2004, "Canterbury-Bankstown", ["hooker", "half"], "nippy hooker", ratings(81, 78, 80, 86, 62, 16, 82)),

  player("fitzhenry-2005-tigers", "daniel-fitzhenry", "Daniel Fitzhenry", 2005, "Wests Tigers", ["wing", "centre", "fullback"], "utility finisher", ratings(80, 81, 73, 80, 20, 10, 81)),
  player("elford-2005-tigers", "shane-elford", "Shane Elford", 2005, "Wests Tigers", ["centre"], "steady centre", ratings(80, 79, 77, 81, 18, 10, 81)),
  player("fulton-2005-tigers", "liam-fulton", "Liam Fulton", 2005, "Wests Tigers", ["edge", "middle"], "busy back-rower", ratings(82, 77, 83, 88, 18, 10, 83)),
  player("gibbs-2005-tigers", "bryce-gibbs", "Bryce Gibbs", 2005, "Wests Tigers", ["middle"], "defensive prop", ratings(80, 70, 82, 86, 12, 10, 80)),
  player("skandalis-2005-tigers", "john-skandalis", "John Skandalis", 2005, "Wests Tigers", ["middle"], "veteran prop", ratings(81, 72, 82, 86, 12, 10, 82)),

  player("boyd-2006-brisbane", "darius-boyd", "Darius Boyd", 2006, "Brisbane", ["wing", "fullback", "centre"], "rookie outside back", ratings(82, 82, 78, 82, 34, 14, 83)),
  player("thaiday-2006-brisbane", "sam-thaiday", "Sam Thaiday", 2006, "Brisbane", ["edge", "middle"], "explosive forward", ratings(85, 82, 83, 87, 12, 10, 86)),
  player("eastwood-2006-brisbane", "greg-eastwood", "Greg Eastwood", 2006, "Brisbane", ["edge", "middle"], "impact forward", ratings(81, 78, 80, 84, 16, 10, 82)),
  player("hannant-2006-brisbane", "ben-hannant", "Ben Hannant", 2006, "Brisbane", ["middle"], "bench prop", ratings(80, 72, 82, 86, 12, 10, 81)),
  player("mcguire-2006-brisbane", "casey-mcguire", "Casey McGuire", 2006, "Brisbane", ["hooker", "half"], "utility hooker", ratings(81, 78, 79, 85, 66, 18, 82)),

  player("quinn-2007-melbourne", "anthony-quinn", "Anthony Quinn", 2007, "Melbourne", ["wing"], "finishing winger", ratings(83, 84, 75, 82, 14, 10, 83)),
  player("king-2007-melbourne", "matt-king", "Matt King", 2007, "Melbourne", ["centre", "wing"], "representative centre", ratings(88, 88, 79, 84, 18, 10, 89)),
  player("crocker-2007-melbourne", "michael-crocker", "Michael Crocker", 2007, "Melbourne", ["edge", "middle"], "edge enforcer", ratings(86, 78, 87, 89, 12, 10, 88)),
  player("lima-2007-melbourne", "jeff-lima", "Jeff Lima", 2007, "Melbourne", ["middle"], "direct prop", ratings(82, 73, 83, 86, 12, 10, 82)),
  player("kidwell-2007-melbourne", "david-kidwell", "David Kidwell", 2007, "Melbourne", ["edge", "middle"], "veteran forward", ratings(83, 76, 84, 86, 12, 10, 84)),

  player("dwilliams-2008-manly", "david-williams", "David Williams", 2008, "Manly Warringah", ["wing"], "cult finisher", ratings(84, 86, 73, 82, 14, 10, 85)),
  player("bell-2008-manly", "steve-bell", "Steve Bell", 2008, "Manly Warringah", ["centre"], "experienced centre", ratings(83, 82, 79, 82, 18, 10, 84)),
  player("jperry-2008-manly", "josh-perry", "Josh Perry", 2008, "Manly Warringah", ["middle"], "rep prop", ratings(84, 75, 84, 87, 12, 10, 85)),
  player("king-2008-manly", "jason-king", "Jason King", 2008, "Manly Warringah", ["middle"], "captain prop", ratings(83, 73, 84, 87, 12, 10, 84)),
  player("menzies-2008-manly", "steve-menzies", "Steve Menzies", 2008, "Manly Warringah", ["edge", "centre"], "try-scoring legend", ratings(86, 86, 80, 86, 18, 10, 89)),

  player("grothe-2009-parramatta", "eric-grothe", "Eric Grothe Jr", 2009, "Parramatta", ["wing"], "power winger", ratings(83, 85, 72, 82, 14, 10, 84)),
  player("reddy-2009-parramatta", "joel-reddy", "Joel Reddy", 2009, "Parramatta", ["centre", "wing"], "tall outside back", ratings(80, 80, 76, 80, 16, 10, 81)),
  player("mateo-2009-parramatta", "feleti-mateo", "Feleti Mateo", 2009, "Parramatta", ["edge", "middle", "half"], "offloading forward", ratings(85, 84, 78, 84, 52, 10, 85)),
  player("cayless-2009-parramatta", "nathan-cayless", "Nathan Cayless", 2009, "Parramatta", ["middle"], "captain prop", ratings(84, 74, 84, 88, 12, 10, 85)),
  player("robson-2009-parramatta", "jeff-robson", "Jeff Robson", 2009, "Parramatta", ["half"], "steady half", ratings(79, 77, 74, 81, 80, 40, 80)),

  player("nightingale-2010-dragons", "jason-nightingale", "Jason Nightingale", 2010, "St George Illawarra", ["wing", "fullback"], "reliable finisher", ratings(86, 86, 80, 86, 18, 10, 87)),
  player("gasnier-2010-dragons", "mark-gasnier", "Mark Gasnier", 2010, "St George Illawarra", ["centre"], "class centre", ratings(88, 89, 78, 82, 20, 10, 89)),
  player("costigan-2010-dragons", "neville-costigan", "Neville Costigan", 2010, "St George Illawarra", ["middle", "edge"], "contact forward", ratings(83, 75, 85, 87, 12, 10, 84)),
  player("weyman-2010-dragons", "michael-weyman", "Michael Weyman", 2010, "St George Illawarra", ["middle"], "front-row punch", ratings(84, 75, 84, 87, 12, 10, 85)),
  player("fien-2010-dragons", "nathan-fien", "Nathan Fien", 2010, "St George Illawarra", ["hooker", "half"], "utility controller", ratings(82, 80, 79, 84, 78, 26, 83)),

  player("goodwin-2014-souths", "bryson-goodwin", "Bryson Goodwin", 2014, "South Sydney", ["wing", "centre"], "goal-kicking back", ratings(81, 80, 77, 81, 28, 84, 81)),
  player("auvaa-2014-souths", "kirisome-auvaa", "Kirisome Auva'a", 2014, "South Sydney", ["centre"], "direct centre", ratings(81, 82, 75, 81, 16, 10, 82)),
  player("mcqueen-2014-souths", "chris-mcqueen", "Chris McQueen", 2014, "South Sydney", ["edge", "centre"], "left-edge runner", ratings(83, 81, 81, 86, 16, 10, 84)),
  player("tyrrell-2014-souths", "dave-tyrrell", "Dave Tyrrell", 2014, "South Sydney", ["middle"], "bench middle", ratings(79, 70, 80, 85, 12, 10, 79)),
  player("turner-2014-souths", "kyle-turner", "Kyle Turner", 2014, "South Sydney", ["edge", "middle"], "young back-rower", ratings(80, 76, 80, 85, 14, 10, 81)),

  player("linnett-2015-cowboys", "kane-linnett", "Kane Linnett", 2015, "North Queensland", ["centre", "edge"], "left centre", ratings(82, 81, 78, 83, 18, 10, 83)),
  player("winterstein-2015-cowboys", "antonio-winterstein", "Antonio Winterstein", 2015, "North Queensland", ["wing"], "finishing winger", ratings(83, 84, 75, 82, 14, 10, 84)),
  player("lowe-2015-cowboys", "ethan-lowe", "Ethan Lowe", 2015, "North Queensland", ["edge", "middle"], "goal-kicking forward", ratings(83, 78, 83, 88, 18, 82, 84)),
  player("tamou-2015-cowboys", "james-tamou", "James Tamou", 2015, "North Queensland", ["middle"], "representative prop", ratings(86, 77, 86, 89, 12, 10, 87)),
  player("kostjasyn-2015-cowboys", "rory-kostjasyn", "Rory Kostjasyn", 2015, "North Queensland", ["hooker", "middle"], "utility hooker", ratings(80, 76, 80, 86, 58, 12, 81)),

  player("feki-2016-sharks", "sosaia-feki", "Sosaia Feki", 2016, "Cronulla-Sutherland", ["wing"], "left winger", ratings(82, 83, 75, 82, 14, 10, 83)),
  player("leutele-2016-sharks", "ricky-leutele", "Ricky Leutele", 2016, "Cronulla-Sutherland", ["centre"], "strong centre", ratings(82, 82, 77, 82, 16, 10, 83)),
  player("prior-2016-sharks", "matt-prior", "Matt Prior", 2016, "Cronulla-Sutherland", ["middle", "edge"], "defensive middle", ratings(85, 76, 87, 90, 12, 10, 86)),
  player("bukuya-2016-sharks", "jayson-bukuya", "Jayson Bukuya", 2016, "Cronulla-Sutherland", ["edge", "middle"], "bench edge", ratings(81, 78, 80, 85, 14, 10, 81)),
  player("brailey-2016-sharks", "jayden-brailey", "Jayden Brailey", 2016, "Cronulla-Sutherland", ["hooker"], "young hooker", ratings(76, 73, 77, 82, 52, 12, 76)),

  player("vunivalu-2017-melbourne", "suliasi-vunivalu", "Suliasi Vunivalu", 2017, "Melbourne", ["wing"], "try-scoring winger", ratings(88, 91, 73, 82, 14, 10, 89)),
  player("scott-2017-melbourne", "curtis-scott", "Curtis Scott", 2017, "Melbourne", ["centre"], "young centre", ratings(82, 82, 76, 81, 16, 10, 83)),
  player("glasby-2017-melbourne", "tim-glasby", "Tim Glasby", 2017, "Melbourne", ["middle"], "reliable middle", ratings(82, 73, 83, 87, 12, 10, 83)),
  player("mclean-2017-melbourne", "jordan-mclean", "Jordan McLean", 2017, "Melbourne", ["middle"], "tall prop", ratings(84, 76, 84, 88, 12, 10, 85)),
  player("welch-2017-melbourne", "christian-welch", "Christian Welch", 2017, "Melbourne", ["middle"], "bench prop", ratings(80, 72, 81, 85, 12, 10, 80)),

  player("tupou-2018-roosters", "daniel-tupou", "Daniel Tupou", 2018, "Sydney Roosters", ["wing"], "aerial winger", ratings(86, 87, 77, 85, 14, 10, 87)),
  player("manu-2018-roosters", "joseph-manu", "Joseph Manu", 2018, "Sydney Roosters", ["centre", "fullback"], "skill centre", ratings(88, 89, 80, 84, 28, 10, 89)),
  player("aubusson-2018-roosters", "mitchell-aubusson", "Mitchell Aubusson", 2018, "Sydney Roosters", ["edge", "centre"], "utility edge", ratings(84, 78, 85, 89, 14, 10, 85)),
  player("liu-2018-roosters", "isaac-liu", "Isaac Liu", 2018, "Sydney Roosters", ["middle", "edge"], "reliable middle", ratings(84, 75, 85, 88, 12, 10, 85)),
  player("tetevano-2018-roosters", "zane-tetevano", "Zane Tetevano", 2018, "Sydney Roosters", ["middle"], "impact prop", ratings(81, 74, 81, 85, 12, 10, 82)),

  player("cotric-2019-raiders", "nick-cotric", "Nick Cotric", 2019, "Canberra", ["wing", "centre"], "power winger", ratings(85, 86, 77, 85, 14, 10, 86)),
  player("leilua-2019-raiders", "joseph-leilua", "Joseph Leilua", 2019, "Canberra", ["centre"], "offloading centre", ratings(84, 85, 75, 81, 18, 10, 84)),
  player("tapine-2019-raiders", "joseph-tapine", "Joseph Tapine", 2019, "Canberra", ["middle", "edge"], "skill forward", ratings(86, 83, 84, 88, 16, 10, 86)),
  player("soliola-2019-raiders", "sia-soliola", "Sia Soliola", 2019, "Canberra", ["edge", "middle"], "veteran forward", ratings(84, 77, 85, 88, 12, 10, 85)),
  player("sutton-2019-raiders", "ryan-sutton", "Ryan Sutton", 2019, "Canberra", ["middle"], "bench prop", ratings(80, 73, 81, 85, 12, 10, 80)),

  player("mansour-2020-panthers", "josh-mansour", "Josh Mansour", 2020, "Penrith", ["wing"], "yardage winger", ratings(84, 84, 77, 88, 14, 10, 84)),
  player("naden-2020-panthers", "brent-naden", "Brent Naden", 2020, "Penrith", ["centre", "wing"], "strike centre", ratings(82, 83, 74, 80, 16, 10, 82)),
  player("capewell-2020-panthers", "kurt-capewell", "Kurt Capewell", 2020, "Penrith", ["edge", "centre"], "utility edge", ratings(84, 81, 83, 88, 16, 10, 85)),
  player("tamou-2020-panthers", "james-tamou", "James Tamou", 2020, "Penrith", ["middle"], "captain prop", ratings(84, 74, 85, 88, 12, 10, 85)),
  player("may-2020-panthers", "tyrone-may", "Tyrone May", 2020, "Penrith", ["half", "centre", "edge"], "bench utility", ratings(79, 78, 75, 82, 64, 16, 80)),

  player("wblake-2022-eels", "waqa-blake", "Waqa Blake", 2022, "Parramatta", ["centre", "wing"], "rangy centre", ratings(81, 82, 74, 80, 16, 10, 81)),
  player("opacic-2022-eels", "tom-opacic", "Tom Opacic", 2022, "Parramatta", ["centre"], "defensive centre", ratings(80, 78, 78, 81, 16, 10, 80)),
  player("lane-2022-eels", "shaun-lane", "Shaun Lane", 2022, "Parramatta", ["edge", "middle"], "offloading edge", ratings(86, 85, 82, 88, 20, 10, 87)),
  player("matterson-2022-eels", "ryan-matterson", "Ryan Matterson", 2022, "Parramatta", ["middle", "edge"], "ball-playing forward", ratings(85, 81, 84, 89, 24, 10, 86)),
  player("cartwright-2022-eels", "bryce-cartwright", "Bryce Cartwright", 2022, "Parramatta", ["edge", "half"], "skill forward", ratings(80, 81, 74, 80, 42, 10, 80)),

  player("arthars-2023-broncos", "jesse-arthars", "Jesse Arthars", 2023, "Brisbane", ["wing", "centre"], "safe winger", ratings(81, 81, 77, 82, 16, 10, 81)),
  player("mariner-2023-broncos", "deine-mariner", "Deine Mariner", 2023, "Brisbane", ["centre", "wing"], "young runner", ratings(78, 80, 73, 80, 14, 10, 78)),
  player("capewell-2023-broncos", "kurt-capewell", "Kurt Capewell", 2023, "Brisbane", ["edge", "centre"], "veteran edge", ratings(84, 80, 84, 88, 16, 10, 85)),
  player("flegler-2023-broncos", "thomas-flegler", "Thomas Flegler", 2023, "Brisbane", ["middle"], "representative prop", ratings(87, 79, 87, 90, 12, 10, 88)),
  player("smoothy-2023-broncos", "tyson-smoothy", "Tyson Smoothy", 2023, "Brisbane", ["hooker"], "bench hooker", ratings(77, 75, 77, 82, 52, 12, 77)),

  player("montoya-2023-warriors", "marcelo-montoya", "Marcelo Montoya", 2023, "Warriors", ["wing", "centre"], "effort winger", ratings(82, 82, 77, 84, 14, 10, 82)),
  player("berry-2023-warriors", "rocco-berry", "Rocco Berry", 2023, "Warriors", ["centre"], "young centre", ratings(80, 80, 76, 81, 16, 10, 80)),
  player("niukore-2023-warriors", "marata-niukore", "Marata Niukore", 2023, "Warriors", ["edge", "middle"], "power forward", ratings(85, 82, 84, 88, 12, 10, 85)),
  player("curran-2023-warriors", "josh-curran", "Josh Curran", 2023, "Warriors", ["middle", "edge"], "busy forward", ratings(83, 78, 83, 88, 14, 10, 83)),
  player("barnett-2023-warriors", "mitch-barnett", "Mitch Barnett", 2023, "Warriors", ["middle", "edge"], "aggressive forward", ratings(84, 79, 84, 88, 12, 10, 84)),

  player("turuva-2024-panthers", "sunia-turuva", "Sunia Turuva", 2024, "Penrith", ["wing", "fullback"], "yardage finisher", ratings(85, 86, 77, 87, 18, 10, 85)),
  player("alamoti-2024-panthers", "paul-alamoti", "Paul Alamoti", 2024, "Penrith", ["centre", "wing"], "young centre", ratings(81, 82, 76, 81, 16, 72, 82)),
  player("sorensen-2024-panthers", "scott-sorensen", "Scott Sorensen", 2024, "Penrith", ["edge", "middle"], "reliable edge", ratings(85, 80, 86, 90, 14, 10, 86)),
  player("eisenhuth-2024-panthers", "matt-eisenhuth", "Matt Eisenhuth", 2024, "Penrith", ["middle"], "bench middle", ratings(80, 72, 82, 86, 12, 10, 80)),
  player("schneider-2024-panthers", "brad-schneider", "Brad Schneider", 2024, "Penrith", ["half"], "backup half", ratings(79, 77, 74, 81, 82, 62, 80))
];

PLAYER_SEASONS.push(...SQUAD_DEPTH);
mergeGeneratedPlayerSeasons();
enrichImportedPlayerPositions();
applyCareerPositionCorrections();

function mergeGeneratedPlayerSeasons() {
  const generated = Array.isArray(window.NRL_GENERATED_PLAYER_SEASONS) ? window.NRL_GENERATED_PLAYER_SEASONS : [];
  const existingByKey = new Map(PLAYER_SEASONS.map((item) => [playerSeasonMergeKey(item), item]));

  for (const raw of generated) {
    const imported = hydrateImportedPlayer(raw);
    if (!imported) continue;

    const key = playerSeasonMergeKey(imported);
    const existing = existingByKey.get(key);

    if (existing) {
      existing.careerId = imported.careerId;
      existing.positions = mergePositions(existing.positions, imported.positions);
      existing.apps = imported.apps;
      existing.starts = imported.starts;
      existing.source = "Curated + RLP";
      continue;
    }

    PLAYER_SEASONS.push(imported);
    existingByKey.set(key, imported);
  }
}

function hydrateImportedPlayer(raw) {
  if (!raw || !raw.name || !raw.season || !raw.club || !raw.careerId) return null;
  const importedRatings = Array.isArray(raw.ratings) ? ratings(...raw.ratings) : raw.ratings;

  return {
    id: raw.id,
    careerId: raw.careerId,
    name: raw.name,
    season: raw.season,
    club: raw.club,
    positions: normalizePositions(raw.positions || []),
    role: raw.role || "squad player",
    ratings: importedRatings,
    source: raw.source || "RLP",
    apps: raw.apps || 0,
    starts: raw.starts || 0
  };
}

function enrichImportedPlayerPositions() {
  for (const item of PLAYER_SEASONS) {
    item.positions = normalizePositions(item.positions || []);

    if (/\block\b/i.test(item.role || "") && !item.positions.includes("lock")) {
      item.positions = insertAfterForward(item.positions, "lock");
    }
  }
}

function applyCareerPositionCorrections() {
  const careerCounts = new Map();
  const audit = window.NRL_PLAYER_POSITION_AUDIT;

  for (const item of PLAYER_SEASONS) {
    const key = normalizeNameForKey(item.name);
    if (!careerCounts.has(key)) careerCounts.set(key, new Map());

    const counts = careerCounts.get(key);
    item.positions.forEach((position, index) => {
      const weight = index === 0 ? 3 : 1.35;
      counts.set(position, (counts.get(position) || 0) + weight);
    });
  }

  for (const item of PLAYER_SEASONS) {
    const key = normalizeNameForKey(item.name);
    const audited = audit?.byCareerId?.[item.careerId] || audit?.byNameKey?.[key];
    const override = CAREER_POSITION_OVERRIDES[key];
    const auditedPreferred = audited
      ? normalizePositions([...(override || []).filter((position) => audited.positions.includes(position)), ...audited.positions])
      : null;
    const preferred = audited ? auditedPreferred : override || careerPositionOrder(careerCounts.get(key));
    const originalPositions = normalizePositions(item.positions || []);
    item.positions = normalizePositions([...preferred, ...originalPositions]).slice(0, 5);
    if (audited) {
      item.positions = normalizePositions(preferred);
      item.positionAudit = audited;
      item.source = `${item.source || "RLP"} + Position Audit`;
    }
    item.role = refineRolePrimary(item.role, item.positions[0]);
  }
}

function careerPositionOrder(counts) {
  if (!counts?.size) return [];
  const entries = [...counts.entries()].sort((a, b) => b[1] - a[1] || Object.keys(POSITION_LABELS).indexOf(a[0]) - Object.keys(POSITION_LABELS).indexOf(b[0]));
  const top = entries[0][1];

  return entries
    .filter(([, count], index) => index < 2 || count >= top * 0.22)
    .slice(0, 4)
    .map(([position]) => position);
}

function refineRolePrimary(role, primaryPosition) {
  if (!primaryPosition || !role) return role || "squad player";
  const prefixMatch = String(role).match(/^(regular|rotation|depth)\b/i);
  if (!prefixMatch) return role;
  const prefix = prefixMatch[1].toLowerCase();
  const roleLabel = {
    fullback: "fullback",
    wing: "winger",
    centre: "centre",
    half: "playmaker",
    edge: "edge forward",
    middle: "middle forward",
    lock: "lock forward",
    hooker: "hooker"
  }[primaryPosition] || "player";

  return `${prefix} ${roleLabel}`;
}

function mergePositions(primaryPositions, importedPositions) {
  return normalizePositions([...(primaryPositions || []), ...(importedPositions || [])]);
}

function normalizePositions(positions) {
  const rank = Object.keys(POSITION_LABELS);
  const normalized = [];

  for (const position of positions) {
    if (rank.includes(position) && !normalized.includes(position)) {
      normalized.push(position);
    }
  }

  return normalized;
}

function insertAfterForward(positions, position) {
  const copy = [...positions];
  const insertIndex = Math.max(copy.indexOf("middle"), copy.indexOf("edge"));
  if (insertIndex >= 0) {
    copy.splice(insertIndex + 1, 0, position);
  } else {
    copy.push(position);
  }
  return normalizePositions(copy);
}

function playerSeasonMergeKey(item) {
  return `${item.season}|${item.club}|${normalizeNameForKey(item.name)}`;
}

function normalizeNameForKey(value) {
  return String(value || "").toLowerCase().replace(/[^a-z0-9]+/g, "");
}

function slugForId(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function baseClubName(value) {
  const raw = String(value || "")
    .replace(/\s+\+\s+.+$/, "")
    .replace(/^\d{4}\s+/, "")
    .trim();

  return TEAM_ALIASES[raw] || raw;
}

function sameClubName(a, b) {
  return baseClubName(a) === baseClubName(b);
}

function splitTeamDisplay(value) {
  const [name, immortalName] = String(value || "").split(/\s+\+\s+/, 2);
  return {
    name: name || "",
    immortalName: immortalName || ""
  };
}

function teamColours(value) {
  const baseName = baseClubName(splitTeamDisplay(value).name);
  return TEAM_COLOURS[baseName] || ["#d8dece", "#67d8d0"];
}

function renderTeamName(value, options = {}) {
  const { name, immortalName } = splitTeamDisplay(value);
  const [primary, secondary] = teamColours(name);
  const className = options.compact ? "team-name compact" : "team-name";
  const suffix = immortalName ? `<span class="team-immortal-mini">+ ${escapeHTML(immortalName)}</span>` : "";

  return `
    <span class="${className}">
      <span class="team-icon" style="--team-a:${primary}; --team-b:${secondary};"></span>
      <span class="team-text">${escapeHTML(name)}${suffix}</span>
    </span>
  `;
}

function rollImmortalOffer(group) {
  const candidates = IMMORTALS
    .filter((item) => item.clubs.some((club) => sameClubName(club, group.club)))
    .map((item) => createImmortalPlayer(item, group.season, group.club))
    .filter((candidate) => !state.lockedCareers.has(candidate.careerId) && getAvailableSlotsForPlayer(candidate).length);

  if (!candidates.length || Math.random() > IMMORTAL_OFFER_CHANCE) return null;
  return randomItem(candidates);
}

function rollImmortalForClub(club, chance) {
  const candidates = IMMORTALS.filter((item) => item.clubs.some((playedClub) => sameClubName(playedClub, club)));
  if (!candidates.length || Math.random() > chance) return null;
  return randomItem(candidates);
}

function createImmortalPlayer(item, season, club) {
  return {
    id: `immortal-${item.id}-${season}-${slugForId(club)}`,
    careerId: `immortal-${item.id}`,
    name: item.name,
    season,
    club,
    positions: [...item.positions],
    role: item.role,
    ratings: { ...IMMORTAL_RATINGS },
    induction: item.induction,
    isImmortal: true
  };
}

function applyOpponentImmortal(team, chance) {
  const immortalPlayer = rollImmortalForClub(team.name, chance);
  if (!immortalPlayer) return team;

  return {
    ...team,
    name: `${team.name} + ${immortalPlayer.name}`,
    immortal: immortalPlayer,
    attack: clamp(team.attack + 4, 1, 100),
    defence: clamp(team.defence + 4, 1, 100),
    power: clamp(team.power + 4, 1, 100),
    clutch: clamp(team.clutch + 5, 1, 100),
    goalSkill: clamp(Math.max(team.goalSkill, 90) + 2, 1, 100)
  };
}

const OPPONENTS = [
  { id: "opp-brisbane", name: "Brisbane", attack: 88, defence: 84, power: 88, clutch: 86, goalSkill: 82 },
  { id: "opp-canberra", name: "Canberra", attack: 80, defence: 82, power: 84, clutch: 78, goalSkill: 79 },
  { id: "opp-bulldogs", name: "Canterbury-Bankstown", attack: 79, defence: 83, power: 82, clutch: 80, goalSkill: 78 },
  { id: "opp-cronulla", name: "Cronulla-Sutherland", attack: 85, defence: 84, power: 84, clutch: 82, goalSkill: 84 },
  { id: "opp-gold-coast", name: "Gold Coast", attack: 80, defence: 76, power: 81, clutch: 75, goalSkill: 80 },
  { id: "opp-manly", name: "Manly Warringah", attack: 86, defence: 80, power: 83, clutch: 84, goalSkill: 81 },
  { id: "opp-melbourne", name: "Melbourne", attack: 91, defence: 89, power: 87, clutch: 91, goalSkill: 88 },
  { id: "opp-newcastle", name: "Newcastle", attack: 82, defence: 79, power: 82, clutch: 78, goalSkill: 80 },
  { id: "opp-cowboys", name: "North Queensland", attack: 84, defence: 80, power: 85, clutch: 83, goalSkill: 86 },
  { id: "opp-parramatta", name: "Parramatta", attack: 83, defence: 79, power: 86, clutch: 78, goalSkill: 86 },
  { id: "opp-penrith", name: "Penrith", attack: 92, defence: 92, power: 91, clutch: 94, goalSkill: 90 },
  { id: "opp-souths", name: "South Sydney", attack: 86, defence: 78, power: 83, clutch: 82, goalSkill: 86 },
  { id: "opp-dragons", name: "St George Illawarra", attack: 78, defence: 77, power: 78, clutch: 77, goalSkill: 78 },
  { id: "opp-roosters", name: "Sydney Roosters", attack: 89, defence: 87, power: 88, clutch: 89, goalSkill: 87 },
  { id: "opp-warriors", name: "Warriors", attack: 84, defence: 81, power: 86, clutch: 80, goalSkill: 85 },
  { id: "opp-tigers", name: "Wests Tigers", attack: 76, defence: 74, power: 77, clutch: 74, goalSkill: 76 }
];

const GRAND_FINAL_WINNERS = [
  { id: "gf-1998-brisbane", name: "1998 Brisbane", season: 1998, attack: 91, defence: 87, power: 91, clutch: 91, goalSkill: 82 },
  { id: "gf-1999-melbourne", name: "1999 Melbourne", season: 1999, attack: 88, defence: 86, power: 86, clutch: 89, goalSkill: 82 },
  { id: "gf-2000-brisbane", name: "2000 Brisbane", season: 2000, attack: 91, defence: 88, power: 90, clutch: 91, goalSkill: 83 },
  { id: "gf-2001-newcastle", name: "2001 Newcastle", season: 2001, attack: 90, defence: 84, power: 86, clutch: 91, goalSkill: 88 },
  { id: "gf-2002-roosters", name: "2002 Sydney Roosters", season: 2002, attack: 89, defence: 88, power: 88, clutch: 91, goalSkill: 88 },
  { id: "gf-2003-penrith", name: "2003 Penrith", season: 2003, attack: 89, defence: 84, power: 88, clutch: 90, goalSkill: 88 },
  { id: "gf-2004-bulldogs", name: "2004 Canterbury-Bankstown", season: 2004, attack: 88, defence: 87, power: 91, clutch: 91, goalSkill: 90 },
  { id: "gf-2005-tigers", name: "2005 Wests Tigers", season: 2005, attack: 90, defence: 80, power: 83, clutch: 91, goalSkill: 88 },
  { id: "gf-2006-brisbane", name: "2006 Brisbane", season: 2006, attack: 90, defence: 88, power: 90, clutch: 93, goalSkill: 85 },
  { id: "gf-2007-melbourne", name: "2007 Melbourne", season: 2007, attack: 94, defence: 90, power: 90, clutch: 94, goalSkill: 92 },
  { id: "gf-2008-manly", name: "2008 Manly Warringah", season: 2008, attack: 92, defence: 90, power: 89, clutch: 93, goalSkill: 86 },
  { id: "gf-2009-melbourne", name: "2009 Melbourne", season: 2009, attack: 93, defence: 89, power: 89, clutch: 94, goalSkill: 93 },
  { id: "gf-2010-dragons", name: "2010 St George Illawarra", season: 2010, attack: 87, defence: 92, power: 86, clutch: 92, goalSkill: 90 },
  { id: "gf-2011-manly", name: "2011 Manly Warringah", season: 2011, attack: 91, defence: 88, power: 88, clutch: 92, goalSkill: 86 },
  { id: "gf-2012-melbourne", name: "2012 Melbourne", season: 2012, attack: 91, defence: 89, power: 88, clutch: 93, goalSkill: 92 },
  { id: "gf-2013-roosters", name: "2013 Sydney Roosters", season: 2013, attack: 91, defence: 91, power: 90, clutch: 93, goalSkill: 90 },
  { id: "gf-2014-souths", name: "2014 South Sydney", season: 2014, attack: 90, defence: 87, power: 92, clutch: 94, goalSkill: 89 },
  { id: "gf-2015-cowboys", name: "2015 North Queensland", season: 2015, attack: 91, defence: 86, power: 89, clutch: 95, goalSkill: 93 },
  { id: "gf-2016-sharks", name: "2016 Cronulla-Sutherland", season: 2016, attack: 89, defence: 88, power: 90, clutch: 94, goalSkill: 88 },
  { id: "gf-2017-melbourne", name: "2017 Melbourne", season: 2017, attack: 94, defence: 91, power: 90, clutch: 96, goalSkill: 95 },
  { id: "gf-2018-roosters", name: "2018 Sydney Roosters", season: 2018, attack: 92, defence: 90, power: 90, clutch: 95, goalSkill: 91 },
  { id: "gf-2019-roosters", name: "2019 Sydney Roosters", season: 2019, attack: 91, defence: 90, power: 89, clutch: 94, goalSkill: 90 },
  { id: "gf-2020-melbourne", name: "2020 Melbourne", season: 2020, attack: 92, defence: 88, power: 89, clutch: 94, goalSkill: 91 },
  { id: "gf-2021-penrith", name: "2021 Penrith", season: 2021, attack: 90, defence: 92, power: 91, clutch: 94, goalSkill: 92 },
  { id: "gf-2022-penrith", name: "2022 Penrith", season: 2022, attack: 93, defence: 93, power: 92, clutch: 95, goalSkill: 92 },
  { id: "gf-2023-penrith", name: "2023 Penrith", season: 2023, attack: 92, defence: 92, power: 92, clutch: 96, goalSkill: 93 },
  { id: "gf-2024-penrith", name: "2024 Penrith", season: 2024, attack: 91, defence: 93, power: 92, clutch: 96, goalSkill: 94 },
  { id: "gf-2025-brisbane", name: "2025 Brisbane", season: 2025, attack: 91, defence: 88, power: 90, clutch: 95, goalSkill: 92 }
];

const app = document.querySelector("#app");

const state = {
  phase: "draft",
  ratingMode: "career",
  playStyle: "balanced",
  drafted: [],
  goalKickerId: null,
  lockedCareers: new Set(),
  rerollUsed: false,
  currentOffer: null,
  activeResultTab: "players",
  simulationReveal: null,
  pendingSpeech: null,
  seasonResult: null
};

const careerProfiles = buildCareerProfiles();
let activeRevealToken = 0;
let pendingSpeechResolve = null;

render();

function buildCareerProfiles() {
  const profiles = new Map();

  for (const item of PLAYER_SEASONS) {
    if (!profiles.has(item.careerId)) {
      profiles.set(item.careerId, {
        id: item.careerId,
        name: item.name,
        seasons: [],
        clubs: new Set(),
        positions: new Set(),
        peakOverall: item.ratings.overall,
        peakRatings: { ...item.ratings }
      });
    }

    const profile = profiles.get(item.careerId);
    profile.seasons.push(item.season);
    profile.clubs.add(item.club);
    item.positions.forEach((position) => profile.positions.add(position));

    if (item.ratings.overall > profile.peakOverall) {
      profile.peakOverall = item.ratings.overall;
      profile.peakRatings = { ...item.ratings };
    } else {
      for (const key of Object.keys(item.ratings)) {
        profile.peakRatings[key] = Math.max(profile.peakRatings[key], item.ratings[key]);
      }
    }
  }

  for (const profile of profiles.values()) {
    profile.seasons.sort((a, b) => a - b);
    profile.clubs = [...profile.clubs].sort();
    profile.positions = [...profile.positions].sort();
  }

  return profiles;
}

function render() {
  app.innerHTML = `
    <section class="topbar">
      <div class="brand">
        <div class="brand-mark" aria-label="NRL Invincible icon">
          <span class="mark-goal"></span>
          <span class="mark-core">I</span>
        </div>
        <div>
          <h1>NRL Invincible</h1>
          <p class="subtitle">${escapeHTML(getSubtitle())}</p>
        </div>
      </div>
      <div class="toolbar">${renderToolbar()}</div>
    </section>

    <section class="app-frame">
      ${renderSquadPanel()}
      ${state.phase === "results" ? renderResultsPanel() : state.phase === "simulating" ? renderSimulationPanel() : renderDraftPanel()}
    </section>

    <p class="notice">
      Independent fan-made draft game. Player-season positions are generated from Rugby League Project team pages; ratings are independent gameplay estimates and are not official data. Game by Brent Clark. <a href="mailto:brentaclark@proton.me">Enquiries</a>
    </p>
  `;

  bindEvents();
}

function getSubtitle() {
  if (state.phase === "simulating") {
    return "Game-by-game results are rolling through.";
  }

  if (state.phase === "results") {
    const summary = state.seasonResult.summary;
    return `${summary.record} overall, ${summary.regularRecord} regular season, ${summary.regularFinish}, ${summary.finalStatus}`;
  }

  if (isDraftComplete()) {
    return `Your XIII is ready. Pick a style, then simulate the season.`;
  }

  return "Spin a club-season, then place one squad member into any open fit.";
}

function renderToolbar() {
  if (state.phase === "simulating") {
    return `
      <button class="button" disabled>${iconSvg("simulate")}Simulating</button>
    `;
  }

  if (state.phase === "results") {
    return `
      <button class="button small" data-action="copy-summary">${iconSvg("summary")}Copy Summary</button>
      <button class="button small" data-action="copy-image">${iconSvg("image")}Copy Image</button>
      <button class="button small" data-action="download-image">${iconSvg("download")}Download PNG</button>
      <button class="button small warning" data-action="reset">${iconSvg("reset")}New Run</button>
    `;
  }

  return `
    <button class="button spin-button" data-action="spin" ${isDraftComplete() || state.currentOffer ? "disabled" : ""}>${iconSvg("spin")}Spin</button>
    <button class="button" data-action="reroll" ${state.currentOffer && !state.rerollUsed && !isDraftComplete() ? "" : "disabled"}>${iconSvg("reroll")}Re-roll ${state.rerollUsed ? "Used" : "1"}</button>
    <button class="button primary" data-action="simulate" ${isDraftComplete() ? "" : "disabled"}>${iconSvg("simulate")}Simulate Season</button>
    <button class="button warning" data-action="reset">${iconSvg("reset")}Reset</button>
  `;
}

function iconSvg(name) {
  const paths = {
    spin: `
      <circle cx="12" cy="12" r="7"></circle>
      <path d="M12 5v3.5M12 15.5V19M5 12h3.5M15.5 12H19"></path>
      <path d="m16.8 7.2 1.8-.4-.4 1.8"></path>
    `,
    reroll: `
      <path d="M5 9a6 6 0 0 1 10.2-4.2L17 6.6"></path>
      <path d="M17 4v4h-4"></path>
      <path d="M19 15a6 6 0 0 1-10.2 4.2L7 17.4"></path>
      <path d="M7 20v-4h4"></path>
    `,
    simulate: `
      <path d="M7 5v14l11-7z"></path>
      <path d="M4 5v14"></path>
    `,
    reset: `
      <path d="M7 7l10 10"></path>
      <path d="M17 7 7 17"></path>
      <path d="M12 3.8a8.2 8.2 0 1 0 8.2 8.2"></path>
    `,
    summary: `
      <path d="M6 4h9l3 3v13H6z"></path>
      <path d="M15 4v4h4"></path>
      <path d="M9 11h6M9 15h6"></path>
    `,
    image: `
      <rect x="4" y="5" width="16" height="14" rx="2"></rect>
      <circle cx="9" cy="10" r="1.5"></circle>
      <path d="m6.5 17 4.2-4.2 2.5 2.5 2.1-2.1L19 17"></path>
    `,
    download: `
      <path d="M12 4v10"></path>
      <path d="m8 10 4 4 4-4"></path>
      <path d="M5 19h14"></path>
    `
  };

  return `
    <svg class="button-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      ${paths[name] || paths.summary}
    </svg>
  `;
}

function renderSquadPanel() {
  const teamRatings = calculateTeamRatings();
  const filledCount = state.drafted.length;

  return `
    <section class="panel squad-panel">
      <div class="panel-header">
        <h2 class="panel-title">Selected XIII</h2>
        <span class="mini">${filledCount}/${SLOT_ORDER.length} drafted</span>
      </div>
      <div class="meter-row">
        <div class="metric"><b>${teamRatings.overall}</b><span>Overall</span></div>
        <div class="metric"><b>${teamRatings.attack}</b><span>Attack</span></div>
        <div class="metric"><b>${teamRatings.defence}</b><span>Defence</span></div>
        <div class="metric"><b>${teamRatings.clutch}</b><span>Big game</span></div>
      </div>
      <div class="pitch">
        <div class="slots">
          ${SLOT_LINES.map((line) => renderSlotLine(line)).join("")}
        </div>
      </div>
    </section>
  `;
}

function renderSlotLine(line) {
  return `
    <div class="slot-line ${line.key}">
      ${line.slots.map((index) => renderSlot(index)).join("")}
    </div>
  `;
}

function renderSlot(index) {
  const slot = SLOT_ORDER[index];
  const pick = getPickForSlot(index);

  if (!pick) {
    return `
      <div class="slot open">
        <div class="slot-role">
          <span>${escapeHTML(slot.label)}</span>
          <span>${POSITION_LABELS[slot.key]}</span>
        </div>
        <div class="slot-name">Open</div>
        <div class="slot-meta">Needs ${POSITION_LABELS[slot.key]}</div>
      </div>
    `;
  }

  return `
      <div class="slot filled ${isSelectedGoalKicker(pick) ? "goal-kicker-slot" : ""}">
      <div class="slot-role">
        <span>${escapeHTML(slot.label)}</span>
        <span class="slot-rating ${ratingClass(pick.effectiveRatings.overall)}">${pick.effectiveRatings.overall}</span>
      </div>
      <div class="slot-name">${escapeHTML(pick.name)}${pick.isImmortal ? ` <span class="inline-immortal">Immortal</span>` : ""}</div>
      <div class="slot-meta">${pick.season} ${renderTeamName(pick.club, { compact: true })} | ${escapeHTML(pick.fit.label)} | Form ${formatSigned(pick.formDelta)}${isSelectedGoalKicker(pick) ? " | Goal kicker" : ""}</div>
    </div>
  `;
}

function renderDraftPanel() {
  return `
    <section class="panel draft-panel">
      <div class="panel-header">
        <h2 class="panel-title">${isDraftComplete() ? "Ready" : "Draft"}</h2>
        <span class="mini">${state.ratingMode === "season" ? "Season form" : "Career peak"}</span>
      </div>
      <div class="mode-bar">
        <button class="mode-button ${state.ratingMode === "season" ? "active" : ""}" data-action="set-mode" data-mode="season" ${state.drafted.length ? "disabled" : ""}>
          <span>Season Form</span>
          <small>Hard Mode</small>
        </button>
        <button class="mode-button ${state.ratingMode === "career" ? "active" : ""}" data-action="set-mode" data-mode="career" ${state.drafted.length ? "disabled" : ""}>Career Peak</button>
      </div>
      ${!state.drafted.length && !state.currentOffer ? renderIntroPanel() : ""}
      ${isDraftComplete() ? renderStylePicker() : ""}
      ${isDraftComplete() ? renderGoalKickerPicker() : ""}
      ${isDraftComplete() ? renderPredictionPanel() : ""}
      <div class="spin-stage">
        ${renderSpinStage()}
      </div>
    </section>
  `;
}

function renderIntroPanel() {
  return `
    <div class="intro-panel">
      <h2>Can you go through a season undefeated?</h2>
      <div class="intro-grid">
        <p>Spin a random NRL club-season from 1998-2025, choose one squad player, then place him into an open position.</p>
        <p>Only regular real-life positions are selectable. A player's main position plays best, secondary regular positions carry a hit.</p>
        <p>You get one re-roll for the whole run. After the XIII is full, choose a style and simulate the season.</p>
        <p>Very rarely, an Immortal can appear for a club he played for. He is rated 100, but form and fit still matter.</p>
      </div>
    </div>
  `;
}

function renderStylePicker() {
  const advice = getStrategyAdvice();

  return `
    <div class="style-picker">
      <div>
        <h3>Playing Style</h3>
        <p>${escapeHTML(advice.summary)}</p>
      </div>
      <div class="style-options">
        ${Object.entries(PLAY_STYLES).map(([key, style]) => `
          <button class="style-button ${state.playStyle === key ? "active" : ""}" data-action="set-style" data-style="${key}">
            <b>${escapeHTML(style.label)}${advice.bestStyle === key ? ` <span class="style-badge">Scout pick</span>` : ""}</b>
            <span>${escapeHTML(style.description)}</span>
            <span>${escapeHTML(advice.predictions[key].shortLabel)}</span>
          </button>
        `).join("")}
      </div>
    </div>
  `;
}

function renderGoalKickerPicker() {
  const candidates = getGoalKickerCandidates();
  const selected = getSelectedGoalKicker();

  return `
    <div class="goal-kicker-picker">
      <div>
        <h3>Goal Kicker</h3>
        <p>${selected ? `${escapeHTML(selected.name)} has the tee for the season.` : "Choose who kicks goals for the season."}</p>
      </div>
      <div class="goal-kicker-options">
        ${candidates.map((pick) => {
          const ratings = getSimulationRatings(pick);
          const active = selected?.id === pick.id;
          return `
            <button class="goal-kicker-button ${active ? "active" : ""}" data-action="set-goal-kicker" data-player-id="${pick.id}">
              <span>
                <b>${escapeHTML(pick.name)}</b>
                <small>${escapeHTML(pick.slotLabel)}</small>
              </span>
              <span class="kicker-stats">
                <span class="kicker-stat ${ratingClass(ratings.goalKicking)}">Goal ${ratings.goalKicking}</span>
                <span class="kicker-stat ${ratingClass(ratings.kicking)}">Kick ${ratings.kicking}</span>
              </span>
            </button>
          `;
        }).join("")}
      </div>
    </div>
  `;
}

function renderPredictionPanel() {
  const prediction = predictSeasonOutcome(state.playStyle);
  const advice = getStrategyAdvice();

  return `
    <div class="prediction-panel">
      <div>
        <span class="status-pill">Prediction</span>
        <h3>${escapeHTML(prediction.finishLabel)} | ${prediction.points} pts</h3>
        <p>${escapeHTML(prediction.finalsForecast)}</p>
      </div>
      <div class="prediction-grid">
        ${renderPredictionMetric("Best style", PLAY_STYLES[advice.bestStyle].label)}
        ${renderPredictionMetric("Win range", `${prediction.winRange[0]}-${prediction.winRange[1]}`)}
        ${renderPredictionMetric("Ceiling", prediction.ceiling)}
        ${renderPredictionMetric("Risk", prediction.risk)}
      </div>
    </div>
  `;
}

function renderPredictionMetric(label, value) {
  return `
    <div class="prediction-metric">
      <span>${escapeHTML(label)}</span>
      <b>${escapeHTML(String(value))}</b>
    </div>
  `;
}

function renderSpinStage() {
  if (isDraftComplete()) {
    return `
      <div class="empty-state">
        <div>
          <strong>XIII locked in</strong>
          <p>Run the season when you are ready.</p>
        </div>
      </div>
    `;
  }

  if (!state.currentOffer) {
    return `
      <div class="wheel-card">
        <div class="next-slot">${getOpenSlots().length} open positions</div>
        <h2 class="wheel-title">Spin for a club-season</h2>
        <p class="wheel-meta">${getAvailableSeasonCount()} eligible club-seasons and ${formatNumber(PLAYER_SEASONS.length)} player-seasons in the database.</p>
      </div>
      <div class="empty-state">
        <div>
          <strong>On the clock</strong>
          <p>Spin to reveal the player choices for this slot.</p>
        </div>
      </div>
    `;
  }

  return `
    <div class="wheel-card">
      <div class="next-slot">${getOpenSlots().length} open positions | Re-roll ${state.rerollUsed ? "used" : "available"}</div>
      <h2 class="wheel-title">${state.currentOffer.season} ${renderTeamName(state.currentOffer.club)}</h2>
      <p class="wheel-meta">${state.currentOffer.eligibleCount} squad players fit at least one open position. Choose a player and slot.</p>
    </div>
    <div class="candidate-grid squad-grid">
      ${state.currentOffer.squad.map((candidate) => renderCandidateCard(candidate)).join("")}
    </div>
  `;
}

function renderCandidateCard(candidate) {
  const career = careerProfiles.get(candidate.careerId) || { peakOverall: candidate.ratings.overall, peakRatings: candidate.ratings };
  const effective = getEffectiveRatings(candidate);
  const seasonOverall = candidate.ratings.overall;
  const careerOverall = getCareerOverall(candidate, career);
  const availability = getPlayerAvailability(candidate);
  const effectivePositions = getEffectivePositions(candidate);
  const alternatePositions = effectivePositions.filter((position) => !candidate.positions.includes(position));
  const availableSlots = getAvailableSlotsForPlayer(candidate);

  return `
    <article class="player-card ${candidate.isImmortal ? "immortal" : ""} ${availability.canPick ? "" : "unavailable"}">
      <div>
        <div class="player-top">
          <div>
            <div class="player-name">${escapeHTML(candidate.name)}${candidate.isImmortal ? ` <span class="inline-immortal">Immortal</span>` : ""}</div>
            <div class="player-sub">${candidate.season} ${renderTeamName(candidate.club, { compact: true })} | ${escapeHTML(candidate.role)}</div>
          </div>
          <div class="rating-badge ${ratingClass(effective.overall)}">${effective.overall}</div>
        </div>
        <div class="tags">
          ${candidate.isImmortal ? `<span class="tag immortal-tag">Immortal</span><span class="tag immortal-tag">Inducted ${candidate.induction}</span>` : ""}
          ${candidate.positions.map((position) => `<span class="tag">${POSITION_LABELS[position]}</span>`).join("")}
          ${alternatePositions.map((position) => `<span class="tag alt">${POSITION_LABELS[position]}</span>`).join("")}
          <span class="tag">Season ${seasonOverall}</span>
          <span class="tag">Career ${careerOverall}</span>
        </div>
        <div class="ratings">
          ${renderRatingRow("ATT", effective.attack)}
          ${renderRatingRow("DEF", effective.defence)}
          ${renderRatingRow("WORK", effective.workrate)}
          ${renderRatingRow("KICK", Math.max(effective.kicking, effective.goalKicking))}
          ${renderRatingRow("BIG", effective.bigGame)}
        </div>
      </div>
      <div class="card-actions">
        ${availableSlots.length ? availableSlots.map((slot) => `
          <button class="button primary position-pick ${slot.fit.level}" data-action="draft" data-player-id="${candidate.id}" data-slot-index="${slot.index}">
            ${escapeHTML(slot.label)}
            <span>${escapeHTML(slot.fit.label)} ${Math.round(slot.fit.multiplier * 100)}%</span>
          </button>
        `).join("") : `<button class="button" disabled>${escapeHTML(availability.label)}</button>`}
      </div>
    </article>
  `;
}

function renderRatingRow(label, value) {
  return `
    <div class="rating-row ${ratingClass(value)}">
      <span>${label}</span>
      <span class="bar"><span style="width:${clamp(value, 0, 100)}%"></span></span>
      <span>${value}</span>
    </div>
  `;
}

function renderSimulationPanel() {
  const reveal = state.simulationReveal || { games: [], index: 0, completedGames: [] };
  const current = reveal.currentGame;
  const pendingSpeech = state.pendingSpeech;
  const completed = reveal.completedGames || [];
  const total = reveal.games.length || 1;
  const progress = Math.round(((completed.length + (current ? 1 : 0)) / total) * 100);

  return `
    <section class="panel results-panel">
      <div class="panel-header">
        <h2 class="panel-title">Season Simulation</h2>
        <span class="mini">${completed.length + (current ? 1 : 0)}/${total}</span>
      </div>
      <div class="simulation-stage">
        ${pendingSpeech ? renderGrandFinalSpeech(pendingSpeech) : current ? renderCurrentGame(current) : `
          <div class="sim-game-card">
            <span class="status-pill">Kick-off</span>
            <h2>Loading Round 1</h2>
            <p class="sim-scorers">The season is being drawn.</p>
          </div>
        `}
        <div class="sim-progress"><span style="width:${progress}%"></span></div>
      </div>
      <div class="table-wrap sim-list">
        <table class="compact-table sim-table">
          <thead>
            <tr>
              <th>Game</th>
              <th>Stage</th>
              <th>Opponent</th>
              <th>Score</th>
              <th>W/L</th>
            </tr>
          </thead>
          <tbody>
            ${completed.slice(-12).map((row, index) => `
              <tr>
                <td class="sim-game-cell">${Math.max(1, completed.length - 11) + index}</td>
                <td class="sim-stage-cell" title="${escapeHTML(row.stage)}">${escapeHTML(formatShortStage(row.stage))}</td>
                <td class="sim-opponent-cell">${renderTeamName(row.opponent, { compact: true })}</td>
                <td class="sim-score-cell">${row.userScore}-${row.oppScore}</td>
                <td class="sim-result-cell ${resultClass(row)}">${row.result}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `;
}

function renderGrandFinalSpeech(prompt) {
  return `
    <div class="sim-game-card speech-card">
      <span class="status-pill">Grand Final</span>
      <h2>Pre-game Speech</h2>
      <p class="sim-opponent">v ${renderTeamName(prompt.opponent)}</p>
      <p class="sim-scorers">${escapeHTML(prompt.intro)}</p>
      <div class="speech-options">
        ${prompt.options.map((option) => `
          <button class="button primary speech-button" data-action="speech" data-speech="${option.key}">
            <span>${escapeHTML(option.label)}</span>
            <small>${escapeHTML(option.text)}</small>
          </button>
        `).join("")}
      </div>
    </div>
  `;
}

function renderCurrentGame(game) {
  return `
    <div class="sim-game-card ${resultClass(game)}">
      <span class="status-pill">${escapeHTML(game.stage)}</span>
      <h2>${game.userScore}-${game.oppScore}</h2>
      <p class="sim-opponent">v ${renderTeamName(game.opponent)}</p>
      <p class="sim-weather">${escapeHTML(game.weather?.label || "Dry")} conditions</p>
      <p class="sim-result ${resultClass(game)}">${game.result === "W" ? "Win" : "Loss"}</p>
      <p class="sim-scorers">${escapeHTML(formatScorerLine(game))}</p>
    </div>
  `;
}

function renderResultsPanel() {
  const result = state.seasonResult;
  const leaders = result.leaders;
  const comparison = renderPredictionComparison(result);
  const mvpRow = leaders.mvp.row;

  return `
    <section class="panel results-panel">
      <div class="panel-header">
        <h2 class="panel-title">Season Review</h2>
        <span class="mini">${state.ratingMode === "season" ? "Season form" : "Career peak"} | ${escapeHTML(result.teamRatings.styleLabel)} | ${formatTotalGames(result.summary)}</span>
      </div>
      <div class="result-hero">
        <div class="result-card">
          <span class="status-pill">${escapeHTML(result.summary.finalStatus)}</span>
          <h2>${escapeHTML(result.summary.record)}</h2>
          <p class="wheel-meta">${escapeHTML(result.summary.regularFinish)} | ${formatTotalGames(result.summary)} | Points differential ${formatSigned(result.summary.pointsDiff)}</p>
          <div class="leaders">
            ${renderLeader("Tries", leaders.tries.name, leaders.tries.value)}
            ${renderLeader("Points", leaders.points.name, leaders.points.value)}
            ${renderLeader("Tackles", leaders.tackles.name, leaders.tackles.value)}
            ${renderLeader("Run metres", leaders.runMetres.name, formatNumber(leaders.runMetres.value))}
          </div>
        </div>
        <div class="result-card">
          <span class="status-pill">MVP</span>
          <h2>${escapeHTML(leaders.mvp.name)}</h2>
          <p class="wheel-meta">${leaders.mvp.value} MVP votes | Team rating ${result.teamRatings.overall} | ${escapeHTML(result.teamRatings.styleLabel)}</p>
          <div class="leaders">
            ${renderMvpStatTiles(mvpRow)}
          </div>
        </div>
        ${comparison}
      </div>
      <div class="tabs">
        ${renderTab("players", "Player Stats")}
        ${renderTab("ladder", "Ladder")}
        ${renderTab("results", "Game By Game")}
        ${renderTab("finals", "Finals")}
      </div>
      ${renderActiveResultsTab()}
    </section>
  `;
}

function renderPredictionComparison(result) {
  if (!result.prediction) return "";

  return `
    <div class="result-card performance-card">
      <span class="status-pill">Forecast check</span>
      <h2>${escapeHTML(formatPredictionDelta(result.summary, result.prediction))}</h2>
      <p class="wheel-meta">${escapeHTML(createPerformanceBlurb(result.summary, result.prediction))}</p>
    </div>
  `;
}

function renderLeader(label, name, value) {
  return `
    <div class="leader">
      <span>${escapeHTML(label)}</span>
      <b>${escapeHTML(String(name))}</b>
      <span>${escapeHTML(String(value))}</span>
    </div>
  `;
}

function renderMvpStatTiles(row) {
  if (!row) return "";

  const tiles = [
    renderLeader("Attack", row.ratings.attack, "rating"),
    renderLeader("Defence", row.ratings.defence, "rating"),
    renderLeader("Workrate", row.ratings.workrate, "rating")
  ];

  if (row.goalAttempts > 0) {
    tiles.push(renderLeader("Goal %", formatGoalPercentage(row), `${row.goals}/${row.goalAttempts}`));
  } else {
    tiles.push(renderLeader("Run metres", formatNumber(row.runMetres), "season"));
  }

  return tiles.join("");
}

function resultClass(row) {
  if (row.stage === "Grand Final" && row.result === "W") return "gold";
  return row.result === "W" ? "win" : "loss";
}

function formatShortStage(stage = "") {
  if (stage.startsWith("Round ")) return `R${stage.replace("Round ", "")}`;
  const stages = {
    "Qualifying Final": "QF",
    "Elimination Final": "EF",
    "Semi Final": "SF",
    "Preliminary Final": "PF",
    "Grand Final": "GF"
  };

  return stages[stage] || stage;
}

function formatTryScorers(scorers = []) {
  return scorers.length ? scorers.join(", ") : "No tries";
}

function formatScorerLine(game) {
  const parts = [`Tries: ${formatTryScorers(game.tryScorers)}`];

  if (game.speechOutcome) {
    parts.push(`Speech: ${game.speechOutcome} (${formatSigned(game.speechEffect)})`);
  }

  if (game.fieldGoalScorers?.length) {
    parts.push(`FG: ${game.fieldGoalScorers.join(", ")}`);
  }

  if (game.twoPointFieldGoalScorers?.length) {
    parts.push(`2FG: ${game.twoPointFieldGoalScorers.join(", ")}`);
  }

  return parts.join(" | ");
}

function formatWeatherSummary(results = []) {
  const counts = results.reduce((acc, row) => {
    const label = row.weather?.label || "Dry";
    acc[label] = (acc[label] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([label, count]) => `${label} ${count}`)
    .join(", ");
}

function renderTab(id, label) {
  return `<button class="tab ${state.activeResultTab === id ? "active" : ""}" data-action="tab" data-tab="${id}">${escapeHTML(label)}</button>`;
}

function renderActiveResultsTab() {
  if (state.activeResultTab === "ladder") return renderLadderTable();
  if (state.activeResultTab === "results") return renderMatchResultsTable();
  if (state.activeResultTab === "finals") return renderFinalsTable();
  return renderPlayerStatsTable();
}

function renderPlayerStatsTable() {
  const rows = [...state.seasonResult.playerStats].sort((a, b) => b.mvpVotes - a.mvpVotes || b.points - a.points || b.tries - a.tries);
  const summary = state.seasonResult.summary;

  return `
    <div class="table-wrap">
      <p class="table-note">Final stats include finals: ${summary.totalGames} games (${summary.regularGames} regular + ${summary.finalsGames} finals).</p>
      <table>
        <thead>
          <tr>
            <th>Player</th>
            <th>Slot</th>
            <th>G</th>
            <th>Tries</th>
            <th>Goals</th>
            <th>G%</th>
            <th>FG</th>
            <th>2FG</th>
            <th>Pts</th>
            <th>Tackles</th>
            <th>Run m</th>
            <th>MVP</th>
          </tr>
        </thead>
        <tbody>
          ${rows.map((row) => `
            <tr>
              <td>${escapeHTML(row.name)}${row.isImmortal ? ` <span class="inline-immortal">Immortal</span>` : ""}${row.isGoalKicker ? ` <span class="inline-goal-kicker">GK</span>` : ""}</td>
              <td>${escapeHTML(row.slotLabel)}</td>
              <td>${row.games}</td>
              <td>${row.tries}</td>
              <td>${row.goals}</td>
              <td>${formatGoalPercentage(row)}</td>
              <td>${row.fieldGoals}</td>
              <td>${row.twoPointFieldGoals}</td>
              <td>${row.points}</td>
              <td>${formatNumber(row.tackles)}</td>
              <td>${formatNumber(row.runMetres)}</td>
              <td>${row.mvpVotes}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function renderLadderTable() {
  return `
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Pos</th>
            <th>Team</th>
            <th>P</th>
            <th>W</th>
            <th>L</th>
            <th>Pts</th>
            <th>For</th>
            <th>Agst</th>
            <th>Diff</th>
          </tr>
        </thead>
        <tbody>
          ${state.seasonResult.ladder.map((row, index) => `
            <tr>
              <td>${index + 1}</td>
              <td>${row.id === "user" ? `<b>${renderTeamName("NRL Invincible", { compact: true })}</b>` : renderTeamName(row.name, { compact: true })}</td>
              <td>${row.played}</td>
              <td>${row.wins}</td>
              <td>${row.losses}</td>
              <td>${row.points}</td>
              <td>${row.for}</td>
              <td>${row.against}</td>
              <td>${formatSigned(row.diff)}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function renderMatchResultsTable() {
  return `
    <div class="table-wrap">
      <table class="compact-table">
        <thead>
          <tr>
            <th>Game</th>
            <th>Stage</th>
            <th>Weather</th>
            <th>Opponent</th>
            <th>Score</th>
            <th>Result</th>
            <th>Try Scorers</th>
          </tr>
        </thead>
        <tbody>
          ${state.seasonResult.allResults.map((row, index) => `
            <tr>
              <td>${index + 1}</td>
              <td>${escapeHTML(row.stage)}</td>
              <td>${escapeHTML(row.weather?.label || "Dry")}</td>
              <td>${renderTeamName(row.opponent, { compact: true })}</td>
              <td>${row.userScore}-${row.oppScore}</td>
              <td class="${resultClass(row)}">${row.result}</td>
              <td class="scorer-cell">${escapeHTML(formatTryScorers(row.tryScorers))}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function renderFinalsTable() {
  return `
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Stage</th>
            <th>Match</th>
            <th>Score</th>
            <th>Winner</th>
          </tr>
        </thead>
        <tbody>
          ${state.seasonResult.finals.map((row) => `
            <tr>
              <td>${escapeHTML(row.stage)}</td>
              <td>${renderTeamName(row.teamA, { compact: true })} v ${renderTeamName(row.teamB, { compact: true })}</td>
              <td>${row.scoreA}-${row.scoreB}</td>
              <td>${row.winnerId === "user" ? `<b>${renderTeamName("NRL Invincible", { compact: true })}</b>` : renderTeamName(row.winner, { compact: true })}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function bindEvents() {
  app.querySelectorAll("[data-action]").forEach((element) => {
    element.addEventListener("click", handleAction);
  });
}

function handleAction(event) {
  const target = event.currentTarget;
  const action = target.dataset.action;

  if (action === "spin") spinOffer();
  if (action === "reroll") rerollOffer();
  if (action === "draft") draftPlayer(target.dataset.playerId, Number(target.dataset.slotIndex));
  if (action === "speech") chooseGrandFinalSpeech(target.dataset.speech);
  if (action === "simulate") simulateSeason();
  if (action === "reset") resetGame();
  if (action === "set-mode") setRatingMode(target.dataset.mode);
  if (action === "set-style") setPlayStyle(target.dataset.style);
  if (action === "set-goal-kicker") setGoalKicker(target.dataset.playerId);
  if (action === "tab") setResultTab(target.dataset.tab);
  if (action === "copy-summary") copySummary();
  if (action === "copy-image") copySnapshotImage();
  if (action === "download-image") downloadSnapshotImage();
}

function setRatingMode(mode) {
  if (state.drafted.length > 0) return;
  state.ratingMode = mode === "career" ? "career" : "season";
  state.currentOffer = null;
  render();
}

function setPlayStyle(style) {
  if (!PLAY_STYLES[style] || state.phase === "results") return;
  state.playStyle = style;
  render();
}

function setGoalKicker(playerId) {
  if (!isDraftComplete() || state.phase !== "draft") return;
  if (!getGoalKickerCandidates().some((pick) => pick.id === playerId)) return;
  state.goalKickerId = playerId;
  render();
}

function setResultTab(tab) {
  state.activeResultTab = tab;
  render();
}

function spinOffer() {
  if (isDraftComplete()) return;
  const groups = getEligibleGroups();

  if (!groups.length) {
    toast("No eligible players remain in the seed data for your open slots.");
    return;
  }

  const group = randomItem(groups);
  const immortalOffer = rollImmortalOffer(group);
  const groupSquad = immortalOffer ? [...group.squad, immortalOffer] : group.squad;
  const squad = groupSquad
    .map((candidate) => ({
      candidate,
      availability: getPlayerAvailability(candidate),
      rating: getEffectiveRatings(candidate).overall,
      fitCount: getAvailableSlotsForPlayer(candidate).length
    }))
    .sort((a, b) => b.rating - a.rating || Number(b.availability.canPick) - Number(a.availability.canPick) || b.fitCount - a.fitCount || a.candidate.name.localeCompare(b.candidate.name))
    .map((item) => item.candidate);

  state.currentOffer = {
    club: group.club,
    season: group.season,
    squad,
    eligibleCount: squad.filter((candidate) => getPlayerAvailability(candidate).canPick).length
  };
  render();
  scrollToTopRatedPlayer();
}

function rerollOffer() {
  if (!state.currentOffer || state.rerollUsed || isDraftComplete()) return;
  state.rerollUsed = true;
  state.currentOffer = null;
  spinOffer();
}

function draftPlayer(playerId, slotIndex) {
  if (!state.currentOffer) return;
  const candidate = state.currentOffer.squad.find((item) => item.id === playerId);
  if (!candidate) return;

  const slot = SLOT_ORDER[slotIndex];
  if (!slot || getPickForSlot(slotIndex)) return;
  const availableSlot = getAvailableSlotsForPlayer(candidate).find((item) => item.index === slotIndex);
  if (!availableSlot) return;

  const effectiveRatings = getEffectiveRatings(candidate);
  const fittedRatings = applyPositionFitToRatings(effectiveRatings, availableSlot.fit);
  const seasonRoll = rollSeasonRatings(fittedRatings);

  state.drafted.push({
    ...candidate,
    slotIndex,
    slotKey: slot.key,
    slotLabel: slot.label,
    effectiveRatings,
    fittedRatings,
    seasonRatings: seasonRoll.ratings,
    formDelta: seasonRoll.delta,
    fit: availableSlot.fit
  });
  state.lockedCareers.add(candidate.careerId);
  state.currentOffer = null;
  if (isDraftComplete()) {
    state.goalKickerId = getGoalKickerCandidates()[0]?.id || null;
  }
  render();
  scrollToSelectedXiii();
}

function resetGame() {
  activeRevealToken += 1;
  if (pendingSpeechResolve) {
    pendingSpeechResolve(null);
  }
  state.phase = "draft";
  state.ratingMode = "career";
  state.playStyle = "balanced";
  state.drafted = [];
  state.goalKickerId = null;
  state.lockedCareers = new Set();
  state.rerollUsed = false;
  state.currentOffer = null;
  state.activeResultTab = "players";
  state.simulationReveal = null;
  state.pendingSpeech = null;
  state.seasonResult = null;
  pendingSpeechResolve = null;
  render();
}

function isDraftComplete() {
  return state.drafted.length >= SLOT_ORDER.length;
}

function getCurrentSlot() {
  return getOpenSlots()[0] || SLOT_ORDER[SLOT_ORDER.length - 1];
}

function getOpenSlots() {
  const filled = new Set(state.drafted.map((pick) => pick.slotIndex));
  return SLOT_ORDER
    .map((slot, index) => ({ ...slot, index }))
    .filter((slot) => !filled.has(slot.index));
}

function getPickForSlot(index) {
  return state.drafted.find((pick) => pick.slotIndex === index);
}

function getGoalKickerCandidates() {
  return [...state.drafted]
    .sort((a, b) => goalKickerScore(b) - goalKickerScore(a) || getSimulationRatings(b).goalKicking - getSimulationRatings(a).goalKicking || a.name.localeCompare(b.name))
    .slice(0, 5);
}

function goalKickerScore(pick) {
  const ratings = getSimulationRatings(pick);
  return ratings.goalKicking * 0.74 + ratings.kicking * 0.26;
}

function getSelectedGoalKicker() {
  const selected = state.drafted.find((pick) => pick.id === state.goalKickerId);
  if (selected) return selected;
  return getGoalKickerCandidates()[0] || null;
}

function isSelectedGoalKicker(pick) {
  return Boolean(isDraftComplete() && pick && getSelectedGoalKicker()?.id === pick.id);
}

function getEligibleGroups() {
  const grouped = new Map();

  for (const item of PLAYER_SEASONS) {
    const key = `${item.season}-${item.club}`;
    if (!grouped.has(key)) {
      grouped.set(key, { season: item.season, club: item.club, squad: [] });
    }
    grouped.get(key).squad.push(item);
  }

  return [...grouped.values()].filter((group) =>
    group.squad.some((item) => getAvailableSlotsForPlayer(item).length)
  );
}

function getAvailableSeasonCount() {
  return getEligibleGroups().length;
}

function getPlayerAvailability(candidate) {
  if (state.lockedCareers.has(candidate.careerId)) {
    return { canPick: false, label: "Already Drafted" };
  }

  const slots = getAvailableSlotsForPlayer(candidate);
  if (!slots.length) {
    return { canPick: false, label: "No Open Fit" };
  }

  return { canPick: true, label: "Choose Slot" };
}

function getAvailableSlotsForPlayer(candidate) {
  if (state.lockedCareers.has(candidate.careerId)) return [];
  const effectivePositions = getEffectivePositions(candidate);

  return getOpenSlots()
    .filter((slot) => effectivePositions.includes(slot.key))
    .map((slot) => ({
      ...slot,
      fit: getPositionFit(candidate, slot.key)
    }))
    .sort((a, b) => b.fit.multiplier - a.fit.multiplier || a.index - b.index);
}

function getPositionFit(candidate, slotKey) {
  if (candidate.positions[0] === slotKey) {
    return { level: "natural", label: "Natural", multiplier: 1 };
  }

  if (candidate.positions.includes(slotKey)) {
    return { level: "secondary", label: "Secondary", multiplier: 0.94 };
  }

  return { level: "cover", label: "Cover", multiplier: 0.86 };
}

function applyPositionFitToRatings(ratings, fit) {
  const multiplier = fit.multiplier;
  const maxRating = ratings.overall >= 100 ? 100 : 99;
  const adjust = (value, severity = 1) => clamp(Math.round(value - (100 - value) * 0.04 - (1 - multiplier) * 100 * severity), 42, maxRating);

  return {
    overall: adjust(ratings.overall, 1.05),
    attack: adjust(ratings.attack, 0.92),
    defence: adjust(ratings.defence, 1),
    workrate: adjust(ratings.workrate, 0.82),
    kicking: adjust(ratings.kicking, fit.level === "cover" ? 1.15 : 0.8),
    goalKicking: ratings.goalKicking,
    bigGame: adjust(ratings.bigGame, 0.7)
  };
}

function getEffectivePositions(candidate) {
  return normalizePositions(candidate.positions || []);
}

function getEffectiveRatings(candidate) {
  const profile = careerProfiles.get(candidate.careerId);
  const source = state.ratingMode === "career" && profile ? profile.peakRatings : candidate.ratings;
  const ratings = spreadRatings(source);
  return state.ratingMode === "career" ? applyCareerRatingCalibration(candidate, ratings) : ratings;
}

function spreadRatings(ratingSet) {
  const spread = (value) => (value >= 100 ? 100 : clamp(Math.round(80 + (value - 82) * 1.42), 48, 99));

  return {
    overall: spread(ratingSet.overall),
    attack: spread(ratingSet.attack),
    defence: spread(ratingSet.defence),
    workrate: spread(ratingSet.workrate),
    kicking: spread(ratingSet.kicking),
    goalKicking: spread(ratingSet.goalKicking),
    bigGame: spread(ratingSet.bigGame)
  };
}

function getCareerOverall(candidate, career) {
  return CAREER_RATING_CALIBRATION[candidate.careerId] || career.peakOverall;
}

function applyCareerRatingCalibration(candidate, ratings) {
  const targetOverall = CAREER_RATING_CALIBRATION[candidate.careerId];
  if (!targetOverall || ratings.overall >= 100) {
    return ratings;
  }

  const delta = targetOverall - ratings.overall;
  if (delta === 0) {
    return { ...ratings, overall: targetOverall };
  }

  const profile = careerProfiles.get(candidate.careerId);
  const positions = profile?.positions || candidate.positions || [];
  const isPlaymaker = positions.some((position) => SPINE_POSITIONS.includes(position));
  const adjust = (key, weight) => clamp(Math.round(ratings[key] + delta * weight), 45, 99);

  return {
    ...ratings,
    overall: targetOverall,
    attack: adjust("attack", 0.85),
    defence: adjust("defence", 0.85),
    workrate: adjust("workrate", 0.85),
    kicking: isPlaymaker ? adjust("kicking", 0.45) : ratings.kicking,
    goalKicking: ratings.goalKicking,
    bigGame: adjust("bigGame", 0.9)
  };
}

function rollSeasonRatings(baseRatings) {
  const formDelta = clamp(Math.round(randomNormal() * 6.5 + (baseRatings.overall - 84) * 0.08), -15, 15);
  const adjusted = {};
  const maxRating = baseRatings.overall >= 100 ? 100 : 99;

  for (const [key, value] of Object.entries(baseRatings)) {
    const attributeNoise = key === "overall" ? 0 : randomNormal() * 2.2;
    adjusted[key] = clamp(Math.round(value + formDelta + attributeNoise), 45, maxRating);
  }

  adjusted.overall = Math.round((adjusted.attack + adjusted.defence + adjusted.workrate + adjusted.kicking + adjusted.bigGame) / 5);
  return { ratings: adjusted, delta: formDelta };
}

function ratingClass(value) {
  if (value >= 100) return "rating-immortal";
  if (value >= 90) return "rating-red";
  if (value >= 85) return "rating-orange";
  if (value >= 80) return "rating-yellow";
  if (value >= 75) return "rating-green";
  if (value >= 70) return "rating-blue";
  return "rating-grey";
}

function calculateTeamRatings() {
  if (!state.drafted.length) {
    return {
      overall: 0,
      attack: 0,
      defence: 0,
      power: 0,
      clutch: 0,
      goalSkill: 0,
      spine: 0,
      spineAttack: 0,
      spineKicking: 0,
      spineClutch: 0,
      spineImpact: 0,
      backs: 0,
      pack: 0,
      weakLink: 0,
      fitScore: 0,
      secondaryPicks: 0,
      eliteCount: 0,
      volatility: 0,
      balanceGap: 0
    };
  }

  const picks = state.drafted;
  const avg = (key, items = picks) => {
    const source = items.length ? items : picks;
    return Math.round(source.reduce((sum, item) => sum + getSimulationRatings(item)[key], 0) / source.length);
  };
  const avgOverall = (items = picks) => {
    const source = items.length ? items : picks;
    return Math.round(source.reduce((sum, item) => sum + getSimulationRatings(item).overall, 0) / source.length);
  };
  const spine = picks.filter((item) => SPINE_POSITIONS.includes(item.slotKey));
  const backs = picks.filter((item) => ["fullback", "wing", "centre", "half"].includes(item.slotKey));
  const forwards = picks.filter((item) => ["edge", "middle", "lock", "hooker"].includes(item.slotKey));
  const middles = picks.filter((item) => ["middle", "lock"].includes(item.slotKey));
  const sortedOverall = picks.map((item) => getSimulationRatings(item).overall).sort((a, b) => a - b);
  const bottomThree = sortedOverall.slice(0, Math.min(3, sortedOverall.length));
  const fitScore = Math.round(picks.reduce((sum, item) => sum + (item.fit?.multiplier || 1), 0) / picks.length * 100);
  const secondaryPicks = picks.filter((item) => item.fit?.level && item.fit.level !== "natural").length;
  const eliteCount = sortedOverall.filter((value) => value >= 90).length;
  const volatility = Math.round(picks.reduce((sum, item) => sum + Math.abs(item.formDelta || 0), 0) / picks.length);

  const spineOverall = avgOverall(spine);
  const spineAttack = avg("attack", spine);
  const spineKicking = avg("kicking", spine);
  const spineClutch = Math.round(avg("bigGame", spine) * 0.56 + spineOverall * 0.24 + spineKicking * 0.2);
  const spineImpact = Math.round(spineOverall * 0.34 + spineAttack * 0.2 + spineKicking * 0.18 + spineClutch * 0.28);
  const attack = Math.round(avg("attack") * 0.56 + spineAttack * 0.24 + spineKicking * 0.1 + avg("attack", backs) * 0.1);
  const defence = Math.round(avg("defence") * 0.72 + avg("defence", forwards) * 0.22 + avg("workrate", forwards) * 0.06);
  const power = Math.round(avg("workrate") * 0.46 + avg("attack", middles.length ? middles : forwards) * 0.26 + avg("defence", forwards) * 0.28);
  const clutch = Math.round(avg("bigGame") * 0.62 + avg("bigGame", spine) * 0.2 + spineOverall * 0.08 + spineKicking * 0.1);
  const goalKicker = getSelectedGoalKicker();
  const goalSkill = goalKicker ? getSimulationRatings(goalKicker).goalKicking : Math.max(...picks.map((item) => getSimulationRatings(item).goalKicking));
  const weakLink = Math.round(bottomThree.reduce((sum, value) => sum + value, 0) / bottomThree.length);
  const weakLinkPenalty = Math.max(0, 83 - weakLink) * 0.18;
  const fitAdjustment = (fitScore - 96) * 0.06;
  const balanceGap = Math.max(attack, defence, power) - Math.min(attack, defence, power);
  const overall = clamp(Math.round((attack + defence + power + clutch) / 4 + fitAdjustment - weakLinkPenalty), 1, 100);

  return {
    overall,
    attack,
    defence,
    power,
    clutch,
    goalSkill,
    spine: spineOverall,
    spineAttack,
    spineKicking,
    spineClutch,
    spineImpact,
    backs: avgOverall(backs),
    pack: avgOverall(forwards),
    weakLink,
    fitScore,
    secondaryPicks,
    eliteCount,
    volatility,
    balanceGap
  };
}

function getSimulationRatings(pick) {
  return pick.seasonRatings || pick.effectiveRatings || pick.ratings;
}

function applyPlayStyle(teamRatings, playStyle) {
  const style = PLAY_STYLES[playStyle] || PLAY_STYLES.balanced;
  const forwardBase = Math.round((teamRatings.defence + teamRatings.power) / 2);
  const attackEdge = Math.max(0, teamRatings.attack - forwardBase);
  const defenceEdge = Math.max(0, forwardBase - teamRatings.attack);
  const balanceGap = teamRatings.balanceGap ?? Math.max(teamRatings.attack, teamRatings.defence, teamRatings.power) - Math.min(teamRatings.attack, teamRatings.defence, teamRatings.power);
  const styleFit = calculateStyleFit(teamRatings, playStyle);
  const positiveFit = Math.max(0, styleFit);
  const negativeFit = Math.min(0, styleFit);
  const balanceBonus = playStyle === "balanced" ? Math.max(0, 3.5 - balanceGap * 0.32) : 0;
  const attackSynergy = playStyle === "attacking" ? Math.min(6, attackEdge * 0.28 + positiveFit * 0.45) : 0;
  const defenceSynergy = playStyle === "defensive" ? Math.min(6, defenceEdge * 0.28 + positiveFit * 0.45) : 0;
  const attack = clamp(Math.round(teamRatings.attack + style.attack + attackSynergy + balanceBonus + negativeFit * 0.25), 1, 100);
  const defence = clamp(Math.round(teamRatings.defence + style.defence + defenceSynergy + balanceBonus + negativeFit * 0.25), 1, 100);
  const power = clamp(Math.round(teamRatings.power + style.power + defenceSynergy * 0.35 + balanceBonus + negativeFit * 0.15), 1, 100);
  const clutch = clamp(Math.round(teamRatings.clutch + style.clutch + (attackSynergy + defenceSynergy + balanceBonus + positiveFit) * 0.22), 1, 100);
  const overall = clamp(Math.round((attack + defence + power + clutch) / 4 + styleFit * 0.22), 1, 100);

  return {
    ...teamRatings,
    overall,
    attack,
    defence,
    power,
    clutch,
    tempo: style.tempo,
    styleSynergy: styleFit,
    styleKey: playStyle,
    styleLabel: style.label
  };
}

function calculateStyleFit(teamRatings, playStyle) {
  const balanceGap = teamRatings.balanceGap ?? 0;
  const fitDrag = Math.max(0, 96 - (teamRatings.fitScore || 96)) * 0.08 + (teamRatings.secondaryPicks || 0) * 0.16;
  const weakDrag = Math.max(0, 84 - (teamRatings.weakLink || 84)) * 0.11;
  let raw = 0;

  if (playStyle === "attacking") {
    raw =
      (teamRatings.attack - teamRatings.defence) * 0.24 +
      (teamRatings.spine - teamRatings.pack) * 0.15 +
      (teamRatings.backs - 83) * 0.06 +
      (teamRatings.goalSkill - 82) * 0.035 -
      Math.max(0, 84 - teamRatings.defence) * 0.18 -
      fitDrag * 0.6;
  } else if (playStyle === "defensive") {
    raw =
      (teamRatings.defence - teamRatings.attack) * 0.24 +
      (teamRatings.pack - teamRatings.spine) * 0.13 +
      (teamRatings.power - 83) * 0.08 -
      Math.max(0, 81 - teamRatings.attack) * 0.16 -
      weakDrag * 0.5;
  } else {
    raw =
      2.2 -
      balanceGap * 0.22 +
      Math.max(0, (teamRatings.fitScore || 96) - 94) * 0.08 +
      Math.max(0, (teamRatings.weakLink || 84) - 82) * 0.04 -
      Math.max(0, balanceGap - 12) * 0.08;
  }

  return clamp(Math.round(raw * 10) / 10, -5, 7);
}

function getStrategyAdvice() {
  const predictions = Object.fromEntries(
    Object.keys(PLAY_STYLES).map((styleKey) => [styleKey, predictSeasonOutcome(styleKey)])
  );
  const bestStyle = Object.entries(predictions)
    .sort((a, b) => b[1].score - a[1].score || b[1].points - a[1].points || a[0].localeCompare(b[0]))[0]?.[0] || "balanced";
  const best = predictions[bestStyle];

  return {
    bestStyle,
    predictions,
    summary: `Scout pick: ${PLAY_STYLES[bestStyle].label}. ${strategyReason(bestStyle, best.teamRatings)} Projected ${best.points} pts, ${best.finishLabel.toLowerCase()}.`
  };
}

function strategyReason(styleKey, ratings) {
  if (styleKey === "attacking") {
    return ratings.spine >= ratings.pack + 3
      ? "Spine and strike players should carry the side."
      : "Attack rates as the clearest edge.";
  }

  if (styleKey === "defensive") {
    return ratings.pack >= ratings.spine + 2
      ? "Pack and defence are the strongest base."
      : "Defence gives this XIII the best floor.";
  }

  return ratings.balanceGap <= 6
    ? "The squad is well balanced across attack, defence and power."
    : "Balanced limits the weak spots better than chasing upside.";
}

function predictSeasonOutcome(playStyle = state.playStyle) {
  const baseRatings = calculateTeamRatings();
  const styled = applyPlayStyle(baseRatings, playStyle);
  const leagueAverage = getLeagueAverageRating();
  const weakLinkPenalty = Math.max(0, 84 - styled.weakLink) * 0.2;
  const fitAdjustment = (styled.fitScore - 96) * 0.08;
  const volatilityPenalty = Math.max(0, styled.volatility - 5) * 0.16;
  const styleAdjustment = styled.styleSynergy * 0.45;
  const imbalancePenalty = Math.max(0, styled.balanceGap - 11) * 0.09;
  const eliteBonus = Math.min(1.5, styled.eliteCount * 0.16);
  const goalBonus = clamp((styled.goalSkill - 82) * 0.055, -0.5, 0.9);
  const expectedWinsRaw =
    12 +
    (styled.overall - leagueAverage) * 0.54 +
    (styled.clutch - leagueAverage) * 0.12 +
    styleAdjustment +
    fitAdjustment +
    eliteBonus +
    goalBonus -
    weakLinkPenalty -
    volatilityPenalty -
    imbalancePenalty;
  const eliteCeiling = styled.eliteCount >= 12 && styled.weakLink >= 90 && styled.fitScore >= 98;
  const styleCeiling = styled.styleSynergy >= 2.5 && styled.weakLink >= 84 && styled.overall >= 90;
  const mismatchCap = styled.styleSynergy <= -1.5 ? 20 : 21;
  const expectedWinsCap = eliteCeiling || styleCeiling ? mismatchCap : Math.min(20, mismatchCap);
  const expectedWins = clamp(Math.round(expectedWinsRaw), 4, expectedWinsCap);
  const points = expectedWins * 2;
  const position = predictedLadderPosition(points, styled);
  const finalsForecast = predictFinalsForecast(position, styled.clutch, styled.overall, styled.styleSynergy);
  const rangeWidth = clamp(Math.round(1.2 + styled.volatility * 0.2 + styled.secondaryPicks * 0.18 + Math.max(0, 86 - styled.weakLink) * 0.11 + styled.balanceGap * 0.06), 2, 5);
  const rangeCeiling = eliteCeiling || styleCeiling ? 23 : 22;
  const winRange = [Math.max(0, expectedWins - rangeWidth), Math.min(rangeCeiling, expectedWins + rangeWidth)];
  const ceilingWins = winRange[1] + (styled.clutch >= 90 ? 1 : 0);
  const ceiling = ceilingWins >= 20 && styled.overall >= 88 ? "Premiership" : ceilingWins >= 18 ? "Grand Final" : ceilingWins >= 14 ? "Finals run" : "Late charge";
  const risk = predictionRiskLabel(styled, playStyle, rangeWidth);

  return {
    styleKey: playStyle,
    teamRatings: styled,
    score: expectedWinsRaw * 2 + styled.overall * 0.12 + styled.clutch * 0.08 + styled.styleSynergy * 0.9 - rangeWidth * 0.4,
    wins: expectedWins,
    expectedWinsRaw,
    winRange,
    points,
    position,
    finishLabel: `${ordinal(position)} predicted`,
    finalsForecast,
    ceiling,
    risk,
    shortLabel: `${points} pts | ${ordinal(position)}`
  };
}

function getLeagueAverageRating() {
  const ratings = OPPONENTS.map((team) => Math.round((team.attack + team.defence + team.power + team.clutch) / 4));
  return ratings.reduce((sum, value) => sum + value, 0) / ratings.length;
}

function predictedLadderPosition(points, overall) {
  const rating = typeof overall === "number" ? overall : overall.overall;
  const clutch = typeof overall === "number" ? overall : overall.clutch;
  const tiebreak = (rating - 84) * 0.55 + (clutch - 84) * 0.18;
  const adjusted = points + tiebreak;

  if (adjusted >= 40) return 1;
  if (adjusted >= 37) return 2;
  if (adjusted >= 35) return 3;
  if (adjusted >= 33) return 4;
  if (adjusted >= 31) return 5;
  if (adjusted >= 29) return 6;
  if (adjusted >= 27) return 7;
  if (adjusted >= 25) return 8;
  if (adjusted >= 23) return 9;
  if (adjusted >= 21) return 10;
  if (adjusted >= 19) return 12;
  if (adjusted >= 16) return 14;
  return 16;
}

function predictFinalsForecast(position, clutch, overall, styleSynergy = 0) {
  if (position <= 2 && clutch >= 90 && overall >= 88) return styleSynergy >= 3 ? "Premiership favourite" : "Premiership contender";
  if (position <= 4) return overall >= 88 ? "Preliminary final quality" : "Top-four finals shot";
  if (position <= 8) return clutch >= 87 ? "Dangerous finalist" : "Finals appearance";
  if (position <= 10) return "Bubble team";
  return "Unlikely finals run";
}

function predictionRiskLabel(styled, playStyle, rangeWidth) {
  if (styled.weakLink < 80) return "Weak links";
  if (styled.fitScore < 94) return "Fit risk";
  if (styled.defence < 80 || (playStyle === "attacking" && styled.defence < 84)) return "Leaky defence";
  if (styled.attack < 80 || (playStyle === "defensive" && styled.attack < 83)) return "Scoring squeeze";
  if (styled.power < 80) return "Soft middle";
  if (rangeWidth >= 5 || styled.volatility >= 8) return "High variance";
  if (Math.abs(styled.attack - styled.defence) > 11) return "Style dependent";
  return "Balanced";
}

function simulateSeason() {
  if (!isDraftComplete()) return;

  const prediction = predictSeasonOutcome(state.playStyle);
  const teamRatings = prediction.teamRatings;
  const userTeam = {
    id: "user",
    name: "NRL Invincible",
    attack: teamRatings.attack,
    defence: teamRatings.defence,
    power: teamRatings.power,
    clutch: teamRatings.clutch,
    goalSkill: teamRatings.goalSkill,
    kicking: teamRatings.spineKicking,
    spineImpact: teamRatings.spineImpact,
    spineKicking: teamRatings.spineKicking,
    spineClutch: teamRatings.spineClutch,
    tempo: teamRatings.tempo
  };

  const teams = [userTeam, ...OPPONENTS.map((team) => applyOpponentImmortal({ ...team }, IMMORTAL_OPPONENT_CHANCE))];
  const teamMap = new Map(teams.map((team) => [team.id, team]));
  const ladderMap = new Map(teams.map((team) => [team.id, createLadderRow(team)]));
  const playerStats = createPlayerStats();
  const schedule = createSchedule(teams.map((team) => team.id), 24);
  const regularResults = [];

  for (const fixture of schedule) {
    const teamA = teamMap.get(fixture.a);
    const teamB = teamMap.get(fixture.b);
    const weather = chooseWeather(false);
    const match = playMatch(teamA, teamB, false, weather);

    updateLadder(ladderMap.get(teamA.id), match.scoreA, match.scoreB);
    updateLadder(ladderMap.get(teamB.id), match.scoreB, match.scoreA);

    if (teamA.id === "user" || teamB.id === "user") {
      const userIsA = teamA.id === "user";
      const userScore = userIsA ? match.scoreA : match.scoreB;
      const oppScore = userIsA ? match.scoreB : match.scoreA;
      const opponent = userIsA ? teamB.name : teamA.name;
      const round = regularResults.length + 1;

      const scorers = recordUserStats(playerStats, userIsA ? match.detailsA : match.detailsB, userScore > oppScore);
      regularResults.push({
        stage: `Round ${round}`,
        weather,
        opponent,
        userScore,
        oppScore,
        result: userScore > oppScore ? "W" : "L",
        tryScorers: scorers.tryScorers,
        fieldGoalScorers: scorers.fieldGoalScorers,
        twoPointFieldGoalScorers: scorers.twoPointFieldGoalScorers
      });
    }
  }

  let ladder = [...ladderMap.values()].sort(sortLadder);
  ladder = ladder.map((row, index) => ({ ...row, position: index + 1 }));

  const finals = simulateFinals(ladder, teamMap, playerStats);
  const userLadderRow = ladder.find((row) => row.id === "user");
  const allResults = [
    ...regularResults,
    ...finals
      .filter((row) => row.isUserGame)
      .map(finalToUserResult)
  ];
  const leaders = calculateLeaders(playerStats);
  const summary = createSummary(userLadderRow, finals, regularResults, prediction);

  const seasonResult = {
    teamRatings,
    prediction,
    ladder,
    regularResults,
    allResults,
    finals,
    playerStats,
    leaders,
    summary
  };

  startSimulationReveal(seasonResult);
}

async function startSimulationReveal(seasonResult) {
  const token = ++activeRevealToken;
  state.phase = "simulating";
  state.activeResultTab = "results";
  state.seasonResult = seasonResult;
  state.simulationReveal = {
    games: seasonResult.allResults,
    completedGames: [],
    currentGame: null
  };
  render();
  scrollToLiveGames();

  await delay(450);

  for (const game of seasonResult.allResults) {
    if (token !== activeRevealToken) return;
    if (game.pendingSpeech) {
      state.pendingSpeech = game.speech;
      render();
      scrollToLiveGames();
      const speechKey = await waitForGrandFinalSpeech(token);
      if (token !== activeRevealToken || !speechKey) return;
      const resolvedGame = resolvePendingGrandFinal(seasonResult, game, speechKey);
      state.pendingSpeech = null;
      state.simulationReveal.currentGame = resolvedGame;
      render();
      await delay(revealDelay(resolvedGame));
      if (token !== activeRevealToken) return;
      state.simulationReveal.completedGames.push(resolvedGame);
      state.simulationReveal.currentGame = null;
      continue;
    }
    state.simulationReveal.currentGame = game;
    render();
    await delay(revealDelay(game));
    if (token !== activeRevealToken) return;
    state.simulationReveal.completedGames.push(game);
    state.simulationReveal.currentGame = null;
  }

  if (token !== activeRevealToken) return;
  state.phase = "results";
  state.simulationReveal = null;
  state.pendingSpeech = null;
  render();
  scrollToLiveGames();
}

function waitForGrandFinalSpeech(token) {
  return new Promise((resolve) => {
    pendingSpeechResolve = (choice) => {
      if (token !== activeRevealToken) {
        resolve(null);
        return;
      }
      pendingSpeechResolve = null;
      resolve(choice);
    };
  });
}

function chooseGrandFinalSpeech(choice) {
  if (!state.pendingSpeech || !pendingSpeechResolve) return;
  pendingSpeechResolve(choice);
}

function scrollToLiveGames() {
  if (!window.matchMedia?.("(max-width: 760px)").matches) return;

  window.setTimeout(() => {
    const panel = document.querySelector(".results-panel");
    if (!panel) return;
    const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    panel.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
  }, 50);
}

function scrollToSelectedXiii() {
  scrollToMobileTarget(".squad-panel", "start");
}

function scrollToTopRatedPlayer() {
  scrollToMobileTarget(".player-card:not(.unavailable)", "center");
}

function scrollToMobileTarget(selector, block = "start") {
  if (!window.matchMedia?.("(max-width: 760px)").matches) return;

  window.setTimeout(() => {
    const target = document.querySelector(selector);
    if (!target) return;
    const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    target.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block });
  }, 60);
}

function revealDelay(game) {
  if (game.stage === "Grand Final") return 1850;
  if (game.stage.includes("Final")) return 1350;
  return 950;
}

function delay(ms) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

function createLadderRow(team) {
  return {
    id: team.id,
    name: team.name,
    played: 0,
    wins: 0,
    losses: 0,
    points: 0,
    for: 0,
    against: 0,
    diff: 0
  };
}

function updateLadder(row, scored, conceded) {
  row.played += 1;
  row.for += scored;
  row.against += conceded;
  row.diff = row.for - row.against;

  if (scored > conceded) {
    row.wins += 1;
    row.points += 2;
  } else {
    row.losses += 1;
  }
}

function sortLadder(a, b) {
  return b.points - a.points || b.diff - a.diff || b.for - a.for || a.name.localeCompare(b.name);
}

function createSchedule(teamIds, gamesPerTeam) {
  for (let attempt = 0; attempt < 100; attempt += 1) {
    const counts = Object.fromEntries(teamIds.map((id) => [id, 0]));
    const pairCounts = new Map();
    const schedule = [];
    let guard = 0;

    while (Object.values(counts).some((count) => count < gamesPerTeam) && guard < 20000) {
      guard += 1;
      const available = shuffle([...teamIds].filter((id) => counts[id] < gamesPerTeam)).sort((a, b) => counts[a] - counts[b]);
      const a = available[0];
      let candidates = available.slice(1).filter((id) => counts[id] < gamesPerTeam);

      if (!a || !candidates.length) break;

      candidates = candidates
        .map((id) => ({ id, pairCount: getPairCount(pairCounts, a, id), count: counts[id], roll: Math.random() }))
        .sort((x, y) => x.pairCount - y.pairCount || x.count - y.count || x.roll - y.roll);

      const preferred = candidates.find((candidate) => candidate.pairCount < 2) || candidates[0];
      const b = preferred.id;

      schedule.push({ a, b });
      counts[a] += 1;
      counts[b] += 1;
      setPairCount(pairCounts, a, b, getPairCount(pairCounts, a, b) + 1);
    }

    if (teamIds.every((id) => counts[id] === gamesPerTeam)) {
      return shuffle(schedule);
    }
  }

  throw new Error("Unable to create a balanced schedule");
}

function getPairKey(a, b) {
  return [a, b].sort().join("::");
}

function getPairCount(pairCounts, a, b) {
  return pairCounts.get(getPairKey(a, b)) || 0;
}

function setPairCount(pairCounts, a, b, count) {
  pairCounts.set(getPairKey(a, b), count);
}

function playMatch(teamA, teamB, isFinal, weather = WEATHER_TYPES[0], options = {}) {
  const stage = options.stage || "";
  const stageBoost = isFinal ? 0.16 : 0.1;
  const tempoA = teamA.tempo || 1;
  const tempoB = teamB.tempo || 1;
  const matchTempo = ((tempoA + tempoB) / 2) * weather.tempo;
  const variance = (isFinal ? 4.2 : 4.9) * weather.variance;
  const attackDiffA = softRatingDiff(teamA.attack * weather.attack - teamB.defence * weather.defence);
  const attackDiffB = softRatingDiff(teamB.attack * weather.attack - teamA.defence * weather.defence);
  const powerDiffA = softRatingDiff(teamA.power - teamB.power);
  const powerDiffB = softRatingDiff(teamB.power - teamA.power);
  const clutchDiffA = softRatingDiff(teamA.clutch - teamB.clutch);
  const clutchDiffB = softRatingDiff(teamB.clutch - teamA.clutch);
  const spineBoostA = calculateSpineExpectedBoost(teamA, teamB, isFinal, weather, stage);
  const spineBoostB = calculateSpineExpectedBoost(teamB, teamA, isFinal, weather, stage);
  const expectedA = clamp(
    (20.5 + attackDiffA * 0.31 + powerDiffA * 0.12 + clutchDiffA * stageBoost + spineBoostA) * matchTempo + randomNormal() * variance,
    4,
    48
  );
  const expectedB = clamp(
    (20.5 + attackDiffB * 0.31 + powerDiffB * 0.12 + clutchDiffB * stageBoost + spineBoostB) * matchTempo + randomNormal() * variance,
    4,
    48
  );

  const detailsA = makeRugbyScore(expectedA, teamA.goalSkill * weather.kicking, weather);
  const detailsB = makeRugbyScore(expectedB, teamB.goalSkill * weather.kicking, weather);

  applySpineCloseGameInfluence(detailsA, detailsB, teamA, teamB, isFinal, weather, stage);
  applySituationalFieldGoals(detailsA, detailsB, teamA, teamB, isFinal, weather);

  if (options.scoreAdjustment) {
    const targetDetails = options.adjustTeamId === teamA.id ? detailsA : detailsB;
    applySpeechScoreAdjustment(targetDetails, options.scoreAdjustment);
  }

  preventOnePointScore(detailsA);
  preventOnePointScore(detailsB);

  if (detailsA.score === detailsB.score) {
    applyTiebreakingFieldGoal(detailsA, detailsB, teamA, teamB);
  }

  preventOnePointScore(detailsA);
  preventOnePointScore(detailsB);

  return {
    scoreA: detailsA.score,
    scoreB: detailsB.score,
    weather,
    detailsA,
    detailsB,
    winnerId: detailsA.score > detailsB.score ? teamA.id : teamB.id
  };
}

function softRatingDiff(diff) {
  return Math.tanh(diff / 16) * 16;
}

function getTeamSpineImpact(team) {
  if (typeof team.spineImpact === "number") return clamp(Math.round(team.spineImpact), 1, 100);

  const kicking = team.spineKicking || team.kicking || team.goalSkill || team.attack || 82;
  return clamp(Math.round((team.attack || 82) * 0.38 + (team.clutch || 82) * 0.38 + kicking * 0.24), 1, 100);
}

function getTeamSpineKicking(team) {
  return team.spineKicking || team.kicking || team.goalSkill || team.attack || 82;
}

function spineStageWeight(isFinal, stage = "") {
  if (!isFinal) return 0.62;
  if (stage === "Grand Final") return 1.48;
  if (stage === "Preliminary Final") return 1.28;
  return 1.12;
}

function calculateSpineExpectedBoost(team, opponent, isFinal, weather, stage = "") {
  const spine = getTeamSpineImpact(team);
  const opponentSpine = getTeamSpineImpact(opponent);
  const stageWeight = spineStageWeight(isFinal, stage);
  const weatherFactor = weather.key === "wet" ? 0.82 : weather.key === "windy" ? 0.9 : 1;
  const spineEdge = softRatingDiff(spine - opponentSpine);
  const eliteSpine = Math.max(0, spine - 88);
  const pressureRating = Math.max(0, (team.clutch || spine) - 86);
  const boost = (spineEdge * 0.045 + eliteSpine * 0.04 + pressureRating * 0.018) * stageWeight * weatherFactor;

  return clamp(boost, isFinal ? -2.1 : -1.1, isFinal ? 3.4 : 1.6);
}

function applySpineCloseGameInfluence(detailsA, detailsB, teamA, teamB, isFinal, weather, stage = "") {
  const margin = Math.abs(detailsA.score - detailsB.score);
  const maxMargin = isFinal ? 10 : 6;
  if (margin > maxMargin) return;

  const chanceA = spineMomentChance(teamA, teamB, margin, isFinal, weather, stage);
  const chanceB = spineMomentChance(teamB, teamA, margin, isFinal, weather, stage);
  const totalChance = clamp(chanceA + chanceB, 0, isFinal ? 0.42 : 0.2);
  if (Math.random() >= totalChance) return;

  if (Math.random() < chanceA / Math.max(0.001, chanceA + chanceB)) {
    applySpineMoment(detailsA, detailsB, teamA, isFinal, weather);
  } else {
    applySpineMoment(detailsB, detailsA, teamB, isFinal, weather);
  }
}

function spineMomentChance(team, opponent, margin, isFinal, weather, stage = "") {
  const spine = getTeamSpineImpact(team);
  const opponentSpine = getTeamSpineImpact(opponent);
  const stageWeight = spineStageWeight(isFinal, stage);
  const weatherFactor = weather.key === "wet" ? 0.82 : weather.key === "windy" ? 0.88 : 1;
  const closeBonus = margin <= 2 ? 0.06 : margin <= 6 ? 0.034 : 0.018;
  const base = isFinal ? 0.036 : 0.014;
  const eliteBonus = Math.max(0, spine - 84) * 0.0048;
  const edgeBonus = Math.max(0, spine - opponentSpine) * 0.0042;
  const clutchBonus = Math.max(0, (team.clutch || spine) - 86) * 0.0022;

  return clamp((base + closeBonus + eliteBonus + edgeBonus + clutchBonus) * stageWeight * weatherFactor, 0.002, isFinal ? 0.32 : 0.14);
}

function applySpineMoment(details, opponentDetails, team, isFinal, weather) {
  const margin = details.score - opponentDetails.score;
  const kicking = getTeamSpineKicking(team);
  const tryChance = margin < 0 ? 0.7 : isFinal ? 0.58 : 0.46;

  if (Math.random() < tryChance) {
    details.tries += 1;
    details.score += 4;
    const goalRate = clamp(0.54 + kicking / 285 + (weather.key === "windy" ? -0.08 : weather.key === "wet" ? -0.04 : 0), 0.42, 0.9);
    if (Math.random() < goalRate) {
      details.goals += 1;
      details.score += 2;
    }
    return;
  }

  details.penaltyGoals += 1;
  details.score += 2;
}

function chooseWeather(isFinal) {
  const roll = Math.random();
  const thresholds = isFinal
    ? [
        ["dry", 0.46],
        ["wet", 0.62],
        ["cold", 0.75],
        ["hot", 0.86],
        ["windy", 0.95],
        ["humid", 1]
      ]
    : [
        ["dry", 0.42],
        ["wet", 0.58],
        ["cold", 0.72],
        ["hot", 0.84],
        ["windy", 0.94],
        ["humid", 1]
      ];
  const key = thresholds.find(([, max]) => roll <= max)?.[0] || "dry";
  return WEATHER_TYPES.find((weather) => weather.key === key) || WEATHER_TYPES[0];
}

function makeRugbyScore(expected, goalSkill, weather = WEATHER_TYPES[0]) {
  const tries = clamp(Math.round(expected / 5.7 + randomNormal() * 1.25), 0, 9);
  const goalRate = clamp(0.56 + goalSkill / 260 + randomNormal() * 0.04, 0.42, 0.9);
  const goals = clamp(Math.round(tries * goalRate), 0, tries);
  const penaltyGoals = Math.random() < (weather.key === "wet" ? 0.34 : 0.26) ? randomInt(0, 2) : 0;
  const fieldGoals = 0;
  const twoPointFieldGoals = 0;
  const score = tries * 4 + goals * 2 + penaltyGoals * 2 + fieldGoals + twoPointFieldGoals * 2;

  return { tries, goals, penaltyGoals, fieldGoals, twoPointFieldGoals, score };
}

function applySituationalFieldGoals(detailsA, detailsB, teamA, teamB, isFinal, weather) {
  maybeTwoPointFieldGoal(detailsA, detailsB, teamA, isFinal, weather);
  maybeTwoPointFieldGoal(detailsB, detailsA, teamB, isFinal, weather);

  if (detailsA.score === detailsB.score) {
    applyTiebreakingFieldGoal(detailsA, detailsB, teamA, teamB);
    return;
  }

  maybeSevenPointFieldGoal(detailsA, detailsB, teamA, isFinal, weather);
  maybeSevenPointFieldGoal(detailsB, detailsA, teamB, isFinal, weather);
}

function maybeTwoPointFieldGoal(trailingDetails, leadingDetails, team, isFinal, weather) {
  if (leadingDetails.score - trailingDetails.score !== 2) return;
  const weatherFactor = weather.key === "windy" ? 0.42 : weather.key === "wet" ? 0.78 : 1;
  const kicking = getTeamSpineKicking(team);
  const chance = clamp((isFinal ? 0.026 : 0.014) * weatherFactor + Math.max(0, kicking - 86) * 0.0012 + Math.max(0, getTeamSpineImpact(team) - 88) * 0.0008, 0.004, 0.058);

  if (Math.random() >= chance) return;
  trailingDetails.twoPointFieldGoals += 1;
  trailingDetails.score += 2;
}

function maybeSevenPointFieldGoal(leadingDetails, trailingDetails, team, isFinal, weather) {
  if (leadingDetails.score - trailingDetails.score !== 6) return;
  const weatherFactor = weather.key === "windy" ? 0.58 : weather.key === "wet" ? 0.92 : 1;
  const chance = clamp((isFinal ? 0.09 : 0.052) * weatherFactor + Math.max(0, team.clutch - 86) * 0.0017 + Math.max(0, getTeamSpineImpact(team) - 86) * 0.0014, 0.018, 0.15);

  if (Math.random() >= chance) return;
  leadingDetails.fieldGoals += 1;
  leadingDetails.score += 1;
}

function applyTiebreakingFieldGoal(detailsA, detailsB, teamA, teamB) {
  const kickingA = getTeamSpineKicking(teamA);
  const kickingB = getTeamSpineKicking(teamB);
  const spineA = getTeamSpineImpact(teamA);
  const spineB = getTeamSpineImpact(teamB);
  const chanceA = clamp(0.5 + (teamA.clutch - teamB.clutch) / 150 + (kickingA - kickingB) / 260 + (spineA - spineB) / 210, 0.24, 0.76);
  const winnerDetails = Math.random() < chanceA ? detailsA : detailsB;

  if (winnerDetails.score === 0) {
    winnerDetails.penaltyGoals += 1;
    winnerDetails.score += 2;
    return;
  }

  winnerDetails.fieldGoals += 1;
  winnerDetails.score += 1;
}

function applySpeechScoreAdjustment(details, adjustment) {
  details.speechAdjustment = adjustment;
  details.score = Math.max(0, details.score + adjustment);
}

function preventOnePointScore(details) {
  if (details.score !== 1) return;
  details.score = 2;
  if (details.fieldGoals > 0) {
    details.fieldGoals -= 1;
    details.penaltyGoals += 1;
  }
}

function createPlayerStats() {
  const selectedGoalKicker = getSelectedGoalKicker();

  return state.drafted.map((pick) => ({
    id: pick.id,
    careerId: pick.careerId,
    name: pick.name,
    slotKey: pick.slotKey,
    slotLabel: pick.slotLabel,
    club: pick.club,
    season: pick.season,
    games: 0,
    tries: 0,
    goals: 0,
    goalAttempts: 0,
    fieldGoals: 0,
    twoPointFieldGoals: 0,
    points: 0,
    tackles: 0,
    runMetres: 0,
    mvpVotes: 0,
    ratings: getSimulationRatings(pick),
    baseRatings: pick.effectiveRatings,
    formDelta: pick.formDelta || 0,
    isImmortal: Boolean(pick.isImmortal),
    isGoalKicker: selectedGoalKicker?.id === pick.id
  }));
}

function recordUserStats(playerStats, scoreDetails, didWin) {
  const matchRows = playerStats.map((row) => {
    const tackles = Math.max(0, Math.round(baseTackles(row.slotKey) + (row.ratings.defence - 78) * 0.18 + (row.ratings.workrate - 82) * 0.2 + randomNormal() * 4));
    const metres = Math.max(8, Math.round(baseMetres(row.slotKey) * (0.84 + row.ratings.attack / 460 + row.ratings.workrate / 520) * randomBetween(0.76, 1.24)));

    row.games += 1;
    row.tackles += tackles;
    row.runMetres += metres;

    return { row, tackles, metres, tries: 0, goals: 0, fieldGoals: 0, twoPointFieldGoals: 0, score: 0 };
  });
  const tryScorers = [];
  const fieldGoalScorers = [];
  const twoPointFieldGoalScorers = [];

  for (let i = 0; i < scoreDetails.tries; i += 1) {
    const scorer = weightedPick(matchRows, (item) => tryWeight(item.row));
    scorer.tries += 1;
    scorer.row.tries += 1;
    scorer.row.points += 4;
    tryScorers.push(scorer.row.name);
  }

  const goalKicker = matchRows.find((item) => item.row.isGoalKicker) || [...matchRows].sort((a, b) => b.row.ratings.goalKicking - a.row.ratings.goalKicking || b.row.ratings.kicking - a.row.ratings.kicking)[0];
  const goalsMade = scoreDetails.goals + scoreDetails.penaltyGoals;
  const goalAttempts = scoreDetails.tries + scoreDetails.penaltyGoals;
  goalKicker.goals += goalsMade;
  goalKicker.row.goals += goalsMade;
  goalKicker.row.goalAttempts += goalAttempts;
  goalKicker.row.points += goalsMade * 2;

  const fieldKicker = [...matchRows].sort((a, b) => b.row.ratings.kicking - a.row.ratings.kicking)[0];
  fieldKicker.fieldGoals += scoreDetails.fieldGoals;
  fieldKicker.row.fieldGoals += scoreDetails.fieldGoals;
  fieldKicker.row.points += scoreDetails.fieldGoals;
  for (let i = 0; i < scoreDetails.fieldGoals; i += 1) {
    fieldGoalScorers.push(fieldKicker.row.name);
  }

  const twoPointFieldKicker = [...matchRows].sort((a, b) => b.row.ratings.kicking - a.row.ratings.kicking || b.row.ratings.bigGame - a.row.ratings.bigGame)[0];
  twoPointFieldKicker.twoPointFieldGoals += scoreDetails.twoPointFieldGoals;
  twoPointFieldKicker.row.twoPointFieldGoals += scoreDetails.twoPointFieldGoals;
  twoPointFieldKicker.row.points += scoreDetails.twoPointFieldGoals * 2;
  for (let i = 0; i < scoreDetails.twoPointFieldGoals; i += 1) {
    twoPointFieldGoalScorers.push(twoPointFieldKicker.row.name);
  }

  for (const item of matchRows) {
    item.score =
      item.tries * 7 +
      item.goals * 1.7 +
      item.fieldGoals * 2 +
      item.twoPointFieldGoals * 2.8 +
      item.tackles * tackleValue(item.row.slotKey) +
      item.metres * metreValue(item.row.slotKey) +
      item.row.ratings.bigGame * 0.035 +
      (didWin ? 1.1 : 0);
  }

  matchRows.sort((a, b) => b.score - a.score);
  if (matchRows[0]) matchRows[0].row.mvpVotes += 3;
  if (matchRows[1]) matchRows[1].row.mvpVotes += 2;
  if (matchRows[2]) matchRows[2].row.mvpVotes += 1;

  return {
    tryScorers,
    fieldGoalScorers,
    twoPointFieldGoalScorers
  };
}

function baseTackles(slotKey) {
  return {
    fullback: 5,
    wing: 4,
    centre: 9,
    half: 17,
    edge: 30,
    middle: 34,
    lock: 37,
    hooker: 41
  }[slotKey];
}

function baseMetres(slotKey) {
  return {
    fullback: 150,
    wing: 145,
    centre: 118,
    half: 74,
    edge: 105,
    middle: 128,
    lock: 116,
    hooker: 62
  }[slotKey];
}

function tryWeight(row) {
  const base = {
    fullback: 1.45,
    wing: 1.82,
    centre: 1.55,
    half: 0.82,
    edge: 0.92,
    middle: 0.54,
    lock: 0.72,
    hooker: 0.48
  }[row.slotKey];

  return base * (0.7 + row.ratings.attack / 100) * randomBetween(0.78, 1.22);
}

function tackleValue(slotKey) {
  return {
    fullback: 0.08,
    wing: 0.06,
    centre: 0.08,
    half: 0.1,
    edge: 0.13,
    middle: 0.13,
    lock: 0.14,
    hooker: 0.12
  }[slotKey];
}

function metreValue(slotKey) {
  return {
    fullback: 0.022,
    wing: 0.024,
    centre: 0.021,
    half: 0.016,
    edge: 0.019,
    middle: 0.018,
    lock: 0.019,
    hooker: 0.014
  }[slotKey];
}

function simulateFinals(ladder, teamMap, playerStats) {
  const userRow = ladder.find((row) => row.id === "user");
  const topEight = ladder.slice(0, 8).map((row) => teamMap.get(row.id));

  if (!userRow || userRow.position > 8) {
    return simulateNeutralFinals(topEight, teamMap, playerStats);
  }

  return simulateUserFinalsPath(ladder, teamMap, playerStats, userRow.position);
}

function playFinalMatch(finals, stage, teamA, teamB, playerStats) {
  const weather = chooseWeather(true);
  const match = playMatch(teamA, teamB, true, weather, { stage });
  const row = buildFinalRow(stage, teamA, teamB, match, weather, playerStats);

  finals.push(row);
  return {
    ...row,
    winnerTeam: match.winnerId === teamA.id ? teamA : teamB,
    loserTeam: match.winnerId === teamA.id ? teamB : teamA
  };
}

function buildFinalRow(stage, teamA, teamB, match, weather, playerStats) {
  const userInGame = teamA.id === "user" || teamB.id === "user";
  let scorers = { tryScorers: [], fieldGoalScorers: [], twoPointFieldGoalScorers: [] };

  if (userInGame) {
    const userIsA = teamA.id === "user";
    scorers = recordUserStats(playerStats, userIsA ? match.detailsA : match.detailsB, match.winnerId === "user");
  }

  return {
    stage,
    teamA: teamA.name,
    teamB: teamB.name,
    teamAId: teamA.id,
    teamBId: teamB.id,
    scoreA: match.scoreA,
    scoreB: match.scoreB,
    weather,
    opponent: userInGame ? (teamA.id === "user" ? teamB.name : teamA.name) : "",
    userScore: teamA.id === "user" ? match.scoreA : match.scoreB,
    oppScore: teamA.id === "user" ? match.scoreB : match.scoreA,
    result: userInGame ? (match.winnerId === "user" ? "W" : "L") : "",
    tryScorers: scorers.tryScorers,
    fieldGoalScorers: scorers.fieldGoalScorers,
    twoPointFieldGoalScorers: scorers.twoPointFieldGoalScorers,
    winnerId: match.winnerId,
    winner: match.winnerId === teamA.id ? teamA.name : teamB.name,
    loserId: match.winnerId === teamA.id ? teamB.id : teamA.id,
    loser: match.winnerId === teamA.id ? teamB.name : teamA.name,
    isUserGame: userInGame
  };
}

function createPendingGrandFinal(finals, teamA, teamB) {
  const userIsA = teamA.id === "user";
  const opponent = userIsA ? teamB.name : teamA.name;
  const row = {
    stage: "Grand Final",
    teamA: teamA.name,
    teamB: teamB.name,
    teamAId: teamA.id,
    teamBId: teamB.id,
    teamAData: teamA,
    teamBData: teamB,
    weather: chooseWeather(true),
    opponent,
    userScore: null,
    oppScore: null,
    scoreA: null,
    scoreB: null,
    result: "",
    tryScorers: [],
    fieldGoalScorers: [],
    twoPointFieldGoalScorers: [],
    winnerId: "",
    winner: "",
    loserId: "",
    loser: "",
    isUserGame: true,
    pendingSpeech: true,
    speech: createGrandFinalSpeech(opponent)
  };

  finals.push(row);
  return row;
}

function createGrandFinalSpeech(opponent) {
  const keys = ["motivating", "strategic", "normal"];
  const shuffledEffects = shuffle([6, 0, -6]);
  const effects = Object.fromEntries(keys.map((key, index) => [key, shuffledEffects[index]]));
  const intros = [
    `The sheds go quiet before ${opponent}. One last message can shift the room.`,
    `The team is waiting in a tight circle. Choose the note you want ringing in their ears.`,
    `Grand Final nerves are real. This is your final chance to set the tone.`,
    `The boots are taped, the tunnel is calling, and the captain looks your way.`
  ];

  return {
    opponent,
    intro: randomItem(intros),
    effects,
    options: [
      {
        key: "motivating",
        label: "A. Motivating Speech",
        text: randomItem([
          "Tell them this is their moment and send them out breathing fire.",
          "Lean into belief, energy and pride in the jumper.",
          "Make it emotional: togetherness, courage and one more effort."
        ])
      },
      {
        key: "strategic",
        label: "B. Strategic Speech",
        text: randomItem([
          "Keep it calm: kick pressure, win yardage, finish sets.",
          "Focus on the plan, the matchups and staying patient.",
          "Talk details: field position, defensive reads and composure."
        ])
      },
      {
        key: "normal",
        label: "C. Same As Season",
        text: randomItem([
          "Trust the routine that got you here and keep the week normal.",
          "No big theatre. Same process, same roles, same standards.",
          "Keep the tone familiar and let the side play what it knows."
        ])
      }
    ]
  };
}

function resolvePendingGrandFinal(seasonResult, pendingRow, speechKey) {
  const effect = pendingRow.speech?.effects?.[speechKey] || 0;
  const match = playMatch(pendingRow.teamAData, pendingRow.teamBData, true, pendingRow.weather, {
    stage: "Grand Final",
    adjustTeamId: "user",
    scoreAdjustment: effect
  });
  const resolved = buildFinalRow("Grand Final", pendingRow.teamAData, pendingRow.teamBData, match, pendingRow.weather, seasonResult.playerStats);
  const choice = pendingRow.speech?.options?.find((option) => option.key === speechKey);

  Object.assign(pendingRow, resolved, {
    pendingSpeech: false,
    speechChoice: speechKey,
    speechChoiceLabel: choice?.label || "Pre-game Speech",
    speechEffect: effect,
    speechOutcome: speechOutcomeLabel(effect)
  });
  delete pendingRow.teamAData;
  delete pendingRow.teamBData;

  seasonResult.leaders = calculateLeaders(seasonResult.playerStats);
  seasonResult.summary = createSummary(
    seasonResult.ladder.find((row) => row.id === "user"),
    seasonResult.finals,
    seasonResult.regularResults,
    seasonResult.prediction
  );

  return finalToUserResult(pendingRow);
}

function speechOutcomeLabel(effect) {
  if (effect > 0) return "Landed perfectly";
  if (effect < 0) return "Missed the mark";
  return "Kept things steady";
}

function finalToUserResult(row) {
  if (row.pendingSpeech) return row;

  return {
    ...row,
    opponent: row.opponent || (row.teamAId === "user" ? row.teamB : row.teamA),
    tryScorers: row.tryScorers || [],
    fieldGoalScorers: row.fieldGoalScorers || [],
    twoPointFieldGoalScorers: row.twoPointFieldGoalScorers || []
  };
}

function simulateUserFinalsPath(ladder, teamMap, playerStats, userPosition) {
  const finals = [];
  const userTeam = teamMap.get("user");
  const usedOpponents = new Set(["user"]);
  const teamByPosition = (position) => teamMap.get(ladder[position - 1].id);
  const pickOpponent = (positions) => {
    const preferred = positions
      .map((position) => ladder[position - 1])
      .filter(Boolean)
      .map((row) => teamMap.get(row.id))
      .filter((team) => team && !usedOpponents.has(team.id));
    const fallback = ladder
      .slice(0, 8)
      .map((row) => teamMap.get(row.id))
      .filter((team) => team && !usedOpponents.has(team.id));
    const opponent = randomItem(preferred.length ? preferred : fallback);
    usedOpponents.add(opponent.id);
    return opponent;
  };

  const playUser = (stage, opponent) => playFinalMatch(finals, stage, userTeam, opponent, playerStats);
  let match;

  if (userPosition <= 4) {
    const qfOpponentPosition = { 1: 4, 2: 3, 3: 2, 4: 1 }[userPosition];
    const qfOpponent = teamByPosition(qfOpponentPosition);
    usedOpponents.add(qfOpponent.id);
    match = playUser("Qualifying Final", qfOpponent);

    if (match.winnerId !== "user") {
      match = playUser("Semi Final", pickOpponent([5, 6, 7, 8]));
      if (match.winnerId !== "user") return finals;
    }

    match = playUser("Preliminary Final", pickOpponent([1, 2, 3, 4, 5, 6, 7, 8]));
    if (match.winnerId !== "user") return finals;
  } else {
    const efOpponentPosition = { 5: 8, 6: 7, 7: 6, 8: 5 }[userPosition];
    const efOpponent = teamByPosition(efOpponentPosition);
    usedOpponents.add(efOpponent.id);
    match = playUser("Elimination Final", efOpponent);
    if (match.winnerId !== "user") return finals;

    match = playUser("Semi Final", pickOpponent([1, 2, 3, 4]));
    if (match.winnerId !== "user") return finals;

    match = playUser("Preliminary Final", pickOpponent([1, 2, 3, 4, 5, 6, 7, 8]));
    if (match.winnerId !== "user") return finals;
  }

  const grandFinalOpponent = applyOpponentImmortal({ ...randomItem(GRAND_FINAL_WINNERS), tempo: 1 }, IMMORTAL_GRAND_FINAL_CHANCE);
  createPendingGrandFinal(finals, userTeam, grandFinalOpponent);

  return finals;
}

function simulateNeutralFinals(topEight, teamMap, playerStats) {
  const finals = [];
  const qf1 = playFinalMatch(finals, "Qualifying Final", topEight[0], topEight[3], playerStats);
  const qf2 = playFinalMatch(finals, "Qualifying Final", topEight[1], topEight[2], playerStats);
  const ef1 = playFinalMatch(finals, "Elimination Final", topEight[4], topEight[7], playerStats);
  const ef2 = playFinalMatch(finals, "Elimination Final", topEight[5], topEight[6], playerStats);
  const sf1 = playFinalMatch(finals, "Semi Final", qf1.loserTeam, ef2.winnerTeam, playerStats);
  const sf2 = playFinalMatch(finals, "Semi Final", qf2.loserTeam, ef1.winnerTeam, playerStats);
  const pf1 = playFinalMatch(finals, "Preliminary Final", qf2.winnerTeam, sf1.winnerTeam, playerStats);
  const pf2 = playFinalMatch(finals, "Preliminary Final", qf1.winnerTeam, sf2.winnerTeam, playerStats);
  const grandFinalOpponent = applyOpponentImmortal({ ...randomItem(GRAND_FINAL_WINNERS), tempo: 1 }, IMMORTAL_GRAND_FINAL_CHANCE);
  playFinalMatch(finals, "Grand Final", pf1.winnerTeam, grandFinalOpponent, playerStats);

  return finals;
}

function calculateLeaders(playerStats) {
  return {
    tries: leaderBy(playerStats, "tries"),
    points: leaderBy(playerStats, "points"),
    tackles: leaderBy(playerStats, "tackles"),
    runMetres: leaderBy(playerStats, "runMetres"),
    mvp: leaderBy(playerStats, "mvpVotes")
  };
}

function leaderBy(playerStats, key) {
  const row = [...playerStats].sort((a, b) => b[key] - a[key] || b.points - a.points || b.tries - a.tries)[0];
  return { name: row.name, value: row[key], row };
}

function createSummary(userLadderRow, finals, regularResults, prediction) {
  const regularWins = regularResults.filter((row) => row.result === "W").length;
  const regularLosses = regularResults.length - regularWins;
  const userFinals = finals.filter((game) => game.isUserGame && !game.pendingSpeech && game.result);
  const finalsWins = userFinals.filter((game) => game.winnerId === "user" || game.result === "W").length;
  const finalsLosses = userFinals.length - finalsWins;
  const wins = regularWins + finalsWins;
  const losses = regularLosses + finalsLosses;
  const finalsGames = countUserFinalsGames(finals);
  const regularGames = regularResults.length;
  const grandFinal = finals.find((game) => game.stage === "Grand Final" && (game.teamAId === "user" || game.teamBId === "user"));
  let finalStatus = "Missed finals";

  if (userLadderRow.position <= 8) {
    finalStatus = "Finalist";

    for (const game of finals) {
      const played = game.teamAId === "user" || game.teamBId === "user";
      if (played && game.winnerId !== "user") {
        finalStatus = `${game.stage} exit`;
      }
    }

    if (grandFinal) {
      finalStatus = grandFinal.winnerId === "user" ? "Premiers" : "Grand Finalist";
    }
  }

  return {
    wins,
    losses,
    record: `${wins}-${losses}`,
    regularRecord: `${regularWins}-${regularLosses}`,
    finalsRecord: `${finalsWins}-${finalsLosses}`,
    regularWins,
    regularLosses,
    finalsWins,
    finalsLosses,
    regularFinish: `${ordinal(userLadderRow.position)} on the ladder`,
    regularPosition: userLadderRow.position,
    regularPoints: userLadderRow.points,
    regularGames,
    finalsGames,
    totalGames: regularGames + finalsGames,
    finalStatus,
    pointsDiff: userLadderRow.diff,
    prediction
  };
}

function countUserFinalsGames(finals = []) {
  return finals.filter((game) => game.isUserGame && !game.pendingSpeech && game.result).length;
}

function formatTotalGames(summary) {
  if (!summary?.finalsGames) return `${summary?.regularGames || 24} games`;
  return `${summary.totalGames} games incl. finals`;
}

function formatPredictionDelta(summary, prediction) {
  const pointsDelta = summary.regularPoints - prediction.points;
  const ladderDelta = prediction.position - summary.regularPosition;

  if (pointsDelta >= 4 || ladderDelta >= 3) return "Beat the forecast";
  if (pointsDelta <= -4 || ladderDelta <= -3) return "Below forecast";
  return "Close to forecast";
}

function createPerformanceBlurb(summary, prediction) {
  const pointsDelta = summary.regularPoints - prediction.points;
  const predicted = `${prediction.finishLabel.replace(" predicted", "")}, ${prediction.points} pts, ${prediction.finalsForecast.toLowerCase()}`;
  const actual = `${ordinal(summary.regularPosition)}, ${summary.regularPoints} pts, ${summary.finalStatus.toLowerCase()}`;
  const pointsPhrase = pointsDelta === 0 ? "right on the projected points total" : `${Math.abs(pointsDelta)} points ${pointsDelta > 0 ? "above" : "below"} the projection`;

  return `Predicted ${predicted}. You finished ${actual}, ${pointsPhrase}.`;
}

async function copySummary() {
  const result = state.seasonResult;
  if (!result) return;
  const grandFinal = result.finals.find((row) => row.stage === "Grand Final" && row.isUserGame);

  const text = [
    "NRL Invincible",
    `Mode: ${state.ratingMode === "season" ? "Season form" : "Career peak"}`,
    `Style: ${result.teamRatings.styleLabel}`,
    result.prediction ? `Prediction: ${result.prediction.finishLabel}, ${result.prediction.points} pts, ${result.prediction.finalsForecast}` : null,
    `Record: ${result.summary.record}`,
    `Games: ${result.summary.totalGames} (${result.summary.regularGames} regular + ${result.summary.finalsGames} finals)`,
    `Regular finish: ${result.summary.regularFinish}`,
    `Finals: ${result.summary.finalStatus}`,
    `Weather: ${formatWeatherSummary(result.allResults)}`,
    grandFinal ? `Grand Final: ${grandFinal.userScore}-${grandFinal.oppScore} v ${grandFinal.teamAId === "user" ? grandFinal.teamB : grandFinal.teamA}` : null,
    grandFinal?.speechOutcome ? `Speech: ${grandFinal.speechChoiceLabel} - ${grandFinal.speechOutcome} (${formatSigned(grandFinal.speechEffect)})` : null,
    `Top try-scorer: ${result.leaders.tries.name} (${result.leaders.tries.value})`,
    `Top point-scorer: ${result.leaders.points.name} (${result.leaders.points.value})`,
    `MVP: ${result.leaders.mvp.name} (${result.leaders.mvp.value} votes)`
  ].filter(Boolean).join("\n");

  try {
    await copyText(text);
    toast("Summary copied.");
  } catch (error) {
    toast("Could not copy summary in this browser.");
  }
}

async function copySnapshotImage() {
  if (!state.seasonResult) return;
  const canvas = createSnapshotCanvas();

  try {
    if (!navigator.clipboard || typeof ClipboardItem === "undefined") {
      downloadCanvas(canvas);
      toast("Image copy is not available here, so the PNG was downloaded.");
      return;
    }

    const blob = await canvasToBlob(canvas);
    await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
    toast("Snapshot image copied.");
  } catch (error) {
    downloadCanvas(canvas);
    toast("Image copy was blocked, so the PNG was downloaded.");
  }
}

function downloadSnapshotImage() {
  if (!state.seasonResult) return;
  downloadCanvas(createSnapshotCanvas());
  toast("Snapshot downloaded.");
}

function createSnapshotCanvas() {
  const result = state.seasonResult;
  const canvas = document.createElement("canvas");
  canvas.width = 1200;
  canvas.height = 1700;
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#101311";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#1f6b43";
  ctx.fillRect(70, 70, 1060, 1560);
  ctx.strokeStyle = "rgba(255,255,255,0.18)";
  ctx.lineWidth = 3;
  for (let i = 0; i <= 10; i += 1) {
    const y = 70 + i * 156;
    ctx.beginPath();
    ctx.moveTo(70, y);
    ctx.lineTo(1130, y);
    ctx.stroke();
  }

  ctx.fillStyle = "rgba(16,19,17,0.86)";
  roundRect(ctx, 110, 110, 980, 1480, 18);
  ctx.fill();

  ctx.fillStyle = "#b7ef5d";
  ctx.font = "900 72px Inter, Arial, sans-serif";
  ctx.fillText("NRL Invincible", 150, 210);

  ctx.fillStyle = "#f3f5ef";
  ctx.font = "900 108px Inter, Arial, sans-serif";
  ctx.fillText(result.summary.record, 150, 340);

  ctx.fillStyle = "#d8dece";
  ctx.font = "700 34px Inter, Arial, sans-serif";
  let summaryY = 405;
  summaryY = drawText(ctx, `${result.summary.regularFinish} | ${result.summary.finalStatus} | ${formatTotalGames(result.summary)}`, 150, summaryY, 880, 40) + 2;
  summaryY = drawText(ctx, `${result.teamRatings.styleLabel} style | Points differential ${formatSigned(result.summary.pointsDiff)}`, 150, summaryY, 880, 40) + 2;
  summaryY = drawText(ctx, `Team rating ${result.teamRatings.overall}`, 150, summaryY, 880, 40) + 2;

  const leaderRows = [
    ["Top try-scorer", `${result.leaders.tries.name} (${result.leaders.tries.value})`],
    ["Top point-scorer", `${result.leaders.points.name} (${result.leaders.points.value})`],
    ["Highest tackles", `${result.leaders.tackles.name} (${formatNumber(result.leaders.tackles.value)})`],
    ["Highest run metres", `${result.leaders.runMetres.name} (${formatNumber(result.leaders.runMetres.value)})`],
    ["MVP", `${result.leaders.mvp.name} (${result.leaders.mvp.value} votes)`]
  ];

  let y = Math.max(570, summaryY + 36);
  for (const [label, value] of leaderRows) {
    ctx.fillStyle = "#aeb9ad";
    ctx.font = "800 26px Inter, Arial, sans-serif";
    ctx.fillText(label.toUpperCase(), 150, y);
    ctx.fillStyle = "#f3f5ef";
    ctx.font = "900 38px Inter, Arial, sans-serif";
    drawText(ctx, value, 150, y + 46, 880, 42);
    y += 112;
  }

  ctx.fillStyle = "#ffd166";
  ctx.font = "900 34px Inter, Arial, sans-serif";
  ctx.fillText("Selected XIII", 150, 1138);

  ctx.fillStyle = "#f3f5ef";
  ctx.font = "700 27px Inter, Arial, sans-serif";
  const left = state.drafted.slice(0, 7);
  const right = state.drafted.slice(7);
  drawSnapshotList(ctx, left, 150, 1205);
  drawSnapshotList(ctx, right, 610, 1205);

  ctx.fillStyle = "#aeb9ad";
  ctx.font = "700 22px Inter, Arial, sans-serif";
  ctx.fillText("Independent fan-made game. No official logos or player images used.", 150, 1548);

  return canvas;
}

function drawSnapshotList(ctx, picks, x, y) {
  const rowHeight = 40;

  picks.forEach((pick, index) => {
    const slot = pick.slotLabel;
    ctx.fillStyle = "#b7ef5d";
    drawFittedText(ctx, slot.toUpperCase(), x, y + index * rowHeight, 132, 21, 15, "900", "Inter, Arial, sans-serif");
    ctx.fillStyle = "#f3f5ef";
    drawFittedText(ctx, `${pick.name} ${pick.effectiveRatings.overall}`, x + 150, y + index * rowHeight, 330, 24, 16, "800", "Inter, Arial, sans-serif");
  });
}

function drawFittedText(ctx, text, x, y, maxWidth, size, minSize, weight, family) {
  let fontSize = size;
  const value = String(text);

  do {
    ctx.font = `${weight} ${fontSize}px ${family}`;
    if (ctx.measureText(value).width <= maxWidth || fontSize <= minSize) break;
    fontSize -= 1;
  } while (fontSize >= minSize);

  ctx.fillText(value, x, y);
}

function roundRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + width, y, x + width, y + height, radius);
  ctx.arcTo(x + width, y + height, x, y + height, radius);
  ctx.arcTo(x, y + height, x, y, radius);
  ctx.arcTo(x, y, x + width, y, radius);
  ctx.closePath();
}

function drawText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = String(text).split(" ");
  let line = "";
  let cursorY = y;

  for (const word of words) {
    const testLine = line ? `${line} ${word}` : word;
    if (ctx.measureText(testLine).width > maxWidth && line) {
      ctx.fillText(line, x, cursorY);
      line = word;
      cursorY += lineHeight;
    } else {
      line = testLine;
    }
  }

  if (line) ctx.fillText(line, x, cursorY);
  return cursorY + lineHeight;
}

function downloadCanvas(canvas) {
  const link = document.createElement("a");
  link.download = `nrl-invincible-${Date.now()}.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
}

function canvasToBlob(canvas) {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error("Canvas export failed"));
    }, "image/png");
  });
}

async function copyText(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
}

function toast(message) {
  document.querySelectorAll(".toast").forEach((node) => node.remove());
  const node = document.createElement("div");
  node.className = "toast";
  node.textContent = message;
  document.body.appendChild(node);
  window.setTimeout(() => node.remove(), 2800);
}

function randomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function weightedPick(items, weightFn) {
  const weights = items.map((item) => Math.max(0.01, weightFn(item)));
  const total = weights.reduce((sum, weight) => sum + weight, 0);
  let roll = Math.random() * total;

  for (let i = 0; i < items.length; i += 1) {
    roll -= weights[i];
    if (roll <= 0) return items[i];
  }

  return items[items.length - 1];
}

function randomNormal() {
  let u = 0;
  let v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

function randomBetween(min, max) {
  return min + Math.random() * (max - min);
}

function randomInt(min, max) {
  return Math.floor(randomBetween(min, max + 1));
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function formatSigned(value) {
  return value > 0 ? `+${value}` : String(value);
}

function formatNumber(value) {
  return new Intl.NumberFormat("en-AU").format(value);
}

function formatGoalPercentage(row) {
  if (!row.goalAttempts) return "-";
  return `${Math.round((row.goals / row.goalAttempts) * 100)}%`;
}

function ordinal(value) {
  const suffixes = ["th", "st", "nd", "rd"];
  const mod100 = value % 100;
  return `${value}${suffixes[(mod100 - 20) % 10] || suffixes[mod100] || suffixes[0]}`;
}

function escapeHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
