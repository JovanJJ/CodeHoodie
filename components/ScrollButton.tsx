"use client";

import React from "react";

interface ScrollButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  targetId: string;
}

export default function ScrollButton({ targetId, children, className, ...props }: ScrollButtonProps) {
  const scroll = () => {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <button onClick={scroll} className={className} {...props}>
      {children}
    </button>
  );
}
