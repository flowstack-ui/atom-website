import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@flowstack-ui/brick/badge";
import { Card } from "@flowstack-ui/brick/card";
import { Grid } from "@flowstack-ui/brick/grid";
import { HStack } from "@flowstack-ui/brick/stack";
import { Text } from "@flowstack-ui/brick/text";
import { ArrowRight, Check, ChevronRight, Focus, Hand, Keyboard, Layers3, MousePointer2, Orbit, PackageCheck, ScanLine, ShieldCheck, Sparkles, Volume2 } from "lucide-react";
import { InstallCommand } from "@/components/install-command";
import { InteractionField } from "@/components/interaction-field";
import { FrequentlyAskedQuestions } from "@/components/frequently-asked-questions";
import { StructuredData } from "@/components/structured-data";
import { WebsiteButton as Button } from "@/components/website-button";
import { atomVersion, siteDescription, siteUrl } from "@/lib/site";
import { atomQuestions } from "@/lib/faqs";

export const metadata: Metadata = { alternates: { canonical: "/" } };

const accessModes = [
  { icon: Keyboard, title: "Keyboard", body: "Orientation, roving focus, activation, escape, and typeahead behavior follow the primitive contract." },
  { icon: Hand, title: "Touch", body: "Coarse-pointer targets, gesture intent, dismissal, and mobile focus behavior are designed deliberately." },
  { icon: Volume2, title: "Screen readers", body: "Names, roles, descriptions, relationships, and live state remain part of the public API." },
  { icon: Focus, title: "Focus", body: "Containment, initial focus, return focus, and nested overlays cooperate instead of competing." },
];

const families = [
  { icon: MousePointer2, name: "Actions + input", items: "Button · Field · Input · Slider" },
  { icon: ScanLine, name: "Selection", items: "Checkbox · Select · Listbox" },
  { icon: Layers3, name: "Overlays", items: "Dialog · Drawer · Popover" },
  { icon: Orbit, name: "Navigation", items: "Menu · Tabs · Sidebar" },
  { icon: PackageCheck, name: "Collections", items: "Data Grid · Tree · Virtualizer" },
  { icon: ShieldCheck, name: "Utilities", items: "Portal · Direction · Hidden" },
];

const structuredData = [
  { "@context": "https://schema.org", "@type": "WebSite", name: "Atom UI", url: siteUrl, description: siteDescription, publisher: { "@id": `${siteUrl}/#publisher` } },
  { "@context": "https://schema.org", "@type": "Organization", "@id": `${siteUrl}/#publisher`, name: "Swifty LLC", url: "https://swifty.us/" },
  { "@context": "https://schema.org", "@type": "SoftwareSourceCode", name: "Atom UI", description: siteDescription, codeRepository: "https://github.com/flowstack-ui/atom", programmingLanguage: ["TypeScript", "React"], license: "https://opensource.org/license/mit", version: atomVersion, publisher: { "@id": `${siteUrl}/#publisher` } },
  { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: atomQuestions.map(({ question, answer }) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) },
];

