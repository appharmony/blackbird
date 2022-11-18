/**
 * Function that appends other scripts to current one, allowing us to isolate
 * each component in separate files but using them as needed.
 * @param {*} url
 */
const loadScript = (url) => {
  var head = document.getElementsByTagName("head")[0];
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = url;
  head.appendChild(script);
};

const colors = {
  svbBlue: {
    darker: "#10466a",
    dark: "#1164a8",
    medium: "#2b70b6",
    mediumLighter: "#3f80bd",
    light: "#6fc0ec",
  },
  gray: {
    light: "#fafafa",
    darker: "#e0e0e0",
    dark: "#6d6e6d",
  },
};

class DashboardComponent extends HTMLElement {
  constructor() {
    super();
    const template = document.createElement("template");
    template.innerHTML = this.getInnerHTML();
    // Load widgets' scripts
    loadScript("widgets/widget-wrapper.js");
    loadScript("widgets/cash-in-cash-out.js");
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    const col0Nodes = this.shadowRoot.getElementById("column-0").querySelector("slot").assignedNodes();
    const col1Nodes = this.shadowRoot.getElementById("column-1").querySelector("slot").assignedNodes();
    // Verify if the slots got something inside of them, otherwise pupulate with nothing
    // instead of showing fallback message
    if (col0Nodes.length === 0) {
      const col0Container = this.shadowRoot.getElementById("column-0");
      col0Container.innerHTML = null;
    }
    if (col1Nodes.length === 0) {
      const col1Container = this.shadowRoot.getElementById("column-1");
      col1Container.innerHTML = null;
    }
  }

  /**
   * Function meant to isolate the HTML template from the constructor, for
   * terms of order and structure.
   * @returns
   */
  getInnerHTML() {
    return /*html*/ `
    <style>
      .dashboard-section:hover {
        font-weight: bold;
        cursor: pointer;
        background-color: ${colors.svbBlue.mediumLighter};
      }
      .column-container {
        
      }
    </style>
    <!-- Dashboard main container -->
    <div className='dashboard-widget' style="display: flex; flex-direction: row; min-width: 100vh; min-height: 100vh; margin: -8px;">
      <!-- Left panel -->
      <div style="display: flex; flex-direction: column; min-height: 100vh; width: 10%; background-color: ${
        colors.svbBlue.medium
      };">
        <div class="dashboard-section" style="color: white; display: flex; justify-content: center; align-items: center; height: 70px; width: 100%; border-style: none none none solid; border-width: 2px; border-color: white; margin-top: 20px;">
          Dashboard
        </div>
      </div>
      <!-- Rest of the content that is not the panel -->
      <div id="content-container" style="display: flex; flex-direction: column; min-height: 100vh; width: 90%;">
        <!-- Navbar -->
        <div style="width: 100%; min-height: 10%; background-color: ${
          colors.svbBlue.darker
        };">
          <div style="padding: 20px 0px 20px 20px;">
            <h1 style="color: white; font-size: 16px;">Welcome to Vengayam</h1>
            <p style="color: white;">
              ${new Date().toLocaleString("en-US", {
                timeZone: "PST",
              })}
            </p>
          </div>
        </div>
        <!-- Columns -->
        <div style="display: flex; flex-direction: row; height: 90%; align-items: flex-start;">    
          <div id="column-0" style="display: flex; flex-direction: column; justify-content: center; align-items: center; width: 50%;">
            <slot name="column-0">Column 0 children</slot>
          </div>
          <div id="column-1" style="display: flex; flex-direction: column; justify-content: center; align-items: center; width: 50%;">
            <slot name="column-1">Column 1 children</slot>
          </div>
        </div>
      </div> 
    </div>`;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.getElementsByClassName("dashboard-component");
  }
}

window.customElements.define("dashboard-component", DashboardComponent);
