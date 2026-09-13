import { Link } from "react-router-dom";
import { CircleCheck, Circle } from "lucide-react";
import "./Hero.css";
import { useAuth } from "../../context/authContext";

export default function Hero() {
  const { user } = useAuth();
  return (
    <div className="hero">
      <section className="app-intro-container">
        <div className="app-intro">
          <h1>Organize your tasks with our powerful Todo App</h1>

          <p>
            A simple, effective way to manage your daily tasks, stay organised, and boost your
            productivity.
          </p>

          {!user && (
            <div className="link-container">
              <Link to="/signup" className="hero-link get-started-btn">
                Get Started
              </Link>
              <Link to="/login" className="hero-link sign-in-btn">
                Log In
              </Link>
            </div>
          )}
        </div>
      </section>

      <section className="card-container">
        <div className="todo-sample-card">
          <header className="sample-card-header">
            <p>Today's Task</p>
            <span>3 of 5 done</span>
          </header>

          <SampleToDoList />
        </div>
      </section>
    </div>
  );
}

const listItems = [
  "Complete project proposal",
  "Send client email",
  "  Review team updates",
  "Prepare Presentation",
  "Team meeting at 3 PM",
];

function SampleToDoList() {
  return (
    <ul className="card-item-list">
      {listItems.map((item, index) => (
        <SampleToDoItem item={item} index={index} key={index} />
      ))}
    </ul>
  );
}

function SampleToDoItem({ item, index }) {
  return (
    <li id={index < 3 ? "completed" : ""}>
      {index < 3 ? <CircleCheck className="checked-circle" /> : <Circle className="circle" />}

      <span>{item}</span>
    </li>
  );
}
