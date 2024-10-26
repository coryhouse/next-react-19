"use client";

import React, { useEffect, useRef } from "react";

class CustomButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.shadowRoot!.innerHTML = `
      <style>
        button {
          background-color: #3b82f6;
          color: white;
          font-weight: bold;
          padding: 0.5rem 1rem;
          border-radius: 0.25rem;
          border: none;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        button:hover {
          background-color: #2563eb;
        }
      </style>
      <button>
        <slot></slot>
      </button>
    `;
  }
}

if (!customElements.get("custom-button")) {
  customElements.define("custom-button", CustomButton);
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "custom-button": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}

export function CustomButtonWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (ref.current && !customElements.get("custom-button")) {
      customElements.define("custom-button", CustomButton);
    }
  }, []);

  return <custom-button ref={ref}>{children}</custom-button>;
}
