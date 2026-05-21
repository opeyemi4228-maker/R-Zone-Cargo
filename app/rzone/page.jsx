"use client";

/**
 * R-Zone International — Group Homepage (SEO-Optimised)
 *
 * ADD TO layout.tsx:
 * export const metadata = {
 *   title: "R-Zone International — UK–Nigeria Enterprise Group",
 *   description: "R-Zone International is the UK–Nigeria enterprise group behind R-Zone Cargo — the #1 highest-rated UK–Nigeria cargo company on Google. 100+ five-star reviews. Founded 2012. Upminster, Essex.",
 *   keywords: ["R-Zone International","UK Nigeria enterprise group","R-Zone Cargo","Nigerian diaspora business UK","UK Nigeria shipping company","Nigeria real estate UK","shortlets Lagos Abuja"],
 *   alternates: { canonical: "https://r-zoneinternational.com" },
 * };
 */

import { Montserrat } from "next/font/google";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion, useInView, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, ArrowUpRight, Globe, MapPin, ChevronRight, Shield, TrendingUp, Users, Building2, Package, Home, Star, Calendar, Briefcase, Zap, Clock, CheckCircle, Phone, Mail, Instagram, ExternalLink, BarChart3, Layers, Target, Award, MessageSquare } from "lucide-react";

const montserrat = Montserrat({ subsets:["latin"], weight:["300","400","500","600","700","800","900"], variable:"--font-mont", display:"swap" });

const SUBSIDIARIES = [
  {
    id:"cargo", name:"R-Zone Cargo", category:"Freight & Logistics",
    tagline:"The #1 highest-rated UK–Nigeria cargo company on Google.",
    description:"R-Zone Cargo is the group's flagship freight and logistics operation — connecting UK businesses and families to all 36 Nigerian states via air freight (5–10 working days), weekly sea shipping (4–6 weeks transit), door-to-door delivery, and specialist cargo handling since 2012. The highest-rated organically earned cargo company between the UK, Nigeria, and across Africa, with 100+ five-star Google reviews.",
    icon:Package, href:"https://r-zoneenterprises.com", image:"https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=900&q=80",
    stats:[{val:"50K+",label:"Shipments"},{val:"12+",label:"Years"},{val:"100+",label:"⭐ Reviews"}],
    highlights:["Air freight 5–10 working days","Sea freight 4–6 weeks transit","All 36 Nigerian states covered","Customs clearance UK & Nigeria"],
    color:"#0818A8", gradient:"from-[#0818A8] to-[#1F51FF]", live:true,
  },
  {
    id:"homes", name:"R-Zone Homes", category:"Real Estate",
    tagline:"Premium Nigerian property for the UK diaspora.",
    description:"R-Zone Homes provides premium residential and commercial real estate services across Nigeria's fastest-growing cities. From off-plan investment in Lagos and Abuja to full property management, we connect the UK Nigerian diaspora with Nigeria's property market.",
    icon:Home, href:"#", image:"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&q=80",
    stats:[{val:"2024",label:"Founded"},{val:"NG",label:"Market"},{val:"UK",label:"Diaspora"}],
    highlights:["Off-plan properties","Property management","UK diaspora investment","Lagos & Abuja"],
    color:"#1a6b3c", gradient:"from-[#1a6b3c] to-[#2a9d5e]", live:false, badge:"Coming Soon",
  },
  {
    id:"shortlets", name:"R-Zone Shortlets", category:"Serviced Accommodation",
    tagline:"Premium short-stay apartments — Lagos & Abuja.",
    description:"R-Zone Shortlets operates a curated portfolio of fully-serviced short-term apartments in Lagos and Abuja — serving business travellers, the UK Nigerian diaspora, and premium leisure guests who demand quality without compromise.",
    icon:Building2, href:"#", image:"https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=900&q=80",
    stats:[{val:"LOS",label:"Lagos"},{val:"ABJ",label:"Abuja"},{val:"24/7",label:"Support"}],
    highlights:["Fully furnished apartments","24/7 concierge","Corporate rates","Monthly stays available"],
    color:"#9c5700", gradient:"from-[#9c5700] to-[#d97706]", live:false, badge:"Coming Soon",
  },
];

const GROUP_STATS = [
  {val:"2012",label:"Founded",        icon:Calendar, sub:"12+ years operating"},
  {val:"3+",  label:"Business Lines", icon:Layers,   sub:"Diversified portfolio"},
  {val:"2",   label:"Countries",      icon:Globe,    sub:"UK & Nigeria"},
  {val:"10K+",label:"Customers Served",icon:Users,   sub:"Families & businesses"},
  {val:"£M+", label:"Cargo Moved",    icon:BarChart3,sub:"Annually (R-Zone Cargo)"},
  {val:"100+",label:"5-Star Reviews", icon:Star,     sub:"#1 on Google UK–Nigeria cargo"},
];

const VALUES = [
  {icon:Shield,     title:"Integrity in Everything",              accent:"#0818A8", body:"Every R-Zone brand operates with the same foundational commitment — transparent dealings, honest communication, and delivery on every promise made to every customer."},
  {icon:Globe,      title:"Built by the Diaspora, for the Diaspora", accent:"#1F51FF", body:"R-Zone International was built by the Nigerian diaspora, for the diaspora. Our businesses exist to bridge the gap between the UK and Nigeria — making commerce, property and daily life seamlessly connected."},
  {icon:TrendingUp, title:"Long-Term Growth Over Short-Term Gain", accent:"#0818A8", body:"We build for decades, not quarters. Each R-Zone company is designed with sustainable growth in mind — creating lasting value for customers, partners and the communities we serve in both the UK and Nigeria."},
  {icon:Target,     title:"Execution Over Talk",                  accent:"#1F51FF", body:"The R-Zone name means something because we deliver. Across every brand — from UK–Nigeria logistics to Nigerian real estate — operational excellence is non-negotiable."},
];

const TIMELINE = [
  {year:"2012",event:"R-Zone Enterprises founded in Upminster, Essex, UK",type:"founding"},
  {year:"2014",event:"Weekly UK–Nigeria sea freight corridor opened",type:"expansion"},
  {year:"2016",event:"Lagos, Nigeria operations hub established",type:"expansion"},
  {year:"2018",event:"IATA certification secured — air cargo capability live",type:"milestone"},
  {year:"2020",event:"Zero service interruptions throughout the pandemic",type:"milestone"},
  {year:"2022",event:"10,000+ UK–Nigeria customers served milestone",type:"milestone"},
  {year:"2023",event:"R-Zone International Group formally constituted",type:"founding"},
  {year:"2024",event:"R-Zone Homes & Shortlets divisions launched",type:"expansion"},
  {year:"2025",event:"New venture lines entering active development phase",type:"expansion"},
];

const TYPE_COLORS = {
  founding: {bg:"bg-[#0818A8]",text:"text-white",    dot:"bg-[#1F51FF]"},
  expansion:{bg:"bg-white",    text:"text-[#0818A8]",dot:"bg-[#0818A8]"},
  milestone:{bg:"bg-[#f0f4ff]",text:"text-[#0437F2]",dot:"bg-[#0437F2]"},
};

