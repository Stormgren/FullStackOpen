import Header from "./Header";
import Content from "./Content";
import Total from "./Total";

const Course = (props) => {
    return (
      <>
      <Header course={props.course.name}></Header>
      <Content parts={props.course.parts}></Content>
        <Total parts={props.course.parts}></Total>
      </>
    )
  }

  export default Course