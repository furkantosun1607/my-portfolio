import { Avatar, Button, Column, Heading, Meta, Row, Schema, SmartLink, Text } from "@once-ui-system/core";
import { baseURL, about, person, home } from "@/resources";
import { Projects } from "@/components/work/Projects";
import styles from "./page.module.scss";

export async function generateMetadata() {
  return Meta.generate({
    title: home.title,
    description: home.description,
    baseURL: baseURL,
    image: home.image,
    path: home.path,
  });
}

export default function Home() {
  return (
    <Column maxWidth="m" fillWidth gap="xl" paddingTop="32">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={home.path}
        title={home.title}
        description={home.description}
        image={home.image}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <section className={styles.hero} aria-labelledby="home-heading">
        <Row gap="16" vertical="center">
          <Avatar src={person.avatar} size="l" />
          <Column gap="4">
            <Text variant="label-strong-l">{person.name}</Text>
            <Text variant="body-default-s" onBackground="neutral-weak">{person.role} · {person.city}</Text>
          </Column>
        </Row>
        <Heading id="home-heading" as="h1" variant="display-strong-l" className={styles.headline}>
          {home.headline}
        </Heading>
        <Text as="p" variant="body-default-l" onBackground="neutral-weak" className={styles.intro}>
          {home.subline}
        </Text>
        <Row wrap gap="12">
          <Button href="/about" suffixIcon="arrowRight" variant="primary">Explore my experience</Button>
          <a className={styles.resume} href={person.resume} download="FurkanTosun.pdf">Download CV <span aria-hidden="true">↗</span></a>
        </Row>
        {home.featured.display && (
          <SmartLink href={home.featured.href} suffixIcon="arrowRight">{home.featured.title}</SmartLink>
        )}
      </section>
      <section aria-labelledby="focus-heading" className={styles.focus}>
        <Text id="focus-heading" as="h2" variant="label-strong-s" onBackground="brand-weak">WHERE I FOCUS</Text>
        <div className={styles.focusGrid}>
          <div><h3>Infrastructure & networks</h3><p>Cisco, VLANs, network access control, Linux, and Azure.</p></div>
          <div><h3>Full-stack development</h3><p>ASP.NET Core, Angular, RESTful APIs, and CI/CD workflows.</p></div>
          <div><h3>AI & automation</h3><p>LangChain, MCP, RAG concepts, Streamlit, and Excel VBA.</p></div>
        </div>
      </section>
      <section aria-labelledby="experience-heading" className={styles.experience}>
        <Row horizontal="between" vertical="center" wrap gap="16">
          <Heading id="experience-heading" as="h2" variant="heading-strong-xl">Recent experience</Heading>
          <SmartLink href="/about#Experience" suffixIcon="arrowRight">Full experience</SmartLink>
        </Row>
        {about.work.experiences.map((experience) => (
          <div className={styles.experienceRow} key={experience.company}>
            <div><h3>{experience.company}</h3><p>{experience.role}</p></div>
            <Text variant="body-default-s" onBackground="neutral-weak">{experience.timeframe}</Text>
          </div>
        ))}
      </section>
      <section aria-labelledby="projects-heading">
        <Row horizontal="between" vertical="center" wrap gap="16" marginBottom="32">
          <Heading id="projects-heading" as="h2" variant="heading-strong-xl">Selected projects</Heading>
          <SmartLink href="/work" suffixIcon="arrowRight">All projects</SmartLink>
        </Row>
        <Projects range={[1, 2]} />
      </section>
      <section className={styles.contact} aria-labelledby="contact-heading">
        <Heading id="contact-heading" as="h2" variant="heading-strong-xl">Let's connect.</Heading>
        <Text as="p" variant="body-default-m" onBackground="neutral-weak">
          Interested in IT infrastructure, network operations, or software development? Get in touch.
        </Text>
        <SmartLink href={`mailto:${person.email}`} suffixIcon="arrowUpRight">{person.email}</SmartLink>
      </section>
    </Column>
  );
}
