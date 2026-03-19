import { useState } from "react";

// ─── Palette ───────────────────────────────────────────────
const C = {
  bg:"#0f1117", surface:"#161b24", card:"#1c2230", border:"#252d3d", borderHi:"#2e3a50",
  plat:"#c8cfd9", platHi:"#e2e7ed", platDim:"#8a95a3", accent:"#a8b4c0",
  muted:"#4a5568", mutedLo:"#2d3748", white:"#f0f4f8",
  success:"#4ade80", warn:"#fbbf24", danger:"#f87171", gold:"#d4af7a", goldDim:"#b8945a",
};

// ─── Data ──────────────────────────────────────────────────
const SERVICE_CATEGORIES = [
  { id:"hair",       icon:"💇", label:"Hair Salons",         color:"#7c9ef5" },
  { id:"nails",      icon:"💅", label:"Nail Studios",        color:"#f5a7c7" },
  { id:"massage",    icon:"🧘", label:"Massage & Body",      color:"#81e6d9" },
  { id:"facial",     icon:"✨", label:"Facials & Skincare",  color:"#fbd38d" },
  { id:"injectable", icon:"💉", label:"Injectables",         color:"#fecdd3", medical:true },
  { id:"wax",        icon:"🌿", label:"Waxing",              color:"#c6f6d5" },
  { id:"lash",       icon:"👁", label:"Lash & Brow",         color:"#e9d8fd" },
];

const SALONS = [
  { id:1,  name:"Tresses by Tamika",      cat:"hair",    type:"Hair Salon",          location:"New Kingston",  lat:17.997, lng:-76.789, rating:4.9, reviews:214, price:3500,  image:"https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80", tags:["Braids","Natural","Locs"],          available:"Today",    featured:true,  status:"approved", about:"New Kingston's premier natural hair studio.",    services:[{name:"Box Braids",duration:"240 min",price:8500},{name:"Loc Retwist",duration:"120 min",price:4500},{name:"Natural Treatment",duration:"90 min",price:3800}]},
  { id:2,  name:"Nail'd It Ja",            cat:"nails",   type:"Nail Studio",         location:"Half Way Tree", lat:18.005, lng:-76.793, rating:4.8, reviews:189, price:2200,  image:"https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&q=80", tags:["Gel","Acrylic","Nail Art"],         available:"Today",    featured:true,  status:"approved", about:"Half Way Tree's most sought-after nail studio.", services:[{name:"Full Acrylic Set",duration:"90 min",price:3500},{name:"Gel Manicure",duration:"60 min",price:2200},{name:"Nail Art",duration:"30 min",price:1500}]},
  { id:3,  name:"Serenity Spa & Wellness", cat:"massage", type:"Massage & Body",      location:"New Kingston",  lat:17.999, lng:-76.785, rating:4.9, reviews:176, price:5500,  image:"https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80", tags:["Swedish","Deep Tissue","Hot Stone"], available:"Today",    featured:true,  status:"approved", about:"Kingston's premier wellness sanctuary. Restore, relax, rejuvenate.", services:[{name:"Swedish Massage",duration:"60 min",price:5500},{name:"Deep Tissue",duration:"90 min",price:7500},{name:"Hot Stone Therapy",duration:"90 min",price:8500},{name:"Couples Massage",duration:"90 min",price:14000}]},
  { id:4,  name:"Glow Facial Bar",         cat:"facial",  type:"Facials & Skincare",  location:"Half Way Tree", lat:18.007, lng:-76.795, rating:4.7, reviews:143, price:4500,  image:"https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80", tags:["HydraFacial","Anti-Aging","Acne"],   available:"Today",    featured:false, status:"approved", about:"Science-backed facials tailored for Caribbean skin.",             services:[{name:"Classic Facial",duration:"60 min",price:4500},{name:"HydraFacial",duration:"75 min",price:9500},{name:"Anti-Aging Treatment",duration:"90 min",price:11000}]},
  { id:5,  name:"Bare Wax Studio",         cat:"wax",     type:"Waxing",              location:"Portmore",      lat:17.947, lng:-76.889, rating:4.6, reviews:97,  price:1500,  image:"https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=600&q=80", tags:["Brazilian","Full Body","Brows"],     available:"Tomorrow", featured:false, status:"approved", about:"Professional waxing in a clean, discreet environment.",           services:[{name:"Brazilian Wax",duration:"30 min",price:3500},{name:"Full Leg Wax",duration:"45 min",price:4500},{name:"Brow Wax & Shape",duration:"15 min",price:1500}]},
  { id:6,  name:"Lash Lab Kingston",       cat:"lash",    type:"Lash & Brow",         location:"New Kingston",  lat:18.001, lng:-76.791, rating:4.8, reviews:201, price:4000,  image:"https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&q=80", tags:["Lash Extensions","Brow Lamination","Tint"], available:"Today", featured:false, status:"approved", about:"Precision lash & brow artistry. Wake up flawless.",              services:[{name:"Classic Lash Extensions",duration:"120 min",price:8500},{name:"Brow Lamination",duration:"60 min",price:5500},{name:"Brow Tint & Shape",duration:"30 min",price:2500}]},
  { id:7,  name:"The Body Ritual",         cat:"massage", type:"Massage & Body",      location:"Montego Bay",   lat:18.476, lng:-77.893, rating:4.9, reviews:134, price:6000,  image:"https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600&q=80", tags:["Body Scrub","Wrap","Couples"],       available:"Today",    featured:false, status:"approved", about:"MoBay's luxury body treatment destination.",                     services:[{name:"Body Scrub & Wrap",duration:"90 min",price:9500},{name:"Aromatherapy Massage",duration:"60 min",price:6000},{name:"Couples Retreat Package",duration:"120 min",price:16000}]},
  { id:8,  name:"Zuri Hair Studio",        cat:"hair",    type:"Hair Salon",          location:"Mandeville",    lat:18.041, lng:-77.504, rating:4.9, reviews:311, price:4000,  image:"https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=600&q=80", tags:["Keratin","Relaxer","Colour"],       available:"Wed",      featured:false, status:"approved", about:"Mandeville's award-winning hair destination.",                   services:[{name:"Keratin Treatment",duration:"150 min",price:9500},{name:"Full Highlights",duration:"180 min",price:12000},{name:"Relaxer & Style",duration:"120 min",price:4500}]},
  { id:9,  name:"Pure Skin Ocho Rios",     cat:"facial",  type:"Facials & Skincare",  location:"Ocho Rios",     lat:18.407, lng:-77.104, rating:4.7, reviews:88,  price:4000,  image:"https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=600&q=80", tags:["Brightening","Peel","Hydration"],   available:"Today",    featured:false, status:"pending", about:"Ocho Rios' boutique skincare studio.",                           services:[{name:"Brightening Facial",duration:"60 min",price:4000},{name:"Chemical Peel",duration:"45 min",price:6500}]},
  { id:10, name:"Luxe Nails KGN",          cat:"nails",      type:"Nail Studio",              location:"New Kingston",  lat:18.002, lng:-76.785, rating:4.8, reviews:201, price:2500,  image:"https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&q=80", tags:["Luxury","Gel","Nail Art"],       available:"Tomorrow", featured:false, status:"approved", medical:false, about:"New Kingston's most indulgent nail experience.", services:[{name:"Luxury Mani & Pedi",duration:"120 min",price:6500},{name:"Gel Full Set",duration:"75 min",price:3800}]},
  { id:11, name:"Refine Aesthetics JA",     cat:"injectable", type:"Injectables & Aesthetics", location:"New Kingston",  lat:18.003, lng:-76.788, rating:4.9, reviews:167, price:25000, image:"https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&q=80", tags:["Botox","Filler","Anti-Aging"],  available:"Today",    featured:true,  status:"approved", medical:true,  about:"Kingston's most trusted medical aesthetics clinic. All treatments performed by registered medical practitioners.", services:[{name:"Consultation",duration:"30 min",price:5000},{name:"Botox — Forehead & Frown",duration:"30 min",price:25000},{name:"Botox — Full Face",duration:"45 min",price:45000},{name:"Lip Filler (0.5ml)",duration:"45 min",price:35000},{name:"Lip Filler (1ml)",duration:"45 min",price:55000},{name:"Cheek & Jawline Filler",duration:"60 min",price:65000},{name:"Skin Booster — Profhilo",duration:"30 min",price:50000}]},
  { id:12, name:"The Aesthetic Suite MoBay",cat:"injectable", type:"Injectables & Aesthetics", location:"Montego Bay",   lat:18.478, lng:-77.895, rating:4.8, reviews:94,  price:28000, image:"https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&q=80", tags:["Botox","Filler","Profhilo"],    available:"Thu",      featured:false, status:"approved", medical:true,  about:"MoBay's premier aesthetics suite. Subtle, natural results by registered practitioners.", services:[{name:"Consultation",duration:"30 min",price:5000},{name:"Anti-Wrinkle Injections",duration:"30 min",price:28000},{name:"Dermal Filler — Lips",duration:"45 min",price:38000},{name:"Dermal Filler — Cheeks",duration:"60 min",price:60000},{name:"PRP Hair Restoration",duration:"60 min",price:55000}]},
];

const PROMOS = { "GLOW20":"20% off your booking", "NEWJA":"J$1,000 off any service", "VIP50":"50% off — VIP members only" };
const TIMES = ["9:00 AM","10:00 AM","11:00 AM","12:00 PM","2:00 PM","3:00 PM","4:00 PM","5:00 PM"];
const LOCS  = ["All Locations","New Kingston","Half Way Tree","Portmore","Montego Bay","Ocho Rios","Spanish Town","Mandeville"];

const MOCK_HISTORY = [
  {id:"BK-2201",venue:"Tresses by Tamika",service:"Box Braids",date:"Mon 10 Mar",time:"10:00 AM",price:8500,status:"completed",image:"https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=200&q=60"},
  {id:"BK-2187",venue:"Serenity Spa",service:"Swedish Massage",date:"Tue 25 Feb",time:"2:00 PM",price:5500,status:"completed",image:"https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=200&q=60"},
  {id:"BK-2143",venue:"Nail'd It Ja",service:"Gel Manicure",date:"Sat 8 Feb",time:"11:00 AM",price:2200,status:"cancelled",image:"https://images.unsplash.com/photo-1604654894610-df63bc536371?w=200&q=60"},
];

const ADMIN_VENDORS = [
  {id:101,name:"Serenity Spa & Wellness",owner:"Michelle Clarke",type:"Massage & Body",location:"New Kingston",email:"hello@serenityspa.com",status:"approved",joined:"Mar 1",revenue:245000,firstBookings:12,repeatBookings:31},
  {id:102,name:"Pure Skin Ocho Rios",owner:"Danielle Brown",type:"Facials",location:"Ocho Rios",email:"pureskin@email.com",status:"pending",joined:"Mar 14",revenue:0,firstBookings:0,repeatBookings:0},
  {id:103,name:"Island Glow Spa",owner:"Tamara Reid",type:"Massage & Body",location:"Montego Bay",email:"islandglow@email.com",status:"pending",joined:"Mar 15",revenue:0,firstBookings:0,repeatBookings:0},
  {id:104,name:"Tresses by Tamika",owner:"Tamika Williams",type:"Hair Salon",location:"New Kingston",email:"tamika@tresses.com",status:"approved",joined:"Jan 12",revenue:412000,firstBookings:38,repeatBookings:74},
];

// Commission model: 30% on first booking per customer/vendor pair, 5% on repeats
const calcCommission = (v) => {
  const firstComm  = Math.round(v.revenue * 0.30 * (v.firstBookings  / Math.max(v.firstBookings + v.repeatBookings, 1)));
  const repeatComm = Math.round(v.revenue * 0.05 * (v.repeatBookings / Math.max(v.firstBookings + v.repeatBookings, 1)));
  return firstComm + repeatComm;
};
const calcVendorPayout = (v) => v.revenue - calcCommission(v);

// ─── Helpers ───────────────────────────────────────────────
const fmt = (n) => Number(n).toLocaleString();
function Badge({s}) {
  const m = {approved:{bg:"rgba(74,222,128,0.1)",c:"#4ade80",l:"Approved"},pending:{bg:"rgba(251,191,36,0.1)",c:"#fbbf24",l:"Pending"},rejected:{bg:"rgba(248,113,113,0.1)",c:"#f87171",l:"Rejected"},completed:{bg:"rgba(200,207,217,0.1)",c:C.plat,l:"Completed"},confirmed:{bg:"rgba(74,222,128,0.1)",c:"#4ade80",l:"Confirmed"},cancelled:{bg:"rgba(248,113,113,0.1)",c:"#f87171",l:"Cancelled"}};
  const x=m[s]||m.pending;
  return <span style={{background:x.bg,color:x.c,padding:"3px 10px",borderRadius:20,fontSize:11,fontWeight:600}}>{x.l}</span>;
}

