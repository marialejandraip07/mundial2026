import { useState, useEffect } from "react";

const GROUPS = {
  A: ["México", "Sudáfrica", "Corea del Sur", "Rep. Checa"],
  B: ["Canadá", "Bosnia-Herzegovina", "Qatar", "Suiza"],
  C: ["Brasil", "Marruecos", "Haití", "Escocia"],
  D: ["EE.UU.", "Paraguay", "Australia", "Turquía"],
  E: ["Alemania", "Curazao", "Costa de Marfil", "Ecuador"],
  F: ["Países Bajos", "Japón", "Suecia", "Túnez"],
  G: ["Bélgica", "Egipto", "Irán", "Nueva Zelanda"],
  H: ["España", "Cabo Verde", "Arabia Saudita", "Uruguay"],
  I: ["Francia", "Senegal", "Irak", "Noruega"],
  J: ["Argentina", "Argelia", "Austria", "Jordania"],
  K: ["Portugal", "RD Congo", "Uzbekistán", "Colombia"],
  L: ["Inglaterra", "Croacia", "Ghana", "Panamá"],
};

const GROUP_MATCHES = {
  A: [
    { date: "11 jun", match: "México vs Sudáfrica" },
    { date: "11 jun", match: "Corea del Sur vs Rep. Checa" },
    { date: "17 jun", match: "México vs Corea del Sur" },
    { date: "17 jun", match: "Sudáfrica vs Rep. Checa" },
    { date: "22 jun", match: "Rep. Checa vs México" },
    { date: "22 jun", match: "Sudáfrica vs Corea del Sur" },
  ],
  B: [
    { date: "12 jun", match: "Canadá vs Bosnia-Herzegovina" },
    { date: "13 jun", match: "Qatar vs Suiza" },
    { date: "18 jun", match: "Canadá vs Qatar" },
    { date: "18 jun", match: "Bosnia-Herzegovina vs Suiza" },
    { date: "23 jun", match: "Suiza vs Canadá" },
    { date: "23 jun", match: "Bosnia-Herzegovina vs Qatar" },
  ],
  C: [
    { date: "13 jun", match: "Brasil vs Marruecos" },
    { date: "13 jun", match: "Haití vs Escocia" },
    { date: "19 jun", match: "Brasil vs Haití" },
    { date: "19 jun", match: "Marruecos vs Escocia" },
    { date: "24 jun", match: "Escocia vs Brasil" },
    { date: "24 jun", match: "Marruecos vs Haití" },
  ],
  D: [
    { date: "12 jun", match: "EE.UU. vs Paraguay" },
    { date: "14 jun", match: "Australia vs Turquía" },
    { date: "19 jun", match: "EE.UU. vs Australia" },
    { date: "19 jun", match: "Paraguay vs Turquía" },
    { date: "24 jun", match: "Turquía vs EE.UU." },
    { date: "24 jun", match: "Paraguay vs Australia" },
  ],
  E: [
    { date: "15 jun", match: "Alemania vs Curazao" },
    { date: "15 jun", match: "Costa de Marfil vs Ecuador" },
    { date: "20 jun", match: "Alemania vs Costa de Marfil" },
    { date: "20 jun", match: "Curazao vs Ecuador" },
    { date: "25 jun", match: "Ecuador vs Alemania" },
    { date: "25 jun", match: "Curazao vs Costa de Marfil" },
  ],
  F: [
    { date: "14 jun", match: "Países Bajos vs Japón" },
    { date: "15 jun", match: "Suecia vs Túnez" },
    { date: "20 jun", match: "Países Bajos vs Suecia" },
    { date: "20 jun", match: "Japón vs Túnez" },
    { date: "25 jun", match: "Túnez vs Países Bajos" },
    { date: "25 jun", match: "Japón vs Suecia" },
  ],
  G: [
    { date: "15 jun", match: "Bélgica vs Egipto" },
    { date: "16 jun", match: "Irán vs Nueva Zelanda" },
    { date: "21 jun", match: "Bélgica vs Irán" },
    { date: "21 jun", match: "Egipto vs Nueva Zelanda" },
    { date: "26 jun", match: "Nueva Zelanda vs Bélgica" },
    { date: "26 jun", match: "Egipto vs Irán" },
  ],
  H: [
    { date: "14 jun", match: "España vs Cabo Verde" },
    { date: "16 jun", match: "Arabia Saudita vs Uruguay" },
    { date: "21 jun", match: "España vs Arabia Saudita" },
    { date: "21 jun", match: "Cabo Verde vs Uruguay" },
    { date: "26 jun", match: "Uruguay vs España" },
    { date: "26 jun", match: "Cabo Verde vs Arabia Saudita" },
  ],
  I: [
    { date: "16 jun", match: "Francia vs Senegal" },
    { date: "16 jun", match: "Irak vs Noruega" },
    { date: "22 jun", match: "Francia vs Irak" },
    { date: "22 jun", match: "Senegal vs Noruega" },
    { date: "27 jun", match: "Noruega vs Francia" },
    { date: "27 jun", match: "Senegal vs Irak" },
  ],
  J: [
    { date: "16 jun", match: "Argentina vs Argelia" },
    { date: "17 jun", match: "Austria vs Jordania" },
    { date: "22 jun", match: "Argentina vs Austria" },
    { date: "22 jun", match: "Argelia vs Jordania" },
    { date: "27 jun", match: "Jordania vs Argentina" },
    { date: "27 jun", match: "Argelia vs Austria" },
  ],
  K: [
    { date: "17 jun", match: "Portugal vs RD Congo" },
    { date: "17 jun", match: "Uzbekistán vs Colombia" },
    { date: "23 jun", match: "Portugal vs Uzbekistán" },
    { date: "23 jun", match: "RD Congo vs Colombia" },
    { date: "27 jun", match: "Colombia vs Portugal" },
    { date: "27 jun", match: "RD Congo vs Uzbekistán" },
  ],
  L: [
    { date: "17 jun", match: "Inglaterra vs Croacia" },
    { date: "18 jun", match: "Ghana vs Panamá" },
    { date: "23 jun", match: "Inglaterra vs Ghana" },
    { date: "23 jun", match: "Croacia vs Panamá" },
    { date: "27 jun", match: "Panamá vs Inglaterra" },
    { date: "27 jun", match: "Croacia vs Ghana" },
  ],
};

