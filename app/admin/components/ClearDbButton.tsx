"use client";

import { useState } from "react";

type ClearDbButtonProps = {
  password: string;
};

export default function ClearDbButton({ password }: ClearDbButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  async function clearDb() {
    const approved = confirm(
      "אתה בטוח שאתה רוצה למחוק את כל נתוני הכניסות?\nאי אפשר לשחזר את זה."
    );

    if (!approved) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/admin/clear-db", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (!data.success) {
        alert("הניקוי נכשל");
        return;
      }

      alert("הנתונים נמחקו בהצלחה");
      window.location.reload();
    } catch (error) {
      alert("הייתה שגיאה בניקוי הנתונים");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <button
      onClick={clearDb}
      disabled={isLoading}
      className="danger-button"
    >
      {isLoading ? "מנקה..." : "ניקוי נתונים 🧹"}
    </button>
  );
}