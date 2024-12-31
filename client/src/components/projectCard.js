
function ProjectCard({project}) {
  return (
    <div className="col-md-4">
        <div className="card mb-3">
            <div className="card-body"> 
                <div className="d-flex justify-content-between align-items-center">
                    <h5>{project.description}</h5>
                    <a className='btn btn-light' href={`/projects/${project.id}`}>View</a>

                </div>
                <p>
                    Status: <strong>{project.status}</strong>
                </p>
            </div>
        </div>
    </div>
  )
}

export default ProjectCard