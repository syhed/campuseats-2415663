# Week 1 Reflection

### 1. What is the difference between building a UI imperatively (plain DOM code) and declaratively (React)?
In imperative programming (plain DOM/JS), you manually instruct the browser step-by-step how to update the DOM (e.g., `document.createElement`, `element.appendChild`). In declarative programming (React), you describe what the UI should look like based on state/data, and React automatically updates the DOM to match.

### 2. Why must a component name start with a capital letter?
React uses capital letters to differentiate custom components from standard HTML elements (like `<div>` or `<p>`). Lowercase names are treated as native HTML tags.

### 3. What does a fragment `<>...</>` do, and why not just use a `<div>`?
A React Fragment allows you to group multiple JSX children without adding an extra unnecessary DOM node to the HTML structure, keeping the rendered output clean and styling predictable.

### 4. Name one benefit of splitting the UI into small components.
It improves reusability and maintainability, allowing complex interfaces to be broken down into isolated, predictable, and manageable code units.