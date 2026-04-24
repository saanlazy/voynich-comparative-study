const LINE_PATTERN = /^(<[^>]+>)\s*(.*)$/;
const TAG_PATTERN = /^<([^,>]+)(?:,([^>]+))?>$/;

const PREFIX_CANDIDATES = ['qok', 'qot', 'qod', 'qo', 'ok', 'ot', 'y', 'o', 'q'];
const SUFFIX_CANDIDATES = ['aiin', 'iiin', 'iin', 'ain', 'dy', 'y', 'ar', 'al', 'am', 'or', 'ol'];
const LIGATURES = ['cth', 'ckh', 'cph', 'cfh', 'tch', 'sh', 'ch', 'ee', 'ii'];

function cleanInlineMarkup(text) {
  return text
    .replace(/<![^>]*>/g, ' ')
    .replace(/<%>|<\$>|<->/g, ' ')
    .replace(/@\d+;/g, ' ')
    .replace(/\{([^}]*)\}/g, '$1')
    .replace(/\[([^\]:]+):[^\]]+\]/g, '$1')
    .replace(/\[([^\]]+)\]/g, '$1')
    .replace(/[.,;]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function normalizeToken(rawToken) {
  const source = rawToken.trim();
  if (!source) return null;

  // Normalize ZL3b uncertainty/variant marks into a stable search token.
  let token = source
    .toLowerCase()
    .replace(/\{([^}]*)\}/g, '$1')
    .replace(/\[([^\]:]+):[^\]]+\]/g, '$1')
    .replace(/\[([^\]]+)\]/g, '$1')
    .replace(/@\d+;/g, '')
    .replace(/[<'!$%]/g, '')
    .replace(/\?/g, '')
    .replace(/[^a-z]/g, '');

  token = token.replace(/c'h/g, 'ch');
  if (!token) return null;

  const prefix = PREFIX_CANDIDATES.find((candidate) => token.startsWith(candidate)) ?? '';
  const suffix = SUFFIX_CANDIDATES.find((candidate) => token.endsWith(candidate)) ?? '';

  let core = token;
  if (prefix && core.startsWith(prefix)) core = core.slice(prefix.length);
  if (suffix && core.endsWith(suffix) && core.length > suffix.length) {
    core = core.slice(0, -suffix.length);
  }

  return {
    raw: source,
    token,
    prefix,
    stem: core || token,
    suffix,
    ligatures: LIGATURES.filter((ligature) => token.includes(ligature)),
    uncertain: /\?|\[|\{|@\d+;/.test(source),
  };
}

function parseLineTag(tagText) {
  const match = tagText.match(TAG_PATTERN);
  if (!match) {
    return {
      locus: null,
      marker: '',
      paragraphInitial: false,
    };
  }

  const locus = match[1];
  const marker = match[2] ?? '';
  return {
    locus,
    marker,
    paragraphInitial: marker.includes('@P0') || marker.includes('*P0'),
  };
}

export function parseZl3bText(rawText) {
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

    // Skip pure folio header lines (<f1r> ... metadata only)
    if (!tag.locus || !tag.locus.includes('.')) continue;

    const cleaned = cleanInlineMarkup(rawContent);
    if (!cleaned) continue;

    const rawTokens = cleaned.split(/\s+/).filter(Boolean);
    const normalizedTokens = rawTokens.map(normalizeToken).filter(Boolean);
    if (normalizedTokens.length === 0) continue;

    const currentLineEntries = normalizedTokens.map((tokenInfo, index) => ({
      token: tokenInfo.token,
      rawToken: tokenInfo.raw,
      prefix: tokenInfo.prefix,
      stem: tokenInfo.stem,
      suffix: tokenInfo.suffix,
      ligatures: tokenInfo.ligatures,
      uncertain: tokenInfo.uncertain,
      lineInitial: index === 0,
      lineFinal: index === normalizedTokens.length - 1,
      paragraphInitial: tag.paragraphInitial && index === 0,
      locus: tag.locus,
      marker: tag.marker,
    }));

    entries.push(...currentLineEntries);
    lineTokens.push({ locus: tag.locus, tokens: currentLineEntries.map((item) => item.token) });
  }

  return {
    entries,
    lineTokens,
  };
}
