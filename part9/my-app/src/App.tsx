interface HeaderProps {
  courseName: string;
}

const Header = (props: HeaderProps) => {
  return <h1>{props.courseName}</h1>;
}

const Content = (props: { courseParts: Array<{ name: string, exerciseCount: number }> }) => {
  return (
    <div>
      {props.courseParts.map((part, i) => <p key={i}>{part.name} {part.exerciseCount}</p>)}
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

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
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