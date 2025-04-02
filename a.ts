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
    'casinosanalyzer_200',
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



const generateLinksObject = (selectedLocation) => {
    const localeData = localeMappings[selectedLocation] || { link: 'en', utm: 'US' }; // Default to 'en' & 'US'
    const baseUrl = `https://www.kingbillycasino1.com/land/${localeData.link}/`;

    return paths.reduce((acc, path) => {
        const utm = `utm_source=${path}&utm_medium=${localeData.utm}&utm_campaign=Welcome_100&utm_content=31_03_25&utm_term=top_winners`;
        const expectedLink = `${baseUrl}${path}`;

        acc[expectedLink] = {
            UTM: utm,
            location: selectedLocation,
            expected_link: `${expectedLink}`
        };

        return acc;
    }, {});
};



for (const location of Object.keys(localeMappings)){
    const jsonString = JSON.stringify(generateLinksObject(location), null, 2);
    fs.appendFileSync('output.json', jsonString, "utf-8");
}