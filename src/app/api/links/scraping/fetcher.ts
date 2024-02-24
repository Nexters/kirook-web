import axios from 'axios';
import cheerio from 'cheerio';

export async function fetchOgTags(url: string): Promise<{ [key: string]: string }> {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const ogTags: { [key: string]: string } = {};

    $('meta').each((_, elem) => {
      const property = $(elem).attr('property') || $(elem).attr('name');
      const content = $(elem).attr('content');
      if (property?.includes('og:')) {
        ogTags[toCamelCase(property)] = content || '';
      }
    });

    return ogTags;
  } catch (error) {
    console.error(`Error fetching OG tags: ${error}`);
    return {};
  }
}

function toCamelCase(str: string) {
  return (
    str
      .replace('og:', '')
      // Split the string into parts based on ":" and "_"
      .split(/[:_]+/)
      // Iterate over each part of the array; capitalize the first letter of each part except the first one.
      .map((part, index) => {
        if (index === 0) {
          // Keep the first part in lowercase
          return part.toLowerCase();
        }
        // Capitalize the first letter of each subsequent part
        return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
      })
      // Join the parts back into a single string
      .join('')
  );
}
