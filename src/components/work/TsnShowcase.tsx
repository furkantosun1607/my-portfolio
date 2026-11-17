"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import { TsnPipelineDemo } from "./TsnPipelineDemo";
import { getFeedIndex, tsnFeedArticles } from "./tsnFeed";
import styles from "./TsnShowcase.module.scss";

export function TsnShowcase() {
  const feedRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const feedId = useId();

  function goToArticle(index: number) {
    const feed = feedRef.current;
    if (!feed) return;
    const next = Math.max(0, Math.min(tsnFeedArticles.length - 1, index));
    feed.scrollTo({
      top: next * feed.clientHeight,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.target !== event.currentTarget) return;
    const destinations: Record<string, number> = {
      ArrowDown: activeIndex + 1,
      PageDown: activeIndex + 1,
      ArrowUp: activeIndex - 1,
      PageUp: activeIndex - 1,
      Home: 0,
      End: tsnFeedArticles.length - 1,
    };
    if (!(event.key in destinations)) return;
    event.preventDefault();
    goToArticle(destinations[event.key]);
  }

  return (
    <section className={styles.showcase} aria-label="TSN Media product preview">
      <figure className={styles.presentation}>
        <header className={styles.topline}>
          <span className={styles.wordmark}>
            TSN<span> / MEDIA</span>
          </span>
          <a
            href="https://github.com/furkantosun1607/tsn-website"
            target="_blank"
            rel="noopener noreferrer"
          >
            Frontend source <span aria-hidden="true">↗</span>
            <span className={styles.srOnly}> (opens in a new tab)</span>
          </a>
        </header>

        <div className={styles.layout}>
          <div className={styles.intro}>
            <span className={styles.eyebrow}>TEMİZ. SADE. NET.</span>
            <p className={styles.headline}>
              Haberleri oku.
              <br />
              <span>Akışta kal.</span>
            </p>
            <p className={styles.description}>
              Bir fotoğraf, bir başlık, kısa bir özet.
              <br />
              Gündemi keşfetmenin daha sade bir yolu.
            </p>
            <div className={styles.instructions}>
              <span className={styles.scrollIcon} aria-hidden="true">
                ↓
              </span>
              <p>
                Haber alanında kaydır.
                <br />
                <span>Telefonda yukarı sürükle; klavyede ↓ veya ↑.</span>
              </p>
            </div>
            <ol className={styles.outline} aria-label="Haber deneyimi">
              <li>
                <span>01</span> Fotoğrafla keşfet
              </li>
              <li>
                <span>02</span> Özeti oku
              </li>
              <li>
                <span>03</span> Sonraki habere geç
              </li>
            </ol>
            <span className={styles.archiveNote}>ARŞİV SEÇKİSİ · 3 HABER</span>
          </div>

          <div className={styles.deviceArea}>
            <div className={styles.device}>
              <div className={styles.feedHeader} aria-hidden="true">
                <strong>
                  TSN<span>.</span>
                </strong>
                <span>Arşiv seçkisi</span>
                <i />
              </div>
              <div
                id={feedId}
                ref={feedRef}
                className={styles.feed}
                role="region"
                aria-roledescription="carousel"
                aria-label="TSN fotoğraflı haber akışı. Üç arşiv haberi arasında dikey kaydırın."
                tabIndex={0}
                onKeyDown={handleKeyDown}
                onScroll={(event) => {
                  const feed = event.currentTarget;
                  setActiveIndex(
                    getFeedIndex(feed.scrollTop, feed.clientHeight, tsnFeedArticles.length),
                  );
                }}
              >
                {tsnFeedArticles.map((article, index) => (
                  <article
                    key={article.id}
                    className={styles.slide}
                    aria-label={`${index + 1} / ${tsnFeedArticles.length}: ${article.title}`}
                    lang="tr"
                  >
                    <img
                      className={styles.photo}
                      src={article.image}
                      alt={article.imageAlt}
                      width={1280}
                      height={article.imageHeight}
                      loading={index === 0 ? "eager" : "lazy"}
                      decoding="async"
                      style={{ objectPosition: article.imagePosition }}
                    />
                    <div className={styles.gradient} aria-hidden="true" />
                    <div className={styles.story}>
                      <span className={styles.category}>{article.category}</span>
                      <h3>{article.title}</h3>
                      <p className={styles.summary}>{article.summary}</p>
                      <div className={styles.metadata}>
                        <time dateTime={article.date}>{article.displayDate}</time>
                        <a
                          href={article.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${article.title} — NASA kaynağını yeni sekmede aç`}
                        >
                          Habere git <span aria-hidden="true">↗</span>
                        </a>
                      </div>
                      <a
                        className={styles.photoCredit}
                        href={article.photoSource}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${article.title} fotoğrafı: ${article.photoCredit} (yeni sekme)`}
                      >
                        Fotoğraf: {article.photoCredit}
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className={styles.feedNavigation}>
              <button
                type="button"
                onClick={() => goToArticle(activeIndex - 1)}
                disabled={activeIndex === 0}
                aria-label="Önceki haber"
                aria-controls={feedId}
              >
                ↑
              </button>
              <div className={styles.dots} aria-label="Haber seçimi">
                {tsnFeedArticles.map((article, index) => (
                  <button
                    key={article.id}
                    type="button"
                    onClick={() => goToArticle(index)}
                    aria-label={`${index + 1}. habere git: ${article.title}`}
                    aria-current={index === activeIndex ? "true" : undefined}
                    aria-controls={feedId}
                  >
                    <span />
                  </button>
                ))}
              </div>
              <output className={styles.counter} aria-live="polite" aria-atomic="true">
                {String(activeIndex + 1).padStart(2, "0")}
                <span> / {String(tsnFeedArticles.length).padStart(2, "0")}</span>
              </output>
              <button
                type="button"
                onClick={() => goToArticle(activeIndex + 1)}
                disabled={activeIndex === tsnFeedArticles.length - 1}
                aria-label="Sonraki haber"
                aria-controls={feedId}
              >
                ↓
              </button>
            </div>
          </div>
        </div>
        <figcaption className={styles.caption}>
          <span>Angular frontendinden uyarlanmış haber deneyimi</span>
          <span>NASA arşiv haberleri · Türkçe kısa özetler</span>
        </figcaption>
      </figure>
      <details className={styles.technical}>
        <summary>
          <span>Behind the feed</span> Explore the agent workflow <span aria-hidden="true">＋</span>
        </summary>
        <div className={styles.technicalContent}>
          <TsnPipelineDemo />
        </div>
      </details>
    </section>
  );
}
