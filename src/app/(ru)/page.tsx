import Home, { homeMetadata } from "@/views/Home";

export const metadata = homeMetadata("ru");

export default function Page() {
  return <Home language="ru" />;
}
