import fs from 'node:fs';

const LINE_PATTERN = /^(<[^>]+>)\s*(.*)$/;
const TAG_PATTERN = /^<([^,>]+)(?:,([^>]+))?>$/;

export const NORMALIZATION_MODES = {
  A: 'baseline',
  B: 'no_ligature_collapse',
  C: 'minimal',
  D: 'aggressive',
};

function cleanInlineMarkup(text) {
  return text
    .replace(/<![^>]*>/g, ' ')
    .replace(/<%>|<\$>|<->/g, ' ')
    .replace(/@\d+;/g, ' ')
    .replace(/[.,;]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function parseLineTag(tagText) {
  const match = tagText.match(TAG_PATTERN);
  if (!match) return { locus: null, marker: '', paragraphInitial: false };

  const locus = match[1];
  const marker = match[2] ?? '';
  return {
    locus,
    marker,
    paragraphInitial: marker.includes('@P0') || marker.includes('*P0'),
  };
}

function normalizeToken(rawToken, mode) {
  let token = rawToken.trim().toLowerCase();
  if (!token) return null;

  if (mode === 'C') {
    token = token
      .replace(/\{([^}]*)\}/g, '$1')
      .replace(/\[([^\]]+)\]/g, '$1')
      .replace(/@\d+;/g, '')
      .replace(/[<'!$%:]/g, '')
      .replace(/[^a-z?]/g, '');
    return token || null;
  }

  token = token
    .replace(/\{([^}]*)\}/g, '$1')
    .replace(/\[([^\]:]+):[^\]]+\]/g, '$1')
    .replace(/\[([^\]]+)\]/g, '$1')
    .replace(/@\d+;/g, '')
    .replace(/[<'!$%]/g, '')
    .replace(/\?/g, '')
    .replace(/[^a-z]/g, '');

  if (mode === 'A') {
    token = token.replace(/c'h/g, 'ch');
  }

  if (mode === 'D') {
    token = token
      .replace(/ckh|cth|cph|cfh|tch/g, 'ch')
      .replace(/sh/g, 'ch')
      .replace(/y/g, 'i')
      .replace(/o/g, 'a')
      .replace(/q/g, 'k');
  }

  return token || null;
}

export function parseTranscriptionWithMode(rawText, mode = 'A') {
  const lines = rawText.split(/\r?\n/);
  const entries = [];
  const lineTokens = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const lineMatch = trimmed.match(LINE_PATTERN);
    if (!lineMatch) continue;

    const [, tagText, rawContent] = lineMatch;
    const tag = parseLineTag(tagText);
    if (!tag.locus || !tag.locus.includes('.')) continue;

    const cleaned = cleanInlineMarkup(rawContent);
    if (!cleaned) continue;

    const rawTokens = cleaned.split(/\s+/).filter(Boolean);
    const tokens = rawTokens.map((token) => normalizeToken(token, mode)).filter(Boolean);
    if (tokens.length === 0) continue;

    const lineEntries = tokens.map((token, idx) => ({
      token,
      lineInitial: idx === 0,
      lineFinal: idx === tokens.length - 1,
      paragraphInitial: tag.paragraphInitial && idx === 0,
      locus: tag.locus,
      marker: tag.marker,
    }));

    entries.push(...lineEntries);
    lineTokens.push({ locus: tag.locus, tokens: lineEntries.map((item) => item.token) });
  }

  return { entries, lineTokens };
}

export function loadTranscriptionFile(filePath, mode = 'A') {
  const raw = fs.readFileSync(filePath, 'utf8');
  return parseTranscriptionWithMode(raw, mode);
}
