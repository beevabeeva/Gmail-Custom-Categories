// List of Gmail addresses this addon should apply to
const ALLOWED_EMAILS = [
  "avibank1@gmail.com",
];

const TABS = {
  "Primary": "category:primary",
  "Github": "label:Github AND is:unread",
  "Notes": "label:notes",
  "asdf": "label:asdf",
  "sadfsadfasd": "label:af",
  "astrqdf": "label:r",
  "gggg": "label:g",
  "avaa": "label:v",
};


function updateActiveTab() {
  const currentURL = window.location.href;

  // Detect reading an email (URL ends with /<long hex id>)
  const bar = document.getElementById("inboxTabs");
  const inThread = /#(?:inbox|search\/[^/]+)\/[A-Za-z0-9._-]{6,}/.test(currentURL);
  if (bar) {
    bar.style.display = inThread ? "none" : "flex";
  }

  Object.keys(TABS).forEach(name => {
    // Find the button by class and text
    const btn = Array.from(document.querySelectorAll(".inboxTab")).find(b => b.textContent.trim().startsWith(name));
    if (!btn) return;

    const query = encodeURIComponent(TABS[name]);
    // Gmail sometimes replaces spaces with + in URL
    const queryAlt = encodeURIComponent(TABS[name]).replace(/%20/g, '+');

    // if (currentURL.includes(`#search/${query}`) || currentURL.includes(`#search/${queryAlt}`)) {
    //   console.log("Selected tab:", name);
    //   btn.style.backgroundColor = "#d2e3fc"; // light blue
    //   btn.style.color = "#1967d2";
    // } else {
    //   btn.style.backgroundColor = "";
    //   btn.style.color = "";
    // }
    // const isActive = currentURL.includes(`#search/${query}`) || currentURL.includes(`#search/${queryAlt}`);
    const isActive =
      name === "Primary"
      ? currentURL.includes("#inbox")
      : currentURL.includes(`#search/${query}`) || currentURL.includes(`#search/${queryAlt}`);

    // toggle bottom bar
    // if (btn.activeBar) btn.activeBar.style.display = isActive ? "block" : "none";
    // btn.style.color = isActive ? "#1967d2" : "";
    btn.classList.toggle("active", isActive);

  });
}


function injectTabs() {
  if (document.getElementById("inboxTabs")) return;

  const bar = document.createElement("div");
  bar.id = "inboxTabs";
  bar.style.display = "flex";
  bar.style.gap = "5px";
  bar.style.margin = "0px 0px";

  const badges = {}; // store badge elements by tab name

  Object.keys(TABS).forEach(name => {
    const btn = document.createElement("button");
    btn.className = "inboxTab";
    btn.style.position = "relative";
    btn.style.display = "inline-flex";
    btn.style.alignItems = "center";
    btn.style.gap = "5px";            
    // btn.textContent = name;

    // Add active indicator bar
    // const activeBar = document.createElement("div");
    // activeBar.className = "activeBar";
    // activeBar.style.position = "absolute";
    // activeBar.style.bottom = "0";
    // activeBar.style.left = "0";
    // activeBar.style.height = "3px"; // thickness of the bar
    // activeBar.style.width = "100%";
    // activeBar.style.backgroundColor = "#1967d2"; // Gmail-style blue
    // activeBar.style.display = "none"; // hidden by default
    // btn.appendChild(activeBar);

    // // store reference for easy updating
    // btn.activeBar = activeBar;


    // Add icon (example: GitHub logo)
  if (name === "Github") {
    const svgNS = "http://www.w3.org/2000/svg";
    const icon = document.createElementNS(svgNS, "svg");
    icon.setAttribute("width", "16");
    icon.setAttribute("height", "16");
    icon.setAttribute("viewBox", "0 0 16 16");
    icon.setAttribute("fill", "currentColor");
    icon.innerHTML = `<path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38
      0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52
      -.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89
      -3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27
      2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15
      0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.19 0 .21.15.46.55.38C13.71
      14.53 16 11.54 16 8c0-4.42-3.58-8-8-8z"/>`;
    // btn.appendChild(icon);
    const textNode = document.createTextNode(name);

    // Append in correct order: icon first, then text
    if (icon) btn.appendChild(icon);
    btn.appendChild(textNode);
  } else{
    btn.textContent = name;
  }

  
    const badge = document.createElement("span");
    badge.className = "tabBadge";
    badge.style.position = "absolute";
    badge.style.top = "-5px";
    badge.style.right = "-10px";
    badge.style.background = "red";
    badge.style.color = "white";
    badge.style.borderRadius = "50%";
    badge.style.padding = "2px 6px";
    badge.style.fontSize = "10px";
    badge.style.fontWeight = "bold";
    badge.style.display = "none"; // hide initially
    btn.appendChild(badge);

    badges[name] = badge;

    btn.onclick = () => {
      const query = TABS[name];
      const match = window.location.href.match(/\/u\/(\d+)\//);
      const accountIndex = match ? parseInt(match[1], 10) : 0;
    //   window.location.href = `https://mail.google.com/mail/u/${accountIndex}/#search/${encodeURIComponent(query)}`;
      if (name === "Primary") {
        // special case → go to inbox
        window.location.href = `https://mail.google.com/mail/u/${accountIndex}/#inbox`;
      } else {
        // normal tabs → go to search
        const query = TABS[name];
        window.location.href = `https://mail.google.com/mail/u/${accountIndex}/#search/${encodeURIComponent(query)}`;
      }
    };

    bar.appendChild(btn);
  });

  const target = document.querySelector("div[gh='tm']");
  if (target) target.parentNode.insertBefore(bar, target);

  // Observe sidebar for label count changes
  const sidebar = document.querySelector("div[role='navigation']");
  if (!sidebar) return;

  const updateBadges = () => {
    Object.keys(TABS).forEach(name => {
      const labelLink = Array.from(sidebar.querySelectorAll("a[href*='#label/']")).find(
        a => a.href.includes(name)
      );
      let count = "0";
      if (labelLink) {
        const countDiv = labelLink.closest(".aio")?.querySelector(".bsU");
        if (countDiv) count = countDiv.textContent || "0";
      }

      if (count === "0" || count === "") {
        badges[name].style.display = "none";
      } else {
        badges[name].textContent = count;
        badges[name].style.display = "inline-block";
      }
    });
    updateActiveTab();
  };

  // Initial update
  updateBadges();

  // Observe the sidebar for changes
  const observer = new MutationObserver(updateBadges);
  observer.observe(sidebar, { childList: true, subtree: true });
}

function waitForGmail() {
  const container = document.querySelector("div[role='main']");
  const metaEmail = document.querySelector("meta[name='og-profile-acct']");

  if (container && metaEmail) {
    const email = metaEmail.getAttribute("content");
    console.log("Detected Gmail account:", email);

    if (!ALLOWED_EMAILS.includes(email)) {
      console.log("Account not allowed. Exiting.");
      return;
    }

    injectTabs();
    updateActiveTab();
    window.addEventListener("hashchange", updateActiveTab);
  } else {
    setTimeout(waitForGmail, 1000);
  }
}

waitForGmail();
