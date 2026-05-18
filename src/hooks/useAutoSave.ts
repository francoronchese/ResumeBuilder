// Hook that tracks the last time the resume was saved to localStorage
import { useEffect, useState } from "react";
import { useResumeStore } from "../store/store";

export function useAutoSave() {
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const store = useResumeStore();

  useEffect(() => {
    setLastSaved(new Date());
  }, [store]);

  const formattedTime = lastSaved
    ? lastSaved.toLocaleTimeString()
    : null;

  return { formattedTime };
}