export default function Home() {
  return (
    <>
      <StructuredData data={structuredData} />
      <main id="main-content">
        <section className="home-hero section-shell">
          <div className="home-hero__copy">
            <Badge className="icon-label-badge" tone="accent" variant="soft" shape="pill"><Orbit size={14} aria-hidden="true" /> Atom v{atomVersion}</Badge>
            <Text as="h1" className="hero-title" wrap="balance">Behavior at the <span>smallest useful unit.</span></Text>
            <Text as="p" className="hero-lede" tone="secondary" variant="body-lg" wrap="pretty">Accessible, headless React primitives for keyboard, touch, focus, state, and screen-reader semantics—ready for the visual system only you can design.</Text>
            <HStack className="hero-actions" gap="3" wrap>
              <Button href="/docs/overview/getting-started/" size="lg" endIcon={<ArrowRight size={17} aria-hidden="true" />}>Get started</Button>
              <Button href="/docs/components/" size="lg" tone="neutral" variant="soft">Explore primitives</Button>
            </HStack>
            <InstallCommand />
            <ul className="hero-proof" aria-label="Atom package qualities">
              <li><Badge size="sm" tone="neutral" variant="soft"><Check size={13} aria-hidden="true" /> React 18 + 19</Badge></li>
              <li><Badge size="sm" tone="neutral" variant="soft"><Check size={13} aria-hidden="true" /> Headless</Badge></li>
              <li><Badge size="sm" tone="neutral" variant="soft"><Check size={13} aria-hidden="true" /> MIT licensed</Badge></li>
            </ul>
          </div>
          <InteractionField />
        </section>

        <section className="access-section section-shell" aria-labelledby="access-title">
          <div className="section-heading">
            <Badge tone="accent" variant="soft">One behavior, every input</Badge>
            <Text as="h2" id="access-title" variant="display" wrap="balance">Accessibility is not a layer added later.</Text>
            <Text as="p" variant="body-lg" tone="secondary" wrap="pretty">Atom makes input modality, semantics, state, and focus part of each primitive’s behavioral contract. Your product supplies the visual language without rebuilding the interaction system.</Text>
          </div>
          <Grid.Root columns={4} gap="4" className="access-grid">
            {accessModes.map(({ icon: Icon, title, body }, index) => (
              <Card.Root key={title} variant={index === 2 ? "elevated" : "outline"} className="access-card">
                <Card.Header className="icon-card-header"><span className="feature-icon"><Icon size={20} aria-hidden="true" /></span><Card.Title as="h3">{title}</Card.Title></Card.Header>
                <Card.Content><Text tone="secondary">{body}</Text></Card.Content>
              </Card.Root>
            ))}
          </Grid.Root>
        </section>

        <section className="headless-story section-shell" aria-labelledby="headless-title">
          <div className="headless-story__copy">
            <Badge tone="neutral" variant="outline">Headless by design</Badge>
            <Text as="h2" id="headless-title" variant="display" wrap="balance">The contract stays. The expression is yours.</Text>
            <Text as="p" variant="body-lg" tone="secondary">One accessible anatomy can become a quiet editorial control, a dense application tool, or a completely new brand. Atom carries the behavior without choosing the paint.</Text>
            <Button href="/docs/guides/styling/" tone="neutral" variant="soft" endIcon={<ArrowRight size={16} aria-hidden="true" />}>Style the primitives</Button>
          </div>
          <div className="expression-field" aria-label="The same switch anatomy shown in three visual expressions">
            <div className="expression expression--signal"><span className="expression-label">Signal</span><span className="expression-control"><i /></span><small>data-state=&quot;checked&quot;</small></div>
            <div className="expression expression--minimal"><span className="expression-label">Minimal</span><span className="expression-control"><i /></span><small>same anatomy</small></div>
            <div className="expression expression--system"><span className="expression-label">System</span><span className="expression-control"><i /></span><small>same behavior</small></div>
            <div className="expression-axis" aria-hidden="true"><span /></div>
          </div>
        </section>

        <section className="flowstack-story section-shell" aria-labelledby="flowstack-title">
          <div className="section-heading">
            <Badge tone="accent" variant="soft">The Flowstack foundation</Badge>
            <Text as="h2" id="flowstack-title" variant="display" wrap="balance">A particle becomes a system.</Text>
            <Text as="p" variant="body-lg" tone="secondary">Choose the layer that matches what your product wants to own. Each one points upward without pulling product policy into the foundation.</Text>
          </div>
          <ol className="layer-path">
            <li className="layer-step layer-step--atom"><span className="layer-index">01</span><span className="layer-symbol"><Orbit aria-hidden="true" /></span><div><strong>Atom</strong><small>Behavior, semantics, state, focus, and interaction.</small></div><Link href="/docs/overview/introduction/">Explore Atom <ArrowRight size={14} aria-hidden="true" /></Link></li>
            <li><ChevronRight aria-hidden="true" /></li>
            <li className="layer-step"><span className="layer-index">02</span><span className="layer-symbol"><Layers3 aria-hidden="true" /></span><div><strong>Brick</strong><small>Finished components and a semantic visual contract.</small></div><a href="https://brick-ui.com/">Explore Brick <ArrowRight size={14} aria-hidden="true" /></a></li>
            <li><ChevronRight aria-hidden="true" /></li>
            <li className="layer-step"><span className="layer-index">03</span><span className="layer-symbol"><Sparkles aria-hidden="true" /></span><div><strong>Your product</strong><small>Brand, content, routes, data, workflows, and decisions.</small></div><Link href="/docs/guides/composition/">Compose your product <ArrowRight size={14} aria-hidden="true" /></Link></li>
          </ol>
        </section>

        <section className="family-section section-shell" aria-labelledby="family-title">
          <div className="family-section__copy">
            <Badge tone="neutral" variant="outline">Primitive families</Badge>
            <Text as="h2" id="family-title" variant="display" wrap="balance">Small contracts. Serious interfaces.</Text>
            <Text as="p" variant="body-lg" tone="secondary">From a single press target to navigable data structures and layered application surfaces, Atom keeps behavior composable and explicit.</Text>
            <Button href="/docs/components/" endIcon={<ArrowRight size={16} aria-hidden="true" />}>Browse all primitives</Button>
          </div>
          <div className="family-map">
            {families.map(({ icon: Icon, name, items }) => <Link key={name} href="/docs/components/" className="family-node"><span><Icon size={17} aria-hidden="true" /></span><div><strong>{name}</strong><small>{items}</small></div><ArrowRight size={15} aria-hidden="true" /></Link>)}
            <div className="family-core"><Orbit aria-hidden="true" /><strong>70</strong><span>public subpaths</span></div>
          </div>
        </section>

        <section className="faq-section section-shell" aria-labelledby="faq-title">
          <div className="faq-section__heading"><Badge tone="accent" variant="soft">Common questions</Badge><Text as="h2" id="faq-title" variant="display" wrap="balance">Know where the boundary is before you build.</Text><Text as="p" variant="body-lg" tone="secondary">The shortest answers to the questions that determine whether Atom is the right foundation for your interface.</Text></div>
          <FrequentlyAskedQuestions />
        </section>

        <section className="closing-section section-shell">
          <div><Text as="h2" variant="display" wrap="balance">Start with behavior you do not have to rediscover.</Text><Text as="p" variant="body-lg" tone="secondary">Install Atom, choose a primitive, and make the presentation unmistakably yours.</Text></div>
          <div className="closing-actions"><InstallCommand compact /><Button href="/docs/overview/getting-started/" size="lg" endIcon={<ArrowRight size={17} aria-hidden="true" />}>Read the guide</Button></div>
        </section>
      </main>
    </>
  );
}
