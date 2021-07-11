import { useState ,useEffect,useCallback} from 'react'
import Report from './Report'



const ReportsContainer = props => {
    const [reports, setReports] = useState([])
    const backendBaseAPI = `http://${process.env.REACT_APP_BACKEND_BASE}:${process.env.REACT_APP_BACKEND_PORT}/`;

          // Fetch Reports
          const fetchReports =  useCallback(async () => {
            const res = await fetch(backendBaseAPI + 'reports')
            const result = await res.json()
            var reports = []
            if(result.success) {
              reports = result.data
              /** get only resolved tickets */
              reports = reports.filter(report=> report.ticketState !== 'RESOLVED');
            }else {
              console.log("couldnt't get reports")
            }
            return reports
          },[backendBaseAPI])

    useEffect(() => {
        const getReports = async () => {
          // eslint-disable-next-line react-hooks/exhaustive-deps
          const reports = await fetchReports()
          setReports(reports)
        }
    
        getReports()
      }, [fetchReports])

      const resolveTicket = async (reportId) => {
        const res = await fetch(backendBaseAPI +  + `reports/${reportId}`, {
          method: 'PUT',
        })
        const result = await res.json()
        
        /** if success then remove it from the list */
        res.status === 200
        ? setReports(reports.filter((report) => report.payload.reportId !== reportId))
        : alert('Error: ' + result.errorMessage)

        fetchReports()
        
      }

      const blockSource = async (reportId) => {
        await fetch(backendBaseAPI +  `reports/block/${reportId}`, {
          method: 'PUT',
        })
    
        fetchReports()

      
      }

    return (
        <div className='container'>
          
             {reports.map((report, index) => (
            <Report key={index} report={report} blockSource={blockSource} resolveTicket={resolveTicket} />
            ))}
        </div>
    )
}

ReportsContainer.propTypes = {

}

export default ReportsContainer
