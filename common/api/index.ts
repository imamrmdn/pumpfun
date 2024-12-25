import { PumpCoin, PumpDetail } from "common/types";
import axios from 'axios';


export async function getPumpList(): Promise<PumpCoin[]> {
  try {
    const res = await axios.get(
      "https://gmgn.ai/defi/quotation/v1/rank/sol/pump?limit=50&orderby=progress&direction=desc&pump=true",
      {
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
    console.log({ res });
    if (res.data.code === 0) {
      return res.data.data.rank;
    }
    return [];
  } catch (error) {
    console.error("Error fetching pump list:", error);
    return [];
  }
}

export async function getPumpDetail(addr: string): Promise<PumpDetail> {
  const res = await fetch(
    `https://gmgn.ai/defi/quotation/v1/tokens/sol/${addr}`
  );
  const data = await res.json();
  if (data.code === 0) {
    return data.data.token;
  }
}
