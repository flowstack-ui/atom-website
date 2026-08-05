"use client";

import { Accordion } from "@flowstack-ui/brick/accordion";
import { atomQuestions } from "@/lib/faqs";

export function FrequentlyAskedQuestions() {
  return (
    <Accordion.Root className="faq-list" defaultValue="styles" variant="outline">
      {atomQuestions.map(({ question, answer }, index) => (
        <Accordion.Item key={question} value={index === 0 ? "styles" : `question-${index}`}>
          <Accordion.Header>
            <Accordion.Trigger>{question}<Accordion.Indicator /></Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content><Accordion.ContentInner><p>{answer}</p></Accordion.ContentInner></Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
