
const Total = (props) => {
    return(
      <>
      <p>Number of exercises { props.parts.reduce((sum, exercise) => sum + exercise.exercises, 0)
  }</p>
      </>
    )
  
  }

  export default Total;