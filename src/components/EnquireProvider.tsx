"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { EnquireForm } from "./EnquireForm";

type Ctx = { open: () => void };
const EnquireContext = createContext<Ctx>({ open: () => {} });

export const useEnquire = () => useContext(EnquireContext);

export function EnquireProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const open = useCallback(() => setOpen(true), []);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, close]);

  return (
    <EnquireContext.Provider value={{ open }}>
      {children}
      {isOpen && (
        <div className="modal" role="dialog" aria-modal="true" onClick={close}>
          <div className="modal__box" onClick={(e) => e.stopPropagation()}>
            <button className="modal__close" onClick={close} aria-label="Закрыть">
              ×
            </button>
            <h3 className="modal__title">Оставить заявку</h3>
            <EnquireForm onDone={close} />
          </div>
        </div>
      )}
    </EnquireContext.Provider>
  );
}
