// ── Admin Design Tokens ── light background, dark readable text
export const A = {
  // ── backgrounds ──
  pageBg:    '#FAF5F7',      // very light pinkish white
  sidebarBg: '#FFFFFF',
  cardBg:    '#FFFFFF',
  inputBg:   '#FDF8FA',
  modalBg:   '#FFFFFF',
  hoverBg:   '#FFF0F4',

  // ── brand ──
  burgundy:  '#5C1322',      // deep burgundy for text / accents
  rose:      '#B05070',      // medium rose
  roseSoft:  '#D4849A',      // softer rose
  blush:     '#F5E0E6',      // light blush fill
  petal:     '#FDEEF2',      // very light petal

  // ── text ──
  textMain:  '#2A0A12',      // very dark, high contrast
  textSub:   '#5C2030',      // medium dark
  textMuted: '#8B4558',      // readable muted
  textLight: '#B07080',      // light label

  // ── borders ──
  border:       'rgba(92,19,34,0.12)',
  borderStrong: 'rgba(92,19,34,0.24)',

  // ── status ──
  success: { bg:'#ECFDF5', bd:'#6EE7B7', tx:'#065F46' },
  error:   { bg:'#FEF2F2', bd:'#FCA5A5', tx:'#991B1B' },
  info:    { bg:'#FFF5F7', bd:'#D4849A', tx:'#5C1322' },
};

export const inp = (extra = {}) => ({
  width: '100%',
  padding: '11px 14px',
  borderRadius: '10px',
  background: A.inputBg,
  border: `1.5px solid ${A.border}`,
  color: A.textMain,
  fontSize: '14px',
  outline: 'none',
  fontFamily: 'DM Sans',
  boxSizing: 'border-box',
  transition: 'border-color 0.2s, box-shadow 0.2s',
  ...extra,
});