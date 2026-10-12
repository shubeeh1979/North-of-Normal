// Reads site content from the Netlify content API (netlify/functions/entities.mts).
// Mirrors the list/filter calls the pages previously made against Base44.

const fetchEntities = async (name, query = {}, sort, limit) => {
  const params = new URLSearchParams();
  Object.entries(query).forEach(([key, value]) => params.append(key, String(value)));
  if (sort) params.set('sort', sort);
  if (limit) params.set('limit', String(limit));

  const response = await fetch(`/api/entities/${name}?${params}`);
  if (!response.ok) {
    throw new Error(`Failed to load ${name} (${response.status})`);
  }
  return response.json();
};

const entity = (name) => ({
  list: (sort, limit) => fetchEntities(name, {}, sort, limit),
  filter: (query, sort, limit) => fetchEntities(name, query, sort, limit),
});

export const api = {
  entities: {
    Artist: entity('Artist'),
    Song: entity('Song'),
    PodcastEpisode: entity('PodcastEpisode'),
  },
};
