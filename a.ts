import * as fs from "fs";


const localeMappings = {
    'Australia - Brisbane': { link: 'en-AU', utm: 'AU' },
    'Canada - Montreal': { link: 'en-CA', utm: 'CA' },
    'New Zealand': { link: 'en-NZ', utm: 'NZ' },
    'Germany - Frankfurt - 3': { link: 'de-DE', utm: 'DE' },
    'Switzerland': { link: 'de', utm: 'CH' },
    'Norway': { link: 'no', utm: 'NO' },
    'Ireland': { link: 'en', utm: 'IE' }
};

const paths = [
    'kings_welcome_pack',
    'kings_land',
    'kings_world_welcome_pack',
    'wolfy_welcome_pack',
    'casinosanalyzer',
    'plinko_welcome_pack',
    'kings_gun',
    'wheel_of_fortune',
    'las_vegas_lights',
    'welcome_crypto',
    'kings_no_dep',
    'ndb',
    'ndb_king',
    'casinoguru',
    'kraken',
    'kraken_guru',
    'book_of_king_billy',
    'casinosanalyzer_150',
    'casinosanalyzer_100',
    'casinosanalyzer_50',
    'aviator_welcome_pack'
];

const paths2 = [
    'kings_welcome_pack_4',
    'kings_land_1',
    'kings_world_welcome_pack_1',
    'wolfy_welcome_pack_1',
    'casinosanalyzer_200_1',
    'plinko_welcome_pack_1',
    'kings_gun_1',
    'wheel_of_fortune_1',
    'las_vegas_lights_1',
    'welcome_crypto_1',
    'kings_no_dep_1',
    'ndb_3',
    'ndb_king_1',
    'casinoguru_1',
    'kraken_1',
    'kraken_guru_1',
    'book_of_king_billy_1',
    'casinosanalyzer_150_1',
    'casinosanalyzer_100_1',
    'casinosanalyzer_50_1',
    'aviator_welcome_pack_1'
];

const terms = [
    'top_winners',
    'Original',
    'Original',
    'Original',
    '200',
    'Original',
    'Original',
    'Original',
    'Original',
    'Original',
    'top_winners',
    'top_winners',
    'Original',
    'Original',
    'Original',
    'Original',
    'Original',
    '150',
    '100',
    '50',
    'Original',
]

const source = [
    'kings_welcome_pack',
    'kings_land',
    'kings_world',
    'wolfy',
    'casinosanalyzer',
    'plinko',
    'kings_gun',
    'wheel_of_fortune',
    'las_vegas',
    'welcome_crypto',
    'kings_no_dep',
    'ndb',
    'ndb_king',
    'casinoguru',
    'kraken',
    'kraken_guru',
    'book_of_king_billy',
    'casinosanalyzer',
    'casinosanalyzer',
    'casinosanalyzer',
    'aviator',
]

const campaign = [
    'Welcome_100',
    'Welcome_100',
    'Welcome_100',
    'Welcome_100',
    'Welcome_100',
    'Welcome_100',
    'Welcome_100',
    'Welcome_100',
    'Welcome_100',
    'Welcome_100',
    'NDB_50',
    'NDB_50',
    'NDB_50',
    'NDB_50',
    'NDB_50',
    'NDB_150',
    'Welcome_100',
    'Welcome_100',
    'Welcome_100',
    'Welcome_100',
    'Welcome_100',
]


const generateLinksObject = (selectedLocation) => {
    const localeData = localeMappings[selectedLocation] || { link: 'en', utm: 'US' }; // Default to 'en' & 'US'
    const baseUrl = `https://www.kingbillycasino1.com/land/${localeData.link}/`;

    return paths.reduce((acc, path, index) => {
        const utm = `utm_source=${source[index]}&utm_medium=${localeData.utm}&utm_campaign=${campaign[index]}&utm_content=31_03_25&utm_term=${terms[index]}`;
        const navLink = `${baseUrl}${path}`
        const expectedLink = `${baseUrl}${paths2[index]}`;

        acc[navLink] = {
            UTM: utm,
            location: selectedLocation,
            expected_link: `${expectedLink}`
        };

        return acc;
    }, {});
};


const allLinks = {};

for (const location of Object.keys(localeMappings)) {
    const locationLinks = generateLinksObject(location);

    // Merge the generated links into the allLinks object
    Object.assign(allLinks, locationLinks);
}

// Write the entire object to the file in one go
fs.writeFileSync('output.json', JSON.stringify(allLinks, null, 2), 'utf-8');