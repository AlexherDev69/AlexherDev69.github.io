/**
 * Maquettes HTML des écrans EasyDiet (tableau de bord + suivi de poids),
 * reproduites fidèlement depuis la maquette d'origine. Purement décoratif.
 * Les styles sont dans src/pages/projets.astro (préfixés `.edm`).
 */
export default function EasyDietPreview() {
  return (
    <>
      <div className="edm">
        {/* Écran 1 : tableau de bord */}
        <div className="phone" aria-hidden="true">
          <div className="phone__screen">
            <div className="phone__status">
              <span>9:41</span>
              <span className="dots">
                <i></i>
                <i></i>
                <i></i>
              </span>
            </div>
            <div className="phone__body">
              <p className="p-eyebrow">Aujourd'hui</p>
              <p className="p-title">Tableau de bord</p>
              <div className="ring-wrap">
                <div className="ring">
                  <div className="ring__hole">
                    <div>
                      <b>1 240</b>
                      <span>/ 2 175 kcal</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="macro">
                <div className="macro__row">
                  <span>Protéines</span>
                  <b>78 / 136 g</b>
                </div>
                <div className="bar">
                  <i style={{ width: '57%', background: '#F43F5E' }}></i>
                </div>
              </div>
              <div className="macro">
                <div className="macro__row">
                  <span>Glucides</span>
                  <b>140 / 245 g</b>
                </div>
                <div className="bar">
                  <i style={{ width: '57%', background: '#F59E0B' }}></i>
                </div>
              </div>
              <div className="macro">
                <div className="macro__row">
                  <span>Lipides</span>
                  <b>42 / 73 g</b>
                </div>
                <div className="bar">
                  <i style={{ width: '57%', background: '#0EA5E9' }}></i>
                </div>
              </div>
              <div className="meal">
                <div className="meal__thumb">🥞</div>
                <div>
                  <b>Pancakes protéinés banane</b>
                  <span>570 kcal · 20 min</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Écran 2 : suivi de poids */}
        <div className="phone" aria-hidden="true">
          <div className="phone__screen">
            <div className="phone__status">
              <span>9:41</span>
              <span className="dots">
                <i></i>
                <i></i>
                <i></i>
              </span>
            </div>
            <div className="phone__body">
              <p className="p-eyebrow">Suivi</p>
              <p className="p-title">Mon poids</p>
              <div className="stat">
                <b>78,3</b>
                <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 700 }}>kg</span>
                <span className="pill">− 4,2 kg</span>
              </div>
              <div className="chart">
                <svg viewBox="0 0 180 96" preserveAspectRatio="none" role="img" aria-label="Courbe de poids en baisse">
                  <defs>
                    <linearGradient id="edFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0" stopColor="#10B981" stopOpacity="0.28" />
                      <stop offset="1" stopColor="#10B981" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <polyline
                    points="4,20 34,30 64,28 94,46 124,58 154,66 176,76"
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <polygon
                    points="4,20 34,30 64,28 94,46 124,58 154,66 176,76 176,96 4,96"
                    fill="url(#edFill)"
                  />
                  <circle cx="176" cy="76" r="4" fill="#10B981" stroke="#fff" strokeWidth="2" />
                </svg>
                <div className="legend">
                  <span>Mars</span>
                  <span>Avr</span>
                  <span>Mai</span>
                  <span>Juin</span>
                </div>
              </div>
              <div className="meal" style={{ boxShadow: 'none' }}>
                <div
                  className="meal__thumb"
                  style={{ background: 'linear-gradient(135deg,#8B5CF6,#6366F1)' }}
                >
                  🎯
                </div>
                <div>
                  <b>Objectif atteint vers</b>
                  <span>mi-septembre · 68 kg</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="edm-cap">Tableau de bord et suivi de poids : interface Material 3 sur mesure.</p>
    </>
  );
}
