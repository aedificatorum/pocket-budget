import styled from "@emotion/styled";
import { toast } from "react-toastify";
import tw from "tailwind.macro";
/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Link } from "react-router-dom";
import MediaQuery from "react-responsive";
import PropTypes from "prop-types";
import { removeItem } from "./Store";
import { motion } from "framer-motion";
import "../styles/styles.css";

/*

for later...

const TheDiv = styled(motion.div)`
  prop = value;
  selector {
    otherProp = otherValue;
  }
`;
*/

const propTypes = {
  dataToExport: PropTypes.array.isRequired,
  updateState: PropTypes.func.isRequired
};

const SummaryTable = ({ dataToExport, updateState, history }) => {
  const TDRow = styled.div`
    ${tw`py-4 px-2 md:px-6 border-b border-grey-light`};
  `;

  const goToEdit = id => {
    history.push(`/edit/${id}`);
  };

  const dateToString = date =>
    date ? date.toString().substr(4, 6) : undefined;

  const exportRows =
    dataToExport.length === 0
      ? null
      : dataToExport
          .sort((a, b) => b.date - a.date)
          .map(d => {
            return (
              <motion.div className="row"
                drag="x"
                dragConstraints={{ left: -400, right: 0 }}
                dragElastic={0}
                onDragEnd={(event, info) => {
                  if (info.point.x < -150) {
                    goToEdit(d.id);
                  } else {
                    console.log("should bounce back - to do");
                  }
                }}
                key={d.id}
              >
                <MediaQuery minDeviceWidth={1224}>
                  <div>{dateToString(d.date)}</div>
                  <div>{dateToString(d.reportingDate)}</div>
                  <div>{d.currency}</div>
                  <div>{d.location}</div>
                  <div>{d.category}</div>
                  <div>{d.subcategory}</div>
                  <div>{d.to}</div>
                  {/* Entries default to positive as cost - Excel uses negative as cost */}
                  <div>{d.amount * -1}</div>
                  <div>{d.details}</div>
                  <div>{d.project}</div>
                  <div className="admin-button">
                    <Link to={`/edit/${d.id}`}>Edit</Link>
                  </div>
                  <div className="admin-button">
                    <button
                      onClick={async () => {
                        await removeItem(d.id);
                        toast.error("Item removed! 💣");
                        await updateState();
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </MediaQuery>
                <MediaQuery maxDeviceWidth={640}>
                  <TDRow>{dateToString(d.date)}</TDRow>
                  <TDRow>{d.to}</TDRow>
                  {/* Entries default to positive as cost - Excel uses negative as cost */}
                  <TDRow css={tw`text-right pr-6`}>{d.amount * -1}</TDRow>
                  <TDRow>
                    <Link to={`/edit/${d.id}`}>Edit</Link>
                  </TDRow>
                </MediaQuery>
              </motion.div>
            );
          });

  const TDHeader = styled.td`
    ${tw`py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light`};
  `;

  return (
    <div>
      <MediaQuery minDeviceWidth={1224}>
        <div className="table">
          <div className="header">
            <div>Date</div>
            <div>Reporting Date</div>
            <div>Currency</div>
            <div>Location</div>
            <div>Category</div>
            <div>Subcategory</div>
            <div>To</div>
            <div>Amount</div>
            <div>Details</div>
            <div>Project</div>
            <div className="admin-button"></div>
            <div className="admin-button"></div>
          </div>
          <div>{exportRows}</div>
        </div>
      </MediaQuery>
      {/* <MediaQuery maxDeviceWidth={640}>
        <table css={tw`table-auto w-full text-left`}>
          <thead>
            <tr>
              <TDHeader>Date</TDHeader>
              <TDHeader>To</TDHeader>
              <TDHeader>Amount</TDHeader>
            </tr>
          </thead>
          <tbody>{exportRows}</tbody>
        </table>
      </MediaQuery> */}
    </div>
  );
};

SummaryTable.propTypes = propTypes;

export default SummaryTable;
