import { PublicFrame } from "./layout";
import { PageIntro } from "./brand";
import { DEFAULT_CONTACT_EMAIL } from "@/lib/site-content";

export type LegalKind = "privacy" | "cookies" | "terms";

const titles: Record<LegalKind, string> = {
  privacy: "Privacy, plainly.",
  cookies: "A small note on cookies.",
  terms: "The terms of the relationship.",
};

const content: Record<LegalKind, string[]> = {
  privacy: [
    "We collect the details you choose to share through our contact form, such as your name, email address, business and message. We use them to respond to your enquiry and consider whether we may be a useful partner.",
    "We do not sell personal information. Access is limited to people who need it to operate the studio and respond to you. We retain enquiries only as long as needed for those purposes or to meet legal obligations.",
    "You can ask to access, correct or delete personal information by emailing hello@loopandlift.studio. This policy may be updated as our services change.",
  ],
  cookies: [
    "This website uses essential technologies needed to make the site work. If analytics or additional cookies are enabled, this section will be updated to describe what they do and how you can manage your choices.",
    "You can control cookies through your browser settings. Blocking essential cookies may affect how parts of the site work.",
  ],
  terms: [
    "The content on this website is provided for general information about Loop & Lift Growth Studio. It is not a promise of specific business outcomes or a substitute for advice tailored to your circumstances.",
    "Any concepts shown in our work section are fictional demonstrations. Any data shown there is illustrative, not a client result, forecast or guarantee.",
    "If we work together, the scope, fees, responsibilities and terms for that work will be set out separately in a written agreement. Website content may change without notice.",
  ],
};

export function LegalPage({ kind }: { kind: LegalKind }) {
  return (
    <PublicFrame>
      <main className="page-in legal-page">
        <PageIntro eyebrow="The useful details" title={<>{titles[kind]}</>} text="We believe the important things should be easy to find and easy to understand." marker="STUDIO POLICIES" />
        <article className="legal-content">
          {content[kind].map((p, i) => (
            <section key={i}>
              <span className="mono">0{i + 1}</span>
              <p>{p}</p>
            </section>
          ))}
        </article>
        <div className="legal-contact">
          Questions about any of this? <a href={`mailto:${DEFAULT_CONTACT_EMAIL}`}>Email the studio</a>.
        </div>
      </main>
    </PublicFrame>
  );
}