const FAQ_ITEMS = [
  {q:"What is R-Zone International?", a:"R-Zone International is a diversified UK–Nigeria enterprise group founded in 2012 and headquartered in Upminster, Essex. It is the parent company of R-Zone Cargo (UK–Nigeria freight and logistics), R-Zone Homes (Nigerian real estate), and R-Zone Shortlets (serviced apartments in Lagos and Abuja)."},
  {q:"Who owns R-Zone Cargo?", a:"R-Zone Cargo is owned and operated by R-Zone International — the parent group headquartered in Upminster, Essex, UK. R-Zone Cargo is the group's flagship business and the highest-rated UK-to-Nigeria cargo company on Google, with 100+ five-star reviews organically earned since 2012."},
  {q:"How long has R-Zone been operating?", a:"R-Zone Enterprises — now trading as R-Zone Cargo — was founded in 2012 in Upminster, Essex, UK. The group has been providing UK–Nigeria freight and logistics services for over 12 years."},
  {q:"Does R-Zone ship to all Nigerian states?", a:"Yes. R-Zone Cargo delivers to all 36 Nigerian states including Lagos, Abuja (FCT), Rivers, Kano, Delta, Oyo, Anambra, Enugu, and more. Air freight from the UK to Nigeria takes 5–10 working days; sea freight takes 4–6 weeks transit."},
  {q:"What businesses does R-Zone International operate?", a:"R-Zone International operates three business lines: R-Zone Cargo (UK–Nigeria freight, air freight, sea freight, door-to-door delivery), R-Zone Homes (Nigerian residential and commercial real estate for the UK diaspora), and R-Zone Shortlets (premium serviced apartments in Lagos and Abuja)."},
];

const fadeUp = {
  hidden: {opacity:0,y:30},
  visible:(d=0)=>({opacity:1,y:0,transition:{duration:0.7,ease:[0.22,1,0.36,1],delay:d}}),
};

function CursorGlow() {
  const x=useMotionValue(0),y=useMotionValue(0);
  const sX=useSpring(x,{stiffness:120,damping:28}),sY=useSpring(y,{stiffness:120,damping:28});
  useEffect(()=>{const move=(e)=>{x.set(e.clientX);y.set(e.clientY);};window.addEventListener("mousemove",move);return()=>window.removeEventListener("mousemove",move);},[x,y]);
  return <motion.div className="fixed w-[500px] h-[500px] rounded-full pointer-events-none z-0 hidden lg:block" style={{x:sX,y:sY,translateX:"-50%",translateY:"-50%",background:"radial-gradient(circle, rgba(8,24,168,0.06) 0%, transparent 70%)"}} aria-hidden="true" />;
}

function Tag({label,dark=true}){
  return (
    <div className={`inline-flex items-center gap-2.5 border px-4 py-1.5 rounded-full mb-5 ${dark?"border-[#1F51FF]/28 bg-[#0818A8]/12":"border-[#0818A8]/18 bg-[#0818A8]/5"}`}>
      <motion.span className="w-1.5 h-1.5 rounded-full bg-[#1F51FF]" animate={{scale:[1,1.7,1],opacity:[1,0.4,1]}} transition={{duration:2,repeat:Infinity}} aria-hidden="true"/>
      <span className={`text-[13px] font-bold tracking-[0.3em] uppercase ${dark?"text-[#1F51FF]":"text-[#0818A8]"}`}>{label}</span>
    </div>
  );
}

function Heading({serif,sans,dark=true,id}){
  const ref=useRef(null);const inView=useInView(ref,{once:true,margin:"-60px"});
  return (
    <h2 ref={ref} id={id} className="leading-[0.9] tracking-[-0.02em]">
      <span className={`block font-normal text-[clamp(18px,3vw,32px)] mb-1 ${dark?"text-white/80":"text-gray-800"}`}>{serif}</span>
      <span className={`block font-black text-[clamp(30px,5.5vw,62px)] uppercase tracking-[-0.03em] ${dark?"text-white":"text-[#0b0f1a]"}`}>
        {sans.split(" ").map((word,i,arr)=>i===arr.length-1?(
          <span key={i} className="relative inline-block text-[#1F51FF]">
            {word}
            <motion.span className="absolute -bottom-1 left-0 h-[3px] bg-[#1F51FF] rounded-full" aria-hidden="true" initial={{width:0}} animate={inView?{width:"100%"}:{}} transition={{duration:0.6,delay:0.5}}/>
          </span>
        ):<span key={i}>{word} </span>)}
      </span>
    </h2>
  );
}

function GroupNavbar(){
  const [scrolled,setScrolled]=useState(false);
  useEffect(()=>{const fn=()=>setScrolled(window.scrollY>40);window.addEventListener("scroll",fn,{passive:true});fn();return()=>window.removeEventListener("scroll",fn);},[]);
  return (
    <motion.header className="fixed top-0 left-0 right-0 z-40"
      animate={{backgroundColor:scrolled?"rgba(0,4,18,0.96)":"rgba(0,4,18,0)",backdropFilter:scrolled?"blur(16px)":"blur(0px)"}}
      transition={{duration:0.35}} role="banner">
      <div className={`border-b transition-all duration-300 ${scrolled?"border-white/[0.07]":"border-transparent"}`}>
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 h-[68px] flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group" aria-label="R-Zone International Group — home">
            <div className="w-9 h-9 bg-gradient-to-br from-[#0818A8] to-[#1F51FF] rounded-sm flex items-center justify-center flex-shrink-0" aria-hidden="true">
              <span className="text-white font-black text-[14px] tracking-[0.05em]">RZ</span>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-white font-black text-[16px] tracking-[0.06em] uppercase leading-none">R-ZONE</span>
              <span className="text-white/80 font-normal text-[16px] tracking-wide uppercase leading-none">International</span>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-7" aria-label="R-Zone International primary navigation">
            {[{label:"Our Companies",href:"#companies"},{label:"About the Group",href:"#about"},{label:"Values",href:"#values"},{label:"Contact",href:"#contact"}].map(link=>(
              <a key={link.label} href={link.href} className="text-white/80 hover:text-white text-[13px] font-medium tracking-[0.03em] transition-colors duration-200" aria-label={link.label}>{link.label}</a>
            ))}
          </nav>
          <Link href="https://r-zoneenterprises.com/quote"
            className="hidden sm:inline-flex items-center gap-2 bg-[#0818A8] hover:bg-[#0437F2] text-white text-[13px] font-black tracking-[0.08em] uppercase px-5 py-2.5 rounded-sm transition-all duration-200 shadow-lg shadow-[#0818A8]/25"
            aria-label="Get a free UK–Nigeria shipping quote from R-Zone Cargo">
            Ship with Cargo <ArrowRight size={10} aria-hidden="true"/>
          </Link>
        </div>
      </div>
    </motion.header>
  );
}