const FLAG_EMOJIS = {
  "México":"🇲🇽","Sudáfrica":"🇿🇦","Corea del Sur":"🇰🇷","Rep. Checa":"🇨🇿",
  "Canadá":"🇨🇦","Bosnia-Herzegovina":"🇧🇦","Qatar":"🇶🇦","Suiza":"🇨🇭",
  "Brasil":"🇧🇷","Marruecos":"🇲🇦","Haití":"🇭🇹","Escocia":"🏴󠁧󠁢󠁳󠁣󠁴󠁿",
  "EE.UU.":"🇺🇸","Paraguay":"🇵🇾","Australia":"🇦🇺","Turquía":"🇹🇷",
  "Alemania":"🇩🇪","Curazao":"🇨🇼","Costa de Marfil":"🇨🇮","Ecuador":"🇪🇨",
  "Países Bajos":"🇳🇱","Japón":"🇯🇵","Suecia":"🇸🇪","Túnez":"🇹🇳",
  "Bélgica":"🇧🇪","Egipto":"🇪🇬","Irán":"🇮🇷","Nueva Zelanda":"🇳🇿",
  "España":"🇪🇸","Cabo Verde":"🇨🇻","Arabia Saudita":"🇸🇦","Uruguay":"🇺🇾",
  "Francia":"🇫🇷","Senegal":"🇸🇳","Irak":"🇮🇶","Noruega":"🇳🇴",
  "Argentina":"🇦🇷","Argelia":"🇩🇿","Austria":"🇦🇹","Jordania":"🇯🇴",
  "Portugal":"🇵🇹","RD Congo":"🇨🇩","Uzbekistán":"🇺🇿","Colombia":"🇨🇴",
  "Inglaterra":"🏴󠁧󠁢󠁥󠁮󠁧󠁿","Croacia":"🇭🇷","Ghana":"🇬🇭","Panamá":"🇵🇦",
};

