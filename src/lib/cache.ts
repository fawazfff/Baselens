type Entry<T>={value:T;expiresAt:number};

const store=new Map<string,Entry<unknown>>();

export function getCached<T>(key:string):T|null{
  const entry=store.get(key);
  if(!entry)return null;
  if(Date.now()>entry.expiresAt){store.delete(key);return null;}
  return entry.value as T;
}

export function setCached<T>(key:string,value:T,ttlMs=180_000){
  store.set(key,{value,expiresAt:Date.now()+ttlMs});
  if(store.size>250){
    const now=Date.now();
    for(const [k,v] of store){if(now>v.expiresAt)store.delete(k);}
  }
}
