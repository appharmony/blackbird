class DataTable extends HTMLElement {

  constructor() {
    super();

    if(this.hasAttribute('src')) this.src = this.getAttribute('src');

    // attributes to do, datakey 
    if(this.hasAttribute('cols')) this.cols = this.getAttribute('cols').split(',');

    this.pageSize = 5;
    if(this.hasAttribute('pagesize')) this.pageSize = this.getAttribute('pagesize');

    // helper values for sorting and paging
    this.sortAsc = false;
    this.curPage = 1;

    const shadow = this.attachShadow({ mode: 'open'});

    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');
    table.append(thead, tbody);

    const nav = document.createElement('div');
    const prevButton = document.createElement('button');
    prevButton.innerHTML = 'Previous';
    const nextButton = document.createElement('button');
    nextButton.style = `margin-left: 10px`;
    nextButton.innerHTML = 'Next';
    nav.append(prevButton, nextButton);

    shadow.append(table,nav);

    const style = document.createElement('style');
    style.textContent = `
      table { 
          border-collapse: collapse;
      }
      
      td, th {
          padding: 5px;
          border: 1px solid black;
      }
      
      th {
          cursor: pointer;
      }
      
      div {
          padding-top: 10px;
      }
    `;
        
    // Attach the created elements to the shadow dom
    shadow.appendChild(style);

    this.sort = this.sort.bind(this);

    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);

    nextButton.addEventListener('click', this.nextPage, false);
    prevButton.addEventListener('click', this.previousPage, false);
  }

  async load() {
    let result = await fetch(this.src);
    this.data = await result.json();
    this.data && this.render();
  }

  nextPage() {
    if((this.curPage * this.pageSize) < this.data.length) this.curPage++;
    this.renderBody();
  }

  previousPage() {
    if(this.curPage > 1) this.curPage--;
    this.renderBody();
  }

  render() {
    if(!this.cols) this.cols = Object.keys(this.data[0]);
      this.renderHeader();
      this.renderBody();
  }

  renderBody() {
    let result = '';
    this.data.filter((row, index) => {
      let start = (this.curPage-1)*this.pageSize;
      let end =this.curPage*this.pageSize;
      if(index >= start && index < end) return true;
    }).forEach(c => {
      let r = '<tr>';
      this.cols.forEach(col => {
        r += `<td>${c[col]}</td>`;
      });
      r += '</tr>';
      result += r;
    });

    let tbody = this.shadowRoot.querySelector('tbody');
    tbody.innerHTML = result;
  }

  renderHeader() {
    let header = '<tr>';
    this.cols.map(col => {
      header += `<th data-sort="${col}">${col} <img data-sort="${col}" src="./sortIcon.png" style="height:16px;width:16px"/></th>`;
    });
    let thead = this.shadowRoot?.querySelector('thead');
    thead.innerHTML = header;

    this.shadowRoot.querySelectorAll('thead tr th img').forEach(t => {
      t.addEventListener('click', this.sort, false);
    });
  }

  async sort(e) {
    let thisSort = e.target.dataset.sort;

    if(this.sortCol && this.sortCol === thisSort) this.sortAsc = !this.sortAsc;
    this.sortCol = thisSort;
    this.data.sort((a, b) => {
      if(a[this.sortCol] < b[this.sortCol]) return this.sortAsc?1:-1;
      if(a[this.sortCol] > b[this.sortCol]) return this.sortAsc?-1:1;
      return 0;
    });
    this.renderBody();  
  }

  static get observedAttributes() { return ['src', 'cols']; }

  attributeChangedCallback(name, oldValue, newValue) {
    // even though we only listen to src, be sure
    if(name === 'src') {
      this.src = newValue;
      this.load();
    }
    if(name === 'cols') {
      this.cols = newValue.split(',')
    }
  }
}

// Define the new element
customElements.get('data-table') || window.customElements.define("data-table", DataTable);