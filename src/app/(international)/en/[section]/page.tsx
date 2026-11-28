import Section, { sectionMetadata, sectionParams, type SectionProps } from "@/views/Section";

export const dynamicParams = false;

export function generateStaticParams() {
  return sectionParams("en");
}

export function generateMetadata({ params }: Pick<SectionProps, "params">) {
  return sectionMetadata("en", params);
}

export default function Page(props: SectionProps) {
  return <Section language="en" {...props} />;
}
