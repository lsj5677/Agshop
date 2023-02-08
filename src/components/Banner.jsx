import React from "react";

export default function Banner() {
  return (
    <section className="relative h-96 bg-brown-dark">
      <div className="w-full h-full bg-fixed bg-banner"></div>
      <div className="absolute w-full top-1/2 -translate-y-1/2 text-center text-beige">
        <h2 className="text-3xl">Agneshop</h2>
        <p>This is Agneshop from Korea</p>
        <span className="inline-block mt-4 text-xs">
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
      </div>
    </section>
  );
}
