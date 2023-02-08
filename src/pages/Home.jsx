import React, { useRef } from "react";
import BannerCard from "../components/BannerCard";

export default function Home() {
  const scrollRef = useRef();
  return (
    <main>
      <section className="sub-wrap" ref={scrollRef}>
        <BannerCard
          title="Nora Product #01"
          desc="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempore nemo atque obcaecati, aperiam distinctio non. Aperiam porro vitae architecto eius."
          image="banner"
          link="/shop"
        />
        <BannerCard
          title="Nora Product #02"
          desc="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempore nemo atque obcaecati, aperiam distinctio non. Aperiam porro vitae architecto eius."
          image="banner2"
          link="/shop"
          rightCard
        />
        <BannerCard
          title="Nora Product #03"
          desc="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempore nemo atque obcaecati, aperiam distinctio non. Aperiam porro vitae architecto eius."
          image="banner3"
          link="/shop"
        />
        <BannerCard
          title="Nora Product #04"
          desc="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempore nemo atque obcaecati, aperiam distinctio non. Aperiam porro vitae architecto eius."
          image="banner4"
          link="/shop"
          rightCard
        />
      </section>
    </main>
  );
}
