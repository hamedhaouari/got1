import axios from 'axios';
import cheerio from 'cheerio';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Base URL for ASOIAF Wiki
    const baseUrl = 'https://www.facebook.com/groups/BnBTunisie';
    const url = `${baseUrl}`;
    
    // Fetch the webpage
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);
    
    const houses = [];
    
    // Scrape major houses
    /* $('.mw-parser-output').find('h3, h4').each((i, element) => {
      const nextUl = $(element).next('ul');
      if (nextUl.length) {
        const region = $(element).find('.mw-headline').text();
        
        nextUl.find('li').each((j, li) => {
          const houseLink = $(li).find('a').first();
          const houseName = houseLink.text();
          const houseUrl = houseLink.attr('href');
          
          if (houseName && !houseName.includes('House')) {
            houses.push({
              name: `House ${houseName}`,
              region: region,
              wikiUrl: houseUrl ? `${baseUrl}${houseUrl}` : null
            });
          } else if (houseName) {
            houses.push({
              name: houseName,
              region: region,
              wikiUrl: houseUrl ? `${baseUrl}${houseUrl}` : null
            });
          }
        });
      }
    });

    // Get additional details for each house (limited to first 5 to avoid too many requests)
    const detailedHouses = await Promise.all(
      houses.slice(0, 5).map(async (house) => {
        if (!house.wikiUrl) return house;
        
        try {
          const houseResponse = await axios.get(house.wikiUrl);
          const house$ = cheerio.load(houseResponse.data);
          
          // Get house words if available
          const words = house$('.infobox-label:contains("Words")')
            .next('.infobox-data')
            .text()
            .trim();
            
          // Get house seat if available
          const seat = house$('.infobox-label:contains("Seat")')
            .next('.infobox-data')
            .text()
            .trim();
            
          return {
            ...house,
            words: words || 'Unknown',
            seat: seat || 'Unknown'
          };
        } catch (error) {
          return house;
        }
      })
    ); */

    return res.status(200).json({
      success: true,
      timestamp: new Date().toISOString(),
      data: $
    });

  } catch (error) {
    console.error('Scraping error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to scrape GOT data',
      message: error.message
    });
  }
}