import { useState } from "react";

const content = [
  {
    summary: "React is a library for building UIs",
    details:
      "Dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    summary: "State management is like giving state a home",
    details:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    summary: "We can think of props as the component API",
    details:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
];

export default function App() {
  return (
    <div>
      <Tabbed content={content} />
    </div>
  );
}

function Tabbed({ content }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <div className="tabs">
        <Tab num={0} activeTab={activeTab} onClick={setActiveTab} />
        <Tab num={1} activeTab={activeTab} onClick={setActiveTab} />
        <Tab num={2} activeTab={activeTab} onClick={setActiveTab} />
        <Tab num={3} activeTab={activeTab} onClick={setActiveTab} />
      </div>

      {activeTab <= 2 ? (
        <TabContent
          item={content.at(activeTab)}
          key={content.at(activeTab).summary}
        />
      ) : (
        <DifferentContent />
      )}
    </div>
  );
}

function Tab({ num, activeTab, onClick }) {
  return (
    <button
      className={activeTab === num ? "tab active" : "tab"}
      onClick={() => onClick(num)}
    >
      Tab {num + 1}
    </button>
  );
}

function TabContent({ item }) {
  const [showDetails, setShowDetails] = useState(true);
  const [likes, setLikes] = useState(0);

  console.log("RENDER");
  //because of batching we only see one RENDER on the screen

  function handleInc() {
    setLikes((likes) => likes + 1);
  }

  function handleTripleInc() {
    // setLikes(likes + 1);
    // setLikes(likes + 1);
    // setLikes(likes + 1);
    setLikes((likes) => likes + 1);
    setLikes((likes) => likes + 1);
    setLikes((likes) => likes + 1);
  }

  function handleUndo() {
    setShowDetails(true);
    console.log(likes);
    //state is only updated after the re-rendering so in this console log we get the old state
  }

  function handleUndoLater() {
    setTimeout(handleUndo, 2000);
  }

  return (
    <div className="tab-content">
      <h4>{item.summary}</h4>
      {showDetails && <p>{item.details}</p>}

      <div className="tab-actions">
        <button onClick={() => setShowDetails((h) => !h)}>
          {showDetails ? "Hide" : "Show"} details
        </button>

        <div className="hearts-counter">
          <span>{likes} ❤️</span>
          <button onClick={handleInc}>+</button>
          <button onClick={handleTripleInc}>+++</button>
        </div>
      </div>

      <div className="tab-undo">
        <button onClick={handleUndo}>Undo</button>
        <button onClick={handleUndoLater}>Undo in 2s</button>
      </div>
    </div>
  );
}

function DifferentContent() {
  return (
    <div className="tab-content">
      <h4>I'm a DIFFERENT tab, so I reset state 💣💥</h4>
    </div>
  );
}

//component
//Description of a piece of UI
//A component is a function that returns react elements(element tree), usually written as JSX
//Bluepring or Template
//instances are created when we use components
//In this code we have 3 instances of Tab
//instance is actual physical manifestation of a component
//It has its own state and props and has a lifecycle(can be born,live, and die)
//and it rueturns react element!
//JSX is converted to React.createElement() function class
//A React element is the result of these function calls
//Information necessary to create DOM elements
//so this react element inserted to dom and eventually becomes DOM element(HTML)
//this dom element is the actual visual representation of the component instance in the browser

//render is trigger(by updating state) -> render phase(react calls component functions and figures out how DOM show be updated) -> commit phase(React actually writes to the DOM,updating, inserting, and deleting elements)-> borwser paint
//two situations that trigger renders: 1.initial render of the applicaiton 2. state isupdated in one or more component instances(re-render). The render process is triggered for the entire application
//renders are not triggered immediately, but scheduled for when the JS engine has some free time. There is also batching of multiple setState calls in event handlers

//virtual DOM : tree of all react elements created from all instances in the component tree.
//rendering a component will cause all of its child components to be rendered as well(no matter if props changed or not) this does not mean that the entire DOM is updated. It's just a virtual DOM that will be recreated.
//why not update the entire DOM whenver state changes somewhere in the app?
//1. writing to the DOM is slow 2. usually only a small part of the DOM needs to be updated
//basically react reuses as much of the existing DOM as possible. HOW? by reconciliation. it decides which DOM elements actually need to be inserted, deleted, or updated, in order to reflect the latest state changes. It is processed by a reconciler and reconciler is the engine of react. reconciler in react is called fiber. when there is an initial rendering, virtual dom is created and then fiber make fiber tree on initial render.
//Fiber tree : internal tree that has a fiber for each component instance and DOM element. Unlike virtual DOM, fiber tree does not re-created on every render and that's hy it stores current state, props, side effects, used hooks. its work can be done asynchonously. rendering process can be split into chunks, tasks can be prioritised, and work can be paused, reused, or thrown away
//reconciliation in action
//in the process of reconciliation, diffing came to place. it compares elements based on their position in the tree. so after reconciliation anddiffing, it has updaed fiber tree and then list of DOM updates(it's a result of the render phase(list of effects))

//commit phase
//It is a phase where react finally write to the DOM. Rreact looks through list of effects and applies them one by one to the atcual DOM elements. committing is synchronous. DOM is updated in one go, it can't be interrupted. this is necessary so that the DOM never shows partial results, ensuring a consistent UI. after the commit phase completes, the workInProgress fiber tree becomes the current tree for the next render cycle.and then it goes to browser paint and updated UI on the screen. commit phase is conducted by reactDOM

//diffing

//1.same posion, different element
// react assumes entire sub-tree is no long valid, old components are destoryed and removed from DOM, including state. Tree might be rebuilt if children stayed the same(state is reset)
//2.same position, same element
//eleement will be kept(as well as child elements),including state. new props/arrtributes are passed if they changed between renders, sometimes this is not what we want. then we can use the key prop

//renders are not triggered immediately, but scheduled for when the JSengine has some free time. There is also batching of multiple setState calls in event handlers
//If there are three new states. there will be batched state update and just one render and commit per event handler happens
//state is stored in the fiber tree during render phase -> at this point, re-render has not happened yet -> therefore, answer still contains current state, not the updated state(stale state) -> updating state in react is asynchronous (updated state variables are not immediately available after setState call, but only after the re-render) even if there is one state, the update is after the re-render, not immediately. if we need to update state based on previous update, we use setState with callback.

//as soon as the event fires, a new event object will be created. but it will not be created where the click actually happened. Instead the object will be created at the root of the document.(very top of the tree).from there the event will then travel down the entire tree during the so-called capturing phase. it travels down until it reaches the target element. once the target element has been reached,the event object travels all the way back up the entire tree during the so called bubbling phase.
//1.during the capturing and bubbling phase, the event really goes through every single child and parent element one by one.2.by default,event handlers listen to events not only on the target element,but alsoduring the bubbling phase.
//we can prevent bubbling with e.stopPropagation()  - the event handler in a parent element will be excecuted too once the child element event excecuted
//eent delegation - handling events for multiple elements centrally in one single parent element. better for performance and memory, as it needs only one handler function. 
//React registers all event handlers on the root DOM container. This is where all events are handled. Behind the scenes, React performs event delegation for all events in our applications
//SyntheticEvent : wrapper around the DOM's native event object

//framework(all-in-one-kit): frameworks include everything. in other words, everything you need to build a complete application is included in the framework.downside is you're stuck with the framework's tools and conventions
//library: you can choose multiple 3rd party libraries to build a complete application. downside is that you need to research, download, learn and stay up-to-date with multiple external libraries
//react 3rd-party library ecosystem