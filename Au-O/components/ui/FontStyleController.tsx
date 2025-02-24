import ThemedText from './ThemedText';

export default function FontStyleController({ text }: { text: string }) {
  const sections = text.split(/(\*\*\*[^*]+\*\*\*|\*\*[^*]+\*\*|\*[^*]+\*)/).filter(Boolean);
  return (
    <ThemedText>
      {sections.map((section, index) => {
        if (/^\*\*\*.*\*\*\*$/.test(section)) {
          return (
            <ThemedText key={index} style={{ fontWeight: 'bold', fontStyle: 'italic' }}>
              {section.slice(3, -3)}
            </ThemedText>
          );
        } else if (/^\*\*.*\*\*$/.test(section)) {
          return (
            <ThemedText key={index} style={{ fontWeight: 'bold' }}>
              {section.slice(2, -2)}
            </ThemedText>
          );
        } else if (/^\*.*\*$/.test(section)) {
          return (
            <ThemedText key={index} style={{ fontStyle: 'italic' }}>
              {section.slice(1, -1)}
            </ThemedText>
          );
        }
        return <ThemedText key={index}>{section}</ThemedText>;
      })}
    </ThemedText>
  );
}
