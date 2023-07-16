'use client'

import { useEffect } from "react";
import { invoke } from '@tauri-apps/api/tauri'

export default function Editor() {

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  useEffect(() => {
    invoke("query_one_note", { id })
  })

}