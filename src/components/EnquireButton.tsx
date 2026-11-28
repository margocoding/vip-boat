"use client";

import { useEnquire } from "./EnquireProvider";

export function EnquireButton({ children, note, className = "btn btn--solid" }: {
  children: React.ReactNode;
  note?: string;
  className?: string;
}) {
  const { open } = useEnquire();
  return <button className={className} type="button" onClick={event => open({ note }, event.currentTarget)}>{children}</button>;
}
