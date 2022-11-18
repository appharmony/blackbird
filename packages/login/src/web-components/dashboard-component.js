import "./widget-wrapper";
import "./cash-in-cash-out";
import "./task-list";
import "./account-summary";

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
  dashboardWidgets = ["task-list", "cash-in-cash-out", "account-summary"];
  constructor() {
    super();
    const template = document.createElement("template");
    template.innerHTML = this.getInnerHTML();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
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
    </style>
    <!-- Dashboard main container -->
    <div class='dashboard-widget' style="background-color: white; color: black; font-size: 14px;">
      <div id="content-container" style="display: flex; flex-direction: column; min-height: 100%; width: 100%;">
        <!-- Columns -->
        <div style="display: flex; flex-direction: row; height: 100%; align-items: flex-start;">    
          <div id="column-0" style="display: flex; flex-direction: column; justify-content: center; align-items: flex-end; width: 50%;">
            <widget-wrapper
              width="400px"
              height="500px"
              title="Cash In & Out"
            >
                <cash-in-cash-out
                slot="children"
                data='[{"month":10,"cashIn":634,"cashOut":800},{"month":8,"cashIn":576,"cashOut":453}]'
              ></cash-in-cash-out>
            </widget-wrapper>
          </div>
          <div id="column-1" style="display: flex; flex-direction: column; justify-content: center; align-items: flex-start; width: 50%;">
            <widget-wrapper
                width="400px"
                height="400px"
                title="Tasks"
            >
              <task-list slot="children"></task-list>
            </widget-wrapper>
            <widget-wrapper
                width="400px"
                height="400px"
                title="Summary"
            >
              <account-summary slot="children"></account-summary>
            </widget-wrapper>
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

customElements.get("dashboard-component") ||
  window.customElements.define("dashboard-component", DashboardComponent);
