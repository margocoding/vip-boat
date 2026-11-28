import Detail, { detailMetadata, generateStaticParams, type DetailProps } from "@/views/Detail";
export { generateStaticParams };

export function generateMetadata({ params }: DetailProps) {
  return detailMetadata("ru", params);
}

export default function Page(props: DetailProps) {
  return <Detail language="ru" {...props} />;
}
