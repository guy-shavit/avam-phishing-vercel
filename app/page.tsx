"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const searchParams = useSearchParams();

  const unit = searchParams.get("u") || "unknown";
  const campaign = "training1";

  useEffect(() => {
    fetch("/api/visit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ campaign, unit }),
    });
  }, [campaign, unit]);

  return (
    <main className="main-page">
      <section className="card">
        <div className="center">
          <div className="badge">תרגיל אב״מ רשמי ✅</div>

          <div className="emoji">🎣</div>

          <h1 className="title">אופס… הדג כמעט נתפס!</h1>

          <p className="subtitle">
            נכנסת לקישור שנשלח אליך. הפעם זה היה תרגיל לימודי,
            אבל בעולם האמיתי זה יכול היה להיות פישינג.
          </p>
        </div>

        <div className="warning-box">
          <h2>מה קרה כאן?</h2>
          <ul>
            <li>📩 קיבלת הודעה קצרה עם קישור.</li>
            <li>👀 הקישור נראה יחסית תמים.</li>
            <li>⚡ לחצת מהר לפני בדיקה מלאה.</li>
            <li>🔒 בתרגיל הזה לא נאסף מידע רגיש.</li>
          </ul>
        </div>

        <div className="rules-box">
          <h2>לפני קליק — עצירת אב״מ 🛑</h2>
          <ul>
            <li>מי שלח את ההודעה?</li>
            <li>האם ציפיתי לקישור הזה?</li>
            <li>האם הקישור נראה מוזר?</li>
            <li>האם מבקשים ממני להזין פרטים?</li>
            <li>אם יש ספק — מדווחים ולא לוחצים.</li>
          </ul>
        </div>

        <p className="footer-note">
          אין מה להילחץ. לא נכשלת — למדת. בפעם הבאה הדג נשאר בים 🐟
        </p>
      </section>
    </main>
  );
}