const GROUP_COLORS = {
  A:"#e74c3c",B:"#e67e22",C:"#f1c40f",D:"#2ecc71",
  E:"#1abc9c",F:"#3498db",G:"#9b59b6",H:"#e91e8c",
  I:"#ff6b35",J:"#00bcd4",K:"#8bc34a",L:"#ff5722",
};

const STORAGE_KEY = "mundial2026_scores_v2";
const POLLA_STORAGE_KEY = "mundial2026_polla_v1";

function useIsMobile() {
  const [mobile, setMobile] = useState(window.innerWidth < 600);
  useEffect(() => {
    const fn = () => setMobile(window.innerWidth < 600);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return mobile;
}

function ScoreInput({ value, onChange }) {
  return (
    <input
      type="number" min="0" max="30"
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder="–"
      style={{
        width: 40, height: 38, textAlign: "center",
        fontSize: 17, fontWeight: 800,
        background: value !== "" ? "#fff9e6" : "#f4f4f8",
        border: value !== "" ? "2px solid #f4c430" : "2px solid #dde",
        borderRadius: 8, outline: "none",
        color: "#1a1a2e", fontFamily: "'Courier New', monospace",
        MozAppearance: "textfield", WebkitAppearance: "none",
        touchAction: "manipulation",
      }}
    />
  );
}

function MatchRow({ matchKey, teamA, teamB, date, scoreA, scoreB, onScoreChange, color }) {
  const played = scoreA !== "" && scoreB !== "";
  const sa = parseInt(scoreA), sb = parseInt(scoreB);
  const result = played ? (sa > sb ? "A" : sa < sb ? "B" : "D") : null;

  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 6,
      padding: "9px 10px", borderRadius: 10, marginBottom: 5,
      background: played ? "#fff" : "rgba(255,255,255,0.72)",
      border: `1px solid ${played ? color+"55" : "#e4e6ee"}`,
      boxShadow: played ? `0 2px 8px ${color}18` : "none",
    }}>
      <span style={{ fontSize: 10, color: "#999", width: 36, flexShrink: 0, fontFamily: "monospace" }}>{date}</span>

      <div style={{ flex: 1, display: "flex", justifyContent: "flex-end", overflow: "hidden" }}>
        <span style={{
          fontSize: 12, fontWeight: result === "A" ? 800 : 500,
          color: result === "A" ? "#111" : "#444",
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
          maxWidth: "100%",
        }}>
          {FLAG_EMOJIS[teamA]||"🏳"} {teamA}
        </span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 3, flexShrink: 0 }}>
        <ScoreInput value={scoreA} onChange={v => onScoreChange(matchKey, "A", v)} />
        <span style={{ color: "#bbb", fontWeight: 700, fontSize: 15, userSelect: "none" }}>:</span>
        <ScoreInput value={scoreB} onChange={v => onScoreChange(matchKey, "B", v)} />
      </div>

      <div style={{ flex: 1, overflow: "hidden" }}>
        <span style={{
          fontSize: 12, fontWeight: result === "B" ? 800 : 500,
          color: result === "B" ? "#111" : "#444",
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
          display: "block",
        }}>
          {FLAG_EMOJIS[teamB]||"🏳"} {teamB}
        </span>
      </div>
    </div>
  );
}

