import {useEffect} from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Translate from '@docusaurus/Translate';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';

const LOCALE_KEY = 'dcr-locale';

function redirectToLocale(locales, defaultLocale) {
  if (typeof window === 'undefined') return;
  if (window.location.pathname !== '/') return;
  if (localStorage.getItem(LOCALE_KEY)) return;
  const lang = navigator.language?.split('-')[0] || '';
  const match = locales.find((l) => l === lang);
  if (match && match !== defaultLocale) {
    localStorage.setItem(LOCALE_KEY, match);
    window.location.replace(`/${match}/`);
  }
}

const features = [
  {
    title: <Translate>No Boilerplate</Translate>,
    description: (
      <Translate>
        One config file, predictable structure. Get started in seconds with a single command.
      </Translate>
    ),
  },
  {
    title: <Translate>Cargo-like Workflow</Translate>,
    description: (
      <Translate>
        Familiar commands — build, run, clean, test, add. If you know Cargo, you already know DCR.
      </Translate>
    ),
  },
  {
    title: <Translate>Cross-compilation</Translate>,
    description: (
      <Translate>
        Full target triple support with short names. Build for Linux, macOS, Windows, and more.
      </Translate>
    ),
  },
  {
    title: <Translate>IDE Integration</Translate>,
    description: (
      <Translate>
        VS Code, CLion, compile_commands.json generation out of the box.
      </Translate>
    ),
  },
  {
    title: <Translate>Dependency Management</Translate>,
    description: (
      <Translate>
        Path, git, and registry-based dependencies with lock file support.
      </Translate>
    ),
  },
  {
    title: <Translate>Built for C/C++</Translate>,
    description: (
      <Translate>
        Native support for C and C++ with configurable standards and compilers.
      </Translate>
    ),
  },
];

function Hero() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={styles.hero}>
      <div className={styles.heroInner}>
        <div className={styles.heroLogo}>
          <img src="/img/logo.svg" alt="DCR Logo" width={120} height={120} />
        </div>
        <Heading as="h1" className={styles.heroTitle}>
          {siteConfig.title}
        </Heading>
        <p className={styles.heroSubtitle}>
          <Translate>A Cargo-style build tool for C/C++ projects</Translate>
        </p>
        <div className={styles.buttons}>
          <Link className={styles.buttonPrimary} to="/docs/getting-started/installation">
            <Translate>Get Started</Translate>
          </Link>
          <Link className={styles.buttonSecondary} to="/docs/">
            <Translate>View Docs</Translate>
          </Link>
        </div>
      </div>
    </header>
  );
}

function Features() {
  return (
    <section className={styles.features}>
      <div className={styles.featuresGrid}>
        {features.map((f, i) => (
          <div key={i} className={styles.featureCard}>
            <Heading as="h3">{f.title}</Heading>
            <p>{f.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  const {locales, defaultLocale} = siteConfig.i18n;
  useEffect(() => { redirectToLocale(locales, defaultLocale); }, []);
  return (
    <Layout
      title={siteConfig.title}
      description="A Cargo-style build tool for C/C++ projects">
      <Hero />
      <main>
        <Features />
      </main>
    </Layout>
  );
}
