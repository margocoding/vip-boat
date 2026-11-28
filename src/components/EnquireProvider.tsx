"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { interfaceText, type Language } from "@/data/locale";
import { EnquireForm } from "./EnquireForm";

const EnquireContext = createContext<{ open: (note?: string) => void }>({ open() {} });
export const useEnquire = () => useContext(EnquireContext);

export function EnquireProvider({ children, language }: { children: React.ReactNode; language: Language }) {
  const [request, setRequest] = useState<{ note?: string } | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const open = useCallback((note?: string) => setRequest({ note }), []);
  const copy = interfaceText[language];

  useEffect(() => {
    if (request && dialog.current && !dialog.current.open) dialog.current.showModal();
  }, [request]);

  return (
    <EnquireContext.Provider value={{ open }}>
      {children}
      {request && (
        <dialog className="enquire-dialog" ref={dialog} aria-labelledby="enquire-title" onClose={() => setRequest(null)}>
          <button className="modal__close" type="button" onClick={() => dialog.current?.close()} aria-label={copy.close}>×</button>
          <h2 className="modal__title" id="enquire-title">{copy.enquiry}</h2>
          <EnquireForm language={language} note={request.note} />
        </dialog>
      )}
    </EnquireContext.Provider>
  );
}
