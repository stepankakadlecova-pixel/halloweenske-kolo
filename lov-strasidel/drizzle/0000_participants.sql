CREATE TABLE participants (
 id TEXT PRIMARY KEY NOT NULL,
 email TEXT NOT NULL,
 newsletter_consent INTEGER NOT NULL,
 consent_text TEXT NOT NULL,
 consent_version TEXT NOT NULL,
 registered_at TEXT NOT NULL,
 session_hash TEXT NOT NULL,
 email_verified INTEGER NOT NULL DEFAULT 0
);
--> statement-breakpoint
CREATE UNIQUE INDEX participants_session ON participants(session_hash);
--> statement-breakpoint
CREATE INDEX participants_email_time ON participants(email,registered_at);