function Hero(){
  const ref=useRef(null);const inView=useInView(ref,{once:true});
  const {scrollY}=useScroll();
  const bgY=useTransform(scrollY,[0,600],[0,100]);
  const opacity=useTransform(scrollY,[0,500],[1,0.3]);
  return (
    <section className="relative min-h-[100svh] pt-[10px] md:pt-[30px] flex flex-col justify-center overflow-hidden bg-[#000410]" aria-labelledby="rzi-hero-heading">
      <motion.div className="absolute inset-0 pointer-events-none" style={{y:bgY}} aria-hidden="true">
        <div className="absolute inset-0 opacity-[0.022]" style={{backgroundImage:"linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)",backgroundSize:"80px 80px"}}/>
      </motion.div>
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-[-15%] left-[-5%] w-[900px] h-[700px] rounded-full blur-[180px]" style={{background:"radial-gradient(circle, rgba(8,24,168,0.22) 0%, transparent 65%)"}}/>
        <div className="absolute bottom-[-20%] right-[-10%] w-[700px] h-[600px] rounded-full blur-[160px]" style={{background:"radial-gradient(circle, rgba(31,81,255,0.12) 0%, transparent 65%)"}}/>
      </div>
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {[15,35,65,82].map(pos=><div key={pos} className="absolute top-0 bottom-0 w-px opacity-[0.04]" style={{left:`${pos}%`,background:"linear-gradient(to bottom, transparent, rgba(31,81,255,1) 40%, transparent)"}}/>)}
      </div>
      <div className="absolute top-24 right-[8%] hidden xl:block pointer-events-none" aria-hidden="true">
        <motion.div className="w-52 h-52 border border-white/[0.06] rounded-full flex items-center justify-center" animate={{rotate:360}} transition={{duration:40,repeat:Infinity,ease:"linear"}}>
          <svg viewBox="0 0 200 200" className="w-full h-full absolute inset-0">
            <path id="circle-text" d="M 100,100 m -75,0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0" fill="none"/>
            <text style={{fontSize:10.5,fontFamily:"var(--font-mont)",fontWeight:500,letterSpacing:"0.2em",fill:"rgba(255,255,255,0.6)"}}>
              <textPath href="#circle-text">R-ZONE INTERNATIONAL · FOUNDED 2012 · UK–NIGERIA · </textPath>
            </text>
          </svg>
          <div className="w-16 h-16 bg-gradient-to-br from-[#0818A8] to-[#1F51FF] rounded-full flex items-center justify-center">
            <span className="text-white font-black text-[16px]">RZ</span>
          </div>
        </motion.div>
      </div>
      <div ref={ref} className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 pt-[100px] pb-20 w-full">
        <motion.div style={{opacity}}>
          {/* #1 Google badge */}
          <motion.div initial={{opacity:0,y:-10}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.5}}
            className="inline-flex items-center gap-2 bg-[#0818A8]/20 border border-[#1F51FF]/25 px-4 py-2 rounded-full mb-6">
            <Award size={13} className="text-[#1F51FF]" aria-hidden="true"/>
            <span className="text-white text-[13px] font-bold">R-Zone Cargo — #1 Highest-Rated UK–Nigeria Cargo on Google · 100+ Five-Star Reviews</span>
          </motion.div>

          <motion.div initial={{opacity:0,y:-10}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.5,delay:0.05}} className="flex items-center gap-4 mb-8">
            <div className="h-px flex-1 max-w-[60px] bg-gradient-to-r from-transparent to-[#1F51FF]/50" aria-hidden="true"/>
            <span className="text-[#1F51FF] text-[13px] font-bold tracking-[0.4em] uppercase">R-Zone International Group</span>
            <div className="h-px flex-1 max-w-[60px] bg-gradient-to-l from-transparent to-[#1F51FF]/50" aria-hidden="true"/>
          </motion.div>

          <div className="mb-8">
            <motion.p className="font-normal text-white/80 text-[clamp(22px,3.5vw,44px)] leading-none mb-3"
              initial={{opacity:0,x:-20}} animate={inView?{opacity:1,x:0}:{}} transition={{duration:0.7,delay:0.1}}>
              Building the future of
            </motion.p>
            <motion.h1 id="rzi-hero-heading" className="font-black text-[clamp(48px,9vw,120px)] leading-[0.85] tracking-[-0.04em] uppercase"
              initial={{opacity:0}} animate={inView?{opacity:1}:{}} transition={{duration:0.8,delay:0.2}}>
              <span className="text-white block">UK–Nigeria</span>
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text" style={{backgroundImage:"linear-gradient(135deg, #1F51FF 0%, #0818A8 50%, #ffffff 100%)"}}>Commerce.</span>
                <motion.span className="absolute -bottom-3 left-0 h-1 rounded-full" style={{background:"linear-gradient(to right, #0818A8, #1F51FF)"}}
                  initial={{width:0}} animate={inView?{width:"70%"}:{}} transition={{duration:0.7,delay:0.9}} aria-hidden="true"/>
              </span>
            </motion.h1>
          </div>

          {/* SEO body — diaspora + corridor keywords */}
          <motion.p className="text-white/80 text-[15px] font-normal leading-relaxed max-w-xl mb-10 tracking-wide"
            initial={{opacity:0,y:16}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.65,delay:0.35}}>
            R-Zone International is the UK–Nigeria enterprise group behind R-Zone Cargo —
            the #1 highest-rated UK-to-Nigeria cargo company on Google — alongside R-Zone Homes
            and R-Zone Shortlets. A growing portfolio of businesses built for the UK–Nigeria
            corridor and the Nigerian diaspora economy, since 2012.
          </motion.p>

          {/* CTAs + WhatsApp */}
          <motion.div className="flex flex-wrap gap-4 mb-14" initial={{opacity:0,y:16}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.6,delay:0.45}}>
            <a href="#companies" className="group inline-flex items-center gap-2.5 bg-[#0818A8] hover:bg-[#0437F2] text-white text-[13px] font-black tracking-[0.1em] uppercase px-7 py-3.5 transition-all duration-200 shadow-2xl shadow-[#0818A8]/35" aria-label="Explore R-Zone International companies">
              Explore Our Companies <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" aria-hidden="true"/>
            </a>
            <a href="https://wa.me/448007720864?text=Hello%2C%20I%27d%20like%20to%20enquire%20about%20UK%20to%20Nigeria%20shipping." target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 border border-[#25D366]/30 bg-[#25D366]/08 hover:bg-[#25D366]/14 text-white text-[13px] font-bold tracking-[0.08em] uppercase px-7 py-3.5 transition-all duration-200"
              aria-label="WhatsApp R-Zone for UK–Nigeria cargo enquiry">
              <MessageSquare size={13} className="text-[#25D366]" aria-hidden="true"/> WhatsApp Cargo
            </a>
            <a href="#about" className="inline-flex items-center gap-2.5 border border-white/25 hover:border-white/50 text-white/80 hover:text-white text-[13px] font-bold tracking-[0.08em] uppercase px-7 py-3.5 transition-all duration-200" aria-label="About R-Zone International Group">
              About the Group
            </a>
          </motion.div>

          {/* Companies strip */}
          <motion.div initial={{opacity:0}} animate={inView?{opacity:1}:{}} transition={{duration:0.7,delay:0.6}}>
            <p className="text-white/80 text-[13px] font-bold tracking-[0.3em] uppercase mb-4">Our Companies</p>
            <div className="flex flex-wrap gap-3">
              {SUBSIDIARIES.map(s=>{const Icon=s.icon;return(
                <div key={s.id} className="flex items-center gap-2.5 border border-white/[0.08] bg-white/[0.04] px-4 py-2 hover:border-white/[0.18] transition-all duration-200">
                  <Icon size={13} style={{color:s.color}} aria-hidden="true"/>
                  <span className="text-white text-[13px] font-semibold">{s.name}</span>
                  {s.live&&<span className="w-1.5 h-1.5 rounded-full bg-emerald-400" aria-label="Live and active"/>}
                </div>
              );})}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function GroupStats(){
  const ref=useRef(null);const inView=useInView(ref,{once:true,margin:"-40px"});
  return (
    <div ref={ref} className="bg-[#0818A8] relative overflow-hidden" role="region" aria-label="R-Zone International group statistics — the #1 UK–Nigeria cargo company on Google">
      <div className="absolute inset-0 opacity-[0.08] pointer-events-none" aria-hidden="true" style={{backgroundImage:"linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)",backgroundSize:"44px 44px"}}/>
      <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 py-12 md:py-14">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
          {GROUP_STATS.map((s,i)=>{const Icon=s.icon;return(
            <motion.div key={s.label} className="flex flex-col items-center text-center"
              initial={{opacity:0,y:18}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.5,delay:i*0.07}}>
              <div className="w-9 h-9 bg-white/20 rounded-sm flex items-center justify-center mb-3" aria-hidden="true"><Icon size={15} className="text-white"/></div>
              <p className="text-white font-black text-[26px] leading-none tracking-[-0.025em] mb-0.5">{s.val}</p>
              <p className="text-white/80 text-[13px] font-semibold tracking-[0.08em] uppercase">{s.label}</p>
              <p className="text-white/80 text-[13px] font-normal mt-0.5">{s.sub}</p>
            </motion.div>
          );})}
        </div>
      </div>
    </div>
  );
}

