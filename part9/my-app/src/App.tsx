interface HeaderProps {
  courseName: string;
}

const Header = (props: HeaderProps) => {
  return <h1>{props.courseName}</h1>;
}


interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartBaseDescription extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartBaseDescription {
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackground extends CoursePartBaseDescription {
  backgroundMaterial: string;
  kind: "background"
}

interface CoursePartSpecial extends CoursePartBaseDescription {
  requirements: Array<string>;
  kind: "special"
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;


const Part = (props: CoursePart) => {
  switch (props.kind) {
    case "basic":
      return <div>
        <h2>{props.name} {props.exerciseCount}</h2>
        <p>{props.description}</p>
      </div>;
    case "group":
      return <div>
        <h2>{props.name} {props.exerciseCount}</h2>
        <p>project exercises {props.groupProjectCount}</p>
      </div>;
    case "background":
      return <div>
        <h2>{props.name} {props.exerciseCount}</h2>
        <p>{props.description}</p>
        <p>required background: {props.backgroundMaterial}</p>
      </div>;
    case "special":
      return <div>
        <h2>{props.name} {props.exerciseCount}</h2>
        <p>{props.description}</p>
        <p>required skilss: {props.requirements.map((req, i) => <span key={i}>{req}, </span>)}</p>
      </div>;
    default:
      return assertNever(props);
  }
}

const Content = (props: { courseParts: Array<CoursePart> }) => {
  return (
    <div>
      {props.courseParts.map((part, i) => <Part key={i} {...part} />)}
    </div>
  )  
}

const Total = (props: { courseParts: Array<{ name: string, exerciseCount: number }> }) => {
  return (
    <p>
      Number of exercises{" "}
      {props.courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  )  
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group"
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
      kind: "background"
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special"
    }
  ];

  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

export default App;