import type { Config, Context } from "@netlify/functions";
import { getDatabase } from "@netlify/database";

// Public, read-only content API. Table and column names are whitelisted
// because they can't be passed as query parameters.
const ENTITIES: Record<string, { table: string; columns: string[] }> = {
  Artist: {
    table: "artists",
    columns: [
      "id", "name", "slug", "bio", "profile_image", "cover_image", "genre", "location",
      "spotify_url", "apple_music_url", "soundcloud_url", "instagram_url", "twitter_url",
      "website_url", "featured", "created_date", "updated_date",
    ],
  },
  Song: {
    table: "songs",
    columns: [
      "id", "title", "artist", "duration", "audio_url", "cover_image", "genre", "release_date",
      "soundcloud_url", "spotify_url", "apple_music_url", "featured", "created_date", "updated_date",
    ],
  },
  PodcastEpisode: {
    table: "podcast_episodes",
    columns: [
      "id", "title", "description", "episode_number", "season", "duration", "audio_url",
      "cover_image", "publish_date", "featured", "created_date", "updated_date",
    ],
  },
};

const RESERVED_PARAMS = new Set(["sort", "limit"]);

export default async (req: Request, context: Context) => {
  if (req.method !== "GET") {
    return new Response("Method not allowed", { status: 405 });
  }

  const entity = ENTITIES[context.params.name];
  if (!entity) {
    return Response.json({ error: "Unknown entity" }, { status: 404 });
  }

  const params = new URL(req.url).searchParams;
  const where: string[] = [];
  const values: unknown[] = [];

  for (const [key, raw] of params) {
    if (RESERVED_PARAMS.has(key)) continue;
    if (!entity.columns.includes(key)) {
      return Response.json({ error: `Unknown field: ${key}` }, { status: 400 });
    }
    values.push(raw === "true" ? true : raw === "false" ? false : raw);
    where.push(`"${key}" = $${values.length}`);
  }

  // Sort uses Base44's convention: "field" ascending, "-field" descending
  let orderBy = `"created_date" DESC`;
  const sort = params.get("sort");
  if (sort) {
    const desc = sort.startsWith("-");
    const field = desc ? sort.slice(1) : sort;
    if (!entity.columns.includes(field)) {
      return Response.json({ error: `Unknown sort field: ${field}` }, { status: 400 });
    }
    orderBy = `"${field}" ${desc ? "DESC" : "ASC"}`;
  }

  const limit = Math.min(Math.max(parseInt(params.get("limit") ?? "100", 10) || 100, 1), 500);

  const query =
    `SELECT ${entity.columns.map((c) => `"${c}"`).join(", ")} FROM ${entity.table}` +
    (where.length ? ` WHERE ${where.join(" AND ")}` : "") +
    ` ORDER BY ${orderBy} LIMIT ${limit}`;

  const { rows } = await getDatabase().pool.query(query, values);

  return Response.json(rows, {
    headers: { "Cache-Control": "public, max-age=0, must-revalidate" },
  });
};

export const config: Config = {
  path: "/api/entities/:name",
};