function StandingsTable({ group, teams, scores }) {
  const stats = {};
  teams.forEach(t => { stats[t] = { pts:0,pj:0,pg:0,pe:0,pp:0,gf:0,gc:0 }; });
  GROUP_MATCHES[group].forEach((m, i) => {
    const key = `${group}_${i}`;
    const [tA, tB] = m.match.split(" vs ");
    const sA = scores[key]?.A, sB = scores[key]?.B;
    if (sA!==""&&sB!==""&&sA!==undefined&&sB!==undefined) {
      const a=parseInt(sA),b=parseInt(sB);
      stats[tA].pj++; stats[tB].pj++;
      stats[tA].gf+=a; stats[tA].gc+=b;
      stats[tB].gf+=b; stats[tB].gc+=a;
      if(a>b){stats[tA].pts+=3;stats[tA].pg++;stats[tB].pp++;}
      else if(a<b){stats[tB].pts+=3;stats[tB].pg++;stats[tA].pp++;}
      else{stats[tA].pts++;stats[tB].pts++;stats[tA].pe++;stats[tB].pe++;}
    }
  });
  const sorted=[...teams].sort((a,b)=>{
    if(stats[b].pts!==stats[a].pts) return stats[b].pts-stats[a].pts;
    return (stats[b].gf-stats[b].gc)-(stats[a].gf-stats[a].gc);
  });

  return (
    <div style={{ marginTop:10, overflowX:"auto", WebkitOverflowScrolling:"touch" }}>
      <table style={{ width:"100%", borderCollapse:"collapse", fontSize:11, minWidth:260 }}>
        <thead>
          <tr style={{ background:"#f1f3f5" }}>
            {["#","Selección","PJ","G","E","P","GF","GC","DG","PTS"].map(h=>(
              <th key={h} style={{ padding:"5px 5px", textAlign:h==="Selección"?"left":"center", color:"#666", fontWeight:700, borderBottom:"2px solid #dee2e6", whiteSpace:"nowrap" }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map((team,i)=>{
            const s=stats[team], q=i<2;
            return (
              <tr key={team} style={{ background:q?"#f0fff4":i===2?"#fffbf0":"white", borderBottom:"1px solid #f1f3f5" }}>
                <td style={{ padding:"5px", textAlign:"center", fontWeight:700, color:q?"#2ecc71":"#bbb", fontSize:10 }}>{i+1}{q?"✓":i===2?"?":""}</td>
                <td style={{ padding:"5px 5px", fontWeight:q?700:400, fontSize:11, whiteSpace:"nowrap" }}>{FLAG_EMOJIS[team]||"🏳"} {team}</td>
                {[s.pj,s.pg,s.pe,s.pp,s.gf,s.gc,s.gf-s.gc,s.pts].map((v,j)=>(
                  <td key={j} style={{ padding:"5px", textAlign:"center", fontWeight:j===7?800:400, color:j===7?"#1a1a2e":"#555" }}>{v}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function GroupSection({ group, teams, scores, onScoreChange, expanded, onToggle }) {
  const color = GROUP_COLORS[group];
  const playedCount = GROUP_MATCHES[group].filter((_,i) => {
    const k=`${group}_${i}`; const s=scores[k];
    return s?.A!==""&&s?.B!==""&&s?.A!==undefined&&s?.B!==undefined;
  }).length;

  return (
    <div style={{ borderRadius:14, overflow:"hidden", boxShadow:"0 2px 14px rgba(0,0,0,0.09)", background:"white", border:`1px solid ${color}33` }}>
      <button onClick={onToggle} style={{
        width:"100%", display:"flex", alignItems:"center", justifyContent:"space-between",
        padding:"13px 16px", background:`linear-gradient(135deg,${color}20,${color}0a)`,
        border:"none", cursor:"pointer", borderBottom: expanded?`2px solid ${color}44`:"none",
        WebkitTapHighlightColor:"transparent",
      }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ width:34,height:34,borderRadius:9,background:color,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,fontSize:15,color:"white",flexShrink:0 }}>{group}</div>
          <div style={{ textAlign:"left" }}>
            <div style={{ fontWeight:700,fontSize:13,color:"#1a1a2e",lineHeight:1.3 }}>
              {teams.map(t=>FLAG_EMOJIS[t]||"🏳").join(" ")}
            </div>
            <div style={{ fontSize:10,color:"#999",marginTop:1 }}>{playedCount}/6 jugados</div>
          </div>
        </div>
        <div style={{ display:"flex",alignItems:"center",gap:8 }}>
          <div style={{ background:playedCount===6?"#2ecc71":color,color:"white",borderRadius:20,padding:"2px 10px",fontSize:11,fontWeight:700 }}>{playedCount}/6</div>
          <span style={{ color:color,fontSize:16,display:"inline-block",transform:expanded?"rotate(180deg)":"none",transition:"transform 0.2s" }}>▾</span>
        </div>
      </button>

      {expanded && (
        <div style={{ padding:"12px 14px" }}>
          {GROUP_MATCHES[group].map((m,i)=>{
            const [tA,tB]=m.match.split(" vs "), key=`${group}_${i}`;
            return (
              <MatchRow key={key} matchKey={key} teamA={tA} teamB={tB} date={m.date}
                scoreA={scores[key]?.A??""} scoreB={scores[key]?.B??""}
                onScoreChange={onScoreChange} color={color} />
            );
          })}
          <StandingsTable group={group} teams={teams} scores={scores} />
        </div>
      )}
    </div>
  );
}

function KOMatch({ matchKey, scores, onScoreChange }) {
  const sA = scores[matchKey]?.A ?? "";
  const sB = scores[matchKey]?.B ?? "";
  const nameA = scores[`${matchKey}_nameA`]?.A ?? "";
  const nameB = scores[`${matchKey}_nameB`]?.B ?? "";
  const played = sA!==""&&sB!=="";

  return (
    <div style={{ background:played?"#fff":"rgba(255,255,255,0.05)", borderRadius:10, padding:"10px 12px", border:`1px solid ${played?"#f4c43055":"#1e2240"}`, marginBottom:6 }}>
      <div style={{ display:"flex", alignItems:"center", gap:6 }}>
        <input type="text" placeholder="Equipo A" value={nameA}
          onChange={e=>onScoreChange(`${matchKey}_nameA`,"A",e.target.value)}
          style={{ flex:1,background:"rgba(255,255,255,0.07)",border:"1px solid #2a2d4a",borderRadius:6,padding:"5px 7px",color:played?"#111":"#ccc",fontSize:11,outline:"none",minWidth:0 }} />
        <ScoreInput value={sA} onChange={v=>onScoreChange(matchKey,"A",v)} />
        <span style={{ color:"#555",fontWeight:700,userSelect:"none" }}>:</span>
        <ScoreInput value={sB} onChange={v=>onScoreChange(matchKey,"B",v)} />
        <input type="text" placeholder="Equipo B" value={nameB}
          onChange={e=>onScoreChange(`${matchKey}_nameB`,"B",e.target.value)}
          style={{ flex:1,background:"rgba(255,255,255,0.07)",border:"1px solid #2a2d4a",borderRadius:6,padding:"5px 7px",color:played?"#111":"#ccc",fontSize:11,outline:"none",minWidth:0 }} />
      </div>
    </div>
  );
}

function PollaTab({ isMobile, scores }) {
  const [pollas, setPollas] = useState([]);
  const [newPlayerName, setNewPlayerName] = useState("");
  const [pollaName, setPollaName] = useState("Polla 2026");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(POLLA_STORAGE_KEY);
      if (saved) setPollas(JSON.parse(saved));
    } catch (e) {}
  }, []);

  const savePollas = (updatedPollas) => {
    try {
      localStorage.setItem(POLLA_STORAGE_KEY, JSON.stringify(updatedPollas));
      setPollas(updatedPollas);
    } catch (e) {}
  };

  const addPlayer = () => {
    if (newPlayerName.trim()) {
      const newPollas = [...pollas, { id: Date.now(), name: newPlayerName, points: 0, createdAt: new Date().toISOString() }];
      savePollas(newPollas);
      setNewPlayerName("");
    }
  };

  const deletePlayer = (id) => {
    const updated = pollas.filter(p => p.id !== id);
    savePollas(updated);
  };

  const calculatePoints = (player) => {
    let pts = 0;
    Object.keys(scores).forEach(k => {
      if (k.includes("name")) return;
      const s = scores[k];
      if (s?.A !== "" && s?.B !== "" && s?.A !== undefined && s?.B !== undefined) {
        const a = parseInt(s.A), b = parseInt(s.B);
        if (a > b) pts += 3;
        else if (a === b) pts += 1;
      }
    });
    return pts;
  };

  const sortedPollas = [...pollas].sort((a, b) => calculatePoints(b) - calculatePoints(a));

  return (
    <div>
      {/* Agregar participante */}
      <div style={{ background: "#1e2240", borderRadius: 12, padding: "16px", marginBottom: 20 }}>
        <h3 style={{ margin: "0 0 12px 0", color: "#f4c430", fontSize: 14, fontWeight: 700 }}>📝 Agregar Participante</h3>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <input
            type="text"
            placeholder="Nombre del jugador"
            value={newPlayerName}
            onChange={e => setNewPlayerName(e.target.value)}
            onKeyPress={e => e.key === "Enter" && addPlayer()}
            style={{
              flex: 1, minWidth: 150, padding: "10px 12px", borderRadius: 8,
              border: "1px solid #2a2d4a", background: "rgba(255,255,255,0.05)",
              color: "#fff", fontSize: 12, outline: "none"
            }}
          />
          <button
            onClick={addPlayer}
            style={{
              padding: "10px 18px", borderRadius: 8, border: "none",
              background: "#f4c430", color: "#1a1a2e", fontWeight: 700,
              fontSize: 12, cursor: "pointer"
            }}
          >
            + Agregar
          </button>
        </div>
      </div>

      {/* Ranking */}
      <div style={{ background: "rgba(255,255,255,0.02)", borderRadius: 12, overflow: "hidden", border: "1px solid #1e2240" }}>
        <div style={{ background: "#f4c43020", padding: "14px 16px", borderBottom: "1px solid #1e2240" }}>
          <h3 style={{ margin: 0, color: "#f4c430", fontSize: 14, fontWeight: 700 }}>🏆 Ranking de Participantes</h3>
        </div>

        {sortedPollas.length === 0 ? (
          <div style={{ padding: "40px 16px", textAlign: "center", color: "#666" }}>
            <p style={{ fontSize: 12, margin: 0 }}>No hay participantes aún. ¡Agrega uno!</p>
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
              <thead>
                <tr style={{ background: "#1e2240" }}>
                  <th style={{ padding: "12px", textAlign: "center", color: "#f4c430", fontWeight: 700, width: 40 }}>#</th>
                  <th style={{ padding: "12px", textAlign: "left", color: "#f4c430", fontWeight: 700 }}>Jugador</th>
                  <th style={{ padding: "12px", textAlign: "center", color: "#f4c430", fontWeight: 700, width: 60 }}>Puntos</th>
                  <th style={{ padding: "12px", textAlign: "center", color: "#f4c430", fontWeight: 700, width: 50 }}>Acción</th>
                </tr>
              </thead>
              <tbody>
                {sortedPollas.map((player, idx) => {
                  const medal = idx === 0 ? "🥇" : idx === 1 ? "🥈" : idx === 2 ? "🥉" : "";
                  const pts = calculatePoints(player);
                  return (
                    <tr key={player.id} style={{ 
                      background: idx < 3 ? `rgba(244,196,48,${0.1 - idx * 0.03})` : "transparent",
                      borderBottom: "1px solid #1e2240"
                    }}>
                      <td style={{ padding: "12px", textAlign: "center", fontWeight: 700, color: "#f4c430" }}>
                        {medal || (idx + 1)}
                      </td>
                      <td style={{ padding: "12px", textAlign: "left", fontWeight: 600, color: idx < 3 ? "#f4c430" : "#ccc" }}>
                        {player.name}
                      </td>
                      <td style={{ padding: "12px", textAlign: "center", fontWeight: 800, color: idx < 3 ? "#f4c430" : "#999", fontSize: 14 }}>
                        {pts}
                      </td>
                      <td style={{ padding: "12px", textAlign: "center" }}>
                        <button
                          onClick={() => deletePlayer(player.id)}
                          style={{
                            padding: "6px 10px", borderRadius: 6, border: "1px solid #e74c3c",
                            background: "transparent", color: "#e74c3c", fontSize: 11,
                            cursor: "pointer", fontWeight: 600
                          }}
                        >
                          ✕
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Info */}
      <div style={{ marginTop: 20, padding: "12px 14px", background: "rgba(52,152,219,0.1)", borderRadius: 8, borderLeft: "3px solid #3498db" }}>
        <p style={{ margin: 0, fontSize: 11, color: "#999", lineHeight: 1.5 }}>
          💡 Los puntos se calculan automáticamente basado en tus predicciones:
          <br />• +3 puntos por acertar un ganador
          <br />• +1 punto por acertar un empate
          <br />• El ranking se actualiza en tiempo real
        </p>
      </div>
    </div>
  );
}

export default function Mundial2026() {
  const [scores, setScores] = useState({});
  const [expandedGroups, setExpandedGroups] = useState({ A:true });
  const [activeTab, setActiveTab] = useState("grupos");
  const [saved, setSaved] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    try { const s=localStorage.getItem(STORAGE_KEY); if(s) setScores(JSON.parse(s)); } catch(e){}
  },[]);

  const handleScoreChange = (key,side,value) => {
    setScores(prev=>{
      const next={...prev,[key]:{...(prev[key]||{}),[side]:value}};
      try { localStorage.setItem(STORAGE_KEY,JSON.stringify(next)); } catch(e){}
      setSaved(true); setTimeout(()=>setSaved(false),1500);
      return next;
    });
  };

  const toggleGroup = g => setExpandedGroups(prev=>({...prev,[g]:!prev[g]}));
  const expandAll  = () => { const a={}; Object.keys(GROUPS).forEach(g=>a[g]=true); setExpandedGroups(a); };
  const collapseAll= () => setExpandedGroups({});

  const totalPlayed = Object.keys(scores).filter(k=>{
    const s=scores[k]; return !k.includes("name")&&s?.A!==""&&s?.B!==""&&s?.A!==undefined&&s?.B!==undefined;
  }).length;

  const KO_ROUNDS = [
    { title:"16avos de Final",  prefix:"r32",  count:16, dates:"28 jun – 3 jul"  },
    { title:"Octavos de Final", prefix:"r16",  count:8,  dates:"4 – 7 jul"       },
    { title:"Cuartos de Final", prefix:"qf",   count:4,  dates:"9 – 11 jul"      },
    { title:"Semifinales",      prefix:"sf",   count:2,  dates:"14 – 15 jul"     },
    { title:"Final 🏆",         prefix:"final",count:1,  dates:"19 jul • Nueva Jersey" },
  ];

  return (
    <div style={{ minHeight:"100vh", background:"linear-gradient(160deg,#0a0e27 0%,#1a1a3e 40%,#0d2137 100%)", fontFamily:"'Segoe UI',system-ui,sans-serif" }}>

      {/* ── HEADER ── */}
      <div style={{ background:"linear-gradient(135deg,#c8002a 0%,#006233 100%)", padding:"18px 16px 14px", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute",top:-30,right:-30,width:120,height:120,borderRadius:"50%",background:"rgba(255,255,255,0.05)" }}/>
        <div style={{ maxWidth:900,margin:"0 auto" }}>
          <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:10 }}>
            <div style={{ fontSize:isMobile?30:38 }}>🏆</div>
            <div>
              <h1 style={{ margin:0,color:"white",fontSize:isMobile?17:22,fontWeight:900,letterSpacing:-0.5,lineHeight:1.2 }}>COPA MUNDIAL FIFA 2026</h1>
              <p style={{ margin:0,color:"rgba(255,255,255,0.75)",fontSize:isMobile?10:12,marginTop:2 }}>
                🇺🇸 EE.UU. · 🇨🇦 Canadá · 🇲🇽 México &nbsp;|&nbsp; 11 jun – 19 jul
              </p>
            </div>
          </div>
          <div style={{ display:"flex",gap:8,flexWrap:"wrap" }}>
            {[["48 selecciones","rgba(255,255,255,0.18)","white"],["104 partidos","rgba(255,255,255,0.18)","white"],[`⚽ ${totalPlayed} cargados`,"rgba(244,196,48,0.9)","#1a1a2e"]].map(([label,bg,color])=>(
              <div key={label} style={{ background:bg,borderRadius:20,padding:"3px 12px",color,fontSize:11,fontWeight:700 }}>{label}</div>
            ))}
            {saved&&<div style={{ background:"rgba(46,204,113,0.9)",borderRadius:20,padding:"3px 12px",color:"white",fontSize:11,fontWeight:600 }}>✓ Guardado</div>}
          </div>
        </div>
      </div>

      {/* ── TABS ── */}
      <div style={{ background:"#111327",borderBottom:"1px solid #1e2240",display:"flex",maxWidth:900,margin:"0 auto",overflowX:"auto" }}>
        {[["grupos","⚽ Grupos"],["eliminatoria","🏆 Eliminatoria"],["polla","🎲 Polla"]].map(([tab,label])=>(
          <button key={tab} onClick={()=>setActiveTab(tab)} style={{
            padding:"11px 18px",border:"none",background:"transparent",whiteSpace:"nowrap",
            color:activeTab===tab?"#f4c430":"#777",fontWeight:activeTab===tab?700:500,fontSize:13,
            cursor:"pointer",borderBottom:activeTab===tab?"3px solid #f4c430":"3px solid transparent",
            WebkitTapHighlightColor:"transparent",
          }}>{label}</button>
        ))}
      </div>

      {/* ── CONTENT ── */}
      <div style={{ maxWidth:900,margin:"0 auto",padding:isMobile?"12px 10px 48px":"16px 14px 48px" }}>

        {activeTab==="grupos" && (
          <>
            <div style={{ display:"flex",gap:8,marginBottom:14,alignItems:"center",flexWrap:"wrap" }}>
              <button onClick={expandAll}   style={{ padding:"7px 14px",borderRadius:8,border:"1px solid #2a2d4a",background:"#1e2240",color:"#aaa",fontSize:12,cursor:"pointer" }}>↕ Expandir todo</button>
              <button onClick={collapseAll} style={{ padding:"7px 14px",borderRadius:8,border:"1px solid #2a2d4a",background:"#1e2240",color:"#aaa",fontSize:12,cursor:"pointer" }}>↕ Colapsar todo</button>
              <span style={{ marginLeft:"auto",fontSize:11,color:"#444" }}>💾 auto-guardado</span>
            </div>

            <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2,1fr)", gap:12 }}>
              {Object.entries(GROUPS).map(([g,teams])=>(
                <GroupSection key={g} group={g} teams={teams} scores={scores}
                  onScoreChange={handleScoreChange}
                  expanded={!!expandedGroups[g]} onToggle={()=>toggleGroup(g)} />
              ))}
            </div>
          </>
        )}

        {activeTab==="eliminatoria" && (
          <div>
            <p style={{ color:"#666",fontSize:12,marginBottom:18,textAlign:"center" }}>
              Anotá los cruces de la fase eliminatoria a medida que se definen.<br/>
              <span style={{ color:"#f4c430",fontWeight:700 }}>Escribí los nombres de los equipos y los resultados.</span>
            </p>
            {KO_ROUNDS.map(({ title,prefix,count,dates })=>(
              <div key={prefix} style={{ marginBottom:22 }}>
                <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:10 }}>
                  <div style={{ height:3,width:4,background:"#f4c430",borderRadius:2 }}/>
                  <h3 style={{ margin:0,fontSize:13,fontWeight:800,color:"#f4c430",textTransform:"uppercase",letterSpacing:0.8 }}>{title}</h3>
                  <span style={{ fontSize:11,color:"#555",fontStyle:"italic" }}>{dates}</span>
                </div>
                <div style={{ display:"grid",gridTemplateColumns:isMobile?"1fr":count===1?"1fr":"repeat(2,1fr)",gap:8 }}>
                  {Array.from({length:count},(_,i)=>(
                    <KOMatch key={`${prefix}_${i}`} matchKey={`${prefix}_${i}`} scores={scores} onScoreChange={handleScoreChange} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab==="polla" && (
          <PollaTab isMobile={isMobile} scores={scores} />
        )}
      </div>

      {/* ── STICKY BOTTOM NAV on mobile ── */}
      {isMobile && (
        <div style={{ position:"fixed",bottom:0,left:0,right:0,background:"#0d1023",borderTop:"1px solid #1e2240",display:"flex",zIndex:100 }}>
          {[["grupos","⚽ Grupos"],["eliminatoria","🏆 Eliminatoria"],["polla","🎲 Polla"]].map(([tab,label])=>(
            <button key={tab} onClick={()=>setActiveTab(tab)} style={{
              flex:1,padding:"12px 0",border:"none",background:"transparent",
              color:activeTab===tab?"#f4c430":"#666",fontWeight:activeTab===tab?700:500,fontSize:12,
              cursor:"pointer",borderTop:activeTab===tab?"2px solid #f4c430":"2px solid transparent",
              WebkitTapHighlightColor:"transparent",
            }}>{label}</button>
          ))}
        </div>
      )}
    </div>
  );
}
