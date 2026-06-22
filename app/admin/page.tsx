import { initDb, sql } from "@/lib/db";
import ClearDbButton from "./components/ClearDbButton";

type AdminPageProps = {
  searchParams: Promise<{
    password?: string;
    campaign?: string;
  }>;
};

type UnitRow = {
  unit: string;
  clicks: string;
};

type RecentRow = {
  unit: string;
  created_at_il: string;
};

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const params = await searchParams;

  const password = params.password;
  const campaign = params.campaign || "training1";

  if (password !== process.env.ADMIN_PASSWORD) {
    return (
      <main className="main-page">
        <section className="card center">
          <div className="emoji">🕵️</div>
          <h1 className="title">אין כניסה, סוכן חשאי</h1>
          <p className="subtitle">
            כדי לראות סטטיסטיקות צריך להוסיף סיסמה בכתובת.
          </p>
          <code>/admin?password=YOUR_PASSWORD</code>
        </section>
      </main>
    );
  }

  await initDb();

  const totalClicksResult = await sql`
    SELECT COUNT(*)::text AS count
    FROM visits
    WHERE campaign = ${campaign};
  `;

  const unitsCountResult = await sql`
    SELECT COUNT(DISTINCT unit)::text AS count
    FROM visits
    WHERE campaign = ${campaign};
  `;

  const byUnit = (await sql`
    SELECT unit, COUNT(*)::text AS clicks
    FROM visits
    WHERE campaign = ${campaign}
    GROUP BY unit
    ORDER BY COUNT(*) DESC;
  `) as UnitRow[];

  const recent = (await sql`
    SELECT
      unit,
      to_char(
        (created_at AT TIME ZONE 'UTC') AT TIME ZONE 'Asia/Jerusalem',
        'DD/MM/YYYY HH24:MI:SS'
      ) AS created_at_il
    FROM visits
    WHERE campaign = ${campaign}
    ORDER BY created_at DESC
    LIMIT 30;
  `) as RecentRow[];

  const totalClicks = totalClicksResult[0]?.count || "0";
  const unitsCount = unitsCountResult[0]?.count || "0";

  return (
    <main className="admin-page">
      <section className="admin-container">
        <div className="admin-card">
        <h1>📊 דשבורד תרגיל פישינג</h1>
        <ClearDbButton password={password || ""} />
    </div>

        <div className="metrics-grid">
          <Metric title="סה״כ כניסות" value={totalClicks} />
          <Metric title="אנשים שנכנסו" value={unitsCount} />
        </div>

        <div className="admin-card">
          <h2>כניסות לפי יחידה</h2>

          <table>
            <thead>
              <tr>
                <th>יחידה</th>
                <th>כניסות</th>
              </tr>
            </thead>

            <tbody>
              {byUnit.length === 0 ? (
                <tr>
                  <td colSpan={2}>אין כניסות עדיין</td>
                </tr>
              ) : (
                byUnit.map((row) => (
                  <tr key={row.unit}>
                    <td>{row.unit}</td>
                    <td>{row.clicks}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="admin-card">
          <h2>30 הכניסות האחרונות</h2>
          <p>
            השעות מוצגות לפי שעון ישראל.
          </p>

          <table>
            <thead>
              <tr>
                <th>יחידה</th>
                <th>זמן כניסה</th>
              </tr>
            </thead>

            <tbody>
              {recent.length === 0 ? (
                <tr>
                  <td colSpan={2}>אין כניסות עדיין</td>
                </tr>
              ) : (
                recent.map((row, index) => (
                  <tr key={index}>
                    <td>{row.unit}</td>
                    <td>{row.created_at_il}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

function Metric({ title, value }: { title: string; value: string }) {
  return (
    <div className="metric">
      <div className="metric-value">{value}</div>
      <div className="metric-title">{title}</div>
    </div>
  );
}