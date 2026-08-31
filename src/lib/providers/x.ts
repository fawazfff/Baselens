type XMetrics={like_count?:number;retweet_count?:number;reply_count?:number;quote_count?:number;impression_count?:number};
type XPost={id:string;text:string;created_at?:string;public_metrics?:XMetrics;author_id?:string};

function usernameFromUrl(url:string|null){if(!url)return null;try{const u=new URL(url);const parts=u.pathname.split("/").filter(Boolean);return parts[0]||null}catch{return null}}
function engagement(m?:XMetrics){return (m?.like_count||0)+(m?.retweet_count||0)*2+(m?.reply_count||0)*1.5+(m?.quote_count||0)*2}
function cleanText(s:string){return s.replace(/https?:\/\/\S+/g,"").replace(/\s+/g," ").trim().slice(0,280)}

async function xFetch(path:string){const token=process.env.X_BEARER_TOKEN;if(!token)return null;const r=await fetch(`https://api.x.com${path}`,{headers:{authorization:`Bearer ${token}`},signal:AbortSignal.timeout(8000),cache:"no-store"});if(!r.ok)throw new Error(`X API returned ${r.status}`);return r.json()}

export async function getXSocialData(input:{twitter:string|null;symbol:string|null;contract:string}){
  const username=usernameFromUrl(input.twitter);
  if(!process.env.X_BEARER_TOKEN)return{available:false,provider:"X API",username,reason:"X_BEARER_TOKEN is not configured",posts:[],mentions:[],topPost:null,summary:null};
  if(!username)return{available:false,provider:"X API",username:null,reason:"No official X account was discovered",posts:[],mentions:[],topPost:null,summary:null};
  try{
    const officialQuery=encodeURIComponent(`from:${username} -is:retweet`);
    const symbol=input.symbol?.replace(/[^a-zA-Z0-9_]/g,"")||"";
    const mentionTerms=[`\"${input.contract}\"`,symbol?`\"$${symbol}\"`:null].filter(Boolean).join(" OR ");
    const mentionQuery=encodeURIComponent(`(${mentionTerms}) -is:retweet lang:en`);
    const fields="tweet.fields=created_at,public_metrics,author_id&max_results=10";
    const [official,mentions]=await Promise.all([
      xFetch(`/2/tweets/search/recent?query=${officialQuery}&${fields}`),
      mentionTerms?xFetch(`/2/tweets/search/recent?query=${mentionQuery}&${fields}`):Promise.resolve(null),
    ]);
    const posts:Array<XPost>=Array.isArray(official?.data)?official.data:[];
    const mentionPosts:Array<XPost>=Array.isArray(mentions?.data)?mentions.data:[];
    const ranked=[...posts].sort((a,b)=>engagement(b.public_metrics)-engagement(a.public_metrics));
    const top=ranked[0]||null;
    const likes=posts.reduce((n,p)=>n+(p.public_metrics?.like_count||0),0),reposts=posts.reduce((n,p)=>n+(p.public_metrics?.retweet_count||0),0),replies=posts.reduce((n,p)=>n+(p.public_metrics?.reply_count||0),0);
    const totalEngagement=posts.reduce((n,p)=>n+engagement(p.public_metrics),0);
    const buzz=Math.min(100,Math.round(Math.log10(1+mentionPosts.length*10+totalEngagement)*25));
    return{available:true,provider:"X API",username,reason:null,postCount:posts.length,mentionCount:mentionPosts.length,likes,reposts,replies,buzzScore:buzz,posts:posts.slice(0,6).map(p=>({id:p.id,text:cleanText(p.text),createdAt:p.created_at||null,likes:p.public_metrics?.like_count||0,reposts:p.public_metrics?.retweet_count||0,replies:p.public_metrics?.reply_count||0,url:`https://x.com/${username}/status/${p.id}`})),mentions:mentionPosts.slice(0,6).map(p=>({id:p.id,text:cleanText(p.text),createdAt:p.created_at||null,likes:p.public_metrics?.like_count||0,reposts:p.public_metrics?.retweet_count||0,replies:p.public_metrics?.reply_count||0,url:`https://x.com/i/web/status/${p.id}`})),topPost:top?{id:top.id,text:cleanText(top.text),createdAt:top.created_at||null,likes:top.public_metrics?.like_count||0,reposts:top.public_metrics?.retweet_count||0,replies:top.public_metrics?.reply_count||0,url:`https://x.com/${username}/status/${top.id}`}:null,summary:{officialActivity:posts.length>=6?"High":posts.length>=3?"Moderate":posts.length?"Low":"Inactive",conversation:mentionPosts.length>=8?"High":mentionPosts.length>=3?"Moderate":mentionPosts.length?"Low":"No recent sample",buzzScore:buzz}};
  }catch(e){return{available:false,provider:"X API",username,reason:e instanceof Error?e.message:"X social data unavailable",posts:[],mentions:[],topPost:null,summary:null}}
}
