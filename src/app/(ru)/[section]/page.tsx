import Section, { sectionMetadata, sectionParams, type SectionProps } from "@/views/Section";

export const dynamicParams = false;

export function generateStaticParams() {
  return sectionParams("ru");
}

export function generateMetadata({ params }: Pick<SectionProps, "params">) {
  return sectionMetadata("ru", params);
}

export default function Page(props: SectionProps) {
  return <Section language="ru" {...props} />;
}