function Companies(){
  const ref=useRef(null);const inView=useInView(ref,{once:true,margin:"-60px"});
  return (
    <section id="companies" ref={ref} className="relative bg-[#000410] overflow-hidden scroll-mt-20" aria-labelledby="companies-heading">
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" aria-hidden="true" style={{backgroundImage:"linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)",backgroundSize:"80px 80px"}}/>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0818A8]/40 to-transparent pointer-events-none" aria-hidden="true"/>
      <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 py-20 md:py-28">
        <div className="text-center mb-16">
          <motion.div initial={{opacity:0}} animate={inView?{opacity:1}:{}} transition={{duration:0.5}}><Tag label="The R-Zone Portfolio" dark/></motion.div>
          <motion.div initial={{opacity:0,y:16}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.6,delay:0.1}}>
            <Heading serif="under one roof" sans="Our Companies." dark id="companies-heading"/>
          </motion.div>
          <motion.p className="text-white/80 text-[14px] font-normal mt-5 max-w-xl mx-auto leading-relaxed"
            initial={{opacity:0}} animate={inView?{opacity:1}:{}} transition={{duration:0.5,delay:0.2}}>
            Each R-Zone company is independently operated, sector-focused, and unified by the same group standards of quality, reliability and service excellence across the UK–Nigeria corridor.
          </motion.p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 xl:gap-6">
          {SUBSIDIARIES.map((sub,i)=>{const Icon=sub.icon;return(
            <motion.div key={sub.id} className="group relative border border-white/[0.07] bg-white/[0.025] overflow-hidden"
              initial={{opacity:0,y:28}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.7,delay:i*0.1}}
              itemScope itemType="https://schema.org/Organization">
              <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${sub.gradient}`} aria-hidden="true"/>
              <div className="relative h-48 overflow-hidden">
                <img src={sub.image} alt={`${sub.name} — ${sub.category} · R-Zone International UK–Nigeria Group`}
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-75 group-hover:scale-105 transition-all duration-700"
                  loading="lazy" onError={e=>{e.currentTarget.style.display="none";}}/>
                <div className="absolute inset-0 bg-gradient-to-t from-[#000410] via-[#000410]/50 to-transparent" aria-hidden="true"/>
                <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-sm flex items-center justify-center" style={{backgroundColor:`${sub.color}30`,border:`1px solid ${sub.color}40`}} aria-hidden="true">
                      <Icon size={17} style={{color:sub.color}}/>
                    </div>
                    <span className="text-[13px] font-bold tracking-[0.24em] uppercase text-white/80">{sub.category}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {sub.badge&&<span className="text-[13px] font-bold tracking-[0.15em] uppercase px-2.5 py-1 border rounded-full" style={{borderColor:`${sub.color}50`,color:sub.color,backgroundColor:`${sub.color}18`}}>{sub.badge}</span>}
                    {sub.live&&<span className="flex items-center gap-1 text-[13px] font-bold tracking-[0.15em] uppercase text-emerald-400 bg-emerald-400/10 border border-emerald-400/25 px-2.5 py-1 rounded-full"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400" aria-hidden="true"/>Live</span>}
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{background:`radial-gradient(circle at 80% 20%, ${sub.color}10 0%, transparent 60%)`}} aria-hidden="true"/>
              <div className="absolute bottom-4 right-6 font-black text-white/[0.03] leading-none pointer-events-none select-none" style={{fontSize:"clamp(60px,10vw,120px)"}} aria-hidden="true">{String(i+1).padStart(2,"0")}</div>
              <div className="relative z-10 p-7 md:p-8">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-white font-black text-[21px] tracking-[-0.015em]" itemProp="name">{sub.name}</h3>
                    <p className="text-white/80 text-[14.5px] mt-1 leading-snug">{sub.tagline}</p>
                  </div>
                  {sub.href!=="#"&&<a href={sub.href} target="_blank" rel="noopener noreferrer" className="w-9 h-9 border border-white/[0.12] hover:border-white/30 hover:bg-white/[0.08] flex items-center justify-center transition-all duration-200 flex-shrink-0 ml-4" aria-label={`Visit ${sub.name} — UK–Nigeria ${sub.category.toLowerCase()}`}><ArrowUpRight size={14} className="text-white/80" aria-hidden="true"/></a>}
                </div>
                <p className="text-white/80 text-[13px] font-normal leading-relaxed mb-6" itemProp="description">{sub.description}</p>
                <div className="flex gap-6 mb-5 border-t border-white/[0.06] pt-5">
                  {sub.stats.map(stat=><div key={stat.label}><p className="text-white font-black text-[18px] leading-none tracking-[-0.02em]">{stat.val}</p><p className="text-white/80 text-[13px] font-medium tracking-[0.12em] uppercase mt-0.5">{stat.label}</p></div>)}
                </div>
                <ul className="grid grid-cols-2 gap-2 mb-6" role="list">
                  {sub.highlights.map(h=><li key={h} className="flex items-center gap-2"><CheckCircle size={10} style={{color:sub.color}} aria-hidden="true"/><span className="text-white/80 text-[13px] font-normal">{h}</span></li>)}
                </ul>
                {sub.live?(
                  <a href={sub.href} target="_blank" rel="noopener noreferrer"
                    className="group/cta inline-flex items-center gap-2 text-[13px] font-black tracking-[0.1em] uppercase transition-all duration-200" style={{color:sub.color}}
                    aria-label={`Visit ${sub.name} — UK–Nigeria ${sub.category.toLowerCase()}`}>
                    Visit {sub.name} <ArrowRight size={10} className="group-hover/cta:translate-x-1 transition-transform" aria-hidden="true"/>
                  </a>
                ):(
                  <a href="#contact" className="inline-flex items-center gap-2 text-[13px] font-bold tracking-[0.1em] uppercase text-white/80 hover:text-white transition-colors" aria-label={`Register interest in ${sub.name}`}>
                    Register Interest <ArrowRight size={10} aria-hidden="true"/>
                  </a>
                )}
              </div>
            </motion.div>
          );})}
        </div>
      </div>
    </section>
  );
}

function AboutGroup(){
  const ref=useRef(null);const inView=useInView(ref,{once:true,margin:"-60px"});
  return (
    <section id="about" ref={ref} className="relative bg-white overflow-hidden scroll-mt-20" aria-labelledby="about-group-heading">
      <div className="absolute inset-0 pointer-events-none opacity-40" aria-hidden="true" style={{backgroundImage:"radial-gradient(circle, rgba(8,24,168,0.04) 1px, transparent 1px)",backgroundSize:"44px 44px"}}/>
      <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20 items-start">
          <motion.div className="lg:col-span-5" initial="hidden" animate={inView?"visible":"hidden"} variants={{hidden:{},visible:{transition:{staggerChildren:0.12}}}}>
            <motion.div variants={fadeUp} custom={0}><Tag label="The Group Story" dark={false}/></motion.div>
            <motion.div variants={fadeUp} custom={0.05}><Heading serif="who we are" sans="Built in Essex. Built for Nigeria." dark={false} id="about-group-heading"/></motion.div>
            <motion.div variants={fadeUp} custom={0.15} className="mt-7 space-y-4">
              <p className="text-gray-900 text-[14px] font-normal leading-relaxed">R-Zone International began as a single idea in Upminster, Essex, UK in 2012: that the Nigerian diaspora deserved world-class services — not just adequate ones. Starting with cargo logistics between the UK and Nigeria, we proved that a company built by and for the community could outperform established competitors on every metric that matters.</p>
              <p className="text-gray-800 text-[14px] font-normal leading-relaxed">A decade on, that conviction has grown into a multi-company group. R-Zone International now operates across freight, real estate, and short-stay accommodation across Lagos and Abuja — with new verticals in active development. Each business shares the same DNA: deep understanding of the UK–Nigeria corridor, operational excellence, and an obsession with customer experience.</p>
              <p className="text-gray-800 text-[14px] font-normal leading-relaxed">Our ambition is to become the most trusted commercial infrastructure company connecting Britain and Nigeria — the group that ambitious Nigerians in the UK and Nigeria turn to, across every aspect of their lives and businesses.</p>
            </motion.div>
            <motion.div variants={fadeUp} custom={0.3} className="mt-8 flex flex-wrap gap-3">
              <a href="https://r-zoneenterprises.com/about" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#0818A8] hover:bg-[#0437F2] text-white text-[13px] font-black tracking-[0.09em] uppercase px-6 py-3 transition-all duration-200 shadow-lg shadow-[#0818A8]/25"
                aria-label="Learn more about R-Zone Cargo history and story">
                R-Zone Cargo Story <ArrowRight size={11} aria-hidden="true"/>
              </a>
              <a href="#contact" className="inline-flex items-center gap-2 border border-[#0818A8]/25 text-[#0818A8] hover:bg-[#0818A8] hover:text-white text-[13px] font-bold tracking-[0.08em] uppercase px-6 py-3 transition-all duration-200" aria-label="Contact R-Zone International Group">Contact the Group</a>
            </motion.div>
          </motion.div>
          <motion.div className="lg:col-span-7" initial={{opacity:0,x:24}} animate={inView?{opacity:1,x:0}:{}} transition={{duration:0.75,delay:0.3}}>
            <div className="bg-[#000410] p-8 md:p-10 relative overflow-hidden mb-6">
              <div className="h-[2px] bg-gradient-to-r from-[#0818A8] to-[#1F51FF] absolute top-0 left-0 right-0" aria-hidden="true"/>
              <div className="absolute inset-0 opacity-[0.025]" aria-hidden="true" style={{backgroundImage:"linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)",backgroundSize:"32px 32px"}}/>
              <div className="relative z-10">
                <p className="text-[13px] font-bold tracking-[0.3em] uppercase text-white/80 mb-7">Group Structure</p>
                <div className="flex justify-center mb-4">
                  <div className="border border-[#1F51FF]/35 bg-[#0818A8]/20 px-6 py-3 text-center">
                    <p className="text-[13px] font-bold tracking-[0.25em] uppercase text-[#1F51FF] mb-0.5">Parent Company</p>
                    <p className="text-white font-black text-[15px] tracking-[-0.01em]">R-Zone International</p>
                  </div>
                </div>
                <div className="flex justify-center mb-4" aria-hidden="true"><div className="w-px h-6 bg-gradient-to-b from-[#1F51FF]/40 to-[#1F51FF]/10"/></div>
                <div className="flex justify-center mb-4" aria-hidden="true"><div className="h-px w-[80%] bg-gradient-to-r from-transparent via-[#1F51FF]/30 to-transparent"/></div>
                <div className="grid grid-cols-3 gap-3">
                  {SUBSIDIARIES.map(sub=>{const Icon=sub.icon;return(
                    <div key={sub.id} className="flex flex-col items-center">
                      <div className="w-px h-4 bg-[#1F51FF]/20 mb-2" aria-hidden="true"/>
                      <div className="border border-white/[0.08] bg-white/[0.04] p-3 text-center w-full">
                        <Icon size={13} style={{color:sub.color}} className="mx-auto mb-1.5" aria-hidden="true"/>
                        <p className="text-white/80 text-[13px] font-bold leading-tight">{sub.name.replace("R-Zone ","")}</p>
                        <p className="text-white/80 text-[13px] font-normal mt-0.5">{sub.live?"Live":"Upcoming"}</p>
                      </div>
                    </div>
                  );})}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[{flag:"🇬🇧",country:"United Kingdom",role:"Group HQ",address:"Upminster, Essex UK",accent:"#0818A8"},{flag:"🇳🇬",country:"Nigeria",role:"Operations Hub",address:"Lagos & Abuja",accent:"#1F51FF"}].map(loc=>(
                <div key={loc.country} className="border border-gray-200 bg-gray-50 p-5 hover:border-[#0818A8]/30 transition-colors duration-200">
                  <p className="text-3xl mb-2" aria-hidden="true">{loc.flag}</p>
                  <p className="text-[#0b0f1a] font-black text-[15px]">{loc.country}</p>
                  <p className="text-[13px] font-bold tracking-[0.18em] uppercase mt-0.5" style={{color:loc.accent}}>{loc.role}</p>
                  <p className="text-gray-800 text-[13px] font-normal mt-1.5 flex items-center gap-1.5"><MapPin size={10} aria-hidden="true"/>{loc.address}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function GroupTimeline(){
  const ref=useRef(null);const inView=useInView(ref,{once:true,margin:"-60px"});
  return (
    <section ref={ref} className="relative bg-[#000410] overflow-hidden" aria-labelledby="timeline-heading">
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" aria-hidden="true" style={{backgroundImage:"linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)",backgroundSize:"80px 80px"}}/>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0818A8]/40 to-transparent pointer-events-none" aria-hidden="true"/>
      <div className="absolute inset-y-0 left-1/2 w-px bg-gradient-to-b from-transparent via-[#0818A8]/20 to-transparent pointer-events-none hidden lg:block" aria-hidden="true"/>
      <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 py-20 md:py-28">
        <div className="text-center mb-14">
          <motion.div initial={{opacity:0}} animate={inView?{opacity:1}:{}} transition={{duration:0.5}}><Tag label="UK–Nigeria Group History Since 2012" dark/></motion.div>
          <motion.div initial={{opacity:0,y:16}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.6,delay:0.1}}><Heading serif="the journey" sans="From One to Many." dark id="timeline-heading"/></motion.div>
        </div>
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#0818A8]/30 to-transparent lg:hidden" aria-hidden="true"/>
          <div className="space-y-0">
            {TIMELINE.map((item,i)=>{const isRight=i%2===1;const typeStyle=TYPE_COLORS[item.type];return(
              <motion.div key={item.year} className="relative flex items-start gap-6 pl-12 lg:pl-0"
                initial={{opacity:0,x:isRight?20:-20}} animate={inView?{opacity:1,x:0}:{}} transition={{duration:0.55,delay:i*0.08}}>
                <div className="absolute left-0 top-4 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border-2 border-[#0818A8]/40 bg-[#0818A8]/20 lg:hidden" aria-hidden="true">
                  <div className={`w-2.5 h-2.5 rounded-full ${typeStyle.dot}`}/>
                </div>
                <div className={`hidden lg:flex w-full items-center gap-0 ${isRight?"flex-row-reverse":"flex-row"}`}>
                  <div className={`w-[calc(50%-28px)] ${isRight?"pl-8":"pr-8 text-right"}`}>
                    <div className={`inline-block border px-5 py-4 border-white/[0.08] bg-white/[0.03] hover:border-white/[0.15] hover:bg-white/[0.05] transition-all duration-200 ${isRight?"text-left":"text-right"}`}>
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[13px] font-bold tracking-[0.15em] uppercase mb-2 ${typeStyle.bg} ${typeStyle.text}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${typeStyle.dot}`} aria-hidden="true"/>{item.type}
                      </span>
                      <p className="text-[#1F51FF] font-black text-[20px] leading-none tracking-[-0.02em] mb-1">{item.year}</p>
                      <p className="text-white/80 text-[13px] font-medium leading-snug">{item.event}</p>
                    </div>
                  </div>
                  <div className="w-14 flex-shrink-0 flex justify-center" aria-hidden="true">
                    <div className="w-5 h-5 rounded-full border-2 border-[#0818A8] bg-[#000410] flex items-center justify-center">
                      <div className={`w-2 h-2 rounded-full ${typeStyle.dot}`}/>
                    </div>
                  </div>
                  <div className="w-[calc(50%-28px)]"/>
                </div>
                <div className="lg:hidden pb-6">
                  <p className="text-[#1F51FF] font-black text-[18px] leading-none tracking-[-0.01em] mb-1">{item.year}</p>
                  <p className="text-white/80 text-[13px] font-medium leading-snug">{item.event}</p>
                </div>
              </motion.div>
            );})}
          </div>
        </div>
      </div>
    </section>
  );
}

