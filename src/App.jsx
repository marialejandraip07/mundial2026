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
const POLLA_STORAGE_KEY = "mundial2026_polla_v2";
const CURRENT_PLAYER_KEY = "mundial2026_current_player";

function useIsMobile() {
  const [mobile, setMobile] = useState(window.innerWidth < 600);
  useEffect(() => {
    const fn = () => setMobile(window.innerWidth < 600);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return mobile;
}

function ScoreInput({ value, onChange, small = false }) {
  return (
    <input
      type="number" min="0" max="30"
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder="–"
      style={{
        width: small ? 32 : 40, height: small ? 32 : 38, textAlign: "center",
        fontSize: small ? 14 : 17, fontWeight: 800,
        background: value !== "" ? "#fff9e6" : "#f4f4f8",
        border: value !== "" ? "2px solid #f4c430" : "2px solid #dde",
        borderRadius: 6, outline: "none",
        color: "#1a1a2e", fontFamily: "'Courier New', monospace",
        MozAppearance: "textfield", WebkitAppearance: "none",
        touchAction: "manipulation",
      }}
    />
  );
}

function MatchRow({ matchKey, teamA, teamB, date, scoreA, scoreB, onScoreChange, color, isMobile, isPredictor = false }) {
  const played = scoreA !== "" && scoreB !== "";
  const sa = parseInt(scoreA), sb = parseInt(scoreB);
  const result = played ? (sa > sb ? "A" : sa < sb ? "B" : "D") : null;

  return (
    <div style={{
      display: "flex", alignItems: "center", gap: isMobile ? 4 : 6,
      padding: isMobile ? "7px 8px" : "9px 10px", borderRadius: 10, marginBottom: 5,
      background: played ? "#fff" : "rgba(255,255,255,0.72)",
      border: `1px solid ${played ? color+"55" : "#e4e6ee"}`,
      boxShadow: played ? `0 2px 8px ${color}18` : "none",
      fontSize: isMobile ? 11 : 12,
    }}>
      <span style={{ fontSize: isMobile ? 9 : 10, color: "#999", width: 32, flexShrink: 0, fontFamily: "monospace" }}>{date}</span>

      <div style={{ flex: 1, display: "flex", justifyContent: "flex-end", overflow: "hidden", minWidth: 0 }}>
        <span style={{
          fontSize: isMobile ? 11 : 12, fontWeight: result === "A" ? 800 : 500,
          color: result === "A" ? "#111" : "#444",
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
          maxWidth: "100%",
        }}>
          {FLAG_EMOJIS[teamA]||"🏳"} {teamA}
        </span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 2, flexShrink: 0 }}>
        <ScoreInput value={scoreA} onChange={v => onScoreChange(matchKey, "A", v)} small={isMobile} />
        <span style={{ color: "#bbb", fontWeight: 700, fontSize: isMobile ? 12 : 15, userSelect: "none" }}>:</span>
        <ScoreInput value={scoreB} onChange={v => onScoreChange(matchKey, "B", v)} small={isMobile} />
      </div>

      <div style={{ flex: 1, overflow: "hidden", minWidth: 0 }}>
        <span style={{
          fontSize: isMobile ? 11 : 12, fontWeight: result === "B" ? 800 : 500,
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

function GroupSection({ group, teams, scores, onScoreChange, expanded, onToggle, isMobile }) {
  const color = GROUP_COLORS[group];
  const playedCount = GROUP_MATCHES[group].filter((_,i) => {
    const k=`${group}_${i}`; const s=scores[k];
    return s?.A!==""&&s?.B!==""&&s?.A!==undefined&&s?.B!==undefined;
  }).length;

  return (
    <div style={{ borderRadius:14, overflow:"hidden", boxShadow:"0 2px 14px rgba(0,0,0,0.09)", background:"white", border:`1px solid ${color}33` }}>
      <button onClick={onToggle} style={{
        width:"100%", display:"flex", alignItems:"center", justifyContent:"space-between",
        padding:isMobile?"11px 12px":"13px 16px", background:`linear-gradient(135deg,${color}20,${color}0a)`,
        border:"none", cursor:"pointer", borderBottom: expanded?`2px solid ${color}44`:"none",
        WebkitTapHighlightColor:"transparent",
      }}>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <div style={{ width:32,height:32,borderRadius:8,background:color,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,fontSize:14,color:"white",flexShrink:0 }}>{group}</div>
          <div style={{ textAlign:"left" }}>
            <div style={{ fontWeight:700,fontSize:isMobile?12:13,color:"#1a1a2e",lineHeight:1.3 }}>
              {teams.map(t=>FLAG_EMOJIS[t]||"🏳").join(" ")}
            </div>
            <div style={{ fontSize:9,color:"#999",marginTop:1 }}>{playedCount}/6</div>
          </div>
        </div>
        <div style={{ display:"flex",alignItems:"center",gap:6 }}>
          <div style={{ background:playedCount===6?"#2ecc71":color,color:"white",borderRadius:20,padding:"2px 8px",fontSize:10,fontWeight:700 }}>{playedCount}</div>
          <span style={{ color:color,fontSize:14,display:"inline-block",transform:expanded?"rotate(180deg)":"none",transition:"transform 0.2s" }}>▾</span>
        </div>
      </button>

      {expanded && (
        <div style={{ padding:isMobile?"10px 10px":"12px 14px" }}>
          {GROUP_MATCHES[group].map((m,i)=>{
            const [tA,tB]=m.match.split(" vs "), key=`${group}_${i}`;
            return (
              <MatchRow key={key} matchKey={key} teamA={tA} teamB={tB} date={m.date}
                scoreA={scores[key]?.A??""} scoreB={scores[key]?.B??""}
                onScoreChange={onScoreChange} color={color} isMobile={isMobile} />
            );
          })}
          <StandingsTable group={group} teams={teams} scores={scores} />
        </div>
      )}
    </div>
  );
}

function KOMatchCompact({ matchKey, scores, onScoreChange, isMobile }) {
  const sA = scores[matchKey]?.A ?? "";
  const sB = scores[matchKey]?.B ?? "";
  const nameA = scores[`${matchKey}_nameA`]?.A ?? "";
  const nameB = scores[`${matchKey}_nameB`]?.B ?? "";
  const played = sA!==""&&sB!=="";

  return (
    <div style={{ background:played?"#fff":"rgba(255,255,255,0.05)", borderRadius:10, padding:isMobile?"8px":"10px 12px", border:`1px solid ${played?"#f4c43055":"#1e2240"}`, marginBottom:6 }}>
      <div style={{ display:"flex", alignItems:"center", gap:isMobile?4:6, flexWrap:isMobile?"wrap":"nowrap" }}>
        <input type="text" placeholder="A" value={nameA}
          onChange={e=>onScoreChange(`${matchKey}_nameA`,"A",e.target.value)}
          style={{ flex:isMobile?0.8:1, minWidth:isMobile?50:0, padding:isMobile?"6px 6px":"5px 7px", borderRadius:6, fontSize:isMobile?10:11, border:"1px solid #2a2d4a",background:"rgba(255,255,255,0.07)",color:played?"#111":"#ccc",outline:"none" }} />
        <ScoreInput value={sA} onChange={v=>onScoreChange(matchKey,"A",v)} small={isMobile} />
        <span style={{ color:"#bbb",fontWeight:700,userSelect:"none",fontSize:isMobile?12:13 }}>:</span>
        <ScoreInput value={sB} onChange={v=>onScoreChange(matchKey,"B",v)} small={isMobile} />
        <input type="text" placeholder="B" value={nameB}
          onChange={e=>onScoreChange(`${matchKey}_nameB`,"B",e.target.value)}
          style={{ flex:isMobile?0.8:1, minWidth:isMobile?50:0, padding:isMobile?"6px 6px":"5px 7px", borderRadius:6, fontSize:isMobile?10:11, border:"1px solid #2a2d4a",background:"rgba(255,255,255,0.07)",color:played?"#111":"#ccc",outline:"none" }} />
      </div>
    </div>
  );
}

function PollaTab({ isMobile, scores }) {
  const [pollas, setPollas] = useState([]);
  const [newPlayerName, setNewPlayerName] = useState("");

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
      const newPollas = [...pollas, { id: Date.now(), name: newPlayerName }];
      savePollas(newPollas);
      setNewPlayerName("");
    }
  };

  const deletePlayer = (id) => {
    const updated = pollas.filter(p => p.id !== id);
    savePollas(updated);
  };

  const calculatePoints = (playerId) => {
    let pts = 0;
    let correctMarkers = 0;
    let correctWinner = 0;
    
    Object.keys(GROUP_MATCHES).forEach(group => {
      GROUP_MATCHES[group].forEach((m, i) => {
        const matchKey = `${group}_${i}`;
        const realScore = scores[matchKey];
        
        if (realScore?.A !== "" && realScore?.B !== "" && realScore?.A !== undefined && realScore?.B !== undefined) {
          const predKey = `pred_${playerId}_${matchKey}`;
          const prediction = scores[predKey];
          
          if (prediction?.A !== "" && prediction?.B !== "" && prediction?.A !== undefined && prediction?.B !== undefined) {
            const realA = parseInt(realScore.A);
            const realB = parseInt(realScore.B);
            const predA = parseInt(prediction.A);
            const predB = parseInt(prediction.B);
            
            // +3 si acierta marcador exacto
            if (realA === predA && realB === predB) {
              pts += 3;
              correctMarkers++;
            } 
            // +2 si acierta ganador
            else if ((realA > realB && predA > predB) || (realA < realB && predA < predB) || (realA === realB && predA === predB)) {
              pts += 2;
              correctWinner++;
            }
          }
        }
      });
    });
    
    return { total: pts, markers: correctMarkers, winner: correctWinner };
  };

  const sortedPollas = [...pollas].sort((a, b) => calculatePoints(b.id).total - calculatePoints(a.id).total);

  return (
    <div>
      <div style={{ background: "#1e2240", borderRadius: 12, padding: "14px", marginBottom: 16 }}>
        <h3 style={{ margin: "0 0 10px 0", color: "#f4c430", fontSize: 13, fontWeight: 700 }}>📝 Agregar Participante</h3>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          <input
            type="text"
            placeholder="Nombre del jugador"
            value={newPlayerName}
            onChange={e => setNewPlayerName(e.target.value)}
            onKeyPress={e => e.key === "Enter" && addPlayer()}
            style={{
              flex: 1, minWidth: 140, padding: "8px 10px", borderRadius: 6,
              border: "1px solid #2a2d4a", background: "rgba(255,255,255,0.05)",
              color: "#fff", fontSize: 11, outline: "none"
            }}
          />
          <button
            onClick={addPlayer}
            style={{
              padding: "8px 14px", borderRadius: 6, border: "none",
              background: "#f4c430", color: "#1a1a2e", fontWeight: 700,
              fontSize: 11, cursor: "pointer", whiteSpace: "nowrap"
            }}
          >
            + Agregar
          </button>
        </div>
      </div>

      <div style={{ background: "rgba(255,255,255,0.02)", borderRadius: 12, overflow: "hidden", border: "1px solid #1e2240" }}>
        <div style={{ background: "#f4c43020", padding: "12px 14px", borderBottom: "1px solid #1e2240" }}>
          <h3 style={{ margin: 0, color: "#f4c430", fontSize: 13, fontWeight: 700 }}>🏆 Ranking</h3>
        </div>

        {sortedPollas.length === 0 ? (
          <div style={{ padding: "30px 16px", textAlign: "center", color: "#666" }}>
            <p style={{ fontSize: 12, margin: 0 }}>No hay participantes. ¡Agrega uno!</p>
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11, minWidth: "100%" }}>
              <thead>
                <tr style={{ background: "#1e2240" }}>
                  <th style={{ padding: "10px 8px", textAlign: "center", color: "#f4c430", fontWeight: 700, width: 35 }}>#</th>
                  <th style={{ padding: "10px 8px", textAlign: "left", color: "#f4c430", fontWeight: 700, flex: 1 }}>Jugador</th>
                  <th style={{ padding: "10px 8px", textAlign: "center", color: "#f4c430", fontWeight: 700, width: 50 }}>Pts</th>
                  <th style={{ padding: "10px 8px", textAlign: "center", color: "#f4c430", fontWeight: 700, width: 45 }}>Acc</th>
                </tr>
              </thead>
              <tbody>
                {sortedPollas.map((player, idx) => {
                  const medal = idx === 0 ? "🥇" : idx === 1 ? "🥈" : idx === 2 ? "🥉" : "";
                  const pts = calculatePoints(player.id).total;
                  return (
                    <tr key={player.id} style={{ 
                      background: idx < 3 ? `rgba(244,196,48,${0.1 - idx * 0.03})` : "transparent",
                      borderBottom: "1px solid #1e2240"
                    }}>
                      <td style={{ padding: "10px 8px", textAlign: "center", fontWeight: 700, color: "#f4c430" }}>
                        {medal || (idx + 1)}
                      </td>
                      <td style={{ padding: "10px 8px", textAlign: "left", fontWeight: 600, color: idx < 3 ? "#f4c430" : "#ccc", display:"flex",alignItems:"center",gap:6 }}>
                        {player.name}
                      </td>
                      <td style={{ padding: "10px 8px", textAlign: "center", fontWeight: 800, color: idx < 3 ? "#f4c430" : "#999", fontSize: 13 }}>
                        {pts}
                      </td>
                      <td style={{ padding: "10px 4px", textAlign: "center" }}>
                        <button
                          onClick={() => deletePlayer(player.id)}
                          style={{
                            padding: "4px 8px", borderRadius: 4, border: "1px solid #e74c3c",
                            background: "transparent", color: "#e74c3c", fontSize: 10,
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

      <div style={{ marginTop: 14, padding: "10px 12px", background: "rgba(52,152,219,0.1)", borderRadius: 8, borderLeft: "3px solid #3498db" }}>
        <p style={{ margin: 0, fontSize: 10, color: "#999", lineHeight: 1.4 }}>
          💡 +3 pts: Marcador exacto | +2 pts: Solo ganador | +0: Error
        </p>
      </div>
    </div>
  );
}

function MyPredictionsTab({ isMobile, scores, onScoreChange, pollas, currentPlayerId, setCurrentPlayerId }) {
  const [expandedGroups, setExpandedGroups] = useState({ A: true });

  if (!currentPlayerId || !pollas.find(p => p.id === currentPlayerId)) {
    return (
      <div style={{ textAlign: "center", padding: "30px 16px" }}>
        <p style={{ color: "#999", fontSize: 12 }}>Selecciona un jugador en la POLLA para editar sus predicciones</p>
      </div>
    );
  }

  const currentPlayer = pollas.find(p => p.id === currentPlayerId);

  return (
    <div>
      <div style={{ background: "#1e2240", borderRadius: 12, padding: "12px", marginBottom: 14 }}>
        <div style={{ display: "flex", gap: 8, alignItems: "center", overflowX: "auto", paddingBottom: 4 }}>
          {pollas.map(player => (
            <button
              key={player.id}
              onClick={() => setCurrentPlayerId(player.id)}
              style={{
                padding: "8px 12px", borderRadius: 8, border: "none",
                background: currentPlayerId === player.id ? "#f4c430" : "#2a2d4a",
                color: currentPlayerId === player.id ? "#1a1a2e" : "#aaa",
                fontWeight: currentPlayerId === player.id ? 700 : 500,
                fontSize: 11, cursor: "pointer", whiteSpace: "nowrap"
              }}
            >
              {player.name}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 12, alignItems: "center", flexWrap: "wrap" }}>
        <button onClick={() => { const a={}; Object.keys(GROUP_MATCHES).forEach(g=>a[g]=true); setExpandedGroups(a); }} style={{ padding:"6px 10px",borderRadius:6,border:"1px solid #2a2d4a",background:"#1e2240",color:"#aaa",fontSize:10,cursor:"pointer" }}>↕ Exp</button>
        <button onClick={() => setExpandedGroups({})} style={{ padding:"6px 10px",borderRadius:6,border:"1px solid #2a2d4a",background:"#1e2240",color:"#aaa",fontSize:10,cursor:"pointer" }}>↕ Col</button>
        <span style={{ marginLeft:"auto",fontSize:10,color:"#444" }}>📋 Mis predicciones</span>
      </div>

      <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2,1fr)", gap:10 }}>
        {Object.entries(GROUP_MATCHES).map(([group, matches]) => {
          const color = GROUP_COLORS[group];
          const expanded = !!expandedGroups[group];
          
          return (
            <div key={group} style={{ borderRadius:14, overflow:"hidden", boxShadow:"0 2px 14px rgba(0,0,0,0.09)", background:"white", border:`1px solid ${color}33` }}>
              <button onClick={() => setExpandedGroups(prev=>({...prev,[group]:!prev[group]}))} style={{
                width:"100%", display:"flex", alignItems:"center", justifyContent:"space-between",
                padding:isMobile?"11px 12px":"13px 16px", background:`linear-gradient(135deg,${color}20,${color}0a)`,
                border:"none", cursor:"pointer", borderBottom: expanded?`2px solid ${color}44`:"none",
                WebkitTapHighlightColor:"transparent",
              }}>
                <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                  <div style={{ width:32,height:32,borderRadius:8,background:color,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,fontSize:14,color:"white",flexShrink:0 }}>{group}</div>
                  <div style={{ textAlign:"left" }}>
                    <div style={{ fontWeight:700,fontSize:isMobile?12:13,color:"#1a1a2e" }}>Mis predicciones</div>
                  </div>
                </div>
                <span style={{ color:color,fontSize:14,display:"inline-block",transform:expanded?"rotate(180deg)":"none",transition:"transform 0.2s" }}>▾</span>
              </button>

              {expanded && (
                <div style={{ padding:isMobile?"10px 10px":"12px 14px" }}>
                  {matches.map((m, i) => {
                    const [tA, tB] = m.match.split(" vs ");
                    const matchKey = `${group}_${i}`;
                    const predKey = `pred_${currentPlayerId}_${matchKey}`;
                    return (
                      <MatchRow
                        key={matchKey}
                        matchKey={predKey}
                        teamA={tA}
                        teamB={tB}
                        date={m.date}
                        scoreA={scores[predKey]?.A ?? ""}
                        scoreB={scores[predKey]?.B ?? ""}
                        onScoreChange={onScoreChange}
                        color={color}
                        isMobile={isMobile}
                        isPredictor={true}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Mundial2026() {
  const [scores, setScores] = useState({});
  const [expandedGroups, setExpandedGroups] = useState({ A:true });
  const [activeTab, setActiveTab] = useState("grupos");
  const [saved, setSaved] = useState(false);
  const [pollas, setPollas] = useState([]);
  const [currentPlayerId, setCurrentPlayerId] = useState(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    try { 
      const s=localStorage.getItem(STORAGE_KEY); 
      if(s) setScores(JSON.parse(s)); 
      
      const p=localStorage.getItem(POLLA_STORAGE_KEY);
      if(p) setPollas(JSON.parse(p));
      
      const cp=localStorage.getItem(CURRENT_PLAYER_KEY);
      if(cp) setCurrentPlayerId(parseInt(cp));
    } catch(e){}
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
    const s=scores[k]; return !k.includes("name")&&!k.includes("pred_")&&s?.A!==""&&s?.B!==""&&s?.A!==undefined&&s?.B!==undefined;
  }).length;

  const handleSetCurrentPlayer = (id) => {
    setCurrentPlayerId(id);
    try { localStorage.setItem(CURRENT_PLAYER_KEY, id.toString()); } catch(e){}
  };

  const KO_ROUNDS = [
    { title:"16avos de Final",  prefix:"r32",  count:16, dates:"28 jun – 3 jul"  },
    { title:"Octavos de Final", prefix:"r16",  count:8,  dates:"4 – 7 jul"       },
    { title:"Cuartos de Final", prefix:"qf",   count:4,  dates:"9 – 11 jul"      },
    { title:"Semifinales",      prefix:"sf",   count:2,  dates:"14 – 15 jul"     },
    { title:"Final 🏆",         prefix:"final",count:1,  dates:"19 jul • Nueva Jersey" },
  ];

  return (
    <div style={{ minHeight:"100vh", background:"linear-gradient(160deg,#0a0e27 0%,#1a1a3e 40%,#0d2137 100%)", fontFamily:"'Segoe UI',system-ui,sans-serif", overflow:"hidden" }}>

      {/* ── HEADER ── */}
      <div style={{ background:"linear-gradient(135deg,#c8002a 0%,#006233 100%)", padding:"16px 14px 12px", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute",top:-30,right:-30,width:120,height:120,borderRadius:"50%",background:"rgba(255,255,255,0.05)" }}/>
        <div style={{ maxWidth:900,margin:"0 auto" }}>
          <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:8 }}>
            <div style={{ fontSize:isMobile?28:36 }}>🏆</div>
            <div>
              <h1 style={{ margin:0,color:"white",fontSize:isMobile?16:21,fontWeight:900,letterSpacing:-0.5,lineHeight:1.2 }}>FIFA 2026</h1>
              <p style={{ margin:0,color:"rgba(255,255,255,0.75)",fontSize:isMobile?9:11,marginTop:1 }}>
                🇺🇸 🇨🇦 🇲🇽 &nbsp;|&nbsp; 11 jun – 19 jul
              </p>
            </div>
          </div>
          <div style={{ display:"flex",gap:6,flexWrap:"wrap" }}>
            {[["48 selecciones","rgba(255,255,255,0.18)","white"],["104 partidos","rgba(255,255,255,0.18)","white"],[`⚽ ${totalPlayed}`,"rgba(244,196,48,0.9)","#1a1a2e"]].map(([label,bg,color])=>(
              <div key={label} style={{ background:bg,borderRadius:16,padding:"2px 10px",color,fontSize:10,fontWeight:700 }}>{label}</div>
            ))}
            {saved&&<div style={{ background:"rgba(46,204,113,0.9)",borderRadius:16,padding:"2px 10px",color:"white",fontSize:10,fontWeight:600 }}>✓</div>}
          </div>
        </div>
      </div>

      {/* ── TABS ── */}
      <div style={{ background:"#111327",borderBottom:"1px solid #1e2240",display:"flex",maxWidth:900,margin:"0 auto",overflowX:"auto" }}>
        {[["grupos","⚽ Grupos"],["eliminatoria","🏆 Elim"]].map(([tab,label])=>(
          <button key={tab} onClick={()=>setActiveTab(tab)} style={{
            padding:"10px 14px",border:"none",background:"transparent",whiteSpace:"nowrap",
            color:activeTab===tab?"#f4c430":"#777",fontWeight:activeTab===tab?700:500,fontSize:isMobile?10:11,
            cursor:"pointer",borderBottom:activeTab===tab?"3px solid #f4c430":"3px solid transparent",
            WebkitTapHighlightColor:"transparent",
          }}>{label}</button>
        ))}
      </div>

      {/* ── CONTENT ── */}
      <div style={{ maxWidth:900,margin:"0 auto",padding:isMobile?"10px 8px 50px":"14px 12px 40px",overflowX:"hidden" }}>

        {activeTab==="grupos" && (
          <>
            <div style={{ display:"flex",gap:6,marginBottom:12,alignItems:"center",flexWrap:"wrap" }}>
              <button onClick={expandAll}   style={{ padding:"6px 10px",borderRadius:6,border:"1px solid #2a2d4a",background:"#1e2240",color:"#aaa",fontSize:10,cursor:"pointer" }}>↕ Exp</button>
              <button onClick={collapseAll} style={{ padding:"6px 10px",borderRadius:6,border:"1px solid #2a2d4a",background:"#1e2240",color:"#aaa",fontSize:10,cursor:"pointer" }}>↕ Col</button>
              <span style={{ marginLeft:"auto",fontSize:10,color:"#444" }}>💾 Auto</span>
            </div>

            <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2,1fr)", gap:10 }}>
              {Object.entries(GROUPS).map(([g,teams])=>(
                <GroupSection key={g} group={g} teams={teams} scores={scores}
                  onScoreChange={handleScoreChange}
                  expanded={!!expandedGroups[g]} onToggle={()=>toggleGroup(g)} isMobile={isMobile} />
              ))}
            </div>
          </>
        )}

        {activeTab==="eliminatoria" && (
          <div>
            <p style={{ color:"#666",fontSize:11,marginBottom:14,textAlign:"center" }}>
              Predicciones eliminatoria<br/>
              <span style={{ color:"#f4c430",fontWeight:700,fontSize:10 }}>Los equipos se rellenan automáticamente</span>
            </p>
            {KO_ROUNDS.map(({ title,prefix,count,dates })=>(
              <div key={prefix} style={{ marginBottom:16 }}>
                <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:8 }}>
                  <div style={{ height:2,width:3,background:"#f4c430",borderRadius:1 }}/>
                  <h3 style={{ margin:0,fontSize:12,fontWeight:800,color:"#f4c430",textTransform:"uppercase",letterSpacing:0.5 }}>{title}</h3>
                  <span style={{ fontSize:9,color:"#555",fontStyle:"italic",marginLeft:"auto" }}>{dates}</span>
                </div>
                <div style={{ display:"grid",gridTemplateColumns:isMobile?"1fr":count===1?"1fr":"repeat(2,1fr)",gap:6 }}>
                  {Array.from({length:count},(_,i)=>(
                    <KOMatchCompact key={`${prefix}_${i}`} matchKey={`${prefix}_${i}`} scores={scores} onScoreChange={handleScoreChange} isMobile={isMobile} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab==="predicciones" && (
          <MyPredictionsTab isMobile={isMobile} scores={scores} onScoreChange={handleScoreChange} pollas={pollas} currentPlayerId={currentPlayerId} setCurrentPlayerId={handleSetCurrentPlayer} />
        )}

        {activeTab==="polla" && (
          <PollaTab isMobile={isMobile} scores={scores} />
        )}
      </div>

      {/* ── STICKY BOTTOM NAV on mobile ── */}
      {isMobile && (
        <div style={{ position:"fixed",bottom:0,left:0,right:0,background:"#0d1023",borderTop:"1px solid #1e2240",display:"flex",zIndex:100 }}>
          {[["grupos","⚽"],["eliminatoria","🏆"],["predicciones","📋"],["polla","🎲"]].map(([tab,label])=>(
            <button key={tab} onClick={()=>setActiveTab(tab)} style={{
              flex:1,padding:"10px 0",border:"none",background:"transparent",
              color:activeTab===tab?"#f4c430":"#666",fontWeight:activeTab===tab?700:500,fontSize:13,
              cursor:"pointer",borderTop:activeTab===tab?"2px solid #f4c430":"2px solid transparent",
              WebkitTapHighlightColor:"transparent",
            }}>{label}</button>
          ))}
        </div>
      )}
    </div>
  );
}
