<section id="about-wrapper">
  <section>
    <div>
      I am a design engineer. I do a little bit of everything but my strongest
      skills are within frontend development.
    </div>
    <div>
      Technology specific experience includes: NextJS, React, Svelte, (Framer)
      Motion, GSAP, Cloudflare offerings, Typescript, Angular, Python and Node /
      Backend JS.
    </div>
    <a href="mailto:liamtsang@gmail.com" target="_blank">liamtsang@gmail.com</a>
    <a href="https://www.linkedin.com/in/liamtft/" target="_blank">LinkedIn</a>
    <a href="https://x.com/glitchearth" target="_blank">Twitter</a>
  </section>
  <section>
    <div>
      In 2024 I graduated from the NYU Tandon School of Engineering with a major
      in <a
        href="https://engineering.nyu.edu/academics/programs/integrated-design-media-bs"
        >Integrated Design & Media.</a
      >
    </div>
    <div>
      I interned at startups <a href="https://launchgravity.com/">Gravity</a>
      and <a href="https://churnzero.com/">Churnzero</a> during college, as well
      as working as a server at restaurant
      <a href="https://www.albidc.com/">Albi</a>.
    </div>
    <div>
      I taught grade school students web development, Python and game
      programming through <a href="https://www.codewizardshq.com/"
        >CodeWizards</a
      > after graduation before focusing full time on my freelance work.
    </div>
  </section>
  <section>
    <div>
      I am based in <a
        href="https://www.google.com/maps/place/kensington+brooklyn/data=!4m2!3m1!1s0x89c25b2da71b8663:0x1fa9577069e9292e?sa=X&ved=1t:155783&ictx=111"
        >Kensington, Brooklyn</a
      > and love it.
    </div>
    <div>
      I love hard dance music, minimal/experimental techno and ambient music. I
      love cooking stir fries and deep frying at home.
    </div>
    <div>
      I played Ultimate Frisbee at a competitive level from high school through
      college. I am currently trying to get better at basketball.
    </div>
  </section>
</section>

<style>
  #about-wrapper {
    display: grid;
  }
  @media (min-width: 0px) {
    #about-wrapper {
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }
  }
  @media (min-width: 576px) {
    #about-wrapper {
      grid-template-columns: 1fr 1fr 1fr;
      gap: 2rem;
    }
  }
  #about-wrapper section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  #about-wrapper section div {
    line-height: 1.2rem;
    text-wrap: balance;
    font-weight: 300;
  }
  a {
    color: inherit;
  }
</style>
