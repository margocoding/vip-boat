import Section, { sectionMetadata, type SectionProps } from "@/views/Section";

export function generateMetadata({ params }: Pick<SectionProps, "params">) {
  return sectionMetadata("en", params);
}

export default function Page(props: SectionProps) {
  return <Section language="en" {...props} />;
}
