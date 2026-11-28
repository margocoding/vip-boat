"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { interfaceText, type Language } from "@/data/locale";
import { EnquireForm, type EnquireQuote } from "./EnquireForm";

type EnquireRequest = { note?: string; quote?: EnquireQuote };
const EnquireContext = createContext<{ open: (request?: EnquireRequest, trigger?: HTMLElement | null) => void }>({ open() {} });
export const useEnquire = () => useContext(EnquireContext);

export function EnquireProvider({ children, language }: { children: React.ReactNode; language: Language }) {
  const [request, setRequest] = useState<EnquireRequest | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const open = useCallback((details: EnquireRequest = {}, trigger?: HTMLElement | null) => {
    opener.current = trigger ?? null;
    setRequest(details);
  }, []);
  const copy = interfaceText[language];

  useEffect(() => {
    if (request && dialog.current && !dialog.current.open) dialog.current.showModal();
  }, [request]);

  function close() {
    setRequest(null);
    opener.current?.focus({ preventScroll: true });
    opener.current = null;
  }

  return (
    <EnquireContext.Provider value={{ open }}>
      {children}
      {request && (
        <dialog className="enquire-dialog" ref={dialog} aria-labelledby="enquire-title" onClose={close}>
          <button className="modal__close" type="button" onClick={() => dialog.current?.close()} aria-label={copy.close}>×</button>
          <h2 className="modal__title" id="enquire-title">{copy.enquiry}</h2>
          <EnquireForm language={language} note={request.note} quote={request.quote} />
        </dialog>
      )}
    </EnquireContext.Provider>
  );
}