function GroupValues(){
  const ref=useRef(null);const inView=useInView(ref,{once:true,margin:"-60px"});
  return (
    <section id="values" ref={ref} className="relative bg-white overflow-hidden scroll-mt-20" aria-labelledby="values-heading">
      <div className="absolute inset-0 pointer-events-none opacity-40" aria-hidden="true" style={{backgroundImage:"radial-gradient(circle, rgba(8,24,168,0.035) 1px, transparent 1px)",backgroundSize:"44px 44px"}}/>
      <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-start">
          <motion.div className="lg:sticky lg:top-28" initial="hidden" animate={inView?"visible":"hidden"} variants={{hidden:{},visible:{transition:{staggerChildren:0.1}}}}>
            <motion.div variants={fadeUp} custom={0}><Tag label="What Drives R-Zone" dark={false}/></motion.div>
            <motion.div variants={fadeUp} custom={0.05}><Heading serif="across every brand" sans="Our Group Values." dark={false} id="values-heading"/></motion.div>
            <motion.p variants={fadeUp} custom={0.15} className="text-gray-800 text-[14px] font-normal leading-relaxed mt-5 max-w-sm">
              These principles are not aspirations — they are operational standards enforced across every R-Zone company, every team, and every customer interaction across the UK–Nigeria corridor.
            </motion.p>
            <motion.blockquote variants={fadeUp} custom={0.3} className="mt-10 border-l-4 border-[#0818A8] pl-6">
              <p className="text-[#0b0f1a] text-[20px] leading-snug mb-2">&ldquo;We exist to make the UK–Nigeria opportunity real — not just possible.&rdquo;</p>
              <footer className="text-gray-800 text-[13px] font-normal">— R-Zone International, Group Mandate</footer>
            </motion.blockquote>
          </motion.div>
          <div className="space-y-5">
            {VALUES.map((v,i)=>{const Icon=v.icon;return(
              <motion.div key={v.title} className="group border border-gray-200 bg-gray-50/80 p-7 hover:border-[#0818A8]/40 hover:shadow-lg hover:shadow-[#0818A8]/8 transition-all duration-300 relative overflow-hidden"
                initial={{opacity:0,x:20}} animate={inView?{opacity:1,x:0}:{}} transition={{duration:0.6,delay:i*0.1}}>
                <div className="absolute top-0 left-0 w-0 h-[3px] group-hover:w-full transition-all duration-500" style={{backgroundColor:v.accent}} aria-hidden="true"/>
                <div className="flex items-start gap-5">
                  <div className="w-11 h-11 rounded-sm flex items-center justify-center flex-shrink-0" style={{backgroundColor:`${v.accent}10`}} aria-hidden="true">
                    <Icon size={18} style={{color:v.accent}}/>
                  </div>
                  <div>
                    <h3 className="text-[#0b0f1a] font-black text-[16px] tracking-[-0.01em] mb-2">{v.title}</h3>
                    <p className="text-gray-800 text-[13px] font-normal leading-relaxed">{v.body}</p>
                  </div>
                </div>
              </motion.div>
            );})}
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQSection(){
  const [open,setOpen]=useState(null);
  const ref=useRef(null);const inView=useInView(ref,{once:true,margin:"-60px"});
  return (
    <section ref={ref} aria-labelledby="faq-heading" className="relative bg-white overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-40" aria-hidden="true" style={{backgroundImage:"radial-gradient(circle, rgba(8,24,168,0.035) 1px, transparent 1px)",backgroundSize:"44px 44px"}}/>
      <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 py-16 md:py-20">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <motion.div initial={{opacity:0}} animate={inView?{opacity:1}:{}} transition={{duration:0.5}}><Tag label="Common Questions" dark={false}/></motion.div>
            <motion.h2 id="faq-heading" initial={{opacity:0,y:16}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.6,delay:0.1}}
              className="font-black text-[clamp(24px,4vw,42px)] text-[#0b0f1a] leading-[0.92] tracking-[-0.025em] uppercase mb-4">
              About R-Zone <span className="text-[#0818A8]">International</span>
            </motion.h2>
          </div>
          <div className="space-y-2" itemScope itemType="https://schema.org/FAQPage">
            {FAQ_ITEMS.map((item,i)=>(
              <motion.div key={i} className="border border-gray-200 bg-gray-50 overflow-hidden"
                initial={{opacity:0,y:12}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.45,delay:i*0.06}}
                itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                <button type="button" onClick={()=>setOpen(open===i?null:i)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-gray-100 transition-all duration-200"
                  aria-expanded={open===i} aria-controls={`faq-ans-${i}`}>
                  <span className="text-gray-900 font-bold text-[14px] leading-snug" itemProp="name">{item.q}</span>
                  <ChevronRight size={14} className={`text-[#0818A8] flex-shrink-0 transition-transform duration-200 ${open===i?"rotate-90":""}`} aria-hidden="true"/>
                </button>
                <AnimatePresence initial={false}>
                  {open===i&&(
                    <motion.div id={`faq-ans-${i}`} initial={{height:0,opacity:0}} animate={{height:"auto",opacity:1}} exit={{height:0,opacity:0}}
                      transition={{duration:0.25}} className="overflow-hidden"
                      itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                      <div className="px-5 pb-5 pt-1 border-t border-gray-200">
                        <p className="text-gray-600 text-[13.5px] font-normal leading-relaxed" itemProp="text">{item.a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function GroupContact(){
  const ref=useRef(null);const inView=useInView(ref,{once:true,margin:"-40px"});
  return (
    <section id="contact" ref={ref} className="relative bg-[#000410] overflow-hidden scroll-mt-20" aria-labelledby="contact-heading">
      <div className="absolute inset-0 opacity-[0.022] pointer-events-none" aria-hidden="true" style={{backgroundImage:"linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)",backgroundSize:"80px 80px"}}/>
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true" style={{background:"radial-gradient(ellipse at 50% 100%, rgba(8,24,168,0.22) 0%, transparent 70%)"}}/>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0818A8]/40 to-transparent pointer-events-none" aria-hidden="true"/>
      <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <motion.div initial="hidden" animate={inView?"visible":"hidden"} variants={{hidden:{},visible:{transition:{staggerChildren:0.1}}}}>
            <motion.div variants={fadeUp} custom={0}><Tag label="Get in Touch" dark/></motion.div>
            <motion.div variants={fadeUp} custom={0.05}><Heading serif="work with us" sans="Contact the Group." dark id="contact-heading"/></motion.div>
            <motion.p variants={fadeUp} custom={0.15} className="text-white/80 text-[14px] font-normal leading-relaxed mt-5 mb-8 max-w-md">
              Whether you&apos;re a customer, investor, business partner, or journalist — we&apos;d love to hear from you. For UK–Nigeria cargo enquiries, contact R-Zone Cargo directly; for group-level enquiries reach us below.
            </motion.p>
            <motion.div variants={fadeUp} custom={0.25} className="space-y-4 mb-8">
              {[
                {icon:Phone,      label:"Phone",     val:"+44 (0) 800 772 0864",       href:"tel:+448007720864",                               desc:"R-Zone Cargo / Group enquiries"},
                {icon:MessageSquare,label:"WhatsApp",val:"Chat on WhatsApp",           href:"https://wa.me/448007720864?text=Hello%2C%20I%27d%20like%20to%20enquire%20about%20R-Zone.",desc:"Fastest response"},
                {icon:Mail,       label:"Email",     val:"info@r-zoneenterprises.com", href:"mailto:info@r-zoneenterprises.com",               desc:"Response within 1 business day"},
                {icon:MapPin,     label:"HQ",        val:"Upminster, Essex UK",        href:"#",                                               desc:"Unit 9 Moorhen Yard, RM14 3TS"},
                {icon:Instagram,  label:"Instagram", val:"@rzoneenterprises",          href:"https://instagram.com/rzoneenterprises",          desc:"Follow for group updates"},
              ].map(c=>{const Icon=c.icon;return(
                <a key={c.label} href={c.href} target={c.href.startsWith("http")?`_blank`:undefined} rel={c.href.startsWith("http")?"noopener noreferrer":undefined}
                  className="flex items-start gap-4 group" aria-label={`${c.label}: ${c.val}`}>
                  <div className="w-9 h-9 bg-[#0818A8]/20 group-hover:bg-[#0818A8]/40 rounded-sm flex items-center justify-center flex-shrink-0 transition-colors" aria-hidden="true">
                    <Icon size={14} className="text-[#1F51FF]"/>
                  </div>
                  <div>
                    <p className="text-white/80 text-[13px] font-bold tracking-[0.2em] uppercase">{c.label}</p>
                    <p className="text-white/80 group-hover:text-white text-[13.5px] font-semibold transition-colors leading-tight">{c.val}</p>
                    <p className="text-white/80 text-[13px] font-normal">{c.desc}</p>
                  </div>
                </a>
              );})}
            </motion.div>
          </motion.div>
          <motion.div initial={{opacity:0,y:24}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.7,delay:0.3}}>
            <p className="text-[13px] font-bold tracking-[0.3em] uppercase text-white/80 mb-5">Visit a Brand</p>
            <div className="grid grid-cols-1 gap-3 mb-7">
              {SUBSIDIARIES.map(sub=>{const Icon=sub.icon;return(
                <div key={sub.id} className="group flex items-center justify-between border border-white/[0.07] bg-white/[0.03] p-5 hover:border-white/[0.18] hover:bg-white/[0.06] transition-all duration-200 relative overflow-hidden">
                  <div className="h-[2px] absolute top-0 left-0 w-0 group-hover:w-full transition-all duration-500" style={{background:`linear-gradient(to right, ${sub.color}, ${sub.color}88)`}} aria-hidden="true"/>
                  <div className="flex items-center gap-4">
                    <div className="w-9 h-9 rounded-sm flex items-center justify-center" style={{backgroundColor:`${sub.color}20`}} aria-hidden="true">
                      <Icon size={14} style={{color:sub.color}}/>
                    </div>
                    <div>
                      <p className="text-white/80 font-bold text-[14px]">{sub.name}</p>
                      <p className="text-white/80 text-[13px] font-normal">{sub.category}</p>
                    </div>
                  </div>
                  {sub.live?(
                    <a href={sub.href} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-[13px] font-bold transition-colors" style={{color:sub.color}}
                      aria-label={`Visit ${sub.name} — UK–Nigeria ${sub.category.toLowerCase()}`}>
                      Visit <ExternalLink size={9} aria-hidden="true"/>
                    </a>
                  ):<span className="text-white/80 text-[13px] font-bold tracking-[0.12em] uppercase">{sub.badge}</span>}
                </div>
              );})}
            </div>
            <div className="border border-[#0818A8]/25 bg-[#0818A8]/10 p-6">
              <p className="text-[13px] font-bold tracking-[0.28em] uppercase text-[#1F51FF] mb-2">Ready to Ship Today?</p>
              <p className="text-white/80 text-[13px] font-normal leading-relaxed mb-5">
                R-Zone Cargo is live now — get a free UK–Nigeria shipping quote in under 2 minutes.
                Air freight 5–10 working days · Sea freight 4–6 weeks · All 36 Nigerian states.
              </p>
              <a href="https://r-zoneenterprises.com/quote" target="_blank" rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 bg-[#0818A8] hover:bg-[#0437F2] text-white text-[13px] font-black tracking-[0.09em] uppercase px-6 py-3 transition-all duration-200 shadow-lg shadow-[#0818A8]/30 w-full justify-center"
                aria-label="Get a free UK–Nigeria shipping quote from R-Zone Cargo">
                Get a Free Cargo Quote <ArrowRight size={11} className="group-hover:translate-x-1 transition-transform" aria-hidden="true"/>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function GroupFooter(){
  return (
    <footer className="bg-[#00020e] border-t border-white/[0.06]" role="contentinfo">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 xl:px-10 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-[#0818A8] to-[#1F51FF] rounded-sm flex items-center justify-center" aria-hidden="true"><span className="text-white font-black text-[13px]">RZ</span></div>
              <div><span className="text-white font-black text-[15px] tracking-[0.06em] uppercase">R-ZONE </span><span className="text-white/80 font-normal text-[15px] uppercase">International</span></div>
            </div>
            {/* SEO-rich footer description */}
            <p className="text-white/80 text-[13px] font-normal leading-relaxed max-w-xs">
              R-Zone International — the UK–Nigeria enterprise group. Parent company of R-Zone Cargo (the #1 highest-rated UK–Nigeria cargo company on Google with 100+ five-star reviews), R-Zone Homes, and R-Zone Shortlets. Founded 2012. Upminster, Essex, United Kingdom.
            </p>
          </div>
          <div>
            <p className="text-[13px] font-bold tracking-[0.3em] uppercase text-white/80 mb-4">Our Companies</p>
            <div className="space-y-2">
              {SUBSIDIARIES.map(s=>(
                <div key={s.id}>{s.live?(
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white text-[13px] font-normal transition-colors flex items-center gap-1.5" aria-label={`${s.name} — UK–Nigeria ${s.category.toLowerCase()}`}>
                    {s.name} <ExternalLink size={9} aria-hidden="true"/>
                  </a>
                ):<span className="text-white/80 text-[13px] font-normal">{s.name} <span className="text-[13px] ml-1 opacity-70">({s.badge})</span></span>}</div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[13px] font-bold tracking-[0.3em] uppercase text-white/80 mb-4">Contact</p>
            <div className="space-y-2.5">
              <a href="tel:+448007720864" className="text-white/80 hover:text-white text-[13px] font-normal transition-colors flex items-center gap-2" aria-label="Call R-Zone: +44 800 772 0864"><Phone size={10} className="flex-shrink-0" aria-hidden="true"/>+44 (0) 800 772 0864</a>
              <a href="https://wa.me/448007720864" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white text-[13px] font-normal transition-colors flex items-center gap-2" aria-label="WhatsApp R-Zone"><MessageSquare size={10} className="flex-shrink-0" aria-hidden="true"/>WhatsApp Us</a>
              <a href="mailto:info@r-zoneenterprises.com" className="text-white/80 hover:text-white text-[13px] font-normal transition-colors flex items-center gap-2 break-all" aria-label="Email R-Zone"><Mail size={10} className="flex-shrink-0" aria-hidden="true"/>info@r-zoneenterprises.com</a>
              <a href="https://instagram.com/rzoneenterprises" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white text-[13px] font-normal transition-colors flex items-center gap-2" aria-label="Instagram: @rzoneenterprises"><Instagram size={10} className="flex-shrink-0" aria-hidden="true"/>@rzoneenterprises</a>
              <p className="text-white/80 text-[13px] font-normal flex items-center gap-2"><MapPin size={10} aria-hidden="true"/>Upminster, Essex UK · Lagos & Abuja, Nigeria</p>
            </div>
          </div>
        </div>
        <div className="border-t border-white/[0.06] pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-white/80 text-[13px] font-normal">© {new Date().getFullYear()} R-Zone International. All rights reserved.</p>
          <div className="flex gap-5">
            <Link href="/privacy" className="text-white/80 hover:text-white text-[13px] font-normal transition-colors">Privacy</Link>
            <Link href="/terms" className="text-white/80 hover:text-white text-[13px] font-normal transition-colors">Terms</Link>
            <Link href="https://r-zoneenterprises.com" className="text-white/80 hover:text-white text-[13px] font-normal transition-colors">R-Zone Cargo</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

const SCHEMA = {
  "@context":"https://schema.org",
  "@graph":[
    {
      "@type":"Organization","@id":"https://r-zoneinternational.com/#org",
      "name":"R-Zone International","alternateName":["R-Zone Group","R-Zone International Group"],
      "url":"https://r-zoneinternational.com",
      "description":"R-Zone International is a diversified UK–Nigeria enterprise group founded in 2012 and headquartered in Upminster, Essex. Parent company of R-Zone Cargo (the #1 highest-rated UK-to-Nigeria cargo company on Google with 100+ five-star reviews), R-Zone Homes, and R-Zone Shortlets.",
      "foundingDate":"2012",
      "address":{"@type":"PostalAddress","streetAddress":"Unit 9 Moorhen Yard, Elms Lane, Bulphan","addressLocality":"Upminster","addressRegion":"Essex","postalCode":"RM14 3TS","addressCountry":"GB"},
      "telephone":"+448007720864","email":"info@r-zoneenterprises.com",
      "sameAs":["https://www.instagram.com/rzoneenterprises","https://r-zoneenterprises.com"],
      "areaServed":[{"@type":"Country","name":"United Kingdom"},{"@type":"Country","name":"Nigeria"}],
      "subOrganization":[
        {"@type":"LocalBusiness","name":"R-Zone Cargo","url":"https://r-zoneenterprises.com",
          "description":"The #1 highest-rated UK-to-Nigeria cargo company on Google. Air freight 5–10 working days, sea freight 4–6 weeks transit. Delivery to all 36 Nigerian states. 100+ five-star reviews organically earned since 2012.",
          "aggregateRating":{"@type":"AggregateRating","ratingValue":"5","reviewCount":"100","bestRating":"5"},
          "telephone":"+448007720864","areaServed":["United Kingdom","Nigeria"]},
        {"@type":"Organization","name":"R-Zone Homes","description":"Nigerian residential and commercial real estate for the UK diaspora. Off-plan properties and property management in Lagos and Abuja."},
        {"@type":"Organization","name":"R-Zone Shortlets","description":"Premium serviced short-term apartments in Lagos and Abuja for business travellers and the Nigerian diaspora."},
      ],
    },
    {"@type":"WebSite","url":"https://r-zoneinternational.com","name":"R-Zone International","description":"The UK–Nigeria enterprise group — R-Zone Cargo, R-Zone Homes, R-Zone Shortlets.","publisher":{"@id":"https://r-zoneinternational.com/#org"}},
    {"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"R-Zone International","item":"https://r-zoneinternational.com"}]},
    {"@type":"FAQPage","mainEntity":FAQ_ITEMS.map(item=>({"@type":"Question","name":item.q,"acceptedAnswer":{"@type":"Answer","text":item.a}}))},
  ],
};

export default function RZoneInternationalClient(){
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(SCHEMA)}}/>
      <div className={`${montserrat.variable} font-[family-name:var(--font-mont)] w-full`}>
        <CursorGlow/>
        
        <main>
          <Hero/>
          <GroupStats/>
          <Companies/>
          <AboutGroup/>
          <GroupTimeline/>
          <GroupValues/>
          <FAQSection/>
          <GroupContact/>
        </main>
   
      </div>
    </>
  );
}