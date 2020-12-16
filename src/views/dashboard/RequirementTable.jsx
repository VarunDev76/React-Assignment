import React from 'react';
import Spinner from "components/Loader";
import { withRouter, Link } from 'react-router-dom';

const RequirementTableComponent = ({isFetchingAssignment, assignmentList, deleteUser}) => (
  <div className="col-md-12 table-responsive">
    <table className="table">
      <thead>
        <tr>
          <th scope="col" className="text-center"> # </th>
          <th scope="col" className="text-center"> Title </th>
          <th scope="col" className="text-center"> Type </th>
          <th scope="col" className="text-center"> Description </th>
          <th scope="col" className="text-center"> Client </th>
          <th scope="col" className="text-center"> Customer Ref </th>
          <th scope="col" className="text-center"> Action </th>
        </tr>
      </thead>
      <tbody>
        {isFetchingAssignment && (
          <tr>
            <td colSpan='7' className="text-center"> <Spinner /> </td>
          </tr>
        )}
        {!isFetchingAssignment && assignmentList && assignmentList.length > 0 ? (  
          assignmentList.map((item, index) => (
            <tr>
              <td className="text-center"> {(index * 1) + 1} </td>
              <td className="text-center"> {item.title} </td>
              <td className="text-center"> {item.type.value} </td>
              <td className="text-center"> {item.description} </td>
              <td className="text-center"> {item.client ? item.client : 'No Client Added'} </td>
              <td className="text-center"> {item.customerRef ? item.customerRef : 'No Customer Ref'} </td>
              <td className="text-center"> 
                <Link to={`/user/edit/${item.id}`}>
                  <button className="btn btn-primary mx-1"> Edit </button> 
                </Link>
                <button className="btn btn-danger mx-1" onClick={() => deleteUser(item.id)}> Delete </button> 
              </td>
            </tr>
          )))
        :
          <tr>
            <td colSpan="7" className=" text-muted text-center py-4"> 
              <strong> No Record Found  </strong>
            </td>
          </tr>
        }
      </tbody>
    </table>
  </div>
)

export default withRouter(RequirementTableComponent)