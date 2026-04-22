import crypto from "node:crypto";
import path from "node:path";
import { pathToFileURL } from "node:url";

const REQUIRED_ENV_VARS = [
  "X_API_KEY",
  "X_API_KEY_SECRET",
  "X_ACCESS_TOKEN",
  "X_ACCESS_TOKEN_SECRET",
];

for (const name of REQUIRED_ENV_VARS) {
  if (!process.env[name]) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
}

const PUBLICATIONS_PATH = path.resolve("src/data/publications.js");
const PREVIOUS_PUBLICATIONS_PATH = path.resolve("tmp/previous-publications.js");
const TWEET_ENDPOINT = "https://api.x.com/2/tweets";

const currentModule = await import(pathToFileURL(PUBLICATIONS_PATH).href);
const currentPublications = normalizePublications(currentModule.publications ?? []);

let previousPublications = [];
try {
  const previousModule = await import(
    `${pathToFileURL(PREVIOUS_PUBLICATIONS_PATH).href}?t=${Date.now()}`
  );
  previousPublications = normalizePublications(previousModule.publications ?? []);
} catch {
  previousPublications = [];
}

const previousKeys = new Set(previousPublications.map(publicationKey));
const newPublications = currentPublications.filter(
  (publication) => !previousKeys.has(publicationKey(publication))
);

if (newPublications.length === 0) {
  console.log("No new publications detected.");
  process.exit(0);
}

for (const publication of newPublications) {
  const text = buildTweetText(publication);
  console.log(`Posting publication to X: ${publication.title}`);
  await createPost(text);
}

function normalizePublications(items) {
  return items
    .filter(Boolean)
    .map((item) => ({
      year: item.year,
      title: String(item.title ?? "").trim(),
      authors: String(item.authors ?? "").trim(),
      venue: String(item.venue ?? "").trim(),
      type: String(item.type ?? "").trim(),
      link: String(item.link ?? "").trim(),
      note: String(item.note ?? "").trim(),
    }))
    .filter((item) => item.title && item.link);
}

function publicationKey(publication) {
  return `${publication.year}::${publication.title}`;
}

function buildTweetText(publication) {
  const parts = [
    "New publication",
    `${publication.title}`,
    publication.venue ? `${publication.venue} (${publication.year})` : String(publication.year),
    publication.link,
  ];

  let text = parts.join("\n");
  if (text.length <= 280) return text;

  const reservedLength =
    "New publication\n\n\n".length +
    (publication.venue ? `${publication.venue} (${publication.year})`.length : String(publication.year).length) +
    publication.link.length;

  const availableTitleLength = Math.max(40, 280 - reservedLength - 6);
  const trimmedTitle =
    publication.title.length > availableTitleLength
      ? `${publication.title.slice(0, availableTitleLength - 1).trimEnd()}…`
      : publication.title;

  text = [
    "New publication",
    trimmedTitle,
    publication.venue ? `${publication.venue} (${publication.year})` : String(publication.year),
    publication.link,
  ].join("\n");

  return text.slice(0, 280);
}

async function createPost(text) {
  const body = JSON.stringify({ text });
  const authorization = buildOAuthHeader("POST", TWEET_ENDPOINT);
  const response = await fetch(TWEET_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: authorization,
      "Content-Type": "application/json",
    },
    body,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`X API request failed (${response.status}): ${errorText}`);
  }

  const json = await response.json();
  console.log(`Posted successfully with id ${json?.data?.id ?? "unknown"}`);
}

function buildOAuthHeader(method, url) {
  const oauth = {
    oauth_consumer_key: process.env.X_API_KEY,
    oauth_nonce: crypto.randomBytes(16).toString("hex"),
    oauth_signature_method: "HMAC-SHA1",
    oauth_timestamp: Math.floor(Date.now() / 1000).toString(),
    oauth_token: process.env.X_ACCESS_TOKEN,
    oauth_version: "1.0",
  };

  const signature = signOAuthRequest(method, url, oauth);
  const headerParams = { ...oauth, oauth_signature: signature };

  return `OAuth ${Object.entries(headerParams)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${percentEncode(key)}="${percentEncode(value)}"`)
    .join(", ")}`;
}

function signOAuthRequest(method, url, oauthParams) {
  const parameterString = Object.entries(oauthParams)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${percentEncode(key)}=${percentEncode(value)}`)
    .join("&");

  const signatureBaseString = [
    method.toUpperCase(),
    percentEncode(url),
    percentEncode(parameterString),
  ].join("&");

  const signingKey = [
    percentEncode(process.env.X_API_KEY_SECRET),
    percentEncode(process.env.X_ACCESS_TOKEN_SECRET),
  ].join("&");

  return crypto.createHmac("sha1", signingKey).update(signatureBaseString).digest("base64");
}

function percentEncode(value) {
  return encodeURIComponent(String(value))
    .replace(/[!'()*]/g, (character) => `%${character.charCodeAt(0).toString(16).toUpperCase()}`);
}
