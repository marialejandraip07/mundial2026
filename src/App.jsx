import { useState, useEffect, useCallback } from "react";
import { supabase } from "./lib/supabase";
import convertPreds from "./lib/convertPred";
import loadPreds from "./lib/loadPreds";
import buildScores from "./lib/buildScores";
 
const GROUPS = {
  A: ["México","Sudáfrica","Corea del Sur","Rep. Checa"],
  B: ["Canadá","Bosnia-Herzegovina","Qatar","Suiza"],
  C: ["Brasil","Marruecos","Haití","Escocia"],
  D: ["EE.UU.","Paraguay","Australia","Turquía"],
  E: ["Alemania","Curazao","Costa de Marfil","Ecuador"],
  F: ["Países Bajos","Japón","Suecia","Túnez"],
  G: ["Bélgica","Egipto","Irán","Nueva Zelanda"],
  H: ["España","Cabo Verde","Arabia Saudita","Uruguay"],
  I: ["Francia","Senegal","Irak","Noruega"],
  J: ["Argentina","Argelia","Austria","Jordania"],
  K: ["Portugal","RD Congo","Uzbekistán","Colombia"],
  L: ["Inglaterra","Croacia","Ghana","Panamá"],
};
 
const GROUP_MATCHES = {
  A:[{date:"11 jun",match:"México vs Sudáfrica"},{date:"11 jun",match:"Corea del Sur vs Rep. Checa"},{date:"17 jun",match:"México vs Corea del Sur"},{date:"17 jun",match:"Sudáfrica vs Rep. Checa"},{date:"22 jun",match:"Rep. Checa vs México"},{date:"22 jun",match:"Sudáfrica vs Corea del Sur"}],
  B:[{date:"12 jun",match:"Canadá vs Bosnia-Herzegovina"},{date:"13 jun",match:"Qatar vs Suiza"},{date:"18 jun",match:"Canadá vs Qatar"},{date:"18 jun",match:"Bosnia-Herzegovina vs Suiza"},{date:"23 jun",match:"Suiza vs Canadá"},{date:"23 jun",match:"Bosnia-Herzegovina vs Qatar"}],
  C:[{date:"13 jun",match:"Brasil vs Marruecos"},{date:"13 jun",match:"Haití vs Escocia"},{date:"19 jun",match:"Brasil vs Haití"},{date:"19 jun",match:"Marruecos vs Escocia"},{date:"24 jun",match:"Escocia vs Brasil"},{date:"24 jun",match:"Marruecos vs Haití"}],
  D:[{date:"12 jun",match:"EE.UU. vs Paraguay"},{date:"14 jun",match:"Australia vs Turquía"},{date:"19 jun",match:"EE.UU. vs Australia"},{date:"19 jun",match:"Paraguay vs Turquía"},{date:"24 jun",match:"Turquía vs EE.UU."},{date:"24 jun",match:"Paraguay vs Australia"}],
  E:[{date:"15 jun",match:"Alemania vs Curazao"},{date:"15 jun",match:"Costa de Marfil vs Ecuador"},{date:"20 jun",match:"Alemania vs Costa de Marfil"},{date:"20 jun",match:"Curazao vs Ecuador"},{date:"25 jun",match:"Ecuador vs Alemania"},{date:"25 jun",match:"Curazao vs Costa de Marfil"}],
  F:[{date:"14 jun",match:"Países Bajos vs Japón"},{date:"15 jun",match:"Suecia vs Túnez"},{date:"20 jun",match:"Países Bajos vs Suecia"},{date:"20 jun",match:"Japón vs Túnez"},{date:"25 jun",match:"Túnez vs Países Bajos"},{date:"25 jun",match:"Japón vs Suecia"}],
  G:[{date:"15 jun",match:"Bélgica vs Egipto"},{date:"16 jun",match:"Irán vs Nueva Zelanda"},{date:"21 jun",match:"Bélgica vs Irán"},{date:"21 jun",match:"Egipto vs Nueva Zelanda"},{date:"26 jun",match:"Nueva Zelanda vs Bélgica"},{date:"26 jun",match:"Egipto vs Irán"}],
  H:[{date:"14 jun",match:"España vs Cabo Verde"},{date:"16 jun",match:"Arabia Saudita vs Uruguay"},{date:"21 jun",match:"España vs Arabia Saudita"},{date:"21 jun",match:"Cabo Verde vs Uruguay"},{date:"26 jun",match:"Uruguay vs España"},{date:"26 jun",match:"Cabo Verde vs Arabia Saudita"}],
  I:[{date:"16 jun",match:"Francia vs Senegal"},{date:"16 jun",match:"Irak vs Noruega"},{date:"22 jun",match:"Francia vs Irak"},{date:"22 jun",match:"Senegal vs Noruega"},{date:"27 jun",match:"Noruega vs Francia"},{date:"27 jun",match:"Senegal vs Irak"}],
  J:[{date:"16 jun",match:"Argentina vs Argelia"},{date:"17 jun",match:"Austria vs Jordania"},{date:"22 jun",match:"Argentina vs Austria"},{date:"22 jun",match:"Argelia vs Jordania"},{date:"27 jun",match:"Jordania vs Argentina"},{date:"27 jun",match:"Argelia vs Austria"}],
  K:[{date:"17 jun",match:"Portugal vs RD Congo"},{date:"17 jun",match:"Uzbekistán vs Colombia"},{date:"23 jun",match:"Portugal vs Uzbekistán"},{date:"23 jun",match:"RD Congo vs Colombia"},{date:"27 jun",match:"Colombia vs Portugal"},{date:"27 jun",match:"RD Congo vs Uzbekistán"}],
  L:[{date:"17 jun",match:"Inglaterra vs Croacia"},{date:"18 jun",match:"Ghana vs Panamá"},{date:"23 jun",match:"Inglaterra vs Ghana"},{date:"23 jun",match:"Croacia vs Panamá"},{date:"27 jun",match:"Panamá vs Inglaterra"},{date:"27 jun",match:"Croacia vs Ghana"}],
};
 
