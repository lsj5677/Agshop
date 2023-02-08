import React from "react";

export default function Footer() {
  return (
    <footer className="sub-wrap md:flex justify-between itmes-center font-serif border-t border-gray-100">
      <p>@2023 COPYRIGHT AGNES</p>
      <span className="inline-block text-xs">
        Photo by{" "}
        <a
          className="border-b border-beige"
          href="https://unsplash.com/@noratopicals?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
        >
          Nora Topicals{" "}
        </a>
        on{" "}
        <a
          className="border-b border-beige"
          href="https://unsplash.com/ko/s/%EC%82%AC%EC%A7%84/%ED%99%94%EC%9E%A5%ED%92%88?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
        >
          Unsplash
        </a>
      </span>
    </footer>
  );
}
