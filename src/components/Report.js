
const Report = ({ report, blockSource, resolveTicket }) => {
    return (
        <div
        className={`report ${report.reminder && 'reminder'}`}
        onDoubleClick={() => resolveTicket(report.id)}
      >
        <div className="report-container">
          <div className="report-column">
            <h5>Id: {report.payload.reportId}{' '}</h5>
            <h5>State: {report.state}{' '}</h5>
            <h5><button>Details</button></h5>
          </div>
          <div className="report-column">
            <h5>Type: {report.payload.reportType}{' '}</h5>
            <h5>Message: {report.payload.message}{' '}</h5>
          
          </div>
          <div className="report-column">
          <button
            onClick={() => resolveTicket(report.payload.reportId)} 
            disabled={report.state === 'CLOSED'}
          > Resolve</button> <br />
          <button
            onClick={() => blockSource(report.payload.reportId)}
            disabled={report.state === 'CLOSED'}
          > Block</button>
          </div>
        </div>

         

        <p>{report.day}</p>
      </div>
    )
}

Report.propTypes = {

}

export default Report
