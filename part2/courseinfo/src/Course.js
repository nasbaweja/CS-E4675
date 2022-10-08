const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ parts }) =>{ 
    const total = parts.reduce((p, s) => p + s.exercises, 0);
    return (
    <p>
      <strong>Total of {total} exercises</strong>
    </p>
    )
}

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => {
        return(
            parts.map(part=> <Part part={part} key={part.id}/>)
        )
}



const Course = ({course}) =>{
    return(
        course.map(coursePart=>
    <div key={coursePart.id}>
        <Header course={coursePart.name} />
        <Content parts={coursePart.parts} />
        <Total parts={coursePart.parts} />
    </div>
    )
    )
}

export default Course