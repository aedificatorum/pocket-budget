import { toast } from "react-toastify";
/** @jsx jsx */
import { jsx } from "@emotion/core";
import styled from "styled-components";
import { Link } from "react-router-dom";
import MediaQuery from "react-responsive";
import PropTypes from "prop-types";
import { removeItem } from "./Store";
import { motion } from "framer-motion";

const StyledTable = styled.div`
  margin: 0 1rem 0 1rem;

  /* Header */
  & > div:first-child {
    display: flex;
    justify-content: space-around;
    padding: 1rem 0 1rem 0;
    border-bottom: solid darkgrey 0.125rem;
    margin-bottom: 1rem;
    font-weight: bold;

    @media (min-width: ${ props => props.theme.breakpoint }) {
      div {
        width: 9%;
      }
      /* admin buttons */
      div:nth-last-child(-n + 2) {
        width: 5%;
      }
    }
    @media (max-width: ${ props => props.theme.breakpoint }) {
      div {
        width: 30%;
      }
    }
  }
  /* Rows */
  & > div:not(:first-child) > div {
    display: flex;
    justify-content: space-around;

    @media (min-width: ${ props => props.theme.breakpoint }) {
      div {
        width: 9%;
      }
      /* admin buttons */
      div:nth-last-child(-n + 2) {
        width: 5%;
      }
    }
    @media (max-width: ${ props => props.theme.breakpoint }) {
      div {
        width: 30%;
        padding: 0.8rem 0 0.8rem 0;
      }
    }
  }
`;

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
              <motion.div
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
                  <div>
                    <div>{dateToString(d.date)}</div>
                    <div>{dateToString(d.reportingDate)}</div>
                    <div>{d.currency}</div>
                    <div>{d.location}</div>
                    <div>{d.category}</div>
                    <div>{d.subcategory}</div>
                    <div>{d.to}</div>
                    {/* Entries default to positive as cost - Excel uses negative as cost */}
                    <div style={{
                      textAlign: "right",
                      paddingRight: "2.5rem"
                    }}>{d.amount}</div>
                    <div>{d.details}</div>
                    <div>{d.project}</div>
                    <div>
                      <Link to={`/edit/${d.id}`}>Edit</Link>
                    </div>
                    <div>
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
                  </div>
                </MediaQuery>
                <MediaQuery maxDeviceWidth={640}>
                  <div>
                    <div>{dateToString(d.date)}</div>
                    <div>{d.to}</div>
                    {/* Entries default to positive as cost - Excel uses negative as cost */}
                    <div style={{
                      textAlign: "right",
                      paddingRight: "1.5rem"
                    }}>{d.amount}</div>
                  </div>
                </MediaQuery>
              </motion.div>
            );
          });

  return (
    <div>
      <MediaQuery minDeviceWidth={1224}>
        <StyledTable>
          <div>
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
            <div></div>
            <div></div>
          </div>
          {exportRows}
        </StyledTable>
      </MediaQuery>
      <MediaQuery maxDeviceWidth={640}>
        <StyledTable>
          <div>
            <div>Date</div>
            <div>To</div>
            <div>Amount</div>
          </div>
          {exportRows}
        </StyledTable>
      </MediaQuery>
    </div>
  );
};

SummaryTable.propTypes = propTypes;

export default SummaryTable;
