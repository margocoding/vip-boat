import SiteLayout, { metadata } from "@/views/SiteLayout";
export { metadata };

export default function Layout({ children }: { children: React.ReactNode }) {
  return <SiteLayout language="ru">{children}</SiteLayout>;
}
