import Part from "./Part";
const Content = (props) => {
    return(
      <>
       {props.parts.map((course) => 
        <Part key={course.name} part={course.name} exercise={course.exercises}></Part>
      )}
      </>
    )
  }

  export default Content;