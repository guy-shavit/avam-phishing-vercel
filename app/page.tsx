import VisitTracker from "./components/VisitTracker";

type HomePageProps = {
  searchParams: Promise<{
    u?: string;
  }>;
};

export default async function Home({ searchParams }: HomePageProps) {
  const params = await searchParams;

  const unit = params.u || "unknown";
  const campaign = "training1";

  return (
    <main className="main-page">
      <VisitTracker campaign={campaign} unit={unit} />

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


      </section>
    </main>
  );
}