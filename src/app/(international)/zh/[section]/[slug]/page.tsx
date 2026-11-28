import Detail, { detailMetadata, generateStaticParams, type DetailProps } from "@/views/Detail";
export { generateStaticParams };
export const dynamicParams = false;

export function generateMetadata({ params }: DetailProps) {
  return detailMetadata("zh", params);
}

export default function Page(props: DetailProps) {
  return <Detail language="zh" {...props} />;
}