const FLAGS = {
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
 
const GC = {
  A:"#e74c3c",B:"#e67e22",C:"#d4a017",D:"#27ae60",
  E:"#16a085",F:"#2980b9",G:"#8e44ad",H:"#e91e8c",
  I:"#ff6b35",J:"#00bcd4",K:"#8bc34a",L:"#ff5722",
};
 
const SCORES_KEY   = "mundial2026_scores_v3";
const PLAYERS_KEY  = "mundial2026_players";
const PREDS_PREFIX = "mundial2026_pred_";
 
function useIsMobile() {
  const [m, setM] = useState(window.innerWidth < 640);
  useEffect(() => {
    const fn = () => setM(window.innerWidth < 640);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return m;
}
 
function calcMatchResult(sA, sB) {
  if (sA === "" || sB === "" || sA === undefined || sB === undefined) return null;
  const a = parseInt(sA), b = parseInt(sB);
  return a > b ? "A" : a < b ? "B" : "D";
}
 
function calcPlayerPoints(predictions, realScores) {
  let pts = 0, exact = 0, winner = 0;
  Object.keys(GROUP_MATCHES).forEach(g => {
    GROUP_MATCHES[g].forEach((_, i) => {
      const key = `${g}_${i}`;
      const real = realScores[key], pred = predictions[key];
      if (!real || real.A === "" || real.B === "" || real.A === undefined) return;
      if (!pred || pred.A === "" || pred.B === "" || pred.A === undefined) return;
      const rA=parseInt(real.A),rB=parseInt(real.B),pA=parseInt(pred.A),pB=parseInt(pred.B);
      if(rA===pA&&rB===pB){pts+=3;exact++;}
      else if((rA>rB&&pA>pB)||(rA<rB&&pA<pB)||(rA===rB&&pA===pB)){pts+=1;winner++;}
    });
  });
  return { pts, exact, winner };
}
 
function ScoreBox({ value, onChange, dim }) {
  return (
    <input type="number" min="0" max="30" value={value} placeholder="–"
      onChange={e => onChange(e.target.value)}
      style={{ width:dim||40,height:dim||38,textAlign:"center",fontSize:dim?dim*0.45:17,fontWeight:800,
        background:value!==""?"#fff9e6":"#f4f5f8",border:value!==""?"2px solid #f4c430":"2px solid #dde0ee",
        borderRadius:7,outline:"none",color:"#0f1225",fontFamily:"monospace",
        MozAppearance:"textfield",WebkitAppearance:"none",touchAction:"manipulation",flexShrink:0 }}
    />
  );
}
 
function MatchRow({ keyId, tA, tB, date, sA, sB, onChg, color, compact }) {
  const res = calcMatchResult(sA, sB);
  return (
    <div style={{ display:"flex",alignItems:"center",gap:compact?4:6,padding:compact?"7px 8px":"9px 11px",
      borderRadius:10,marginBottom:5,background:res?"#fff":"rgba(255,255,255,0.74)",
      border:`1px solid ${res?color+"55":"#e4e6ee"}`,boxShadow:res?`0 2px 8px ${color}15`:"none" }}>
      <span style={{ fontSize:9,color:"#aaa",width:30,flexShrink:0,fontFamily:"monospace" }}>{date}</span>
      <div style={{ flex:1,display:"flex",justifyContent:"flex-end",overflow:"hidden",minWidth:0 }}>
        <span style={{ fontSize:compact?10:12,fontWeight:res==="A"?800:500,color:res==="A"?"#111":"#444",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis" }}>
          {FLAGS[tA]||"🏳"} {tA}
        </span>
      </div>
      <div style={{ display:"flex",alignItems:"center",gap:2,flexShrink:0 }}>
        <ScoreBox value={sA} onChange={v=>onChg(keyId,"A",v)} dim={compact?32:38}/>
        <span style={{ color:"#ccc",fontWeight:700,userSelect:"none",fontSize:compact?12:15 }}>:</span>
        <ScoreBox value={sB} onChange={v=>onChg(keyId,"B",v)} dim={compact?32:38}/>
      </div>
      <div style={{ flex:1,overflow:"hidden",minWidth:0 }}>
        <span style={{ fontSize:compact?10:12,fontWeight:res==="B"?800:500,color:res==="B"?"#111":"#444",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",display:"block" }}>
          {FLAGS[tB]||"🏳"} {tB}
        </span>
      </div>
    </div>
  );
}
 
function Standings({ group, teams, scores }) {
  const st = {};
  teams.forEach(t => { st[t]={pts:0,pj:0,pg:0,pe:0,pp:0,gf:0,gc:0}; });
  GROUP_MATCHES[group].forEach((m,i) => {
    const k=`${group}_${i}`,[tA,tB]=m.match.split(" vs "),s=scores[k];
    if(!s||s.A===""||s.A===undefined) return;
    const a=parseInt(s.A),b=parseInt(s.B);
    st[tA].pj++;st[tB].pj++;st[tA].gf+=a;st[tA].gc+=b;st[tB].gf+=b;st[tB].gc+=a;
    if(a>b){st[tA].pts+=3;st[tA].pg++;st[tB].pp++;}
    else if(a<b){st[tB].pts+=3;st[tB].pg++;st[tA].pp++;}
    else{st[tA].pts++;st[tB].pts++;st[tA].pe++;st[tB].pe++;}
  });
  const sorted=[...teams].sort((a,b)=>st[b].pts!==st[a].pts?st[b].pts-st[a].pts:(st[b].gf-st[b].gc)-(st[a].gf-st[a].gc));
  return (
    <div style={{ marginTop:10,overflowX:"auto" }}>
      <table style={{ width:"100%",borderCollapse:"collapse",fontSize:10.5,minWidth:250 }}>
        <thead><tr style={{ background:"#f1f3f7" }}>
          {["#","Selección","PJ","G","E","P","GF","GC","DG","PTS"].map(h=>(
            <th key={h} style={{ padding:"4px",textAlign:h==="Selección"?"left":"center",color:"#666",fontWeight:700,borderBottom:"2px solid #dde0ee",whiteSpace:"nowrap" }}>{h}</th>
          ))}
        </tr></thead>
        <tbody>
          {sorted.map((t,i)=>{
            const s=st[t],q=i<2;
            return <tr key={t} style={{ background:q?"#f0fff4":i===2?"#fffbf0":"white",borderBottom:"1px solid #f0f0f5" }}>
              <td style={{ padding:"4px",textAlign:"center",fontWeight:700,color:q?"#27ae60":"#ccc",fontSize:10 }}>{i+1}{q?"✓":i===2?"?":""}</td>
              <td style={{ padding:"4px 5px",fontWeight:q?700:400,whiteSpace:"nowrap" }}>{FLAGS[t]||"🏳"} {t}</td>
              {[s.pj,s.pg,s.pe,s.pp,s.gf,s.gc,s.gf-s.gc,s.pts].map((v,j)=>(
                <td key={j} style={{ padding:"4px",textAlign:"center",fontWeight:j===7?800:400,color:j===7?"#0f1225":"#555" }}>{v}</td>
              ))}
            </tr>;
          })}
        </tbody>
      </table>
    </div>
  );
}
 
function GroupCard({ group, teams, scores, onChg, expanded, onToggle, compact }) {
  const color=GC[group];
  const played=GROUP_MATCHES[group].filter((_,i)=>{const s=scores[`${group}_${i}`];return s?.A!==""&&s?.B!==""&&s?.A!==undefined;}).length;
  return (
    <div style={{ borderRadius:13,overflow:"hidden",boxShadow:"0 2px 14px rgba(0,0,0,0.08)",background:"white",border:`1px solid ${color}30` }}>
      <button onClick={onToggle} style={{ width:"100%",display:"flex",alignItems:"center",justifyContent:"space-between",padding:compact?"10px 12px":"12px 15px",background:`linear-gradient(135deg,${color}1e,${color}08)`,border:"none",cursor:"pointer",borderBottom:expanded?`2px solid ${color}40`:"none",WebkitTapHighlightColor:"transparent" }}>
        <div style={{ display:"flex",alignItems:"center",gap:8 }}>
          <div style={{ width:30,height:30,borderRadius:8,background:color,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,fontSize:13,color:"white",flexShrink:0 }}>{group}</div>
          <div>
            <div style={{ fontWeight:700,fontSize:compact?11:12,color:"#0f1225",lineHeight:1.3 }}>{teams.map(t=>FLAGS[t]||"🏳").join(" ")}</div>
            <div style={{ fontSize:9,color:"#aaa",marginTop:1 }}>{played}/6 jugados</div>
          </div>
        </div>
        <div style={{ display:"flex",alignItems:"center",gap:6 }}>
          <div style={{ background:played===6?"#27ae60":color,color:"white",borderRadius:20,padding:"2px 8px",fontSize:10,fontWeight:700 }}>{played}/6</div>
          <span style={{ color,fontSize:13,display:"inline-block",transform:expanded?"rotate(180deg)":"none",transition:"transform 0.2s" }}>▾</span>
        </div>
      </button>
      {expanded&&(
        <div style={{ padding:compact?"9px 10px":"11px 13px" }}>
          {GROUP_MATCHES[group].map((m,i)=>{
            const [tA,tB]=m.match.split(" vs "),key=`${group}_${i}`;
            return <MatchRow key={key} keyId={key} tA={tA} tB={tB} date={m.date} sA={scores[key]?.A??""} sB={scores[key]?.B??""} onChg={onChg} color={color} compact={compact}/>;
          })}
          <Standings group={group} teams={teams} scores={scores}/>
        </div>
      )}
    </div>
  );
}
 
// ── POLLA ──────────────────────────────────────────────────────────────────
 
function PredMatchRow({ matchKey, pred, real, tA, tB, date, color, onChg }) {
  const realRes = calcMatchResult(real?.A, real?.B);
  const predRes = calcMatchResult(pred?.A, pred?.B);
  const hasReal = real?.A !== "" && real?.A !== undefined && real?.B !== undefined;
  const hasPred = pred?.A !== "" && pred?.A !== undefined && pred?.B !== undefined;
  let badge = null, rowBg = "rgba(255,255,255,0.74)";
  if (hasReal && hasPred) {
    const rA=parseInt(real.A),rB=parseInt(real.B),pA=parseInt(pred.A),pB=parseInt(pred.B);
    if(rA===pA&&rB===pB){rowBg="#f0fff8";badge=<span style={{fontSize:9,background:"#27ae60",color:"white",borderRadius:4,padding:"1px 5px",flexShrink:0,fontWeight:700}}>+3</span>;}
    else if(realRes===predRes){rowBg="#f5ffe8";badge=<span style={{fontSize:9,background:"#8bc34a",color:"white",borderRadius:4,padding:"1px 5px",flexShrink:0,fontWeight:700}}>+1</span>;}
    else{rowBg="#fff8f8";badge=<span style={{fontSize:9,background:"#fee2e2",color:"#e74c3c",borderRadius:4,padding:"1px 5px",flexShrink:0,fontWeight:700}}>✕</span>;}
  }
  return (
    <div style={{ marginBottom:5 }}>
      <div style={{ display:"flex",alignItems:"center",gap:4,padding:"7px 8px",borderRadius:10,background:rowBg,border:`1px solid ${color}30` }}>
        <span style={{ fontSize:9,color:"#aaa",width:28,flexShrink:0,fontFamily:"monospace" }}>{date}</span>
        <div style={{ flex:1,display:"flex",justifyContent:"flex-end",overflow:"hidden",minWidth:0 }}>
          <span style={{ fontSize:10,color:"#444",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis" }}>{FLAGS[tA]||"🏳"} {tA}</span>
        </div>
        <div style={{ display:"flex",alignItems:"center",gap:2,flexShrink:0 }}>
          {onChg ? (
            <>
              <ScoreBox value={pred?.A??""} onChange={v=>onChg(matchKey,"A",v)} dim={32}/>
              <span style={{ color:"#ccc",fontWeight:700,userSelect:"none" }}>:</span>
              <ScoreBox value={pred?.B??""} onChange={v=>onChg(matchKey,"B",v)} dim={32}/>
            </>
          ) : (
            <span style={{ fontFamily:"monospace",fontSize:13,fontWeight:800,color:"#1a1a2e",minWidth:44,textAlign:"center" }}>
              {hasPred?`${pred.A}:${pred.B}`:"–:–"}
            </span>
          )}
        </div>
        <div style={{ flex:1,overflow:"hidden",minWidth:0 }}>
          <span style={{ fontSize:10,color:"#444",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",display:"block" }}>{FLAGS[tB]||"🏳"} {tB}</span>
        </div>
        {badge}
      </div>
      {hasReal&&<div style={{ fontSize:9,color:"#888",textAlign:"center",marginTop:1 }}>Real: {real.A}–{real.B}</div>}
    </div>
  );
}
 
function PredGroups({ preds, realScores, onChg, isMobile }) {
  const [exp, setExp] = useState({ A:true });
  return (
    <div>
      <div style={{ display:"flex",gap:6,marginBottom:12 }}>
        <button onClick={()=>{const a={};Object.keys(GROUPS).forEach(g=>a[g]=true);setExp(a);}} style={{ padding:"5px 9px",borderRadius:6,border:"1px solid #1e2240",background:"#141728",color:"#888",fontSize:10,cursor:"pointer" }}>↕ Expandir</button>
        <button onClick={()=>setExp({})} style={{ padding:"5px 9px",borderRadius:6,border:"1px solid #1e2240",background:"#141728",color:"#888",fontSize:10,cursor:"pointer" }}>↕ Colapsar</button>
      </div>
      <div style={{ display:"grid",gridTemplateColumns:isMobile?"1fr":"repeat(2,1fr)",gap:10 }}>
        {Object.entries(GROUPS).map(([g,teams])=>{
          const color=GC[g],expanded=!!exp[g];
          const predCount=GROUP_MATCHES[g].filter((_,i)=>{const p=preds[`${g}_${i}`];return p?.A!==""&&p?.A!==undefined;}).length;
          return (
            <div key={g} style={{ borderRadius:13,overflow:"hidden",background:"rgba(255,255,255,0.97)",border:`1px solid ${color}30`,boxShadow:"0 2px 10px rgba(0,0,0,0.07)" }}>
              <button onClick={()=>setExp(p=>({...p,[g]:!p[g]}))} style={{ width:"100%",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 12px",background:`linear-gradient(135deg,${color}1e,${color}08)`,border:"none",cursor:"pointer",borderBottom:expanded?`2px solid ${color}40`:"none",WebkitTapHighlightColor:"transparent" }}>
                <div style={{ display:"flex",alignItems:"center",gap:8 }}>
                  <div style={{ width:28,height:28,borderRadius:7,background:color,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,fontSize:12,color:"white",flexShrink:0 }}>{g}</div>
                  <div>
                    <div style={{ fontWeight:700,fontSize:11,color:"#0f1225" }}>{teams.map(t=>FLAGS[t]||"🏳").join(" ")}</div>
                    <div style={{ fontSize:9,color:"#aaa" }}>{predCount}/6 predicciones</div>
                  </div>
                </div>
                <div style={{ display:"flex",alignItems:"center",gap:6 }}>
                  <div style={{ background:predCount===6?"#27ae60":color,color:"white",borderRadius:20,padding:"2px 7px",fontSize:10,fontWeight:700 }}>{predCount}/6</div>
                  <span style={{ color,fontSize:13,display:"inline-block",transform:expanded?"rotate(180deg)":"none",transition:"transform 0.2s" }}>▾</span>
                </div>
              </button>
              {expanded&&(
                <div style={{ padding:"9px 11px" }}>
                  {GROUP_MATCHES[g].map((m,i)=>{
                    const [tA,tB]=m.match.split(" vs "),key=`${g}_${i}`;
                    return <PredMatchRow key={key} matchKey={key} pred={preds[key]} real={realScores[key]} tA={tA} tB={tB} date={m.date} color={color} onChg={onChg}/>;
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
 
function MiniStats({ pts, exact, winner }) {
  return (
    <div style={{ display:"flex",gap:8,marginBottom:14 }}>
      {[["🎯",pts,"Puntos","#f4c430"],["✓",exact,"Exactos","#27ae60"],["≈",winner,"Ganador","#8bc34a"]].map(([ico,val,lbl,col])=>(
        <div key={lbl} style={{ flex:1,background:"rgba(255,255,255,0.03)",border:`1px solid ${col}25`,borderRadius:10,padding:"10px 6px",textAlign:"center" }}>
          <div style={{ fontSize:16,marginBottom:2 }}>{ico}</div>
          <div style={{ fontWeight:900,fontSize:20,color:col,lineHeight:1.1 }}>{val}</div>
          <div style={{ fontSize:9,color:"#555",marginTop:1 }}>{lbl}</div>
        </div>
      ))}
    </div>
  );
}
 
function PollaTab({ isMobile, realScores }) {
  const [phase, setPhase]       = useState("loading");
  const [players, setPlayers]   = useState([]);
  const [myPlayer, setMyPlayer] = useState(null);
  const [myPreds, setMyPreds]   = useState({});
  const [nameInput, setNameInput] = useState("");
  const [nameErr, setNameErr]   = useState("");
  const [allPreds, setAllPreds] = useState({});
  const [viewPlayer, setViewPlayer] = useState(null);
 
  useEffect(() => { 
  async function init() {
  try {

const { data: pList, error } = await supabase
  .from("usuarios")
  .select("*")
  .order("nombre");

setPlayers(pList || []);

const myId = localStorage.getItem(
  "mundial2026_myid"
);

if (myId) {

  const me = pList.find(
    p => p.id_usuario === myId
  );

  if (me) {

    setMyPlayer(me);

    const preds = await loadUserPreds(
      me.id_usuario
    );

    setMyPreds(preds);

    setPhase("ranking");
    return;
  }
}

setPhase("join");

  } catch (e) {
    console.error(e);
    setPhase("error");
  }
}
    init();
  },[]);
 
async function loadAllPreds(pList) {
  const map = {};

  for (const p of pList) {

    const { data: preds } = await supabase
      .from("predicciones")
      .select("*")
      .eq("usuario_id", p.id_usuario);

    map[p.id_usuario] = convertPreds(preds || []);
  }

  setAllPreds(map);
}
 
async function refresh() {
  try {
    const { data: pList, error } = await supabase
      .from("usuarios")
      .select("*")
      .order("nombre");

    if (error) throw error;

    setPlayers(pList || []);

    await loadAllPreds(pList || []);
  } catch (e) {
    console.error(e);
  }
}

async function loadUserPreds(usuarioId) {

  const { data, error } = await supabase
    .from("predicciones")
    .select("*")
    .eq("usuario_id", usuarioId);

  if (error) {
    console.error(error);
    return {};
  }

  return convertPreds(data || []);
}

  useEffect(()=>{ if(phase==="ranking") refresh(); },[phase]);
 
 
async function handleJoin() {
  const name = nameInput.trim();

  const { data: existing, error } = await supabase
    .from("usuarios")
    .select("*")
    .ilike("nombre", name)
    .maybeSingle();

  if (error) {
    console.error(error);
    return;
  }

if (existing) {

  setMyPlayer(existing);

  localStorage.setItem(
    "mundial2026_myid",
    existing.id_usuario
  );

  const preds = await loadUserPreds(
    existing.id_usuario
  );

  setMyPreds(preds);

  setPhase("ranking");
  return;
}

  const { data: newPlayer, error: insertError } = await supabase
    .from("usuarios")
    .insert({
      nombre: name
    })
    .select()
    .single();

  if (insertError) {
    console.error(insertError);
    return;
  }

  setMyPlayer(newPlayer);

  localStorage.setItem(
    "mundial2026_myid",
    newPlayer.id_usuario
  );

  setMyPreds({});
  setPhase("ranking");
}
 
async function handlePredChg(key, side, value) {
  try {

    if (!myPlayer) return;

    const current = myPreds[key] || {};

    const nextMatch = {
      ...current,
      [side]: value
    };

    setMyPreds(prev => ({
      ...prev,
      [key]: nextMatch
    }));

    const golesA =
      side === "A" ? value : (current.A ?? 0);

    const golesB =
      side === "B" ? value : (current.B ?? 0);

    const { data, error } = await supabase
      .from("predicciones")
      .upsert(
        {
          usuario_id: myPlayer.id_usuario,
          match_key: key,
          goles_pronostico_a: Number(golesA),
          goles_pronostico_b: Number(golesB)
        },
        {
          onConflict: "usuario_id,match_key"
        }
      );
  } catch (e) {
    console.error("EXCEPTION:", e);
  }
}
 
  function getRanked() {
    return [...players]
      .map(p=>({...p,...calcPlayerPoints(allPreds[p.id_usuario]||{},realScores)}))
      .sort((a,b)=>b.pts!==a.pts?b.pts-a.pts:b.exact!==a.exact?b.exact-a.exact:0);
  }
 
  if(phase==="loading") return <div style={{ textAlign:"center",padding:"60px 20px",color:"#555" }}><div style={{ fontSize:32,marginBottom:10 }}>⚽</div><p style={{ fontSize:12 }}>Cargando...</p></div>;
 

  if(phase==="join") return (
    <div style={{ maxWidth:380,margin:"0 auto",padding:"10px 0" }}>
      <div style={{ textAlign:"center",marginBottom:22 }}>
        <div style={{ fontSize:42,marginBottom:6 }}>🏆</div>
        <h2 style={{ margin:0,color:"#f4c430",fontSize:19,fontWeight:900 }}>Polla del Mundial</h2>
        <p style={{ color:"#666",fontSize:11,marginTop:6,lineHeight:1.6 }}>
          Predecí todos los partidos de la fase de grupos.<br/>
          El ranking se actualiza en tiempo real para todos.
        </p>
        <div style={{ display:"flex",gap:10,justifyContent:"center",marginTop:8 }}>
          <div style={{ background:"rgba(244,196,48,0.1)",border:"1px solid #f4c43040",borderRadius:8,padding:"6px 10px",fontSize:10,color:"#f4c430" }}>🎯 +3 exacto</div>
          <div style={{ background:"rgba(139,195,74,0.1)",border:"1px solid #8bc34a40",borderRadius:8,padding:"6px 10px",fontSize:10,color:"#8bc34a" }}>✅ +1 ganador</div>
        </div>
      </div>
      <div style={{ background:"#1a1d30",borderRadius:14,padding:"18px" }}>
        <label style={{ display:"block",fontSize:10,color:"#888",marginBottom:7,fontWeight:700,letterSpacing:0.5 }}>TU NOMBRE EN LA POLLA</label>
        <input type="text" placeholder="Ej: Juan, El Pibe, Tío Jorge..." value={nameInput}
          onChange={e=>{setNameInput(e.target.value);setNameErr("");}}
          onKeyDown={e=>e.key==="Enter"&&handleJoin()}
          style={{ width:"100%",padding:"10px 12px",borderRadius:8,border:`1px solid ${nameErr?"#e74c3c":"#2a2d4a"}`,background:"rgba(255,255,255,0.05)",color:"white",fontSize:13,outline:"none",boxSizing:"border-box" }}
          autoFocus/>
        {nameErr&&<p style={{ color:"#e74c3c",fontSize:10,margin:"5px 0 0" }}>{nameErr}</p>}
        <p style={{ color:"#444",fontSize:10,marginTop:8,marginBottom:14,lineHeight:1.5 }}>
          ¿Ya participás? Ingresá tu nombre exacto para retomar tus predicciones.
        </p>
        <button onClick={handleJoin} style={{ width:"100%",padding:"11px",borderRadius:10,border:"none",background:"linear-gradient(135deg,#f4c430,#e6a817)",color:"#0f1225",fontWeight:800,fontSize:13,cursor:"pointer" }}>
          Unirme →
        </button>
      </div>
      {players.length>0&&<p style={{ textAlign:"center",color:"#3a3f55",fontSize:10,marginTop:12 }}>{players.length} participante{players.length!==1?"s":""} ya en la polla</p>}
    </div>
  );
 
  // ── MY PREDICTIONS view ──
  if(phase==="myPreds"&&myPlayer) {
    const stats=calcPlayerPoints(myPreds,realScores);
    return (
      <div>
        <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:14,padding:"11px 13px",background:"#1a1d30",borderRadius:12 }}>
          <button onClick={()=>setPhase("ranking")} style={{ background:"rgba(255,255,255,0.07)",border:"none",borderRadius:8,color:"#aaa",fontSize:18,cursor:"pointer",width:32,height:32,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>‹</button>
          <div style={{ flex:1 }}>
            <div style={{ fontWeight:800,fontSize:14,color:"#f4c430" }}>Mis predicciones</div>
            <div style={{ fontSize:10,color:"#555" }}>{myPlayer.name}</div>
          </div>
        </div>
        <MiniStats {...stats}/>
        <PredGroups preds={myPreds} realScores={realScores} onChg={handlePredChg} isMobile={isMobile}/>
      </div>
    );
  }
 
  // ── VIEW OTHER player ──
  if(phase==="viewOther"&&viewPlayer) {
    const theirPreds=allPreds[viewPlayer.id_usuario]||{};
    const stats=calcPlayerPoints(theirPreds,realScores);
    return (
      <div>
        <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:14,padding:"11px 13px",background:"#1a1d30",borderRadius:12 }}>
          <button onClick={()=>setPhase("ranking")} style={{ background:"rgba(255,255,255,0.07)",border:"none",borderRadius:8,color:"#aaa",fontSize:18,cursor:"pointer",width:32,height:32,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>‹</button>
          <div style={{ flex:1 }}>
            <div style={{ fontWeight:800,fontSize:14,color:"#f4c430" }}>{viewPlayer.nombre}</div>
            <div style={{ fontSize:10,color:"#555" }}>Predicciones (solo lectura)</div>
          </div>
        </div>
        <MiniStats {...stats}/>
        <PredGroups preds={theirPreds} realScores={realScores} onChg={null} isMobile={isMobile}/>
      </div>
    );
  }
 
  // ── RANKING ──
  const ranked=getRanked();
  const myRank=ranked.findIndex(p=>p.id_usuario===myPlayer?.id_usuario);
  return (
    <div>
      {/* My bar */}
      {myPlayer&&(
        <div style={{ background:"linear-gradient(135deg,#1a1d30,#141728)",borderRadius:12,padding:"11px 13px",marginBottom:14,display:"flex",alignItems:"center",gap:10 }}>
          <div style={{ flex:1,minWidth:0 }}>
            <div style={{ fontSize:9,color:"#555" }}>Jugando como</div>
            <div style={{ fontWeight:800,fontSize:14,color:"#f4c430",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" }}>{myPlayer.nombre}</div>
            {myRank>=0&&<div style={{ fontSize:9,color:"#666",marginTop:1 }}>#{myRank+1} · {ranked[myRank]?.pts||0} pts · {ranked[myRank]?.exact||0} exactos</div>}
          </div>
          <button onClick={()=>setPhase("myPreds")} style={{ padding:"8px 13px",borderRadius:9,border:"none",background:"#f4c430",color:"#0f1225",fontWeight:700,fontSize:11,cursor:"pointer",whiteSpace:"nowrap",flexShrink:0 }}>
            📝 Mis predicciones
          </button>
          <button onClick={()=>{localStorage.removeItem("mundial2026_myid");setMyPlayer(null);setPhase("join");}} style={{ padding:"8px 9px",borderRadius:9,border:"1px solid #2a2d4a",background:"transparent",color:"#555",fontSize:11,cursor:"pointer",flexShrink:0 }}>
            ↩
          </button>
        </div>
      )}
 
      {/* Header row */}
      <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10 }}>
        <span style={{ fontSize:12,color:"#666",fontWeight:700 }}>🏆 Ranking</span>
        <button onClick={refresh} style={{ fontSize:10,color:"#555",background:"transparent",border:"1px solid #1e2240",borderRadius:6,padding:"4px 10px",cursor:"pointer" }}>↻ Actualizar</button>
      </div>
 
      {ranked.length===0?(
        <div style={{ textAlign:"center",padding:"40px 16px",color:"#444" }}>
          <div style={{ fontSize:30,marginBottom:8 }}>⚽</div>
          <p style={{ fontSize:11 }}>Nadie ha hecho predicciones aún.<br/>¡Sé el primero!</p>
        </div>
      ):(
        <div style={{ display:"flex",flexDirection:"column",gap:7 }}>
          {ranked.map((p,idx)=>{
            const medals=["🥇","🥈","🥉"],rc=["#f4c430","#b0b8c8","#cd7f32"];
            const isMe=p.id_usuario===myPlayer?.id_usuario;
            return (
              <div key={p.id_usuario} onClick={()=>{ if(isMe){setPhase("myPreds");}else{setViewPlayer(p);setPhase("viewOther");} }}
                style={{ display:"flex",alignItems:"center",gap:10,padding:"11px 13px",borderRadius:12,
                  background:isMe?"rgba(244,196,48,0.1)":idx<3?"rgba(255,255,255,0.03)":"rgba(255,255,255,0.015)",
                  border:`1px solid ${isMe?"#f4c43050":idx<3?rc[idx]+"30":"#1a1e30"}`,cursor:"pointer",position:"relative" }}>
                {isMe&&<div style={{ position:"absolute",top:5,right:9,fontSize:8,color:"#f4c430",fontWeight:700,letterSpacing:0.5,opacity:0.8 }}>TÚ</div>}
                <div style={{ width:28,textAlign:"center",fontSize:idx<3?18:12,fontWeight:700,color:idx<3?rc[idx]:"#444" }}>
                  {idx<3?medals[idx]:idx+1}
                </div>
                <div style={{ flex:1,minWidth:0 }}>
                  <div style={{ fontWeight:700,fontSize:13,color:isMe?"#f4c430":idx<3?rc[idx]:"#ccc",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" }}>{p.name}</div>
                  <div style={{ fontSize:9,color:"#444",marginTop:1 }}>🎯 {p.exact} exactos · ✅ {p.winner} ganadores</div>
                </div>
                <div style={{ textAlign:"right",flexShrink:0 }}>
                  <div style={{ fontWeight:900,fontSize:21,color:isMe?"#f4c430":idx<3?rc[idx]:"#666",lineHeight:1 }}>{p.pts}</div>
                  <div style={{ fontSize:9,color:"#444" }}>pts</div>
                </div>
                <span style={{ color:"#1e2240",fontSize:12,flexShrink:0 }}>›</span>
              </div>
            );
          })}
        </div>
      )}
      <div style={{ marginTop:14,padding:"10px 12px",background:"rgba(255,255,255,0.02)",borderRadius:8,borderLeft:"3px solid #1e2240" }}>
        <p style={{ margin:0,fontSize:10,color:"#444",lineHeight:1.5 }}>Las predicciones se guardan en la nube y son visibles para todos. Tocá cualquier jugador del ranking para ver sus picks.</p>
      </div>
    </div>
  );
}
 
// ── KO ──────────────────────────────────────────────────────────────────────
function KOMatch({ matchKey, scores, onChg, isMobile }) {
  const sA=scores[matchKey]?.A??"",sB=scores[matchKey]?.B??"";
  const nameA=scores[`${matchKey}_nameA`]?.A??"",nameB=scores[`${matchKey}_nameB`]?.B??"";
  const played=sA!==""&&sB!=="";
  return (
    <div style={{ background:played?"#fff":"rgba(255,255,255,0.03)",borderRadius:10,padding:isMobile?"8px":"9px 11px",border:`1px solid ${played?"#f4c43050":"#1a1e30"}`,marginBottom:6 }}>
      <div style={{ display:"flex",alignItems:"center",gap:isMobile?4:6 }}>
        <input type="text" placeholder="Equipo A" value={nameA} onChange={e=>onChg(`${matchKey}_nameA`,"A",e.target.value)}
          style={{ flex:1,padding:"5px 7px",borderRadius:6,fontSize:11,border:"1px solid #2a2d4a",background:"rgba(255,255,255,0.05)",color:played?"#111":"#ccc",outline:"none",minWidth:0 }}/>
        <ScoreBox value={sA} onChange={v=>onChg(matchKey,"A",v)} dim={32}/>
        <span style={{ color:"#bbb",fontWeight:700,userSelect:"none" }}>:</span>
        <ScoreBox value={sB} onChange={v=>onChg(matchKey,"B",v)} dim={32}/>
        <input type="text" placeholder="Equipo B" value={nameB} onChange={e=>onChg(`${matchKey}_nameB`,"B",e.target.value)}
          style={{ flex:1,padding:"5px 7px",borderRadius:6,fontSize:11,border:"1px solid #2a2d4a",background:"rgba(255,255,255,0.05)",color:played?"#111":"#ccc",outline:"none",minWidth:0 }}/>
      </div>
    </div>
  );
}
 
// ── APP ──────────────────────────────────────────────────────────────────────
export default function Mundial2026() {
  const [scores, setScores]       = useState({});
  const [expG, setExpG]           = useState({ A: true });
  const [activeTab, setActiveTab] = useState("grupos");
  const [saved, setSaved]         = useState(false);
  const [loading, setLoading]     = useState(true);
  const isMobile                  = useIsMobile();

  // ── 1. Normaliza null → "" al cargar desde Supabase ──────────────────────
  useEffect(() => {
    async function loadMatches() {
      const { data, error } = await supabase
        .from("partidos")
        .select("*")
        .order("fecha");

      if (error) {
        console.error("Error cargando partidos:", error);
        setLoading(false);
        return;
      }

      const realScores = {};
      data?.forEach(match => {
        // FIX #1: null → "" para que toda la lógica downstream funcione
        realScores[match.match_key] = {
          A: match.goles_real_a ?? "",
          B: match.goles_real_b ?? ""
        };
      });

      setScores(realScores);
      setLoading(false);
    }

    loadMatches();
  }, []); // loadMatches inline → no dep warning

  // ── 2. handleScore corregido ──────────────────────────────────────────────
  const handleScore = useCallback(async (key, side, value) => {
    // Guarda el estado anterior para rollback
    const previousScores = scores;

    // Actualización optimista
    setScores(prev => ({
      ...prev,
      [key]: {
        ...(prev[key] || {}),
        [side]: value
      }
    }));

    // FIX #4: una sola query, no dos
    const updatePayload = side === "A"
      ? { goles_real_a: value === "" ? null : Number(value) }
      : { goles_real_b: value === "" ? null : Number(value) };

    const { error } = await supabase
      .from("partidos")
      .update(updatePayload)
      .eq("match_key", key); // directo por match_key, sin el select previo

    // FIX #3: rollback si falla
    if (error) {
      console.error("Error guardando:", error);
      setScores(previousScores);
      return;
    }

    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  }, [scores]); // FIX #5: scores en deps

  // ── 3. totalPlayed corregido ──────────────────────────────────────────────
  // FIX #2: verifica número válido, no solo !== ""
  const totalPlayed = Object.keys(scores).filter(k => {
    if (k.includes("name")) return false;
    const s = scores[k];
    return s?.A !== "" && s?.A !== null && s?.A !== undefined &&
           s?.B !== "" && s?.B !== null && s?.B !== undefined;
  }).length;

  const TABS = [["grupos","⚽ Grupos"],["eliminatoria","🏆 Elim."],["polla","🎯 Polla"]];

  const KO_ROUNDS = [
    { title:"16avos de Final", prefix:"r32",   count:16, dates:"28 jun – 3 jul" },
    { title:"Octavos de Final", prefix:"r16",  count:8,  dates:"4 – 7 jul"      },
    { title:"Cuartos de Final", prefix:"qf",   count:4,  dates:"9 – 11 jul"     },
    { title:"Semifinales",      prefix:"sf",   count:2,  dates:"14 – 15 jul"    },
    { title:"Final 🏆",         prefix:"final", count:1, dates:"19 jul · Nueva Jersey" },
  ];

  if (loading) return (
    <div style={{ minHeight:"100vh", background:"linear-gradient(160deg,#0a0e1f,#131630)", display:"flex", alignItems:"center", justifyContent:"center" }}>
      <div style={{ textAlign:"center", color:"#555" }}>
        <div style={{ fontSize:36, marginBottom:10 }}>⚽</div>
        <p style={{ fontSize:12 }}>Cargando partidos...</p>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight:"100vh", background:"linear-gradient(160deg,#0a0e1f 0%,#131630 50%,#0b1a2b 100%)", fontFamily:"'Segoe UI',system-ui,sans-serif" }}>

      <div style={{ background:"linear-gradient(135deg,#c8002a 0%,#006233 100%)", padding:"14px 14px 11px", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute",top:-20,right:-20,width:90,height:90,borderRadius:"50%",background:"rgba(255,255,255,0.04)" }}/>
        <div style={{ maxWidth:920,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",gap:8 }}>
          <div style={{ display:"flex",alignItems:"center",gap:8 }}>
            <span style={{ fontSize:isMobile?24:30 }}>🏆</span>
            <div>
              <h1 style={{ margin:0,color:"white",fontSize:isMobile?14:19,fontWeight:900,letterSpacing:-0.5,lineHeight:1.2 }}>FIFA World Cup 2026</h1>
              <p style={{ margin:0,color:"rgba(255,255,255,0.65)",fontSize:isMobile?8:10 }}>🇺🇸🇨🇦🇲🇽 &nbsp;11 jun – 19 jul</p>
            </div>
          </div>
          <div style={{ display:"flex",gap:5,flexWrap:"wrap",justifyContent:"flex-end" }}>
            <div style={{ background:"rgba(244,196,48,0.9)",borderRadius:14,padding:"2px 9px",color:"#0f1225",fontSize:10,fontWeight:700 }}>⚽ {totalPlayed}</div>
            {saved && <div style={{ background:"rgba(46,204,113,0.9)",borderRadius:14,padding:"2px 9px",color:"white",fontSize:10,fontWeight:600 }}>✓</div>}
          </div>
        </div>
      </div>

      <div style={{ background:"#0d1020",borderBottom:"1px solid #1a1e35",display:"flex",maxWidth:920,margin:"0 auto",overflowX:"auto" }}>
        {TABS.map(([tab,label]) => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding:"10px 16px",border:"none",background:"transparent",whiteSpace:"nowrap",color:activeTab===tab?"#f4c430":"#555",fontWeight:activeTab===tab?700:500,fontSize:isMobile?10:12,cursor:"pointer",borderBottom:activeTab===tab?"3px solid #f4c430":"3px solid transparent",WebkitTapHighlightColor:"transparent" }}>{label}</button>
        ))}
      </div>

      <div style={{ maxWidth:920,margin:"0 auto",padding:isMobile?"10px 8px 58px":"14px 14px 40px",overflowX:"hidden" }}>

        {activeTab==="grupos" && (
          <>
            <div style={{ display:"flex",gap:6,marginBottom:12,alignItems:"center" }}>
              <button onClick={() => { const a={}; Object.keys(GROUPS).forEach(g=>a[g]=true); setExpG(a); }} style={{ padding:"6px 10px",borderRadius:6,border:"1px solid #1e2240",background:"#141728",color:"#777",fontSize:10,cursor:"pointer" }}>↕ Expandir</button>
              <button onClick={() => setExpG({})} style={{ padding:"6px 10px",borderRadius:6,border:"1px solid #1e2240",background:"#141728",color:"#777",fontSize:10,cursor:"pointer" }}>↕ Colapsar</button>
              <span style={{ marginLeft:"auto",fontSize:9,color:"#2a2e45" }}>💾 auto-guardado</span>
            </div>
            <div style={{ display:"grid",gridTemplateColumns:isMobile?"1fr":"repeat(2,1fr)",gap:10 }}>
              {Object.entries(GROUPS).map(([g,teams]) => (
                <GroupCard key={g} group={g} teams={teams} scores={scores} onChg={handleScore}
                  expanded={!!expG[g]} onToggle={() => setExpG(p => ({...p,[g]:!p[g]}))} compact={isMobile}/>
              ))}
            </div>
          </>
        )}

        {activeTab==="eliminatoria" && (
          <div>
            <p style={{ color:"#444",fontSize:11,textAlign:"center",marginBottom:16 }}>Completá los cruces a medida que se definen los clasificados.</p>
            {KO_ROUNDS.map(({title,prefix,count,dates}) => (
              <div key={prefix} style={{ marginBottom:18 }}>
                <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:8 }}>
                  <h3 style={{ margin:0,fontSize:11,fontWeight:800,color:"#f4c430",textTransform:"uppercase",letterSpacing:0.5 }}>{title}</h3>
                  <span style={{ fontSize:9,color:"#333",fontStyle:"italic",marginLeft:"auto" }}>{dates}</span>
                </div>
                <div style={{ display:"grid",gridTemplateColumns:isMobile?"1fr":count===1?"1fr":"repeat(2,1fr)",gap:6 }}>
                  {Array.from({length:count},(_,i) => (
                    <KOMatch key={`${prefix}_${i}`} matchKey={`${prefix}_${i}`} scores={scores} onChg={handleScore} isMobile={isMobile}/>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab==="polla" && <PollaTab isMobile={isMobile} realScores={scores}/>}
      </div>

      {isMobile && (
        <div style={{ position:"fixed",bottom:0,left:0,right:0,background:"#080a18",borderTop:"1px solid #1a1e35",display:"flex",zIndex:100 }}>
          {TABS.map(([tab,label]) => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{ flex:1,padding:"10px 0 8px",border:"none",background:"transparent",color:activeTab===tab?"#f4c430":"#444",fontWeight:activeTab===tab?700:400,fontSize:11,cursor:"pointer",borderTop:activeTab===tab?"2px solid #f4c430":"2px solid transparent",WebkitTapHighlightColor:"transparent" }}>{label}</button>
          ))}
        </div>
      )}
    </div>
  );
}