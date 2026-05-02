// ── Admin design tokens ── light pastel pink theme
export const A = {
  // backgrounds
  pageBg:   '#FDF5F7',
  sidebarBg:'#FFFFFF',
  cardBg:   '#FFFFFF',
  inputBg:  '#FFF8FA',
  modalBg:  '#FFFFFF',

  // brand
  burgundy: '#6B1A2A',
  rose:     '#C4758A',
  blush:    '#F7E8EC',
  petal:    '#F0D5DC',
  softPink: '#FDF5F7',

  // text
  textMain:  '#2A0A12',
  textMuted: 'rgba(42,10,18,0.45)',
  textLight: 'rgba(42,10,18,0.3)',

  // borders
  border:       'rgba(196,117,138,0.18)',
  borderStrong: 'rgba(107,26,42,0.22)',

  // status
  success: { bg:'rgba(16,185,129,0.08)', bd:'rgba(16,185,129,0.25)', tx:'#065F46' },
  error:   { bg:'rgba(239,68,68,0.08)',  bd:'rgba(239,68,68,0.25)',  tx:'#991B1B' },
  info:    { bg:'rgba(196,117,138,0.08)',bd:'rgba(196,117,138,0.25)',tx:'#6B1A2A' },
};

export const inp = (extra = {}) => ({
  width: '100%',
  padding: '11px 14px',
  borderRadius: '10px',
  background: A.inputBg,
  border: `1px solid ${A.border}`,
  color: A.textMain,
  fontSize: '14px',
  outline: 'none',
  fontFamily: 'DM Sans',
  boxSizing: 'border-box',
  transition: 'border-color 0.22s, box-shadow 0.22s',
  ...extra,
});