// ─── Map ───────────────────────────────────────────────────
function MapView({salons,onSelect}) {
  const [hov,setHov]=useState(null);
  const proj=(lat,lng)=>({x:((lng-(-78.4))/((-76.2)-(-78.4)))*100,y:(((18.6)-lat)/((18.6)-(17.7)))*100});
  return (
    <div style={{position:"relative",background:C.surface,borderRadius:16,border:`1px solid ${C.border}`,overflow:"hidden",height:400}}>
      <svg viewBox="0 0 100 50" style={{position:"absolute",inset:0,width:"100%",height:"100%",opacity:0.12}} preserveAspectRatio="none">
        {[10,20,30,40,50,60,70,80,90].map(x=><line key={x} x1={x} y1="0" x2={x} y2="50" stroke={C.plat} strokeWidth="0.15" strokeOpacity="0.4"/>)}
        {[10,20,30,40].map(y=><line key={y} x1="0" y1={y} x2="100" y2={y} stroke={C.plat} strokeWidth="0.15" strokeOpacity="0.4"/>)}
        <path d="M 8,28 C 10,24 16,20 25,19 C 35,18 45,16 55,17 C 65,16 72,18 78,22 C 84,25 88,28 88,31 C 88,34 84,37 78,38 C 70,40 60,40 50,39 C 40,39 30,39 22,37 C 14,35 8,32 8,28 Z" fill={C.plat} fillOpacity="0.06" stroke={C.plat} strokeWidth="0.3" strokeOpacity="0.2"/>
      </svg>
      {salons.filter(s=>s.lat&&s.lng).map(s=>{
        const p=proj(s.lat,s.lng), isH=hov===s.id;
        return (
          <div key={s.id} onClick={()=>onSelect(s)} onMouseEnter={()=>setHov(s.id)} onMouseLeave={()=>setHov(null)}
            style={{position:"absolute",left:`${p.x}%`,top:`${p.y}%`,transform:"translate(-50%,-100%)",cursor:"pointer",zIndex:isH?10:1,transition:"all 0.2s"}}>
            <div style={{background:isH?C.gold:C.card,border:`2px solid ${isH?C.gold:C.borderHi}`,borderRadius:20,padding:"3px 9px",fontSize:10,fontWeight:600,color:isH?C.bg:C.plat,whiteSpace:"nowrap",boxShadow:isH?"0 8px 24px rgba(0,0,0,0.5)":"0 4px 12px rgba(0,0,0,0.4)"}}>
              {SERVICE_CATEGORIES.find(c=>c.id===s.cat)?.icon} {s.name.split(" ")[0]}
            </div>
            <div style={{width:7,height:7,background:isH?C.gold:C.borderHi,borderRadius:"50%",margin:"2px auto 0"}} />
            {isH && <div style={{position:"absolute",top:"calc(100% + 8px)",left:"50%",transform:"translateX(-50%)",background:C.card,border:`1px solid ${C.borderHi}`,borderRadius:10,padding:"10px 14px",minWidth:170,boxShadow:"0 12px 32px rgba(0,0,0,0.6)",zIndex:20}}>
              <div style={{fontSize:12,fontWeight:600,color:C.white,marginBottom:2}}>{s.name}</div>
              <div style={{fontSize:11,color:C.platDim,marginBottom:4}}>📍 {s.location}</div>
              <div style={{display:"flex",justifyContent:"space-between"}}><span style={{fontSize:11,color:C.gold}}>★ {s.rating}</span><span style={{fontSize:12,fontWeight:700,color:C.white}}>J${fmt(s.price)}</span></div>
            </div>}
          </div>
        );
      })}
      <div style={{position:"absolute",bottom:12,left:12,background:"rgba(22,27,36,0.9)",backdropFilter:"blur(8px)",borderRadius:9,padding:"7px 13px",border:`1px solid ${C.border}`}}>
        <div style={{fontSize:9,color:C.platDim,marginBottom:4,fontWeight:600,letterSpacing:"0.5px"}}>JAMAICA</div>
        <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
          {SERVICE_CATEGORIES.map(c=><span key={c.id} style={{fontSize:9,color:C.platDim}}>{c.icon} {c.label.split(" ")[0]}</span>)}
        </div>
      </div>
      <div style={{position:"absolute",top:12,right:12,background:"rgba(22,27,36,0.9)",borderRadius:8,padding:"5px 11px",fontSize:11,color:C.platDim,border:`1px solid ${C.border}`}}>{salons.length} venues · hover to preview</div>
    </div>
  );
}

// ─── Venue Card ────────────────────────────────────────────
function VenueCard({v,onClick,onFav,favs}) {
  const isFav=favs.includes(v.id);
  const cat=SERVICE_CATEGORIES.find(c=>c.id===v.cat);
  return (
    <div onClick={onClick} style={{background:C.card,borderRadius:16,overflow:"hidden",border:`1px solid ${C.border}`,cursor:"pointer",transition:"all 0.25s"}}
      onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.borderColor=C.borderHi;}}
      onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.borderColor=C.border;}}>
      <div style={{position:"relative",height:185,overflow:"hidden"}}>
        <img src={v.image} alt={v.name} style={{width:"100%",height:"100%",objectFit:"cover",transition:"transform 0.4s"}} onMouseEnter={e=>e.target.style.transform="scale(1.05)"} onMouseLeave={e=>e.target.style.transform="scale(1)"}/>
        <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(15,17,23,0.7) 0%,transparent 55%)"}}/>
        <div style={{position:"absolute",top:10,left:10,background:"rgba(22,27,36,0.85)",backdropFilter:"blur(8px)",padding:"3px 9px",borderRadius:20,fontSize:10,fontWeight:500,color:C.plat,display:"flex",alignItems:"center",gap:5}}>
          <span>{cat?.icon}</span>{v.type}
        </div>
        <button onClick={e=>{e.stopPropagation();onFav(v.id);}} style={{position:"absolute",top:8,right:8,background:"rgba(22,27,36,0.85)",border:"none",width:30,height:30,borderRadius:"50%",cursor:"pointer",fontSize:13,color:isFav?C.gold:C.muted}}>{isFav?"♥":"♡"}</button>
        {v.featured&&<div style={{position:"absolute",bottom:8,left:10,background:C.gold,color:C.bg,padding:"2px 8px",borderRadius:20,fontSize:9,fontWeight:700,letterSpacing:"0.5px"}}>FEATURED</div>}
        <div style={{position:"absolute",bottom:8,right:10,background:"rgba(22,27,36,0.85)",padding:"2px 7px",borderRadius:20,fontSize:10,fontWeight:600,color:C.gold}}>★ {v.rating}</div>
      </div>
      <div style={{padding:"13px 15px"}}>
        <h3 style={{fontSize:14,fontWeight:600,color:C.white,marginBottom:5,letterSpacing:"-0.2px"}}>{v.name}</h3>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8}}>
          <span style={{fontSize:11,color:C.platDim}}>📍 {v.location}</span>
          <span style={{fontSize:10,color:C.platDim}}>{v.reviews} reviews</span>
        </div>
        <div style={{display:"flex",gap:4,flexWrap:"wrap",marginBottom:10}}>
          {(v.tags||[]).map(t=><span key={t} style={{background:C.mutedLo,color:C.platDim,padding:"2px 8px",borderRadius:20,fontSize:10}}>{t}</span>)}
        </div>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",paddingTop:9,borderTop:`1px solid ${C.border}`}}>
          <div><span style={{fontSize:10,color:C.muted}}>From </span><span style={{fontWeight:700,fontSize:15,color:C.white}}>J${fmt(v.price)}</span></div>
          <div style={{display:"flex",alignItems:"center",gap:4,fontSize:10,color:C.success}}><span style={{width:5,height:5,background:C.success,borderRadius:"50%",display:"inline-block"}}/>{v.available}</div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════
