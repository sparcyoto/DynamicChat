import Image from "next/image";
import styles from "./page.module.css";
import Charts from "@/components/Chat/index";
import ChatHistory from "@/components/ChatHistory/index";

export default function Home() {
  return (
    <main className={styles.main}>
      <ChatHistory />
    </main>
  );
}
