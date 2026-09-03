"use client";

import { LogIn, Gift } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { DEVELOPERS } from "./configs/data";

type GithubProfile = {
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  html_url: string;
};

function DevelopersSection() {
  const [developers, setDevelopers] = useState<GithubProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function fetchDevelopers() {
      try {
        const results = await Promise.all(
          DEVELOPERS.map(async (username) => {
            const res = await fetch(`https://api.github.com/users/${username}`);
            if (!res.ok) {
              throw new Error(`Failed to fetch GitHub profile for ${username}`);
            }
            return (await res.json()) as GithubProfile;
          }),
        );

        if (!cancelled) {
          setDevelopers(results);
        }
      } catch (err) {
        console.error(err);
        if (!cancelled) setHasError(true);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    fetchDevelopers();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className={styles.developersSection}>
      <div className={styles.developersHeaderRow}>
        <span className={styles.dot} />
        <span className={styles.eyebrow}>Developers</span>
      </div>

      <h2 className={styles.developersTitle}>Built by</h2>
      <p className={styles.developersSubtitle}>
        Three Developers behind a small project is interesting!.
      </p>

      {isLoading && <p className={styles.statusText}>Loading developers…</p>}
      {hasError && !isLoading && (
        <p className={styles.statusText}>
          Couldn&apos;t load developer profiles right now.
        </p>
      )}

      {!isLoading && !hasError && (
        <div className={styles.developersBar}>
          {developers.map((dev) => (
            <a
              key={dev.login}
              href={dev.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.devCard}
            >
              <img
                src={dev.avatar_url}
                alt={dev.name ?? dev.login}
                className={styles.devAvatar}
              />
              <div className={styles.devInfo}>
                <span className={styles.devName}>{dev.name ?? dev.login}</span>
                <span className={styles.devUsername}>@{dev.login}</span>
              </div>
            </a>
          ))}
        </div>
      )}
    </section>
  );
}

export default function ActorSection() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroGrid}>
          <div>
            <div className={styles.eyebrowRow}>
              <span className={styles.dot} />
              <span className={styles.eyebrow}>
                Automatic Footprinting Tool
              </span>
            </div>

            <h1 className={styles.heading}>
              Scarlet,{" "}
              <span className={styles.headingMuted}>
                A Simple Footprinting Tool.
              </span>
            </h1>

            <p className={styles.subheading}>
              Project Scarlet gives beginners a minimalistic, modular
              footprinting toolkit to explore and learn about footprinting
              basics
            </p>

            <div className={styles.actions}>
              <a href="/modules/full" className={styles.primaryButton}>
                <LogIn size={15} strokeWidth={2} />
                Quickstart
              </a>

              <a
                href="https://github.com/ittzspsv/Scarlet"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.secondaryButton}
              >
                <Gift size={15} strokeWidth={2} />
                Source code
              </a>
            </div>
          </div>

          <div className={styles.imageWrapper}>
            <div className={styles.imageCircle}>
              <Image
                src="/Icon.jpg"
                alt="Project Scarlet"
                width={288}
                loading="eager"
                height={288}
                className={styles.image}
              />
            </div>
          </div>
        </div>
      </section>

      <DevelopersSection />
    </>
  );
}
