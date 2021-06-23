import { httpGet } from '../http';

interface SignParms {

  // Resource origin domain
  origin: string;

  meta: {
    // A key that holds the resource
    resourceKey: string;
  }

  // The path that Util package will call to get signature
  call: string;

}

interface OnChainMeta {
  resourceKey: string,
}

interface Signed {
  
  signature: string;

  publicKey: string;

  method: string;

  origin: string;

  meta: OnChainMeta;

}

export const getOriginSignature = async ({
  origin,
  meta: {
    resourceKey,
  },
  call,
}: SignParms): Promise<string> => {
  const signature = await httpGet<string>(`${origin}${call}`, {
    origin,
    resourceKey,
  });

  return signature;
};
