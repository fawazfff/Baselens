import { ImageResponse } from "next/og";

export const alt = "BaseLens — research Base tokens before you trade";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image(){return new ImageResponse(<div style={{width:"100%",height:"100%",display:"flex",flexDirection:"column",justifyContent:"space-between",background:"#ffffff",color:"#0a0d16",padding:"72px",fontFamily:"sans-serif"}}><div style={{display:"flex",alignItems:"center",gap:18}}><div style={{width:54,height:54,borderRadius:16,background:"#0b5cff",display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontSize:27,fontWeight:800}}>B</div><div style={{fontSize:32,fontWeight:750}}>BaseLens</div></div><div style={{display:"flex",flexDirection:"column",gap:20,maxWidth:920}}><div style={{fontSize:70,fontWeight:780,letterSpacing:"-3px",lineHeight:1.02}}>Research Base tokens before you trade.</div><div style={{fontSize:25,color:"#606b80",lineHeight:1.4}}>Market activity, liquidity, holders, contract risk and explainable AI analysis from one Base contract.</div></div><div style={{display:"flex",justifyContent:"space-between",fontSize:20,color:"#606b80"}}><span>Base mainnet · Live evidence · Research tool</span><span style={{color:"#0b5cff",fontWeight:700}}>baselens</span></div></div>,size)}
