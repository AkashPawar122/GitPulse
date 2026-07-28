"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffext, useMemo, useState } from "react";
import { homeStyles } from "@/public/dummyStyles";

const BG_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4";

const ANALYSIS_STEPS = [
  "Connecting to GitHub profile",
  "Reading contribution calendar",
  "Measuring commit velocity",
  "Scanning pull requests and reviews",
  "Finding top languages",
  "Building your GitWrapped card",
];

// Icon components (unchanged)
function GithubIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="currentColor"
    >
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.29 9.4 7.86 10.92.58.11.79-.25.79-.56v-2.17c-3.2.7-3.88-1.36-3.88-1.36-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.77 2.72 1.26 3.38.96.11-.75.41-1.26.74-1.55-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.06 0 0 .98-.31 3.18 1.18A11.1 11.1 0 0 1 12 5.96c.98 0 1.96.13 2.88.39 2.2-1.49 3.17-1.18 3.17-1.18.64 1.59.24 2.77.12 3.06.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.4-5.27 5.69.42.36.8 1.07.8 2.16v3.18c0 .31.21.67.8.56A11.52 11.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

function TwitterIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="currentColor"
    >
      <path d="M17.7 3h3.2l-7 8 8.2 10h-6.4l-5-6.2L5 21H1.8l7.5-8.6L1.5 3h6.6l4.5 5.6L17.7 3Zm-1.1 16.2h1.8L7.1 4.7H5.2l11.4 14.5Z" />
    </svg>
  );
}

function LinkedinIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="currentColor"
    >
      <path d="M5.1 8.7H1.9V22h3.2V8.7ZM3.5 2A1.9 1.9 0 1 0 3.5 5.8 1.9 1.9 0 0 0 3.5 2Zm7.1 6.7H7.5V22h3.1v-6.6c0-1.7.3-3.4 2.5-3.4 2.1 0 2.1 2 2.1 3.5V22h3.2v-7.3c0-3.6-.8-6.3-4.9-6.3-2 0-3.3 1.1-3.8 2.1h-.1V8.7Z" />
    </svg>
  );
}

function DownloadIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M12 3v11" strokeLinecap="round" />
      <path d="m7 10 5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 21h14" strokeLinecap="round" />
    </svg>
  );
}


export default function Home() {
  const currentYear = new Date().getFullYear();
  const years = useMemo(
    () => Array.from({ length: 6 }, (_, i) => currentYear - i),
    [currentYear],
  );


 const [username, setUsername] = useState("");
  const [selectedYears, setSelectedYears] = useState([currentYear]);
  const [status, setStatus] = useState("idle");
  const [progress, setProgress] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [downloadStatus, setDownloadStatus] = useState("idle");
  const [origin, setOrigin] = useState("");

  
  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  const cleanUsername = username.trim();
  const yearsParam = selectedYears.join(",");
  const yearsLabel =
    selectedYears.length === 1
      ? String(selectedYears[0])
      : [...selectedYears].sort((a, b) => a - b).join(", ");
  const imageUrl = cleanUsername
    ? `/api/wrapped?user=${encodeURIComponent(cleanUsername)}&years=${encodeURIComponent(yearsParam)}`
    : "";
  const shareUrl = origin ? `${origin}${imageUrl}` : "";
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`I built my ${yearsLabel} GitWrapped card for @${cleanUsername}.`)}&url=${encodeURIComponent(shareUrl)}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;

  useEffect(() => {
    if (status !== "loading") return undefined;
    let cancelled = false;

    const progressTimer = setInterval(
      () => setProgress((v) => Math.min(v + 3, 96)),
      115,
    );
    const stepTimer = setInterval(
      () => setStepIndex((v) => Math.min(v + 1, ANALYSIS_STEPS.length - 1)),
      640,
    );
    const minWait = new Promise((r) => setTimeout(r, 2400));
    const cardReady = new Promise((resolve, reject) => {
      const img = new window.Image();
      img.onload = async () => {
        try {
          if (img.decode) await img.decode();
        } catch {}
        resolve();
      };
      img.onerror = async () => {
        try {
          const res = await fetch(imageUrl, { cache: "no-store" });
          const body = await res.json();
          reject(
            new Error(body.error || "Card could not be generated. Try again."),
          );
        } catch (e) {
          reject(
            e instanceof Error
              ? e
              : new Error("Card could not be generated. Try again."),
          );
        }
      };
      img.src = imageUrl;
    });

    Promise.all([minWait, cardReady])
      .then(() => {
        if (!cancelled) {
          setProgress(100);
          setStatus("ready");
        }
      })
      .catch((e) => {
        if (!cancelled) {
          setErrorMessage(
            e.message || "Card could not be generated. Try again.",
          );
          setStatus("error");
        }
      });

    return () => {
      cancelled = true;
      clearInterval(progressTimer);
      clearInterval(stepTimer);
    };
  }, [imageUrl, status]);

}