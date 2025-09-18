"use client";
import { redirect } from "next/navigation";
import styles from "./page.module.css";

export default function page() {
  // app/page.tsx

  redirect("/homepage");
}