export default function GlowJA() {
  // ── Mode (customer | vendor | admin) ──
  const [mode,setMode]       = useState("customer");
  const [view,setView]       = useState("home");

  // ── Customer state ──
  const [user,setUser]       = useState(null);
  const [authTab,setAuthTab] = useState("signin");
  const [aName,setAName]     = useState(""); const [aEmail,setAEmail]=useState(""); const [aPhone,setAPhone]=useState(""); const [aPass,setAPass]=useState(""); const [aErr,setAErr]=useState("");
  const [history,setHistory] = useState(MOCK_HISTORY);
  const [favs,setFavs]       = useState([1,3]);
  const [selCat,setSelCat]   = useState("all");
  const [selLoc,setSelLoc]   = useState("All Locations");
  const [search,setSearch]   = useState("");
  const [mapView,setMapView] = useState(false);
  const [showFilters,setShowFilters]=useState(false);
  const [minPrice,setMinPrice]=useState(0); const [maxPrice,setMaxPrice]=useState(15000); const [minRating,setMinRating]=useState(0);
  const [venue,setVenue]     = useState(null);
  const [svc,setSvc]         = useState(null);
  const [bkDate,setBkDate]   = useState(null); const [bkTime,setBkTime]=useState(null);
  const [bkName,setBkName]   = useState(""); const [bkPhone,setBkPhone]=useState("");
  const [payMethod,setPayMethod]=useState("wipay");
  const [cardNum,setCardNum] = useState(""); const [cardName,setCardName]=useState(""); const [cardExp,setCardExp]=useState(""); const [cardCvv,setCardCvv]=useState("");
  const [promo,setPromo]     = useState(""); const [promoApplied,setPromoApplied]=useState(null); const [promoErr,setPromoErr]=useState("");
  const [paying,setPaying]   = useState(false);
  const [confirmed,setConf]  = useState(null);
  const [giftAmt,setGiftAmt] = useState(5000); const [giftEmail,setGiftEmail]=useState(""); const [giftSent,setGiftSent]=useState(false);

  // ── Vendor state ──
  const [vendorUser,setVendorUser]=useState(null);
  const [vendorStep,setVendorStep]=useState(1);
  const [vName,setVName]=useState(""); const [vType,setVType]=useState(""); const [vLoc,setVLoc]=useState(""); const [vPhone,setVPhone]=useState(""); const [vEmail,setVEmail]=useState(""); const [vAbout,setVAbout]=useState(""); const [vHours,setVHours]=useState("Mon–Sat 9am–7pm"); const [vPass,setVPass]=useState("");
  const [vServices,setVServices]=useState([{name:"",duration:"",price:""}]);
  const [vendorBookings]=useState([
    {id:"BK-3001",client:"Kezia B.",service:"Swedish Massage",date:"Mon 16 Mar",time:"10:00 AM",price:5500,status:"confirmed",phone:"+1 876 555-0101"},
    {id:"BK-3002",client:"Tamara W.",service:"Hot Stone",date:"Mon 16 Mar",time:"2:00 PM",price:8500,status:"pending",phone:"+1 876 555-0102"},
    {id:"BK-3003",client:"Nadine C.",service:"Couples Massage",date:"Tue 17 Mar",time:"11:00 AM",price:14000,status:"confirmed",phone:"+1 876 555-0103"},
  ]);
  const [vendorBkFilter,setVendorBkFilter]=useState("all");

  // ── Admin state ──
  const [adminLoggedIn,setAdminLoggedIn]=useState(false);
  const [adminEmail,setAdminEmail]=useState(""); const [adminPass,setAdminPass]=useState("");
  const [vendors,setVendors]=useState(ADMIN_VENDORS);
  const [adminTab,setAdminTab]=useState("vendors");

  // ── Shared ──
  const [toast,setToast]=useState(null);
  const showToast=(m)=>{setToast(m);setTimeout(()=>setToast(null),3000);};

  // ── Computed ──
  const discount=promoApplied?(promoApplied==="GLOW20"?0.2:promoApplied==="VIP50"?0.5:0):0;
  const flatDisc=promoApplied==="NEWJA"?1000:0;
  const finalPrice=svc?Math.max(0,Math.round(svc.price*(1-discount)-flatDisc)):0;

  const getDates=()=>{
    const days=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],today=new Date();
    return Array.from({length:7},(_,i)=>{const d=new Date(today);d.setDate(today.getDate()+i);return{label:i===0?"Today":days[d.getDay()],date:d.getDate(),month:months[d.getMonth()],full:d.toDateString()};});
  };

  const filtered=SALONS.filter(s=>{
    if(s.status!=="approved")return false;
    const mc=selCat==="all"||s.cat===selCat;
    const ml=selLoc==="All Locations"||s.location===selLoc;
    const ms=s.name.toLowerCase().includes(search.toLowerCase())||s.location.toLowerCase().includes(search.toLowerCase());
    const mp=s.price>=minPrice&&s.price<=maxPrice;
    const mr=s.rating>=minRating;
    return mc&&ml&&ms&&mp&&mr;
  });

  const signIn=()=>{if(!aEmail||!aPass){setAErr("Fill in all fields");return;}setUser({name:aEmail.split("@")[0].replace(/[._]/g," ").replace(/\b\w/g,c=>c.toUpperCase()),email:aEmail,phone:aPhone||"+1 876 555-0100",joined:"March 2026",points:240});setAErr("");showToast("Welcome back 👋");setView("home");};
  const signUp=()=>{if(!aName||!aEmail||!aPass){setAErr("Fill in all fields");return;}setUser({name:aName,email:aEmail,phone:aPhone||"+1 876 555-0100",joined:"March 2026",points:0});setAErr("");showToast("Welcome to GlowJA ✦");setView("home");};
  const toggleFav=(id)=>{setFavs(prev=>prev.includes(id)?prev.filter(f=>f!==id):[...prev,id]);showToast(favs.includes(id)?"Removed from favourites":"Added to favourites ♥");};
  const applyPromo=()=>{if(PROMOS[promo.toUpperCase()]){setPromoApplied(promo.toUpperCase());setPromoErr("");showToast("✓ "+PROMOS[promo.toUpperCase()]);}else{setPromoErr("Invalid promo code");setPromoApplied(null);}};
  const handlePay=()=>{
    if(payMethod==="card"&&(!cardNum||!cardName||!cardExp||!cardCvv)){showToast("Complete card details");return;}
    setPaying(true);
    setTimeout(()=>{
      const bk={id:"BK-"+Math.floor(2200+Math.random()*800),venue:venue.name,service:svc.name,date:bkDate,time:bkTime,price:finalPrice,status:"confirmed",image:venue.image,location:venue.location,payMethod};
      setConf(bk);setHistory(prev=>[bk,...prev]);setPaying(false);setView("confirm");
    },2000);
  };

  // ── CSS ──
  const css=`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,500;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600;700&display=swap');
    *{box-sizing:border-box;margin:0;padding:0}
    ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:${C.bg}}::-webkit-scrollbar-thumb{background:${C.border};border-radius:2px}
    .btn-p{background:linear-gradient(135deg,${C.plat},${C.accent});color:${C.bg};border:none;cursor:pointer;font-family:'DM Sans',sans-serif;font-weight:600;transition:all 0.2s}
    .btn-p:hover{filter:brightness(1.08)}
    .btn-g{background:linear-gradient(135deg,${C.gold},${C.goldDim});color:${C.bg};border:none;cursor:pointer;font-family:'DM Sans',sans-serif;font-weight:600;transition:all 0.2s}
    .btn-g:hover{filter:brightness(1.1)}
    .btn-ghost{background:transparent;border:1px solid ${C.border};color:${C.plat};cursor:pointer;font-family:'DM Sans',sans-serif;font-weight:500;transition:all 0.2s}
    .btn-ghost:hover{border-color:${C.borderHi};background:${C.surface}}
    .btn-danger{background:rgba(248,113,113,0.1);border:1px solid rgba(248,113,113,0.2);color:${C.danger};cursor:pointer;font-family:'DM Sans',sans-serif;font-weight:500;transition:all 0.2s;border-radius:8px;padding:6px 12px;font-size:12px}
    .ifield{width:100%;padding:10px 13px;border:1px solid ${C.border};border-radius:9px;font-size:13px;font-family:'DM Sans',sans-serif;background:${C.surface};color:${C.white};outline:none;transition:border 0.2s}
    .ifield:focus{border-color:${C.plat}}
    .ifield::placeholder{color:${C.muted}}
    .pill{padding:6px 14px;border-radius:20px;font-size:12px;font-weight:500;cursor:pointer;transition:all 0.2s;font-family:'DM Sans',sans-serif;border:1px solid ${C.border};background:${C.surface};color:${C.platDim}}
    .pill.on{background:${C.plat};color:${C.bg};border-color:${C.plat};font-weight:600}
    .time-btn{padding:8px 13px;border-radius:8px;border:1px solid ${C.border};background:${C.surface};font-size:12px;cursor:pointer;font-family:'DM Sans',sans-serif;transition:all 0.2s;color:${C.plat}}
    .time-btn.on{background:${C.plat};color:${C.bg};border-color:${C.plat}}
    .date-btn{padding:9px 11px;border-radius:10px;border:1px solid ${C.border};background:${C.surface};cursor:pointer;text-align:center;font-family:'DM Sans',sans-serif;transition:all 0.2s;min-width:56px;color:${C.plat}}
    .date-btn.on{background:${C.plat};color:${C.bg};border-color:${C.plat}}
    .pay-opt{border:1px solid ${C.border};border-radius:11px;padding:11px 15px;cursor:pointer;transition:all 0.2s;background:${C.surface};display:flex;align-items:center;gap:11px;color:${C.plat}}
    .pay-opt.on{border-color:${C.plat};background:rgba(200,207,217,0.05)}
    .nav-link{font-size:12px;font-weight:500;color:${C.platDim};cursor:pointer;transition:color 0.2s;background:none;border:none;font-family:'DM Sans',sans-serif;padding:0}
    .nav-link:hover{color:${C.white}}
    .fadeIn{animation:fadeIn 0.3s ease}
    @keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
    .skel{background:linear-gradient(90deg,${C.card} 25%,${C.surface} 50%,${C.card} 75%);background-size:200% 100%;animation:shimmer 1.4s infinite;border-radius:10px}
    @keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}
    .srow{padding:12px 10px;border-bottom:1px solid ${C.border};cursor:pointer;transition:background 0.15s;border-radius:8px}
    .srow:hover{background:${C.mutedLo}}
    input[type=range]{-webkit-appearance:none;width:100%;height:3px;border-radius:2px;background:${C.border};outline:none}
    input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:13px;height:13px;border-radius:50%;background:${C.plat};cursor:pointer}
    .spin{animation:spin 1s linear infinite;display:inline-block}
    @keyframes spin{to{transform:rotate(360deg)}}
    select option{background:${C.surface}}
    .tab-btn{padding:8px 18px;border-radius:8px;border:none;cursor:pointer;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:500;transition:all 0.2s}
    .vtab{padding:10px 20px;border:none;background:none;cursor:pointer;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:500;color:${C.muted};border-bottom:2px solid transparent;transition:all 0.2s}
    .vtab.on{color:${C.white};border-bottom-color:${C.plat}}
  `;

  // ══════════════════════════════════════════════════════════
  // MODE SWITCHER (top bar when not logged in)
  // ══════════════════════════════════════════════════════════
  const ModeBar=()=>(
    <div style={{background:C.bg,borderBottom:`1px solid ${C.border}`,padding:"8px 28px",display:"flex",gap:6,justifyContent:"center"}}>
      {[{id:"customer",label:"👤 I'm a Customer"},{id:"vendor",label:"💼 I'm a Salon/Spa"},{id:"admin",label:"⚙️ Admin"}].map(m=>(
        <button key={m.id} onClick={()=>{setMode(m.id);setView("home");}} className="tab-btn"
          style={{background:mode===m.id?C.plat:C.surface,color:mode===m.id?C.bg:C.platDim,border:`1px solid ${mode===m.id?C.plat:C.border}`}}>
          {m.label}
        </button>
      ))}
    </div>
  );

  // ══════════════════════════════════════════════════════════
  // CUSTOMER NAV
  // ══════════════════════════════════════════════════════════
  const CustomerNav=()=>(
    <nav style={{background:"rgba(15,17,23,0.96)",backdropFilter:"blur(12px)",borderBottom:`1px solid ${C.border}`,padding:"0 28px",display:"flex",alignItems:"center",justifyContent:"space-between",height:60,position:"sticky",top:0,zIndex:200}}>
      <div onClick={()=>setView("home")} style={{cursor:"pointer",display:"flex",alignItems:"center",gap:9}}>
        <div style={{width:28,height:28,background:`linear-gradient(135deg,${C.plat},${C.accent})`,borderRadius:7,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:800,color:C.bg}}>G</div>
        <span style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:600,fontSize:20,color:C.white}}>Glow<span style={{color:C.gold}}>JA</span></span>
      </div>
      <div style={{display:"flex",gap:18,alignItems:"center"}}>
        <button className="nav-link" onClick={()=>setView("home")}>Explore</button>
        <button className="nav-link" onClick={()=>setView("giftcard")}>🎁 Gift Cards</button>
        <button className="nav-link" onClick={()=>{if(!user){setView("auth");}else setView("account");}}>My Bookings</button>
        {user?(
          <div onClick={()=>setView("account")} style={{display:"flex",alignItems:"center",gap:7,cursor:"pointer",background:C.surface,border:`1px solid ${C.border}`,borderRadius:20,padding:"4px 12px 4px 4px"}}>
            <div style={{width:26,height:26,background:`linear-gradient(135deg,${C.gold},${C.goldDim})`,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,color:C.bg}}>{user.name.charAt(0)}</div>
            <span style={{fontSize:12,fontWeight:500,color:C.plat}}>{user.name.split(" ")[0]}</span>
          </div>
        ):(
          <button className="btn-p" style={{padding:"7px 16px",borderRadius:8,fontSize:12}} onClick={()=>{setAuthTab("signin");setView("auth");}}>Sign In</button>
        )}
      </div>
    </nav>
  );

  // ══════════════════════════════════════════════════════════
  // ADMIN PORTAL
  // ══════════════════════════════════════════════════════════
  if(mode==="admin") {
    if(!adminLoggedIn) return (
      <div style={{fontFamily:"'DM Sans',sans-serif",background:C.bg,minHeight:"100vh",color:C.white}}>
        <style>{css}</style>
        <ModeBar/>
        <div style={{maxWidth:380,margin:"80px auto",padding:"0 20px"}}>
          <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:18,padding:32}}>
            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:24,fontWeight:600,marginBottom:4}}>Admin Portal</div>
            <p style={{fontSize:13,color:C.platDim,marginBottom:24}}>GlowJA platform management</p>
            <div style={{marginBottom:14}}><label style={{fontSize:11,color:C.platDim,display:"block",marginBottom:5}}>Email</label><input className="ifield" type="email" placeholder="admin@glowja.com" value={adminEmail} onChange={e=>setAdminEmail(e.target.value)}/></div>
            <div style={{marginBottom:20}}><label style={{fontSize:11,color:C.platDim,display:"block",marginBottom:5}}>Password</label><input className="ifield" type="password" placeholder="••••••••" value={adminPass} onChange={e=>setAdminPass(e.target.value)}/></div>
            <button className="btn-p" style={{width:"100%",padding:12,borderRadius:9,fontSize:14}} onClick={()=>setAdminLoggedIn(true)}>Access Admin Panel →</button>
            <p style={{fontSize:11,color:C.muted,textAlign:"center",marginTop:10}}>Demo: any credentials work</p>
          </div>
        </div>
      </div>
    );

    const allBookings=MOCK_HISTORY;
    const totalRevenue=vendors.filter(v=>v.status==="approved").reduce((s,v)=>s+v.revenue,0);
    return (
      <div style={{fontFamily:"'DM Sans',sans-serif",background:C.bg,minHeight:"100vh",color:C.white,display:"flex"}}>
        <style>{css}</style>
        {/* Sidebar */}
        <aside style={{width:210,background:"#0a0c12",borderRight:`1px solid ${C.border}`,padding:"20px 12px",display:"flex",flexDirection:"column",flexShrink:0,position:"sticky",top:0,height:"100vh",overflow:"auto"}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:28,padding:"0 4px"}}>
            <div style={{width:26,height:26,background:`linear-gradient(135deg,${C.plat},${C.accent})`,borderRadius:6,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:800,color:C.bg}}>G</div>
            <div><div style={{fontWeight:700,fontSize:14,color:C.white}}>GlowJA Admin</div><div style={{fontSize:10,color:C.muted}}>Platform Management</div></div>
          </div>
          {[{id:"vendors",icon:"🏪",l:"Vendors"},{id:"bookings",icon:"📅",l:"All Bookings"},{id:"revenue",icon:"💰",l:"Revenue"},{id:"settings",icon:"⚙️",l:"Settings"}].map(t=>(
            <button key={t.id} onClick={()=>setAdminTab(t.id)} style={{display:"flex",alignItems:"center",gap:9,padding:"10px 14px",borderRadius:9,cursor:"pointer",fontSize:13,fontWeight:500,transition:"all 0.18s",color:adminTab===t.id?C.gold:C.platDim,background:adminTab===t.id?"rgba(212,175,122,0.1)":"none",border:"none",fontFamily:"'DM Sans',sans-serif",width:"100%",marginBottom:4,textAlign:"left"}}>
              <span>{t.icon}</span>{t.l}
            </button>
          ))}
          <div style={{marginTop:"auto",paddingTop:16,borderTop:`1px solid ${C.border}`}}>
            <button onClick={()=>{setAdminLoggedIn(false);setMode("customer");}} style={{background:"none",border:"none",color:C.danger,cursor:"pointer",fontSize:12,fontFamily:"'DM Sans',sans-serif"}}>Sign Out</button>
          </div>
        </aside>

        <main style={{flex:1,padding:"28px 32px",overflow:"auto"}}>
          {/* Stats */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14,marginBottom:28}}>
            {[
              {l:"Total Vendors",v:vendors.length,s:"on platform",i:"🏪"},
              {l:"Approved",v:vendors.filter(v=>v.status==="approved").length,s:"active listings",i:"✅"},
              {l:"Pending Review",v:vendors.filter(v=>v.status==="pending").length,s:"awaiting approval",i:"⏳"},
              {l:"Platform Revenue",v:"J$"+fmt(vendors.filter(v=>v.status==="approved").reduce((s,v)=>s+calcCommission(v),0)),s:"30% new · 5% repeat",i:"💰"},
            ].map(s=>(
              <div key={s.l} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:13,padding:18}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}><span style={{fontSize:10,color:C.muted,textTransform:"uppercase",letterSpacing:"0.5px"}}>{s.l}</span><span style={{fontSize:18}}>{s.i}</span></div>
                <div style={{fontSize:24,fontWeight:700,color:C.gold,marginBottom:3}}>{s.v}</div>
                <div style={{fontSize:11,color:C.muted}}>{s.s}</div>
              </div>
            ))}
          </div>

          {adminTab==="vendors" && (
            <div>
              <h2 style={{fontSize:18,fontWeight:600,marginBottom:18,color:C.white}}>Vendor Management</h2>
              <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:14,overflow:"hidden"}}>
                <table style={{width:"100%",borderCollapse:"collapse"}}>
                  <thead><tr style={{borderBottom:`1px solid ${C.border}`}}>
                    {["Business","Owner","Type","Location","Joined","Revenue","Status","Actions"].map(h=>(
                      <th key={h} style={{padding:"12px 16px",textAlign:"left",fontSize:10,color:C.muted,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.5px"}}>{h}</th>
                    ))}
                  </tr></thead>
                  <tbody>{vendors.map((v,i)=>(
                    <tr key={v.id} style={{borderBottom:i<vendors.length-1?`1px solid ${C.border}`:"none"}}>
                      <td style={{padding:"14px 16px",fontSize:13,fontWeight:600,color:C.white}}>{v.name}</td>
                      <td style={{padding:"14px 16px",fontSize:12,color:C.platDim}}>{v.owner}</td>
                      <td style={{padding:"14px 16px",fontSize:12,color:C.platDim}}>{v.type}</td>
                      <td style={{padding:"14px 16px",fontSize:12,color:C.platDim}}>{v.location}</td>
                      <td style={{padding:"14px 16px",fontSize:12,color:C.platDim}}>{v.joined}</td>
                      <td style={{padding:"14px 16px",fontSize:13,fontWeight:600,color:C.gold}}>J${fmt(v.revenue)}</td>
                      <td style={{padding:"14px 16px"}}><Badge s={v.status}/></td>
                      <td style={{padding:"14px 16px"}}>
                        <div style={{display:"flex",gap:6}}>
                          {v.status==="pending"&&<><button className="btn-ghost" style={{padding:"5px 10px",fontSize:11,background:"rgba(74,222,128,0.1)",color:C.success,border:"1px solid rgba(74,222,128,0.2)"}} onClick={()=>{setVendors(prev=>prev.map(x=>x.id===v.id?{...x,status:"approved"}:x));showToast(`${v.name} approved ✓`);}}>Approve</button><button className="btn-danger" onClick={()=>setVendors(prev=>prev.map(x=>x.id===v.id?{...x,status:"rejected"}:x))}>Reject</button></>}
                          {v.status==="approved"&&<button className="btn-ghost" style={{padding:"5px 10px",fontSize:11}} onClick={()=>{setVendors(prev=>prev.map(x=>x.id===v.id?{...x,status:"pending"}:x));showToast("Listing paused");}}>Pause</button>}
                        </div>
                      </td>
                    </tr>
                  ))}</tbody>
                </table>
              </div>
            </div>
          )}

          {adminTab==="bookings" && (
            <div>
              <h2 style={{fontSize:18,fontWeight:600,marginBottom:18,color:C.white}}>All Platform Bookings</h2>
              <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:14,overflow:"hidden"}}>
                <table style={{width:"100%",borderCollapse:"collapse"}}>
                  <thead><tr style={{borderBottom:`1px solid ${C.border}`}}>
                    {["Booking ID","Customer","Service","Venue","Date","Price","Status"].map(h=>(
                      <th key={h} style={{padding:"12px 16px",textAlign:"left",fontSize:10,color:C.muted,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.5px"}}>{h}</th>
                    ))}
                  </tr></thead>
                  <tbody>{MOCK_HISTORY.map((b,i)=>(
                    <tr key={b.id} style={{borderBottom:i<MOCK_HISTORY.length-1?`1px solid ${C.border}`:"none"}}>
                      <td style={{padding:"13px 16px",fontSize:12,color:C.gold,fontWeight:600}}>{b.id}</td>
                      <td style={{padding:"13px 16px",fontSize:13,color:C.white,fontWeight:500}}>Kezia Brown</td>
                      <td style={{padding:"13px 16px",fontSize:12,color:C.platDim}}>{b.service}</td>
                      <td style={{padding:"13px 16px",fontSize:12,color:C.platDim}}>{b.venue}</td>
                      <td style={{padding:"13px 16px",fontSize:12,color:C.platDim}}>{b.date}</td>
                      <td style={{padding:"13px 16px",fontSize:13,fontWeight:600,color:C.gold}}>J${fmt(b.price)}</td>
                      <td style={{padding:"13px 16px"}}><Badge s={b.status}/></td>
                    </tr>
                  ))}</tbody>
                </table>
              </div>
            </div>
          )}

          {adminTab==="revenue" && (
            <div>
              <h2 style={{fontSize:18,fontWeight:600,marginBottom:18,color:C.white}}>Revenue Overview</h2>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
                <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:14,padding:22}}>
                  <div style={{fontSize:12,color:C.muted,marginBottom:14,fontWeight:500,textTransform:"uppercase",letterSpacing:"0.5px"}}>Vendor Revenue (Gross)</div>
                  {vendors.filter(v=>v.status==="approved").map(v=>(
                    <div key={v.id} style={{display:"flex",justifyContent:"space-between",padding:"9px 0",borderBottom:`1px solid ${C.border}`}}>
                      <span style={{fontSize:13,color:C.plat}}>{v.name}</span>
                      <span style={{fontSize:13,fontWeight:700,color:C.white}}>J${fmt(v.revenue)}</span>
                    </div>
                  ))}
                </div>
                <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:14,padding:22}}>
                  <div style={{fontSize:12,color:C.muted,marginBottom:14,fontWeight:500,textTransform:"uppercase",letterSpacing:"0.5px"}}>GlowJA Commission (20%)</div>
                  {vendors.filter(v=>v.status==="approved").map(v=>(
                    <div key={v.id} style={{display:"flex",justifyContent:"space-between",padding:"9px 0",borderBottom:`1px solid ${C.border}`}}>
                      <span style={{fontSize:13,color:C.plat}}>{v.name}</span>
                      <span style={{fontSize:13,fontWeight:700,color:C.gold}}>J${fmt(Math.round(v.revenue*0.2))}</span>
                    </div>
                  ))}
                  <div style={{display:"flex",justifyContent:"space-between",padding:"12px 0 0",marginTop:4}}>
                    <span style={{fontSize:13,fontWeight:700,color:C.white}}>Total</span>
                    <span style={{fontSize:16,fontWeight:800,color:C.gold}}>J${fmt(Math.round(vendors.filter(v=>v.status==="approved").reduce((s,v)=>s+v.revenue,0)*0.2))}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {adminTab==="settings" && (
            <div style={{maxWidth:500}}>
              <h2 style={{fontSize:18,fontWeight:600,marginBottom:18,color:C.white}}>Platform Settings</h2>
              <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:14,padding:24,display:"flex",flexDirection:"column",gap:16}}>
                {[{l:"Platform Commission %",v:"20%"},{l:"Payment Processor",v:"WiPay Jamaica"},{l:"Default Currency",v:"JMD (J$)"},{l:"Payout Schedule",v:"Weekly (Fridays)"},{l:"Auto-Approve Vendors",v:"Off — Manual Review"}].map(s=>(
                  <div key={s.l} style={{display:"flex",justifyContent:"space-between",padding:"10px 0",borderBottom:`1px solid ${C.border}`}}>
                    <span style={{fontSize:13,color:C.platDim}}>{s.l}</span>
                    <span style={{fontSize:13,fontWeight:600,color:C.white}}>{s.v}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
        {toast&&<div style={{position:"fixed",bottom:24,left:"50%",transform:"translateX(-50%)",background:C.card,border:`1px solid ${C.borderHi}`,color:C.white,padding:"11px 20px",borderRadius:10,fontSize:13,zIndex:999,boxShadow:"0 8px 32px rgba(0,0,0,0.5)",whiteSpace:"nowrap"}}>{toast}</div>}
      </div>
    );
  }

  // ══════════════════════════════════════════════════════════
  // VENDOR PORTAL
  // ══════════════════════════════════════════════════════════
  if(mode==="vendor") {
    if(!vendorUser) {
      // Onboarding flow
      return (
        <div style={{fontFamily:"'DM Sans',sans-serif",background:C.bg,minHeight:"100vh",color:C.white}}>
          <style>{css}</style>
          <ModeBar/>
          <div style={{maxWidth:560,margin:"40px auto",padding:"0 20px"}}>
            {/* Progress */}
            <div style={{display:"flex",alignItems:"center",gap:0,marginBottom:32,justifyContent:"center"}}>
              {[{n:1,l:"Account"},{n:2,l:"Business"},{n:3,l:"Services"},{n:4,l:"Payment"}].map((s,i)=>(
                <div key={s.n} style={{display:"flex",alignItems:"center"}}>
                  <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
                    <div style={{width:32,height:32,borderRadius:"50%",background:vendorStep>=s.n?C.plat:C.surface,border:`2px solid ${vendorStep>=s.n?C.plat:C.border}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:vendorStep>=s.n?C.bg:C.muted,transition:"all 0.3s"}}>{vendorStep>s.n?"✓":s.n}</div>
                    <span style={{fontSize:10,color:vendorStep>=s.n?C.plat:C.muted,whiteSpace:"nowrap"}}>{s.l}</span>
                  </div>
                  {i<3&&<div style={{width:60,height:2,background:vendorStep>s.n?C.plat:C.border,margin:"0 4px",marginBottom:18,transition:"all 0.3s"}}/>}
                </div>
              ))}
            </div>

            <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:18,padding:28}}>
              {vendorStep===1&&<>
                <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:24,fontWeight:600,marginBottom:4}}>Create your account</div>
                <p style={{fontSize:13,color:C.platDim,marginBottom:22}}>Join Jamaica's luxury beauty platform</p>
                <div style={{display:"flex",flexDirection:"column",gap:13}}>
                  <div><label style={{fontSize:11,color:C.platDim,display:"block",marginBottom:5}}>Full Name</label><input className="ifield" placeholder="Your name" value={aName} onChange={e=>setAName(e.target.value)}/></div>
                  <div><label style={{fontSize:11,color:C.platDim,display:"block",marginBottom:5}}>Email Address</label><input className="ifield" type="email" placeholder="you@business.com" value={vEmail} onChange={e=>setVEmail(e.target.value)}/></div>
                  <div><label style={{fontSize:11,color:C.platDim,display:"block",marginBottom:5}}>Phone</label><input className="ifield" placeholder="+1 (876) 555-0100" value={vPhone} onChange={e=>setVPhone(e.target.value)}/></div>
                  <div><label style={{fontSize:11,color:C.platDim,display:"block",marginBottom:5}}>Password</label><input className="ifield" type="password" placeholder="••••••••" value={vPass} onChange={e=>setVPass(e.target.value)}/></div>
                  <button className="btn-p" style={{padding:12,borderRadius:9,fontSize:14,marginTop:4}} onClick={()=>setVendorStep(2)}>Continue →</button>
                </div>
              </>}

              {vendorStep===2&&<>
                <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:24,fontWeight:600,marginBottom:4}}>Business details</div>
                <p style={{fontSize:13,color:C.platDim,marginBottom:22}}>Tell us about your salon or spa</p>
                <div style={{display:"flex",flexDirection:"column",gap:13}}>
                  <div><label style={{fontSize:11,color:C.platDim,display:"block",marginBottom:5}}>Business Name</label><input className="ifield" placeholder="e.g. Serenity Spa & Wellness" value={vName} onChange={e=>setVName(e.target.value)}/></div>
                  <div>
                    <label style={{fontSize:11,color:C.platDim,display:"block",marginBottom:5}}>Business Type</label>
                    <select className="ifield" value={vType} onChange={e=>setVType(e.target.value)}>
                      <option value="">Select type...</option>
                      {SERVICE_CATEGORIES.map(c=><option key={c.id} value={c.id}>{c.icon} {c.label}{c.medical ? " (Medical — Requires Practitioner Credentials)" : ""}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{fontSize:11,color:C.platDim,display:"block",marginBottom:5}}>Location</label>
                    <select className="ifield" value={vLoc} onChange={e=>setVLoc(e.target.value)}>
                      <option value="">Select area...</option>
                      {LOCS.slice(1).map(l=><option key={l}>{l}</option>)}
                    </select>
                  </div>
                  {vType==="injectable"&&<div style={{background:"rgba(251,191,36,0.06)",border:"1px solid rgba(251,191,36,0.2)",borderRadius:10,padding:"12px 14px",display:"flex",gap:10}}>
                    <span style={{fontSize:16}}>⚕️</span>
                    <div><div style={{fontSize:12,fontWeight:600,color:C.warn,marginBottom:2}}>Medical Practitioner Requirements</div><div style={{fontSize:11,color:C.platDim,lineHeight:1.6}}>Injectable listings require proof of medical qualifications (GMC/JMDC registration). Our admin team will verify credentials during review before your listing goes live.</div></div>
                  </div>}
                  <div><label style={{fontSize:11,color:C.platDim,display:"block",marginBottom:5}}>Opening Hours</label><input className="ifield" placeholder="e.g. Mon–Sat 9am–7pm" value={vHours} onChange={e=>setVHours(e.target.value)}/></div>
                  <div><label style={{fontSize:11,color:C.platDim,display:"block",marginBottom:5}}>About Your Business</label><textarea className="ifield" placeholder="Describe your services and what makes you special..." value={vAbout} onChange={e=>setVAbout(e.target.value)} style={{minHeight:80,resize:"vertical"}}/></div>
                  <div style={{display:"flex",gap:10}}>
                    <button className="btn-ghost" style={{flex:1,padding:12,borderRadius:9,fontSize:13}} onClick={()=>setVendorStep(1)}>← Back</button>
                    <button className="btn-p" style={{flex:2,padding:12,borderRadius:9,fontSize:14}} onClick={()=>setVendorStep(3)}>Continue →</button>
                  </div>
                </div>
              </>}

              {vendorStep===3&&<>
                <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:24,fontWeight:600,marginBottom:4}}>Your services</div>
                <p style={{fontSize:13,color:C.platDim,marginBottom:22}}>Add the services you offer with pricing</p>
                <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:16}}>
                  {vServices.map((s,i)=>(
                    <div key={i} style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:11,padding:14}}>
                      <div style={{display:"grid",gridTemplateColumns:"1fr 100px 100px",gap:10,marginBottom:8}}>
                        <div><label style={{fontSize:10,color:C.platDim,display:"block",marginBottom:4}}>Service Name</label><input className="ifield" placeholder="e.g. Swedish Massage" value={s.name} onChange={e=>setVServices(prev=>prev.map((x,j)=>j===i?{...x,name:e.target.value}:x))}/></div>
                        <div><label style={{fontSize:10,color:C.platDim,display:"block",marginBottom:4}}>Duration</label><input className="ifield" placeholder="60 min" value={s.duration} onChange={e=>setVServices(prev=>prev.map((x,j)=>j===i?{...x,duration:e.target.value}:x))}/></div>
                        <div><label style={{fontSize:10,color:C.platDim,display:"block",marginBottom:4}}>Price (J$)</label><input className="ifield" placeholder="5500" type="number" value={s.price} onChange={e=>setVServices(prev=>prev.map((x,j)=>j===i?{...x,price:e.target.value}:x))}/></div>
                      </div>
                      {vServices.length>1&&<button onClick={()=>setVServices(prev=>prev.filter((_,j)=>j!==i))} style={{background:"none",border:"none",color:C.danger,cursor:"pointer",fontSize:12,fontFamily:"'DM Sans',sans-serif"}}>Remove</button>}
                    </div>
                  ))}
                  <button className="btn-ghost" style={{padding:"9px",borderRadius:9,fontSize:12}} onClick={()=>setVServices(prev=>[...prev,{name:"",duration:"",price:""}])}>+ Add Another Service</button>
                </div>
                <div style={{display:"flex",gap:10}}>
                  <button className="btn-ghost" style={{flex:1,padding:12,borderRadius:9,fontSize:13}} onClick={()=>setVendorStep(2)}>← Back</button>
                  <button className="btn-p" style={{flex:2,padding:12,borderRadius:9,fontSize:14}} onClick={()=>setVendorStep(4)}>Continue →</button>
                </div>
              </>}

              {vendorStep===4&&<>
                <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:24,fontWeight:600,marginBottom:4}}>Payment setup</div>
                <p style={{fontSize:13,color:C.platDim,marginBottom:22}}>How you'll receive payouts from GlowJA</p>
                <div style={{background:"rgba(212,175,122,0.06)",border:`1px solid rgba(212,175,122,0.15)`,borderRadius:12,padding:16,marginBottom:20}}>
                  <div style={{fontSize:13,fontWeight:600,color:C.gold,marginBottom:8}}>💳 WiPay — Recommended for Jamaica</div>
                  <div style={{fontSize:12,color:C.platDim,lineHeight:1.6,marginBottom:10}}>GlowJA uses WiPay as our payment processor. It supports all Jamaican banks including NCB and Scotiabank. Settlements go directly to your bank account within 5–7 business days.</div>
                  {[{l:"Commission",v:"GlowJA takes 20% per booking"},{l:"Payout",v:"Weekly to your Jamaican bank"},{l:"Currencies",v:"JMD & USD accepted"},{l:"Banks",v:"NCB, Scotiabank, CIBC, JN Bank & more"}].map(r=>(
                    <div key={r.l} style={{display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:`1px solid rgba(212,175,122,0.1)`}}>
                      <span style={{fontSize:12,color:C.platDim}}>{r.l}</span><span style={{fontSize:12,fontWeight:600,color:C.white}}>{r.v}</span>
                    </div>
                  ))}
                </div>
                <div style={{display:"flex",flexDirection:"column",gap:12,marginBottom:18}}>
                  <div><label style={{fontSize:11,color:C.platDim,display:"block",marginBottom:5}}>Bank Name</label><select className="ifield"><option>NCB — National Commercial Bank</option><option>Scotiabank Jamaica</option><option>CIBC FirstCaribbean</option><option>JN Bank</option><option>Sagicor Bank</option></select></div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                    <div><label style={{fontSize:11,color:C.platDim,display:"block",marginBottom:5}}>Account Name</label><input className="ifield" placeholder="Business name"/></div>
                    <div><label style={{fontSize:11,color:C.platDim,display:"block",marginBottom:5}}>Account Number</label><input className="ifield" placeholder="••••••••"/></div>
                  </div>
                </div>
                <div style={{display:"flex",gap:10}}>
                  <button className="btn-ghost" style={{flex:1,padding:12,borderRadius:9,fontSize:13}} onClick={()=>setVendorStep(3)}>← Back</button>
                  <button className="btn-p" style={{flex:2,padding:12,borderRadius:9,fontSize:14}} onClick={()=>{setVendorUser({name:vName||"Your Business",type:vType,location:vLoc,email:vEmail,status:"pending"});showToast("Application submitted! Under review ✓");}}>Submit Application →</button>
                </div>
              </>}
            </div>
          </div>
        </div>
      );
    }

    // Vendor Dashboard
    const [vDashTab,setVDashTab]=[useState("overview"),v=>{}]; // simplified
    const totalRev=vendorBookings.filter(b=>b.status==="confirmed").reduce((s,b)=>s+b.price,0);
    return (
      <div style={{fontFamily:"'DM Sans',sans-serif",background:C.bg,minHeight:"100vh",color:C.white,display:"flex"}}>
        <style>{css}</style>
        <aside style={{width:210,background:"#0a0c12",borderRight:`1px solid ${C.border}`,padding:"20px 12px",display:"flex",flexDirection:"column",flexShrink:0,position:"sticky",top:0,height:"100vh",overflow:"auto"}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:28,padding:"0 4px"}}>
            <div style={{width:28,height:28,background:`linear-gradient(135deg,${C.gold},${C.goldDim})`,borderRadius:7,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:800,color:C.bg}}>V</div>
            <div><div style={{fontWeight:700,fontSize:13,color:C.white}}>{vendorUser.name||"Your Business"}</div><div style={{fontSize:10,color:vendorUser.status==="pending"?C.warn:C.success}}>{vendorUser.status==="pending"?"⏳ Pending Review":"✓ Live on GlowJA"}</div></div>
          </div>
          {[{id:"overview",icon:"◈",l:"Overview"},{id:"bookings",icon:"📅",l:"Bookings"},{id:"services",icon:"✦",l:"Services"},{id:"profile",icon:"◎",l:"Profile"}].map(t=>(
            <button key={t.id} style={{display:"flex",alignItems:"center",gap:9,padding:"10px 14px",borderRadius:9,cursor:"pointer",fontSize:13,fontWeight:500,transition:"all 0.18s",color:C.platDim,background:"none",border:"none",fontFamily:"'DM Sans',sans-serif",width:"100%",marginBottom:4,textAlign:"left"}}
              onMouseEnter={e=>e.currentTarget.style.color=C.white} onMouseLeave={e=>e.currentTarget.style.color=C.platDim}>
              <span>{t.icon}</span>{t.l}
            </button>
          ))}
          <div style={{marginTop:"auto",paddingTop:16,borderTop:`1px solid ${C.border}`}}>
            <button onClick={()=>{setVendorUser(null);setVendorStep(1);}} style={{background:"none",border:"none",color:C.muted,cursor:"pointer",fontSize:12,fontFamily:"'DM Sans',sans-serif"}}>Sign Out</button>
          </div>
        </aside>
        <main style={{flex:1,padding:"28px 32px",overflow:"auto"}}>
          <div style={{marginBottom:28}}>
            <h1 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:26,fontWeight:500,marginBottom:4,color:C.white}}>Good morning ✦</h1>
            <p style={{fontSize:13,color:C.platDim}}>Here's your business at a glance</p>
            {vendorUser.status==="pending"&&<div style={{marginTop:12,background:"rgba(251,191,36,0.08)",border:"1px solid rgba(251,191,36,0.2)",borderRadius:10,padding:"10px 16px",fontSize:13,color:C.warn}}>⏳ Your listing is under review by the GlowJA team. You'll be notified once approved.</div>}
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14,marginBottom:24}}>
            {[{l:"Revenue",v:`J$${fmt(totalRev)}`,i:"💰",c:C.gold},{l:"Confirmed",v:vendorBookings.filter(b=>b.status==="confirmed").length,i:"✓",c:C.success},{l:"Pending",v:vendorBookings.filter(b=>b.status==="pending").length,i:"⏳",c:C.warn},{l:"Services",v:vServices.filter(s=>s.name).length||3,i:"✦",c:C.plat}].map(s=>(
              <div key={s.l} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:13,padding:18}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}><span style={{fontSize:10,color:C.muted,textTransform:"uppercase",letterSpacing:"0.5px"}}>{s.l}</span><span style={{fontSize:16}}>{s.i}</span></div>
                <div style={{fontSize:24,fontWeight:700,color:s.c}}>{s.v}</div>
              </div>
            ))}
          </div>
          <h3 style={{fontSize:15,fontWeight:600,marginBottom:14,color:C.white}}>Upcoming Bookings</h3>
          <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:14,overflow:"hidden"}}>
            <table style={{width:"100%",borderCollapse:"collapse"}}>
              <thead><tr style={{borderBottom:`1px solid ${C.border}`}}>
                {["ID","Client","Service","Date","Time","Price","Status","Action"].map(h=>(
                  <th key={h} style={{padding:"12px 16px",textAlign:"left",fontSize:10,color:C.muted,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.5px"}}>{h}</th>
                ))}
              </tr></thead>
              <tbody>{vendorBookings.map((b,i)=>(
                <tr key={b.id} style={{borderBottom:i<vendorBookings.length-1?`1px solid ${C.border}`:"none"}}>
                  <td style={{padding:"13px 16px",fontSize:11,color:C.gold,fontWeight:600}}>{b.id}</td>
                  <td style={{padding:"13px 16px"}}><div style={{fontSize:13,fontWeight:500,color:C.white}}>{b.client}</div><div style={{fontSize:10,color:C.muted}}>{b.phone}</div></td>
                  <td style={{padding:"13px 16px",fontSize:12,color:C.platDim}}>{b.service}</td>
                  <td style={{padding:"13px 16px",fontSize:12,color:C.platDim}}>{b.date}</td>
                  <td style={{padding:"13px 16px",fontSize:12,color:C.platDim}}>{b.time}</td>
                  <td style={{padding:"13px 16px",fontSize:13,fontWeight:600,color:C.gold}}>J${fmt(b.price)}</td>
                  <td style={{padding:"13px 16px"}}><Badge s={b.status}/></td>
                  <td style={{padding:"13px 16px"}}>
                    {b.status==="pending"&&<div style={{display:"flex",gap:5}}><button className="btn-ghost" style={{padding:"4px 9px",fontSize:11,background:"rgba(74,222,128,0.1)",color:C.success,border:"1px solid rgba(74,222,128,0.2)"}} onClick={()=>showToast("Booking accepted ✓")}>Accept</button><button className="btn-danger" onClick={()=>showToast("Booking declined")}>Decline</button></div>}
                    {b.status==="confirmed"&&<span style={{fontSize:11,color:C.success}}>✓ Set</span>}
                  </td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        </main>
        {toast&&<div style={{position:"fixed",bottom:24,left:"50%",transform:"translateX(-50%)",background:C.card,border:`1px solid ${C.borderHi}`,color:C.white,padding:"11px 20px",borderRadius:10,fontSize:13,zIndex:999,boxShadow:"0 8px 32px rgba(0,0,0,0.5)",whiteSpace:"nowrap"}}>{toast}</div>}
      </div>
    );
  }

  // ══════════════════════════════════════════════════════════
  // CUSTOMER APP
  // ══════════════════════════════════════════════════════════
  return (
    <div style={{fontFamily:"'DM Sans',sans-serif",background:C.bg,minHeight:"100vh",color:C.white}}>
      <style>{css}</style>
      <ModeBar/>
      <CustomerNav/>

      {/* AUTH */}
      {view==="auth"&&(
        <div className="fadeIn" style={{maxWidth:400,margin:"50px auto",padding:"0 20px"}}>
          <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:18,overflow:"hidden",boxShadow:`0 24px 60px rgba(0,0,0,0.4)`}}>
            <div style={{padding:"24px 26px 0"}}>
              <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:24,fontWeight:600,marginBottom:3,color:C.white}}>Welcome to Glow<span style={{color:C.gold}}>JA</span></div>
              <p style={{fontSize:12,color:C.platDim,marginBottom:20}}>Jamaica's luxury beauty booking platform</p>
              <div style={{display:"flex",borderBottom:`1px solid ${C.border}`,marginBottom:22}}>
                {["signin","signup"].map(t=>(
                  <button key={t} onClick={()=>{setAuthTab(t);setAErr("");}} style={{flex:1,padding:"9px",background:"none",border:"none",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontSize:12,fontWeight:500,color:authTab===t?C.white:C.muted,borderBottom:authTab===t?`2px solid ${C.plat}`:"2px solid transparent",transition:"all 0.2s"}}>
                    {t==="signin"?"Sign In":"Create Account"}
                  </button>
                ))}
              </div>
            </div>
            <div style={{padding:"0 26px 26px",display:"flex",flexDirection:"column",gap:12}}>
              {authTab==="signup"&&<div><label style={{fontSize:11,color:C.platDim,display:"block",marginBottom:4}}>Full Name</label><input className="ifield" placeholder="Kezia Brown" value={aName} onChange={e=>setAName(e.target.value)}/></div>}
              <div><label style={{fontSize:11,color:C.platDim,display:"block",marginBottom:4}}>Email</label><input className="ifield" type="email" placeholder="you@email.com" value={aEmail} onChange={e=>setAEmail(e.target.value)}/></div>
              {authTab==="signup"&&<div><label style={{fontSize:11,color:C.platDim,display:"block",marginBottom:4}}>Phone</label><input className="ifield" placeholder="+1 (876) 555-0100" value={aPhone} onChange={e=>setAPhone(e.target.value)}/></div>}
              <div><label style={{fontSize:11,color:C.platDim,display:"block",marginBottom:4}}>Password</label><input className="ifield" type="password" placeholder="••••••••" value={aPass} onChange={e=>setAPass(e.target.value)}/></div>
              {aErr&&<div style={{background:"rgba(248,113,113,0.08)",border:"1px solid rgba(248,113,113,0.2)",borderRadius:8,padding:"8px 12px",fontSize:12,color:C.danger}}>{aErr}</div>}
              <button className="btn-p" style={{padding:"12px",borderRadius:9,fontSize:13,marginTop:2}} onClick={authTab==="signin"?signIn:signUp}>{authTab==="signin"?"Sign In →":"Create Account →"}</button>
            </div>
          </div>
        </div>
      )}

      {/* ACCOUNT */}
      {view==="account"&&user&&(
        <div className="fadeIn" style={{maxWidth:680,margin:"0 auto",padding:"28px 20px"}}>
          <button onClick={()=>setView("home")} style={{background:"none",border:"none",cursor:"pointer",color:C.platDim,fontSize:12,display:"flex",alignItems:"center",gap:5,marginBottom:24,fontFamily:"'DM Sans',sans-serif"}}>← Back</button>
          <div style={{background:`linear-gradient(135deg,${C.card},${C.surface})`,border:`1px solid ${C.border}`,borderRadius:16,padding:24,marginBottom:18,display:"flex",gap:16,alignItems:"center"}}>
            <div style={{width:56,height:56,background:`linear-gradient(135deg,${C.gold},${C.goldDim})`,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,fontWeight:700,color:C.bg,flexShrink:0}}>{user.name.charAt(0)}</div>
            <div style={{flex:1}}><div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:22,fontWeight:600,color:C.white,marginBottom:2}}>{user.name}</div><div style={{fontSize:12,color:C.platDim}}>{user.email} · {user.phone}</div></div>
            <div style={{textAlign:"right"}}><div style={{fontSize:10,color:C.muted,marginBottom:2}}>Loyalty Points</div><div style={{fontSize:22,fontWeight:700,color:C.gold}}>{user.points||240} pts</div></div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:20}}>
            {[{l:"Bookings",v:history.length},{l:"Completed",v:history.filter(b=>b.status==="completed").length},{l:"Total Spent",v:"J$"+history.filter(b=>b.status!=="cancelled").reduce((s,b)=>s+b.price,0).toLocaleString()}].map(s=>(
              <div key={s.l} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,padding:16,textAlign:"center"}}>
                <div style={{fontSize:20,fontWeight:700,color:C.gold,marginBottom:2}}>{s.v}</div>
                <div style={{fontSize:11,color:C.platDim}}>{s.l}</div>
              </div>
            ))}
          </div>
          <h3 style={{fontSize:14,fontWeight:600,marginBottom:12,color:C.white}}>Booking History</h3>
          <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:20}}>
            {history.map(bk=>(
              <div key={bk.id} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,padding:14,display:"flex",gap:10,alignItems:"center"}}>
                <img src={bk.image} alt="" style={{width:44,height:44,objectFit:"cover",borderRadius:8,flexShrink:0}}/>
                <div style={{flex:1}}><div style={{fontWeight:600,fontSize:13,color:C.white,marginBottom:2}}>{bk.service}</div><div style={{fontSize:11,color:C.platDim}}>{bk.venue} · {bk.date}</div></div>
                <div style={{textAlign:"right"}}><div style={{fontWeight:700,fontSize:14,color:C.gold,marginBottom:4}}>J${fmt(bk.price)}</div><Badge s={bk.status}/></div>
              </div>
            ))}
          </div>
          <div style={{display:"flex",justifyContent:"space-between"}}>
            <button className="btn-g" style={{padding:"9px 20px",borderRadius:8,fontSize:13}} onClick={()=>setView("home")}>Find Salons</button>
            <button onClick={()=>{setUser(null);setView("home");showToast("Signed out");}} style={{background:"none",border:"none",color:C.danger,cursor:"pointer",fontSize:12,fontFamily:"'DM Sans',sans-serif"}}>Sign Out</button>
          </div>
        </div>
      )}

      {/* GIFT CARDS */}
      {view==="giftcard"&&(
        <div className="fadeIn" style={{maxWidth:500,margin:"0 auto",padding:"40px 20px"}}>
          <button onClick={()=>setView("home")} style={{background:"none",border:"none",cursor:"pointer",color:C.platDim,fontSize:12,display:"flex",alignItems:"center",gap:5,marginBottom:28,fontFamily:"'DM Sans',sans-serif"}}>← Back</button>
          {!giftSent?(
            <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:18,padding:28}}>
              <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:26,fontWeight:500,marginBottom:4,color:C.white}}>🎁 Gift Cards</div>
              <p style={{fontSize:13,color:C.platDim,marginBottom:24}}>Give the gift of luxury — redeemable at any GlowJA venue</p>
              <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:20}}>
                {[3000,5000,10000].map(a=>(
                  <div key={a} onClick={()=>setGiftAmt(a)} style={{background:giftAmt===a?`rgba(212,175,122,0.15)`:C.surface,border:`2px solid ${giftAmt===a?C.gold:C.border}`,borderRadius:11,padding:"14px 8px",textAlign:"center",cursor:"pointer",transition:"all 0.2s"}}>
                    <div style={{fontSize:17,fontWeight:700,color:giftAmt===a?C.gold:C.white}}>J${fmt(a)}</div>
                  </div>
                ))}
              </div>
              <div style={{marginBottom:16}}><label style={{fontSize:11,color:C.platDim,display:"block",marginBottom:5}}>Recipient Email</label><input className="ifield" type="email" placeholder="friend@email.com" value={giftEmail} onChange={e=>setGiftEmail(e.target.value)}/></div>
              <div style={{background:`linear-gradient(135deg,${C.card},#1a2030)`,border:`1px solid ${C.borderHi}`,borderRadius:14,padding:20,marginBottom:20,position:"relative",overflow:"hidden"}}>
                <div style={{position:"absolute",top:-10,right:-10,width:80,height:80,borderRadius:"50%",background:"rgba(212,175,122,0.08)"}}/>
                <div style={{fontSize:11,color:C.gold,fontWeight:600,letterSpacing:"1px",marginBottom:8}}>GLOWJA GIFT CARD</div>
                <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:30,fontWeight:500,color:C.white,marginBottom:4}}>J${fmt(giftAmt)}</div>
                <div style={{fontSize:11,color:C.platDim}}>Redeemable at all GlowJA partner venues</div>
              </div>
              <button className="btn-g" style={{width:"100%",padding:13,borderRadius:10,fontSize:14}} onClick={()=>{if(!giftEmail){showToast("Enter recipient email");return;}setGiftSent(true);}}>Purchase Gift Card →</button>
            </div>
          ):(
            <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:18,padding:32,textAlign:"center"}}>
              <div style={{fontSize:40,marginBottom:16}}>🎁</div>
              <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:26,fontWeight:500,marginBottom:8,color:C.white}}>Gift sent!</h2>
              <p style={{fontSize:13,color:C.platDim,marginBottom:20}}>A J${fmt(giftAmt)} gift card has been sent to <strong style={{color:C.white}}>{giftEmail}</strong></p>
              <button className="btn-p" style={{padding:"11px 24px",borderRadius:9,fontSize:13}} onClick={()=>{setGiftSent(false);setView("home");}}>Back to Home</button>
            </div>
          )}
        </div>
      )}

      {/* HOME */}
      {view==="home"&&(
        <div className="fadeIn">
          <div style={{background:`linear-gradient(160deg,${C.surface} 0%,${C.bg} 55%)`,padding:"56px 24px 64px",textAlign:"center",position:"relative",overflow:"hidden",borderBottom:`1px solid ${C.border}`}}>
            <div style={{position:"absolute",inset:0,backgroundImage:`radial-gradient(ellipse at 25% 50%,rgba(200,207,217,0.03) 0%,transparent 55%),radial-gradient(ellipse at 75% 30%,rgba(212,175,122,0.04) 0%,transparent 50%)`}}/>
            <div style={{position:"relative",maxWidth:600,margin:"0 auto"}}>
              <div style={{display:"inline-flex",alignItems:"center",gap:7,background:"rgba(212,175,122,0.07)",border:`1px solid rgba(212,175,122,0.18)`,borderRadius:20,padding:"5px 14px",marginBottom:20}}>
                <span style={{color:C.gold,fontSize:10}}>✦</span>
                <span style={{color:C.gold,fontSize:11,fontWeight:500,letterSpacing:"0.5px"}}>JAMAICA'S LUXURY BEAUTY PLATFORM</span>
              </div>
              <h1 style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:300,fontSize:"clamp(36px,5.5vw,60px)",color:C.white,lineHeight:1.1,marginBottom:12,letterSpacing:"-1px"}}>
                Look good.<br /><span style={{fontStyle:"italic",color:C.gold}}>Feel extraordinary.</span>
              </h1>
              <p style={{color:C.platDim,fontSize:15,marginBottom:32,fontWeight:300,lineHeight:1.6}}>Discover Jamaica's finest hair, nail, spa & wellness studios.</p>
              {user&&<div style={{display:"inline-flex",alignItems:"center",gap:6,background:"rgba(212,175,122,0.08)",border:`1px solid rgba(212,175,122,0.15)`,borderRadius:10,padding:"8px 16px",marginBottom:20,fontSize:13,color:"rgba(255,255,255,0.7)"}}>
                👋 Welcome back, <strong style={{color:C.gold}}>{user.name.split(" ")[0]}</strong>
              </div>}
              <div style={{background:C.card,borderRadius:12,padding:6,display:"flex",gap:6,maxWidth:560,margin:"0 auto",border:`1px solid ${C.border}`,boxShadow:`0 20px 60px rgba(0,0,0,0.4)`}}>
                <input className="ifield" placeholder="Search salons, spas, nail studios..." value={search} onChange={e=>setSearch(e.target.value)} style={{border:"none",flex:1,background:"transparent",padding:"9px 13px"}}/>
                <select value={selLoc} onChange={e=>setSelLoc(e.target.value)} className="ifield" style={{border:"none",background:"transparent",width:130,fontSize:12,color:C.platDim,cursor:"pointer"}}>
                  {LOCS.map(l=><option key={l}>{l}</option>)}
                </select>
                <button className="btn-p" style={{padding:"9px 18px",borderRadius:8,fontSize:12,whiteSpace:"nowrap"}}>Search</button>
              </div>
            </div>
          </div>

          <div style={{maxWidth:1120,margin:"0 auto",padding:"28px 20px 60px"}}>
            {/* Category icons */}
            <div style={{display:"flex",gap:10,marginBottom:20,flexWrap:"wrap",justifyContent:"center"}}>
              <button className={`pill ${selCat==="all"?"on":""}`} onClick={()=>setSelCat("all")}>✦ All</button>
              {SERVICE_CATEGORIES.map(c=>(
                <button key={c.id} className={`pill ${selCat===c.id?"on":""}`} onClick={()=>setSelCat(c.id)}
                  style={selCat===c.id?{}:{borderColor:C.border}}>
                  {c.icon} {c.label}
                </button>
              ))}
            </div>

            {/* Controls */}
            <div style={{display:"flex",gap:8,marginBottom:14,alignItems:"center",flexWrap:"wrap"}}>
              <button className={`pill ${showFilters?"on":""}`} onClick={()=>setShowFilters(p=>!p)}>⚙ Filters</button>
              <button className={`pill ${mapView?"on":""}`} onClick={()=>setMapView(p=>!p)}>🗺 {mapView?"List View":"Map View"}</button>
              <span style={{marginLeft:"auto",fontSize:12,color:C.platDim}}>{filtered.length} venues</span>
            </div>

            {/* Filters */}
            {showFilters&&(
              <div className="fadeIn" style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:13,padding:18,marginBottom:18,display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:18}}>
                {[{l:"Min Price (J$)",v:minPrice,set:setMinPrice,max:15000,fmt:v=>"J$"+v.toLocaleString()},{l:"Max Price (J$)",v:maxPrice,set:setMaxPrice,max:15000,fmt:v=>"J$"+v.toLocaleString()},{l:"Min Rating",v:minRating,set:setMinRating,max:5,step:0.1,fmt:v=>"★ "+v.toFixed(1)+"+"}].map(f=>(
                  <div key={f.l}><label style={{fontSize:10,color:C.platDim,display:"block",marginBottom:7,fontWeight:500,textTransform:"uppercase",letterSpacing:"0.5px"}}>{f.l}</label><input type="range" min={0} max={f.max} step={f.step||500} value={f.v} onChange={e=>f.set(Number(e.target.value))}/><div style={{fontSize:11,color:C.plat,marginTop:4}}>{f.fmt(f.v)}</div></div>
                ))}
              </div>
            )}

            {/* Map */}
            {mapView&&<div className="fadeIn" style={{marginBottom:28}}><MapView salons={filtered} onSelect={v=>{setVenue(v);setView("listing");}}/></div>}

            {/* Featured */}
            {!mapView&&selCat==="all"&&(
              <div style={{marginBottom:32}}>
                <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:20,fontWeight:500,marginBottom:16,color:C.white}}>Featured Studios</h2>
                <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:16}}>
                  {SALONS.filter(s=>s.featured&&s.status==="approved").map(v=><VenueCard key={v.id} v={v} onClick={()=>{setVenue(v);setView("listing");}} onFav={toggleFav} favs={favs}/>)}
                </div>
              </div>
            )}

            {/* All venues */}
            {!mapView&&(
              <div>
                <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:20,fontWeight:500,marginBottom:16,color:C.white}}>
                  {selCat==="all"?"All Venues":SERVICE_CATEGORIES.find(c=>c.id===selCat)?.label}
                </h2>
                {filtered.length===0
                  ?<div style={{textAlign:"center",padding:"50px 0",color:C.muted}}><div style={{fontSize:36,marginBottom:10}}>🔍</div><p>No venues match your filters.</p></div>
                  :<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:16}}>{filtered.map(v=><VenueCard key={v.id} v={v} onClick={()=>{setVenue(v);setView("listing");}} onFav={toggleFav} favs={favs}/>)}</div>
                }
              </div>
            )}
          </div>
        </div>
      )}

      {/* LISTING */}
      {view==="listing"&&venue&&(
        <div className="fadeIn" style={{maxWidth:860,margin:"0 auto",padding:"28px 20px"}}>
          <button onClick={()=>setView("home")} style={{background:"none",border:"none",cursor:"pointer",color:C.platDim,fontSize:12,display:"flex",alignItems:"center",gap:5,marginBottom:20,fontFamily:"'DM Sans',sans-serif"}}>← Back</button>
          <div style={{borderRadius:16,overflow:"hidden",marginBottom:24,height:280,position:"relative"}}>
            <img src={venue.image} alt={venue.name} style={{width:"100%",height:"100%",objectFit:"cover"}}/>
            <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(15,17,23,0.85) 0%,transparent 50%)"}}/>
            <div style={{position:"absolute",bottom:18,left:22}}>
              <div style={{display:"inline-flex",alignItems:"center",gap:5,background:"rgba(22,27,36,0.8)",backdropFilter:"blur(8px)",color:C.plat,padding:"3px 11px",borderRadius:20,fontSize:10,fontWeight:500,marginBottom:7}}>
                {SERVICE_CATEGORIES.find(c=>c.id===venue.cat)?.icon} {venue.type}
              </div>
              <h1 style={{fontFamily:"'Cormorant Garamond',serif",color:C.white,fontSize:30,fontWeight:500,letterSpacing:"-0.5px"}}>{venue.name}</h1>
            </div>
            <button onClick={()=>toggleFav(venue.id)} style={{position:"absolute",top:14,right:14,background:"rgba(22,27,36,0.8)",border:"none",width:36,height:36,borderRadius:"50%",cursor:"pointer",fontSize:16,color:favs.includes(venue.id)?C.gold:C.muted}}>{favs.includes(venue.id)?"♥":"♡"}</button>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 280px",gap:28}}>
            <div>
              <div style={{display:"flex",gap:16,marginBottom:12,flexWrap:"wrap",alignItems:"center"}}>
                <span style={{fontSize:13,color:C.gold,fontWeight:600}}>★ {venue.rating} <span style={{color:C.platDim,fontWeight:400,fontSize:12}}>({venue.reviews})</span></span>
                <span style={{fontSize:12,color:C.platDim}}>📍 {venue.location}</span>
              </div>
              {venue.about&&<p style={{color:C.platDim,fontSize:13,lineHeight:1.7,marginBottom:16}}>{venue.about}</p>}
              {venue.medical&&<div style={{background:"rgba(251,191,36,0.06)",border:"1px solid rgba(251,191,36,0.2)",borderRadius:10,padding:"12px 14px",marginBottom:16,display:"flex",gap:10,alignItems:"flex-start"}}>
                <span style={{fontSize:16,flexShrink:0}}>⚕️</span>
                <div><div style={{fontSize:12,fontWeight:600,color:C.warn,marginBottom:3}}>Medical Treatment — Important Information</div><div style={{fontSize:11,color:C.platDim,lineHeight:1.6}}>Injectable treatments (Botox/filler) are medical procedures performed only by qualified, registered practitioners. A consultation is required before any treatment. Results vary. Must be 18+. Please disclose any medical conditions or medications during your consultation.</div></div>
              </div>}
              <div style={{display:"flex",gap:6,marginBottom:22,flexWrap:"wrap"}}>
                {(venue.tags||[]).map(t=><span key={t} style={{background:C.mutedLo,color:C.platDim,padding:"3px 9px",borderRadius:20,fontSize:10}}>{t}</span>)}
              </div>
              <h3 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:18,fontWeight:500,marginBottom:12,color:C.white}}>Services</h3>
              {(venue.services||[]).map((s,i)=>(
                <div key={i} className="srow" onClick={()=>{setSvc(s);setBkDate(null);setBkTime(null);setBkName(user?user.name:"");setBkPhone(user?user.phone:"");setView("booking");}}
                  style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 10px",borderBottom:`1px solid ${C.border}`}}>
                  <div><div style={{fontWeight:500,fontSize:13,color:C.white,marginBottom:2}}>{s.name}</div><div style={{color:C.muted,fontSize:11}}>⏱ {s.duration}</div></div>
                  <div style={{display:"flex",alignItems:"center",gap:10}}>
                    <span style={{fontWeight:700,fontSize:14,color:C.white}}>J${fmt(s.price)}</span>
                    <button className="btn-ghost" style={{padding:"6px 12px",borderRadius:7,fontSize:11}}>Book</button>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:14,padding:20,position:"sticky",top:70}}>
                <div style={{fontSize:12,color:C.muted,marginBottom:3}}>Starting from</div>
                <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:28,fontWeight:500,color:C.white,marginBottom:6}}>J${fmt(venue.price)}</div>
                <div style={{display:"flex",alignItems:"center",gap:5,marginBottom:16}}><span style={{width:6,height:6,background:C.success,borderRadius:"50%",display:"inline-block"}}/><span style={{fontSize:11,color:C.platDim}}>Available {venue.available}</span></div>
                <button className="btn-p" style={{width:"100%",padding:12,borderRadius:9,fontSize:13,marginBottom:8}} onClick={()=>{setSvc(venue.services?.[0]);setBkDate(null);setBkTime(null);setBkName(user?user.name:"");setBkPhone(user?user.phone:"");setView("booking");}}>Book Now</button>
                <div style={{marginTop:16,paddingTop:16,borderTop:`1px solid ${C.border}`}}>
                  {["Free cancellation · 24h","Instant confirmation","WiPay secure checkout"].map(p=>(
                    <div key={p} style={{display:"flex",gap:7,marginBottom:6,fontSize:11,color:C.platDim}}><span style={{color:C.gold}}>✓</span>{p}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* BOOKING */}
      {view==="booking"&&venue&&svc&&(
        <div className="fadeIn" style={{maxWidth:640,margin:"0 auto",padding:"28px 20px"}}>
          <button onClick={()=>setView("listing")} style={{background:"none",border:"none",cursor:"pointer",color:C.platDim,fontSize:12,display:"flex",alignItems:"center",gap:5,marginBottom:24,fontFamily:"'DM Sans',sans-serif"}}>← Back</button>
          <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:14,padding:18,marginBottom:24,display:"flex",gap:12,alignItems:"center"}}>
            <img src={venue.image} alt="" style={{width:56,height:56,objectFit:"cover",borderRadius:9}}/>
            <div><div style={{color:C.platDim,fontSize:11,marginBottom:2}}>{venue.name} · {venue.location}</div><div style={{color:C.white,fontWeight:600,fontSize:15,marginBottom:2}}>{svc.name}</div><div style={{display:"flex",gap:12,fontSize:11,color:C.platDim}}><span>⏱ {svc.duration}</span><span style={{color:C.gold,fontWeight:600,fontSize:13}}>J${fmt(svc.price)}</span></div></div>
          </div>
          <h3 style={{fontSize:14,fontWeight:600,marginBottom:10,color:C.white}}>Select a date</h3>
          <div style={{display:"flex",gap:7,marginBottom:24,flexWrap:"wrap"}}>
            {getDates().map(d=>(
              <button key={d.full} className={`date-btn ${bkDate===d.full?"on":""}`} onClick={()=>setBkDate(d.full)}>
                <div style={{fontSize:9,fontWeight:500,marginBottom:2,opacity:0.6}}>{d.label}</div>
                <div style={{fontSize:16,fontWeight:700}}>{d.date}</div>
                <div style={{fontSize:9,marginTop:2,opacity:0.6}}>{d.month}</div>
              </button>
            ))}
          </div>
          <h3 style={{fontSize:14,fontWeight:600,marginBottom:10,color:C.white}}>Select a time</h3>
          <div style={{display:"flex",flexWrap:"wrap",gap:7,marginBottom:24}}>
            {TIMES.map(t=><button key={t} className={`time-btn ${bkTime===t?"on":""}`} onClick={()=>setBkTime(t)}>{t}</button>)}
          </div>
          <h3 style={{fontSize:14,fontWeight:600,marginBottom:10,color:C.white}}>Your details</h3>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:11,marginBottom:20}}>
            <div><label style={{fontSize:11,color:C.platDim,display:"block",marginBottom:4}}>Full Name</label><input className="ifield" placeholder="Kezia Brown" value={bkName} onChange={e=>setBkName(e.target.value)}/></div>
            <div><label style={{fontSize:11,color:C.platDim,display:"block",marginBottom:4}}>Phone</label><input className="ifield" placeholder="+1 (876) 555-0100" value={bkPhone} onChange={e=>setBkPhone(e.target.value)}/></div>
          </div>
          {!user&&<div style={{background:"rgba(212,175,122,0.05)",border:`1px solid rgba(212,175,122,0.12)`,borderRadius:9,padding:"10px 14px",marginBottom:16,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <span style={{fontSize:12,color:C.platDim}}>Save your booking history</span>
            <button className="btn-g" style={{padding:"6px 12px",borderRadius:7,fontSize:11}} onClick={()=>setView("auth")}>Create Account</button>
          </div>}
          <button className="btn-p" disabled={!bkDate||!bkTime||!bkName} onClick={()=>setView("payment")}
            style={{width:"100%",padding:13,borderRadius:10,fontSize:14,opacity:(!bkDate||!bkTime||!bkName)?0.35:1,cursor:(!bkDate||!bkTime||!bkName)?"not-allowed":"pointer"}}>
            Continue to Payment →
          </button>
        </div>
      )}

      {/* PAYMENT */}
      {view==="payment"&&venue&&svc&&(
        <div className="fadeIn" style={{maxWidth:540,margin:"0 auto",padding:"28px 20px"}}>
          <button onClick={()=>setView("booking")} style={{background:"none",border:"none",cursor:"pointer",color:C.platDim,fontSize:12,display:"flex",alignItems:"center",gap:5,marginBottom:24,fontFamily:"'DM Sans',sans-serif"}}>← Back</button>
          <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:24,fontWeight:500,marginBottom:4,color:C.white}}>Checkout</h2>
          <p style={{color:C.muted,fontSize:12,marginBottom:20}}>Powered by WiPay Jamaica · SSL encrypted</p>

          <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,padding:16,marginBottom:18}}>
            <div style={{fontSize:10,color:C.muted,marginBottom:10,fontWeight:500,textTransform:"uppercase",letterSpacing:"0.5px"}}>Order Summary</div>
            {[["Service",svc.name],["Venue",venue.name],["Date",bkDate],["Time",bkTime]].map(([l,v])=>(
              <div key={l} style={{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:6}}><span style={{color:C.platDim}}>{l}</span><span style={{color:C.white,fontWeight:500}}>{v}</span></div>
            ))}
            {promoApplied&&<div style={{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:6}}><span style={{color:C.success}}>Promo ({promoApplied})</span><span style={{color:C.success}}>-{discount>0?`${discount*100}%`:`J$${flatDisc.toLocaleString()}`}</span></div>}
            <div style={{borderTop:`1px solid ${C.border}`,marginTop:10,paddingTop:10,display:"flex",justifyContent:"space-between"}}>
              <span style={{fontWeight:600,color:C.white,fontSize:13}}>Total</span>
              <div style={{textAlign:"right"}}>{promoApplied&&<div style={{fontSize:10,color:C.muted,textDecoration:"line-through"}}>J${fmt(svc.price)}</div>}<span style={{fontWeight:700,fontSize:18,color:C.gold}}>J${fmt(finalPrice)}</span></div>
            </div>
          </div>

          <div style={{marginBottom:18}}>
            <label style={{fontSize:11,color:C.platDim,display:"block",marginBottom:5,fontWeight:500}}>Promo Code</label>
            <div style={{display:"flex",gap:7}}>
              <input className="ifield" placeholder="e.g. GLOW20" value={promo} onChange={e=>{setPromo(e.target.value);setPromoErr("");}} style={{flex:1,textTransform:"uppercase"}}/>
              <button className="btn-ghost" style={{padding:"10px 14px",borderRadius:8,fontSize:12,whiteSpace:"nowrap"}} onClick={applyPromo}>Apply</button>
            </div>
            {promoErr&&<div style={{fontSize:11,color:C.danger,marginTop:4}}>{promoErr}</div>}
            {promoApplied&&<div style={{fontSize:11,color:C.success,marginTop:4}}>✓ {PROMOS[promoApplied]}</div>}
            <div style={{fontSize:10,color:C.muted,marginTop:4}}>Try: GLOW20 · NEWJA · VIP50</div>
          </div>

          <h3 style={{fontSize:13,fontWeight:600,marginBottom:10,color:C.white}}>Payment Method</h3>
          <div style={{display:"flex",flexDirection:"column",gap:7,marginBottom:18}}>
            {[
              {id:"wipay",icon:"🇯🇲",label:"WiPay Jamaica",desc:"NCB, Scotiabank & all JA banks"},
              {id:"card",icon:"💳",label:"International Card",desc:"Visa / Mastercard"},
              {id:"lynk",icon:"📱",label:"NCB Lynk",desc:"Mobile wallet"},
            ].map(pm=>(
              <div key={pm.id} className={`pay-opt ${payMethod===pm.id?"on":""}`} onClick={()=>setPayMethod(pm.id)}>
                <div style={{width:16,height:16,borderRadius:"50%",border:`2px solid ${payMethod===pm.id?C.plat:C.muted}`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                  {payMethod===pm.id&&<div style={{width:8,height:8,borderRadius:"50%",background:C.plat}}/>}
                </div>
                <span style={{fontSize:16}}>{pm.icon}</span>
                <div><div style={{fontWeight:500,fontSize:13}}>{pm.label}</div><div style={{fontSize:11,color:C.muted}}>{pm.desc}</div></div>
                {pm.id==="wipay"&&<span style={{marginLeft:"auto",fontSize:9,background:"rgba(74,222,128,0.1)",color:C.success,padding:"2px 7px",borderRadius:20,fontWeight:600}}>RECOMMENDED</span>}
              </div>
            ))}
          </div>

          {payMethod==="card"&&(
            <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,padding:16,marginBottom:16,display:"flex",flexDirection:"column",gap:11}}>
              <div><label style={{fontSize:11,color:C.platDim,display:"block",marginBottom:4}}>Card Number</label><input className="ifield" placeholder="1234 5678 9012 3456" value={cardNum} onChange={e=>setCardNum(e.target.value.replace(/\D/g,"").slice(0,16).replace(/(.{4})/g,"$1 ").trim())} maxLength={19}/></div>
              <div><label style={{fontSize:11,color:C.platDim,display:"block",marginBottom:4}}>Name on Card</label><input className="ifield" placeholder="KEZIA BROWN" value={cardName} onChange={e=>setCardName(e.target.value.toUpperCase())}/></div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:11}}>
                <div><label style={{fontSize:11,color:C.platDim,display:"block",marginBottom:4}}>Expiry</label><input className="ifield" placeholder="MM/YY" value={cardExp} onChange={e=>{const v=e.target.value.replace(/\D/g,"").slice(0,4);setCardExp(v.length>2?v.slice(0,2)+"/"+v.slice(2):v);}} maxLength={5}/></div>
                <div><label style={{fontSize:11,color:C.platDim,display:"block",marginBottom:4}}>CVV</label><input className="ifield" type="password" placeholder="•••" value={cardCvv} onChange={e=>setCardCvv(e.target.value.replace(/\D/g,"").slice(0,4))}/></div>
              </div>
            </div>
          )}

          {payMethod==="wipay"&&(
            <div style={{background:"rgba(212,175,122,0.05)",border:`1px solid rgba(212,175,122,0.12)`,borderRadius:12,padding:14,marginBottom:16,display:"flex",gap:12,alignItems:"center"}}>
              <span style={{fontSize:24}}>🇯🇲</span>
              <div><div style={{fontSize:12,fontWeight:600,color:C.gold,marginBottom:2}}>WiPay Secure Checkout</div><div style={{fontSize:11,color:C.platDim,lineHeight:1.5}}>You'll be redirected to WiPay's secure portal. Accepts NCB, Scotiabank, CIBC, JN Bank and all major cards.</div></div>
            </div>
          )}

          <button className="btn-p" onClick={handlePay} disabled={paying}
            style={{width:"100%",padding:14,borderRadius:10,fontSize:14,display:"flex",alignItems:"center",justifyContent:"center",gap:8,opacity:paying?0.7:1,cursor:paying?"not-allowed":"pointer"}}>
            {paying?<><span className="spin">⟳</span> Processing...</>:<>Pay J${fmt(finalPrice)} →</>}
          </button>
          <p style={{textAlign:"center",fontSize:10,color:C.muted,marginTop:8}}>🔒 PCI-DSS Level 1 · Powered by WiPay Jamaica</p>
          <div style={{marginTop:12,background:C.surface,border:,borderRadius:9,padding:"10px 14px",fontSize:11,color:C.platDim,textAlign:"center"}}>
            Full payment goes to GlowJA · Vendor receives their share within 7 days via WiPay
          </div>
        </div>
      )}

      {/* CONFIRM */}
      {view==="confirm"&&confirmed&&(
        <div className="fadeIn" style={{maxWidth:460,margin:"0 auto",padding:"56px 20px",textAlign:"center"}}>
          <div style={{width:70,height:70,background:"rgba(74,222,128,0.07)",border:"1px solid rgba(74,222,128,0.18)",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 20px",fontSize:30}}>✅</div>
          <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:28,fontWeight:500,marginBottom:5,color:C.white}}>All confirmed.</h2>
          <p style={{color:C.platDim,marginBottom:5,fontSize:13}}>Your booking is locked in. See you soon!</p>
          <p style={{color:C.muted,marginBottom:28,fontSize:11}}>Ref: <span style={{color:C.gold,fontWeight:600}}>{confirmed.id}</span></p>
          <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:14,padding:20,textAlign:"left",marginBottom:24}}>
            {[["Service",confirmed.service],["Venue",confirmed.venue],["Date",confirmed.date],["Time",confirmed.time],["Paid","J$"+fmt(confirmed.price)],["Payment",confirmed.payMethod==="wipay"?"🇯🇲 WiPay":confirmed.payMethod==="card"?"💳 Card":"📱 Lynk"]].map(([l,v])=>(
              <div key={l} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:`1px solid ${C.border}`}}>
                <span style={{color:C.platDim,fontSize:12}}>{l}</span><span style={{color:C.white,fontWeight:500,fontSize:12}}>{v}</span>
              </div>
            ))}
          </div>
          <div style={{display:"flex",gap:10,justifyContent:"center"}}>
            <button className="btn-p" style={{padding:"11px 22px",borderRadius:9,fontSize:13}} onClick={()=>setView("home")}>Back to Home</button>
            {user&&<button className="btn-g" style={{padding:"11px 22px",borderRadius:9,fontSize:13}} onClick={()=>setView("account")}>View Bookings</button>}
          </div>
        </div>
      )}

      {/* Footer */}
      {view==="home"&&(
        <div style={{borderTop:`1px solid ${C.border}`,padding:"32px 24px",textAlign:"center",color:C.muted,fontSize:11}}>
          <div style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:500,fontSize:17,color:C.white,marginBottom:5}}>Glow<span style={{color:C.gold}}>JA</span></div>
          <p>© 2026 GlowJA · Jamaica's luxury beauty & wellness booking platform · Payments by WiPay</p>
        </div>
      )}

      {toast&&<div style={{position:"fixed",bottom:24,left:"50%",transform:"translateX(-50%)",background:C.card,border:`1px solid ${C.borderHi}`,color:C.white,padding:"11px 20px",borderRadius:10,fontSize:12,zIndex:999,boxShadow:"0 8px 32px rgba(0,0,0,0.5)",whiteSpace:"nowrap"}}>{toast}</div>}
    </div>
  );
}
