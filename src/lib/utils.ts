export const clamp=(n:number,min=0,max=100)=>Math.min(max,Math.max(min,n));
export const num=(v:unknown):number|null=>{if(v===null||v===undefined||v==="")return null;const n=Number(v);return Number.isFinite(n)?n:null};
export const bool01=(v:unknown):boolean|null=>v==="1"||v===1||v===true?true:v==="0"||v===0||v===false?false:null;
export const percent01=(v:unknown):number|null=>{const n=num(v);return n===null?null:n*100};
export function fmtMoney(n:number|null){if(n===null)return"Unavailable";if(Math.abs(n)>=1e9)return`$${(n/1e9).toFixed(2)}B`;if(Math.abs(n)>=1e6)return`$${(n/1e6).toFixed(2)}M`;if(Math.abs(n)>=1e3)return`$${(n/1e3).toFixed(2)}K`;if(Math.abs(n)<.01&&n!==0)return`$${n.toPrecision(4)}`;return`$${n.toLocaleString(undefined,{maximumFractionDigits:4})}`}
