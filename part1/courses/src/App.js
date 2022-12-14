const Header = (props) => {
  return (
    <>
    <h1>{props.course}</h1>
    </>
  )
}

const Part = (props) => {
  
  return (
    <>
      <p>{props.part} {props.exercise}</p>
    </>
  )
}

const Content = (props) => {
  return(
    <>
     {props.parts.map((course) => 
      <Part key={course.name} part={course.name} exercise={course.exercises}></Part>
    )}
    </>
  )
}

const Total = (props) => {
  return(
    <>
    <p>Number of exercises { props.parts.reduce((sum, exercise) => sum + exercise.exercises, 0)
}</p>
    </>
  )

}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name}></Header>
      <Content parts={course.parts}></Content>
      <Total parts={course.parts}></Total>
     
    </div>
  )
}

export default App