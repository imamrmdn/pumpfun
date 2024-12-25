"use client"

import { Stack, } from "@mui/material"
import { PumpCoin } from "common/types"
import CoinCard from "./item"
import axios from "axios";
import { useEffect, useState } from "react";

export default function List() {
  //
  const [data, setData] = useState<PumpCoin[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://gmgn.ai/defi/quotation/v1/rank/sol/pump?limit=50&orderby=progress&direction=desc&pump=true"
        );
        console.log({ log: response?.data })
        setData(response.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  //
  return (
    <Stack p={1.5} direction="row" flexWrap="wrap" gap={1.5}>
      {data?.map(t => (
        <CoinCard key={t.address} data={t} />
      ))}
    </Stack>
  )
}
