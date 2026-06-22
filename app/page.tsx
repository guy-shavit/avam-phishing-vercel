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
    <main className="attack-page">
      <VisitTracker campaign={campaign} unit={unit} />

      <section className="attack-card">
        <div className="attack-warning-bar">
          🚨 איראן גנבה לך את המידע
        </div>

        <div className="attack-hero">
            <div className="flag-row">
              <div className="iran-flag">
                <div className="flag-green"></div>
                <div className="flag-white">
                  <span>الله</span>
                </div>
                <div className="flag-red"></div>
              </div>

              <div className="boom">💥</div>
            </div>
          <h1 className="attack-title">
            ייתכן שהמידע שלך נחשף
          </h1>

          <p className="attack-subtitle">
            הקישור שעליו לחצת הוביל לעמוד חיצוני שאסף פרטי חיבור בסיסיים.
            בתרחיש אמיתי, גורם עוין היה יכול להשתמש בלחיצה הזו כדי לזהות אותך,
            לאסוף מידע על המכשיר שלך, ולבנות מתקפה ממוקדת יותר.
          </p>
        </div>

        <div className="breach-box">
          <h2>⚠️ פרטי חיבור שניתן לאסוף מלחיצה אחת</h2>
          <p>
            כתובת IP, מיקום משוער, סוג מכשיר, דפדפן, זמן כניסה ושיוך יחידתי.
            לפעמים זה מספיק כדי להתחיל איסוף מודיעין דיגיטלי.
          </p>
        </div>

        <div className="attack-grid">
          <div className="attack-panel">
            <h3>מה תוקף היה יכול לדעת?</h3>
            <ul>
              <li>מתי לחצת על הקישור</li>
              <li>מאיזה מכשיר או דפדפן נכנסת</li>
              <li>מיקום משוער לפי IP</li>
              <li>האם אתה מגיב לקישורים חשודים</li>
            </ul>
          </div>

          <div className="attack-panel red">
            <h3>מה היה יכול לקרות אחר כך?</h3>
            <ul>
              <li>שליחת קישור התחזות נוסף</li>
              <li>עמוד מזויף להזנת סיסמה</li>
              <li>ניסיון התחזות לגורם מוכר</li>
              <li>איסוף מידע על היחידה</li>
              <li>פגיעה אפשרית בביטחון מידע</li>
            </ul>
          </div>
        </div>

        <div className="critical-box">
          <h2>קליק אחד מספיק.</h2>
          <p>
            לא תמיד צריך לפרוץ למערכת. לפעמים מספיק לגרום למישהו ללחוץ.
          </p>
        </div>
      </section>
    </main>
  );
}