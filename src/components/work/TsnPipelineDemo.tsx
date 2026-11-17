"use client";

import { useId, useState } from "react";
import { evaluateTsnSample, tsnSamples } from "./tsnDemo";
import styles from "./TsnPipelineDemo.module.scss";

export function TsnPipelineDemo() {
  const [sampleIndex, setSampleIndex] = useState(0);
  const [threshold, setThreshold] = useState(50);
  const thresholdId = useId();
  const sample = tsnSamples[sampleIndex];
  const result = evaluateTsnSample(sample, threshold);
  const approved = result.status === "approved";
  const invalid = result.status === "invalid";
  const stages = [
    { name: "Validate", state: invalid ? "rejected" : "passed" },
    { name: "Browser", state: invalid ? "skipped" : "optional" },
    { name: "Score", state: invalid ? "skipped" : approved ? "passed" : "rejected" },
    { name: "Brief", state: approved ? "passed" : "skipped" },
    { name: "Personalize", state: approved ? "passed" : "skipped" },
  ];

  return (
    <figure className={styles.showcase} aria-label="TSN Agentic interactive architecture preview">
      <header className={styles.topline}>
        <div className={styles.brand}>
          TSN<span> / AGENTIC</span>
        </div>
        <a
          href="https://github.com/furkantosun1607/tsn-agentic"
          target="_blank"
          rel="noopener noreferrer"
        >
          View source <span aria-hidden="true">↗</span>
          <span className={styles.srOnly}> (opens in a new tab)</span>
        </a>
      </header>

      <div className={styles.main}>
        <div className={styles.intro}>
          <span className={styles.eyebrow}>TEMİZ. SADE. NET.</span>
          <p className={styles.headline}>
            Less noise.
            <br />
            <span>More signal.</span>
          </p>
          <p className={styles.description}>
            An agent workflow that turns incoming articles into concise, categorized briefs.
          </p>
          <div className={styles.threshold}>
            <label htmlFor={thresholdId}>
              Quality threshold{" "}
              <output htmlFor={thresholdId}>
                {threshold}
                <span>/100</span>
              </output>
            </label>
            <input
              id={thresholdId}
              type="range"
              min={1}
              max={100}
              value={threshold}
              onChange={(event) => setThreshold(Number(event.target.value))}
              aria-valuetext={`${threshold} out of 100`}
            />
            <p>Move the gate to see how the route changes.</p>
          </div>
        </div>

        <div className={styles.article} data-status={result.status}>
          <div className={styles.articleTop}>
            <span>ILLUSTRATIVE ARTICLE</span>
            <span>01 / EDITORIAL DESK</span>
          </div>
          <p className={styles.articleTitle}>{sample.title}</p>
          <div className={styles.scoreline}>
            <span>Predefined sample score</span>
            <strong>
              {result.score === null ? "—" : result.score}
              <span> / 100</span>
            </strong>
          </div>
          <div className={styles.meter} aria-hidden="true">
            <span style={{ width: `${result.score || 0}%` }} />
          </div>
          <p className={styles.status} role="status" aria-live="polite">
            <span aria-hidden="true">{approved ? "✓" : invalid ? "!" : "↳"}</span>
            {result.label}
          </p>
          {approved ? (
            <>
              <div className={styles.categories}>
                {sample.categories.map((category) => (
                  <span key={category}>{category}</span>
                ))}
              </div>
              <ul className={styles.summary}>
                {sample.summary.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
              <div className={styles.tags}>
                <span>FOR</span>
                {sample.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </>
          ) : (
            <div className={styles.rejected}>
              <p>
                {invalid
                  ? "The input is shorter than 50 characters. The workflow stops before calling a model."
                  : `A score of ${result.score} does not meet the current threshold of ${threshold}.`}
              </p>
              <span>
                {invalid ? "Input check → Discard → Log result" : "Score → Discard → Log result"}
              </span>
              <p>Briefing, media, and personalization stages are skipped.</p>
            </div>
          )}
        </div>
      </div>

      <fieldset className={styles.scenarios}>
        <legend>TRY AN INPUT</legend>
        {tsnSamples.map((item, index) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={index === sampleIndex}
            onClick={() => setSampleIndex(index)}
          >
            {item.label}
          </button>
        ))}
      </fieldset>
      <ol className={styles.pipeline} aria-label="Simplified pipeline route">
        {stages.map((stage, index) => (
          <li key={stage.name} data-state={stage.state}>
            <span className={styles.stageNumber}>{String(index + 1).padStart(2, "0")}</span>
            <span>{stage.name}</span>
            <small>{stage.state === "optional" ? "opt-in" : stage.state}</small>
          </li>
        ))}
      </ol>
      <figcaption className={styles.caption}>
        <span>Interactive architecture demo · prewritten examples, no AI requests</span>
        <span>Title-to-audio: opt-in · Video: planned</span>
      </figcaption>
    </figure>
  );
}
