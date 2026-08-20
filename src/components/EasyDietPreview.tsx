/**
 * Maquettes des écrans EasyDiet (tableau de bord + suivi de poids).
 * Composant autonome : styles inline, couleurs de l'app conservées (émeraude),
 * posé sur un panneau sombre teinté. Purement décoratif.
 */
const statusDots = (
  <span style={{ display: 'flex', gap: '3px' }}>
    <i style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#0f172a', display: 'inline-block' }}></i>
    <i style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#0f172a', display: 'inline-block' }}></i>
    <i style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#0f172a', display: 'inline-block' }}></i>
  </span>
);

export default function EasyDietPreview() {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '22px',
        padding: '28px',
        background: 'linear-gradient(160deg, rgba(16,185,129,.10), var(--terminal, #04171a))',
        border: '1px solid var(--border, rgba(159,224,213,.14))',
        borderRadius: '8px',
        justifyContent: 'center',
      }}
      aria-hidden="true"
    >
      {/* Écran 1 : tableau de bord */}
      <div style={{ width: '230px', background: '#ffffff', borderRadius: '26px', padding: '10px', boxShadow: '0 24px 50px -20px rgba(0,0,0,.6)', color: '#0f172a' }}>
        <div style={{ borderRadius: '18px', overflow: 'hidden', background: '#f5f7fa' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '9px 14px', fontSize: '11px', fontWeight: 700, color: '#0f172a', fontFamily: "'IBM Plex Mono', monospace" }}>
            <span>9:41</span>{statusDots}
          </div>
          <div style={{ padding: '6px 16px 18px' }}>
            <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '.08em', color: '#10B981', fontWeight: 700 }}>Aujourd'hui</div>
            <div style={{ fontSize: '19px', fontWeight: 700, margin: '2px 0 14px' }}>Tableau de bord</div>
            <div style={{ display: 'grid', placeItems: 'center', marginBottom: '16px' }}>
              <div style={{ width: '130px', height: '130px', borderRadius: '50%', background: 'conic-gradient(#10B981 57%, #e5eaf0 0)', display: 'grid', placeItems: 'center' }}>
                <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: '#fff', display: 'grid', placeItems: 'center', textAlign: 'center' }}>
                  <div><b style={{ fontSize: '20px' }}>1 240</b><br /><span style={{ fontSize: '10px', color: '#64748B' }}>/ 2 175 kcal</span></div>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { label: 'Protéines', val: '78 / 136 g', color: '#F43F5E' },
                { label: 'Glucides', val: '140 / 245 g', color: '#F59E0B' },
                { label: 'Lipides', val: '42 / 73 g', color: '#0EA5E9' },
              ].map((m) => (
                <div key={m.label}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 600 }}>
                    <span style={{ color: '#64748B' }}>{m.label}</span><b>{m.val}</b>
                  </div>
                  <div style={{ height: '6px', background: '#e5eaf0', borderRadius: '4px', marginTop: '4px' }}>
                    <i style={{ display: 'block', height: '100%', width: '57%', background: m.color, borderRadius: '4px' }}></i>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '14px', display: 'flex', gap: '10px', alignItems: 'center', background: '#fff', border: '1px solid #eef1f5', borderRadius: '12px', padding: '9px' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '9px', background: '#eafaf3', display: 'grid', placeItems: 'center', fontSize: '18px' }}>🥞</div>
              <div><b style={{ fontSize: '12px' }}>Pancakes protéinés banane</b><br /><span style={{ fontSize: '10px', color: '#64748B' }}>570 kcal · 20 min</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* Écran 2 : suivi de poids */}
      <div style={{ width: '230px', background: '#ffffff', borderRadius: '26px', padding: '10px', boxShadow: '0 24px 50px -20px rgba(0,0,0,.6)', color: '#0f172a' }}>
        <div style={{ borderRadius: '18px', overflow: 'hidden', background: '#f5f7fa' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '9px 14px', fontSize: '11px', fontWeight: 700, color: '#0f172a', fontFamily: "'IBM Plex Mono', monospace" }}>
            <span>9:41</span>{statusDots}
          </div>
          <div style={{ padding: '6px 16px 18px' }}>
            <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '.08em', color: '#10B981', fontWeight: 700 }}>Suivi</div>
            <div style={{ fontSize: '19px', fontWeight: 700, margin: '2px 0 14px' }}>Mon poids</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '14px' }}>
              <b style={{ fontSize: '30px' }}>78,3</b>
              <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 700 }}>kg</span>
              <span style={{ marginLeft: 'auto', fontSize: '11px', fontWeight: 700, color: '#10B981', background: '#eafaf3', padding: '3px 9px', borderRadius: '999px' }}>− 4,2 kg</span>
            </div>
            <div style={{ background: '#fff', border: '1px solid #eef1f5', borderRadius: '12px', padding: '12px' }}>
              <svg viewBox="0 0 180 96" preserveAspectRatio="none" style={{ width: '100%', height: '80px', display: 'block' }} role="img" aria-label="Courbe de poids en baisse">
                <defs>
                  <linearGradient id="edFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#10B981" stopOpacity="0.28" />
                    <stop offset="1" stopColor="#10B981" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <polyline points="4,20 34,30 64,28 94,46 124,58 154,66 176,76" fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <polygon points="4,20 34,30 64,28 94,46 124,58 154,66 176,76 176,96 4,96" fill="url(#edFill)" />
                <circle cx="176" cy="76" r="4" fill="#10B981" stroke="#fff" strokeWidth="2" />
              </svg>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', color: '#94a3b8', marginTop: '6px' }}>
                <span>Mars</span><span>Avr</span><span>Mai</span><span>Juin</span>
              </div>
            </div>
            <div style={{ marginTop: '12px', display: 'flex', gap: '10px', alignItems: 'center' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '9px', background: 'linear-gradient(135deg,#8B5CF6,#6366F1)', display: 'grid', placeItems: 'center', fontSize: '18px' }}>🎯</div>
              <div><b style={{ fontSize: '12px' }}>Objectif atteint vers</b><br /><span style={{ fontSize: '10px', color: '#64748B' }}>mi-septembre · 68 kg</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
