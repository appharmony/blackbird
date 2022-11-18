# vengayam

Project to be used inside of Harmony App, based on web components for reusability.

## Current State

![image](https://user-images.githubusercontent.com/58167190/202170588-b3b46023-7868-426a-909e-927ee32de38d.png)

## Components

1. [**DashboardComponent.**](https://github.com/JMRMEDEV/vengayam#dashboardcomponent)
2. [**WidgetWrapper.**](https://github.com/JMRMEDEV/vengayam#widgetwrapper)
3. [**CashInCashOut.**](https://github.com/JMRMEDEV/vengayam#cashincashout)

### DashboardComponent

Main dashboard component. Made to display all the components that we want to embed. When you hover over the current dashboard section, change the style of it. Includes a Navbar with PST time. It can has two columns.

For using it, you just have two set children and reference the corresponding column **`slot`**, like this:

```
<dashboard-component>
  <h2 slot="column-0">Example</h2>
  <h2 slot="column-1">Example</h2>
</dashboard-component>
```

If you are intending to use a custom component inside of it, you have to append your **component script path** at the end of:

https://github.com/JMRMEDEV/vengayam/blob/cb042d39fa795ad77d4b0006acd3dd2366327030/dashboard-component.js#L35

**TODO:**

1. Add icon to dashboard section.

### WidgetWrapper

Component to wrap the widgets to be used within the dashboard. It includes an attribute for a title, a shadow and attributes for dimensions.

For using it, you just  have to set children and reference children **`slot`** like this (you can set `width`, `height` and `name`):

```
<widget-wrapper
  width="300px"
  height="500px"
  name="Cash In & Out"
>
 <h2 slot="children">Example</h2>
</widget-wrapper>
```

**TODO:** 

1. Change attribute name from `name` to `title` or maybe `label`.
2. Set functionality to gear icon.

### CashInCashOut

Component that takes a JSON array as an attribute and display month graphics based on it. It can focus a specific month and show the specific quantities related to it. It sets a maximum and average values based on all the passed data for plotting the information.

**TODO:** 

1. Constraint min dimensions to avoid layout messing up.
2. Filter the cash data by `account` (add `account` property to passed data).

**Example usage:**

```
<cash-in-cash-out
  data='[{"month":10,"cashIn":634,"cashOut":800},{"month":8,"cashIn":576,"cashOut":453}]'
></cash-in-cash-out>
```

### Full example usage

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Dashboard</title>
  </head>

  <body>
    <dashboard-component>
      <widget-wrapper
        slot="column-0"
        width="300px"
        height="500px"
        name="Cash In & Out"
      >
        <cash-in-cash-out
          slot="children"
          data='[{"month":10,"cashIn":634,"cashOut":800},{"month":8,"cashIn":576,"cashOut":453}]'
        ></cash-in-cash-out>
      </widget-wrapper>
      <widget-wrapper
        slot="column-1"
        width="300px"
        height="240px"
        name="Cash In & Out 2"
      >
        <cash-in-cash-out slot="children" data="[]"></cash-in-cash-out>
      </widget-wrapper>
      <widget-wrapper
        slot="column-1"
        width="300px"
        height="280px"
        name="Cash In & Out 3"
      >
        <cash-in-cash-out
          slot="children"
          data='[{"month":10,"cashIn":673.2,"cashOut":270.7},{"month":9,"cashIn":576,"cashOut":453}]'
        ></cash-in-cash-out>
      </widget-wrapper>
    </dashboard-component>
    <!-- Scripts -->
    <script src="./dashboard-component.js"></script>
  </body>
</html>

```
