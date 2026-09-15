// Blocking theme init script — runs during HTML parsing, before first paint,
// so there is no light/dark flash. Reads stored preference, falls back to
// the OS "prefers-color-scheme" when none is stored. No dependencies.
export function ThemeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `(function(){try{var t=null;try{t=localStorage.getItem("xplor-theme")}catch(e){}if(t==="dark"||(!t&&window.matchMedia("(prefers-color-scheme:dark)").matches)){document.documentElement.classList.add("dark")}else{document.documentElement.classList.remove("dark")}}catch(e){}})();`,
      }}
    />
  );
}
