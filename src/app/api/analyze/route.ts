import{NextRequest,NextResponse}from"next/server";
import{analyzeTokenData}from"@/lib/analyzer";
import{runTokenAgent}from"@/lib/agent";
import{getCached,setCached}from"@/lib/cache";
import type{FullAnalysis}from"@/lib/types";

export const runtime="nodejs";

export async function POST(req:NextRequest){
  try{
    const{contract}=await req.json();
    const normalized=String(contract||"").trim().toLowerCase();
    const key=`analysis:${normalized}`;
    const cached=getCached<FullAnalysis>(key);
    if(cached)return NextResponse.json({...cached,cached:true});

    const data=await analyzeTokenData(String(contract||""));
    let agent=null,agentError:string|undefined;
    try{
      agent=await runTokenAgent(data);
      if(!agent&&!process.env.OPENAI_API_KEY)agentError="OpenAI is not configured.";
    }catch(e){agentError=e instanceof Error?e.message:"Agent analysis failed";}

    const result:FullAnalysis={data,agent,agentError};
    setCached(key,result,180_000);
    return NextResponse.json({...result,cached:false});
  }catch(e){
    return NextResponse.json({error:e instanceof Error?e.message:"Analysis failed"},{status:400});
  }
}
