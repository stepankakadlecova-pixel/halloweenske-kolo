CREATE TABLE daily_game_stats (
 day TEXT NOT NULL,
 event TEXT NOT NULL,
 count INTEGER NOT NULL DEFAULT 0,
 PRIMARY KEY (day, event)
);
