import styles from "./SociactShowcase.module.scss";

export function SociactShowcase() {
  return (
    <figure className={styles.showcase} aria-label="Sociact landing page preview">
      <div className={styles.toolbar}>
        <span className={styles.dots} aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className={styles.label}>
          SOCIACT <span>/ Graduation project</span>
        </span>
        <a href="/previews/sociact/index.html" target="_blank" rel="noopener noreferrer">
          Open full preview <span aria-hidden="true">↗</span>
          <span className={styles.srOnly}> (opens in a new tab)</span>
        </a>
      </div>
      <iframe
        className={styles.preview}
        src="/previews/sociact/index.html"
        title="Sociact product landing page: AI content generation, human approval, and social media management"
        loading="lazy"
        sandbox="allow-same-origin"
      />
      <figcaption className={styles.caption}>
        <span>
          Explore the landing page <span aria-hidden="true">↓</span>
        </span>
        <span>Original product visuals · Portfolio preview</span>
      </figcaption>
    </figure>
  );
}
