-- Site content tables, mirroring the entities previously stored in Base44.
-- Column names match the old Base44 field names so the pages read them unchanged.

CREATE TABLE artists (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  bio TEXT,
  profile_image TEXT,
  cover_image TEXT,
  genre TEXT,
  location TEXT,
  spotify_url TEXT,
  apple_music_url TEXT,
  soundcloud_url TEXT,
  instagram_url TEXT,
  twitter_url TEXT,
  website_url TEXT,
  featured BOOLEAN NOT NULL DEFAULT FALSE,
  created_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_date TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE songs (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  title TEXT NOT NULL,
  artist TEXT NOT NULL,
  duration TEXT,
  audio_url TEXT,
  cover_image TEXT,
  genre TEXT,
  release_date TEXT,
  soundcloud_url TEXT,
  spotify_url TEXT,
  apple_music_url TEXT,
  featured BOOLEAN NOT NULL DEFAULT FALSE,
  created_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_date TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE podcast_episodes (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  title TEXT NOT NULL,
  description TEXT,
  episode_number INTEGER NOT NULL,
  season INTEGER,
  duration TEXT,
  audio_url TEXT,
  cover_image TEXT,
  publish_date TEXT,
  featured BOOLEAN NOT NULL DEFAULT FALSE,
  created_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_date TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
