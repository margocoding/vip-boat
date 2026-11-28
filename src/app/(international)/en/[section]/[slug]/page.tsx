import Detail, { detailMetadata, generateStaticParams, type DetailProps } from "@/views/Detail";
export { generateStaticParams };

export function generateMetadata({ params }: DetailProps) {
  return detailMetadata("en", params);
}

export default function Page(props: DetailProps) {
  return <Detail language="en" {...props} />;
}
